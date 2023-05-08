"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_date = require("../../utils/date.js");
const stores_user = require("../../stores/user.js");
require("../../api/module/common.js");
require("../../api/request.js");
require("../../utils/showMsg.js");
require("../../utils/wxLogin.js");
require("../../api/module/cartoon.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  (_easycom_u_image2 + _easycom_u_button2 + _easycom_u_tabs2 + _easycom_u_icon2 + _easycom_u_loadmore2)();
}
const _easycom_u_image = () => "../../uni_modules/vk-uview-ui/components/u-image/u-image.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_tabs = () => "../../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_loadmore = () => "../../uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.js";
if (!Math) {
  (_easycom_u_image + _easycom_u_button + _easycom_u_tabs + _easycom_u_icon + _easycom_u_loadmore)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const userStore = stores_user.useUser();
    const status = common_vendor.ref("loadmore");
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
        pageSize: 20,
        comic_id: null
      },
      sort: true,
      loadText: {
        loadmore: "点击加载更多",
        loading: "加载中",
        nomore: "没有更多了"
      },
      chapter_id: "",
      comic_id: 0,
      isRead: false
    });
    const readBtnStyle = { backgroundColor: "#ff7830", color: "#fff", padding: "22rpx 130rpx", fontSize: "36rpx" };
    const { detailData } = common_vendor.toRefs(state);
    common_vendor.onLoad((option) => {
      state.comic_id = option.id;
      getCartoonDetail(option.id);
      getChapterList(option.id);
      console.log("onLoad");
    });
    common_vendor.onShow(() => {
      getHistoricalRecord(state.comic_id);
      console.log("onShow");
    });
    common_vendor.onReachBottom(() => {
      if (state.current === 1) {
        state.queryCpList.page += 1;
        getChapterList();
      }
    });
    common_vendor.onMounted(() => {
    });
    const getCartoonDetail = async (comic_id) => {
      try {
        const { data } = await api_index.api.getCartoonDetail(comic_id);
        state.detailData = data;
        common_vendor.index.setNavigationBarTitle({
          title: detailData.value.name
        });
      } catch (e) {
        console.log(e);
      }
    };
    const getHistoricalRecord = async (comic_id) => {
      const params = {
        uid: userStore.userInfo.id,
        comic_id
      };
      try {
        const { data } = await api_index.api.getHistoricalRecord(params);
        if (data.length) {
          state.isRead = true;
          state.chapter_id = data[0].chapter_id;
        }
      } catch (e) {
        console.log(e);
      }
    };
    const getChapterList = async (comic_id) => {
      if (comic_id) {
        state.queryCpList.comic_id = comic_id;
      }
      if (status.value === "nomore")
        return;
      status.value = "loading";
      try {
        const { data } = await api_index.api.getChapterList(state.queryCpList);
        if (!data.data.length) {
          status.value = "nomore";
          return;
        }
        state.chapter_id = data.data[0].chapter_id;
        state.chapterList = state.chapterList.length ? [...state.chapterList, ...data.data] : data.data;
      } catch (e) {
      }
    };
    const onCatalogPage = (e) => {
      let chapter_id = e.target.dataset.chapterid;
      onComicPage(chapter_id);
    };
    const onComicPage = (chapter_id) => {
      let chapterId = `chapter_id=${(chapter_id == null ? void 0 : chapter_id.target) ? state.chapter_id : chapter_id}`;
      const { read, price, charge, name } = detailData.value;
      const params = `${chapterId}&comic_id=${detailData.value.id}&name=${name}&read=${read}&price=${price}&charge=${charge}`;
      common_vendor.index.navigateTo({
        url: `/pages/comic-page/comic-page?${params}`
      });
    };
    const changeTabs = (index) => {
      state.current = index;
    };
    const onSort = () => {
      state.sort = !state.sort;
      state.chapterList.reverse();
    };
    const onLoadMore = () => {
      if (state.current === 1) {
        status.value = "loading";
        setTimeout(() => {
          status.value = "nomore";
        }, 500);
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
        f: common_vendor.t(state.isRead ? "继续阅读" : "开始阅读"),
        g: common_vendor.o(onComicPage),
        h: common_vendor.p({
          ["custom-style"]: readBtnStyle,
          shape: "circle"
        }),
        i: common_vendor.o(changeTabs),
        j: common_vendor.o(($event) => state.current = $event),
        k: common_vendor.p({
          list: state.list,
          ["active-color"]: "#28292d",
          ["bar-width"]: "120",
          ["is-scroll"]: false,
          ["bar-style"]: {
            backgroundColor: "#ff7830"
          },
          modelValue: state.current
        }),
        l: common_vendor.t(common_vendor.unref(detailData).cartoon_introduction),
        m: state.current == 0,
        n: common_vendor.t(common_vendor.unref(detailData).status ? "连载" : "完结"),
        o: common_vendor.t(common_vendor.unref(utils_date.formatDate)(common_vendor.unref(detailData).update_time)),
        p: common_vendor.t(state.chapterList.length),
        q: common_vendor.p({
          name: "list",
          label: state.sort ? "正序" : "倒序",
          ["label-size"]: "26"
        }),
        r: common_vendor.o(onSort),
        s: common_vendor.f(state.chapterList, (item, k0, i0) => {
          return {
            a: "eca06f3c-6-" + i0,
            b: common_vendor.p({
              width: "240rpx",
              height: "135rpx",
              src: item.cover
            }),
            c: common_vendor.t(item.title_alias),
            d: common_vendor.t(common_vendor.unref(utils_date.formatDate)(item.create_time)),
            e: common_vendor.o(onCatalogPage, item.title_alias),
            f: item.chapter_id,
            g: item.title_alias
          };
        }),
        t: common_vendor.o(onLoadMore),
        v: common_vendor.p({
          status: status.value,
          ["load-text"]: state.loadText,
          ["font-size"]: "22",
          color: "#b4b4b4",
          ["margin-top"]: "20"
        }),
        w: state.current === 1
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"], ["__file", "F:/HBuilderProjects/manhua/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
