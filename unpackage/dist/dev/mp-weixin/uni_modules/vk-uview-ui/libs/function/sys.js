"use strict";
const common_vendor = require("../../../../common/vendor.js");
function os() {
  return common_vendor.index.getSystemInfoSync().platform;
}
function sys() {
  return common_vendor.index.getSystemInfoSync();
}
exports.os = os;
exports.sys = sys;
