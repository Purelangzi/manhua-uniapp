"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-cell-item",
  emits: ["click"],
  props: {
    // 左侧图标名称(只能uView内置图标)，或者图标src
    icon: {
      type: String,
      default: ""
    },
    // 左侧标题
    title: {
      type: [String, Number],
      default: ""
    },
    // 右侧内容
    value: {
      type: [String, Number],
      default: ""
    },
    // 标题下方的描述信息
    label: {
      type: [String, Number],
      default: ""
    },
    // 是否显示下边框
    borderBottom: {
      type: Boolean,
      default: true
    },
    // 是否显示上边框
    borderTop: {
      type: Boolean,
      default: false
    },
    // 多个cell中，中间的cell显示下划线时，下划线是否给一个到左边的距离
    // 1.4.0版本废除此参数，默认边框由border-top和border-bottom提供，此参数会造成干扰
    // borderGap: {
    // 	type: Boolean,
    // 	default: true
    // },
    // 是否开启点击反馈，即点击时cell背景为灰色，none为无效果
    hoverClass: {
      type: String,
      default: "u-cell-hover"
    },
    // 是否显示右侧箭头
    arrow: {
      type: Boolean,
      default: true
    },
    // 内容是否垂直居中
    center: {
      type: Boolean,
      default: false
    },
    // 是否显示左边表示必填的星号
    required: {
      type: Boolean,
      default: false
    },
    // 标题的宽度，单位rpx
    titleWidth: {
      type: [Number, String],
      default: ""
    },
    // 右侧箭头方向，可选值：right|up|down，默认为right
    arrowDirection: {
      type: String,
      default: "right"
    },
    // 控制标题的样式
    titleStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 右侧显示内容的样式
    valueStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 描述信息的样式
    labelStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: "transparent"
    },
    // 用于识别被点击的是第几个cell
    index: {
      type: [String, Number],
      default: ""
    },
    // 是否使用lable插槽
    useLabelSlot: {
      type: Boolean,
      default: false
    },
    // 左边图标的大小，单位rpx，只对传入icon字段时有效
    iconSize: {
      type: [Number, String],
      default: 34
    },
    // 左边图标的样式，对象形式
    iconStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    arrowStyle() {
      let style = {};
      if (this.arrowDirection == "up")
        style.transform = "rotate(-90deg)";
      else if (this.arrowDirection == "down")
        style.transform = "rotate(90deg)";
      else
        style.transform = "rotate(0deg)";
      return style;
    }
  },
  methods: {
    click() {
      this.$emit("click", this.index);
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.icon
  }, $props.icon ? {
    b: common_vendor.p({
      size: $props.iconSize,
      name: $props.icon,
      ["custom-style"]: $props.iconStyle
    })
  } : {}, {
    c: $props.title !== ""
  }, $props.title !== "" ? {
    d: common_vendor.t($props.title)
  } : {}, {
    e: $props.label || _ctx.$slots.label
  }, $props.label || _ctx.$slots.label ? common_vendor.e({
    f: $props.label !== ""
  }, $props.label !== "" ? {
    g: common_vendor.t($props.label)
  } : {}, {
    h: common_vendor.s($props.labelStyle)
  }) : {}, {
    i: common_vendor.s({
      width: $props.titleWidth ? $props.titleWidth + "rpx" : "auto"
    }),
    j: common_vendor.s($props.titleStyle),
    k: $props.value !== ""
  }, $props.value !== "" ? {
    l: common_vendor.t($props.value)
  } : {}, {
    m: common_vendor.s($props.valueStyle),
    n: _ctx.$slots["right-icon"]
  }, _ctx.$slots["right-icon"] ? {} : {}, {
    o: $props.arrow
  }, $props.arrow ? {
    p: common_vendor.s($options.arrowStyle),
    q: common_vendor.p({
      name: "arrow-right"
    })
  } : {}, {
    r: common_vendor.o((...args) => $options.click && $options.click(...args)),
    s: $props.borderBottom ? 1 : "",
    t: $props.borderTop ? 1 : "",
    v: $props.center ? 1 : "",
    w: $props.required ? 1 : "",
    x: $props.hoverClass,
    y: $props.bgColor
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e5554f60"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-cell-item/u-cell-item.vue"]]);
wx.createComponent(Component);
