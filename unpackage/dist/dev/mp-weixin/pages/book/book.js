"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_wxLogin = require("../../utils/wxLogin.js");
require("../../api/index.js");
require("../../api/request.js");
require("../../utils/showMsg.js");
require("../../stores/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "book",
  setup(__props) {
    common_vendor.onShow(async () => {
      console.log("book-onShow");
      if (utils_wxLogin.wxIsLogin())
        return;
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HBuilderProjects/manhua/pages/book/book.vue"]]);
wx.createPage(MiniProgramPage);
