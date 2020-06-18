<!-- 患者基础信息编辑  -->
<template>
    <el-dialog id="dialogData" :fullscreen="true" :show-close="false" width="900px" title="患者基础信息" :visible.sync="dialogFormVisible"
               :close-on-click-modal="false" :close-on-press-escape="false" @close="winClose"
    >
        <el-row slot="title">
            <el-col :span="12">
                <span style="color: #777777; font-size: 18px;font-weight:bold;">患者基础信息</span>
            </el-col>
            <el-col :span="12" style="text-align: right;">
                <el-button icon="el-icon-close" @click="winClose">取消</el-button>
                <el-button type="primary" icon="el-icon-check" @click="saveData">保存</el-button>
            </el-col>
        </el-row>
        <el-form ref="dataForm" size="small" :model="dataFrom" label-width="9rem" :rules="rules">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="患者姓名" prop="patientsName">
                        <el-input v-model="dataFrom.patientsName" placeholder="患者录入时自动带出"/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="性别" prop="patientsSex">
                        <el-input v-model="dataFrom.patientsSex" placeholder="这个是Radio，汉字"/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="出生日期" prop="patientsBirthday">
                        <el-input v-model="dataFrom.patientsBirthday" placeholder="日期选择框"/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="证件类别" prop="patientsCardType">
                        <el-select v-model="dataFrom.patientsCardType" placeholder="请选择"  class="w100">
                            <el-option label="身份证" value="身份证"></el-option>
                            <el-option label="军官证" value="军官证"></el-option>
                            <el-option label="护照" value="护照"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="身份证号" prop="patientsCard">
                        <el-input v-model="dataFrom.patientsCard" maxlength="30"/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="患者电话" prop="patientsPhone">
                        <el-input v-model="dataFrom.patientsPhone"/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="配偶或监护人电话" prop="otherPhone">
                        <el-input v-model="dataFrom.otherPhone"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="住址" prop="patientsAddr">
                        <el-input v-model="dataFrom.patientsAddr" placeholder=""/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="民族" prop="dischargePainScore">
                        <el-input v-model="dataFrom.temp" placeholder="默认汉，可修改录入"/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="国籍" prop="patientsStatus">
                        <el-input v-model="dataFrom.temp" placeholder="默认中国，可修改录入"/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="户籍类别" prop="patientsCard">
                        <el-select v-model="dataFrom.temp" placeholder="请选择" class="w100">
                            <el-option label="非农业" value="1"></el-option>
                            <el-option label="农业" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="户口类别" prop="patientsCard">
                        <el-select v-model="dataFrom.temp" placeholder="请选择" class="w100">
                            <el-option label="常住" value="1"></el-option>
                            <el-option label="永久居住" value="2"></el-option>
                            <el-option label="临时" value="3"></el-option>
                            <el-option label="其他" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="医疗保险形式" prop="patientsCard">
                        <el-select v-model="dataFrom.temp" placeholder="请选择" class="w100">
                            <el-option label="商业保险" value="1"></el-option>
                            <el-option label="儿童医疗保险基金" value="2"></el-option>
                            <el-option label="合作医疗" value="3"></el-option>
                            <el-option label="镇保" value="4"></el-option>
                            <el-option label="半劳保" value="5"></el-option>
                            <el-option label="自费" value="6"></el-option>
                            <el-option label="其他" value="7"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="学历">
                        <el-select v-model="dataFrom.temp" placeholder="请选择" class="w100">
                            <el-option label="无学历" value="1"></el-option>
                            <el-option label="小学" value="2"></el-option>
                            <el-option label="初中" value="3"></el-option>
                            <el-option label="高中" value="4"></el-option>
                            <el-option label="技校" value="5"></el-option>
                            <el-option label="中专" value="6"></el-option>
                            <el-option label="大专" value="7"></el-option>
                            <el-option label="大学" value="8"></el-option>
                            <el-option label="研究生" value="9"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="学位">
                        <el-select v-model="dataFrom.temp" placeholder="请选择" class="w100">
                            <el-option label="无学位" value="1"></el-option>
                            <el-option label="学士" value="2"></el-option>
                            <el-option label="硕士" value="3"></el-option>
                            <el-option label="博士" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="血型" prop="patientsCard">
                        <el-input v-model="dataFrom.temp" placeholder="默认中国，可修改录入"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="单位名称" prop="patientsCard">
                        <el-input v-model="dataFrom.temp" placeholder=""/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="职业类别" prop="patientsCard">
                        <el-input v-model="dataFrom.temp" placeholder=""/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="婚姻状况" prop="patientsCard">
                        <el-select v-model="dataFrom.temp" placeholder="请选择" class="w100">
                            <el-option label="未婚" value="1"></el-option>
                            <el-option label="已婚" value="2"></el-option>
                            <el-option label="丧偶" value="3"></el-option>
                            <el-option label="离婚" value="4"></el-option>
                            <el-option label="其他" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="子女数量" prop="patientsCard">
                        <el-input v-model="dataFrom.temp" placeholder=""/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="身高cm" prop="patientsCard">
                        <el-input v-model="dataFrom.temp" placeholder=""/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="体重kg" prop="patientsCard">
                        <el-input v-model="dataFrom.temp" placeholder=""/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="患者习惯" prop="tweetTitle">
                        <el-input v-model="dataFrom.patientHabits" maxlength="1000" type="textarea" :rows="10" show-word-limit
                                  :autosize="{ minRows: 10, maxRows: 30 }"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="患者喜好" prop="tweetSummary">
                        <el-input v-model="dataFrom.patientPreferences" maxlength="1000" type="textarea" :rows="10" show-word-limit
                                  :autosize="{ minRows: 10, maxRows: 30 }"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="特殊要求" prop="tweetContent">
                        <el-input v-model="dataFrom.specialRequirements" maxlength="1000" type="textarea" :rows="10" show-word-limit
                                  :autosize="{ minRows: 10, maxRows: 30 }"/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
    export default {
        name: "PatientsEdit",
        data() {
            return {
                fullscreenLoading: false,
                dialogFormVisible: false,
                rules: {
                    patientsName: [{required: true, message: "请输入患者姓名", trigger: 'blur'}],
                    patientsSex: [{required: true, message: "请输入性别", trigger: 'blur'}],
                    patientsBirthday: [{required: true, message: "请录入出生日期", trigger: 'blur'}],
                    patientsCardType: [{required: true, message: "必须录入", trigger: 'blur'}],
                    patientsCard: [{required: true, message: "必须录入", trigger: 'blur'}],
                    patientsPhone: [{required: true, message: "必须录入", trigger: 'blur'}],
                    otherPhone: [{required: true, message: "必须录入", trigger: 'blur'}],
                    patientsAddr: [{required: true, message: "必须录入", trigger: 'blur'}],
                },
                dataFrom: {},
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

<style scoped lang="scss">
    .w100 {
        width: 100%;
    }

</style>