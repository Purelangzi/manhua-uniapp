"use strict";
const common_vendor = require("../common/vendor.js");
const showToast = ({ title, icon = "error", duration = 1500, msg }) => {
  common_vendor.index.showToast({
    title: title || msg || "error",
    icon,
    duration
  });
};
exports.showToast = showToast;
