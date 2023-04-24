<template>
	<view class="content">

		<view class="text-area">
			<u-button type="primary" @click="ggg">获取</u-button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {getHomeData} from '@/api/index'
	import { nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
	import { onLoad, onShow,onReady } from '@dcloudio/uni-app'

	onLoad(async()=> {
		const res = await getHomeData()
		console.log(res);
	})
	onShow(()=>{
		if(!uni.getStorageSync('USER')){
			uni.switchTab({
				url:'/pages/user/user'
			})
		}
	})

	const ggg = () =>{
		uni.navigateTo({
			url:'/pages/error/error'
		})
	}
	
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}



	.text-area {
		display: flex;
		justify-content: center;
	}


</style>
