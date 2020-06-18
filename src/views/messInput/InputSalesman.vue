<!-- 业务员录入 -->
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
                <el-form-item label="入院时间">
                    <el-date-picker v-model="formQuery.admissionDate" type="daterange" range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期"/>
                </el-form-item>
                <el-form-item label="出院时间">
                    <el-date-picker v-model="formQuery.dischargeDate" type="daterange" range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期"/>
                </el-form-item>
                <el-form-item label="机构">
                    <el-input v-model="formQuery.deptId" placeholder="请选择机构" readonly>
                        <el-button slot="append" icon="el-icon-search" @click="selectDept"/>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-loading.fullscreen.lock="fullscreenLoading" icon="el-icon-search" type="primary" @click="onQuery(1)">
                        查询
                    </el-button>
                    <el-button icon="el-icon-plus" @click="onNewData">
                        新增
                    </el-button>
                </el-form-item>
            </el-form>

            <el-card shadow="hover">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column width="120" label="操作" header-align="center" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="left">
                                <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"/>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除" placement="right">
                                <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)"/>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="patientsName" label="患者姓名"/>
                    <el-table-column prop="patientsSex" label="患者性别"/>
                    <el-table-column prop="patientsCard" label="身份证号"/>
                    <el-table-column prop="patientsPhone" label="患者电话"/>
                    <el-table-column prop="hospitalizationNo" label="住院号"/>
                    <el-table-column prop="hospitalName" label="医院名称"/>
                    <el-table-column prop="inpatientDepartment" label="住院科室"/>
                    <el-table-column prop="doctor" label="主治医生"/>
                    <el-table-column prop="admissionDate" label="入院时间"/>
                    <el-table-column prop="dischargeDate" label="出院时间"/>
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
        name: "InputSalesman",
        components: {
            DataEdit: () => import('./InputEdit'),
            DeptSelect: () => import("../sys/DeptSelect" )
        },
        mixins: [TablePage],
        data() {
            return {
                fullscreenLoading: false,
                dialogFormVisible: false,
                formQuery: {
                    patientsName: "",
                    patientsCard: "",
                    doctor: "",
                    admissionDate: "",
                    dischargeDate: "",
                    deptId: "",
                    pageStart: 1,
                    pageSize: 10
                },
                dataId: 0,
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
            onNewData() {
                this.$refs.dataEdit.open({});
            },
            handleEdit(row) {
                this.$refs.dataEdit.open(row);
            },
            handleDelete(row) {
                console.log(row);
                this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$message({
                        type: "success",
                        message: "删除数据成功!",
                        center: true
                    });
                }).catch(() => {
                });
            },
            selectDept() {
                this.$refs.deptSelect.open();
            }
        }
    }
</script>

<style scoped>

</style>