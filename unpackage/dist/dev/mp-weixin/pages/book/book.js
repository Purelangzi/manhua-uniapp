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
  const _easycom_comic_list2 = common_vendor.resolveComponent("comic-list");
  (_easycom_u_tabs2 + _easycom_comic_list2)();
}
const _easycom_u_tabs = () => "../../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
const _easycom_comic_list = () => "../../components/comic-list/comic-list.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_comic_list)();
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
        d: common_vendor.p({
          list: state.historyList
        }),
        e: state.current == 0,
        f: common_vendor.o(scroll)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e0cf4858"], ["__file", "F:/HBuilderProjects/manhua/pages/book/book.vue"]]);
wx.createPage(MiniProgramPage);
