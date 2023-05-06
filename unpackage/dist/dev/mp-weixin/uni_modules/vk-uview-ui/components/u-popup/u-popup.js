"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-popup",
  emits: ["update:modelValue", "input", "open", "close"],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    /**
     * 显示状态
     */
    show: {
      type: Boolean,
      default: false
    },
    /**
     * 弹出方向，left|right|top|bottom|center
     */
    mode: {
      type: String,
      default: "left"
    },
    /**
     * 是否显示遮罩
     */
    mask: {
      type: Boolean,
      default: true
    },
    // 抽屉的宽度(mode=left|right)，或者高度(mode=top|bottom)，单位rpx，或者"auto"
    // 或者百分比"50%"，表示由内容撑开高度或者宽度
    length: {
      type: [Number, String],
      default: "auto"
    },
    // 是否开启缩放动画，只在mode=center时有效
    zoom: {
      type: Boolean,
      default: true
    },
    // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
    safeAreaInsetBottom: {
      type: Boolean,
      default: false
    },
    // 是否可以通过点击遮罩进行关闭
    maskCloseAble: {
      type: Boolean,
      default: true
    },
    // 用户自定义样式
    customStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 此为内部参数，不在文档对外使用，为了解决Picker和keyboard等融合了弹窗的组件
    // 对v-model双向绑定多层调用造成报错不能修改props值的问题
    popup: {
      type: Boolean,
      default: true
    },
    // 显示显示弹窗的圆角，单位rpx
    borderRadius: {
      type: [Number, String],
      default: 0
    },
    zIndex: {
      type: [Number, String],
      default: ""
    },
    // 是否显示关闭图标
    closeable: {
      type: Boolean,
      default: false
    },
    // 关闭图标的名称，只能uView的内置图标
    closeIcon: {
      type: String,
      default: "close"
    },
    // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
    closeIconPos: {
      type: String,
      default: "top-right"
    },
    // 关闭图标的颜色
    closeIconColor: {
      type: String,
      default: "#909399"
    },
    // 关闭图标的大小，单位rpx
    closeIconSize: {
      type: [String, Number],
      default: "30"
    },
    // 宽度，只对左，右，中部弹出时起作用，单位rpx，或者"auto"
    // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
    width: {
      type: String,
      default: ""
    },
    // 高度，只对上，下，中部弹出时起作用，单位rpx，或者"auto"
    // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
    height: {
      type: String,
      default: ""
    },
    // 给一个负的margin-top，往上偏移，避免和键盘重合的情况，仅在mode=center时有效
    negativeTop: {
      type: [String, Number],
      default: 0
    },
    // 遮罩的样式，一般用于修改遮罩的透明度
    maskCustomStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 遮罩打开或收起的动画过渡时间，单位ms
    duration: {
      type: [String, Number],
      default: 250
    },
    // 遮罩的模糊度
    blur: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      visibleSync: false,
      showDrawer: false,
      timer: null,
      closeFromInner: false
      // value的值改变，是发生在内部还是外部
    };
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    // 根据mode的位置，设定其弹窗的宽度(mode = left|right)，或者高度(mode = top|bottom)
    style() {
      let style = {};
      if (this.mode == "left" || this.mode == "right") {
        style = {
          width: this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length),
          height: "100%",
          transform: `translate3D(${this.mode == "left" ? "-100%" : "100%"},0px,0px)`
        };
      } else if (this.mode == "top" || this.mode == "bottom") {
        style = {
          width: "100%",
          height: this.height ? this.getUnitValue(this.height) : this.getUnitValue(this.length),
          transform: `translate3D(0px,${this.mode == "top" ? "-100%" : "100%"},0px)`
        };
      }
      style.zIndex = this.uZindex;
      if (this.borderRadius) {
        switch (this.mode) {
          case "left":
            style.borderRadius = `0 ${this.borderRadius}rpx ${this.borderRadius}rpx 0`;
            break;
          case "top":
            style.borderRadius = `0 0 ${this.borderRadius}rpx ${this.borderRadius}rpx`;
            break;
          case "right":
            style.borderRadius = `${this.borderRadius}rpx 0 0 ${this.borderRadius}rpx`;
            break;
          case "bottom":
            style.borderRadius = `${this.borderRadius}rpx ${this.borderRadius}rpx 0 0`;
            break;
        }
        style.overflow = "hidden";
      }
      if (this.duration)
        style.transition = `all ${this.duration / 1e3}s linear`;
      return style;
    },
    // 中部弹窗的特有样式
    centerStyle() {
      let style = {};
      style.width = this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length);
      style.height = this.height ? this.getUnitValue(this.height) : "auto";
      style.zIndex = this.uZindex;
      style.marginTop = `-${this.$u.addUnit(this.negativeTop)}`;
      if (this.borderRadius) {
        style.borderRadius = `${this.borderRadius}rpx`;
        style.overflow = "hidden";
      }
      return style;
    },
    // 计算整理后的z-index值
    uZindex() {
      return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
    }
  },
  watch: {
    valueCom: {
      immediate: true,
      handler(val) {
        if (val) {
          this.open();
        } else if (!this.closeFromInner) {
          this.close();
        }
        this.closeFromInner = false;
      }
    }
  },
  mounted() {
    this.valueCom && this.open();
  },
  methods: {
    // 判断传入的值，是否带有单位，如果没有，就默认用rpx单位
    getUnitValue(val) {
      if (/(%|px|rpx|auto)$/.test(val))
        return val;
      else
        return val + "rpx";
    },
    // 遮罩被点击
    maskClick() {
      this.close();
    },
    close() {
      this.closeFromInner = true;
      this.change("showDrawer", "visibleSync", false);
    },
    // 中部弹出时，需要.u-drawer-content将居中内容，此元素会铺满屏幕，点击需要关闭弹窗
    // 让其只在mode=center时起作用
    modeCenterClose(mode) {
      if (mode != "center" || !this.maskCloseAble)
        return;
      this.close();
    },
    open() {
      this.change("visibleSync", "showDrawer", true);
    },
    // 此处的原理是，关闭时先通过动画隐藏弹窗和遮罩，再移除整个组件
    // 打开时，先渲染组件，延时一定时间再让遮罩和弹窗的动画起作用
    change(param1, param2, status) {
      if (this.popup == true) {
        this.$emit("input", status);
        this.$emit("update:modelValue", status);
      }
      this[param1] = status;
      if (status) {
        this.timer = setTimeout(() => {
          this[param2] = status;
          this.$emit(status ? "open" : "close");
        }, 50);
      } else {
        this.timer = setTimeout(() => {
          this[param2] = status;
          this.$emit(status ? "open" : "close");
        }, this.duration);
      }
    }
  }
};
if (!Array) {
  const _easycom_u_mask2 = common_vendor.resolveComponent("u-mask");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_mask2 + _easycom_u_icon2)();
}
const _easycom_u_mask = () => "../u-mask/u-mask.js";
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_mask + _easycom_u_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.maskClick),
    b: common_vendor.p({
      blur: $props.blur,
      duration: $props.duration,
      ["custom-style"]: $props.maskCustomStyle,
      maskClickAble: $props.maskCloseAble,
      ["z-index"]: $options.uZindex - 2,
      show: $data.showDrawer && $props.mask
    }),
    c: $props.mode == "center"
  }, $props.mode == "center" ? common_vendor.e({
    d: $props.closeable
  }, $props.closeable ? {
    e: common_vendor.o($options.close),
    f: common_vendor.n("u-close--" + $props.closeIconPos),
    g: common_vendor.p({
      name: $props.closeIcon,
      color: $props.closeIconColor,
      size: $props.closeIconSize
    })
  } : {}, {
    h: common_vendor.o(() => {
    }),
    i: common_vendor.o(() => {
    }),
    j: common_vendor.s($options.centerStyle)
  }) : {}, {
    k: $props.mode != "center" && $props.closeable
  }, $props.mode != "center" && $props.closeable ? {
    l: common_vendor.p({
      name: $props.closeIcon,
      color: $props.closeIconColor,
      size: $props.closeIconSize
    })
  } : {}, {
    m: common_vendor.o((...args) => $options.close && $options.close(...args)),
    n: common_vendor.n("u-close--" + $props.closeIconPos),
    o: common_vendor.o(($event) => $options.modeCenterClose($props.mode)),
    p: common_vendor.n($props.safeAreaInsetBottom ? "safe-area-inset-bottom" : ""),
    q: common_vendor.n("u-drawer-" + $props.mode),
    r: common_vendor.n($data.showDrawer ? "u-drawer-content-visible" : ""),
    s: common_vendor.n($props.zoom && $props.mode == "center" ? "u-animation-zoom" : ""),
    t: common_vendor.o(() => {
    }),
    v: common_vendor.s($options.style),
    w: $data.visibleSync,
    x: common_vendor.s($props.customStyle),
    y: common_vendor.s({
      zIndex: $options.uZindex - 1
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c93a8fd2"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-popup/u-popup.vue"]]);
wx.createComponent(Component);
