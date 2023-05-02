export interface UesrState{
	userInfo:{
		[key:string]:string|number|null
	},
	token:string,
}
export interface SearchState{

	searchHistory:string[]	
}