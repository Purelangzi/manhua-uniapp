"use strict";
const api_request = require("../request.js");
const common = {
  userLogin: (data) => api_request.request.post("/user/login", data),
  userRegister: (data) => api_request.request.post("/user/reg", data),
  userWxLogin: (data) => api_request.request.post("/user/wxLogin", data),
  editAccount: (data) => api_request.request.post("/api/system/editAccount", data),
  getHomeData: () => api_request.request.get("/api/home/getHomeData")
};
exports.common = common;
