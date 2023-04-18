"use strict";
const uni_modules_vkUviewUi_libs_function_deepClone = require("./deepClone.js");
function deepMerge(target = {}, source = {}) {
  target = uni_modules_vkUviewUi_libs_function_deepClone.deepClone(target);
  if (typeof target !== "object" || typeof source !== "object")
    return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop))
      continue;
    if (prop in target) {
      if (typeof target[prop] !== "object") {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== "object") {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}
exports.deepMerge = deepMerge;
