"use strict";
const common_vendor = require("../common/vendor.js");
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
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          switch (res.statusCode) {
            case 400:
              showToast({ title: "错误的请求" });
              reject(res);
              break;
            case 401:
              showToast({ title: "Token 过期" });
              reject(res);
              break;
            default:
              showToast({ msg: res.data.msg });
              reject(res);
              break;
          }
        }
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        common_vendor.index.hideLoading();
      }
    });
  });
};
const showToast = ({ title, icon = "error", duration, msg }) => {
  common_vendor.index.showToast({
    title: title || msg || "error",
    icon,
    duration
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
