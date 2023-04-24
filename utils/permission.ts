// 登录白名单 '/pages/index/index'默认是'/',由于后端接口除了用户页，其它都需要登录
// const whiteList = ['/','/pages/category/category','/pages/book/book', '/pages/user/user']
const whiteList = ['/pages/user/user']

// 是否有权限
const hasPermission = (url:string) =>{

	const userInfo = uni.getStorageSync('USER')
	let token = ''
	if(userInfo){
		token = JSON.parse(userInfo).token
	}
	const pathArr = getCurrentPages()
	
	// 在白名单中或有token
	if(whiteList.includes(url) || token){
		return true
	}else{
		// 不在白名单中且没有token

		// H5刷新页面后为空数组 就到用户页
		if(!pathArr.length){

			uni.switchTab({
				url:'/pages/user/user'
			})
		}else{
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
		return hasPermission(config.url)
	}
})
// h5能拦截，小程序拦截不到tabbar，得在每个tabbar页面的show判断
uni.addInterceptor("switchTab", {

  invoke(config) {
	return hasPermission(config.url)
  }
})

