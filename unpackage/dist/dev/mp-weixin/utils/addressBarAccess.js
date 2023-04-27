"use strict";
const common_vendor = require("../common/vendor.js");
let showNum = 0;
let actNum = 0;
const load = () => {
  if (!common_vendor.index.getStorageSync("USER")) {
    if (showNum === 0) {
      showNum++;
    }
    console.log("地址栏ac");
    common_vendor.index.redirectTo({
      url: "/pages/user/user-login"
    });
    return true;
  }
  return false;
};
const activated = () => {
  actNum++;
  if (showNum === 1 && actNum >= 2) {
    load();
  }
};
const addressBarAccess = {
  load,
  activated
};
exports.addressBarAccess = addressBarAccess;
