"use strict";
const api_request = require("../request.js");
const cartoon = {
  getCartoonList: (data) => api_request.request.get("/api/product/getCartoonList", data),
  queryCartoon: (works) => api_request.request.get(`/api/product/queryCartoon?works=${works}`),
  getCartoonDetail: (id) => api_request.request.get(`/api/product/getCartoonDetail?id=${id}`),
  getChapterList: (data) => api_request.request.get("/api/cartoon/getChapterList", data),
  getChapterPage: (chapter_id) => api_request.request.get(`/api/cartoon/getChapterPage?chapter_id=${chapter_id}`),
  addChapterRead: (data) => api_request.request.post("/api/chapter/read/add/", data),
  getHistoricalRecord: (data) => api_request.request.get("/api/cartoon/historicalRecord", data)
};
exports.cartoon = cartoon;
