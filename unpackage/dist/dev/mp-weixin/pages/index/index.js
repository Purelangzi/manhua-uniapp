"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../api/request.js");
const utils_wxLogin = require("../../utils/wxLogin.js");
require("../../utils/showMsg.js");
require("../../stores/user.js");
require("../../api/index.js");
require("../../api/module/common.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
      console.log("index-onShow");
      if (utils_wxLogin.wxIsLogin())
        return;
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HBuilderProjects/manhua/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
