import { OperationGlobalConfigHttp } from '@trayio/cdk-dsl/connector/operation/OperationGlobalConfig';

/*
 * This is a global configuration that is used by all operations in the connector.
 * Update OperationGlobalConfigHttp.create<any> to use the right Auth type of the connector e.g. OperationGlobalConfigHttp.create<AuthType>.
 * Update the baseUrl to the base url of the API.
 * To configure the auth use the withBearerToken method or use addHeader method to add custom headers.
 *
 * IMPORTANT NOTE: Do not change the name of the variable `globalConfigHttp` as it is used by the internal Raw Http Operation.
 * You can ignore this configuration if you have disabled the Raw Http Operation in connector.json
 */
export const globalConfigHttp =
	OperationGlobalConfigHttp.create<any>().withBaseUrl(
		(ctx) => 'https://jsonplaceholder.typicode.com'
	);
