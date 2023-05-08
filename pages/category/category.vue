<template>
	<view class="category-page">
		<view class="category-header">
			<view class="category-item" @click="onCategory(item.id)" v-for="item in state.list" :key="item.id">
				<view class="item-name" :class="state.active==item.id?'item-name-active':''">{{item.name}}</view>
			</view>
		</view>
		<view class="cateogry-main">
			<view class="box-detail">
				<view class="detail-item" @click="goCartoonDetail(item.id)" v-for="item in state.cartoonList" :key="item.id">
					<u-image :src="item.cover_lateral" height="275rpx" />
					<view v-show="item.charge ==1" class="t-icon detail-vip t-icon-vip"></view>
					<view class="detail-name">{{item.name}}</view>
					<view class="detail-introduction">{{item.cartoon_introduction}}</view>
				</view>
			</view>
			<u-loadmore :status="status" font-size="22"
				color="#b4b4b4" margin-top="20" margin-bottom="20" :load-text="state.loadText" @loadmore="onLoadMore" />
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { reactive, ref } from 'vue'
	import { onShow,onReachBottom } from '@dcloudio/uni-app'
	import { wxIsLogin } from '@/utils/wxLogin'
	import api from '@/api/index'
	const status = ref('loadmore')
	const state = reactive({
		list: [],
		active: 0,
		queryPrams:{
			page:1,
			pageSize:15,
			category_id:undefined
		},
		cartoonList:[],
		loadText: {
			loadmore: '点击加载更多',
			loading: '加载中',
			nomore: '没有更多了'
		},
		current:0 ,// 默认展示详情
		
	})
	onShow(async () => {
		console.log('category-onShow');
		// #ifdef MP-WEIXIN
		if (wxIsLogin()) return
		// #endif
		if(!state.list.length){
			getCtcategory()
			getCartoonList()
		}
	})
	onReachBottom(()=>{
		state.queryPrams.page += 1
		getCartoonList()
	})
	const onCategory = (category_id : number) => {
		console.log(category_id);
		state.cartoonList = []
		state.active = category_id
		state.queryPrams.category_id = category_id==0?'':category_id
		getCartoonList()
	}
	const getCtcategory = async()=> {
		try{
			const {data} = await api.getCtcategory({isAll:true})
			data.data.unshift({id:0,name:'全部'})
			state.list = data.data
		}catch(e){
			console.log(e);
		}
	}
	const getCartoonList = async()=> {
		status.value = 'loading';
		try{
			const {data} = await api.getCartoonList(state.queryPrams)
			if(!data.data.length){
				status.value = 'nomore'
				return
			}
			state.cartoonList = state.cartoonList.length?[...state.cartoonList,...data.data]:data.data
		}catch(e){
			console.log(e);
		}
	}
	const goCartoonDetail = (id : number) => {
		uni.navigateTo({
			url: `/pages/detail/detail?id=${id}`,
		})
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 0
		})
	}
	const onLoadMore = () =>{
		status.value = 'loading'
		setTimeout(()=>{
			status.value = 'nomore'
		},500)
	}
</script>

<style lang="scss">
.category-header{
	display: flex;
	flex-wrap: wrap;
	.category-item{
		margin-bottom: 26rpx;
		padding: 0 20rpx;
		font-size: 24rpx;
		.item-name{
			padding-bottom: 10rpx;
		}
		.item-name-active{
			border-bottom: 4rpx solid $uni-main-color;
			font-weight: bold;
		}
	}
}
.cateogry-main{
	margin-top: 20rpx;
	.box-detail{
		margin: 0 20rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.detail-item{
			position: relative;
			margin-bottom: 30rpx;
			width: calc(90% / 3);
			.detail-vip{
				position: absolute;
				top: 0;
				right: 0;
				padding: 0 18rpx;
				border-bottom-left-radius: 50%;
				background-color: #f6caa8;
				
			}
			.detail-name{
				margin-top: 10rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				
			}
			.detail-introduction{
				margin-top: 6rpx;
				font-size: 24rpx;
				color: $uni-text-color-grey;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
</style>