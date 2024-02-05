export enum podType {
	['00'] = 's1.x1',
		['01'] =  's1.x2',
	['02'] =  's1.x4',
	['03'] =  's1.x8',
	['04'] =  'p1.x1',
	['05'] =  'p1.x2',
	['06'] =  'p1.x4',
	['07'] =  'p1.x8',
	['08'] =  'p2.x1',
	['09'] =  'p2.x2',
	['0A'] =  'p2.x4',
	['0B'] =  'p2.x8',
}

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
	pod_type?: podType;
	/**
	 * Configuration for the behavior of Pinecone's internal metadata index. By default, all metadata is indexed; when metadata_config is present, only specified metadata fields are indexed.
	 */
	metadata_config?: {
		indexed?: string[];
	};
	/**
	 * The unique name of a collection.
	 */
	source_collection?: string;
}
