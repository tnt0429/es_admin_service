<!-- 回访界面 -->
<template>
    <el-dialog id="dialogData" :show-close="false" width="1000px" title="患者回访" :visible.sync="dialogFormVisible"
               :close-on-click-modal="false" :close-on-press-escape="false" @close="winClose"
    >
        <el-row slot="title">
            <el-col :span="12">
                <span style="color: #777777; font-size: 18px;font-weight:bold;">患者回访</span>
            </el-col>
            <el-col :span="12" style="text-align: right;">
                <el-button icon="el-icon-close" @click="winClose">取消</el-button>
                <el-button type="primary" icon="el-icon-check" @click="saveData">保存</el-button>
            </el-col>
        </el-row>
        <el-form ref="dataForm" size="small" label-width="15rem">
            <el-row>
                <el-col v-for="templateReturn in templateReturnList" :key="templateReturn.id" :span="12">
                    <el-form-item :label="templateReturn.returnItem">
                        <span>{{ templateReturn.valueData }}</span>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
    import templateReturnList from "../../api/templateReturn.ts"

    export default {
        name: "AccessEdit",
        data() {
            return {
                fullscreenLoading: false,
                dialogFormVisible: false,
                templateReturnList: templateReturnList
            };
        },
        methods: {
            iniData() {
                // 初始化格式展现
                if (this.templateReturnList && this.templateReturnList.length > 0) {
                    for (let i = 0; i < this.templateReturnList.length; i++) {
                        this.templateReturnList[i].candidateArr = this.templateReturnList[i].candidateValue.split("|");
                        if (this.templateReturnList[i].candidateValue === '#patientName'){
                            this.templateReturnList[i].valueData = "张三";
                        }else if (this.templateReturnList[i].candidateValue === '#patientSex'){
                            this.templateReturnList[i].valueData = "男";
                        }else if (this.templateReturnList[i].candidateValue === '#patientCardNo'){
                            this.templateReturnList[i].valueData = "13903110311";
                        }else if (this.templateReturnList[i].candidateValue === '#hospitalName'){
                            this.templateReturnList[i].valueData = "河北医大第二医院";
                        }else if (this.templateReturnList[i].candidateValue === '#DoctorName'){
                            this.templateReturnList[i].valueData = "李思";
                        }
                    }
                }
            },
            open(rowData) {
                this.dialogFormVisible = true;
                this.dataFrom = rowData;
                this.iniData();
            },
            saveData() {
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
            }
        }
    }
</script>

<style scoped>

</style>