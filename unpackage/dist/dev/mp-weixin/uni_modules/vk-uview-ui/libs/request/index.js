"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_vkUviewUi_libs_function_deepMerge = require("../function/deepMerge.js");
const uni_modules_vkUviewUi_libs_function_test = require("../function/test.js");
class Request {
  // 设置全局默认配置
  setConfig(customConfig) {
    this.config = uni_modules_vkUviewUi_libs_function_deepMerge.deepMerge(this.config, customConfig);
  }
  // 主要请求部分
  request(options = {}) {
    if (this.interceptor.request && typeof this.interceptor.request === "function") {
      let interceptorRequest = this.interceptor.request(options);
      if (interceptorRequest === false) {
        return new Promise(() => {
        });
      }
      this.options = interceptorRequest;
    }
    options.dataType = options.dataType || this.config.dataType;
    options.responseType = options.responseType || this.config.responseType;
    options.url = options.url || "";
    options.params = options.params || {};
    options.header = Object.assign({}, this.config.header, options.header);
    options.method = options.method || this.config.method;
    return new Promise((resolve, reject) => {
      options.complete = (response) => {
        common_vendor.index.hideLoading();
        clearTimeout(this.config.timer);
        this.config.timer = null;
        if (this.config.originalData) {
          if (this.interceptor.response && typeof this.interceptor.response === "function") {
            let resInterceptors = this.interceptor.response(response);
            if (resInterceptors !== false) {
              resolve(resInterceptors);
            } else {
              reject(response);
            }
          } else {
            resolve(response);
          }
        } else {
          if (response.statusCode == 200) {
            if (this.interceptor.response && typeof this.interceptor.response === "function") {
              let resInterceptors = this.interceptor.response(response.data);
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                reject(response.data);
              }
            } else {
              resolve(response.data);
            }
          } else {
            reject(response);
          }
        }
      };
      options.url = uni_modules_vkUviewUi_libs_function_test.test.url(options.url) ? options.url : this.config.baseUrl + (options.url.indexOf("/") == 0 ? options.url : "/" + options.url);
      if (this.config.showLoading && !this.config.timer) {
        this.config.timer = setTimeout(() => {
          common_vendor.index.showLoading({
            title: this.config.loadingText,
            mask: this.config.loadingMask
          });
          this.config.timer = null;
        }, this.config.loadingTime);
      }
      common_vendor.index.request(options);
    });
  }
  constructor() {
    this.config = {
      baseUrl: "",
      // 请求的根域名
      // 默认的请求头
      header: {},
      method: "POST",
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: "json",
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: "text",
      showLoading: true,
      // 是否显示请求中的loading
      loadingText: "请求中...",
      loadingTime: 800,
      // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null,
      // 定时器
      originalData: false,
      // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true
      // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null
    };
    this.get = (url, data = {}, header = {}) => {
      return this.request({
        method: "GET",
        url,
        header,
        data
      });
    };
    this.post = (url, data = {}, header = {}) => {
      return this.request({
        url,
        method: "POST",
        header,
        data
      });
    };
    this.put = (url, data = {}, header = {}) => {
      return this.request({
        url,
        method: "PUT",
        header,
        data
      });
    };
    this.delete = (url, data = {}, header = {}) => {
      return this.request({
        url,
        method: "DELETE",
        header,
        data
      });
    };
  }
}
const http = new Request();
exports.http = http;
