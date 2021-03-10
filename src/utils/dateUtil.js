/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).DateFormat("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).DateFormat("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.DateFormat = function (format) {
    let o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
}

/**
 * 字符串日期转为日期
 * @param dateStr
 * @param separator
 * @returns {number}
 */
export function str2Date(dateStr, separator) {
    if (!separator) {
        separator = "-";
    }
    let timestamp = null;
    if (dateStr) {
        if (dateStr.length > 19) {
            dateStr = dateStr.substring(0, 19);
        }
        dateStr = dateStr.replace(/-/g, '/');
        timestamp = new Date(dateStr);
    }
    return timestamp;
}

/**
 * 日期转为字符串日期
 * @param date
 * @param format
 * @returns {string}
 */
export function date2Str(date, format) {
    if (!format) {
        format = "yyyy-MM-dd";
    }
    let dateStr = "";
    if (date) {
        dateStr = date.DateFormat(format)
    }
    return dateStr;
}

/**
 * 获得n天、或n个月、或n年前/后的日期时间。
 * @param n 取负数表示n天/月/年前
 * @param timeUnit 取值"d"、"M"、"y"分别表示天，月，年
 * @param date 日期
 * @returns {*|Date}
 */
function initDefaultDate(n, timeUnit, _date) {
    n = n || 0;
    timeUnit = timeUnit || "d";
    _date = _date || new Date();
    if (timeUnit === "s") {
        _date.setSeconds(_date.getSeconds() + n);
    } else if (timeUnit === "m") {
        _date.setMinutes(_date.getMinutes() + n);
    } else if (timeUnit === "h") {
        _date.setHours(_date.getHours() + n);
    } else if (timeUnit === "d") {
        _date.setDate(_date.getDate() + n);
    } else if (timeUnit === "M") {
        _date.setMonth(_date.getMonth() + n);
    } else if (timeUnit === "y") {
        _date.setFullYear(_date.getFullYear() + n);
    }
    return _date;
}

export function getIntervalSeconds(TimeOne, TimeTwo) {
    TimeOne = Date.parse(new Date(TimeOne.replace(/-/g, "/"))); //begintime 为开始时间
    TimeTwo = Date.parse(new Date(TimeTwo.replace(/-/g, "/")));   // endtime 为结束时间
    return Math.floor((TimeOne - TimeTwo) / (1000));
}

export function getStrMinuteYMD(n, date) {
    date = initDefaultDate(n, 'm', date)
    return date.DateFormat('yyyy-MM-dd');
}

export function getStrMinuteYMDHMS(n, date) {
    date = initDefaultDate(n, 'm', date)
    return date.DateFormat('yyyy-MM-dd hh:mm:ss');
}

export function getStrMinuteHMS(n, date) {
    date = initDefaultDate(n, 'm', date)
    return date.DateFormat('hh:mm:ss');
}

export function getStrMinuteHM(n, date) {
    date = initDefaultDate(n, 'm', date)
    return date.DateFormat('hh:mm');
}

export function getStrDateYMD(n, date) {
    date = initDefaultDate(n, 'd', date)
    return date.DateFormat('yyyy-MM-dd');
}

export function getStrDateYMDHMS(n, date) {
    date = initDefaultDate(n, 'd', date)
    return date.DateFormat('yyyy-MM-dd hh:mm:ss');
}

export function getStrDateHMS(n, date) {
    date = initDefaultDate(n, 'd', date)
    return date.DateFormat('hh:mm:ss');
}

export function getStrDateHM(n, date) {
    date = initDefaultDate(n, 'd', date)
    return date.DateFormat('hh:mm');
}

export function getStrMonthYMD(n, date) {
    date = initDefaultDate(n, 'M', date)
    return date.DateFormat('yyyy-MM-dd');
}

export function getStrMonthYM(n, date) {
    date = initDefaultDate(n, 'M', date)
    return date.DateFormat('yyyy-MM');
}

export function getStrMonthYMDHMS(n, date) {
    date = initDefaultDate(n, 'M', date)
    return date.DateFormat('yyyy-MM-dd hh:mm:ss');
}

/**
 * 日期转换成年龄
 *
 * @param date String
 * @returns age = {num: 0,type: 1} num 数字，type类型（岁，月，天）
 */
export function BirthToNL(date) {
    let age = {
        num: 0,
        type: 1
    }

    let startYear = new Date().getFullYear();
    let startMonth = new Date().getMonth();
    let startDay = new Date().getDate();

    let endYear = date.getFullYear();
    let endMonth = date.getMonth();
    let endDay = date.getDate();

    if (startYear == endYear) {
        if (startMonth == endMonth) {
            age.num = startDay - endDay;
            age.type = 3; // 天
        } else {
            age.num = startMonth - endMonth;
            age.type = 2; // 月
        }
    } else {
        age.num = startYear - endYear;
    }

    return age;
}

/**
 * 年龄转换成日期
 *
 * @param age = {num: 0, type: 1} num 数字，type类型（岁，月，天）
 * @returns {String} date
 */
export function ageToDate(age) {
    let startYear = new Date().getFullYear();
    let startMonth = new Date().getMonth();
    let startDay = new Date().getDate();

    if (age != null || age != "") {
        let type = age.type;
        let num = age.num;
        let birthday = '';
        if (type == 1) {
            if ((startMonth + 1) > 9) {
                if (startDay > 9) {
                    birthday = (startYear - num) + "-" + (startMonth + 1) + "-" + startDay; // 出生日期
                } else {
                    birthday = (startYear - num) + "-" + (startMonth + 1) + "-0" + startDay; // 出生日期
                }
            } else {
                if (startDay > 9) {
                    birthday = (startYear - num) + "-0" + (startMonth + 1) + "-" + startDay; // 出生日期
                } else {
                    birthday = (startYear - num) + "-0" + (startMonth + 1) + "-0" + startDay; // 出生日期
                }
            }
        } else if (type == 2) {
            while (((startMonth + 1) - num) <= 0) {
                startYear = startYear - 1;
                startMonth = startMonth + 12
                // startDay=startDay;
            }
            if (((startMonth + 1) - num) > 9) {
                if (startDay > 9) {
                    birthday = startYear + "-" + ((startMonth + 1) - num) + "-" + startDay; // 出生日期
                } else {
                    birthday = startYear + "-" + ((startMonth + 1) - num) + "-0" + startDay; // 出生日期
                }
            } else {
                if (startDay > 9) {
                    birthday = startYear + "-0" + ((startMonth + 1) - num) + "-" + startDay; // 出生日期
                } else {
                    birthday = startYear + "-0" + ((startMonth + 1) - num) + "-0" + startDay; // 出生日期
                }
            }
        } else if (type == 3) {
            while ((startDay - num) <= 0) {
                //startYear=startYear;
                if ((startMonth - 1) <= 0) {
                    startYear = startYear - 1;
                    startMonth = startMonth + 12;
                } else {
                    startMonth = startMonth - 1;
                }
                startDay = startDay + new Date(startYear, startMonth + 1, 0).getDate();
            }
            if ((startMonth + 1) > 9) {
                if ((startDay - num) > 9) {
                    birthday = startYear + "-" + (startMonth + 1) + "-" + (startDay - num); // 出生日期
                } else {
                    birthday = startYear + "-" + (startMonth + 1) + "-0" + (startDay - num); // 出生日期
                }
            } else {
                if ((startDay - num) > 9) {
                    birthday = startYear + "-0" + (startMonth + 1) + "-" + (startDay - num); // 出生日期
                } else {
                    birthday = startYear + "-0" + (startMonth + 1) + "-0" + (startDay - num); // 出生日期
                }
            }
        }
        return birthday;
    } else {
        if (startMonth > 9) {
            if (startDay > 9) {
                return startYear + "-" + startMonth + "-" + startDay;
            } else {
                return startYear + "-" + startMonth + "-0" + startDay;
            }
        } else {
            if (startDay > 9) {
                return startYear + "-0" + startMonth + "-" + startDay;
            } else {
                return startYear + "-0" + startMonth + "-0" + startDay;
            }
        }

    }
}


/**
 * 年龄转换成生日
 */
export function changeAge2Birth(ageYear, ageMonth, ageDay) {

    let newDate = new Date();
    newDate.setDate(newDate.getDate() - ageDay);
    newDate.setMonth(newDate.getMonth() - ageMonth);
    newDate.setFullYear(newDate.getFullYear() - ageYear);
    let birthDay = newDate;

    let year = birthDay.getFullYear();
    let month = birthDay.getMonth() + 1;
    let day = birthDay.getDate();

    let birth = '';
    if (month > 9) {
        if (day > 9) {
            birth = year + "-" + month + "-" + day;
        } else {
            birth = year + "-" + month + "-0" + day;
        }
    } else {
        if (day > 9) {
            birth = year + "-0" + month + "-" + day;
        } else {
            birth = year + "-0" + month + "-0" + day;
        }
    }

    return birth;
}

/**
 * 生日转换成年龄
 */
export function changeBirth2Age(birth) {
    let age = ['', '', ''];
    if (birth) {
        birth = birth.replace(/-/g, "/");
        let t1 = new Date(birth);
        let t2 = new Date();

        //if(t1>t2) throw (t1+'不能大于'+t2);
        let y2 = t2.getFullYear(),
            m2 = t2.getMonth(),
            y = y2 - t1.getFullYear(),
            m = m2 - t1.getMonth(),
            d = t2.getDate() - t1.getDate(),
            md1 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            md2 = md1.slice();
        md2[1] += 1;

        let num = 0;
        while (d < 0) {
            if (m2 === 0 && num == 0) {
                m2 = 12;
            }
            num++;
            m2--;
            d += isleap(y2) ? md2[m2] : md1[m2];
            m--;
        }
        while (m < 0) {
            m += 12;
            y--;
        }
        age = [y, m, d];
    }

    function isleap(x) {
        return (x % 4 === 0 && x % 100 !== 0) || (x % 400 === 0);
    }

    return age;

}
