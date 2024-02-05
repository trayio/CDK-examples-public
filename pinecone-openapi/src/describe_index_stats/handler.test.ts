import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
    import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
    import { describeIndexStatsHandler } from './handler';
    import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';
    
    OperationHandlerTestSetup.configureHandlerTest(describeIndexStatsHandler, (handlerTest) =>
        handlerTest
            .usingHandlerContext('test')
            .nothingBeforeAll()
            .testCase('should describeIndexStats', (testCase) =>
                testCase
                    .givenNothing()
                    .when(() => ({ filter: {} }
			))
                    .then(({ output }) => {
						// console.log(output);
                        const outputValue =
						OperationHandlerResult.getSuccessfulValueOrFail(output);
                        expect(outputValue.namespaces).toEqual({});
expect(outputValue.dimension).toEqual(2);
expect(outputValue.indexFullness).toEqual(2);
expect(outputValue.totalVectorCount).toEqual(2);
                        
                    })
                    .finallyDoNothing()
					)
					.nothingAfterAll()
					);