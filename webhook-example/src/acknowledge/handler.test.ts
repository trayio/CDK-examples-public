import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult, OperationHandlerError, TriggerOperationHttpResponse } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { webhookCreateHandler, webhookDestroyHandler, webhookRequestHandler } from './handler'
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

/*
 *  Because all of the trigger sub-operations are separate handlers, we can test them using different test suites, one for each, just like with regular handlers
 */

//Test create
OperationHandlerTestSetup.configureHandlerTest(
	webhookCreateHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should create a webhook', (testCase) =>
			testCase
				.givenNothing()
				.when(() => ({}))
				.then(({ output }) => {
					expect(output.isSuccess).toBe(true)
				})
				.finallyDoNothing()
		)
		.nothingAfterAll()
);

//Test _destroy
OperationHandlerTestSetup.configureHandlerTest(
	webhookDestroyHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should destroy webhook', (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({}))
					.then(({ output }) => {
						expect(output.isSuccess).toBe(true)
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);

//Test _request
OperationHandlerTestSetup.configureHandlerTest(
	webhookRequestHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should parse request', (testCase) =>
				testCase
					.givenNothing()
					.when(() => 
						({ 
							input: {
								id: 1
							}, 
							request: {
								hasLargeBody: false,
								method: 'POST',
								path: '/test',
								headers: {},
								query: {},
								body: 'a Title',
							} 
						})
					)
					.then(({ output }) => {
						const result = OperationHandlerResult.getSuccessfulValueOrFail(output)
						
						expect(result.output).toEqual({
							body: "a Title",
							headers: {},
							method: "POST",
							path: "/test",
							query: {},
						})
					})
					.finallyDoNothing()
			)
			.testCase('should skip trigger if the request is large', (testCase) =>
				testCase
					.givenNothing()
					.when(() => 
						({ 
							input: {
								id: 1
							}, 
							request: {
								hasLargeBody: true,
								method: 'POST',
								path: '/test',
								headers: {},
								query: {},
								body_url: 'some url',
								body_size: 123,
								body_message: 'message'
							} 
						})
					)
					.then(({ output }) => {
						const expectedResponse = TriggerOperationHttpResponse.withStatusCode(200)
						expect(output).toEqual(OperationHandlerResult.failure(OperationHandlerError.skipTriggerError('body is too big', expectedResponse)))
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);

