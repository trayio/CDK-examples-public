import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { listCollectionsHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(listCollectionsHandler, (handlerTest) =>
	handlerTest
            .usingHandlerContext('test')
            .nothingBeforeAll()
            .testCase('should listCollections', (testCase) =>
                testCase
                    .givenNothing()
                    .when(() => ({}
			))
                    .then(({ output }) => {
						 // console.log(output);
                        const outputValue =
						OperationHandlerResult.getSuccessfulValueOrFail(output);
                        {}

                    })
                    .finallyDoNothing()
					)
					.nothingAfterAll()
					);
