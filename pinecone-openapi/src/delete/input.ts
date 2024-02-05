export interface DeleteInput {
	ids?: string[];
	deleteAll?: boolean;
	/**
	 * An index namespace name
	 */
	namespace?: string;
}
