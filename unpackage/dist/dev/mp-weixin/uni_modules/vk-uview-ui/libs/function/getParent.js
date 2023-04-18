"use strict";
function getParent(name, keys) {
  let parent = this.$parent;
  while (parent) {
    if (parent.$options.name !== name) {
      parent = parent.$parent;
    } else {
      let data = {};
      if (Array.isArray(keys)) {
        keys.map((val) => {
          data[val] = parent[val] ? parent[val] : "";
        });
      } else {
        for (let i in keys) {
          if (Array.isArray(keys[i])) {
            if (keys[i].length) {
              data[i] = keys[i];
            } else {
              data[i] = parent[i];
            }
          } else if (keys[i].constructor === Object) {
            if (Object.keys(keys[i]).length) {
              data[i] = keys[i];
            } else {
              data[i] = parent[i];
            }
          } else {
            data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
          }
        }
      }
      return data;
    }
  }
  return {};
}
exports.getParent = getParent;
