<!-- 科室维护 -->
<template>
    <div>
        <el-row :gutter="20" style="padding: 1rem;">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>医院科室信息</span>
                        <el-button style="float: right; padding: 3px; margin-left: 1rem;" type="danger">删除选择</el-button>
                        <el-button style="float: right; padding: 3px; margin-left: 1rem;" type="text">增加科室</el-button>
                        <el-button style="float: right; padding: 3px; margin-left: 1rem;" type="text">增加医院</el-button>
                    </div>
                    <el-tree :expand-on-click-node="false" :data="dataList" :props="defaultProps" default-expand-all @node-click="handleNodeClick"/>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-form v-if="selectData.level === 2" ref="form" :model="selectData" label-width="7rem">
                    <el-form-item label="归属省份">
                        <el-select v-model="selectData.province" placeholder="请选择归属省份">
                            <el-option label="河北" value="13"/>
                            <el-option label="北京" value="01"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="归属地市">
                        <el-select v-model="selectData.province" placeholder="请选择归属地市">
                            <el-option label="石家庄" value="1301"/>
                            <el-option label="邯郸" value="1304"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="归属地市">
                        <el-select v-model="selectData.county" placeholder="请选择归属地市">
                            <el-option label="长安区" value="130101"/>
                            <el-option label="桥西区" value="130102"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="医院编码">
                        <el-input v-model="selectData.code"/>
                    </el-form-item>
                    <el-form-item label="医院名称">
                        <el-input v-model="selectData.label"/>
                    </el-form-item>
                    <el-form-item label="医院等级">
                        <el-select v-model="selectData.hospitalLevel" placeholder="请选择医院等级">
                            <el-option label="三级甲等" value="1"/>
                            <el-option label="三级乙等" value="2"/>
                            <el-option label="三级丙等" value="3"/>
                            <el-option label="二级甲等" value="4"/>
                            <el-option label="二级乙等" value="5"/>
                            <el-option label="二级丙等" value="6"/>
                            <el-option label="一级甲等" value="7"/>
                            <el-option label="一级乙等" value="8"/>
                            <el-option label="一级丙等" value="9"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="医院管理员">
                        <el-input v-model="selectData.linkMan"/>
                    </el-form-item>
                    <el-form-item label="管理员电话">
                        <el-input v-model="selectData.linkPhone"/>
                    </el-form-item>
                    <el-form-item label="业务员">
                        <el-input v-model="selectData.salesman"/>
                    </el-form-item>
                    <el-form-item label="业务员电话">
                        <el-input v-model="selectData.salesmanPhone"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">保存</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
                <el-form v-else ref="form" :model="selectData" label-width="6rem">
                    <el-form-item label="科室名称">
                        <el-input v-model="selectData.label"/>
                    </el-form-item>
                    <el-form-item label="科室主任">
                        <el-input v-model="selectData.headDoctor"/>
                    </el-form-item>
                    <el-form-item label="科室性别">
                        <el-input v-model="selectData.headDoctorSex"/>
                    </el-form-item>
                    <el-form-item label="主任电话">
                        <el-input v-model="selectData.headDoctorPhone"/>
                    </el-form-item>
                    <el-form-item label="护士长">
                        <el-input v-model="selectData.headNurse"/>
                    </el-form-item>
                    <el-form-item label="科室管理员">
                        <el-input v-model="selectData.linkMan"/>
                    </el-form-item>
                    <el-form-item label="管理员电话">
                        <el-input v-model="selectData.linkPhone"/>
                    </el-form-item>
                    <el-form-item label="业务员">
                        <el-input v-model="selectData.salesman"/>
                    </el-form-item>
                    <el-form-item label="业务员电话">
                        <el-input v-model="selectData.salesmanPhone"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">保存</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import deptList from "../../api/deptList.ts";

export default {
    name: "DeptList",
    data() {
        return {
            fullscreenLoading: false,
            selectData: {
                label: "",
                level: 2,
                province: "13",
                city: "1301",
                county: "130101",
                code: "abc",
                hospitalLevel: "1",
                linkMan: "",
                linkPhone: "",
                salesman: "",
                salesmanPhone: ""
            },
            dataList: deptList,
            defaultProps: {
                children: 'children',
                label: 'deptName'
            }
        }
    },
    mounted() {
    },
    methods: {
        handleNodeClick(data) {
            this.selectData = data;
            console.log(data);
        }
    }
}
</script>

<style scoped>

</style>
