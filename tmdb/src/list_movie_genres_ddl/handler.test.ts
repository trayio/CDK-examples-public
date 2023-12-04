import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { listMovieGenresDdlHandler } from './handler'
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(
	listMovieGenresDdlHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should do something', (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({ }))
					.then(({ output }) => {
						// console.log(output)
						const outputValue = OperationHandlerResult.getSuccessfulValueOrFail(output)
						expect(outputValue.result.length).toEqual(19);
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);
