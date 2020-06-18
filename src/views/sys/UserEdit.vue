<template>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false"
               @close="winClose" id="dialogData" width="800px">
        <el-form size="small" :model="dataFrom" label-width="6rem" :rules="rules" ref="dataForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="登录名称" prop="loginName">
                        <el-input v-model="dataFrom.loginName" placeholder="请输入登录名" class="w100"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用户名称" prop="userName">
                        <el-input v-model="dataFrom.userName" placeholder="请输入用户名" class="w100"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户角色" prop="roleId">
                        <el-select v-model="dataFrom.roleId" placeholder="请选择角色" class="w100">
                            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="从属机构" prop="deptId">
                        <el-input v-model="dataFrom.deptId" placeholder="请选择机构" readonly>
                            <el-button slot="append" icon="el-icon-search" @click="selectDept"/>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="状态" prop="state">
                        <el-radio-group v-model="dataFrom.state">
                            <el-radio v-for="item in stateList" :key="item.id" :label="item.id">
                                {{ item.name }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button icon="el-icon-close" @click="winClose">取消</el-button>
            <el-button type="primary" icon="el-icon-check" @click="saveUser">确定</el-button>
        </div>
        <DeptSelect ref="deptSelect"/>
    </el-dialog>
</template>

<script>
    import roleList from "../../api/roleList.ts"

    export default {
        name: "UserEdit",
        components: {
            DeptSelect: () => import("./DeptSelect" )
        },
        props: {
            dataId: Number
        },
        data() {
            return {
                fullscreenLoading: false,
                dialogFormVisible: false,
                stateList: [{id: 1, name: "在用"}, {id: 2, name: "停用"}],
                rules: {
                    loginName: [{required: true, message: "请输入登录名", trigger: 'blur'}],
                    userName: [{required: true, message: "请输入用户名", trigger: 'blur'}],
                    roleId: [{required: true, message: "请选择角色", trigger: 'blur'}],
                    deptId: [{required: true, message: "请选择机构", trigger: 'blur'}],
                    state: [{required: true, message: "请选择状态", trigger: 'blur'}],
                },
                dataFrom: {},
                roleList: roleList
            };
        },
        mounted() {
            this.listRole();
        },
        methods: {
            open(id) {
                this.dialogFormVisible = true;
                if (id) {
                    this.fullscreenLoading = true;
                    this.dataFrom = {
                        loginName: "admin",
                        userName: "系统管理员",
                        roleId: 1,
                        deptId: 1,
                        state: 1,
                        id: 1
                    };
                    this.fullscreenLoading = false;
                } else {
                    this.dataFrom = {id: null};
                }
            },
            listRole() {
            },
            saveUser() {
                this.$refs['dataForm'].validate(valid => {
                    if (valid) {
                        this.fullscreenLoading = true;
                        this.$message({
                            type: "success",
                            message: "保存成功!"
                        });
                        this.fullscreenLoading = false;
                        this.dialogFormVisible = false;
                    }
                });
            },
            selectDept() {
                this.$refs.deptSelect.open();
            },
            winClose() {
                this.dialogFormVisible = false;
                this.dataFrom = {};
                this.ownerIdList = [];
                this.$refs['dataForm'].resetFields();
            }
        }
    }
</script>

<style scoped lang="scss">
    .w100 {
        width: 100%;
    }

</style>