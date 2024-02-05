export interface FetchInput {
	ids: string[];
	/**
	 * An index namespace name
	 */
	namespace?: string;
	[k: string]: unknown;
}
