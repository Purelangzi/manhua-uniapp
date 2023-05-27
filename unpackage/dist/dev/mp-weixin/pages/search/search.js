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
  const _easycom_comic_list2 = common_vendor.resolveComponent("comic-list");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  (_easycom_u_search2 + _easycom_u_icon2 + _easycom_comic_list2 + _easycom_u_loadmore2)();
}
const _easycom_u_search = () => "../../uni_modules/vk-uview-ui/components/u-search/u-search.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_comic_list = () => "../../components/comic-list/comic-list.js";
const _easycom_u_loadmore = () => "../../uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_icon + _easycom_comic_list + _easycom_u_loadmore)();
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
      // 是否已输入
      isActive: false,
      // 是否开启关键词下拉列表
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
      },
      isRequest: false
      // 控制点击历史记录后，不重复请求
    });
    const { searchHotList } = common_vendor.toRefs(state);
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
      getHotData();
    });
    common_vendor.onReachBottom(() => {
      if (state.isActive)
        return;
      if (!state.searchAllList.length || state.end >= state.searchAllList.length) {
        status.value = "nomore";
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
      state.searchList = [...state.searchList, ...state.searchAllList.slice(state.start, state.end)];
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
    const queryCartoon = async (val, size) => {
      state.isRequest = true;
      try {
        const { data } = await api_index.api.queryCartoon(val ? val : state.searchKeyWord);
        state.isSearch = true;
        if (data.length < 10) {
          state.searchList = data;
        } else {
          state.searchAllList = data;
          state.searchList = state.searchAllList.slice(0, size ? size : 15);
        }
      } catch (e) {
        console.log(e);
      }
      const flag = searchStore.searchHistory.findIndex((item) => item === val);
      if (flag === -1) {
        searchStore.searchHistory.push(val);
      }
    };
    const clearSearch = () => {
      state.isSearch = false;
      state.isActive = false;
      state.isRequest = false;
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
    const onRecord = (val) => {
      queryCartoon(val);
      state.isRequest = true;
      state.searchKeyWord = val;
    };
    const onLoadMore = () => {
      status.value = "loading";
      setTimeout(() => {
        status.value = "nomore";
      }, 500);
    };
    const searchCartoon = (val) => {
      if (!val)
        return;
      state.isActive = false;
    };
    common_vendor.watch(() => state.searchKeyWord, (newVal) => {
      if (newVal !== "" && !state.isRequest) {
        state.isActive = true;
        queryCartoon(newVal);
      } else {
        clearSearch();
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(searchCartoon),
        b: common_vendor.o(searchCartoon),
        c: common_vendor.o(clearSearch),
        d: common_vendor.o(common_vendor.m(($event) => state.searchKeyWord = $event, {
          trim: true
        }, true)),
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
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.charge === 1 ? "收费" : "免费"),
            c: common_vendor.o(($event) => onComicDetail(item.id), item.id),
            d: item.id
          };
        }),
        n: state.isActive,
        o: common_vendor.p({
          list: state.searchList
        }),
        p: state.searchList.length,
        q: common_vendor.o(onLoadMore),
        r: common_vendor.p({
          status: status.value,
          ["font-size"]: "22",
          color: "#b4b4b4",
          ["margin-top"]: "20",
          ["load-text"]: state.loadText
        }),
        s: state.isSearch && !state.isActive,
        t: state.isSearch && !state.searchList.length
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "F:/HBuilderProjects/manhua/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
