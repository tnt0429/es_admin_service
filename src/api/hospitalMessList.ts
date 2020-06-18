// 信息采集
//患者姓名	性别	年龄	住址	身份证号码
// 患者电话	配偶或监护人电话
// 住院号	患者报销类型	医院名称	住院科室	主治医生
// 入院时间	既往病史 	用药史	过敏史
// 病程记录	出院时间	出院诊断	医嘱	住院天数
// 入院疼痛评分	出院疼痛评分	患者状态	回访日期	备注
export default [
    {
        patientsName: "张三", patientsSex: '男', patientsBirthday:"1950-10-01", patientsAddr: "解放大街1001号", patientsCard: "130101200011226789",
        patientsPhone: "13903110311", otherPhone:"",
        hospitalizationNo: "A20190101A01", reimbursementType: "自费", hospitalName: "河北医科大学第二医院", inpatientDepartment: "肿瘤科", doctor: "张继",
        admissionDate: "2019-01-01", pastMedicalHistory: "无", medicationHistory: "阿莫西林", allergyHistory: "无",
        courseRecord: "病程记录不会编写了，凑字", dischargeDate: "2019-02-01", dischargeDiagnosis: "基本治愈", doctorOrders: "多吃蔬菜，多运动", hospitalDay: 3,
        hospitalPainScore: 9, dischargePainScore: 3, patientsStatus: "基本上没有症状", returnDate: "2019-02-03", remark: "恢复过快，注意观察是否前期误诊"
    }
]