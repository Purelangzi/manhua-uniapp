<template>
	<view class="user-center">
	<u-cell-group>
		<u-cell-item title="头像" :arrow="false" @click="handleUploadAvatar()">
			<u-avatar :src="userInfo?.avatar" slot="right-icon" mode="square">
			</u-avatar>
		</u-cell-item>
		<u-cell-item title="昵称" :value="userInfo.username"></u-cell-item>
		<u-cell-item title="手机号" :value="userInfo.phone"></u-cell-item>
		<u-cell-item title="邮箱" :value="userInfo.email?userInfo.email:'未设置'"></u-cell-item>
		
	</u-cell-group>
	</view>

	

</template>

<script lang="ts" setup>

	import { computed, onMounted, reactive, ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { useUser } from '@/stores/user'
	import {storeToRefs} from 'pinia'
	const userStore = useUser()
	const {userInfo} = storeToRefs(userStore)
	onLoad(()=>{
		
	})
	onMounted(()=>{
		
	})
	const handleUploadAvatar = () =>{
		
	}
	

</script>

<style lang="scss">
.user-center{
	// background-image: $userCenter-bg-base64;
}
</style>
