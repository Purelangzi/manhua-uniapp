"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../api/request.js");
require("../../utils/showMsg.js");
require("../../stores/user.js");
require("../../utils/wxLogin.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad(async () => {
      const res = await api_index.getHomeData();
      console.log(res);
    });
    common_vendor.onShow(() => {
      if (!common_vendor.index.getStorageSync("USER")) {
        common_vendor.index.switchTab({
          url: "/pages/user/user"
        });
      }
    });
    const ggg = () => {
      common_vendor.index.navigateTo({
        url: "/pages/error/error"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(ggg),
        b: common_vendor.p({
          type: "primary"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HBuilderProjects/manhua/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
