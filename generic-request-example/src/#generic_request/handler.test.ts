import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { genericRequestHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(
	genericRequestHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should return an access token', (testCase) =>
				testCase
					.givenNothing()
					.when((test) => ({
						auth_form_input: {
							// To run this test, you can grab the values from the test.ctx.json file
							client_id: <string>test.auth?.app.client_id,
							client_secret: <string>test.auth?.app.client_secret,
							account_id: <string>test.auth?.app.account_id
						}
					})) 
					.then(({ output }) => {
						// console.log(output)
						const outputValue =
							OperationHandlerResult.getSuccessfulValueOrFail(output);
							expect(outputValue.body).toBeDefined();
							expect(outputValue.headers).toBeDefined();
							expect(outputValue.status_code).toBeDefined();
							expect(outputValue.status_code).toBe(200);
							// Grab the access token from the response body and store it in test.ctx.json to run other operations
							expect(outputValue.body.access_token).toBeDefined();
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);
