import { defineStore } from 'pinia';

import {Uesrstate} from './model/userModel'

export const useUser = defineStore('USER', {
	state: ():Uesrstate => ({ 
		userInfo:{},
		token:''
	}),
	unistorage:true,
	actions: {
		logOut(){
			setTimeout(()=>{
				this.$reset()
				uni.removeStorageSync('USER')
				uni.reLaunch({
					url:'/pages/user/user'
				})
			},1500)
		}
	},
	getters:{
		
	}
	
});