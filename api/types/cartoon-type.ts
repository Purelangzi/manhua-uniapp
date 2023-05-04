export interface CartoonList {
	page ?: string | number,
	pageSize ?: string | number,
	isAll ?: string,
	category_id ?: string
}
export interface ChapterList {
	page ?: string | number,
	pageSize ?: string | number,
	comic_id ?: string | number,
	isAll ?: boolean,
	chapter_id ?: string | number,
}