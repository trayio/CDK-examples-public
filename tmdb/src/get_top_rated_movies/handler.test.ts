import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { getTopRatedMoviesHandler } from './handler'
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(
	getTopRatedMoviesHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should return 20 movies', (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({}))
					.then(({ output }) => {
						// console.log(output);
						const outputValue = OperationHandlerResult.getSuccessfulValueOrFail(output)
						expect(outputValue.results.length).toEqual(20);
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);
