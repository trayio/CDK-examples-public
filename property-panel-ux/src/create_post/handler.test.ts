import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { createPostHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';
import { PostType } from './input';

OperationHandlerTestSetup.configureHandlerTest(createPostHandler, (handlerTest) =>
	handlerTest
		.usingHandlerContext('test')
		.nothingBeforeAll()
		.testCase('should get a post', (testCase) =>
			testCase
				.givenNothing()
				.when(() => ({
					title: PostType.reminder,
					body: 'bar',
					owner: { name: 'non profit name'},
					userId: 1,
				}))
				.then(({ output }) => {
					console.log(output);
					const outputValue =
						OperationHandlerResult.getSuccessfulValueOrFail(output);
					expect(outputValue).toEqual(
						expect.objectContaining({
							title: PostType.reminder,
							body: 'bar',
							userId: 1,
						})
					);
				})
				.finallyDoNothing()
		)
		.nothingAfterAll()
);
