<!--角色信息-->
<template>
    <div>
        <el-row>
            <el-form ref="#" :model="formQuery" label-width="5rem" :inline="true" size="small">
                <el-form-item label="用户或登录名" label-width="7rem">
                    <el-input v-model="formQuery.name" placeholder="请输入用户或登录名"/>
                </el-form-item>
                <el-form-item label="机构">
                    <el-input v-model="formQuery.deptId" placeholder="请选择机构" readonly>
                        <el-button slot="append" icon="el-icon-search" @click="selectDept"/>
                    </el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="formQuery.roleId" placeholder="请选择角色" style="width: 10rem;">
                        <el-option label="全部" value=""/>
                        <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formQuery.state" filterable placeholder="请选择状态" style="width: 7rem;">
                        <el-option value="" label="全部"/>
                        <el-option value="1" label="在用"/>
                        <el-option value="2" label="停用"/>
                    </el-select>
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
                    <el-table-column width="190" label="操作" header-align="center" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="left">
                                <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"/>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="初始化密码" placement="top">
                                <el-button size="mini" type="warning" icon="el-icon-refresh" @click="initPassword(scope.row)"/>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除" placement="right">
                                <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)"/>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="data.userName" label="用户名称"/>
                    <el-table-column prop="data.loginName" label="登录账号"/>
                    <el-table-column prop="roleView" label="用户角色"/>
                    <el-table-column prop="deptView" label="所属机构"/>
                    <el-table-column prop="cmsGoodsOwnerStr" label="货主信息"/>
                    <el-table-column prop="data.state" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.data.state === 1">在用</span>
                            <span v-if="scope.row.data.state === 2">停用</span>
                        </template>
                    </el-table-column>
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
import roleList from "../../api/roleList.ts";

export default {
    name: "UserList",
    components: {
        DataEdit: () => import('./UserEdit'),
        DeptSelect: () => import("./DeptSelect" )
    },
    mixins: [TablePage],
    data() {
        return {
            fullscreenLoading: false,
            dialogFormVisible: false,
            formQuery: {
                name: "",
                state: "",
                deptId: "",
                roleId: "",
                pageStart: 1,
                pageSize: 10
            },
            roleList: [],
            dataId: 0,
            tableData: [],
            total: 0
        };
    },
    mounted() {
        this.listRole();
        this.onQuery(1);
    },
    methods: {
        onQuery(first) {
            this.fullscreenLoading = true;
            if (first) {
                this.formQuery.pageStart = 1;
            }
            this.tableData = [
                {data: {userName: "系统管理员", loginName: "admin", state: 1}}
            ];
            this.total = this.tableData.length;
            this.fullscreenLoading = false;
        },
        listRole() {
            this.roleList = roleList;
        },
        onNewData() {
            this.$refs.dataEdit.open(null);
        },
        handleEdit(row) {
            this.dataId = row.data.id;
            this.$refs.dataEdit.open(row.data.id);
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
        initPassword(row) {
            console.log(row);
            this.$confirm("确定要将密码重置为123456吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$message({
                    type: "success",
                    message: "重置密码成功!",
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
