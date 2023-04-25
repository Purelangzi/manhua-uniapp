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
	import access from '@/utils/addressBarAccess'

	onLoad(async()=> {
		/* // #ifndef MP-WEIXIN
		const cur = getCurrentPages().pop().route
		console.log(cur);
		// #endif
		if(access()){
			return
		}
		console.log(1);
		try{
			const res = await getHomeData()
		}catch(e){
			console.log(e);
		} */
	})
	onShow(()=>{

		if(access()){
			return
		}
		console.log('show');
	})
	

	
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
