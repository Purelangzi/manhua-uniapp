"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "book",
  setup(__props) {
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
      if (!common_vendor.index.getStorageSync("USER")) {
        common_vendor.index.switchTab({
          url: "/pages/user/user"
        });
      }
    });
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HBuilderProjects/manhua/pages/book/book.vue"]]);
wx.createPage(MiniProgramPage);
