import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { getMovieGenresHandler } from './handler'
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(
	getMovieGenresHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should return 19 genres', (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({}))
					.then(({ output }) => {
						//console.log(output);
						const outputValue = OperationHandlerResult.getSuccessfulValueOrFail(output)
						expect(outputValue.genres.length).toEqual(19);
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);
