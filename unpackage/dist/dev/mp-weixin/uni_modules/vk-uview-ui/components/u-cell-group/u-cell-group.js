"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-cell-group",
  props: {
    // 分组标题
    title: {
      type: String,
      default: ""
    },
    // 是否显示分组list上下边框
    border: {
      type: Boolean,
      default: true
    },
    // 分组标题的样式，对象形式，注意驼峰属性写法
    // 类似 {'font-size': '24rpx'} 和 {'fontSize': '24rpx'}
    titleStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      index: 0
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.title
  }, $props.title ? {
    b: common_vendor.t($props.title),
    c: common_vendor.s($props.titleStyle)
  } : {}, {
    d: $props.border ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dd1e88cb"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-cell-group/u-cell-group.vue"]]);
wx.createComponent(Component);
