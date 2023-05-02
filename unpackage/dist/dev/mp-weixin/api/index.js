"use strict";
const api_module_common = require("./module/common.js");
const api_module_cartoon = require("./module/cartoon.js");
const api = {
  ...api_module_common.common,
  ...api_module_cartoon.cartoon
};
exports.api = api;
