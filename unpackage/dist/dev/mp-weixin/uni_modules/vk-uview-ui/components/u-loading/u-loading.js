"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-loading",
  props: {
    // 动画的类型
    mode: {
      type: String,
      default: "circle"
    },
    // 动画的颜色
    color: {
      type: String,
      default: "#c7c7c7"
    },
    // 加载图标的大小，单位rpx
    size: {
      type: [String, Number],
      default: "34"
    },
    // 是否显示动画
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 加载中圆圈动画的样式
    cricleStyle() {
      let style = {};
      style.width = this.size + "rpx";
      style.height = this.size + "rpx";
      if (this.mode == "circle")
        style.borderColor = `#e4e4e4 #e4e4e4 #e4e4e4 ${this.color ? this.color : "#c7c7c7"}`;
      return style;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.show
  }, $props.show ? {
    b: common_vendor.n($props.mode == "circle" ? "u-loading-circle" : "u-loading-flower"),
    c: common_vendor.s($options.cricleStyle)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-32db0ed8"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-loading/u-loading.vue"]]);
wx.createComponent(Component);
