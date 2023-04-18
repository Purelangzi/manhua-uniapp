"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-icon",
  emits: ["click", "touchstart"],
  props: {
    // 图标类名
    name: {
      type: String,
      default: ""
    },
    // 图标颜色，可接受主题色
    color: {
      type: String,
      default: ""
    },
    // 字体大小，单位rpx
    size: {
      type: [Number, String],
      default: "inherit"
    },
    // 是否显示粗体
    bold: {
      type: Boolean,
      default: false
    },
    // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
    index: {
      type: [Number, String],
      default: ""
    },
    // 触摸图标时的类名
    hoverClass: {
      type: String,
      default: ""
    },
    // 自定义扩展前缀，方便用户扩展自己的图标库
    customPrefix: {
      type: String,
      default: "uicon"
    },
    // 图标右边或者下面的文字
    label: {
      type: [String, Number],
      default: ""
    },
    // label的位置，只能右边或者下边
    labelPos: {
      type: String,
      default: "right"
    },
    // label的大小
    labelSize: {
      type: [String, Number],
      default: "28"
    },
    // label的颜色
    labelColor: {
      type: String,
      default: "#606266"
    },
    // label与图标的距离(横向排列)
    marginLeft: {
      type: [String, Number],
      default: "6"
    },
    // label与图标的距离(竖向排列)
    marginTop: {
      type: [String, Number],
      default: "6"
    },
    // label与图标的距离(竖向排列)
    marginRight: {
      type: [String, Number],
      default: "6"
    },
    // label与图标的距离(竖向排列)
    marginBottom: {
      type: [String, Number],
      default: "6"
    },
    // 图片的mode
    imgMode: {
      type: String,
      default: "widthFix"
    },
    // 自定义样式
    customStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 用于显示图片小图标时，图片的宽度
    width: {
      type: [String, Number],
      default: ""
    },
    // 用于显示图片小图标时，图片的高度
    height: {
      type: [String, Number],
      default: ""
    },
    // 用于解决某些情况下，让图标垂直居中的用途
    top: {
      type: [String, Number],
      default: 0
    },
    // 是否为DecimalIcon
    showDecimalIcon: {
      type: Boolean,
      default: false
    },
    // 背景颜色，可接受主题色，仅Decimal时有效
    inactiveColor: {
      type: String,
      default: "#ececec"
    },
    // 显示的百分比，仅Decimal时有效
    percent: {
      type: [Number, String],
      default: "50"
    }
  },
  computed: {
    customClass() {
      let classes = [];
      let { customPrefix, name } = this;
      let index = name.indexOf("-icon-");
      if (index > -1) {
        customPrefix = name.substring(0, index + 5);
        classes.push(name);
      } else {
        classes.push(`${customPrefix}-${name}`);
      }
      if (customPrefix === "uicon") {
        classes.push("u-iconfont");
      } else {
        classes.push(customPrefix);
      }
      if (this.showDecimalIcon && this.inactiveColor && this.$u.config.type.includes(this.inactiveColor)) {
        classes.push("u-icon__icon--" + this.inactiveColor);
      } else if (this.color && this.$u.config.type.includes(this.color))
        classes.push("u-icon__icon--" + this.color);
      return classes;
    },
    iconStyle() {
      let style = {};
      style = {
        fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
        fontWeight: this.bold ? "bold" : "normal",
        // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
        top: this.$u.addUnit(this.top)
      };
      if (this.showDecimalIcon && this.inactiveColor && !this.$u.config.type.includes(this.inactiveColor)) {
        style.color = this.inactiveColor;
      } else if (this.color && !this.$u.config.type.includes(this.color))
        style.color = this.color;
      return style;
    },
    // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
    isImg() {
      return this.name.indexOf("/") !== -1;
    },
    imgStyle() {
      let style = {};
      style.width = this.width ? this.$u.addUnit(this.width) : this.$u.addUnit(this.size);
      style.height = this.height ? this.$u.addUnit(this.height) : this.$u.addUnit(this.size);
      return style;
    },
    decimalIconStyle() {
      let style = {};
      style = {
        fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
        fontWeight: this.bold ? "bold" : "normal",
        // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
        top: this.$u.addUnit(this.top),
        width: this.percent + "%"
      };
      if (this.color && !this.$u.config.type.includes(this.color))
        style.color = this.color;
      return style;
    },
    decimalIconClass() {
      let classes = [];
      classes.push(this.customPrefix + "-" + this.name);
      if (this.customPrefix == "uicon") {
        classes.push("u-iconfont");
      } else {
        classes.push(this.customPrefix);
      }
      if (this.color && this.$u.config.type.includes(this.color))
        classes.push("u-icon__icon--" + this.color);
      else
        classes.push("u-icon__icon--primary");
      return classes;
    }
  },
  methods: {
    click() {
      this.$emit("click", this.index);
    },
    touchstart() {
      this.$emit("touchstart", this.index);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.isImg
  }, $options.isImg ? {
    b: $props.name,
    c: $props.imgMode,
    d: common_vendor.s($options.imgStyle)
  } : common_vendor.e({
    e: $props.showDecimalIcon
  }, $props.showDecimalIcon ? {
    f: common_vendor.s($options.decimalIconStyle),
    g: common_vendor.n($options.decimalIconClass),
    h: $props.hoverClass
  } : {}, {
    i: common_vendor.n($options.customClass),
    j: common_vendor.s($options.iconStyle),
    k: $props.hoverClass,
    l: common_vendor.o((...args) => $options.touchstart && $options.touchstart(...args))
  }), {
    m: $props.label !== "" && $props.label !== null
  }, $props.label !== "" && $props.label !== null ? {
    n: common_vendor.t($props.label),
    o: $props.labelColor,
    p: _ctx.$u.addUnit($props.labelSize),
    q: $props.labelPos == "right" ? _ctx.$u.addUnit($props.marginLeft) : 0,
    r: $props.labelPos == "bottom" ? _ctx.$u.addUnit($props.marginTop) : 0,
    s: $props.labelPos == "left" ? _ctx.$u.addUnit($props.marginRight) : 0,
    t: $props.labelPos == "top" ? _ctx.$u.addUnit($props.marginBottom) : 0
  } : {}, {
    v: common_vendor.s($props.customStyle),
    w: common_vendor.o((...args) => $options.click && $options.click(...args)),
    x: common_vendor.n("u-icon--" + $props.labelPos)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5de67484"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-icon/u-icon.vue"]]);
wx.createComponent(Component);
