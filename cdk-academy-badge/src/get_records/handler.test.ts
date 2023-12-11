// Test asserts
// The response code is 200
// The response is an array and has at least 1 element within it
import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { getRecordsHandler } from './handler'
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(
	getRecordsHandler,
	(handlerTest) =>
		handlerTest
			.usingHandlerContext('test')
			.nothingBeforeAll()
			.testCase('should do something', (testCase) =>
				testCase
					.givenNothing()
					.when(() => ({ record_type: "contact" }))
					.then(({ output }) => {
						//included for auditing purposes - comment out if you don't want it
						console.log(output);
						const outputValue = OperationHandlerResult.getSuccessfulValueOrFail(output)
						//example test to check that the number of returned records is >= 1
						expect(outputValue.records.length).toBeGreaterThanOrEqual(1);
					})
					.finallyDoNothing()
			)
			.nothingAfterAll()
);