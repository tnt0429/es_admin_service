<!-- 医生推文 -->
<template>
    <div>
        <el-row style="margin: 0.5rem;">
            <el-alert title="系统管理员可以查看所有推文，其他人员只为查看、维护本人创建的推文" type="success" effect="dark"/>
        </el-row>
        <el-row style="margin: 0.5rem;">
            <el-alert title="该部分还没有完全想好如何处理，目前只支持纯文本推文展示。" type="warning" effect="dark"/>
        </el-row>
        <el-row>
            <el-form ref="#" :model="formQuery" label-width="5rem" :inline="true" size="small">
                <el-form-item label="推文标题" label-width="7rem">
                    <el-input v-model="formQuery.tweetTitle" placeholder="请输入推文标题"/>
                </el-form-item>
                <el-form-item label="机构">
                    <el-input v-model="formQuery.deptId" placeholder="请选择机构" readonly>
                        <el-button slot="append" icon="el-icon-search" @click="selectDept"/>
                    </el-input>
                </el-form-item>
                <el-form-item label="发布日期">
                    <el-date-picker v-model="formQuery.createDate" type="daterange" range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期"/>
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
                    <el-table-column prop="tweetTitle" label="推文标题" width="180"/>
                    <el-table-column prop="tweetSummary" label="推文概述"/>
                    <el-table-column prop="readCount" label="阅读次数" width="100"/>
                    <el-table-column prop="releaseTime" label="发布日期" width="100"/>
                    <el-table-column prop="createTime" label="创建日期" width="100"/>
                    <el-table-column prop="createMan" label="创建人" width="100"/>
                </el-table>
                <div class="block">
                    <el-pagination :current-page="formQuery.pageStart" :page-sizes="[10, 20, 50, 100]" :page-size="formQuery.pageSize"
                                   layout="total, sizes, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange"
                                   @size-change="handleSizeChange"
                    />
                </div>
            </el-card>
        </el-row>
        <DataEdit ref="dataEdit" :data-id="dataId" @listenSelect="onQuery"/>
        <DeptSelect ref="deptSelect"/>
    </div>
</template>

<script>
    import TablePage from "../../mixins/TablePage.ts";
    import tweetDoctorList from "../../api/tweetDoctorList.ts";

    export default {
        name: "TweetDoctor",
        components: {
            DataEdit: () => import('./TweetDoctorEdit'),
            DeptSelect: () => import("../sys/DeptSelect" )
        },
        mixins: [TablePage],
        data() {
            return {
                fullscreenLoading: false,
                formQuery: {
                    tweetTitle: "",
                    deptId: "",
                    createDate: "",
                    pageStart: 1,
                    pageSize: 10
                },
                dataId: 0,
                tableData: tweetDoctorList,
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
                this.$refs.dataEdit.open(null);
            },
            handleEdit(row) {
                this.dataId = row.id;
                this.$refs.dataEdit.open(row.id);
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