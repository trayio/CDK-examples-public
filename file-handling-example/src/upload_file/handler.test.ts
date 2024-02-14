import { OperationHandlerTestSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerTest";
import { OperationHandlerResult } from "@trayio/cdk-dsl/connector/operation/OperationHandler";
import { uploadFileHandler } from "./handler";
import "@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner";

OperationHandlerTestSetup.configureHandlerTest(
	uploadFileHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext("test")
			.nothingBeforeAll()
			.testCase("should upload file", (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({
						file_path: '/cdk-testing/meme.jpeg',
						file: {
							name: "meme.jpg",
							url: "https://i.imgur.com/CKVpBov.jpg",
							mime_type: "image/jpeg",
							expires: 0,
						},
					}))
					.then(({ output }) => {
						// console.log(output);
						const outputValue =
						  OperationHandlerResult.getSuccessfulValueOrFail(output);
						expect(outputValue.id).toBeDefined();
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);
