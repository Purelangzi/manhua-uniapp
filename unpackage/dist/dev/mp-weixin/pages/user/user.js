"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_cell_item2 = common_vendor.resolveComponent("u-cell-item");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_avatar2 + _easycom_u_cell_item2 + _easycom_u_button2 + _easycom_u_cell_group2 + _easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_form2 + _easycom_u_icon2 + _easycom_u_popup2)();
}
const _easycom_u_avatar = () => "../../uni_modules/vk-uview-ui/components/u-avatar/u-avatar.js";
const _easycom_u_cell_item = () => "../../uni_modules/vk-uview-ui/components/u-cell-item/u-cell-item.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_cell_group = () => "../../uni_modules/vk-uview-ui/components/u-cell-group/u-cell-group.js";
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_avatar + _easycom_u_cell_item + _easycom_u_button + _easycom_u_cell_group + _easycom_u_input + _easycom_u_form_item + _easycom_u_form + _easycom_u_icon + _easycom_u_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "user",
  setup(__props) {
    const state = common_vendor.reactive({
      userInfo: {
        avatar: "",
        username: "哈哈哈"
      },
      userForm: {
        account: "",
        password: "",
        username: ""
      },
      show: true,
      isRegist: false
    });
    const customStyleExit = { backgroundColor: "#ffa73c", color: "#fff" };
    const customStyleLogin = { backgroundColor: "#ff6b07", color: "#fff" };
    const customStyleWx = { backgroundColor: "#01a95e", color: "#fff" };
    const { userInfo, userForm } = common_vendor.toRefs(state);
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          src: common_vendor.unref(userInfo).avatar ? common_vendor.unref(userInfo).avatar : "/static/image/default-avatar.png",
          shape: "circle",
          size: "large"
        }),
        b: common_vendor.t(common_vendor.unref(userInfo).username ? common_vendor.unref(userInfo).username : "登录后查看更多精彩"),
        c: common_vendor.p({
          title: "会员中心"
        }),
        d: common_vendor.p({
          title: "浏览记录"
        }),
        e: common_vendor.p({
          title: "关注/收藏"
        }),
        f: common_vendor.p({
          title: "设置"
        }),
        g: common_vendor.unref(userInfo).username
      }, common_vendor.unref(userInfo).username ? {
        h: common_vendor.p({
          ["custom-style"]: customStyleExit
        })
      } : {}, {
        i: common_vendor.o(($event) => common_vendor.unref(userForm).username = $event),
        j: common_vendor.p({
          modelValue: common_vendor.unref(userForm).username
        }),
        k: common_vendor.p({
          label: "+86"
        }),
        l: common_vendor.o(($event) => common_vendor.unref(userForm).password = $event),
        m: common_vendor.p({
          type: "password",
          modelValue: common_vendor.unref(userForm).password
        }),
        n: common_vendor.p({
          label: "密码"
        }),
        o: state.isRegist
      }, state.isRegist ? {
        p: common_vendor.o(($event) => common_vendor.unref(userForm).username = $event),
        q: common_vendor.p({
          modelValue: common_vendor.unref(userForm).username
        }),
        r: common_vendor.p({
          label: "昵称"
        })
      } : {}, {
        s: common_vendor.sr("uForm", "0f7520f0-8,0f7520f0-7"),
        t: common_vendor.p({
          model: common_vendor.unref(userForm)
        }),
        v: common_vendor.o(($event) => state.isRegist = !state.isRegist),
        w: common_vendor.p({
          ["custom-style"]: customStyleLogin,
          shape: "circle"
        }),
        x: common_vendor.p({
          name: "weixin-fill",
          label: "微信登录",
          ["margin-left"]: "10rpx",
          ["label-color"]: "#fff"
        }),
        y: common_vendor.p({
          ["custom-style"]: customStyleWx,
          shape: "circle"
        }),
        z: common_vendor.o(($event) => state.show = $event),
        A: common_vendor.p({
          mode: "bottom",
          height: "55%",
          modelValue: state.show
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "F:/HBuilderProjects/manhua/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
