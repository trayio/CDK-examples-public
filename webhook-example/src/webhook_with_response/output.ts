export type WebhookWithResponseOutput = {
	method: string;
	path: string;
	body: string;
	query: Record<string, string[]>;
	headers: Record<string, string[]>;
};