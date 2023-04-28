import { defineStore } from 'pinia';

import {Uesrstate} from './model/userModel'

export const useUser = defineStore('USER', {
	state: ():Uesrstate => ({ 
		userInfo:{},
		token:'',
		tokenTime:''
	}),
	unistorage:true,
	actions: {
		logOut(){
			console.log('logOut');
			this.$reset()
			uni.removeStorageSync('USER')
			uni.reLaunch({
				url:'/pages/user/user-login'
			})
		}
	},
	getters:{
		
	}
	
});