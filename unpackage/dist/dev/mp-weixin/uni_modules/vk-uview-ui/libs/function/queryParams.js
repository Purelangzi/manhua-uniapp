"use strict";
function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
  let prefix = isPrefix ? "?" : "";
  let _result = [];
  if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
    arrayFormat = "brackets";
  for (let key in data) {
    let value = data[key];
    if (["", void 0, null].indexOf(value) >= 0) {
      continue;
    }
    if (value.constructor === Array) {
      switch (arrayFormat) {
        case "indices":
          for (let i = 0; i < value.length; i++) {
            _result.push(key + "[" + i + "]=" + value[i]);
          }
          break;
        case "brackets":
          value.forEach((_value) => {
            _result.push(key + "[]=" + _value);
          });
          break;
        case "repeat":
          value.forEach((_value) => {
            _result.push(key + "=" + _value);
          });
          break;
        case "comma":
          let commaStr = "";
          value.forEach((_value) => {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + "=" + commaStr);
          break;
        default:
          value.forEach((_value) => {
            _result.push(key + "[]=" + _value);
          });
      }
    } else {
      _result.push(key + "=" + value);
    }
  }
  return _result.length ? prefix + _result.join("&") : "";
}
exports.queryParams = queryParams;
