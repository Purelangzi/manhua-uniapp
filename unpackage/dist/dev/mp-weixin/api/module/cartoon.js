"use strict";
const api_request = require("../request.js");
const cartoon = {
  getCartoonList: (data) => api_request.request.get("/api/product/getCartoonList", data),
  // 漫画列表
  queryCartoon: (works) => api_request.request.get(`/api/product/queryCartoon?works=${works}`),
  // 搜索
  getCartoonDetail: (id) => api_request.request.get(`/api/product/getCartoonDetail?id=${id}`),
  //漫画详情
  getChapterList: (data) => api_request.request.get("/api/cartoon/getChapterList", data),
  // 漫画章节列表
  getChapterPage: (chapter_id) => api_request.request.get(`/api/cartoon/getChapterPage?chapter_id=${chapter_id}`),
  // 漫画章节内容
  addChapterRead: (data) => api_request.request.post("/api/chapter/read/add/", data),
  // 添加章节阅读记录
  getHistoricalRecord: (data) => api_request.request.get("/api/cartoon/historicalRecord", data),
  // 获取阅读记录
  getCtcategory: (data) => api_request.request.get("/api/product/getCtcategory", data)
  // 漫画分类
};
exports.cartoon = cartoon;
