"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const stores_user = require("../../stores/user.js");
require("../../api/module/common.js");
require("../../api/request.js");
require("../../utils/showMsg.js");
require("../../utils/wxLogin.js");
require("../../api/module/cartoon.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  (_easycom_u_search2 + _easycom_u_icon2 + _easycom_u_image2 + _easycom_u_loadmore2)();
}
const _easycom_u_search = () => "../../uni_modules/vk-uview-ui/components/u-search/u-search.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_image = () => "../../uni_modules/vk-uview-ui/components/u-image/u-image.js";
const _easycom_u_loadmore = () => "../../uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_icon + _easycom_u_image + _easycom_u_loadmore)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search",
  setup(__props) {
    const searchStore = stores_user.useSearch();
    const status = common_vendor.ref("loadmore");
    const state = common_vendor.reactive({
      searchKeyWord: "",
      searchHotParams: {
        page: 0,
        pageSize: 9
      },
      isSearch: false,
      searchHotList: [],
      searchAllList: [],
      searchList: [],
      start: 0,
      //  搜索漫画的列表的开始切割的位置
      end: 10,
      // 搜索漫画的列表的末尾切割的位置,
      loadText: {
        loadmore: "点击加载更多",
        loading: "加载中",
        nomore: "没有更多了"
      }
    });
    const { searchHotList } = common_vendor.toRefs(state);
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
      getHotData();
    });
    common_vendor.onReachBottom(() => {
      if (!state.searchAllList.length || state.end >= state.searchAllList.length) {
        return;
      }
      status.value = "loading";
      state.start += 10;
      state.end += 10;
      if (state.end > state.searchAllList.length) {
        state.end = state.start + state.searchAllList.length - state.start;
        state.searchList = [...state.searchList, ...state.searchAllList.slice(state.start, state.end)];
        status.value = "nomore";
        return;
      }
      setTimeout(() => {
        state.searchList = [...state.searchList, ...state.searchAllList.slice(state.start, state.end)];
      }, 1e3);
    });
    const recordList = common_vendor.computed(() => {
      return searchStore.searchHistory;
    });
    const getHotData = async () => {
      state.searchHotParams.page = Math.floor(Math.random() * (20 - 1)) + 1;
      try {
        const { data } = await api_index.api.getCartoonList(state.searchHotParams);
        searchHotList.value = data.data;
      } catch (e) {
      }
    };
    const searchCartoon = (val) => {
      if (!val)
        return;
      queryCartoon(state.searchKeyWord);
    };
    const queryCartoon = async (val) => {
      try {
        const { data } = await api_index.api.queryCartoon(val);
        state.isSearch = true;
        if (data.length < 10) {
          state.searchList = data;
        } else {
          state.searchAllList = data;
          state.searchList = state.searchAllList.slice(0, 10);
        }
      } catch (e) {
        console.log(e);
      }
      searchStore.searchHistory.push(val);
    };
    const clearSearch = () => {
      state.isSearch = false;
      state.searchList = [];
      status.value = "loadmore";
    };
    const clearRecord = () => {
      searchStore.clearHistory();
    };
    const clearRecordItem = (key) => {
      searchStore.searchHistory.splice(key, 1);
    };
    const goCartoonDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
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
    const onRecord = (val) => {
      state.searchKeyWord = val;
      queryCartoon(val);
    };
    const onLoadMore = () => {
      status.value = "loading";
      setTimeout(() => {
        status.value = "nomore";
      }, 500);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(searchCartoon),
        b: common_vendor.o(searchCartoon),
        c: common_vendor.o(clearSearch),
        d: common_vendor.o(($event) => state.searchKeyWord = $event),
        e: common_vendor.p({
          placeholder: "输入作品名",
          ["action-style"]: {
            color: "#ff7830"
          },
          modelValue: state.searchKeyWord
        }),
        f: common_vendor.f(common_vendor.unref(searchHotList), (cartoon, k0, i0) => {
          return {
            a: common_vendor.t(cartoon.name),
            b: cartoon.id,
            c: common_vendor.o(($event) => goCartoonDetail(cartoon.id), cartoon.id)
          };
        }),
        g: common_vendor.o(clearRecord),
        h: common_vendor.p({
          size: "36",
          name: "trash"
        }),
        i: common_vendor.f(common_vendor.unref(recordList), (item, key, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => onRecord(item), key),
            c: common_vendor.o(($event) => clearRecordItem(key), key),
            d: "c10c040c-2-" + i0,
            e: key
          };
        }),
        j: common_vendor.p({
          size: "16",
          name: "close",
          color: "#666b6b"
        }),
        k: common_vendor.unref(recordList).length,
        l: !state.isSearch,
        m: common_vendor.f(state.searchList, (item, k0, i0) => {
          return {
            a: "c10c040c-3-" + i0,
            b: common_vendor.p({
              width: "165rpx",
              height: "225rpx",
              src: item.cover_lateral
            }),
            c: common_vendor.o(($event) => onComicDetail(item.id), item.id),
            d: common_vendor.t(item.name),
            e: common_vendor.t(item.cartoon_introduction),
            f: common_vendor.t(item.charge === 0 ? "免费" : "会员"),
            g: common_vendor.t("¥" + item.price),
            h: item.charge !== 0,
            i: common_vendor.t(+item.read),
            j: item.read !== 0,
            k: common_vendor.o(($event) => onComicDetail(item.id), item.id),
            l: "c10c040c-4-" + i0,
            m: common_vendor.o(($event) => onComicPage(item.id), item.id),
            n: item.id
          };
        }),
        n: common_vendor.p({
          name: "coupon",
          ["label-pos"]: "bottom",
          label: "速看",
          ["label-color"]: "#ff7830",
          ["label-size"]: "24",
          color: "#ff7830",
          size: "60"
        }),
        o: state.searchList.length,
        p: common_vendor.o(onLoadMore),
        q: common_vendor.p({
          status: status.value,
          ["font-size"]: "22",
          color: "#b4b4b4",
          ["margin-top"]: "20",
          ["load-text"]: state.loadText
        }),
        r: state.isSearch,
        s: state.isSearch && !state.searchList.length
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "F:/HBuilderProjects/manhua/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
