<template>
	<view>

	</view>
</template>

<script lang="ts" setup>
	import { onMounted, reactive, ref,onActivated } from 'vue'
	import { onLoad,onShow } from '@dcloudio/uni-app'
	import addressBarAccess from '@/utils/addressBarAccess'
	
	onShow(async()=>{
		console.log('book-onShow');
		let flag = addressBarAccess.load()
		// 没有token就return
		if(flag) return
		/* try{
			const res = await getHomeData()
			console.log(res);
		}catch(e){
			console.log(e);
		} */
	
		
	})
	onActivated(()=>{
		console.log('book-onActivated');
		addressBarAccess.activated()
	})

</script>

<style lang="scss">

</style>
