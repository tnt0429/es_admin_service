<!-- 患者病例列表 -->
<template>
    <el-dialog id="dialogData" :fullscreen="true" :show-close="false" width="900px" title="患者回访" :visible.sync="dialogFormVisible"
               :close-on-click-modal="false" :close-on-press-escape="false" @close="winClose"
    >
        <el-row slot="title">
            <el-col :span="12">
                <span style="color: #777777; font-size: 18px;font-weight:bold;">患者医疗记录</span>
            </el-col>
            <el-col :span="12" style="text-align: right;">
                <el-button icon="el-icon-close" @click="winClose">关闭</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-form ref="dataForm" size="small" label-width="5rem">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>患者基础信息</span>
                    </div>
                    <!--                    <el-col v-for="templateReturn in baseMessList" :key="templateReturn.id" :span="4">-->
                    <!--                        <el-form-item :label="templateReturn.returnItem" label-width="5rem">-->
                    <!--                            <span>{{ templateReturn.valueData }}</span>-->
                    <!--                        </el-form-item>-->
                    <!--                    </el-col>-->
                    <el-col :span="4">
                        <el-form-item label="患者姓名" label-width="5rem">
                            <span>张三</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="性别" label-width="5rem">
                            <span>男</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="出生日期" label-width="5rem">
                            <span></span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="证件类别" label-width="5rem">
                            <span></span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="证件号码" label-width="5rem">
                            <span></span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="患者电话" prop="patientsPhone">
                            <span>{{ 13903110311 }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="配偶或监护人电话" prop="otherPhone" label-width="8rem">
                            <span>{{ 13903110312 }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="住址" prop="patientsAddr">
                            <span></span>
                        </el-form-item>
                    </el-col>
                </el-card>
            </el-form>
        </el-row>
        <el-row  style="margin-top: 0.5rem;">
            <el-form ref="#" :model="formQuery" label-width="5rem" :inline="true" size="small">
                <el-form-item label="记录类别">
                    <el-checkbox-group v-model="dataTypeCheckList" @change="onChange">
                        <el-checkbox label="1">住院记录</el-checkbox>
                        <el-checkbox label="2">门诊记录</el-checkbox>
                        <el-checkbox label="3">回访记录</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="记录时间">
                    <el-date-picker v-model="formQuery.admissionDate" type="daterange" range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期"/>
                </el-form-item>
                <el-form-item>
                    <el-button v-loading.fullscreen.lock="fullscreenLoading" icon="el-icon-search" type="primary" @click="onQuery(1)">
                        刷新
                    </el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-card v-if="dataTypeCheckList.indexOf('3') >= 0" shadow="never" class="listCard">
                    <el-row>
                        <el-divider content-position="left">回访日期：2020-02-12</el-divider>
                    </el-row>
                    <el-row>
                        <el-col v-for="templateReturn in templateReturnList" :key="templateReturn.id" :span="6">
                            <span class="spanLabel">{{ templateReturn.returnItem }} ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-divider content-position="left">医生结论</el-divider>
                    </el-row>
                    <el-row>
                        <el-col v-for="templateReturn in doctorReturnList" :key="templateReturn.id" :span="6">
                            <span class="spanLabel">{{ templateReturn.returnItem }} ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card v-if="dataTypeCheckList.indexOf('3') >= 0" shadow="never" class="listCard">
                    <el-row>
                        <el-divider content-position="left">回访日期：2019-12-31</el-divider>
                    </el-row>
                    <el-row>
                        <el-col v-for="templateReturn in templateReturnList" :key="templateReturn.id" :span="6">
                            <span class="spanLabel">{{ templateReturn.returnItem }} ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-divider content-position="left">医生结论</el-divider>
                    </el-row>
                    <el-row>
                        <el-col v-for="templateReturn in doctorReturnList" :key="templateReturn.id" :span="6">
                            <span class="spanLabel">{{ templateReturn.returnItem }} ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card v-if="dataTypeCheckList.indexOf('1') >= 0" shadow="never" class="listCard">
                    <el-row>
                        <el-divider content-position="left">入院日期：2020-02-12</el-divider>
                    </el-row>
                    <el-row>
                        <el-col :span="colSpan">
                            <span class="spanLabel">住院号 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">患者报销类型 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">医院名称 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">住院科室 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">主治医生 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">入院时间 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">既往病史 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">用药史 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">过敏史 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">病程记录 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">出院诊断 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">医嘱 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">出院时间 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">住院天数 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">入院疼痛评分 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">出院疼痛评分 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">患者状态 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card v-if="dataTypeCheckList.indexOf('2') >= 0" shadow="never" class="listCard">
                    <el-row>
                        <el-divider content-position="left">门诊日期：2020-02-12</el-divider>
                    </el-row>
                    <el-row>
                        <el-col :span="colSpan">
                            <span class="spanLabel">门诊号 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">患者报销类型 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">医院名称 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">门诊科室 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">门诊医生 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">门诊时间 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">既往病史 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">用药史 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">过敏史 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">病程记录 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">门诊诊断 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">医嘱 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">疼痛评分 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                        <el-col :span="colSpan">
                            <span class="spanLabel">患者状态 ：</span>
                            <span class="spanValue">数据值</span>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </el-dialog>

</template>

<script>
    import templateReturnList from "../../api/templateReturn.ts"

    export default {
        name: "MedicalRecordView",
        data() {
            return {
                fullscreenLoading: false,
                dialogFormVisible: false,
                templateReturnList: [],
                baseMessList: [],
                doctorReturnList: [],
                dataTypeCheckList: ["1", "2", "3"],
                formQuery: {},
                colSpan: 6,
            };
        },
        methods: {
            iniData() {
                // 初始化格式展现
                this.templateReturnList = [];
                this.baseMessList = [];
                this.doctorReturnList = [];
                if (templateReturnList && templateReturnList.length > 0) {
                    for (let i = 0; i < templateReturnList.length; i++) {
                        templateReturnList[i].candidateArr = templateReturnList[i].candidateValue.split("|");
                        if (templateReturnList[i].candidateValue === '#patientName') {
                            templateReturnList[i].valueData = "张三";
                        } else if (templateReturnList[i].candidateValue === '#patientSex') {
                            templateReturnList[i].valueData = "男";
                        } else if (templateReturnList[i].candidateValue === '#patientCardNo') {
                            templateReturnList[i].valueData = "13903110311";
                        } else if (templateReturnList[i].candidateValue === '#hospitalName') {
                            templateReturnList[i].valueData = "河北医大第二医院";
                        } else if (templateReturnList[i].candidateValue === '#DoctorName') {
                            templateReturnList[i].valueData = "李思";
                        }
                    }
                }
                if (templateReturnList) {
                    for (let i = 0; i < templateReturnList.length; i++) {
                        if (templateReturnList[i].state === 1 && templateReturnList[i].type < 5) {
                            if (templateReturnList[i].type === 1) {
                                this.baseMessList.push(templateReturnList[i]);
                            } else {
                                this.templateReturnList.push(templateReturnList[i]);
                            }
                        } else {
                            this.doctorReturnList.push(templateReturnList[i]);
                        }
                    }
                }
            },
            open(rowData) {
                this.dialogFormVisible = true;
                this.dataFrom = rowData;
                this.iniData();
            },
            onChange(val) {
                // 展示病历类型变化事件

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
    .spanLabel {
        color: #777777;
    }

    .spanValue {

    }

    .listCard {
        margin-bottom: 0.5rem;
    }
</style>