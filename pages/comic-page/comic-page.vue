<template>
	<view class="comic-page">
		<view class="comic-list" @click="showTool">
			<u-image mode="widthFix" v-for="(item,index) in state.pageContentList" :key="index" :src="item.image"></u-image>
		</view>
		
		<u-popup v-model="state.showCatalog" mode="right" width="72%">
			<view class="popup-content">
				<view class="comic-title">{{state.detailData.name}}</view>
				<view class="comic-status">
					<view class="status">
						连载中
					</view>
					<view class="sort">
						<u-icon name="list" :label="state.sort" margin-right="20" label-size="26"></u-icon>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 100vh;" @scroll="scroll" :show-scrollbar="true" :scroll-top="state.scrollTop">
					<view class="chapter-list">
						<view class="chapter-item" v-for="item in state.chapterList" :key="item.title_alias">
							<view class="current-icon">
								<u-icon name="map-fill" color="#ff7830" label=""></u-icon>
							</view>
							<view class="current-title">{{item.title}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>

		
		<view class="comic-tool" :class="{ 'comic-tool-show':toolStatus,'comic-tool-hide':!toolStatus}" >
			<view class="tool-content">
				<view class="prev-chapter">
					<u-icon name="arrow-left" label="上一话" label-size="24" label-pos="bottom"></u-icon>
				</view>
				<view class="catalog">
					<u-icon name="file-text-fill" label="目录" @click="openCatalog" label-size="24" size="32" label-pos="bottom"></u-icon>
				
				</view>
				<view class="next-chapter">
					<u-icon name="arrow-right" label="下一话" label-size="24" label-pos="bottom"></u-icon>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, reactive, ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import api from '@/api/index'
	const toolStatus = ref(false)
	const state = reactive({
		pageContentList:[], // 章节内容
		toolStatus:false,
		showCatalog:false,
		sort:'正序',
		chapterList:[], // 章节列表
		detailData:{} as any, // 漫画详情
		scrollTop:0
	})
	onLoad((option)=>{
		const {comic_id,chapter_id} = option
		init(comic_id,chapter_id)
	})
	onMounted(()=>{

	})

	const showTool = () =>{
		toolStatus.value = !toolStatus.value
	}
	const openCatalog = () =>{
		state.showCatalog = true
	}
	const init = async(comic_id:number,chapter_id:string) =>{
		const params = {
			comic_id,
			isAll:true
		}
		try{
			const {data} = await api.getChapterList(params)
			state.chapterList = data.data
			const item = data.data.find((el:any) => el.chapter_id == chapter_id);
			uni.setNavigationBarTitle({
				title: item.title,
			})
			const res = await api.getCartoonDetail(comic_id)
			state.detailData = res.data
			const res1 = await api.getChapterPage(chapter_id)
			state.pageContentList = res1.data
		}catch(e){
		}
	}
const scroll = (e:any) =>{
	console.log(e.detail.scrollTop);
		// #ifndef MP-WEIXIN
		state.scrollTop = e.detail.scrollTop

		// #endif

	}
</script>

<style lang="scss" scoped>
	.comic-page{
		height: 100vh;
		.comic-list{
			:deep(.u-image){
				margin-bottom: -8rpx;
			}
		}
		.comic-tool-show{
			opacity: 1;
			bottom: 0;		
			transition: all 1s;
		}
		.comic-tool-hide{
			opacity: 0;
			transition: all 1s;
			bottom: -98rpx;
		}
		.comic-tool{
			position: fixed;
			background-color: #fff;
			width: 100%;
			padding: 10rpx 0 20rpx;
			.tool-content{
				display: flex;
				justify-content: space-evenly;
				align-items: center;
			}
		}
		.popup-content{
			.comic-title{
				font-size: 32rpx;
				text-align: center;
				margin: 20rpx;
			}
			.comic-status{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
				font-weight: bold;
				height: 80rpx;
			}
			.chapter-list{
				margin-top: 20rpx;
				.chapter-item{
					display: flex;
					padding: 0 20rpx 0 20rpx;
					margin-bottom: 40rpx;
					.current-icon{
						padding-right: 10rpx;
					}
				}
				.chapter-item-current{
					color: $uni-main-color;
				}
			}
		}
	}

</style>
