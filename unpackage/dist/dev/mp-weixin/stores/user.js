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
      this.$reset();
      common_vendor.index.removeStorageSync("USER");
      common_vendor.index.reLaunch({
        url: "/pages/user/user"
      });
    }
  },
  getters: {}
});
exports.useUser = useUser;
