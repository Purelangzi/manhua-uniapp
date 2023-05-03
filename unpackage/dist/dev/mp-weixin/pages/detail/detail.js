"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  (_easycom_u_image2 + _easycom_u_button2 + _easycom_u_tabs2)();
}
const _easycom_u_image = () => "../../uni_modules/vk-uview-ui/components/u-image/u-image.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_tabs = () => "../../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
if (!Math) {
  (_easycom_u_image + _easycom_u_button + _easycom_u_tabs)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const readBtnStyle = { backgroundColor: "#ff7830", color: "#fff", padding: "25rpx 130rpx", fontSize: "36rpx" };
    const state = common_vendor.reactive({
      scrollTop: 0,
      list: [{ name: "详情" }, { name: "目录" }],
      current: 1
      // 默认展示目录
    });
    common_vendor.onLoad((option) => {
      console.log(option);
      console.log("onLoad");
    });
    common_vendor.onShow(() => {
      console.log("onShow");
    });
    common_vendor.onMounted(() => {
    });
    const changeTabs = (index) => {
      state.current = index;
    };
    const scroll = (e) => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          height: "440rpx",
          src: "https://oss.mkzcdn.com/comic/cover/20190919/5d833a6c51ab7-1000x562.jpg!banner-600"
        }),
        b: common_vendor.p({
          height: "440rpx",
          src: "https://static.mkzcdn.com/mobile/img/detail/bg_detail_bannerbg.png"
        }),
        c: common_vendor.p({
          height: "40rpx",
          src: "https://static.mkzcdn.com/mobile/img/detail/bg_banner.png"
        }),
        d: common_vendor.p({
          ["custom-style"]: readBtnStyle,
          shape: "circle"
        }),
        e: common_vendor.o(changeTabs),
        f: common_vendor.o(($event) => state.current = $event),
        g: common_vendor.p({
          list: state.list,
          ["active-color"]: "#28292d",
          ["bar-width"]: "120",
          ["is-scroll"]: false,
          ["bar-style"]: {
            backgroundColor: "#ff7830"
          },
          modelValue: state.current
        }),
        h: common_vendor.o(scroll),
        i: state.scrollTop
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"], ["__file", "F:/HBuilderProjects/manhua/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
