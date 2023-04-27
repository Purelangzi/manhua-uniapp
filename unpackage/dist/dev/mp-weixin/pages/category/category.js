"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_addressBarAccess = require("../../utils/addressBarAccess.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "category",
  setup(__props) {
    common_vendor.onShow(async () => {
      console.log("category-onShow");
      let flag = utils_addressBarAccess.addressBarAccess.load();
      if (flag)
        return;
    });
    common_vendor.onActivated(() => {
      console.log("category-onActivated");
      utils_addressBarAccess.addressBarAccess.activated();
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HBuilderProjects/manhua/pages/category/category.vue"]]);
wx.createPage(MiniProgramPage);
