import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { uploadImageHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(
	uploadImageHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should upload an image with an URL', (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({
						source: {
							url: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
						},
						title: 'google logo',
						description: 'google logo URL to upload to Imgur'
					}))
					.then(({ output }) => {
						console.log(output);
						const outputValue =
							OperationHandlerResult.getSuccessfulValueOrFail(output);
						expect(outputValue.data.id).toBeDefined();
						expect(outputValue.data.title).toEqual('google logo');
						expect(outputValue.data.description).toEqual('google logo URL to upload to Imgur');
					})
					.finallyDoNothing()
			)
			.testCase('should upload an image with a file object', (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({
						source: {
							file: { // FileReference object
								"name": "rabbit.jpeg",
								"url": "<... some jpeg file URL...>",
								"mime_type": "image/jpeg",
								"expires": 1707846419
							}
						},
						title: 'File object',
						description: 'File object to upload to Imgur'
					}))
					.then(({ output }) => {
						console.log(output);
						const outputValue =
							OperationHandlerResult.getSuccessfulValueOrFail(output);
							expect(outputValue.data.id).toBeDefined();
							expect(outputValue.data.title).toEqual('File object');
							expect(outputValue.data.description).toEqual('File object to upload to Imgur');
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);
