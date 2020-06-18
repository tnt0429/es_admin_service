import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login', '/404'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({path: '/'})
            NProgress.done()
        } else {
            // determine whether the user has obtained his permission roles through getInfo
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    // get user info
                    let res = await store.dispatch('user/getInfo')
                    console.log('res=', res)
                    let addRoutes = getRouterByMenus(res)
                    console.log('addRoutes=', addRoutes)
                    // generate accessible routes map based on roles
                    const accessRoutes = await store.dispatch('permission/generateRoutes', addRoutes)
                    console.log('accessRoutes=', accessRoutes)
                    router.addRoutes(accessRoutes)

                    console.log('router.addRoutes(addRoutes) over.')
                    console.log('router=', router)

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({...to, replace: true})
                } catch (error) {
                    console.log('router.beforeEach error:', error)
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})

//获取给定菜单的下级菜单
function getChildren(menuParentId, sysMenus) {
    let childrenArray = []
    if (sysMenus && sysMenus.length > 0) {
        for (let i = 0; i < sysMenus.length; i++) {
            let menu2 = sysMenus[i]
            if (menu2.parentId === menuParentId) {
                let menuIcon = menu2.menuIcon ? menu2.menuIcon : 'fas fa-th-large'
                let menuUrl = menu2.menuUrl
                let menuParam
                let arr = menuUrl.split('?')
                if (arr && arr.length > 1) {
                    menuUrl = menuUrl.replace(/\?/g, '').replace(/&/g, '').replace(/=/g, '')
                    menuParam = arr[1]
                }
                let childrenSubs = getChildren(menu2.id, sysMenus)
                let children = {
                    path: menuUrl,
                    name: menu2.menuName + '_' + menu2.id,
                    component: () => import(`@/views/${menu2.menuCmd}`),
                    meta: {
                        title: menu2.menuName,
                        icon: menuIcon,
                        params: menuParam,
                        menuCmd: menu2.menuCmd
                    }
                }
                if (childrenSubs && childrenSubs.length > 0) {
                    children.children = childrenSubs
                    children.component = () => import('@/layout/level2')
                    // children.component = null;
                    children.redirect = childrenSubs[0].path
                }
                if (menuParentId === 0) {
                    children.component = () => import('@/layout')
                    if (!childrenSubs || childrenSubs.length < 1) {
                        // 顶级菜单必须有一个子菜单
                        children.path = ''
                        children.redirect = menuUrl
                        let children = {
                            path: menuUrl,
                            name: menu2.menuName + '__' + menu2.id,
                            component: () => import(`@/views/${sysMenus[i].menuCmd}`),
                            meta: {
                                title: menu2.menuName,
                                icon: menuIcon,
                                params: menuParam,
                                menuCmd: menu2.menuCmd
                            }
                        }
                        children.children = [children]
                    }
                }
                childrenArray.push(children)
            }
        }
    }
    return childrenArray
}

/**
 * 根据用户基础信息中的菜单列表动态生成路由信息
 * @param userData
 */
function getRouterByMenus(userData) {
    let addRouters = []
    if (userData && userData.sysMenus) {
        addRouters = getChildren(0, userData.sysMenus)
    }
    let route404 = {path: '*', redirect: '/404', hidden: true}
    addRouters.push(route404)
    return addRouters
}
