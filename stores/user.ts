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
			this.$reset()
			uni.removeStorageSync('USER')
		}
	},
	getters:{
		
	}
	
});