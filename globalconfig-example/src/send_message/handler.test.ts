import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { sendMessageHandler } from './handler'
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(
	sendMessageHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('send a slack message', (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({ channel: '<slack_channel_id>', text: 'blah2' }))
					.then(({ output }) => {
						const outputValue = OperationHandlerResult.getSuccessfulValueOrFail(output)
						expect(outputValue.ok).toBe(false)
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);
