<template>
	<view>

	</view>
</template>

<script lang="ts" setup>
	import { onMounted, reactive, ref } from 'vue'
	import { onLoad,onShow } from '@dcloudio/uni-app'
	import {wxIsLogin} from '@/utils/wxLogin'
	
	onShow(async()=>{
		console.log('book-onShow');
		// #ifdef MP-WEIXIN
		if(wxIsLogin()) return
		// #endif
		
		
	
		
	})


</script>

<style lang="scss">

</style>
