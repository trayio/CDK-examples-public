export interface FetchOutput {
	vectors?: {
		/**
		 * Vector dense data. This should be the same length as the dimension of the index being queried.
		 */
		[k: string]: number[];
	};
	/**
	 * An index namespace name
	 */
	namespace?: string;
	[k: string]: unknown;
}
