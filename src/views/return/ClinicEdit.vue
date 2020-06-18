<!-- 门诊记录 -->
<template>
    <el-dialog id="dialogData" fullscreen="true" :show-close="false" width="900px" title="患者信息采集" :visible.sync="dialogFormVisible"
               :close-on-click-modal="false" :close-on-press-escape="false" @close="winClose"
    >
        <el-row slot="title">
            <el-col :span="12">
                <span style="color: #777777; font-size: 18px;font-weight:bold;">患者门诊记录</span>
            </el-col>
            <el-col :span="12" style="text-align: right;">
                <el-button icon="el-icon-close" @click="winClose">取消</el-button>
                <el-button type="primary" icon="el-icon-check" @click="saveData">保存</el-button>
            </el-col>
        </el-row>
        <el-form ref="dataForm" size="small" :model="dataFrom" label-width="8rem" :rules="rules">
            <el-tabs type="border-card">
                <el-tab-pane label="门诊信息">
                    <el-row>
                        <el-col :span="4">
                            <el-form-item label="患者姓名" prop="patientsName">
                                <el-input v-model="dataFrom.patientsName" placeholder="患者录入时自动带出"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="性别" prop="patientsSex">
                                <el-input v-model="dataFrom.patientsSex" placeholder="这个是Radio，汉字"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="出生日期" prop="patientsBirthday">
                                <el-input v-model="dataFrom.patientsBirthday" placeholder="日期选择框"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="证件类别" prop="patientsCard">
                                <el-select v-model="dataFrom.patientsCard" placeholder="请选择" class="w100">
                                    <el-option label="身份证" value="身份证"></el-option>
                                    <el-option label="军官证" value="军官证"></el-option>
                                    <el-option label="护照" value="护照"></el-option>
                                    <el-option label="其他" value="其他"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="身份证号码" prop="patientsCard">
                                <el-input v-model="dataFrom.patientsCard" maxlength="30"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-form-item label="患者电话" prop="patientsPhone">
                                <el-input v-model="dataFrom.patientsPhone"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="配偶或监护人电话" prop="otherPhone">
                                <el-input v-model="dataFrom.otherPhone"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="住址" prop="patientsAddr">
                                <el-input v-model="dataFrom.patientsAddr" placeholder=""/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="门诊单号" prop="hospitalizationNo">
                                <el-input v-model="dataFrom.hospitalizationNo"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="患者报销类型" prop="reimbursementType">
                                <el-input v-model="dataFrom.reimbursementType" placeholder="下拉选择"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="医院名称" prop="hospitalName">
                                <el-input v-model="dataFrom.hospitalName" placeholder="医院用户录入时自动带出，其他情况是弹框选择"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="门诊科室" prop="inpatientDepartment">
                                <el-input v-model="dataFrom.inpatientDepartment" placeholder="弹框选择"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="门诊医生" prop="doctor">
                                <el-input v-model="dataFrom.doctor"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="门诊时间" prop="admissionDate">
                                <el-input v-model="dataFrom.admissionDate" placeholder="日期选择框"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="既往病史" prop="pastMedicalHistory">
                                <el-input v-model="dataFrom.pastMedicalHistory"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="用药史" prop="medicationHistory">
                                <el-input v-model="dataFrom.medicationHistory"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="过敏史" prop="allergyHistory">
                                <el-input v-model="dataFrom.allergyHistory"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="病程记录" prop="courseRecord">
                                <el-input v-model="dataFrom.courseRecord"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="门诊诊断" prop="dischargeDiagnosis">
                                <el-input v-model="dataFrom.dischargeDiagnosis" placeholder="可以弹出选择字典数据或手动出入，选择内容追加到后面"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="医嘱" prop="doctorOrders">
                                <el-input v-model="dataFrom.doctorOrders" placeholder="可以弹出选择字典数据或手动出入，选择内容追加到后面"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="疼痛评分" prop="dischargePainScore">
                                <el-input v-model="dataFrom.dischargePainScore" placeholder="数值，取值0-10"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="患者状态" prop="patientsStatus">
                                <el-input v-model="dataFrom.patientsStatus"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="回访日期" prop="returnDate">
                                <el-input v-model="dataFrom.returnDate" placeholder="日期选择框"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="备注" prop="remark">
                                <el-input v-model="dataFrom.remark"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="扩展信息">
                    <!--
                      民族、按照中华人民共和国国家标准GB/T3304－1991
                      国籍、中华人民共和国国家标准GB/T 2659-2000
                      户籍类别：1 非农业 2 农业
                      户口类别：1 常住 2 永久居住 3 临时 4 其他（）
                      医疗保险形式  1 商业保险 2 儿童医疗保险基金 3 合作医疗 4 镇保 5 半劳保 6 自费 7 其他
                      学历  1 无学历 2 小学 3 初中 4 高中 5 技校 6 中专 7 大专 8 大学 9 研究生
                      学位 0 无学位 1 学士 2 硕士 3 博士
                      血型、
                      单位名称、
                      职业类别、中华人民共和国国家标准GB/T6565-1999
                      婚姻状况、1 未婚 2 已婚 3 丧偶 4 离婚 5 其他 中华人民共和国国家标准GB/T4766-1984
                      子女数量、
                      身高：cm
                      体重：kg
                      -->
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="民族" prop="dischargePainScore">
                                <el-input v-model="dataFrom.dischargePainScore" placeholder="默认汉，可修改录入"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="国籍" prop="patientsStatus">
                                <el-input v-model="dataFrom.patientsStatus" placeholder="默认中国，可修改录入"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="户籍类别" prop="patientsCard">
                                <el-select v-model="dataFrom.patientsCard" placeholder="请选择" class="w100">
                                    <el-option label="非农业" value="1"></el-option>
                                    <el-option label="农业" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="户口类别" prop="patientsCard">
                                <el-select v-model="dataFrom.patientsCard" placeholder="请选择" class="w100">
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
                                <el-select v-model="dataFrom.patientsCard" placeholder="请选择" class="w100">
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
                                <el-select v-model="dataFrom.patientsCard" placeholder="请选择" class="w100">
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
                                <el-select v-model="dataFrom.patientsCard" placeholder="请选择" class="w100">
                                    <el-option label="无学位" value="1"></el-option>
                                    <el-option label="学士" value="2"></el-option>
                                    <el-option label="硕士" value="3"></el-option>
                                    <el-option label="博士" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="血型" prop="patientsCard">
                                <el-input v-model="dataFrom.patientsStatus" placeholder="默认中国，可修改录入"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="单位名称" prop="patientsCard">
                                <el-input v-model="dataFrom.patientsStatus" placeholder=""/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="职业类别" prop="patientsCard">
                                <el-input v-model="dataFrom.patientsStatus" placeholder=""/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="婚姻状况" prop="patientsCard">
                                <el-select v-model="dataFrom.patientsCard" placeholder="请选择" class="w100">
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
                                <el-input v-model="dataFrom.patientsStatus" placeholder=""/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="身高cm" prop="patientsCard">
                                <el-input v-model="dataFrom.patientsStatus" placeholder=""/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="体重kg" prop="patientsCard">
                                <el-input v-model="dataFrom.patientsStatus" placeholder=""/>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-tab-pane>
            </el-tabs>
        </el-form>
    </el-dialog>
</template>

<script>
    export default {
        name: "ClinicEdit",
        data() {
            return {
                fullscreenLoading: false,
                dialogFormVisible: false,
                rules: {
                    patientsName: [{required: true, message: "请输入患者姓名", trigger: 'blur'}],
                    patientsSex: [{required: true, message: "请输入性别", trigger: 'blur'}],
                    patientsBirthday: [{required: true, message: "请录入出生日期", trigger: 'blur'}]
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