export interface QueryInput {
	/**
	 * An index namespace name
	 */
	namespace?: string;
	/**
	 * The number of results to return for each query.
	 */
	topK: number;
	/**
	 * If this parameter is present, the operation only affects vectors that satisfy the filter. See https://www.pinecone.io/docs/metadata-filtering/.
	 */
	filter?: {
		[k: string]: unknown;
	};
	includeValues?: boolean;
	includeMetadata?: boolean;
	/**
	 * Vector dense data. This should be the same length as the dimension of the index being queried.
	 */
	vector?: number[];
	/**
	 * Vector sparse data. Represented as a list of indices and a list of corresponded values, which must be the same length.
	 */
	sparseVector?: {
		/**
		 * The indices of the sparse data.
		 */
		indices: number[];
		/**
		 * The corresponding values of the sparse data, which must be the same length as the indices.
		 */
		values: number[];
		[k: string]: unknown;
	};
	/**
	 * The unique ID of a vector
	 */
	id?: string;
	[k: string]: unknown;
}
