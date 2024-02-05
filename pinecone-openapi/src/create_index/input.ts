export interface CreateIndexInput {
	/**
	 * The unique name of an index.
	 */
	name: string;
	/**
	 * The number of dimensions in the vector representation
	 */
	dimension: number;
	/**
	 * The vector similarity metric of the index
	 */
	metric?: 'euclidean' | 'cosine' | 'dotproduct';
	/**
	 * The number of pods for the index to use,including replicas.
	 */
	pods?: number;
	/**
	 * The number of replicas. Replicas duplicate your index. They provide higher availability and throughput.
	 */
	replicas?: number;
	/**
	 * The pod type
	 */
	pod_type?:
		| 's1.x1'
		| 's1.x2'
		| 's1.x4'
		| 's1.x8'
		| 'p1.x1'
		| 'p1.x2'
		| 'p1.x4'
		| 'p1.x8'
		| 'p2.x1'
		| 'p2.x2'
		| 'p2.x4'
		| 'p2.x8';
	/**
	 * Configuration for the behavior of Pinecone's internal metadata index. By default, all metadata is indexed; when metadata_config is present, only specified metadata fields are indexed.
	 */
	metadata_config?: {
		indexed?: string[];
		[k: string]: unknown;
	};
	/**
	 * The unique name of a collection.
	 */
	source_collection?: string;
	[k: string]: unknown;
}
