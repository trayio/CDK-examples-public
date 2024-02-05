import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
    import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
    import { queryHandler } from './handler';
    import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';
    
    OperationHandlerTestSetup.configureHandlerTest(queryHandler, (handlerTest) =>
        handlerTest
            .usingHandlerContext('test')
            .nothingBeforeAll()
            .testCase('should query', (testCase) =>
                testCase
                    .givenNothing()
                    .when(() => ({ namespace: 'test', topK: 2, filter: {}, includeValues: true, includeMetadata: true, vector: [2], sparseVector: { indices: [2], values: [2] }, id: 'test' }
			))
                    .then(({ output }) => {
						// console.log(output);
                        const outputValue =
						OperationHandlerResult.getSuccessfulValueOrFail(output);
                        expect(outputValue.matches).toEqual([{ id: 'test', score: 2, values: [2], sparseValues: { indices: [2], values: [2] }, metadata: {} }]);
expect(outputValue.namespace).toEqual('test');
                        
                    })
                    .finallyDoNothing()
					)
					.nothingAfterAll()
					);