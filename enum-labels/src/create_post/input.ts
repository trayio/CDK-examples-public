export type CreatePostInput = {
	title: PostType;
	body: string;
	userId: number;
};

/**
 * @enumLabels Reminder, To do, Journal, Task
 */
export enum PostType {
	reminder = 'reminder',
	todo = 'todo',
	journal = 'journal',
	task = 'task',
}
