"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-search",
  emits: ["update:modelValue", "input", "change", "search", "custom", "clear", "focus", "blur"],
  props: {
    // 输入框的初始化内容
    value: {
      type: String,
      default: ""
    },
    modelValue: {
      type: String,
      default: ""
    },
    // 搜索框形状，round-圆形，square-方形
    shape: {
      type: String,
      default: "round"
    },
    // 搜索框背景色，默认值#f2f2f2
    bgColor: {
      type: String,
      default: "#f2f2f2"
    },
    // 占位提示文字
    placeholder: {
      type: String,
      default: "请输入关键字"
    },
    // 是否启用清除控件
    clearabled: {
      type: Boolean,
      default: true
    },
    // 是否自动聚焦
    focus: {
      type: Boolean,
      default: false
    },
    // 是否在搜索框右侧显示取消按钮
    showAction: {
      type: Boolean,
      default: true
    },
    // 右边控件的样式
    actionStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 取消按钮文字
    actionText: {
      type: String,
      default: "搜索"
    },
    // 输入框内容对齐方式，可选值为 left|center|right
    inputAlign: {
      type: String,
      default: "left"
    },
    // 是否启用输入框
    disabled: {
      type: Boolean,
      default: false
    },
    // 开启showAction时，是否在input获取焦点时才显示
    animation: {
      type: Boolean,
      default: false
    },
    // 边框颜色，只要配置了颜色，才会有边框
    borderColor: {
      type: String,
      default: "none"
    },
    // 搜索框高度，单位rpx
    height: {
      type: [Number, String],
      default: 64
    },
    // input输入框的样式，可以定义文字颜色，大小等，对象形式
    inputStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
    maxlength: {
      type: [Number, String],
      default: "-1"
    },
    // 搜索图标的颜色，默认同输入框字体颜色
    searchIconColor: {
      type: String,
      default: ""
    },
    // 输入框字体颜色
    color: {
      type: String,
      default: "#606266"
    },
    // placeholder的颜色
    placeholderColor: {
      type: String,
      default: "#909399"
    },
    // 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30rpx"、"30rpx 20rpx"等写法
    margin: {
      type: String,
      default: "0"
    },
    // 左边输入框的图标，可以为uView图标名称或图片路径
    searchIcon: {
      type: String,
      default: "search"
    }
  },
  data() {
    return {
      keyword: "",
      showClear: false,
      // 是否显示右边的清除图标
      show: false,
      // 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
      focused: this.focus
      // 绑定输入框的值
      // inputValue: this.value
    };
  },
  watch: {
    keyword(nVal) {
      this.$emit("input", nVal);
      this.$emit("update:modelValue", nVal);
      this.$emit("change", nVal);
    },
    valueCom: {
      immediate: true,
      handler(nVal) {
        this.keyword = nVal;
      }
    }
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    showActionBtn() {
      if (!this.animation && this.showAction)
        return true;
      else
        return false;
    },
    // 样式，根据用户传入的颜色值生成，如果不传入，默认为none
    borderStyle() {
      if (this.borderColor)
        return `1px solid ${this.borderColor}`;
      else
        return "none";
    }
  },
  methods: {
    // 目前HX2.6.9 v-model双向绑定无效，故监听input事件获取输入框内容的变化
    inputChange(e) {
      this.keyword = e.detail.value;
    },
    // 清空输入
    // 也可以作为用户通过this.$refs形式调用清空输入框内容
    clear() {
      this.keyword = "";
      this.$nextTick(() => {
        this.$emit("clear");
      });
    },
    // 确定搜索
    search(e) {
      this.$emit("search", e.detail.value);
      try {
        common_vendor.index.hideKeyboard();
      } catch (e2) {
      }
    },
    // 点击右边自定义按钮的事件
    custom() {
      this.$emit("custom", this.keyword);
      try {
        common_vendor.index.hideKeyboard();
      } catch (e) {
      }
    },
    // 获取焦点
    getFocus() {
      this.focused = true;
      if (this.animation && this.showAction)
        this.show = true;
      this.$emit("focus", this.keyword);
    },
    // 失去焦点
    blur() {
      setTimeout(() => {
        this.focused = false;
      }, 100);
      this.show = false;
      this.$emit("blur", this.keyword);
    },
    // 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
    clickHandler() {
      if (this.disabled)
        this.$emit("click");
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
    a: common_vendor.p({
      size: 30,
      name: $props.searchIcon,
      color: $props.searchIconColor ? $props.searchIconColor : $props.color
    }),
    b: common_vendor.o((...args) => $options.blur && $options.blur(...args)),
    c: $options.valueCom,
    d: common_vendor.o((...args) => $options.search && $options.search(...args)),
    e: common_vendor.o((...args) => $options.inputChange && $options.inputChange(...args)),
    f: $props.disabled,
    g: common_vendor.o((...args) => $options.getFocus && $options.getFocus(...args)),
    h: $props.focus,
    i: $props.maxlength,
    j: $props.placeholder,
    k: `color: ${$props.placeholderColor}`,
    l: common_vendor.s({
      textAlign: $props.inputAlign,
      color: $props.color,
      backgroundColor: $props.bgColor
    }),
    m: common_vendor.s($props.inputStyle),
    n: $data.keyword && $props.clearabled && $data.focused
  }, $data.keyword && $props.clearabled && $data.focused ? {
    o: common_vendor.p({
      name: "close-circle-fill",
      size: "34",
      color: "#c0c4cc"
    }),
    p: common_vendor.o((...args) => $options.clear && $options.clear(...args))
  } : {}, {
    q: $props.bgColor,
    r: $props.shape == "round" ? "100rpx" : "10rpx",
    s: $options.borderStyle,
    t: $props.height + "rpx",
    v: common_vendor.t($props.actionText),
    w: common_vendor.s($props.actionStyle),
    x: common_vendor.n($options.showActionBtn || $data.show ? "u-action-active" : ""),
    y: common_vendor.o((...args) => $options.custom && $options.custom(...args)),
    z: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args)),
    A: $props.margin
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3cb29fc1"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-search/u-search.vue"]]);
wx.createComponent(Component);
