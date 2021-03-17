<!-- 医生推文 -->
<template>
    <el-dialog id="dialogData" fullscreen="true" :show-close="false" width="900px" title="医生推文" :visible.sync="dialogFormVisible"
               :close-on-click-modal="false" :close-on-press-escape="false" @close="winClose"
    >
        <el-row slot="title">
            <el-col :span="12">
                <span style="color: #777777; font-size: 18px;font-weight:bold;">医生推文编辑</span>
            </el-col>
            <el-col :span="12" style="text-align: right;">
                <el-button icon="el-icon-close" @click="winClose">取消</el-button>
                <el-button icon="el-icon-document" @click="saveUser">暂存</el-button>
                <el-button type="primary" icon="el-icon-check" @click="saveUser">发布</el-button>
            </el-col>
        </el-row>
        <el-form label-position="top" ref="dataForm" size="small" :model="dataFrom" label-width="6rem" :rules="rules">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="推文标题" prop="tweetTitle">
                        <el-input v-model="dataFrom.tweetTitle" placeholder="请输入推文标题" class="w100" maxlength="30"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="推文概述" prop="tweetSummary">
                        <el-input v-model="dataFrom.tweetSummary" placeholder="请输入推文概述" class="w100" maxlength="100" type="textarea" :rows="2"
                                  show-word-limit/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="推文内容" prop="tweetContent">
                        <el-input v-model="dataFrom.tweetContent" class="w100" maxlength="4000" type="textarea" :rows="10" show-word-limit
                                  :autosize="{ minRows: 10, maxRows: 30 }"/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
export default {
    name: "TweetDoctorEdit",
    props: {
        dataId: Number
    },
    data() {
        return {
            fullscreenLoading: false,
            dialogFormVisible: false,
            rules: {
                tweetTitle: [{required: true, message: "请输入推文标题", trigger: 'blur'}],
                tweetSummary: [{required: true, message: "请输入推文概述", trigger: 'blur'}],
                tweetContent: [{required: true, message: "请录入推文内容", trigger: 'blur'}]
            },
            dataFrom: {
                tweetTitle: '',
                tweetSummary: '',
                tweetContent: ''
            },
        };
    },
    methods: {
        open(id) {
            this.dialogFormVisible = true;
        },
        saveUser() {
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

<style scoped lang="scss">
.w100 {
    width: 100%;
}

</style>
