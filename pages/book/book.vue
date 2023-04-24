<template>
	<view>

	</view>
</template>

<script lang="ts" setup>
	import { onMounted, reactive, ref } from 'vue'
	import { onLoad,onShow } from '@dcloudio/uni-app'
	
	onLoad(()=>{
	})
	onShow(()=>{
		if(!uni.getStorageSync('USER')){
			uni.switchTab({
				url:'/pages/user/user'
			})
		}
	})
	onMounted(()=>{

	})
	

</script>

<style lang="scss">

</style>
