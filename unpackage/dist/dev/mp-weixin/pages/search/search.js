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
  (_easycom_u_search2 + _easycom_u_icon2 + _easycom_u_image2)();
}
const _easycom_u_search = () => "../../uni_modules/vk-uview-ui/components/u-search/u-search.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_image = () => "../../uni_modules/vk-uview-ui/components/u-image/u-image.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_icon + _easycom_u_image)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search",
  setup(__props) {
    const searchStore = stores_user.useSearch();
    const state = common_vendor.reactive({
      searchKeyWord: "",
      searchHotParams: {
        page: 0,
        pageSize: 9
      },
      isSearch: false,
      searchHotList: [],
      // recordList:[],
      querySearchList: []
    });
    const { searchHotList } = common_vendor.toRefs(state);
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
      getHotData();
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
        console.log(e);
      }
    };
    const searchCartoon = (val) => {
      if (!val)
        return;
      queryCartoon(state.searchKeyWord);
      searchStore.searchHistory.push(val);
    };
    const queryCartoon = async (val) => {
      try {
        const { data } = await api_index.api.queryCartoon(val);
        state.isSearch = true;
        state.querySearchList = data;
      } catch (e) {
        console.log(e);
      }
    };
    const clearSearch = () => {
      state.isSearch = false;
      state.querySearchList = [];
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
    const onRecord = (val) => {
      state.searchKeyWord = val;
      queryCartoon(val);
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
            b: common_vendor.o(($event) => onRecord(item), item),
            c: common_vendor.o(($event) => clearRecordItem(key), item),
            d: "c10c040c-2-" + i0,
            e: item
          };
        }),
        j: common_vendor.p({
          size: "16",
          name: "close",
          color: "#666b6b"
        }),
        k: common_vendor.unref(recordList).length,
        l: !state.isSearch,
        m: common_vendor.f(state.querySearchList, (item, k0, i0) => {
          return {
            a: "c10c040c-3-" + i0,
            b: common_vendor.p({
              width: "165rpx",
              height: "225rpx",
              src: item.cover_lateral
            }),
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.cartoon_introduction),
            e: common_vendor.t(item.charge === 0 ? "免费" : "会员"),
            f: common_vendor.t("¥" + item.price),
            g: item.charge !== 0,
            h: common_vendor.t(+item.read),
            i: item.read !== 0,
            j: item.id
          };
        }),
        n: state.isSearch,
        o: state.isSearch && !state.querySearchList.length
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "F:/HBuilderProjects/manhua/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
