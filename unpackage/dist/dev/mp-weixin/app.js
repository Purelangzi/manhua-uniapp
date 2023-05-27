"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const uni_modules_vkUviewUi_index = require("./uni_modules/vk-uview-ui/index.js");
const uni_modules_piniaPluginUnistorage_index = require("./uni_modules/pinia-plugin-unistorage/index.js");
require("./utils/permission.js");
require("./uni_modules/vk-uview-ui/libs/mixin/mixin.js");
require("./uni_modules/vk-uview-ui/libs/request/index.js");
require("./uni_modules/vk-uview-ui/libs/function/deepMerge.js");
require("./uni_modules/vk-uview-ui/libs/function/deepClone.js");
require("./uni_modules/vk-uview-ui/libs/function/test.js");
require("./uni_modules/vk-uview-ui/libs/function/queryParams.js");
require("./uni_modules/vk-uview-ui/libs/function/route.js");
require("./uni_modules/vk-uview-ui/libs/function/timeFormat.js");
require("./uni_modules/vk-uview-ui/libs/function/timeFrom.js");
require("./uni_modules/vk-uview-ui/libs/function/colorGradient.js");
require("./uni_modules/vk-uview-ui/libs/function/guid.js");
require("./uni_modules/vk-uview-ui/libs/function/color.js");
require("./uni_modules/vk-uview-ui/libs/function/type2icon.js");
require("./uni_modules/vk-uview-ui/libs/function/randomArray.js");
require("./uni_modules/vk-uview-ui/libs/function/addUnit.js");
require("./uni_modules/vk-uview-ui/libs/function/random.js");
require("./uni_modules/vk-uview-ui/libs/function/trim.js");
require("./uni_modules/vk-uview-ui/libs/function/toast.js");
require("./uni_modules/vk-uview-ui/libs/function/getParent.js");
require("./uni_modules/vk-uview-ui/libs/function/_parent.js");
require("./uni_modules/vk-uview-ui/libs/function/sys.js");
require("./uni_modules/vk-uview-ui/libs/function/debounce.js");
require("./uni_modules/vk-uview-ui/libs/function/throttle.js");
require("./uni_modules/vk-uview-ui/libs/config/config.js");
require("./uni_modules/vk-uview-ui/libs/config/zIndex.js");
require("./utils/showMsg.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/category/category.js";
  "./pages/book/book.js";
  "./pages/user/user.js";
  "./pages/user/user-login.js";
  "./pages/user/user-Info.js";
  "./pages/404/404.js";
  "./pages/search/search.js";
  "./pages/detail/detail.js";
  "./pages/comic-page/comic-page.js";
}
const _sfc_main = {
  onPageNotFound: function() {
    common_vendor.index.redirectTo({
      url: "/pages/404/404"
      // 404 页面的路径
    });
  },
  onLaunch: function() {
    common_vendor.index.onPageNotFound(() => {
      common_vendor.index.redirectTo({
        url: "/pages/404/404"
      });
    });
  },
  onShow: function() {
  },
  onHide: function() {
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HBuilderProjects/manhua/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  const store = common_vendor.createPinia();
  store.use(uni_modules_piniaPluginUnistorage_index.createUnistorage());
  app.use(uni_modules_vkUviewUi_index.uView);
  app.use(store);
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
