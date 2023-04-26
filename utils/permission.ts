// 登录白名单 '/pages/index/index'默认是'/',由于后端接口除了用户页，其它都需要登录
// const whiteList = ['/','/pages/category/category','/pages/book/book', '/pages/user/user']
const whiteList = ['/pages/user/user-login']

// 是否有权限
const hasPermission = (url:string) =>{
	console.log(url);
	const userInfo = uni.getStorageSync('USER')
	let token = ''
	if(userInfo){
		token = JSON.parse(userInfo).token
	}
	const pathArr = getCurrentPages()
	
	// 在白名单中或有token
	if(whiteList.includes(url) || token){
		console.log('在白名单中或有token');
		return true
	}else{
		// 不在白名单中且没有token
		console.log(pathArr,'pathArr');
		// H5刷新页面后为空数组 就到用户页; 防止登录后用户手动清除token，不会自动跳到用户登录页
		if(!pathArr.length  || pathArr.length>=1){
			console.log('防止登录后用户手动清除token，不会自动跳到用户登录页');
			
			uni.switchTab({
				url:'/pages/user/user-login',
				/* success: () => {
					if(pathArr.length){
						const pages = getCurrentPages()
						const perpage = pages[pages.length - 1]
						
					}
					
				} */
			})
		}else{
			
			console.log(pathArr,'ddddd');
			uni.showToast({
				title:'登录才能查看哦',
				duration:2000,
				icon:'none'
			})
		}
		return false
	}
	
}

uni.addInterceptor('navigateTo',{
	// invoke根据返回值判断是否继续执行调整
	invoke: (config) => {
		console.log('navigateTo');
		return hasPermission(config.url)
	}
})
// h5能拦截，小程序拦截不到tabbar，得在每个tabbar页面的show判断
uni.addInterceptor("switchTab", {
  invoke(config) {
	  console.log('switchTab');
	return hasPermission(config.url)
  }
})
uni.addInterceptor("redirectTo", {
  invoke(config) {
	  console.log('redirectTo');
	// return hasPermission(config.url)
  }
})
uni.addInterceptor("navigateBack", {
  invoke(config) {
	  console.log(config,'navigateBack');
	// return hasPermission(config.url)
  }
})

uni.addInterceptor("redirectTo", {
  invoke(config) {
	  console.log(config,'redirectTo');
	// return hasPermission(config.url)
  }
})
uni.addInterceptor("reLaunch", {
  invoke(config) {
	  console.log(config,'reLaunch');
	return hasPermission(config.url)
  }
})