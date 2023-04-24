"use strict";
const common_vendor = require("../common/vendor.js");
const whiteList = ["/pages/user/user"];
const hasPermission = (url) => {
  const userInfo = common_vendor.index.getStorageSync("USER");
  let token = "";
  if (userInfo) {
    token = JSON.parse(userInfo).token;
  }
  const pathArr = getCurrentPages();
  if (whiteList.includes(url) || token) {
    return true;
  } else {
    if (!pathArr.length) {
      common_vendor.index.switchTab({
        url: "/pages/user/user"
      });
    } else {
      common_vendor.index.showToast({
        title: "登录才能查看哦",
        duration: 2e3,
        icon: "none"
      });
    }
    return false;
  }
};
common_vendor.index.addInterceptor("navigateTo", {
  // invoke根据返回值判断是否继续执行调整
  invoke: (config) => {
    return hasPermission(config.url);
  }
});
common_vendor.index.addInterceptor("switchTab", {
  invoke(config) {
    return hasPermission(config.url);
  }
});
