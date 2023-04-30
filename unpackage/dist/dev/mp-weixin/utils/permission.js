"use strict";
const common_vendor = require("../common/vendor.js");
const utils_showMsg = require("./showMsg.js");
const whiteList = ["/pages/user/user-login", "/pages/404/404"];
let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab", "navigateBack"];
list.forEach((item) => {
  common_vendor.index.addInterceptor(item, {
    // invoke根据返回值判断是否继续执行调整
    invoke: (config) => {
      return hasPermission(config.url);
    }
  });
});
const hasPermission = (url) => {
  const userInfo = common_vendor.index.getStorageSync("USER");
  if (userInfo) {
    return true;
  } else {
    if (whiteList.includes(url)) {
      return true;
    }
    utils_showMsg.showMsg({ title: "请登录" });
    common_vendor.index.redirectTo({
      url: "/pages/user/user-login"
    });
    return false;
  }
};
