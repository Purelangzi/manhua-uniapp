export interface CartoonList {
	page ?: string | number,
	pageSize ?: string | number,
	isAll ?: string,
	category_id ?: string | number
}
export interface ChapterList {
	page ?: string | number,
	pageSize ?: string | number,
	comic_id ?: string | number,
	isAll ?: boolean,
	chapter_id ?: string | number,
}
export interface  AddChapterRead{
	chapter_id ?: string | number,
	comic_id ?: string | number,
	is_vip ?: string | number,
	price ?: boolean,
	uid ?: string | number,
	read ?: string | number,
}