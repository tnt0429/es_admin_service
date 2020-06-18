<!-- 回访模板 -->
<template>
    <div>
        <el-row>
            <el-alert title="本模块可以定义默认回访模块，医院回访模板，科室回访模板。系统管理员登录可以修改、定义所有级别模板，医院管理员可以维护医院、科室模板，科室管理员可以定义本科室模板。"
                      :closable="false" type="success" effect="dark"
            />
        </el-row>
        <el-row class="row">
            <el-form ref="#" :model="formQuery" label-width="5rem" :inline="true" size="small">
                <el-form-item label="模板名称">
                    <el-input v-model="formQuery.templateName" placeholder="请输入模板名称"/>
                </el-form-item>
                <el-form-item label="病症标签">
                    <el-select v-model="formQuery.diseaseLabel" filterable placeholder="请选择">
                        <el-option v-for="item in diseaseLabelList" :key="item.labelName" :label="item.labelName" :value="item.labelName"/>
                    </el-select>
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
                    <el-table-column prop="templateName" label="模板名称"/>
                    <el-table-column prop="diseaseLabel" label="病症标签"/>
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
    import tableDataList from "../../api/templateReturnList.ts";
    import diseaseLabelList from "../../api/diseaseLabelList.ts";

    export default {
        name: "TemplateReturnList",
        components: {
            DataEdit: () => import('./TemplateReturn'),
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
                    templateName: "",
                    diseaseLabel: "",
                    deptId: "",
                    pageStart: 1,
                    pageSize: 10
                },
                tableData: tableDataList,
                diseaseLabelList: [],
                total: 0
            };
        },
        mounted() {
            this.loadDiseaseLabelList();
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
            loadDiseaseLabelList() {
                this.diseaseLabelList = diseaseLabelList;
                this.diseaseLabelList.unshift({labelName: "全部"});
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
    .row {
        margin-top: 1rem;
    }

</style>