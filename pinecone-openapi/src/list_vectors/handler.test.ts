import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { listVectorsHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(
	listVectorsHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should list vectors', (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({ id: 2 }))
					.then(({ output }) => {
						console.log(output);
						const outputValue =
							OperationHandlerResult.getSuccessfulValueOrFail(output);
						expect(outputValue.id).toEqual(2);
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);
