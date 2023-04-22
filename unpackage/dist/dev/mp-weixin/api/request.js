"use strict";
const common_vendor = require("../common/vendor.js");
const utils_showMsg = require("../utils/showMsg.js");
const baseUrl = "http://127.0.0.1:7001";
const request = (options) => {
  common_vendor.index.showLoading({
    title: "加载中"
  });
  let header = {};
  switch (options.method) {
    case "GET":
      header = {
        "content-type": "application/json"
      };
      break;
    case "POST":
      header = {
        "content-type": "application/x-www-form-urlencoded"
      };
      break;
  }
  const userJson = common_vendor.index.getStorageSync("USER");
  if (userJson) {
    const { token } = JSON.parse(userJson);
    header["token"] = "Bearer" + token;
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + options.url,
      method: options.method,
      data: options.data,
      header,
      success: (res) => {
        common_vendor.index.hideLoading();
        switch (res.statusCode) {
          case 200:
            resolve(res.data);
            break;
          case 400:
            utils_showMsg.showMsg({ title: "错误的请求", icon: "error" });
            reject(res.data);
            break;
          case 401:
            utils_showMsg.showMsg({ title: "Token 过期", icon: "error" });
            reject(res.data);
            break;
          default:
            utils_showMsg.showMsg({ title: res.data.msg, icon: "error" });
            reject(res.data);
            break;
        }
      },
      fail: (err) => {
        common_vendor.index.hideLoading();
        reject(err);
      },
      complete: () => {
      }
    });
  });
};
const request$1 = {
  get(url, data) {
    return request({ url, method: "GET", data });
  },
  post(url, data) {
    return request({ url, method: "POST", data });
  },
  delete(url, data) {
    return request({ url, method: "DELETE", data });
  },
  put(url, data) {
    return request({ url, method: "PUT", data });
  }
};
exports.request = request$1;
