"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  _easycom_u_image2();
}
const _easycom_u_image = () => "../../uni_modules/vk-uview-ui/components/u-image/u-image.js";
if (!Math) {
  _easycom_u_image();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "comic-box",
  props: {
    detail: null
  },
  setup(__props) {
    const props = __props;
    const goCartoonDetail = (id) => {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.detail, (item, k0, i0) => {
          return {
            a: "fb7bc7f4-0-" + i0,
            b: common_vendor.p({
              src: item.cover_lateral,
              height: "275rpx"
            }),
            c: item.charge == 1,
            d: common_vendor.t(item.name),
            e: common_vendor.t(item.cartoon_introduction),
            f: common_vendor.o(($event) => goCartoonDetail(item.id), item.id),
            g: item.id
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fb7bc7f4"], ["__file", "F:/HBuilderProjects/manhua/components/comic-box/comic-box.vue"]]);
wx.createComponent(Component);
