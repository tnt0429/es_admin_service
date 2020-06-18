<template>
    <el-dialog title="慢病标签信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false"
               @close="winClose" id="dialogData" width="800px">
        <el-form size="small" :model="dataFrom" label-width="6rem" :rules="rules" ref="dataForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="标签名称" prop="labelName">
                        <el-input v-model="dataFrom.labelName" placeholder="请输入标签名称" class="w100"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="标签说明" prop="labelContent">
                        <el-input v-model="dataFrom.labelContent" placeholder="请输入标签说明" class="w100"/>
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
    </el-dialog>

</template>

<script>
    export default {
        name: "DiseaseLabelEdit",
        data() {
            return {
                fullscreenLoading: false,
                dialogFormVisible: false,
                stateList: [{id: 1, name: "在用"}, {id: 2, name: "停用"}],
                rules: {
                    labelName: [{required: true, message: "请输入标签名称", trigger: 'blur'}],
                    labelContent: [{required: true, message: "请输入标签说明", trigger: 'blur'}],
                    state: [{required: true, message: "请选择状态", trigger: 'blur'}],
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
                        labelName: "",
                        labelContent: "",
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