"use strict";
const uni_modules_vkUviewUi_libs_function_timeFormat = require("./timeFormat.js");
function timeFrom(dateTime = null, format = "yyyy-mm-dd") {
  if (!dateTime)
    dateTime = Number(new Date());
  if (dateTime.toString().length == 10)
    dateTime *= 1e3;
  let timestamp = +new Date(Number(dateTime));
  let timer = (Number(new Date()) - timestamp) / 1e3;
  let tips = "";
  switch (true) {
    case timer < 300:
      tips = "刚刚";
      break;
    case (timer >= 300 && timer < 3600):
      tips = parseInt(timer / 60) + "分钟前";
      break;
    case (timer >= 3600 && timer < 86400):
      tips = parseInt(timer / 3600) + "小时前";
      break;
    case (timer >= 86400 && timer < 2592e3):
      tips = parseInt(timer / 86400) + "天前";
      break;
    default:
      if (format === false) {
        if (timer >= 2592e3 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + "个月前";
        } else {
          tips = parseInt(timer / (86400 * 365)) + "年前";
        }
      } else {
        tips = uni_modules_vkUviewUi_libs_function_timeFormat.timeFormat(timestamp, format);
      }
  }
  return tips;
}
exports.timeFrom = timeFrom;
