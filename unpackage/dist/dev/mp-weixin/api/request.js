"use strict";
const common_vendor = require("../common/vendor.js");
const utils_showMsg = require("../utils/showMsg.js");
const stores_user = require("../stores/user.js");
const utils_wxLogin = require("../utils/wxLogin.js");
let isRefreshing = false;
let requests = [];
const baseUrl = "http://127.0.0.1:7001";
const userStore = stores_user.useUser();
const request = (options) => {
  common_vendor.index.addInterceptor("request", {
    invoke: (args) => {
      console.log(args);
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
      const token = userStore.token;
      if (token) {
        args.header["token"] = "Bearer " + token;
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
      success: async (res) => {
        switch (res.statusCode) {
          case 200:
            resolve(res.data);
            break;
          case 400:
            utils_showMsg.showMsg({ title: "错误的请求", icon: "error" });
            reject(res.data);
            break;
          case 401:
            console.log("401wx");
            if (!isRefreshing) {
              console.log("微信刷新token");
              isRefreshing = true;
              utils_wxLogin.wxLogin();
              requests.map((cb) => cb());
              requests = [];
            }
            resolve(new Promise((reslove) => {
              requests.push(() => {
                reslove(request(options));
              });
            }));
            break;
          default:
            utils_showMsg.showMsg({ title: res.data.msg, icon: "error" });
            reject(res.data);
            break;
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  }).catch((e) => {
    console.log(e);
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
