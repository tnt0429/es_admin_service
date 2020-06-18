import {getToken} from '@/utils/auth'


/**
 * 以split分隔的字符串转为数组
 * @param str
 * @param split
 * @returns {Array}
 */
let str2Array = function (str, split) {
    let array = [];
    split = split || ",";
    if (str && str.length > 0) {
        array = str.split(split)
    }
    return array;
}
let str2IntArray = function (str, split) {
    let array = [];
    split = split || ",";
    if (str && str.length > 0) {
        let list = str.split(split);
        if (list && list.length > 0) {
            list.map(item => {
                array.push(parseInt(item))
            })
        }
    }
    return array;
}
/**
 * 数组转为以split分隔的字符串
 * @param array
 * @param split
 * @returns {Array}
 */
let array2Str = function (array, split) {
    let str = '';
    split = split || ",";
    if (array && array.length > 0) {
        str = array.join(split);
    }
    return str;
}

/**
 * 获取集合内数据，根据集合索引
 * @param list
 * @param index
 * @returns {string}
 */
let getArrayName = function (list, index) {
    let name = '';
    if (list && list.length > 0 && index != null && index != undefined && index >= 0 && index < list.length) {
        name = list[index]
    }
    return name
}

/**
 * 使用form方式下载文件
 * @param url   要跳转到的页面
 * @param data  要传递的数据
 */
function downFileByForm(url, data) {
    let token = getToken();
    if (token) {
        let tempForm = document.createElement("form");  //创建一个form表单
        tempForm.id = "tempForm1";  //form的id
        tempForm.method = "post";  //请求方式为post
        tempForm.action = url; //这里是跳转的页面
        //tempForm.target="_blank"; //打开新页面
        let hideInput1 = document.createElement("input"); //input输入框
        hideInput1.type = "hidden";  //隐藏input
        hideInput1.name = "token"; //后台要接受这个参数来取值,传参
        hideInput1.value = token; //后台实际取到的值
        let hideInput2 = document.createElement("input"); //input输入框
        hideInput2.type = "hidden";  //隐藏input
        hideInput2.name = "queryJsonStr"; //后台要接受这个参数来取值,传参
        hideInput2.value = JSON.stringify(data); //后台实际取到的值
        tempForm.appendChild(hideInput1); //表单里面添加input
        tempForm.appendChild(hideInput2); //表单里面添加input
        if (document.all) {
            //是页面内所有元素的一个集合
            document.all;
            //IE绑定onsubmit的事件响应
            tempForm.attachEvent("onsubmit", function () {
            });
        } else {
            tempForm.addEventListener("submit", function () {
            }, false); //firefox
        }
        //整个文档里面添加form
        document.body.appendChild(tempForm);
        if (document.all) {
            tempForm.fireEvent("onsubmit");
        } else {
            tempForm.dispatchEvent(new Event("submit"));
        }
        tempForm.submit();//提交事件
        document.body.removeChild(tempForm);//提交完成后删除
    }
}

/**
 * 校验打印控件对象
 * @param LODOP
 * @param obj
 * @returns {boolean}
 */
function checkLodop(LODOP, obj) {
  /*console.log("checkLodop", ((!LODOP) || (!LODOP.VERSION) || LODOP.VERSION < "6.2.2.6"));
  if (!LODOP || !LODOP.VERSION || LODOP.VERSION < "6.2.2.6") {
      let pathName = window.document.location.pathname;
      let projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
      obj.$msgbox({
          title: '消息',
          message: '<font>Web打印服务CLodop未安装启动，点击这里<a href=\'' + projectName + '/CLodop_Setup_for_Win32NT.exe\' style="color:blue;" target=\'_self\'>下载</a>并完成安装后刷新重试！</font>',
          dangerouslyUseHTMLString: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
      }).then(() => {
      }).catch(() => {
      });
      return false;
  }*/
  if (!LODOP) {
    return false;
  }
  return true;
}

/**
 * 校验是否为整数，且位数符合规则digit，如{1,3}
 * @param value
 * @param digit
 * @returns {boolean}
 */
function checkInt(value, digit) {
    //let pattern = /^[0-9]{1,3}$/;
    digit = digit || "{1,3}";
    let pattern = new RegExp("^[0-9]" + digit + "$")
    let result = pattern.test(value);
    console.log("checkHeight", value, result);
    return result;
}

/**
 *
 * @param value
 * @returns {boolean}
 */
function checkPhone(value) {
    return checkInt(value, "{11}");
}

function lodopPrint(LODOP) {
    LODOP.PREVIEW();
    //LODOP.PRINT();
    // LODOP.PRINT_SETUP();
    //LODOP.PRINT_DESIGN();
}

export default {
    str2Array: str2Array,
    str2IntArray: str2IntArray,
    array2Str: array2Str,
    getArrayName: getArrayName,
    downFileByForm: downFileByForm,
    checkLodop: checkLodop,
    checkInt: checkInt,
    checkPhone: checkPhone,
    lodopPrint: lodopPrint,
}

