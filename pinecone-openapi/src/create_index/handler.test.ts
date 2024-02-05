import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
    import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
    import { createIndexHandler } from './handler';
import { podType } from './input';
    import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

    OperationHandlerTestSetup.configureHandlerTest(createIndexHandler, (handlerTest) =>
        handlerTest
            .usingHandlerContext('test')
            .nothingBeforeAll()
            .testCase('should createIndex', (testCase) =>
                testCase
                    .givenNothing()
                    .when(() => ({ name: 'test', dimension: 2, metric: 'euclidean', pods: 2, replicas: 2,
                            pod_type: podType['00'], metadata_config: { indexed: ['test'] }, source_collection: 'test' }
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
