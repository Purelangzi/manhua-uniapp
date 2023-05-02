"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_index = require("../../../api/index.js");
require("../../../api/module/common.js");
require("../../../api/request.js");
require("../../../utils/showMsg.js");
require("../../../stores/user.js");
require("../../../utils/wxLogin.js");
require("../../../api/module/cartoon.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  _easycom_u_search2();
}
const _easycom_u_search = () => "../../../uni_modules/vk-uview-ui/components/u-search/u-search.js";
if (!Math) {
  _easycom_u_search();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search-input",
  emits: ["sendQueryList"],
  setup(__props, { emit }) {
    const state = common_vendor.reactive({
      searchKeyWord: ""
    });
    common_vendor.onMounted(() => {
    });
    common_vendor.onLoad(() => {
    });
    const searchCartoon = (val) => {
      if (!val)
        return;
      queryCartoon(state.searchKeyWord);
    };
    const queryCartoon = async (val) => {
      try {
        const { data } = await api_index.api.queryCartoon(val);
        emit("sendQueryList", data);
        common_vendor.index.navigateTo({
          url: "/pages/search/search-list"
        });
      } catch (e) {
        console.log(e);
      }
    };
    const clearSearch = () => {
      common_vendor.index.navigateBack();
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
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a1110e0f"], ["__file", "F:/HBuilderProjects/manhua/pages/search/component/search-input.vue"]]);
wx.createComponent(Component);
