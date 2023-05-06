"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_wxLogin = require("../../utils/wxLogin.js");
require("../../api/module/common.js");
require("../../api/request.js");
require("../../utils/showMsg.js");
require("../../stores/user.js");
require("../../api/module/cartoon.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  (_easycom_u_icon2 + _easycom_u_swiper2 + _easycom_u_image2)();
}
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_swiper = () => "../../uni_modules/vk-uview-ui/components/u-swiper/u-swiper.js";
const _easycom_u_image = () => "../../uni_modules/vk-uview-ui/components/u-image/u-image.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_swiper + _easycom_u_image)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const navScrollFlag = common_vendor.ref(false);
    const state = common_vendor.reactive({
      scrollTop: 0,
      bannerList: [],
      detailList: []
    });
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
      console.log("index-onShow");
      if (utils_wxLogin.wxIsLogin())
        return;
      if (!state.bannerList.length) {
        getData();
      }
    });
    common_vendor.onMounted(() => {
    });
    const getData = async () => {
      try {
        const { data } = await api_index.api.getHomeData();
        state.bannerList = data.banners;
        state.detailList = data.details;
      } catch (e) {
        console.log(e);
      }
    };
    const clickBanner = (index) => {
      const id = state.bannerList[index].id;
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
    };
    const goSearchPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    const goCartoonDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
    };
    const scroll = (e) => {
      if (e.detail.scrollTop >= 120) {
        navScrollFlag.value = true;
      } else {
        navScrollFlag.value = false;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "search",
          label: "斗破苍穹",
          color: navScrollFlag.value ? "" : "#ff7830"
        }),
        b: navScrollFlag.value ? 1 : "",
        c: common_vendor.o(goSearchPage),
        d: navScrollFlag.value ? 1 : "",
        e: !navScrollFlag.value ? 1 : "",
        f: navScrollFlag.value ? 1 : "",
        g: !navScrollFlag.value ? 1 : "",
        h: navScrollFlag.value ? 1 : "",
        i: common_vendor.o(clickBanner),
        j: common_vendor.p({
          name: "img",
          list: state.bannerList,
          mode: "dot",
          height: "450"
        }),
        k: common_vendor.p({
          src: "https://static.mkzcdn.com/mobile/img/pic_index_gx.png",
          width: "100%",
          height: "100%"
        }),
        l: common_vendor.p({
          src: "https://static.mkzcdn.com/mobile/img/pic_index_ph.png",
          width: "100%",
          height: "100%"
        }),
        m: common_vendor.p({
          src: "https://static.mkzcdn.com/mobile/img/pic_index_xs.png",
          width: "100%",
          height: "100%"
        }),
        n: common_vendor.f(state.detailList, (detail, index, i0) => {
          return {
            a: common_vendor.t(detail.title),
            b: common_vendor.f(detail.data, (item, k1, i1) => {
              return {
                a: "1cf27b2a-5-" + i0 + "-" + i1,
                b: common_vendor.p({
                  src: item.cover_lateral,
                  height: "275rpx"
                }),
                c: common_vendor.t(item.name),
                d: common_vendor.t(item.cartoon_introduction),
                e: common_vendor.o(($event) => goCartoonDetail(item.id), item.id),
                f: item.id
              };
            }),
            c: index
          };
        }),
        o: common_vendor.p({
          mode: "aspectFit",
          src: "https://static.mkzcdn.com/mobile/img/pic_home_footimg.png",
          width: "70rpx",
          height: "70rpx"
        }),
        p: common_vendor.o(scroll),
        q: state.scrollTop
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "F:/HBuilderProjects/manhua/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
