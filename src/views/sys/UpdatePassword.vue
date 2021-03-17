<template>
    <div v-loading.fullscreen.lock="fullscreenLoading" style="text-align: center; width: 100%;margin-top: 1rem;">
        <el-card shadow="hover" style="width: 30rem; margin:0 auto;">
            <el-form ref="form" :model="dataFrom" :rules="rules" size="small" label-width="8rem">
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input v-model="dataFrom.oldPassword" placeholder="原密码" show-password/>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="dataFrom.newPassword" placeholder="新密码" show-password/>
                </el-form-item>
                <el-form-item label="再次输入密码" prop="twoPassword">
                    <el-input v-model="dataFrom.twoPassword" placeholder="再次输入密码" show-password/>
                </el-form-item>
                <el-button size="small" type="primary" icon="el-icon-check" @click="update">
                    保存
                </el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script>

export default {
    name: "UpdPassword",
    data() {
        let loginPass = (rule, value, callback) => {
            if (value.length < 5) {
                callback(new Error("输入的密码需大于五位"));
            } else {
                callback();
            }
        };
        let twoPassword = (rule, value, callback) => {
            if (value !== this.dataFrom.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            fullscreenLoading: false,
            dataFrom: {
                oldPassword: '',
                newPassword: '',
                twoPassword: ''
            },
            pwdType: 'password',
            oldPwdType: 'password',
            twoPwdType: 'password',
            rules: {
                oldPassword: [
                    {required: true, trigger: 'blur', validator: loginPass}
                ],
                newPassword: [
                    {required: true, trigger: 'blur', validator: loginPass}
                ],
                twoPassword: [
                    {required: true, trigger: 'blur', validator: twoPassword}
                ]
            }
        }
    },
    methods: {
        update() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.fullscreenLoading = true;
                    this.$message.success("修改成功！");
                    this.fullscreenLoading = false;
                    this.$store.dispatch('LogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    });
                    this.fullscreenLoading = false;
                }
            });
        }
    }
}
</script>

<style scoped>

</style>
