export interface ICategory {
	id: number;
	name: string;
}

export interface ITodoCreate {
	title: string;
	description: string;
	categoryId?: number;
}

export interface ITodo extends ITodoCreate {
	id: number;
	done: boolean;
	category?: ICategory;
}