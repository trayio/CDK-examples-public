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
				.when(() => ({ id: 2, email: 'user@domain.com' }))
				.then(({ output }) => {
					// console.log(output);
					const outputValue =
						OperationHandlerResult.getSuccessfulValueOrFail(output);
					expect(outputValue.id).toEqual(2);
				})
				.finallyDoNothing()
		)
		.testCase('should fail validation if id < 0', (testCase) =>
			testCase
				.givenNothing()
				.when(() => ({ id: -1, email: 'user@domain.com' }))
				.then(({ output }) => {
					console.log(output);

					expect(output.isFailure).toEqual(true);
					if (output.isFailure) {
						expect(output.error.message).toEqual('id must be greater than 0');
					}
				})
				.finallyDoNothing()
		)
		.testCase('should fail validation if id is not an integer', (testCase) =>
			testCase
				.givenNothing()
				.when(() => ({ id: 0.5, email: 'user@domain.com' }))
				.then(({ output }) => {
					console.log(output);

					expect(output.isFailure).toEqual(true);
					if (output.isFailure) {
						expect(output.error.message).toEqual('id must be an integer');
					}
				})
				.finallyDoNothing()
		)
		.testCase('should fail validation if email is in an invalid format', (testCase) =>
			testCase
				.givenNothing()
				.when(() => ({ id: 1, email: '@domain.com' }))
				.then(({ output }) => {
					console.log(output);

					expect(output.isFailure).toEqual(true);
					if (output.isFailure) {
						expect(output.error.message).toEqual('Email is not valid is not in a valid format');
					}
				})
				.finallyDoNothing()
		)
		.nothingAfterAll()
);
