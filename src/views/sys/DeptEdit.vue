<template>
    <el-dialog id="dialogData" title="科室信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false"
               width="800px" @close="winClose"
    >
        <el-form ref="dataForm" size="small" :model="dataFrom" label-width="6rem" :rules="rules">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="科室名称" prop="deptName">
                        <el-input v-model="dataFrom.deptName" placeholder="科室名称" class="w100"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="负责人">
                        <el-input v-model="dataFrom.deptContent" placeholder="科室负责人" class="w100"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="科室介绍">
                        <el-input v-model="dataFrom.deptContent" placeholder="科室介绍" class="w100"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="创建时间">
                        <span>{{ dataFrom.createDate }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="创建人">
                        <span>{{ dataFrom.createMan }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="修改时间">
                        <span>{{ dataFrom.updateDate }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="修改人">
                        <span>{{ dataFrom.updateMan }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button icon="el-icon-close" @click="winClose">
                取消
            </el-button>
            <el-button type="primary" icon="el-icon-check" @click="saveUser">
                确定
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "DeptEdit",
        props: {
            dataId: Number
        },
        data() {
            return {
                fullscreenLoading: false,
                dialogFormVisible: false,
                rules: {
                    deptName: [{required: true, message: "请输入科室名称", trigger: 'blur'}]
                },
                dataFrom: {},
            };
        },
        mounted() {
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
            winClose() {
                this.dialogFormVisible = false;
                this.dataFrom = {};
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