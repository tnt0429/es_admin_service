<!-- 疾病字典 -->
<template>
    <div>
        <el-row style="margin: 0.5rem;">
            <el-alert title="系统管理员可以维护所有字典，其他管理员只可以维护本级及下级创建的字典"
                      type="success" effect="dark"
            />
        </el-row>
        <el-row>
            <el-form ref="#" :model="formQuery" label-width="5rem" :inline="true" size="small">
                <el-form-item label="机构">
                    <el-input v-model="formQuery.deptId" placeholder="请选择机构" readonly>
                        <el-button slot="append" icon="el-icon-search" @click="selectDept"/>
                    </el-input>
                </el-form-item>
                <el-form-item label="疾病名称" label-width="7rem">
                    <el-input v-model="formQuery.dicName" placeholder="请输入疾病名称"/>
                </el-form-item>
                <el-form-item label="疾病编码">
                    <el-input v-model="formQuery.dicCode" placeholder="请输入疾病编码"/>
                </el-form-item>
                <el-form-item label="助记码">
                    <el-input v-model="formQuery.mnemonicCode" placeholder="请输入助记码"/>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="formQuery.type" filterable placeholder="请选择类型" style="width: 7rem;">
                        <el-option value="" label="全部"/>
                        <el-option value="1" label="系统"/>
                        <el-option value="2" label="自定义"/>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button v-loading.fullscreen.lock="fullscreenLoading" icon="el-icon-search" type="primary">
                        查询
                    </el-button>
                    <el-button icon="el-icon-plus">
                        新增
                    </el-button>
                </el-form-item>
            </el-form>

            <el-card shadow="hover">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column width="190" label="操作" header-align="center" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="left">
                                <el-button size="mini" icon="el-icon-edit"/>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="停用" placement="top">
                                <el-button size="mini" type="warning" icon="el-icon-video-pause"/>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除" placement="right">
                                <el-button size="mini" type="danger" icon="el-icon-delete"/>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dicCode" label="疾病编码"/>
                    <el-table-column prop="dicName" label="疾病名称"/>
                    <el-table-column prop="mnemonicCode" label="助记码"/>
                    <el-table-column prop="deptName" label="创建机构"/>
                    <el-table-column prop="type" label="类型" width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type === 1">系统</span>
                            <span v-if="scope.row.type === 2">自定义</span>
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
        <DeptSelect ref="deptSelect"/>
    </div>
</template>

<script>
import TablePage from "../../mixins/TablePage.ts";
import dicDiseaseList from "../../api/dicDiseaseList.ts"

export default {
    name: "DicDisease",
    components: {
        DeptSelect: () => import("../sys/DeptSelect" )
    },
    mixins: [TablePage],
    data() {
        return {
            formQuery: {
                dicName: "",
                dicCode: "",
                mnemonicCode: "",
                type: "",
                pageStart: 1,
                pageSize: 10
            },
            tableData: dicDiseaseList,
            total: 0,
        }
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
        selectDept() {
            this.$refs.deptSelect.open();
        }
    }
}
</script>

<style scoped>

</style>
