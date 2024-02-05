export interface CreateCollectionInput {
	/**
	 * The unique name of a collection.
	 */
	name: string;
	/**
	 * The unique name of an index.
	 */
	source: string;
	[k: string]: unknown;
}
