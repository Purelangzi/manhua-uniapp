"use strict";
const common_vendor = require("../common/vendor.js");
const isLogin = () => {
  console.log("isLogin........");
  if (!common_vendor.index.getStorageSync("USER")) {
    common_vendor.index.reLaunch({
      url: "/pages/user/user-login"
    });
    return true;
  }
  return false;
};
exports.isLogin = isLogin;
