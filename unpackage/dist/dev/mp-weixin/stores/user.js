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
    }
  },
  getters: {}
});
exports.useUser = useUser;
