export type CreatePostInput = {
	/**
	 * @title Post Type
	 * @description The type of post to create
	 * @default task
	 */
	title: PostType;
	/**
	 * @title Body
	 * @description The body of the post
	 * @default Post content goes here
	 */
	body?: string;
	/**
	 * @title User ID
	 * @description The ID of the user to create the post for
	 */
	userId: number;
	/**
	 * @title Owner
	 * @description The owner of the post (optional, either a non profit or business)
	 */
	owner: NonProfit | Business;

	/**
	 * @title Advanced Options
	 * @description Additional options for creating the post
	 * @advanced true
	 */
	advancedOptions?: string;

	/**
	 * @title Tags
	 * @description The tags to add to the post
	 * @items.title Tag
	 * @items.description A tag to add to the post
	 */
	tags?: string[];
};

/**
 * @title Non Profit
 */
export type NonProfit = {
	/**
	 * @title Non Profit Name
	 * @description The non profit to create the post for
	 */
	name: string;
};

/**
 * @title Business
 */
export type Business = {
	/**
	 * @title Business Name
	 * @description The business to create the post for
	 */
	name: string;
	/**
	 * @title Business Address
	 */
	address: string;
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
