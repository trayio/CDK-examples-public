import { OperationHandlerTestSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerTest";
import { OperationHandlerResult } from "@trayio/cdk-dsl/connector/operation/OperationHandler";
import { downloadFileHandler } from "./handler";
import "@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner";

OperationHandlerTestSetup.configureHandlerTest(
	downloadFileHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext("test")
			.nothingBeforeAll()
			.testCase("should download a file", (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({
						// File path in dropbox
						file_path: '/cdk-testing/meme.jpeg'
					}))
					.then(({ output }) => {
						// console.log(output);
						const outputValue =
							OperationHandlerResult.getSuccessfulValueOrFail(output);
						expect(outputValue.file.url).toBeDefined();
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);
