<template>
    <div>
        <el-row>
            <el-form ref="#" :model="formQuery" label-width="5rem" :inline="true" size="small">
                <el-form-item label="患者姓名">
                    <el-input v-model="formQuery.patientsName" placeholder="请输入患者姓名"/>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="formQuery.patientsCard" placeholder="请输入身份证号"/>
                </el-form-item>
                <el-form-item label="主治医生">
                    <el-input v-model="formQuery.doctor" placeholder="请输入主治医生"/>
                </el-form-item>
                <el-form-item label="机构">
                    <el-input v-model="formQuery.deptId" placeholder="请选择机构" readonly>
                        <el-button slot="append" icon="el-icon-search" @click="selectDept"/>
                    </el-input>
                </el-form-item>
                <el-form-item label="入院时间">
                    <el-date-picker v-model="formQuery.admissionDate" type="daterange" range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期"/>
                </el-form-item>
                <el-form-item label="出院时间">
                    <el-date-picker v-model="formQuery.dischargeDate" type="daterange" range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期"/>
                </el-form-item>
                <el-form-item label="门诊时间">
                    <el-date-picker v-model="formQuery.clinicDate" type="daterange" range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期"/>
                </el-form-item>
                <el-form-item>
                    <el-button v-loading.fullscreen.lock="fullscreenLoading" icon="el-icon-search" type="primary" @click="onQuery(1)">
                        查询
                    </el-button>
                </el-form-item>
            </el-form>

            <el-card shadow="hover">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column width="70" label="操作" header-align="center" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleEdit(scope.row)">明细</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="patientsName" label="患者姓名"/>
                    <el-table-column prop="medicalName" label="病症"/>
                    <el-table-column prop="admissionDate" label="最后入院时间"/>
                    <el-table-column prop="clinicDate" label="最后门诊时间"/>
                    <el-table-column prop="returnDate" label="最后回访时间"/>
                    <el-table-column prop="patientsSex" label="患者性别"/>
                    <el-table-column prop="patientsCard" label="身份证号"/>
                    <el-table-column prop="patientsPhone" label="患者电话"/>
                    <el-table-column prop="hospitalName" label="医院名称"/>
                    <el-table-column prop="inpatientDepartment" label="住院科室"/>
                    <el-table-column prop="doctor" label="主治医生"/>
                </el-table>
                <div class="block">
                    <el-pagination :current-page="formQuery.pageStart" :page-sizes="[10, 20, 50, 100]" :page-size="formQuery.pageSize"
                                   layout="total, sizes, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange"
                                   @size-change="handleSizeChange"
                    />
                </div>
            </el-card>
        </el-row>

        <DataEdit ref="dataEdit" @listenSelect="onQuery"/>
        <DeptSelect ref="deptSelect"/>
    </div>

</template>

<script>
    import TablePage from "../../mixins/TablePage.ts";
    import hospitalMessList from "../../api/hospitalMessList.ts";

    export default {
        name: "PatientMedicalRecord",
        components: {
            DataEdit: () => import('./MedicalRecordView'),
            DeptSelect: () => import("../sys/DeptSelect" ),
        },
        mixins: [TablePage],
        props: {
            loadType: {
                type: Number,
                default: 4  //取值:1=分配主治医生;2=患者状况管理;3=回访计划管理;4=患者基础信息
            }
        },
        data() {
            return {
                fullscreenLoading: false,
                dialogFormVisible: false,
                formQuery: {
                    patientsName: "",
                    patientsCard: "",
                    doctor: "",
                    deptId: "",
                    admissionDate: null,
                    dischargeDate: null,
                    clinicDate: null,
                    pageStart: 1,
                    pageSize: 10
                },
                tableData: hospitalMessList,
                total: 0
            };
        },
        mounted() {
            this.onQuery(1);
        },
        methods: {
            onQuery(first) {
                this.fullscreenLoading = true;
                if (first) {
                    this.formQuery.pageStart = 1;
                }
                this.total = this.tableData.length;
                this.fullscreenLoading = false;
            },
            handleEdit(row) {
                this.$refs.dataEdit.open(row);
            },
            selectDept() {
                this.$refs.deptSelect.open();
            }
        }
    }
</script>

<style scoped>

</style>