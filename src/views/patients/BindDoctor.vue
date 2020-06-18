<!-- 绑定医生 -->
<template>
    <el-dialog id="dialogData" width="1000px" title="绑定医生" :visible.sync="dialogFormVisible"
               :close-on-click-modal="false" :close-on-press-escape="false" @close="winClose"
    >
        <el-form ref="dataForm" size="small" :model="dataFrom" label-width="8rem" :rules="rules" label-position="top">
            <el-row :gutter="20">
                <el-col :span="14">
                    <el-form-item label="选择机构" prop="patientsBirthday">
                        <el-card class="box-card">
                            <el-tree :expand-on-click-node="false" :data="dataList" :props="defaultProps" default-expand-all/>
                        </el-card>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="绑定医生" prop="patientsBirthday">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="doctorName" label="医生姓名" />
                            <el-table-column prop="patientsCount" label="已绑患者数" width="100" align="right"/>
                            <el-table-column width="80" label="操作" header-align="center" align="center">
                                <template slot-scope="scope">
                                    <el-tooltip class="item" effect="dark" content="绑定" placement="left">
                                        <el-button size="mini" icon="el-icon-edit" @click="saveData(scope.row)"/>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button icon="el-icon-close" @click="winClose">取消</el-button>
            <el-button type="primary" icon="el-icon-check" @click="saveData">确定</el-button>
        </div>
        <el-row style="margin: 0.5rem;">
            <el-alert title="选择左侧机构，右侧医生进行联动，加载当前选择机构下的医生" type="success" effect="dark"
            />
        </el-row>
    </el-dialog>
</template>

<script>
    import deptList from "../../api/deptList.ts";

    export default {
        name: "BindDoctor",
        data() {
            return {
                fullscreenLoading: false,
                dialogFormVisible: false,
                dataList: deptList,
                dataFrom: {},
                rules: {
                    patientsName: [{required: true, message: "请输入患者姓名", trigger: 'blur'}],
                },
                tableData: [
                    {doctorName: "张乾", patientsCount: 18},
                    {doctorName: "钱天天", patientsCount: 12},
                ],
                defaultProps: {
                    children: 'children',
                    label: 'deptName'
                }
            };
        },
        methods: {
            open(rowData) {
                this.dialogFormVisible = true;
                this.dataFrom = rowData;
            },
            saveData() {
                this.$refs['dataForm'].validate(valid => {
                    if (valid) {
                        this.fullscreenLoading = true;
                        this.$message({
                            type: "success",
                            message: "保存成功!"
                        });
                        this.fullscreenLoading = false;
                        this.dialogFormVisible = false;
                    }
                });
            },
            winClose() {
                this.dialogFormVisible = false;
            }
        }
    }
</script>

<style scoped>

</style>