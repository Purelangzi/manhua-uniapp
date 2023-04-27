/**
 * 解决 h5非登录情况下，地址栏输入非白名单页面，
 * 第二次输入onShow和onActivated同时存在，第三次以及后续输入只存在onActivated,从而成功进入非白名单页面
 */
let showNum = 0
let actNum = 0
const load = () => {
	if (!uni.getStorageSync('USER')) {
		if(showNum ===0){
			showNum++
		}
		console.log('地址栏ac');
		uni.redirectTo({
			url: '/pages/user/user-login'
		})
		return true
	}
	return false
}

const activated = () => {
	actNum++
	if (showNum === 1 && actNum >= 2) {
		load()
	}
}
export default{
	load,
	activated
}