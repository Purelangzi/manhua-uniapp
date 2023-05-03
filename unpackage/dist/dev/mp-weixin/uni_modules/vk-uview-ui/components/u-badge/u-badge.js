"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-badge",
  props: {
    // primary,warning,success,error,info
    type: {
      type: String,
      default: "error"
    },
    // default, mini
    size: {
      type: String,
      default: "default"
    },
    //是否是圆点
    isDot: {
      type: Boolean,
      default: false
    },
    // 显示的数值内容
    count: {
      type: [Number, String]
    },
    // 展示封顶的数字值
    overflowCount: {
      type: Number,
      default: 99
    },
    // 当数值为 0 时，是否展示 Badge
    showZero: {
      type: Boolean,
      default: false
    },
    // 位置偏移
    offset: {
      type: Array,
      default: () => {
        return [20, 20];
      }
    },
    // 是否开启绝对定位，开启了offset才会起作用
    absolute: {
      type: Boolean,
      default: true
    },
    // 字体大小
    fontSize: {
      type: [String, Number],
      default: "24"
    },
    // 字体演示
    color: {
      type: String,
      default: "#ffffff"
    },
    // badge的背景颜色
    bgColor: {
      type: String,
      default: ""
    },
    // 是否让badge组件的中心点和父组件右上角重合，配置的话，offset将会失效
    isCenter: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 是否将badge中心与父组件右上角重合
    boxStyle() {
      let style = {};
      if (this.isCenter) {
        style.top = 0;
        style.right = 0;
        style.transform = "translateY(-50%) translateX(50%)";
      } else {
        style.top = this.offset[0] + "rpx";
        style.right = this.offset[1] + "rpx";
        style.transform = "translateY(0) translateX(0)";
      }
      if (this.size == "mini") {
        style.transform = style.transform + " scale(0.8)";
      }
      return style;
    },
    // isDot类型时，不显示文字
    showText() {
      if (this.isDot)
        return "";
      else {
        if (this.count > this.overflowCount)
          return `${this.overflowCount}+`;
        else
          return this.count;
      }
    },
    // 是否显示组件
    show() {
      if (this.count == 0 && this.showZero == false)
        return false;
      else
        return true;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.show
  }, $options.show ? {
    b: common_vendor.t($options.showText),
    c: common_vendor.n($props.isDot ? "u-badge-dot" : ""),
    d: common_vendor.n($props.size == "mini" ? "u-badge-mini" : ""),
    e: common_vendor.n($props.type ? "u-badge--bg--" + $props.type : ""),
    f: common_vendor.s({
      top: $props.offset[0] + "rpx",
      right: $props.offset[1] + "rpx",
      fontSize: $props.fontSize + "rpx",
      position: $props.absolute ? "absolute" : "static",
      color: $props.color,
      backgroundColor: $props.bgColor
    }),
    g: common_vendor.s($options.boxStyle)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f84de764"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-badge/u-badge.vue"]]);
wx.createComponent(Component);
