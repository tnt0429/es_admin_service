<!-- 慢病标签 -->
<template>
    <div>
        <el-row>
            <el-form ref="#" :model="formQuery" label-width="5rem" :inline="true" size="small">
                <el-form-item label="标签名称">
                    <el-input v-model="formQuery.labelName" placeholder="请输入患者姓名"/>
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
                    <el-table-column width="80" label="操作" header-align="center" align="center">
                        <template slot-scope="scope">
                            <el-tooltip v-if="scope.row.labelType === '自定义'" class="item" effect="dark" content="编辑" placement="left">
                                <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"/>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="labelName" label="标签名称"/>
                    <el-table-column prop="labelContent" label="标签说明"/>
                    <el-table-column prop="deptId" label="创建机构"/>
                    <el-table-column prop="labelType" label="类别"/>
                    <el-table-column prop="state" label="状态"/>
                    <el-table-column prop="createTime" label="创建时间"/>
                    <el-table-column prop="createMan" label="创建人"/>
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
    import accessList from "../../api/diseaseLabelList.ts";

    export default {
        name: "DiseaseLabelList",
        components: {
            DataEdit: () => import('./DiseaseLabelEdit'),
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
                    labelName: "",
                    deptId: "",
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
            onNewData() {
                this.$refs.dataEdit.open();
            },
            handleEdit(row) {
                this.$refs.dataEdit.open(row.id);
            },
            selectDept() {
                this.$refs.deptSelect.open();
            }
        }
    }
</script>

<style scoped>

</style>