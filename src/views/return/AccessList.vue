<!-- 回访记录 -->
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
                <el-form-item label="回访时间">
                    <el-date-picker v-model="formQuery.returnDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"/>
                </el-form-item>
                <el-form-item>
                    <el-button v-loading.fullscreen.lock="fullscreenLoading" icon="el-icon-search" type="primary" @click="onQuery(1)">
                        查询
                    </el-button>
                </el-form-item>
            </el-form>

            <el-card shadow="hover">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column width="80" label="操作" header-align="center" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">明细</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="returnTime" label="回访时间"/>
                    <el-table-column prop="returnMan" label="回访操作人"/>
                    <el-table-column prop="itemValue1" label="患者姓名"/>
                    <el-table-column prop="itemValue2" label="患者性别"/>
                    <el-table-column prop="itemValue3" label="身份证号"/>
                    <el-table-column prop="itemValue4" label="入诊医院"/>
                    <el-table-column prop="itemValue5" label="主治医生"/>
                    <el-table-column prop="itemValue10" label="患者疼痛分数"/>
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
    import accessList from "../../api/accessList.ts";

    export default {
        name: "AccessList",
        components: {
            DataEdit: () => import('./AccessView'),
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
                    returnDate: 1,
                    pageStart: 1,
                    pageSize: 10
                },
                tableData: accessList,
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