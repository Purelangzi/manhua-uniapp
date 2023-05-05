<template>
	<view class="detail">
		<view class="detail-header">
			<view class="header-cover">
				<u-image height="440rpx" :src="detailData.cover_lateral"></u-image>
			</view>
			<view class="header-info">
				<view class="info-title">{{detailData.name}}</view>
			</view>
			<u-image class="cover-bg" width="100vw" height="440rpx" src="https://static.mkzcdn.com/mobile/img/detail/bg_detail_bannerbg.png"></u-image>
			<u-image class="cover-bg2" width="100vw" height="40rpx" src="https://static.mkzcdn.com/mobile/img/detail/bg_banner.png"></u-image>
		</view>
		<view class="detail-btn">
			<view class="btn-collect">阅读量（{{detailData.read}}）</view>
			<view class="btn-read">
				<u-button :custom-style="readBtnStyle" @click="onComicPage" shape="circle">{{state.isRead?'继续阅读':'开始阅读'}}</u-button>
			</view>
		</view>
		<u-tabs :list="state.list" active-color="#28292d"  bar-width="120"
			:is-scroll="false" 
			v-model="state.current" 
			@change="changeTabs" :bar-style="{backgroundColor:'#ff7830'}">	
		</u-tabs>
		<!-- <scroll-view :scroll-y="true" @scroll="scroll" :scroll-top="state.scrollTop" :lower-threshold="80"  class="detail-content" @scrolltolower="lower"> -->
			<view class="scroll-content">
				
				<view v-show="state.current==0" class="detail-intro">
					<view class="comic-intro">{{detailData.cartoon_introduction}}</view>
				</view>
				<view v-show="state.current===1" class="detail-catalog">
					<view class="comic-update-info">
						<view class="info">
							<view class="status">{{detailData.status ?"连载":"完结"}}</view>
							<view class="update-date">{{formatDate(detailData.update_time)}} 更新至 第{{state.chapterList.length}}话</view>
						</view>
						<view class="sort">
							<u-icon name="list" :label="state.sort" label-size="26"></u-icon>
						</view>
					</view>
					
					<view class="catalog-list">
						<view class="chapter-item" v-for="item in state.chapterList" :key="item.title_alias">
							<view class="item-cover">
								<u-image width="240rpx" height="135rpx" :src="item.cover"></u-image>
							</view>
							<view class="item-info">
								<view class="info-title">
									<view class="title-text">第 {{item.title_alias}} 话</view>
									<view class="title-eye"></view>
								</view>
								<view class="item-date">{{formatDate(item.create_time)}}</view>
							</view>
						</view>
						<u-loadmore :status="status" :load-text="state.loadText" font-size="22"
							color="#b4b4b4" margin-top="20" @loadmore="onLoadMore" />
					</view>
				</view>
			</view>
		<!-- </scroll-view> -->
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, reactive, ref, toRefs } from 'vue'
	import { onLoad,onShow,onReachBottom } from '@dcloudio/uni-app'
	import api from '@/api/index'
	import {formatDate} from '@/utils/date'
	import { useUser } from '@/stores/user'
	
	const userStore = useUser()
	const status = ref('loadmore')
	const state = reactive({
		scrollTop:0,
		list:[{name:'详情'},{name:'目录'}],
		current:0 ,// 默认展示详情
		detailData:{} as any,
		chapterList:[],
		update_time:'',
		queryCpList:{
			page:1,
			pageSize:20,
			comic_id:null,
		},
		sort:'正序',
		loadText: {
			loadmore: '点击加载更多',
			loading: '加载中',
			nomore: '没有更多了'
		},
		chapter_id:'',
		isRead:false
	})
	const readBtnStyle = {backgroundColor:'#ff7830',color:'#fff',padding:'22rpx 130rpx',fontSize:'36rpx'}
	const {detailData}  = toRefs(state)
	onLoad((option)=>{
		init(option.id)
		getChapterList(option.id)
		
		console.log('onLoad');
	})
	onShow(()=>{
		
		console.log('onShow');
		
	})
	onReachBottom(()=>{
		if(state.current === 1){
			state.queryCpList.page += 1
			getChapterList()
		}
	})
	onMounted(()=>{
		
	})


	const init = async (id:number)=>{
		const params = {
			uid:userStore.userInfo.id,
			comic_id:id
		}
		try{
			const {data} = await api.getCartoonDetail(id)
			state.detailData = data
			uni.setNavigationBarTitle({
			    title: detailData.value.name
			});
			const res = await api.getHistoricalRecord(params)
			if(res.data.length){
				state.isRead = true
				state.chapter_id = res.data[0].chapter_id
			}
		}catch(e){
		}
		
	}
	const getChapterList = async(id?:number) =>{
		if(id){
			state.queryCpList.comic_id = id
		}
			if(status.value === 'nomore') return
		try{
			const {data} = await api.getChapterList(state.queryCpList)
			if(!data.data.length){
				status.value = 'nomore'
				return
			}
			state.chapter_id = data.data[0].chapter_id
			state.chapterList = state.chapterList.length?[...state.chapterList,...data.data]:data.data
		}catch(e){
		}
	}

	const onComicPage = () =>{
		const params =`chapter_id=${state.chapter_id}&name=${detailData.value.name}&comic_id=${detailData.value.id}`
		uni.navigateTo({
			url: `/pages/comic-page/comic-page?${params}`
		})
	}
	const changeTabs = (index:number) =>{
		state.current = index
	}

	
	const onLoadMore = () =>{
		if(state.current === 1){
			status.value = 'loading'
			setTimeout(()=>{
				status.value = 'nomore'
			},500)
		}
	}
	

</script>

<style lang="scss" scoped>
.detail-header{
	position: relative;
	
	.header-info{
		position: absolute;
		left: 40rpx;
		right: 40rpx;
		bottom: 110rpx;
		z-index: 1;
		.info-title{
			font-size: 40rpx;
			color: #fff;
			
		}
	}
	.cover-bg{
		position: absolute;
		top: 0;
	}
	.cover-bg2{
		position: absolute;
		bottom: -1rpx;
	}
}
.detail-btn {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx;
	.btn-collect{
		margin-left: 100rpx;
	}
}
:deep(.u-tabs){
	margin: 0 100rpx;
}
.scroll-content{
	margin-top: 20rpx;
	height: 100vh;
	.detail-intro{
		padding: 30rpx;
	}
	.comic-update-info{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx 0;
		.info{
			display: flex;
			align-items: baseline;
			.status{
				margin-right: 12rpx;
				font-size: 32rpx;
			}
			.update-date{
				
				font-size: 24rpx;
				color: $uni-text-color-grey;
			}
		}
		
	}
	.catalog-list{
		.chapter-item{
			display: flex;
			padding: 25rpx 30rpx;
			border-bottom: 1px solid #ebebeb;
			.item-cover{
				margin-right: 22rpx;
			}
			.item-info{
				display: flex;
				justify-content: center;
				flex-direction: column;
				.item-date{
					margin-top: 36rpx;
					font-size: 24rpx;
					color: $uni-text-color-grey;
				}
			}
			
		}
	}
}
</style>
