<template>
	
	<view class="serach-nav" :class="{'nav-scroll':navScrollFlag}">
		<view class="search-input" :class="{'input-scroll':navScrollFlag}" @click="goSearchPage">
			<u-icon name="search" label="斗破苍穹" :color="navScrollFlag?'':'#ff7830'"></u-icon>
		</view>
		<view class="search-right">
			<view class="t-icon" :class="{'t-icon-rili-scroll':navScrollFlag,' t-icon-rili':!navScrollFlag}"></view>
			<text>更新</text>
			<view  class="t-icon" :class="{'t-icon-paixingbang-scroll':navScrollFlag,'t-icon-paixingbang':!navScrollFlag}"></view>
			<text>排行榜</text>
		</view>
	</view>
	<scroll-view scroll-y="true" @scroll="scroll" :scroll-top="state.scrollTop" style="height: 100%;">
		<view class="swiper-content">
			<u-swiper name="img" :list="state.bannerList" @click="clickBanner" mode="dot" height="450"></u-swiper>
		</view>
		<view class="main">
			<view class="main-nav">
				<view class="nav-item">
					<u-image src="https://static.mkzcdn.com/mobile/img/pic_index_gx.png" width="100%" height="100%"></u-image>
				</view>
				<view class="nav-item">
					<u-image src="https://static.mkzcdn.com/mobile/img/pic_index_ph.png" width="100%" height="100%"></u-image>
				</view>
				<view class="nav-item">
					<u-image src="https://static.mkzcdn.com/mobile/img/pic_index_xs.png" width="100%" height="100%"></u-image>
				</view>
			</view>
			<view class="main-box" v-for="(detail,index) in state.detailList" :key="index">
				<view class="box-title">
					
					<view class="title-left">
						<span class="title-icon"></span>
						<view class="title-content">
							{{detail.title}}
						</view>
					</view>
					<view class="title-right">更多&nbsp;></view>
				</view>
				<view class="box-detail">
					<view class="detail-item" v-for="item in detail.data" :key="item.id">
						<u-image :src="item.cover_lateral" height="275rpx" />
						<view class="detail-name">{{item.name}}</view>
						<view class="detail-introduction">{{item.cartoon_introduction}}</view>
					</view>
				</view>
			</view>
			<view class="footer">
				<view class="footer-title">我是有底线的</view>
				<view class="footer-image">
					<u-image mode="aspectFit" src="https://static.mkzcdn.com/mobile/img/pic_home_footimg.png" width="70rpx" height="70rpx"></u-image>
				</view>
			</view>
		</view>
		
	</scroll-view>
	
</template>

<script setup lang="ts">
	import api from '@/api/index'
	import { nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
	import { onLoad, onShow,onReady } from '@dcloudio/uni-app'
	import {wxIsLogin} from '@/utils/wxLogin'

	const navScrollFlag = ref(false)
	const state = reactive({
		scrollTop:0,
		bannerList:[],
		detailList:[]
	})

	onLoad(()=> {


	})
	onShow(()=>{
		console.log('index-onShow');
		// #ifdef MP-WEIXIN
		if(wxIsLogin()) return
		// #endif
		
		
	})
	onMounted(()=>{
		getData()
	})
	const getData = async()=>{
		try{
			const {data} = await api.getHomeData()
			state.bannerList = data.banners
			state.detailList = data.details
		}catch(e){
			console.log(e);
		}
		 
	}
	const clickBanner = (index:number) =>{
		const id = state.bannerList[index].id
		uni.navigateTo({
			url: `/pages/detail/detail?id=${id}`,
		})
	}
	const goSearchPage = () =>{
		uni.navigateTo({
			url:'/pages/search/search'
		})
	}
	const scroll = (e:any) =>{
		state.scrollTop = e.detail.scrollTop
		if(state.scrollTop >= 120){
			navScrollFlag.value = true
		}else{
			navScrollFlag.value = false
		}
	}
	
</script>


<style lang="scss" scoped>
.serach-nav{
	display: flex;
	align-items: center;
	position: fixed;
	z-index: 1;
	padding: 0 40rpx;
	width: 100%;
	height: 110rpx;
	color: #fff;
	.search-input{
		display: flex;
		padding: 0 30rpx;
		width: 60%;
		height: 60rpx;
		line-height: 60rpx;
		background-color: rgba(255, 255, 255, 0.6);
		border-radius: 35rpx;
		font-size: $uni-font-size-sm;
	}
	.search-right{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 40%;
		padding-left: 4%;
	}
}
.nav-scroll{
	background-color: #fff;
	color: #000;
	.input-scroll{
		background-color: #f8f8f8;
		border: 1px solid #e0e0e0;
	}
}

::v-deep .swiper-content {
	.u-swiper-wrap{
		border-bottom-right-radius:18% !important;
	}
}
.main{
	padding: 0 30rpx;
	.main-nav{
		display: flex;
		justify-content: space-around;
		padding: 15rpx 0;
		// border-top-left-radius: 30rpx;
		// border-top-right-radius: 0rpx;
		.nav-item{
			width: 200rpx;
			height: 90rpx;
		}
	}
	.main-box{
		.box-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 90rpx;
			.title-left{
				display: flex;
				align-items: center;
				.title-icon{
					display: inline-block;
					width: 35rpx;
					height: 35rpx;
					background:url('https://static.mkzcdn.com/mobile/img/ic_home_dj.png') no-repeat center center;
				}
				.title-content{
					padding-left: 12rpx;
					font-weight: 700;
				}
			}
			.title-right{
				font-size: $uni-font-size-sm;
				color: #b4b4b4;
			}
		}
		.box-detail{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.detail-item{
				margin-bottom: 30rpx;
				width: calc(90% / 3);
				.detail-name{
					margin-top: 10rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					
				}
				.detail-introduction{
					margin-top: 10rpx;
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
	.footer{
		padding-top: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid;
		border-image: linear-gradient(90deg, rgba(0, 216, 247, 0) 0%, $uni-main-color 100%) 2 2 2 2; 
		.footer-title{
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
		}
	}
}

</style>