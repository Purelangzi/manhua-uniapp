"use strict";
const api_request = require("../request.js");
const cartoon = {
  getCartoonList: (data) => api_request.request.get("/api/product/getCartoonList", data),
  queryCartoon: (works) => api_request.request.get(`/api/product/queryCartoon?works=${works}`)
};
exports.cartoon = cartoon;
