<script>
	export default {
		onPageNotFound:function(){
			console.log('onPageNotFound');
			uni.redirectTo({
				url: "/pages/404/404", // 404 页面的路径
			  });
		},
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef MP-WEIXIN
			// 页面实际上已经打开了(比如通过分享卡片、小程序码)且发现页面不存在,才会触发,
			// api 跳转不存在的页面不会触发(如 uni.navigateTo) 
			uni.onPageNotFound(()=>{
				// 跳转到 404 页面：
				uni.redirectTo({
					url: "/pages/404/404", 
				})
			})
			// #endif
			// #ifdef H5
			// h5路由history模式下 浏览器 地址栏 输入地址切换路由 拦截
			const whiteList = ['/pages/user/user-login']
			const user= uni.getStorageSync("USER")
			if(!user && !whiteList.includes(window.location.pathname)){
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
	/*每个页面公共css */
	@import "./uni_modules/vk-uview-ui/index.scss";
	// 引入阿里矢量素材图标库-symbol，多色
	@import "./static/iconfont/iconfont-weapp-icon.css";
</style>