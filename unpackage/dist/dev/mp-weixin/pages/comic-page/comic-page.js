"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../api/module/common.js");
require("../../api/request.js");
require("../../utils/showMsg.js");
require("../../stores/user.js");
require("../../utils/wxLogin.js");
require("../../api/module/cartoon.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_image2 + _easycom_u_icon2 + _easycom_u_popup2)();
}
const _easycom_u_image = () => "../../uni_modules/vk-uview-ui/components/u-image/u-image.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_image + _easycom_u_icon + _easycom_u_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "comic-page",
  setup(__props) {
    const toolStatus = common_vendor.ref(false);
    const state = common_vendor.reactive({
      pageContentList: [],
      // 章节内容
      toolStatus: false,
      showCatalog: false,
      sort: "正序",
      chapterList: [],
      // 章节列表
      detailData: {},
      // 漫画详情
      scrollTop: 0
    });
    common_vendor.onLoad((option) => {
      const { comic_id, chapter_id } = option;
      init(comic_id, chapter_id);
    });
    common_vendor.onMounted(() => {
    });
    const showTool = () => {
      toolStatus.value = !toolStatus.value;
    };
    const openCatalog = () => {
      state.showCatalog = true;
    };
    const init = async (comic_id, chapter_id) => {
      const params = {
        comic_id,
        isAll: true
      };
      try {
        const { data } = await api_index.api.getChapterList(params);
        state.chapterList = data.data;
        const item = data.data.find((el) => el.chapter_id == chapter_id);
        common_vendor.index.setNavigationBarTitle({
          title: item.title
        });
        const res = await api_index.api.getCartoonDetail(comic_id);
        state.detailData = res.data;
        const res1 = await api_index.api.getChapterPage(chapter_id);
        state.pageContentList = res1.data;
      } catch (e) {
      }
    };
    const scroll = (e) => {
      console.log(e.detail.scrollTop);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(state.pageContentList, (item, index, i0) => {
          return {
            a: index,
            b: "d62b69dd-0-" + i0,
            c: common_vendor.p({
              mode: "widthFix",
              src: item.image
            })
          };
        }),
        b: common_vendor.o(showTool),
        c: common_vendor.t(state.detailData.name),
        d: common_vendor.p({
          name: "list",
          label: state.sort,
          ["margin-right"]: "20",
          ["label-size"]: "26"
        }),
        e: common_vendor.f(state.chapterList, (item, k0, i0) => {
          return {
            a: "d62b69dd-3-" + i0 + ",d62b69dd-1",
            b: common_vendor.t(item.title),
            c: item.title_alias
          };
        }),
        f: common_vendor.p({
          name: "map-fill",
          color: "#ff7830",
          label: ""
        }),
        g: common_vendor.o(scroll),
        h: state.scrollTop,
        i: common_vendor.o(($event) => state.showCatalog = $event),
        j: common_vendor.p({
          mode: "right",
          width: "72%",
          modelValue: state.showCatalog
        }),
        k: common_vendor.p({
          name: "arrow-left",
          label: "上一话",
          ["label-size"]: "24",
          ["label-pos"]: "bottom"
        }),
        l: common_vendor.o(openCatalog),
        m: common_vendor.p({
          name: "file-text-fill",
          label: "目录",
          ["label-size"]: "24",
          size: "32",
          ["label-pos"]: "bottom"
        }),
        n: common_vendor.p({
          name: "arrow-right",
          label: "下一话",
          ["label-size"]: "24",
          ["label-pos"]: "bottom"
        }),
        o: toolStatus.value ? 1 : "",
        p: !toolStatus.value ? 1 : ""
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d62b69dd"], ["__file", "F:/HBuilderProjects/manhua/pages/comic-page/comic-page.vue"]]);
wx.createPage(MiniProgramPage);
