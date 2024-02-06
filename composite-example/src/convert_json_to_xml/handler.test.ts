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
      .testCase(
        "should correctly convert json input to xml output",
        (testCase) =>
          testCase
            .givenNothing()
            .when(() => ({
              json: JSON.stringify({
                data: {
                  myTest: "test",
                },
              }),
            }))
            .then(({ output }) => {
              const outputValue =
                OperationHandlerResult.getSuccessfulValueOrFail(output);
              const expectedOutput = `<data><myTest>test</myTest></data>`;
              expect(outputValue.output.replace(/\s/g, "")).toEqual(
                expectedOutput.replace(/\s/g, "")
              );
            })
            .finallyDoNothing()
      )
      .nothingAfterAll()
);
