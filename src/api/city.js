import request from "../utils/setaxios";

/**
 * 城市列表
 */
export function getCityList(data) {
    return request.post("/Movie/citylist", data,);
}
// 热门城市
export function getHotCityList(data) {
    return request.post("/Movie/hotcity", data,);
}
// 影院
export function getCinemaListLoca(data) {
    return request.post("/Movie/cinema", data,);
}
// 影院
// export function getCinemaListLoca(data) {
//     return request.post("/Test/cinema", data,);
// }
// 购票/观影须知
export function getCinemaGuide(data) {
    return request.post("/Movie/guide", data,);
}
// 创建订单
export function creatNewOrder(data) {
    return request.post("/Movie/create_order", data,);
}
// 用户有效期内未支付的订单
export function getunpayorder(data) {
    return request.post("/Movie/unpayorder", data,);
}
// 取消订单
export function unorder(data) {
    return request.post("/Movie/unorder", data,);
}
// 结算-订单详情查询
export function getPayOrdershow(data) {
    return request.post("/Movie/jsordershow", data,);
}
//结算-尊享券列表
export function getMoviecard(data) {
    return request.post("/Movie/card", data,);
}
//立即支付-计算卡是否够支付
export function getMoviepayDate(data) {
    return request.post("/Movie/pay_date", data,);
}
//尊享券支付
export function getMovieflkpay(data) {
    return request.post("/Movie/flkpay", data,);
}
//电影微信支付
export function getMoviewxpay(data) {
    return request.post("/Movie/wxpay", data,);
}
//支付完成后检测
export function getMoviepaySuccess(data) {
    return request.post("/Movie/pay_success", data,);
}
//获取当前时间
export function getNowTime(data) {
    return request.post("/Movie/gettime", data,);
}
//区县
// export function getCountyList(data) {
//     return request.post("", data, { login: false });
// }
// export function getDramaList(data) {
//     return request.post("", data, { login: false });
// }
