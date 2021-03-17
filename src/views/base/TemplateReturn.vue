<!-- 回访模板 -->
<template>
    <el-dialog title="回访模板信息" :fullscreen="true" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false"
               @close="winClose" id="dialogData" width="800px">
        <el-row slot="title">
            <el-col :span="12">
                <span style="color: #777777; font-size: 18px;font-weight:bold;">回访模板信息</span>
            </el-col>
            <el-col :span="12" style="text-align: right;">
                <el-button icon="el-icon-close" @click="winClose">取消</el-button>
                <el-button type="primary" icon="el-icon-check" @click="saveData">保存</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-input v-model="formQuery.deptId" placeholder="请选择机构" readonly style="width: 20rem;">
                <el-button slot="append" icon="el-icon-search" @click="selectDept"/>
            </el-input>
        </el-row>
        <el-row class="row" :gutter="20">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>回访内容</span>
                    </div>
                    <el-table :data="tableDataReturn" style="width: 100%" :row-class-name="tableRowClassName">
                        <el-table-column prop="showIndex" label="序号" width="50"/>
                        <el-table-column prop="returnItem" label="回访内容" width="150"/>
                        <el-table-column prop="candidateValue" label="取值范围（使用半角“|”分割，为空不做限制）"/>
                        <el-table-column prop="status" label="状态" width="60">
                            <template slot-scope="scope">
                                <span v-if="scope.row.state === 1">在用</span>
                                <span v-if="scope.row.state === 2">停用</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="300">
                            <template v-if="scope.row.type === 2" slot-scope="scope">
                                <el-button size="mini" icon="el-icon-top" circle/>
                                <el-button size="mini" icon="el-icon-bottom" circle/>
                                <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                                <el-button size="mini" type="warning">停用</el-button>
                                <el-button size="mini" type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>医生结论</span>
                    </div>
                    <el-table :data="tableDataDoctor" style="width: 100%" :row-class-name="tableRowClassName">
                        <el-table-column prop="showIndex" label="序号" width="50"/>
                        <el-table-column prop="returnItem" label="回复内容" width="150"/>
                        <el-table-column prop="candidateValue" label="取值范围（使用半角“|”分割，为空不做限制）"/>
                        <el-table-column prop="status" label="状态" width="60">
                            <template slot-scope="scope">
                                <span v-if="scope.row.state === 1">在用</span>
                                <span v-if="scope.row.state === 2">停用</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="300">
                            <template v-if="scope.row.type === 6" slot-scope="scope">
                                <el-button size="mini" icon="el-icon-top" circle/>
                                <el-button size="mini" icon="el-icon-bottom" circle/>
                                <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                                <el-button size="mini" type="warning">停用</el-button>
                                <el-button size="mini" type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <DeptSelect ref="deptSelect"></DeptSelect>
    </el-dialog>
</template>

<script>
import templateReturnList from "../../api/templateReturn.ts";

export default {
    name: "TemplateReturn",
    components: {
        DeptSelect: () => import("../sys/DeptSelect" )
    },
    data() {
        return {
            formQuery: {
                deptid: 1
            },
            tableDataReturn: [],
            tableDataDoctor: [],
            dialogFormVisible: false,
            fullscreenLoading: false,
        }
    },
    methods: {
        open(id) {
            this.dialogFormVisible = true;
            this.fullscreenLoading = true;
            if (id) {
                this.dataFrom = {
                    labelName: "",
                    labelContent: "",
                    state: 1,
                    id: 1
                };
            } else {
                this.dataFrom = {id: null};
            }
            this.initData();
            this.fullscreenLoading = false;
        },
        initData() {
            this.tableDataReturn = [];
            this.tableDataDoctor = [];
            if (templateReturnList) {
                for (let i = 0; i < templateReturnList.length; i++) {
                    if (templateReturnList[i].type < 5) {
                        this.tableDataReturn.push(templateReturnList[i]);
                    } else {
                        this.tableDataDoctor.push(templateReturnList[i]);
                    }
                }
            }
        },
        handleEdit(row) {

        },
        tableRowClassName({row, rowIndex}) {
            if (row.state === 2) {
                return 'warning-row';
            }
            return '';
        }, selectDept() {
            this.$refs.deptSelect.open();
        },
        winClose() {
            this.dialogFormVisible = false;
            this.dataFrom = {};
            this.$refs['dataForm'].resetFields();
        }
    }
}
</script>

<style scoped>
.row {
    margin-top: 1rem;
}

</style>
<style>
.el-table .warning-row {
    background: oldlace;
}
</style>
