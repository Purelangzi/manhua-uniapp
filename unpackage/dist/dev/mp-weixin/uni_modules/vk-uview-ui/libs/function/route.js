"use strict";
const common_vendor = require("../../../../common/vendor.js");
class Router {
  constructor() {
    this.config = {
      type: "navigateTo",
      url: "",
      delta: 1,
      // navigateBack页面后退时,回退的层数
      params: {},
      // 传递的参数
      animationType: "pop-in",
      // 窗口动画,只在APP有效
      animationDuration: 300,
      // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false
      // 是否需要拦截
    };
    this.route = this.route.bind(this);
  }
  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  addRootPath(url) {
    return url[0] === "/" ? url : `/${url}`;
  }
  // 整合路由参数
  mixinParam(url, params) {
    url = url && this.addRootPath(url);
    let query = "";
    if (/.*\/.*\?.*=.*/.test(url)) {
      query = common_vendor.index.$u.queryParams(params, false);
      return url += "&" + query;
    } else {
      query = common_vendor.index.$u.queryParams(params);
      return url += query;
    }
  }
  // 对外的方法名称
  async route(options = {}, params = {}) {
    let mergeConfig = {};
    if (typeof options === "string") {
      mergeConfig.url = this.mixinParam(options, params);
      mergeConfig.type = "navigateTo";
    } else {
      mergeConfig = common_vendor.index.$u.deepClone(options, this.config);
      mergeConfig.url = this.mixinParam(options.url, options.params);
    }
    if (params.intercept) {
      this.config.intercept = params.intercept;
    }
    mergeConfig.params = params;
    mergeConfig = common_vendor.index.$u.deepMerge(this.config, mergeConfig);
    if (typeof common_vendor.index.$u.routeIntercept === "function") {
      const isNext = await new Promise((resolve, reject) => {
        common_vendor.index.$u.routeIntercept(mergeConfig, resolve);
      });
      isNext && this.openPage(mergeConfig);
    } else {
      this.openPage(mergeConfig);
    }
  }
  // 执行路由跳转
  openPage(config) {
    const {
      url,
      type,
      delta,
      animationType,
      animationDuration
    } = config;
    if (config.type == "navigateTo" || config.type == "to") {
      common_vendor.index.navigateTo({
        url,
        animationType,
        animationDuration
      });
    }
    if (config.type == "redirectTo" || config.type == "redirect") {
      common_vendor.index.redirectTo({
        url
      });
    }
    if (config.type == "switchTab" || config.type == "tab") {
      common_vendor.index.switchTab({
        url
      });
    }
    if (config.type == "reLaunch" || config.type == "launch") {
      common_vendor.index.reLaunch({
        url
      });
    }
    if (config.type == "navigateBack" || config.type == "back") {
      common_vendor.index.navigateBack({
        delta
      });
    }
  }
}
const route = new Router().route;
exports.route = route;
