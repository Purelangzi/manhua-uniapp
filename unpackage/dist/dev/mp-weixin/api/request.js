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
      if (userStore.token && userStore.userInfo.session_key) {
        const nowTime = parseInt(new Date().getTime());
        const expireTime = parseInt((nowTime - userStore.tokenTime) / 1e3);
        console.log(expireTime, "expireTime");
        if (expireTime > 20) {
          if (!isRefreshing) {
            console.log("微信刷新token");
            isRefreshing = true;
            utils_wxLogin.refreshWxLogin();
            console.log(requests);
            requests.forEach((cb) => cb());
            isRefreshing = false;
            requests = [];
          }
        }
      }
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
            if (!userStore.userInfo.session_key) {
              utils_showMsg.showMsg({ title: "登录过期（token过期）", icon: "error", duration: 3e3 });
              userStore.logOut();
              reject(res.data);
            } else {
              resolve(new Promise((reslove) => {
                requests.push(() => {
                  console.log("p");
                  reslove(request(options));
                });
              }));
              console.log("401wx");
              if (!isRefreshing) {
                console.log("微信刷新token");
                isRefreshing = true;
                utils_wxLogin.refreshWxLogin();
                console.log(requests);
                requests.map((cb) => cb());
                isRefreshing = false;
                requests = [];
              }
            }
            break;
          default:
            utils_showMsg.showMsg({ title: res.data.msg, duration: 2e3 });
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
