"use strict";
const common_vendor = require("../common/vendor.js");
const showMsg = ({ title, icon = "none", duration = 1500 }) => {
  common_vendor.index.showToast({
    title,
    icon,
    duration
  });
};
exports.showMsg = showMsg;
