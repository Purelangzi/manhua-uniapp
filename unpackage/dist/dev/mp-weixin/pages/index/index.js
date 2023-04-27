"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_addressBarAccess = require("../../utils/addressBarAccess.js");
require("../../api/request.js");
require("../../utils/showMsg.js");
require("../../stores/user.js");
require("../../utils/wxLogin.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
      console.log("index-onShow");
      let flag = utils_addressBarAccess.addressBarAccess.load();
      if (flag)
        return;
      getData();
    });
    common_vendor.onActivated(() => {
      utils_addressBarAccess.addressBarAccess.activated();
    });
    const getData = async () => {
      try {
        const res = await api_index.getHomeData();
      } catch (e) {
        console.log(e);
      }
    };
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HBuilderProjects/manhua/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
