"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_wxLogin = require("../../utils/wxLogin.js");
require("../../api/index.js");
require("../../api/module/common.js");
require("../../api/request.js");
require("../../utils/showMsg.js");
require("../../stores/user.js");
require("../../api/module/cartoon.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "category",
  setup(__props) {
    common_vendor.onShow(async () => {
      console.log("category-onShow");
      if (utils_wxLogin.wxIsLogin())
        return;
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HBuilderProjects/manhua/pages/category/category.vue"]]);
wx.createPage(MiniProgramPage);
