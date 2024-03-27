import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { BizzaboCdkAuth } from '../BizzaboCdkAuth';
import { GenericRequestInput } from './input';
import { GenericRequestOutput, GetAccessTokenRes } from './output';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';

// This operation is used to get customized OAuth2 access tokens
export const genericRequestHandler =
	OperationHandlerSetup.configureHandler<
		BizzaboCdkAuth,
		GenericRequestInput,
		GenericRequestOutput
	>((handler) =>
		handler.usingHttp((http) =>
			http
				.post('https://auth.bizzabo.com/oauth/token')
				.handleRequest((ctx, input, request) => {
					return request
						// Send body data according to the API authentication flow
						.withBodyAsJson({
							// Grab values from the authentication form "auth_form_input"
							client_id: input.auth_form_input.client_id,
							client_secret: input.auth_form_input.client_secret,
							account_id: input.auth_form_input.account_id,
							audience: 'https://api.bizzabo.com/api',
							grant_type: 'client_credentials',
						})
				})
				.handleResponse((ctx, input, response) => {
					return response.parseWithBodyAsJson<GetAccessTokenRes>((body) => {
						return OperationHandlerResult.success({
							// You must respond with status_code, headers, and body
							status_code: response.getStatusCode(),
							headers: response.getHeaders(),
							body: {
								// Grab the access token from the response body and store it in test.ctx.json to run other operations
								access_token: body.access_token,
								expires_in: body.expires_in,
								token_type: body.token_type,
							},
						});
					});
				})
		)
	);
