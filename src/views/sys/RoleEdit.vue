<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <el-dialog title="角色权限信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false"
                   @close="winClose" id="dialogData" top="30px" width="800px">
            <el-row>
                <el-col :span="12">
                    <el-form size="small" :model="dataFrom" label-width="5rem" :rules="rules" ref="dataForm">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="角色名称" prop="roleName">
                                    <el-input v-model="dataFrom.roleName" placeholder="请输入角色名" style="width: 90%;"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="角色描述">
                                    <el-input type="textarea" v-model="dataFrom.roleContent" :rows="7" style="width: 90%;"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card" style="height: 60vh;overflow: auto;">
                        <el-tree
                            ref="tree"
                            :data="dateTree"
                            :props="props"
                            :default-checked-keys="checkTree"
                            node-key="id"
                            default-expand-all
                            show-checkbox>
                        </el-tree>
                    </el-card>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="winClose" size="small" icon="el-icon-close">取消</el-button>
                <el-button type="primary" @click="saveRole" size="small" icon="el-icon-check">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import menus from "../../api/menu.ts";

export default {
    name: 'RoleEdit',
    props: {
        dataId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            fullscreenLoading: false,
            dateTree: [],
            checkTree: [],
            dataFrom: {},
            stateList: [{id: 1, name: '在用'}, {id: 2, name: '停用'}],
            props: {
                label: 'menuName',
                children: 'children'
            },
            rules: {
                roleName: [{required: true, message: '请输入角色名', trigger: 'blur'}],
                state: [{required: true, message: '请选择状态', trigger: 'blur'}]
            },
            dialogFormVisible: false,
            count: 1
        }
    },
    methods: {
        open(id) {
            this.listMenu();
            this.dataFrom.id = id;
            if (id) {
                this.findRoleById(id)
            }
            this.dialogFormVisible = true
        },
        saveRole() {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    this.fullscreenLoading = true;
                    let menuList = this.$refs.tree.getCheckedNodes(false, true);
                    let id = 0;
                    let menuIdList = [];
                    if (menuList.length < 1) {
                        this.$message({
                            type: 'error',
                            message: '请选择菜单!'
                        });
                        return false;
                    }
                    for (let i = 0; i < menuList.length; i++) {
                        id = menuList[i].id;
                        menuIdList.push(id);
                    }
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                    this.fullscreenLoading = false;
                }
            })
        },
        listMenu() {
            this.fullscreenLoading = true;
            this.dateTree = this.listToTree(menus, 0);
            this.fullscreenLoading = false;
        },
        findRoleById(id) {
        },
        listToTree(data, department) {
            //list转tree
            let tree = [];
            let temp;
            for (let i = 0; i < data.length; i++) {
                if (data[i].parentId === department) {//是父节点
                    let obj = data[i];
                    temp = this.listToTree(data, data[i].id);//递归
                    if (temp.length > 0) {//有子节点
                        obj.children = temp;
                    }
                    tree.push(obj);
                }
            }
            return tree
        },
        winClose() {
            this.dialogFormVisible = false;
            this.dataFrom = {};
            this.$refs['dataForm'].resetFields();
            this.$emit('listenSelect', 1)
        }
    }
}
</script>

<style scoped>

</style>
