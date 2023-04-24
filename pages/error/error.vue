<template>
	<view class="error-container">
		<view class="error-bg">
			
		</view>
		<view class="error-btn">
			<u-button type="error" :custom-style="customStyleError" shape="circle" @click="handleBack">返回</u-button>
		</view>
		
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, reactive, ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	const customStyleError = { backgroundColor: '#ff7830', color: '#fff' }
	
	
	onLoad(()=>{
		
	})
	onMounted(()=>{

	})
	const handleBack = ()=>{
		uni.navigateBack()
	}

</script>

<style lang="scss">
.error-container{
	.error-bg{
		margin: 50rpx;
		height: 421rpx;
		background: url(https://static.mkzcdn.com/mobile/img/pic_pageload_error.png) no-repeat center center / contain;
	
	}
	.error-btn{
		margin: 10rpx 10%;
	}
}
</style>
