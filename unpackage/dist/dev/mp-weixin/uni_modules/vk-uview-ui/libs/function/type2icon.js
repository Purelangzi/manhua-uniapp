"use strict";
function type2icon(type = "success", fill = false) {
  if (["primary", "info", "error", "warning", "success"].indexOf(type) == -1)
    type = "success";
  let iconName = "";
  switch (type) {
    case "primary":
      iconName = "info-circle";
      break;
    case "info":
      iconName = "info-circle";
      break;
    case "error":
      iconName = "close-circle";
      break;
    case "warning":
      iconName = "error-circle";
      break;
    case "success":
      iconName = "checkmark-circle";
      break;
    default:
      iconName = "checkmark-circle";
  }
  if (fill)
    iconName += "-fill";
  return iconName;
}
exports.type2icon = type2icon;
