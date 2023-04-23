<script>
	export default {
		
		onLaunch: function() {
			console.log('App Launch')
			// #ifndef MP-WEIXIN
			// 刷新页面，判断是否登录，没登录返回登录
			if(!uni.getStorageSync('USER')){
				uni.switchTab({
					url:'pages/user/user'
				})
			}
			// #endif
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
	}
</script>

<style lang="scss">
	@import "./uni_modules/vk-uview-ui/index.scss";
	/*每个页面公共css */
</style>
