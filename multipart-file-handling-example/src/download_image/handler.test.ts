import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { downloadImageHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(
	downloadImageHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should download image', (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({ image_hash: 'CKVpBov' }))
					.then(({ output }) => {
						console.log(output);
						const outputValue =
							OperationHandlerResult.getSuccessfulValueOrFail(output);
						expect(outputValue.file).toBeDefined();
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);
