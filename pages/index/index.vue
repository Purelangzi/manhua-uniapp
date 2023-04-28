<template>
	<view class="content">

		<view class="text-area">

		</view>
		
	</view>
</template>

<script setup lang="ts">
	import {getHomeData} from '@/api/index'
	import { nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
	import { onLoad, onShow,onReady } from '@dcloudio/uni-app'
	import {wxIsLogin} from '@/utils/wxLogin'


	

	onLoad(()=> {


	})
	onShow(()=>{
		console.log('index-onShow');
		// #ifdef MP-WEIXIN
		if(wxIsLogin()) return
		// #endif
		
		// getData()
	})
	const getData = async()=>{
		try{
			const res = await getHomeData()
		}catch(e){
			console.log(e);
		}
		 
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
