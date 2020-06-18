import {getToken, removeToken, setToken} from '@/utils/auth'
import router, {resetRouter} from '@/router'
import menus from '@/api/menu.ts'

const state = {
    token: getToken(),
    name: '',
    roles: [],
    sys_user: {}
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_SYS_USER: (state, sys_user) => {
        state.sys_user = sys_user
    }
}

const actions = {
    // user login
    login({commit}, userInfo) {
        const {username, password} = userInfo;
        return new Promise((resolve, reject) => {
            const data = {token: "tokenvalue1234567890", tokenValidTime: 3600};
            commit('SET_TOKEN', data.token);
            setToken(data.token);
            resolve();
        })
    },

    // get user info
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            const data = {
                sysUser: {
                    id: 1,
                    userName: "演示账号",
                    loginName: "admin",
                    roleId: 1,
                    deptId: 1,
                    state: 1
                },
                sysDept: {
                    id: 1,
                    deptName: "医院",
                    parentId: 0,
                    dataType: 1
                },
                sysRole: {
                    id: 1,
                    roleName: "系统管理员"
                },
                sysMenus: menus
            };
            if (!data) {
                reject('Verification failed, please Login again.')
            }
            const {sysRole, sysUser} = data;
            // roles must be a non-empty array
            if (!sysRole || sysRole.length <= 0) {
                reject('getInfo: roles must be a non-null array!')
            }
            console.log("sysRole=", sysRole);
            console.log("sysUser=", sysUser);
            console.log("sysUser.userName=", sysUser.userName);
            commit('SET_ROLES', [sysRole]);
            commit('SET_SYS_USER', sysUser || {});
            commit('SET_NAME', sysUser.userName || '');
            resolve(data)
        })
    },
    // user logout
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
            resetRouter();
            resolve();
        })
    }
    ,
    fedLogOut({commit}) {
        // 前端 登出
        return new Promise(resolve => {
            console.log("fedLogOut");
            commit('SET_TOKEN', '');
            removeToken();
            resolve()
        })
    }
    ,
    saveToken({commit}, token) {
        // 保存已经获得的token
        setToken(token);
        commit('SET_TOKEN', token)
    }
    ,

    // remove token
    resetToken({commit}) {
        return new Promise(resolve => {
            console.log("resetToken");
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
            resolve()
        })
    }
    ,

    // dynamically modify permissions
    changeRoles({commit, dispatch}, role) {
        return new Promise(async resolve => {
            const {roles} = await dispatch('getInfo');

            resetRouter();
            // dynamically add accessible routes
            router.addRoutes(roles);

            // reset visited views and cached views
            dispatch('tagsView/delAllViews', null, {root: true});

            resolve()
        })
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
