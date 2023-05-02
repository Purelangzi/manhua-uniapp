import { defineStore } from 'pinia';

import {UesrState,SearchState} from './model/userModel'

export const useUser = defineStore('USER', {
	state: ():UesrState => ({ 
		userInfo:{},
		token:'',
	}),
	unistorage:true,
	actions: {
		logOut(){
			this.$reset()
			uni.removeStorageSync('USER')
			uni.reLaunch({
				url:'/pages/user/user-login'
			})
		},
		
	},
	getters:{
		
	}
});
export const useSearch = defineStore('HISTORY',{
	state:():SearchState =>({
		searchHistory:[]
	}),
	unistorage:true,
	actions:{
		clearHistory(){
			this.$reset()
			uni.removeStorageSync('HISTORY')
		}
	}
})