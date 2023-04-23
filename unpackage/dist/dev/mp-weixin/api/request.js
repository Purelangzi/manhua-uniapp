"use strict";
const common_vendor = require("../common/vendor.js");
const utils_showMsg = require("../utils/showMsg.js");
const stores_user = require("../stores/user.js");
const baseUrl = "http://127.0.0.1:7001";
const userStore = stores_user.useUser();
const request = (options) => {
  common_vendor.index.addInterceptor("request", {
    invoke: (args) => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      switch (options.method) {
        case "GET":
          args.header = {
            "content-type": "application/json"
          };
          break;
        case "POST":
          args.header = {
            "content-type": "application/x-www-form-urlencoded"
          };
          break;
      }
      const token = userStore.userInfo.token;
      if (token) {
        args.header["token"] = "Bearer" + token;
      }
    },
    complete: () => {
      common_vendor.index.hideLoading();
    }
  });
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + options.url,
      method: options.method,
      data: options.data,
      success: (res) => {
        switch (res.statusCode) {
          case 200:
            resolve(res.data);
            break;
          case 400:
            utils_showMsg.showMsg({ title: "错误的请求", icon: "error" });
            reject(res.data);
            break;
          case 401:
            utils_showMsg.showMsg({ title: "Token 过期或未登录", icon: "error", duration: 3e3 });
            userStore.logOut();
            reject(res.data);
            break;
          default:
            utils_showMsg.showMsg({ title: res.data.msg, icon: "error" });
            reject(res.data);
            break;
        }
      },
      fail: (err) => {
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
