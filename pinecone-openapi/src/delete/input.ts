export interface DeleteInput {
	ids?: string[];
	deleteAll?: boolean;
	/**
	 * An index namespace name
	 */
	namespace?: string;
	/**
	 * If this parameter is present, the operation only affects vectors that satisfy the filter. See https://www.pinecone.io/docs/metadata-filtering/.
	 */
	filter?: {
		[k: string]: unknown;
	};
	[k: string]: unknown;
}
