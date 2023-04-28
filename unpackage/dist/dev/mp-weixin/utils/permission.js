"use strict";
const common_vendor = require("../common/vendor.js");
const utils_showMsg = require("./showMsg.js");
const whiteList = ["/pages/user/user-login"];
const hasPermission = (url) => {
  console.log(url, "url");
  const userInfo = common_vendor.index.getStorageSync("USER");
  let token = "";
  if (userInfo) {
    token = JSON.parse(userInfo).token;
  }
  getCurrentPages();
  if (token) {
    console.log("有token");
    if (url !== "pages/user/user-login") {
      return true;
    } else {
      return false;
    }
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
common_vendor.index.addInterceptor("navigateTo", {
  // invoke根据返回值判断是否继续执行调整
  invoke: (config) => {
    console.log("navigateTo");
    return hasPermission(config.url);
  }
});
common_vendor.index.addInterceptor("switchTab", {
  invoke(config) {
    console.log("switchTab");
    return hasPermission(config.url);
  }
});
common_vendor.index.addInterceptor("redirectTo", {
  invoke(config) {
    console.log("redirectTo");
    return hasPermission(config.url);
  }
});
common_vendor.index.addInterceptor("navigateBack", {
  invoke(config) {
    console.log(config, "navigateBack");
    return hasPermission(config.url);
  }
});
common_vendor.index.addInterceptor("reLaunch", {
  invoke(config) {
    console.log(config, "reLaunch");
    return hasPermission(config.url);
  }
});
