// 登录白名单 '/pages/index/index'默认是'/'
const whiteList = ['/','/pages/category/category','/pages/book/book', '/pages/user/user']


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
	}
	// 不在白名单中且没有token
	uni.showToast({
		title:'登录才能查看哦',
		duration:2000,
		icon:'none'
	})
	// H5刷新页面后为空数组 或 当前不是用户页的情况就到用户页
	if(!pathArr.length || pathArr[0].route !== '/pages/user/user'){
		uni.reLaunch({
			url:'/pages/user/user'
		})
	}
	
	return false
}

uni.addInterceptor('navigateTo',{
	// invoke根据返回值判断是否继续执行调整
	invoke: (config) => {
		return hasPermission(config.url)
	}
})
// h5能拦截，小程序拦截不到tabbar，此项目中底部导航栏都是白名单，所以不用考虑
uni.addInterceptor("switchTab", {
	
  invoke(config) {
	return hasPermission(config.url)
  }
})

