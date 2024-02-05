export interface UpsertInput {
	vectors: {
		/**
		 * The unique ID of a vector
		 */
		id?: string;
		/**
		 * Vector dense data. This should be the same length as the dimension of the index being queried.
		 */
		values?: number[];
		/**
		 * Vector sparse data. Represented as a list of indices and a list of corresponded values, which must be the same length.
		 */
		sparseValues?: {
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
		metadata?: {
			[k: string]: unknown;
		};
		[k: string]: unknown;
	}[];
	/**
	 * An index namespace name
	 */
	namespace?: string;
	[k: string]: unknown;
}
