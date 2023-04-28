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
			// #ifdef H5
			// h5模式下 浏览器 地址栏 输入地址切换路由 拦截
			const whiteList = ['/pages/user/user-login']
			const user= uni.getStorageSync("USER")
			console.log(window.location.pathname,'window.location.pathname');
			if(!user && !whiteList.includes(window.location.pathname)){
				console.log('3333');
			    uni.reLaunch({
			        url:'/pages/user/user-login'
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