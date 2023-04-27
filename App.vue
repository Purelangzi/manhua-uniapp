<script>
	export default {

		onLaunch: function() {
			console.log('App Launch')
			// #ifdef MP-WEIXIN
			// 页面实际上已经打开了(比如通过分享卡片、小程序码)且发现页面不存在,才会触发,
			// api 跳转不存在的页面不会触发(如 uni.navigateTo) 
			uni.onPageNotFound(()=>{
				// 跳转到 404 页面：
				uni.redirectTo({
					url: "pages/error/error", // 404 页面的路径
				})
			})
			// #endif
			
			// #ifndef MP-WEIXIN


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