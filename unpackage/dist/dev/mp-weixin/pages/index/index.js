"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_addressBarAccess = require("../../utils/addressBarAccess.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad(async () => {
    });
    common_vendor.onShow(() => {
      if (utils_addressBarAccess.access()) {
        return;
      }
      console.log("show");
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HBuilderProjects/manhua/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
