// 登录白名单 '/pages/index/index'默认是'/',由于后端接口除了登录页，其它都需要登录，已登录不能跳到登录页

import showMsg from "./showMsg";

// const whiteList = ['/','/pages/category/category','/pages/book/book', '/pages/user/user']
const whiteList = ['/pages/user/user-login']

// 是否有权限
const hasPermission = (url:string) =>{
	console.log(url,'url');
	const userInfo = uni.getStorageSync('USER')
	let token = ''
	if(userInfo){
		token = JSON.parse(userInfo).token
	}
	const pathArr = getCurrentPages()
	
	// 有token
	if(token){
		console.log('有token');
		// 已登录页不能跳到登录页
		if(url!=='pages/user/user-login'){
			return true
		}else{
			return false
		}
		
	}else{
		// 在白名单中
		if(whiteList.includes(url)){
			return true
		}
		// 不在白名单中且没有token
		showMsg({title:'请登录'})
		uni.redirectTo({
			url:'/pages/user/user-login',
		})
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
	return hasPermission(config.url)
  }
})
uni.addInterceptor("navigateBack", {
  invoke(config) {
	  console.log(config,'navigateBack');
	  return hasPermission(config.url)
  }
})

uni.addInterceptor("reLaunch", {
  invoke(config) {
	  console.log(config,'reLaunch');
	return hasPermission(config.url)
  }
})