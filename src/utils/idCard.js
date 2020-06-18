
/**
 * 简易校验身份证号
 * 校验位数、
 * @param code
 * @returns {string}
 */
function checkIdCardSimple(code) {
    let tip = "";
    if (!code
        || (code.length != 15 && code.length != 18)) {
        tip = "身份证号必须15或18位！";
    } else if (!isValidityBrithByIdCard(code, code.length)) {
        tip = "请输入正确的身份证号码！";
    }
    console.log("checkIdCard code,tip", code, tip);
    return tip;
}

/*
根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

出生日期计算方法。
15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
    下面是正则表达式:
出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
15位校验规则 6位地址编码+6位出生日期+3位顺序号
18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位

校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
公式(1)中：
i----表示号码字符从由至左包括校验码在内的位置序号；
ai----表示第i位置上的号码字符值；
Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
*/
/**
 * 身份证号合法性验证
 * 支持15位和18位身份证号
 * 支持地址编码、出生日期、校验位验证
 * @param code
 * @constructor
 */
function checkIdCard(code) {
    let tip = "";
    let city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };

    if (!code || (code.length != 15 && code.length != 18) || !(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/i.test(code))) {
        tip = "身份证号格式错误";
    } else if (!city[code.substr(0, 2)]) {
        tip = "身份证号地址编码错误";
    } else {
        if ((code.length == 15 && !isValidityBrithBy15IdCard(code))
            || (code.length == 18 && !isValidityBrithBy18IdCard(code))) {
            tip = "身份证号生日信息错误";
        } else if (code.length == 18) {
            let a_idCard = code.split("");                // 得到身份证数组
            if (!isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
                tip = "身份证号校验位错误";
            }
        }
    }
    console.log("checkIdCard code,tip", code, tip);
    return tip;
}

/**
 * 验证身份证号码中的生日是否是有效生日
 * 介于1800年至今
 * @return
 */
function isValidityBrithByIdCard(idCard, idCardLength) {
    let brith;
    if (idCardLength == 15) {
        brith = "19" + idCard.substring(6, 8) + "-" + idCard.substring(8, 10) + "-" + idCard.substring(10, 12);
    } else if (idCardLength == 18) {
        brith = idCard.substring(6, 10) + "-" + idCard.substring(10, 12) + "-" + idCard.substring(12, 14);
    }
    let brithDate = new Date(brith);
    if (!brithDate.getDate() || brithDate > Date.now() || brithDate < new Date("1800-01-01")) {
        return false;
    }
    return true;
}

/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
    let sum = 0;                             // 声明加权求和变量
    let ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X
    let Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作
    }
    for (let i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];            // 加权求和
    }
    let valCodePosition = sum % 11;                // 得到验证码所位置
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}

/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard(idCard18) {
    let year = idCard18.substring(6, 10);
    let month = idCard18.substring(10, 12);
    let day = idCard18.substring(12, 14);
    let temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    if (temp_date.getFullYear() != parseFloat(year)
        || temp_date.getMonth() != parseFloat(month) - 1
        || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
function isValidityBrithBy15IdCard(idCard15) {
    let year = idCard15.substring(6, 8);
    let month = idCard15.substring(8, 10);
    let day = idCard15.substring(10, 12);
    let temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    if (temp_date.getYear() != parseFloat(year)
        || temp_date.getMonth() != parseFloat(month) - 1
        || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 通过身份证号获取生日
 * @param idCard 身份证号
 * @return 格式为"yyyy-MM-dd"
 */
function getBirthByIdCard(idCard) {
    let birthday = "";
    if (idCard != null && idCard != "") {
        if (idCard.length == 15) {
            birthday = "19" + idCard.substr(6, 6);
        } else if (idCard.length == 18) {
            birthday = idCard.substr(6, 8);
        }
        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
    }
    console.log("getBirthByIdCard", idCard, birthday);
    return birthday;
}
