import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { listEventsHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(
	listEventsHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should list events', (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({}))
					.then(({ output }) => {
						const outputValue =
							OperationHandlerResult.getSuccessfulValueOrFail(output);
						expect(outputValue.links.length).toBeGreaterThan(0);
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);
