import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
    import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
    import { fetchHandler } from './handler';
    import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';
    
    OperationHandlerTestSetup.configureHandlerTest(fetchHandler, (handlerTest) =>
        handlerTest
            .usingHandlerContext('test')
            .nothingBeforeAll()
            .testCase('should fetch', (testCase) =>
                testCase
                    .givenNothing()
                    .when(() => ({ ids: ['test'], namespace: 'test' }
			))
                    .then(({ output }) => {
						console.log(output);
                        const outputValue =
						OperationHandlerResult.getSuccessfulValueOrFail(output);
                        expect(outputValue.vectors).toEqual({});
                        expect(outputValue.namespace).toEqual('test');         
                    })
                    .finallyDoNothing()
					)
					.nothingAfterAll()
					);