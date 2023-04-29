// 登录白名单 ,由于后端接口除了登录页，其它都需要登录，已登录不能跳到登录页

import showMsg from "./showMsg";

const whiteList = ['/pages/user/user-login','/pages/404/404']


let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab","navigateBack",];
list.forEach(item => { 
	uni.addInterceptor(item,{
		// invoke根据返回值判断是否继续执行调整
		invoke: (config) => {
			return hasPermission(config.url)
		}
	})
})
// 是否有权限
const hasPermission = (url:string) =>{
	console.log(url,'url');
	const userInfo = uni.getStorageSync('USER')

	const pathArr = getCurrentPages()
	console.log(pathArr,'pathArr');
	// 有token
	if(userInfo){
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
