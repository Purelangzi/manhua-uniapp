"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
const utils_wxLogin = require("../../utils/wxLogin.js");
require("../../api/index.js");
require("../../api/module/common.js");
require("../../api/request.js");
require("../../utils/showMsg.js");
require("../../api/module/cartoon.js");
if (!Array) {
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_cell_item2 = common_vendor.resolveComponent("u-cell-item");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  (_easycom_u_avatar2 + _easycom_u_cell_item2 + _easycom_u_cell_group2)();
}
const _easycom_u_avatar = () => "../../uni_modules/vk-uview-ui/components/u-avatar/u-avatar.js";
const _easycom_u_cell_item = () => "../../uni_modules/vk-uview-ui/components/u-cell-item/u-cell-item.js";
const _easycom_u_cell_group = () => "../../uni_modules/vk-uview-ui/components/u-cell-group/u-cell-group.js";
if (!Math) {
  (_easycom_u_avatar + _easycom_u_cell_item + _easycom_u_cell_group)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "user",
  setup(__props) {
    const userStore = stores_user.useUser();
    const state = common_vendor.reactive({
      userInfo: {
        avatar: "",
        username: ""
      }
    });
    const { userInfo } = common_vendor.toRefs(state);
    common_vendor.onLoad(() => {
      if (utils_wxLogin.wxIsLogin())
        return;
      userInfo.value.username = userStore.userInfo.username;
      userInfo.value.avatar = userStore.userInfo.avatar;
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onActivated(() => {
    });
    common_vendor.onMounted(() => {
    });
    common_vendor.watch(() => userStore.userInfo.username, () => {
      if (userStore.token) {
        userInfo.value.username = userStore.userInfo.username;
      }
    });
    common_vendor.watch(() => userStore.userInfo.avatar, () => {
      if (userStore.token) {
        userInfo.value.avatar = userStore.userInfo.avatar;
      }
    });
    const handleUserOption = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: common_vendor.unref(userInfo).avatar,
          shape: "circle",
          size: "large"
        }),
        b: common_vendor.t(common_vendor.unref(userInfo).username ? common_vendor.unref(userInfo).username : "登录后查看更多精彩"),
        c: common_vendor.o(($event) => handleUserOption("/pages/user/user-Info")),
        d: common_vendor.o(($event) => handleUserOption("/pages/user/user-Info")),
        e: common_vendor.p({
          title: "个人中心",
          icon: "integral"
        }),
        f: common_vendor.p({
          title: "浏览记录",
          icon: "clock"
        }),
        g: common_vendor.p({
          title: "关注/收藏",
          icon: "heart"
        }),
        h: common_vendor.p({
          title: "设置",
          icon: "setting"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "F:/HBuilderProjects/manhua/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
