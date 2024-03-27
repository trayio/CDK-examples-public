import { HttpHeaders } from '@trayio/commons/http/Http';

export type GetAccessTokenRes = {
	access_token: string
	expires_in: number
	token_type: string
}
export type GenericRequestOutput = {
	status_code: number
	body: GetAccessTokenRes
	headers: HttpHeaders
};
