import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { getPostHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(getPostHandler, (handlerTest) =>
	handlerTest
		.usingHandlerContext('test')
		.nothingBeforeAll()
		.testCase('should get a post', (testCase) =>
			testCase
				.givenNothing()
				.when(() => ({ id: 2 }))
				.then(({ output }) => {
					// console.log(output);
					const outputValue =
						OperationHandlerResult.getSuccessfulValueOrFail(output);
					expect(outputValue.id).toEqual(2);
				})
				.finallyDoNothing()
		)
		.nothingAfterAll()
);
