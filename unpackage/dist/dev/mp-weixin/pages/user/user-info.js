"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
const utils_showMsg = require("../../utils/showMsg.js");
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
    common_vendor.reactive({});
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onMounted(() => {
    });
    const handleOnAvatar = async () => {
      const filePath = await chooseImage(1);
      const res = await uploadImage(filePath);
      console.log(res);
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
            if (res.tempFiles[0].size / 1024 > 1024 * 2) {
              common_vendor.index.showToast({
                title: "图片不能大于2M,请重新上传"
              });
              utils_showMsg.showMsg({ title: "图片不能大于2M,请重新上传", duration: 3e3 });
              return;
            }
            resolve(res.tempFilePaths[0]);
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
            if (uploadFileRes.statusCode == 200) {
              utils_showMsg.showMsg({ title: res.data.msg });
              resolve(res.data);
            } else {
              console.log(res);
              utils_showMsg.showMsg({ title: res.msg || "error" });
            }
          }
        });
      }).catch((e) => {
        console.log(e);
      });
    };
    return (_ctx, _cache) => {
      return {
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
