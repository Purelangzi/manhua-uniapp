"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_wxLogin = require("../../utils/wxLogin.js");
const api_index = require("../../api/index.js");
require("../../stores/user.js");
require("../../utils/showMsg.js");
require("../../api/module/common.js");
require("../../api/request.js");
require("../../api/module/cartoon.js");
if (!Array) {
  const _easycom_comic_box2 = common_vendor.resolveComponent("comic-box");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  (_easycom_comic_box2 + _easycom_u_loadmore2)();
}
const _easycom_comic_box = () => "../../components/comic-box/comic-box.js";
const _easycom_u_loadmore = () => "../../uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.js";
if (!Math) {
  (_easycom_comic_box + _easycom_u_loadmore)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "category",
  setup(__props) {
    const status = common_vendor.ref("loadmore");
    const state = common_vendor.reactive({
      list: [],
      active: 0,
      queryPrams: {
        page: 1,
        pageSize: 15,
        category_id: void 0
      },
      cartoonList: [],
      loadText: {
        loadmore: "点击加载更多",
        loading: "加载中",
        nomore: "没有更多了"
      },
      current: 0
      // 默认展示详情
    });
    common_vendor.onShow(async () => {
      console.log("category-onShow");
      if (utils_wxLogin.wxIsLogin())
        return;
      if (!state.list.length) {
        getCtcategory();
        getCartoonList();
      }
    });
    common_vendor.onReachBottom(() => {
      state.queryPrams.page += 1;
      getCartoonList();
    });
    const onCategory = (category_id) => {
      state.cartoonList = [];
      state.active = category_id;
      state.queryPrams.category_id = category_id == 0 ? "" : category_id;
      getCartoonList();
    };
    const getCtcategory = async () => {
      try {
        const { data } = await api_index.api.getCtcategory({ isAll: true });
        data.data.unshift({ id: 0, name: "全部" });
        state.list = data.data;
      } catch (e) {
        console.log(e);
      }
    };
    const getCartoonList = async () => {
      status.value = "loading";
      try {
        const { data } = await api_index.api.getCartoonList(state.queryPrams);
        if (!data.data.length) {
          status.value = "nomore";
          return;
        }
        state.cartoonList = state.cartoonList.length ? [...state.cartoonList, ...data.data] : data.data;
      } catch (e) {
        console.log(e);
      }
    };
    const onLoadMore = () => {
      status.value = "loading";
      setTimeout(() => {
        status.value = "nomore";
      }, 500);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(state.list, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.n(state.active == item.id ? "item-name-active" : ""),
            c: common_vendor.o(($event) => onCategory(item.id), item.id),
            d: item.id
          };
        }),
        b: common_vendor.p({
          detail: state.cartoonList
        }),
        c: common_vendor.o(onLoadMore),
        d: common_vendor.p({
          status: status.value,
          ["font-size"]: "22",
          color: "#b4b4b4",
          ["margin-top"]: "20",
          ["margin-bottom"]: "20",
          ["load-text"]: state.loadText
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HBuilderProjects/manhua/pages/category/category.vue"]]);
wx.createPage(MiniProgramPage);
