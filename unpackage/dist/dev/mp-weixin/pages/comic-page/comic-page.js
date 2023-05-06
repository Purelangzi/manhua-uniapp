"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const stores_user = require("../../stores/user.js");
const utils_showMsg = require("../../utils/showMsg.js");
require("../../api/module/common.js");
require("../../api/request.js");
require("../../utils/wxLogin.js");
require("../../api/module/cartoon.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_icon2 + _easycom_u_popup2)();
}
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "comic-page",
  setup(__props) {
    const userStore = stores_user.useUser();
    const chapterItemRef = common_vendor.ref([]);
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
      scrollTop: 0,
      loading: true,
      toolColumn: [
        { id: -1, name: "arrow-left", label: "上一话", labelPos: "bottom", labelSize: 24 },
        { id: 0, name: "grid-fill", label: "目录", labelPos: "bottom", labelSize: 24 },
        { id: 1, name: "arrow-right", label: "下一话", labelPos: "bottom", labelSize: 24 }
      ],
      curChapterId: 0,
      curChapterRefIndex: 0,
      nodeList: void 0
    });
    const setChapterItemRef = (el) => {
      chapterItemRef.value.push(el);
    };
    common_vendor.onLoad((option) => {
      const { comic_id, chapter_id } = option;
      init(comic_id, chapter_id);
    });
    common_vendor.onMounted(() => {
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onReady(() => {
      console.log("onReady");
    });
    const showTool = () => {
      toolStatus.value = !toolStatus.value;
    };
    const onTool = (id) => {
      const index = state.chapterList.findIndex((item2) => item2.chapter_id == state.curChapterId);
      state.curChapterRefIndex = index;
      let el = chapterItemRef.value[index];
      if (id === 0) {
        el.$el.classList.value = "chapter-item";
        el.$el.classList.value += " chapter-item-current";
        state.showCatalog = true;
        return;
      }
      let page = 0;
      if (index === -1) {
        utils_showMsg.showMsg({ title: "章节不存在" });
        return;
      }
      if (id === -1) {
        el.$el.classList.value = "chapter-item";
        page = index - 1;
        if (page < 0) {
          utils_showMsg.showMsg({ title: "没有上一话了" });
          return;
        }
      } else {
        el.$el.classList.value = "chapter-item";
        page = index + 1;
        if (page > state.chapterList.length) {
          utils_showMsg.showMsg({ title: "没有下一话了" });
          return;
        }
      }
      const item = state.chapterList[page];
      common_vendor.index.setNavigationBarTitle({
        title: item.title
      });
      init(item.comic_id, item.chapter_id);
    };
    const init = async (comic_id, chapter_id) => {
      state.curChapterId = chapter_id;
      const params = {
        comic_id,
        isAll: true
      };
      try {
        const res = await api_index.api.getChapterList(params);
        state.chapterList = res.data.data;
        const item = state.chapterList.find((el) => el.chapter_id == chapter_id);
        common_vendor.index.setNavigationBarTitle({
          title: item.title || "阅读"
        });
        const { data } = await api_index.api.getCartoonDetail(comic_id);
        state.detailData = data;
        const { read, price, charge } = data;
        const readParams = {
          chapter_id,
          comic_id,
          is_vip: charge,
          price,
          uid: userStore.userInfo.id,
          read
        };
        const res1 = await api_index.api.getChapterPage(chapter_id);
        state.pageContentList = res1.data;
        const addRead = await api_index.api.addChapterRead(readParams);
        state.loading = false;
        console.log(addRead, "addRead");
      } catch (e) {
        console.log(e);
      }
    };
    const onComicPage = (comic_id, chapter_id) => {
      init(comic_id, chapter_id);
      state.showCatalog = false;
      let el = chapterItemRef.value[state.curChapterRefIndex];
      el.$el.classList.value = "chapter-item";
    };
    const scroll = (e) => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(state.pageContentList, (item, index, i0) => {
          return {
            a: index,
            b: item.image
          };
        }),
        b: common_vendor.o(showTool),
        c: common_vendor.p({
          name: "arrow-left",
          label: "上一话",
          ["label-pos"]: "right"
        }),
        d: common_vendor.p({
          name: "arrow-right",
          label: "下一话",
          ["label-pos"]: "left"
        }),
        e: !state.loading,
        f: common_vendor.t(state.detailData.name),
        g: common_vendor.p({
          name: "list",
          label: state.sort,
          ["margin-right"]: "20",
          ["label-size"]: "26"
        }),
        h: common_vendor.f(state.chapterList, (item, k0, i0) => {
          return {
            a: "d62b69dd-4-" + i0 + ",d62b69dd-2",
            b: common_vendor.t(item.title),
            c: common_vendor.o(($event) => onComicPage(item.comic_id, item.chapter_id), item.title_alias),
            d: item.title_alias
          };
        }),
        i: common_vendor.p({
          name: "map-fill"
        }),
        j: setChapterItemRef,
        k: common_vendor.o(scroll),
        l: state.scrollTop,
        m: common_vendor.o(($event) => state.showCatalog = $event),
        n: common_vendor.p({
          mode: "right",
          width: "72%",
          modelValue: state.showCatalog
        }),
        o: common_vendor.f(state.toolColumn, (item, index, i0) => {
          return {
            a: "d62b69dd-5-" + i0,
            b: common_vendor.p({
              name: item.name,
              label: item.label,
              ["label-size"]: item.labelSize,
              ["label-pos"]: item.labelPos
            }),
            c: common_vendor.o(($event) => onTool(item.id), index),
            d: index
          };
        }),
        p: toolStatus.value ? 1 : "",
        q: !toolStatus.value ? 1 : ""
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d62b69dd"], ["__file", "F:/HBuilderProjects/manhua/pages/comic-page/comic-page.vue"]]);
wx.createPage(MiniProgramPage);
