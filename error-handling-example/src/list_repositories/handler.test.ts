import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { listRepositoriesHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(
  listRepositoriesHandler,
  (handlerTest) =>
    handlerTest
      .usingHandlerContext("test")
      .nothingBeforeAll()
      .testCase(
        "should handle 401 authentication error and access error body",
        (testCase) =>
          testCase
            .givenNothing()
            .when(() => ({ id: 1 }))
            .then(({ output }) => {
              console.log("output", output);
              expect(output.isFailure).toBe(true);

              if (output.isFailure) {
                // Verify the error message contains content from the error body
                expect(output.error.message).toContain("Authentication failed");
                expect(output.error.message).toContain(
                  "Requires authentication"
                );
              }
            })
            .finallyDoNothing()
      )
      .nothingAfterAll()
);
