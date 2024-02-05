export interface DescribeIndexStatsOutput {
	namespaces?: {
		[k: string]: {
			vectorCount?: number;
			[k: string]: unknown;
		};
	};
	/**
	 * The number of dimensions in the vector representation
	 */
	dimension?: number;
	/**
	 * The fullness of the index, regardless of whether a metadata filter expression was passed. The granularity of this metric is 10%.
	 */
	indexFullness?: number;
	totalVectorCount?: number;
	[k: string]: unknown;
}
