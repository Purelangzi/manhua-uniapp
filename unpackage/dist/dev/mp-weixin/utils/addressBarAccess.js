"use strict";
const common_vendor = require("../common/vendor.js");
const access = () => {
  if (!common_vendor.index.getStorageSync("USER")) {
    console.log("access");
    common_vendor.index.switchTab({
      url: "/pages/user/user-login"
    });
    return true;
  }
  return false;
};
exports.access = access;
