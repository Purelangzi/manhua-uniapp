"use strict";
const common_vendor = require("../common/vendor.js");
const whiteList = ["/pages/user/user-login"];
const hasPermission = (url) => {
  console.log(url);
  const userInfo = common_vendor.index.getStorageSync("USER");
  let token = "";
  if (userInfo) {
    token = JSON.parse(userInfo).token;
  }
  const pathArr = getCurrentPages();
  if (whiteList.includes(url) || token) {
    console.log("在白名单中或有token");
    return true;
  } else {
    console.log(pathArr, "pathArr");
    if (!pathArr.length || pathArr.length >= 1) {
      console.log("防止登录后用户手动清除token，不会自动跳到用户登录页");
      common_vendor.index.switchTab({
        url: "/pages/user/user-login"
        /* success: () => {
        	if(pathArr.length){
        		const pages = getCurrentPages()
        		const perpage = pages[pages.length - 1]
        		
        	}
        	
        } */
      });
    } else {
      console.log(pathArr, "ddddd");
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
  }
});
common_vendor.index.addInterceptor("navigateBack", {
  invoke(config) {
    console.log(config, "navigateBack");
  }
});
common_vendor.index.addInterceptor("redirectTo", {
  invoke(config) {
    console.log(config, "redirectTo");
  }
});
common_vendor.index.addInterceptor("reLaunch", {
  invoke(config) {
    console.log(config, "reLaunch");
    return hasPermission(config.url);
  }
});
