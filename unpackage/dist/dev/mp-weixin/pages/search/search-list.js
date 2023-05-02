"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  SearchInput();
}
const SearchInput = () => "./component/search-input.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search-list",
  setup(__props) {
    common_vendor.reactive([]);
    common_vendor.onMounted(() => {
    });
    common_vendor.onLoad(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((val) => {
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HBuilderProjects/manhua/pages/search/search-list.vue"]]);
wx.createPage(MiniProgramPage);
