"use strict";
const api_request = require("./request.js");
const userLogin = (data) => api_request.request.post("/user/login", data);
const userRegister = (data) => api_request.request.post("/user/reg", data);
const userWxLogin = (data) => api_request.request.post("/user/wxLogin", data);
exports.userLogin = userLogin;
exports.userRegister = userRegister;
exports.userWxLogin = userWxLogin;
