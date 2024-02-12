export type AcknowledgeOutput = {
	method: string;
	path: string;
	body: string;
	query: Record<string, string[]>;
	headers: Record<string, string[]>;
};