"use strict";
const uni_modules_vkUviewUi_libs_util_emitter = require("../../libs/util/emitter.js");
const uni_modules_vkUviewUi_libs_util_asyncValidator = require("../../libs/util/async-validator.js");
const common_vendor = require("../../../../common/vendor.js");
uni_modules_vkUviewUi_libs_util_asyncValidator.Schema.warning = function() {
};
const _sfc_main = {
  name: "u-form-item",
  mixins: [uni_modules_vkUviewUi_libs_util_emitter.Emitter],
  inject: {
    uForm: {
      default() {
        return null;
      }
    }
  },
  props: {
    // input的label提示语
    label: {
      type: String,
      default: ""
    },
    // 绑定的值
    prop: {
      type: String,
      default: ""
    },
    // 是否显示表单域的下划线边框
    borderBottom: {
      type: [String, Boolean],
      default: ""
    },
    // label的位置，left-左边，top-上边
    labelPosition: {
      type: String,
      default: ""
    },
    // label的宽度，单位rpx
    labelWidth: {
      type: [String, Number],
      default: ""
    },
    // lable的样式，对象形式
    labelStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // lable字体的对齐方式
    labelAlign: {
      type: String,
      default: ""
    },
    // 右侧图标
    rightIcon: {
      type: String,
      default: ""
    },
    // 左侧图标
    leftIcon: {
      type: String,
      default: ""
    },
    // 左侧图标的样式
    leftIconStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 左侧图标的样式
    rightIconStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
    required: {
      type: Boolean,
      default: false
    },
    inputAlign: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      initialValue: "",
      // 存储的默认值
      // isRequired: false, // 是否必填，由于人性化考虑，必填"*"号通过props的required配置，不再通过rules的规则自动生成
      validateState: "",
      // 是否校验成功
      validateMessage: "",
      // 校验失败的提示语
      // 有错误时的提示方式，message-提示信息，border-如果input设置了边框，变成呈红色，
      errorType: ["message"],
      fieldValue: "",
      // 获取当前子组件input的输入的值
      // 父组件的参数，在computed计算中，无法得知this.parent发生变化，故将父组件的参数值，放到data中
      parentData: {
        borderBottom: true,
        labelWidth: 90,
        labelPosition: "left",
        labelStyle: {},
        labelAlign: "left",
        inputAlign: "left"
      }
    };
  },
  watch: {
    validateState(val) {
      this.broadcastInputError();
    },
    // 监听u-form组件的errorType的变化
    "uForm.errorType"(val) {
      this.errorType = val;
      this.broadcastInputError();
    }
  },
  computed: {
    // 计算后的label宽度，由于需要多个判断，故放到computed中
    uLabelWidth() {
      return this.elLabelPosition == "left" ? this.label === "true" || this.label === "" ? "auto" : this.$u.addUnit(this.elLabelWidth) : "100%";
    },
    showError() {
      return (type) => {
        if (this.errorType.indexOf("none") >= 0)
          return false;
        else if (this.errorType.indexOf(type) >= 0)
          return true;
        else
          return false;
      };
    },
    // label的宽度
    elLabelWidth() {
      return this.labelWidth != 0 || this.labelWidth != "" ? this.labelWidth : this.parentData.labelWidth ? this.parentData.labelWidth : 90;
    },
    // label的样式
    elLabelStyle() {
      return Object.keys(this.labelStyle).length ? this.labelStyle : this.parentData.labelStyle ? this.parentData.labelStyle : {};
    },
    // label的位置，左侧或者上方
    elLabelPosition() {
      return this.labelPosition ? this.labelPosition : this.parentData.labelPosition ? this.parentData.labelPosition : "left";
    },
    // label的对齐方式
    elLabelAlign() {
      return this.labelAlign ? this.labelAlign : this.parentData.labelAlign ? this.parentData.labelAlign : "left";
    },
    // label的下划线
    elBorderBottom() {
      return this.borderBottom !== "" ? this.borderBottom : this.parentData.borderBottom ? this.parentData.borderBottom : true;
    },
    elInputAlign() {
      return this.inputAlign ? this.inputAlign : this.parentData.inputAlign ? this.parentData.inputAlign : "left";
    }
  },
  methods: {
    broadcastInputError() {
      this.broadcast("u-input", "onFormItemError", this.validateState === "error" && this.showError("border"));
    },
    // 判断是否需要required校验
    setRules() {
    },
    // 从u-form的rules属性中，取出当前u-form-item的校验规则
    getRules() {
      let rules = this.parent.rules;
      rules = rules ? rules[this.prop] : [];
      return [].concat(rules || []);
    },
    // blur事件时进行表单校验
    onFieldBlur() {
      this.validation("blur");
    },
    // change事件进行表单校验
    onFieldChange() {
      this.validation("change");
    },
    // 过滤出符合要求的rule规则
    getFilteredRule(triggerType = "") {
      let rules = this.getRules();
      if (!triggerType)
        return rules;
      return rules.filter((res) => res.trigger && res.trigger.indexOf(triggerType) !== -1);
    },
    getData(dataObj, name, defaultValue) {
      let newDataObj;
      if (dataObj) {
        newDataObj = JSON.parse(JSON.stringify(dataObj));
        let k = "", d = ".", l = "[", r = "]";
        name = name.replace(/\s+/g, k) + d;
        let tstr = k;
        for (let i = 0; i < name.length; i++) {
          let theChar = name.charAt(i);
          if (theChar != d && theChar != l && theChar != r) {
            tstr += theChar;
          } else if (newDataObj) {
            if (tstr != k)
              newDataObj = newDataObj[tstr];
            tstr = k;
          }
        }
      }
      if (typeof newDataObj === "undefined" && typeof defaultValue !== "undefined")
        newDataObj = defaultValue;
      return newDataObj;
    },
    setData(dataObj, name, value) {
      let dataValue;
      if (typeof value === "object") {
        dataValue = JSON.parse(JSON.stringify(value));
      } else {
        dataValue = value;
      }
      let regExp = new RegExp("([\\w$]+)|\\[(:\\d)\\]", "g");
      const patten = name.match(regExp);
      for (let i = 0; i < patten.length - 1; i++) {
        let keyName = patten[i];
        if (typeof dataObj[keyName] !== "object")
          dataObj[keyName] = {};
        dataObj = dataObj[keyName];
      }
      dataObj[patten[patten.length - 1]] = dataValue;
    },
    // 校验数据
    validation(trigger, callback = () => {
    }) {
      this.fieldValue = this.getData(this.parent.model, this.prop);
      let rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        return callback("");
      }
      this.validateState = "validating";
      let validator = new uni_modules_vkUviewUi_libs_util_asyncValidator.Schema({
        [this.prop]: rules
      });
      validator.validate({
        [this.prop]: this.fieldValue
      }, {
        firstFields: true
      }, (errors, fields) => {
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";
        let field = errors ? errors[0].field : "";
        callback(this.validateMessage, {
          state: this.validateState,
          key: field,
          msg: this.validateMessage
        });
      });
    },
    // 清空当前的u-form-item
    resetField() {
      this.setData(this.parent.model, this.prop, this.initialValue);
      this.validateState = "success";
    }
  },
  // 组件创建完成时，将当前实例保存到u-form中
  mounted() {
    this.parent = this.$u.$parent.call(this, "u-form");
    if (this.parent) {
      Object.keys(this.parentData).map((key) => {
        this.parentData[key] = this.parent[key];
      });
      if (this.prop) {
        this.parent.fields.push(this);
        this.errorType = this.parent.errorType;
        this.initialValue = this.fieldValue;
        this.$nextTick(() => {
          this.setRules();
        });
      }
    }
  },
  beforeUnmount() {
    if (this.parent && this.prop) {
      this.parent.fields.map((item, index) => {
        if (item === this)
          this.parent.fields.splice(index, 1);
      });
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
    a: $props.required || $props.leftIcon || $props.label
  }, $props.required || $props.leftIcon || $props.label ? common_vendor.e({
    b: $props.required
  }, $props.required ? {} : {}, {
    c: $props.leftIcon
  }, $props.leftIcon ? {
    d: common_vendor.p({
      name: $props.leftIcon,
      ["custom-style"]: $props.leftIconStyle
    })
  } : {}, {
    e: common_vendor.t($props.label),
    f: common_vendor.s($options.elLabelStyle),
    g: common_vendor.s({
      "justify-content": $options.elLabelAlign == "left" ? "flex-start" : $options.elLabelAlign == "center" ? "center" : "flex-end"
    })
  }) : {}, {
    h: $options.uLabelWidth,
    i: `0 0 ${$options.uLabelWidth}`,
    j: $options.elLabelPosition == "left" ? 0 : "10rpx",
    k: common_vendor.s($options.elLabelPosition == "left" && $options.elInputAlign == "right" ? "text-align:right;display: inline-block;line-height:initial;" : ""),
    l: _ctx.$slots.right || $props.rightIcon
  }, _ctx.$slots.right || $props.rightIcon ? common_vendor.e({
    m: $props.rightIcon
  }, $props.rightIcon ? {
    n: common_vendor.p({
      ["custom-style"]: $props.rightIconStyle,
      name: $props.rightIcon
    })
  } : {}) : {}, {
    o: $options.elLabelPosition == "left" ? "row" : "column",
    p: $data.validateState === "error" && $options.showError("message")
  }, $data.validateState === "error" && $options.showError("message") ? {
    q: common_vendor.t($data.validateMessage),
    r: $options.elLabelPosition == "left" ? _ctx.$u.addUnit($options.elLabelWidth) : "0",
    s: $options.elInputAlign == "right" ? "right" : "left"
  } : {}, {
    t: $options.elBorderBottom ? 1 : "",
    v: $data.validateState === "error" && $options.showError("border-bottom") ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-361fbc0d"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-form-item/u-form-item.vue"]]);
wx.createComponent(Component);
