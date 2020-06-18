/**
 * 返回数据状态
 * @returns {*[]}
 */
export function dicStateList(isAll) {
    let arr = isAll ? [{label: "全部", value: null}] : [];
    arr.push({label: "在用", value: 1});
    arr.push({label: "停用", value: 2});
    return arr;
}
