import { OperationHandlerTestSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerTest";
import { OperationHandlerResult } from "@trayio/cdk-dsl/connector/operation/OperationHandler";
import { listPostsHandler } from "./handler";
import "@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner";

OperationHandlerTestSetup.configureHandlerTest(
  listPostsHandler,
  (handlerTest) =>
    handlerTest
      .usingHandlerContext("test")
      .nothingBeforeAll()
      .testCase("should do return an array posts", (testCase) =>
        testCase
          .givenNothing()
          .when(() => ({}))
          .then(({ output }) => {
            // console.log(output);
            const outputValue =
              OperationHandlerResult.getSuccessfulValueOrFail(output);
            expect(outputValue).toEqual(expect.any(Array));
          })
          .finallyDoNothing()
      )
      .nothingAfterAll()
);
