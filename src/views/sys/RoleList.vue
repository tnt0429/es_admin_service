<!--角色信息-->
<template>
    <div>
        <el-row>
            <el-form ref="#" :model="formQuery" label-width="5rem" :inline="true" size="small">
                <el-form-item label="角色名称">
                    <el-input v-model="formQuery.name" placeholder="请输入角色名称"/>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="formQuery.type"
                               filterable placeholder="请选择类型" style="width: 14rem;"
                    >
                        <el-option value="0" label="全部"/>
                        <el-option value="1" label="系统内置"/>
                        <el-option value="2" label="自定义"/>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" size="small"
                               icon="el-icon-search" @click="onQuery(1)"
                    >
                        查询
                    </el-button>
                    <el-button size="small" icon="el-icon-plus" @click="onNewData">
                        新增
                    </el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-card shadow="hover">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column width="180" label="操作" header-align="center" align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.dataType === 1">
                                <el-tooltip class="item" effect="dark" content="编辑" placement="left">
                                    <el-button size="mini" icon="el-icon-edit" disabled/>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="删除" placement="right">
                                    <el-button size="mini" type="danger" icon="el-icon-delete" disabled/>
                                </el-tooltip>
                            </div>
                            <div v-if="scope.row.dataType === 2">
                                <el-tooltip class="item" effect="dark" content="编辑" placement="left">
                                    <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"/>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="删除" placement="right">
                                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)"/>
                                </el-tooltip>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="roleName" label="角色名称"/>
                    <el-table-column prop="roleContent" label="角色描述"/>
                    <el-table-column prop="dataType" label="类型">
                        <template slot-scope="scope">
                            <span v-if="scope.row.dataType === 1">系统内置</span>
                            <span v-if="scope.row.dataType === 2">自定义</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination :current-page="formQuery.pageStart" :page-sizes="[10, 20, 50, 100]" :page-size="formQuery.pageSize"
                                   layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                    />
                </div>
            </el-card>
        </el-row>

        <DataEdit ref="dataEdit" :data-id="dataId" @listenSelect="onQuery"/>
    </div>
</template>

<script>

    import TablePage from "../../mixins/TablePage.ts";
    import roleList from "../../api/roleList.ts";

    export default {
        name: "RoleList",
        components: {
            DataEdit: () => import('./RoleEdit')
        },
        mixins: [TablePage],
        data() {
            return {
                fullscreenLoading: false,
                formQuery: {
                    listType: 2,
                    name: "",
                    type: "",
                    pageStart: 1,
                    pageSize: 10
                },
                dataId: 0,
                tableData: [],
                total: 0
            };
        },
        mounted() {
            this.onQuery();
        },
        methods: {
            onQuery(first) {
                this.fullscreenLoading = true;
                if (first) {
                    this.formQuery.pageStart = 1;
                }
                this.tableData = roleList;
                this.total = this.tableData.length;
                this.fullscreenLoading = false;
            },
            onNewData() {
                this.$refs.dataEdit.open(null);
            },
            handleEdit(row) {
                this.dataId = row.id;
                this.$refs.dateEdit.open(row.id);
            },
            // eslint-disable-next-line no-unused-vars
            handleDelete(row) {
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
                });
            }
        }
    }
</script>

<style scoped>

</style>
