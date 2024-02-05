import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
    import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
    import { createIndexHandler } from './handler';
    import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';
    
    OperationHandlerTestSetup.configureHandlerTest(createIndexHandler, (handlerTest) =>
        handlerTest
            .usingHandlerContext('test')
            .nothingBeforeAll()
            .testCase('should createIndex', (testCase) =>
                testCase
                    .givenNothing()
                    .when(() => ({ 
                        name: 'test', 
                        dimension: 2, 
                        pods: 2, replicas: 2, 
                        metadata_config: { 
                            indexed: ['test'] }, 
                            source_collection: 'test' 
                        }
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