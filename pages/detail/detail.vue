<template>
	<view class="detail">
		<view class="detail-header">
			<view class="header-cover">
				<u-image height="440rpx" src="https://oss.mkzcdn.com/comic/cover/20190919/5d833a6c51ab7-1000x562.jpg!banner-600"></u-image>
			</view>
			<view class="header-info">
				<view class="info-title">我被嘻嘻嘻</view>
			</view>
			<u-image class="cover-bg" height="440rpx" src="https://static.mkzcdn.com/mobile/img/detail/bg_detail_bannerbg.png"></u-image>
			<u-image class="cover-bg2" height="40rpx" src="https://static.mkzcdn.com/mobile/img/detail/bg_banner.png"></u-image>
		</view>
		<view class="detail-btn">
			<view class="btn-collect">阅读量</view>
			<view class="btn-read">
				<u-button :custom-style="readBtnStyle" shape="circle">开始阅读</u-button>
			</view>
		</view>
		<scroll-view :scroll-y="true" @scroll="scroll" :scroll-top="state.scrollTop">
				<u-tabs :list="state.list" active-color="#28292d"  bar-width="120"
					:is-scroll="false" 
					v-model="state.current" 
					@change="changeTabs" :bar-style="{backgroundColor:'#ff7830'}">
					
				</u-tabs>
			
		</scroll-view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, reactive, ref } from 'vue'
	import { onLoad,onShow } from '@dcloudio/uni-app'
	// ;
	const readBtnStyle = {backgroundColor:'#ff7830',color:'#fff',padding:'25rpx 130rpx',fontSize:'36rpx'}
	// const barStyle ={}
	const state = reactive({
		scrollTop:0,
		list:[{name:'详情'},{name:'目录'}],
		current:1 // 默认展示目录
	})
	onLoad((option)=>{
		console.log(option);
		console.log('onLoad');
	})
	onShow(()=>{
		console.log('onShow');
	})
	onMounted(()=>{

	})
	const changeTabs = (index:number) =>{
		state.current = index
	}
	const scroll = (e:any) =>{
		// #ifndef MP-WEIXIN
		state.scrollTop = e.detail.scrollTop
		
		// #endif
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
			font-size: $uni-font-size-title;
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
</style>
