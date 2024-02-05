import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
    import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
    import { upsertHandler } from './handler';
    import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';
    
    OperationHandlerTestSetup.configureHandlerTest(upsertHandler, (handlerTest) =>
        handlerTest
            .usingHandlerContext('test')
            .nothingBeforeAll()
            .testCase('should upsert', (testCase) =>
                testCase
                    .givenNothing()
                    .when(() => ({ vectors: [{ id: 'test', values: [2], sparseValues: { indices: [2], values: [2] }, metadata: {} }], namespace: 'test' }
			))
                    .then(({ output }) => {
						// console.log(output);
                        const outputValue =
						OperationHandlerResult.getSuccessfulValueOrFail(output);
                        expect(outputValue.upsertedCount).toEqual(2);
                        
                    })
                    .finallyDoNothing()
					)
					.nothingAfterAll()
					);