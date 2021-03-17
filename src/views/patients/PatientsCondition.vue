<template>
    <el-dialog id="dialogData" width="800px" title="患者状况" :visible.sync="dialogFormVisible"
               :close-on-click-modal="false" :close-on-press-escape="false" @close="winClose"
    >
        <el-form ref="dataForm" size="small" :model="dataFrom" label-width="8rem" :rules="rules" label-position="top">
            <el-card class="box-card">
                <el-form-item label="患者状况" prop="patientsBirthday">
                    <el-radio-group v-model="dataFrom.patientsStatus">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="2">病逝</el-radio>
                        <el-radio :label="3">失联</el-radio>
                        <el-radio :label="4">转院</el-radio>
                        <el-radio :label="9">其他</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-card>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button icon="el-icon-close" @click="winClose">取消</el-button>
            <el-button type="primary" icon="el-icon-check" @click="saveData">确定</el-button>
        </div>
    </el-dialog>

</template>

<script>
export default {
    name: "PatientsCondition",
    data() {
        return {
            fullscreenLoading: false,
            dialogFormVisible: false,
            dataFrom: {},
            rules: {
                patientsName: [{required: true, message: "请输入患者姓名", trigger: 'blur'}],
            },
        };
    },
    methods: {
        open(rowData) {
            this.dialogFormVisible = true;
            this.dataFrom = rowData;
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
