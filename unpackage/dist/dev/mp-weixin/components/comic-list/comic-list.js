"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../api/module/common.js");
require("../../api/request.js");
require("../../utils/showMsg.js");
require("../../stores/user.js");
require("../../utils/wxLogin.js");
require("../../api/module/cartoon.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_image2 + _easycom_u_icon2)();
}
const _easycom_u_image = () => "../../uni_modules/vk-uview-ui/components/u-image/u-image.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_image + _easycom_u_icon)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "comic-list",
  props: {
    list: null
  },
  setup(__props) {
    const props = __props;
    const onComicDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
    };
    const onComicPage = async (comic_id) => {
      try {
        const res = await api_index.api.getCartoonDetail(comic_id);
        const { read, price, charge, name } = res.data;
        const { data } = await api_index.api.getChapterList({
          page: 1,
          pageSize: 1,
          comic_id
        });
        const chapter_id = `chapter_id=${data.data[0].chapter_id}`;
        const params = `${chapter_id}&comic_id=${comic_id}&name=${name}&read=${read}&price=${price}&charge=${charge}`;
        common_vendor.index.navigateTo({
          url: `/pages/comic-page/comic-page?${params}`
        });
      } catch (e) {
        console.log(e);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.list, (item, k0, i0) => {
          return {
            a: "1d4fe43e-0-" + i0,
            b: common_vendor.p({
              width: "165rpx",
              height: "225rpx",
              src: item.cover_lateral || item.img_url
            }),
            c: common_vendor.o(($event) => onComicDetail(item.id), item.id),
            d: common_vendor.t(item.name),
            e: item.name,
            f: common_vendor.t(item.title),
            g: item.title,
            h: common_vendor.t(item.cartoon_introduction),
            i: item.cartoon_introduction,
            j: common_vendor.t(item.charge === 0 ? "免费" : "会员"),
            k: item.charge,
            l: common_vendor.t("¥" + item.price),
            m: item.price && item.charge !== 0,
            n: common_vendor.t(+item.read),
            o: item.read && item.read !== 0,
            p: common_vendor.o(($event) => onComicDetail(item.id), item.id),
            q: "1d4fe43e-1-" + i0,
            r: common_vendor.o(($event) => onComicPage(item.id), item.id),
            s: item.id
          };
        }),
        b: common_vendor.p({
          name: "coupon",
          ["label-pos"]: "bottom",
          label: "速看",
          ["label-color"]: "#ff7830",
          ["label-size"]: "24",
          color: "#ff7830",
          size: "60"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1d4fe43e"], ["__file", "F:/HBuilderProjects/manhua/components/comic-list/comic-list.vue"]]);
wx.createComponent(Component);
