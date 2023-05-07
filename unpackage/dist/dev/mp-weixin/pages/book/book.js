"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_wxLogin = require("../../utils/wxLogin.js");
const stores_user = require("../../stores/user.js");
const api_index = require("../../api/index.js");
require("../../utils/showMsg.js");
require("../../api/module/common.js");
require("../../api/request.js");
require("../../api/module/cartoon.js");
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_tabs2 + _easycom_u_image2 + _easycom_u_icon2)();
}
const _easycom_u_tabs = () => "../../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
const _easycom_u_image = () => "../../uni_modules/vk-uview-ui/components/u-image/u-image.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_u_image + _easycom_u_icon)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "book",
  setup(__props) {
    const userStore = stores_user.useUser();
    const state = common_vendor.reactive({
      scrollTop: 0,
      list: [{ name: "历史" }, { name: "收藏" }],
      current: 0,
      // 默认展示历史
      historyList: [],
      loadText: {
        loadmore: "点击加载更多",
        loading: "加载中",
        nomore: "没有更多了"
      }
    });
    common_vendor.onShow(async () => {
      console.log("book-onShow");
      if (utils_wxLogin.wxIsLogin())
        return;
      getHistoricalRecord(userStore.userInfo.id);
    });
    const changeTabs = (index) => {
      state.current = index;
    };
    const scroll = (e) => {
    };
    const getHistoricalRecord = async (uid) => {
      try {
        const { data } = await api_index.api.getHistoricalRecord({ uid });
        state.historyList = data;
      } catch (e) {
        console.log(e);
      }
    };
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
        a: common_vendor.o(changeTabs),
        b: common_vendor.o(($event) => state.current = $event),
        c: common_vendor.p({
          list: state.list,
          ["active-color"]: "#ff7830",
          ["bar-width"]: "60",
          ["is-scroll"]: false,
          ["bar-style"]: {
            backgroundColor: "#ff7830"
          },
          modelValue: state.current
        }),
        d: common_vendor.f(state.historyList, (item, k0, i0) => {
          return {
            a: "e0cf4858-1-" + i0,
            b: common_vendor.p({
              width: "165rpx",
              height: "225rpx",
              src: item.img_url
            }),
            c: common_vendor.o(($event) => onComicDetail(item.id), item.id),
            d: common_vendor.t(item.name),
            e: common_vendor.t(item.title),
            f: common_vendor.o(($event) => onComicDetail(item.id), item.id),
            g: "e0cf4858-2-" + i0,
            h: common_vendor.o(($event) => onComicPage(item.id), item.id),
            i: item.id
          };
        }),
        e: common_vendor.p({
          name: "coupon",
          ["label-pos"]: "bottom",
          label: "续看",
          ["label-color"]: "#ff7830",
          ["label-size"]: "24",
          color: "#ff7830",
          size: "60"
        }),
        f: state.current == 0,
        g: common_vendor.o(scroll)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e0cf4858"], ["__file", "F:/HBuilderProjects/manhua/pages/book/book.vue"]]);
wx.createPage(MiniProgramPage);
