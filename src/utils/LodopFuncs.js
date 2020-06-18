﻿/* eslint-disable */
let CreatedOKLodop7766 = null, CLodopIsLocal;
/* eslint-enable */

//====判断是否需要 Web打印服务CLodop:===
//===(不支持插件的浏览器版本需要用它)===
export function needCLodop() {
    try {
        let ua = navigator.userAgent;
        if (ua.match(/Windows\sPhone/i))
            return true;
        if (ua.match(/iPhone|iPod|iPad/i))
            return true;
        if (ua.match(/Android/i))
            return true;
        if (ua.match(/Edge\D?\d+/i))
            return true;

        let verTrident = ua.match(/Trident\D?\d+/i);
        let verIE = ua.match(/MSIE\D?\d+/i);
        let verOPR = ua.match(/OPR\D?\d+/i);
        let verFF = ua.match(/Firefox\D?\d+/i);
        let x64 = ua.match(/x64/i);
        if ((!verTrident) && (!verIE) && (x64))
            return true;
        else if (verFF) {
            verFF = verFF[0].match(/\d+/);
            if ((verFF[0] >= 41) || (x64))
                return true;
        } else if (verOPR) {
            verOPR = verOPR[0].match(/\d+/);
            if (verOPR[0] >= 32)
                return true;
        } else if ((!verTrident) && (!verIE)) {
            let verChrome = ua.match(/Chrome\D?\d+/i);
            if (verChrome) {
                verChrome = verChrome[0].match(/\d+/);
                if (verChrome[0] >= 41)
                    return true;
            }
        }
        return false;
    } catch (err) {
        return true;
    }
}

//====页面引用CLodop云打印必须的JS文件,用双端口(8000和18000）避免其中某个被占用：====
if (needCLodop()) {
    let src1 = "http://localhost:8000/CLodopfuncs.js?priority=1";
    let src2 = "http://localhost:18000/CLodopfuncs.js?priority=0";

    let head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    let oscript = document.createElement("script");
    oscript.src = src1;
    head.insertBefore(oscript, head.firstChild);
    oscript = document.createElement("script");
    oscript.src = src2;
    head.insertBefore(oscript, head.firstChild);
    CLodopIsLocal = !!((src1 + src2).match(/\/\/localho|\/\/127.0.0./i));
}

//====获取LODOP对象的主过程：====
//====获取LODOP对象的主过程：====
export function getLodop(oOBJECT, oEMBED,obj) {
    let pathName = window.document.location.pathname;
    let projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    let strHtmInstall = "<br><font>打印控件未安装!点击这里<a href='"+projectName+"/install_lodop32.exe' style='color:blue;' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    let strHtmUpdate = "<br><font>打印控件需要升级!点击这里<a href='"+projectName+"/install_lodop32.exe' style='color:blue;' target='_self'>执行升级</a>,升级后请重新进入。</font>";
    let strHtm64_Install = "<br><font>打印控件未安装!点击这里<a href='"+projectName+"/install_lodop64.exe' style='color:blue;' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    let strHtm64_Update = "<br><font>打印控件需要升级!点击这里<a href='"+projectName+"/install_lodop64.exe' style='color:blue;' target='_self'>执行升级</a>,升级后请重新进入。</font>";
    let strHtmFireFox = "<br><br><font>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
    let strHtmChrome = "<br><br><font>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
    let strCLodopInstall_1 = "<br><font>Web打印服务CLodop未安装启动，点击这里<a href='"+projectName+"/CLodop_Setup_for_Win32NT.exe' style='color:blue;' target='_self'>下载执行安装</a>";
    let strCLodopInstall_2 = "<br>（若此前已安装过，可<a href='"+projectName+"/CLodop.protocol:setup' style='color:blue;' target='_self'>点这里直接再次启动</a>）";
    let strCLodopInstall_3 = "，成功后请刷新本页面。</font>";
    let strCLodopUpdate = "<br><font>Web打印服务CLodop需升级!点击这里<a href='"+projectName+"/CLodop_Setup_for_Win32NT.exe' style='color:blue;' target='_self'>执行升级</a>,升级后请刷新页面。</font>";
    let LODOP;
    let is64IE;
    let errorMsg ="",tmpErrorMsg="";
    try {
        let ua = navigator.userAgent;
        let isIE = !!(ua.match(/MSIE/i)) || !!(ua.match(/Trident/i));
        if (needCLodop()) {
            try {
                LODOP = getCLodop();
            } catch (err) {}
            if (!LODOP && document.readyState !== "complete") {
                errorMsg = "网页还没下载完毕，请稍等一下再操作.";
            }else if (!LODOP) {
                errorMsg = strCLodopInstall_1 + (CLodopIsLocal ? strCLodopInstall_2 : "") + strCLodopInstall_3;
            } else {
                if (CLODOP.CVERSION < "3.0.8.3") {
                    tmpErrorMsg = strCLodopUpdate;
                }
                if (oEMBED && oEMBED.parentNode)
                    oEMBED.parentNode.removeChild(oEMBED);
                if (oOBJECT && oOBJECT.parentNode)
                    oOBJECT.parentNode.removeChild(oOBJECT);
            }
        } else {
            is64IE = isIE && !!(ua.match(/x64/i));
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT || oEMBED) {
                if (isIE)
                    LODOP = oOBJECT;
                else
                    LODOP = oEMBED;
            } else if (!CreatedOKLodop7766) {
                LODOP = document.createElement("object");
                LODOP.setAttribute("width", 0);
                LODOP.setAttribute("height", 0);
                LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE)
                    LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else
                    LODOP.setAttribute("type", "application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766 = LODOP;
            } else
                LODOP = CreatedOKLodop7766;
            //=====Lodop插件未安装时提示下载地址:==========
            if ((!LODOP) || (!LODOP.VERSION)) {
                if (ua.indexOf('Chrome') >= 0)
                    errorMsg = strHtmChrome + errorMsg;
                if (ua.indexOf('Firefox') >= 0)
                    errorMsg = strHtmFireFox + errorMsg;
                errorMsg = (is64IE ? strHtm64_Install : strHtmInstall) + errorMsg;
            }
        }

        if (!errorMsg && LODOP.VERSION < "6.2.2.6") {
            if (!needCLodop())
                errorMsg = (is64IE ? strHtm64_Update : strHtmUpdate) + tmpErrorMsg;
        }
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):==

        //=======================================================
    } catch (err) {
         errorMsg = "获取LODOP控件信息异常！"+err;
    }
    if(errorMsg){
        obj.$msgbox({
            title: '消息',
            message: errorMsg,
            dangerouslyUseHTMLString: true,
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(() => {
        }).catch(() => {
        });
        return null;
    }
    return LODOP
}
