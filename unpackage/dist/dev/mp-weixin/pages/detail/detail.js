"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_date = require("../../utils/date.js");
require("../../api/module/common.js");
require("../../api/request.js");
require("../../utils/showMsg.js");
require("../../stores/user.js");
require("../../utils/wxLogin.js");
require("../../api/module/cartoon.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_image2 + _easycom_u_button2 + _easycom_u_tabs2 + _easycom_u_icon2)();
}
const _easycom_u_image = () => "../../uni_modules/vk-uview-ui/components/u-image/u-image.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_tabs = () => "../../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_image + _easycom_u_button + _easycom_u_tabs + _easycom_u_icon)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const readBtnStyle = { backgroundColor: "#ff7830", color: "#fff", padding: "22rpx 130rpx", fontSize: "36rpx" };
    common_vendor.ref("loadmore");
    const state = common_vendor.reactive({
      scrollTop: 0,
      list: [{ name: "详情" }, { name: "目录" }],
      current: 0,
      // 默认展示详情
      detailData: {},
      chapterList: [],
      update_time: "",
      queryCpList: {
        page: 1,
        pageSize: 12,
        comic_id: null
      },
      sort: "正序",
      loadText: {
        loadmore: "点击加载更多",
        loading: "加载中",
        nomore: "没有更多了"
      }
    });
    const { detailData } = common_vendor.toRefs(state);
    common_vendor.onLoad((option) => {
      getCartoonDetail(option.id);
      getChapterList(option.id);
      console.log("onLoad");
    });
    common_vendor.onShow(() => {
      console.log("onShow");
    });
    common_vendor.onMounted(() => {
    });
    common_vendor.watch(() => detailData.value.name, () => {
      common_vendor.index.setNavigationBarTitle({
        title: detailData.value.name
      });
    });
    const getCartoonDetail = async (id) => {
      try {
        const { data } = await api_index.api.getCartoonDetail(id);
        state.detailData = data;
      } catch (e) {
      }
    };
    const getChapterList = async (id) => {
      if (id) {
        state.queryCpList.comic_id = id;
      }
      try {
        const { data } = await api_index.api.getChapterList(state.queryCpList);
        state.chapterList = state.chapterList.length ? [...state.chapterList, ...data.data] : data.data;
      } catch (e) {
      }
    };
    const changeTabs = (index) => {
      state.current = index;
    };
    const scroll = (e) => {
    };
    const lower = () => {
      throttle(1e3);
    };
    const throttle = (delay) => {
      let valid = true;
      if (valid) {
        state.queryCpList.page += 1;
        getChapterList();
        valid = false;
        setTimeout(() => {
          valid = true;
        }, delay);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          height: "440rpx",
          src: common_vendor.unref(detailData).cover_lateral
        }),
        b: common_vendor.t(common_vendor.unref(detailData).name),
        c: common_vendor.p({
          width: "100vw",
          height: "440rpx",
          src: "https://static.mkzcdn.com/mobile/img/detail/bg_detail_bannerbg.png"
        }),
        d: common_vendor.p({
          width: "100vw",
          height: "40rpx",
          src: "https://static.mkzcdn.com/mobile/img/detail/bg_banner.png"
        }),
        e: common_vendor.t(common_vendor.unref(detailData).read),
        f: common_vendor.p({
          ["custom-style"]: readBtnStyle,
          shape: "circle"
        }),
        g: common_vendor.o(changeTabs),
        h: common_vendor.o(($event) => state.current = $event),
        i: common_vendor.p({
          list: state.list,
          ["active-color"]: "#28292d",
          ["bar-width"]: "120",
          ["is-scroll"]: false,
          ["bar-style"]: {
            backgroundColor: "#ff7830"
          },
          modelValue: state.current
        }),
        j: common_vendor.t(common_vendor.unref(detailData).cartoon_introduction),
        k: state.current == 0,
        l: common_vendor.t(common_vendor.unref(detailData).status ? "连载" : "完结"),
        m: common_vendor.t(common_vendor.unref(utils_date.formatDate)(common_vendor.unref(detailData).update_time)),
        n: common_vendor.t(state.chapterList.length),
        o: common_vendor.p({
          name: "list",
          label: state.sort,
          ["label-size"]: "26"
        }),
        p: common_vendor.f(state.chapterList, (item, k0, i0) => {
          return {
            a: "eca06f3c-6-" + i0,
            b: common_vendor.p({
              width: "240rpx",
              height: "135rpx",
              src: item.cover
            }),
            c: common_vendor.t(item.title_alias),
            d: common_vendor.t(common_vendor.unref(utils_date.formatDate)(item.create_time)),
            e: item.title_alias
          };
        }),
        q: state.current === 1,
        r: common_vendor.o(scroll),
        s: state.scrollTop,
        t: common_vendor.o(lower)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"], ["__file", "F:/HBuilderProjects/manhua/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
