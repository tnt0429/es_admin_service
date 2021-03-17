<template>
    <el-dialog id="dialogData" width="800px" title="回访计划" :visible.sync="dialogFormVisible"
               :close-on-click-modal="false" :close-on-press-escape="false" @close="winClose"
    >
        <el-form ref="dataForm" size="small" :model="dataFrom" label-width="6rem" :rules="rules" label-position="right">
            <el-row>
                <el-tag class="elTagClass">张三</el-tag>
                <el-tag class="elTagClass">80岁</el-tag>
                <el-tag class="elTagClass">食道癌</el-tag>
                <el-tag class="elTagClass">疼痛评分：5</el-tag>
                <el-tag class="elTagClass">主治医生：华风</el-tag>
                <el-tag class="elTagClass">上次出院：2019-02-03</el-tag>
                <el-tag class="elTagClass">上次就诊：2019-02-13</el-tag>
                <el-tag class="elTagClass" type="danger">上次回访：2019-02-16</el-tag>
                <el-tag class="elTagClass">主治医生：华风</el-tag>
            </el-row>
            <el-row class="elRowClass">
                <el-col :span="24">
                    下次回访日期
                    <el-date-picker v-model="dataFrom.nextReturnDate" type="date" placeholder="选择日期" style="width: 10rem;"/>
                    之后，每
                    <el-input-number v-model="dataFrom.returnInterval" :min="0" :max="30" label="描述文字"/>
                    天，进行一次回访。
                </el-col>
            </el-row>
            <el-row class="elRowClass">
                若患者住院，在出院后
                <el-input-number v-model="dataFrom.dischargeReturnDay" :min="0" :max="30"/>
                天进行回访。
            </el-row>
            <el-row class="elRowClass">
                若患者到院就诊，在就诊后
                <el-input-number v-model="dataFrom.seeReturnDay" :min="0" :max="30"/>
                天进行回访。
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button icon="el-icon-close" @click="winClose">取消</el-button>
            <el-button type="primary" icon="el-icon-check" @click="saveData">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "ReturnPlan",
    data() {
        return {
            fullscreenLoading: false,
            dialogFormVisible: false,
            dataFrom: {
                returnInterval: 3,
                dischargeReturnDay: 3,
                seeReturnDay: 3,
            },
            rules: {
                patientsName: [{required: true, message: "请输入患者姓名", trigger: 'blur'}],
                patientsSex: [{required: true, message: "请输入性别", trigger: 'blur'}],
                patientsBirthday: [{required: true, message: "请录入出生日期", trigger: 'blur'}]
            },
        };
    },
    methods: {
        open(rowData) {
            this.dialogFormVisible = true;
            console.log("rowData:", rowData);
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
.elTagClass {
    margin-right: 1rem;
    margin-bottom: 0.5rem;
}

.elRowClass {
    margin-bottom: 0.5rem;
}
</style>
