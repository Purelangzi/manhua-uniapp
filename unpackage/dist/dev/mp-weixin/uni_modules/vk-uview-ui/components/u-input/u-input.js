"use strict";
const uni_modules_vkUviewUi_libs_util_emitter = require("../../libs/util/emitter.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-input",
  emits: ["update:modelValue", "input", "change", "blur", "focus", "click", "touchstart"],
  mixins: [uni_modules_vkUviewUi_libs_util_emitter.Emitter],
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    // 输入框的类型，textarea，text，number
    type: {
      type: String,
      default: "text"
    },
    inputAlign: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    placeholderStyle: {
      type: String,
      default: "color: #c0c4cc;"
    },
    confirmType: {
      type: String,
      default: "done"
    },
    // 输入框的自定义样式
    customStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
    fixed: {
      type: Boolean,
      default: false
    },
    // 是否自动获得焦点
    focus: {
      type: Boolean,
      default: false
    },
    // 密码类型时，是否显示右侧的密码图标
    passwordIcon: {
      type: Boolean,
      default: true
    },
    // input|textarea是否显示边框
    border: {
      type: Boolean,
      default: false
    },
    // 输入框的边框颜色
    borderColor: {
      type: String,
      default: "#dcdfe6"
    },
    autoHeight: {
      type: Boolean,
      default: true
    },
    // type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态
    // open-打开，close-关闭
    selectOpen: {
      type: Boolean,
      default: false
    },
    // 高度，单位rpx
    height: {
      type: [Number, String],
      default: ""
    },
    // 是否可清空
    clearable: {
      type: [Boolean, String]
    },
    // 指定光标与键盘的距离，单位 px
    cursorSpacing: {
      type: [Number, String],
      default: 0
    },
    // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
    selectionStart: {
      type: [Number, String],
      default: -1
    },
    // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
    selectionEnd: {
      type: [Number, String],
      default: -1
    },
    // 是否自动去除两端的空格
    trim: {
      type: Boolean,
      default: true
    },
    // 是否显示键盘上方带有”完成“按钮那一栏
    showConfirmbar: {
      type: Boolean,
      default: true
    },
    // 弹出键盘时是否自动调节高度，uni-app默认值是true
    adjustPosition: {
      type: Boolean,
      default: true
    },
    // input的背景色
    backgroundColor: {
      type: String
    },
    // input的padding
    padding: {
      type: String
    }
  },
  data() {
    return {
      defaultValue: "",
      inputHeight: 70,
      // input的高度
      textareaHeight: 100,
      // textarea的高度
      validateState: false,
      // 当前input的验证状态，用于错误时，边框是否改为红色
      focused: false,
      // 当前是否处于获得焦点的状态
      showPassword: false,
      // 是否预览密码
      lastValue: "",
      // 用于头条小程序，判断@input中，前后的值是否发生了变化，因为头条中文下，按下键没有输入内容，也会触发@input时间
      uForm: {
        inputAlign: "",
        clearable: ""
      }
    };
  },
  watch: {
    valueCom(nVal, oVal) {
      this.defaultValue = nVal;
      if (nVal != oVal && this.type == "select")
        this.handleInput({
          detail: {
            value: nVal
          }
        });
    }
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    inputAlignCom() {
      return this.inputAlign || this.uForm.inputAlign || "left";
    },
    clearableCom() {
      if (typeof this.clearable == "boolean")
        return this.clearable;
      if (typeof this.uForm.clearable == "boolean")
        return this.uForm.clearable;
      return true;
    },
    // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，给用户可以传入字符串数值
    inputMaxlength() {
      return Number(this.maxlength);
    },
    getStyle() {
      let style = {};
      style.minHeight = this.height ? this.height + "rpx" : this.type == "textarea" ? this.textareaHeight + "rpx" : this.inputHeight + "rpx";
      style = Object.assign(style, this.customStyle);
      return style;
    },
    //
    getCursorSpacing() {
      return Number(this.cursorSpacing);
    },
    // 光标起始位置
    uSelectionStart() {
      return String(this.selectionStart);
    },
    // 光标结束位置
    uSelectionEnd() {
      return String(this.selectionEnd);
    }
  },
  created() {
    this.defaultValue = this.valueCom;
  },
  mounted() {
    let parent = this.$u.$parent.call(this, "u-form");
    if (parent) {
      Object.keys(this.uForm).map((key) => {
        this.uForm[key] = parent[key];
      });
    }
  },
  methods: {
    /**
     * change 事件
     * @param event
     */
    handleInput(event) {
      let value = event.detail.value;
      if (this.trim)
        value = this.$u.trim(value);
      this.$emit("input", value);
      this.$emit("update:modelValue", value);
      this.defaultValue = value;
      setTimeout(() => {
        this.dispatch("u-form-item", "onFieldChange", value);
      }, 40);
    },
    /**
     * blur 事件
     * @param event
     */
    handleBlur(event) {
      setTimeout(() => {
        this.focused = false;
      }, 100);
      this.$emit("blur", event.detail.value);
      setTimeout(() => {
        this.dispatch("u-form-item", "onFieldBlur", event.detail.value);
      }, 40);
    },
    onFormItemError(status) {
      this.validateState = status;
    },
    onFocus(event) {
      this.focused = true;
      this.$emit("focus");
    },
    onConfirm(e) {
      this.$emit("confirm", e.detail.value);
    },
    onClear(event) {
      this.$emit("input", "");
      this.$emit("update:modelValue", "");
    },
    inputClick() {
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
    a: $props.type == "textarea"
  }, $props.type == "textarea" ? {
    b: common_vendor.s($options.getStyle),
    c: $data.defaultValue,
    d: $props.placeholder,
    e: $props.placeholderStyle,
    f: $props.disabled,
    g: $options.inputMaxlength,
    h: $props.fixed,
    i: $props.focus,
    j: $props.autoHeight,
    k: $options.uSelectionEnd,
    l: $options.uSelectionStart,
    m: $options.getCursorSpacing,
    n: $props.showConfirmbar,
    o: $props.adjustPosition,
    p: common_vendor.o((...args) => $options.handleInput && $options.handleInput(...args)),
    q: common_vendor.o((...args) => $options.handleBlur && $options.handleBlur(...args)),
    r: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    s: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args))
  } : {
    t: $props.type == "password" ? "text" : $props.type,
    v: common_vendor.s($options.getStyle),
    w: $data.defaultValue,
    x: $props.type == "password" && !$data.showPassword,
    y: $props.placeholder,
    z: $props.placeholderStyle,
    A: $props.disabled || $props.type === "select",
    B: $options.inputMaxlength,
    C: $props.focus,
    D: $props.confirmType,
    E: $options.getCursorSpacing,
    F: $options.uSelectionEnd,
    G: $options.uSelectionStart,
    H: $props.showConfirmbar,
    I: $props.adjustPosition,
    J: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    K: common_vendor.o((...args) => $options.handleBlur && $options.handleBlur(...args)),
    L: common_vendor.o((...args) => $options.handleInput && $options.handleInput(...args)),
    M: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args))
  }, {
    N: $options.clearableCom && $options.valueCom != "" && $data.focused
  }, $options.clearableCom && $options.valueCom != "" && $data.focused ? {
    O: common_vendor.p({
      size: "32",
      name: "close-circle-fill",
      color: "#c0c4cc"
    }),
    P: common_vendor.o((...args) => $options.onClear && $options.onClear(...args))
  } : {}, {
    Q: $props.passwordIcon && $props.type == "password"
  }, $props.passwordIcon && $props.type == "password" ? {
    R: common_vendor.o(($event) => $data.showPassword = !$data.showPassword),
    S: common_vendor.p({
      size: "32",
      name: !$data.showPassword ? "eye" : "eye-fill",
      color: "#c0c4cc"
    })
  } : {}, {
    T: $props.type == "select"
  }, $props.type == "select" ? {
    U: common_vendor.p({
      name: "arrow-down-fill",
      size: "26",
      color: "#c0c4cc"
    }),
    V: $props.selectOpen ? 1 : ""
  } : {}, {
    W: $props.border ? 1 : "",
    X: $data.validateState ? 1 : "",
    Y: $props.padding ? $props.padding : `0 ${$props.border ? 20 : 0}rpx`,
    Z: $props.borderColor,
    aa: $options.inputAlignCom,
    ab: $props.backgroundColor,
    ac: common_vendor.o((...args) => $options.inputClick && $options.inputClick(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dc846cb1"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-input/u-input.vue"]]);
wx.createComponent(Component);
