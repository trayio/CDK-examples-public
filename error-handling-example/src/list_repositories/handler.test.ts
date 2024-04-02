import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { listRepositoriesHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(
	listRepositoriesHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should do something', (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({ id: 2 }))
					.then(({ output }) => {
						// console.log(output);
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);
