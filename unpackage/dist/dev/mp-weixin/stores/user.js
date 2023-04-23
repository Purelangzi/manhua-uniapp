"use strict";
const common_vendor = require("../common/vendor.js");
const useUser = common_vendor.defineStore("USER", {
  state: () => ({
    userInfo: {},
    token: ""
  }),
  unistorage: true,
  actions: {
    logOut() {
      setTimeout(() => {
        this.$reset();
        common_vendor.index.removeStorageSync("USER");
        common_vendor.index.reLaunch({
          url: "/pages/user/user"
        });
      }, 1500);
    }
  },
  getters: {}
});
exports.useUser = useUser;
