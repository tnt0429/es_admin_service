<template>
    <el-container style="height: 99%;width: 100%;" class="login-container">
        <el-main>
            <div style="width: 100%;">
                <el-row>
                    <el-col :span="12" style="text-align: left;padding-right: 1rem;">
                        <img src="../../assets/images/login/login_logo.png" alt="" style="height: 50px;margin: 25px;">
                    </el-col>
                    <el-col :span="12" style="text-align: right;">
                        <img src="../../assets/images/login/loginTopRight.png" alt="" style="height: 125px;">
                    </el-col>
                </el-row>
                <el-row class="centerBackground">
                    <el-col :span="6" :offset="11" style="margin-top: 80px; padding-left: 5rem;">
                        <span class="titleLogin">账&nbsp;号&nbsp;登&nbsp;录</span>
                        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" class="login-form" label-position="left">
                            <el-form-item prop="username">
                                <span class="svg-container">
                                    <i class="el-icon-user"/>
                                </span>
                                <el-input ref="username" v-model="loginForm.username" placeholder="登录名称" name="username"
                                          type="text" tabindex="1" autocomplete="on"
                                />
                            </el-form-item>

                            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                                <el-form-item prop="password">
                                    <span class="svg-container">
                                        <i class="el-icon-key"/>
                                    </span>
                                    <el-input :key="pwdType" ref="password" v-model="loginForm.password" :type="pwdType"
                                              placeholder="登录密码" name="password" tabindex="2" autocomplete="on"
                                              @keyup.native="checkCapslock" @blur="capsTooltip = false"
                                              @keyup.enter.native="handleLogin"
                                    />
                                    <span class="show-pwd" @click="showPwd">
                                        <i class="fas fa-eye"/>
                                    </span>
                                </el-form-item>
                            </el-tooltip>
                            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px; height: 47px;font-size: 16px;"
                                       @click.native.prevent="handleLogin">
                                登录
                            </el-button>
                            <el-row style="margin: 0 5%;">
                                <el-col :span="24" class="promptDiv" style="text-align: center;">
                                    <img src="../../assets/images/login/loginPhone.png" class="promptPhone">
                                    <span class="prompt">服务电话：0311-83080043</span>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </el-main>
        <!--        <el-footer><span class="prompt">支持浏览器：Firefox、Google Chrome、Edge、IE11</span></el-footer>-->
        <el-footer><span class="prompt">支持浏览器：Firefox、Google Chrome</span></el-footer>
    </el-container>
</template>
<script>
import {validUsername} from '@/utils/validate'

export default {
    name: 'Login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('请输入正确的用户名'))
            } else {
                callback()
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value.length < 5) {
                callback(new Error('密码不能小于5位'))
            } else {
                callback()
            }
        };
        return {
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            loginRules: {
                username: [{required: true, trigger: 'blur', validator: validateUsername}],
                password: [{required: true, trigger: 'blur', validator: validatePass}]
            },
            loading: false,
            pwdType: 'password',
            redirect: undefined,
            capsTooltip: null,
            loadType: 1 //取值：1=帐号登录；2=二维码登录
        }
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        checkCapslock({shiftKey, key} = {}) {
            if (key && key.length === 1) {
                this.capsTooltip = shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z');
            }
            if (key === 'CapsLock' && this.capsTooltip === true) {
                this.capsTooltip = false
            }
        },
        showPwd() {
            if (this.pwdType === 'password') {
                this.pwdType = ''
            } else {
                this.pwdType = 'password'
            }
        }, handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store.dispatch('user/login', this.loginForm).then(() => {
                        this.loading = false;
                        this.$router.push({path: this.redirect || '/'});
                        console.log("this.$router.push overr.");
                    }).catch((error) => {
                        this.loading = false;
                        console.log("error=", error);
                    })
                } else {
                    return false
                }
            })
        }, clickLoadType(val) {
            this.loadType = val
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
$bg: #283443;
$light_gray: #000000;
$cursor: #000000;

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        width: 85%;

        input {
            background: transparent;
            border: 0;
            -webkit-appearance: none;
            border-radius: 0;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 2px solid rgba(0, 0, 0, 0.1);
        background: rgba(0, 0, 0, 0);
        padding: 0;
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$dark_gray: #889aa4;

body > .el-container {
    margin-bottom: 40px;
    background-color: #FFFFFF;
}

.el-main {
    /*background: url(../../assets/images/login/login_top_right.png) no-repeat top right;*/
    color: #333;
    text-align: center;
    padding: 0;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
}

.el-footer {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 60px;

    .prompt {
        font-size: 12px;
        color: $dark_gray;
    }
}

.show-pwd {
    position: absolute;
    right: 15px;
    top: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
}

.promptDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-bottom: 1rem;
}

.promptPhone {
    width: 15px;
    height: 15px;
    margin: 5px 5px 5px 0;
}

.prompt {
    font-size: 12px;
    color: $dark_gray;
}

.centerBackground {
    background: url(../../assets/images/login/loginBackground.png) no-repeat center;
    background-size: 100% 100%;
    width: 100%;
    height: 400px;
    margin: 0;
    padding: 0;
}

.svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
}

.login-form {
    position: relative;
    width: 550px;
    max-width: 100%;
    margin: 20px 0 0 auto;
    overflow: hidden;
}

.tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
        &:first-of-type {
            margin-right: 16px;
        }
    }
}

.titleLogin {
    font-size: 18px;
    color: $dark_gray;
    text-align: center;
    font-weight: bold;
}

</style>
