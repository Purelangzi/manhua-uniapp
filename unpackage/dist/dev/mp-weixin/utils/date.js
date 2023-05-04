"use strict";
const formatDate = (date) => {
  return date == null ? void 0 : date.split("T")[0].replaceAll("-", ".");
};
exports.formatDate = formatDate;
