"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-form",
  props: {
    // 当前form的需要验证字段的集合
    model: {
      type: Object,
      default() {
        return {};
      }
    },
    // 验证规则
    // rules: {
    // 	type: [Object, Function, Array],
    // 	default() {
    // 		return {};
    // 	}
    // },
    // 有错误时的提示方式，message-提示信息，border-如果input设置了边框，变成呈红色，
    // border-bottom-下边框呈现红色，none-无提示
    errorType: {
      type: Array,
      default() {
        return ["message", "toast"];
      }
    },
    // 是否显示表单域的下划线边框
    borderBottom: {
      type: Boolean,
      default: true
    },
    // label的位置，left-左边，top-上边
    labelPosition: {
      type: String,
      default: "left"
    },
    // label的宽度，单位rpx
    labelWidth: {
      type: [String, Number],
      default: 90
    },
    // lable字体的对齐方式
    labelAlign: {
      type: String,
      default: "left"
    },
    // lable的样式，对象形式
    labelStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 表单内所有input的inputAlign属性的值
    inputAlign: {
      type: String,
      default: "left"
    },
    // 表单内所有input的clearable属性的值
    clearable: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      uForm: this
    };
  },
  data() {
    return {
      rules: {}
    };
  },
  created() {
    this.fields = [];
  },
  methods: {
    setRules(rules) {
      this.rules = rules;
    },
    // 清空所有u-form-item组件的内容，本质上是调用了u-form-item组件中的resetField()方法
    resetFields() {
      this.fields.map((field) => {
        field.resetField();
      });
    },
    // 校验全部数据
    validate(callback) {
      return new Promise((resolve) => {
        let valid = true;
        let count = 0;
        let errorArr = [];
        let errorObjArr = [];
        this.fields.map((field) => {
          field.validation("", (errorMsg, errObj) => {
            if (errorMsg) {
              valid = false;
              errorArr.push(errorMsg);
              errorObjArr.push(errObj);
            }
            if (++count === this.fields.length) {
              resolve(valid, errorObjArr[0]);
              if (this.errorType.indexOf("none") === -1 && this.errorType.indexOf("toast") >= 0 && errorArr.length) {
                this.$u.toast(errorArr[0]);
              }
              if (typeof callback == "function")
                callback(valid, errorObjArr[0]);
            }
          });
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-000ccc72"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-form/u-form.vue"]]);
wx.createComponent(Component);
