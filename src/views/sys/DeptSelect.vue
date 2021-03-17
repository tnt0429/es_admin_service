<template>
    <el-dialog append-to-body id="dialogData" title="科室信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false"
               :close-on-press-escape="false" width="800px" @close="winClose"
    >
        <el-card shadow="never">
            <el-tree :expand-on-click-node="false" :data="dataList" :props="defaultProps" default-expand-all @node-click="handleNodeClick"/>
        </el-card>
    </el-dialog>
</template>

<script>
import deptList from "../../api/deptList.ts";

export default {
    name: "DeptSelect",
    data() {
        return {
            dialogFormVisible: false,
            dataList: deptList,
            defaultProps: {
                children: 'children',
                label: 'deptName'
            }
        }
    },
    methods: {
        open() {
            this.dialogFormVisible = true;
        },
        handleNodeClick(data) {
            console.log(data);
            this.dialogFormVisible = false;
        },
        winClose() {
            this.dialogFormVisible = false;
        }
    }
}
</script>

<style scoped>

</style>
