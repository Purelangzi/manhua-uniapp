"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "404",
  setup(__props) {
    const customStyleError = { backgroundColor: "#ff7830", color: "#fff" };
    common_vendor.onLoad(() => {
    });
    common_vendor.onMounted(() => {
    });
    const handleBack = () => {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          type: "error",
          ["custom-style"]: customStyleError,
          shape: "circle"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f50617b2"], ["__file", "F:/HBuilderProjects/manhua/pages/404/404.vue"]]);
wx.createPage(MiniProgramPage);
