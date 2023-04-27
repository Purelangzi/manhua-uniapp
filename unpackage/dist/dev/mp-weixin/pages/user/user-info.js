"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const stores_user = require("../../stores/user.js");
const utils_showMsg = require("../../utils/showMsg.js");
const utils_wxLogin = require("../../utils/wxLogin.js");
require("../../api/request.js");
if (!Array) {
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_cell_item2 = common_vendor.resolveComponent("u-cell-item");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_avatar2 + _easycom_u_cell_item2 + _easycom_u_cell_group2 + _easycom_u_button2)();
}
const _easycom_u_avatar = () => "../../uni_modules/vk-uview-ui/components/u-avatar/u-avatar.js";
const _easycom_u_cell_item = () => "../../uni_modules/vk-uview-ui/components/u-cell-item/u-cell-item.js";
const _easycom_u_cell_group = () => "../../uni_modules/vk-uview-ui/components/u-cell-group/u-cell-group.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_avatar + _easycom_u_cell_item + _easycom_u_cell_group + _easycom_u_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "user-Info",
  setup(__props) {
    const userStore = stores_user.useUser();
    common_vendor.reactive({});
    const customStyleExit = { backgroundColor: "#ffa73c", color: "#fff" };
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onMounted(() => {
    });
    const rrr = () => {
      common_vendor.index.navigateBack();
    };
    const handleLogOut = () => {
      userStore.logOut();
      utils_showMsg.showMsg({ title: "退出成功" });
    };
    const userInfo = common_vendor.computed(() => {
      return userStore.userInfo;
    });
    const handleOnAvatar = async () => {
      const filePath = await chooseImage(1);
      const { url } = await uploadImage(filePath);
      console.log(url);
      userStore.$patch((state2) => {
        state2.userInfo.avatar = url;
      });
      try {
        const { msg } = await api_index.editAccount({ id: userStore.userInfo.id, avatar: url });
        utils_showMsg.showMsg({ title: msg, icon: "success" });
      } catch (e) {
        console.log(e);
      }
    };
    const chooseImage = async (count) => {
      return new Promise((resolve, reject) => {
        common_vendor.index.chooseImage({
          count,
          sizeType: ["original", "compressed"],
          //可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album"],
          //从相册选择
          success: (res) => {
            const file = res.tempFiles[0];
            const path = file.path;
            const wxTypeArr = [".jpg", "jpeg", ".png"];
            const type = path.substring(path.length - 4);
            if (!wxTypeArr.includes(type)) {
              utils_showMsg.showMsg({ title: "上传图片只能是 png、jpg、jpeg 格式!!", duration: 3e3 });
              return;
            }
            if (file.size / 1024 > 1024 * 2) {
              utils_showMsg.showMsg({ title: "图片不能大于2M,请重新上传", duration: 3e3 });
              return;
            }
            resolve(path);
          }
        });
      }).catch((e) => {
        console.log(e);
      });
    };
    const uploadImage = async (filePath) => {
      return new Promise((resolve, reject) => {
        common_vendor.index.uploadFile({
          url: "http://127.0.0.1:7001/api/ali/uploadFile",
          filePath,
          name: "files",
          header: {
            "token": "Bearer " + userStore.token
          },
          success: (uploadFileRes) => {
            const res = JSON.parse(uploadFileRes.data);
            if (uploadFileRes.statusCode === 200) {
              utils_showMsg.showMsg({ title: res.msg });
              resolve(res.data);
            } else if (uploadFileRes.statusCode === 401) {
              console.log("微信刷新token");
              utils_wxLogin.wxLogin();
              return;
            } else {
              utils_showMsg.showMsg({ title: res.msg || "图片上传失败" });
            }
          }
        });
      }).catch((e) => {
        console.log(e);
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleOnAvatar),
        b: common_vendor.p({
          src: common_vendor.unref(userInfo).avatar,
          mode: "square"
        }),
        c: common_vendor.p({
          title: "头像"
        }),
        d: common_vendor.p({
          title: "昵称",
          value: common_vendor.unref(userInfo).username ? common_vendor.unref(userInfo).username : "未设置"
        }),
        e: common_vendor.p({
          title: "手机号",
          value: common_vendor.unref(userInfo).phone ? common_vendor.unref(userInfo).phone : "未设置"
        }),
        f: common_vendor.p({
          title: "密码",
          value: common_vendor.unref(userInfo).password ? common_vendor.unref(userInfo).password : "未设置"
        }),
        g: common_vendor.p({
          title: "邮箱",
          value: common_vendor.unref(userInfo).email ? common_vendor.unref(userInfo).email : "未设置"
        }),
        h: common_vendor.unref(userInfo).username
      }, common_vendor.unref(userInfo).username ? {
        i: common_vendor.o(handleLogOut),
        j: common_vendor.p({
          ["custom-style"]: customStyleExit,
          ripple: true
        })
      } : {}, {
        k: common_vendor.o(rrr)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HBuilderProjects/manhua/pages/user/user-Info.vue"]]);
wx.createPage(MiniProgramPage);
