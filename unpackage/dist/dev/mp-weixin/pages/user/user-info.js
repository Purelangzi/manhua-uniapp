"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
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
  __name: "user-info",
  setup(__props) {
    const userStore = stores_user.useUser();
    const { userInfo } = common_vendor.storeToRefs(userStore);
    common_vendor.onLoad(() => {
    });
    common_vendor.onMounted(() => {
    });
    const handleUploadAvatar = () => {
    };
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_vendor.p({
          src: (_a = common_vendor.unref(userInfo)) == null ? void 0 : _a.avatar,
          mode: "square"
        }),
        b: common_vendor.o(($event) => handleUploadAvatar()),
        c: common_vendor.p({
          title: "头像",
          arrow: false
        }),
        d: common_vendor.p({
          title: "昵称",
          value: common_vendor.unref(userInfo).username
        }),
        e: common_vendor.p({
          title: "手机号",
          value: common_vendor.unref(userInfo).phone
        }),
        f: common_vendor.p({
          title: "邮箱",
          value: common_vendor.unref(userInfo).email ? common_vendor.unref(userInfo).email : "未设置"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HBuilderProjects/manhua/pages/user/user-info.vue"]]);
wx.createPage(MiniProgramPage);
