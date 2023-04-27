"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_addressBarAccess = require("../../utils/addressBarAccess.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "book",
  setup(__props) {
    common_vendor.onShow(async () => {
      console.log("book-onShow");
      let flag = utils_addressBarAccess.addressBarAccess.load();
      if (flag)
        return;
    });
    common_vendor.onActivated(() => {
      console.log("book-onActivated");
      utils_addressBarAccess.addressBarAccess.activated();
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HBuilderProjects/manhua/pages/book/book.vue"]]);
wx.createPage(MiniProgramPage);
