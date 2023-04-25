export default () =>{
	if(!uni.getStorageSync('USER')){
		console.log('access');
		uni.switchTab({
			url:'/pages/user/user'
		})
		return true
	}
	return false
}
