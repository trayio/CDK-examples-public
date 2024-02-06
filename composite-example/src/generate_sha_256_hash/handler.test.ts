import { OperationHandlerTestSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerTest";
import { generateSha256HashHandler } from "./handler";
import "@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner";

OperationHandlerTestSetup.configureHandlerTest(
  generateSha256HashHandler,
  (handlerTest) =>
    handlerTest
      .usingHandlerContext("test")
      .nothingBeforeAll()
      .testCase("should do correctly hash input string", (testCase) =>
        testCase
          .givenNothing()
          .when(() => ({ value: "someString" }))
          .then(({ output }) => {
            if (output.isFailure) {
              throw new Error("Output is a failure, expected success");
            }
            expect(output.value.input).toEqual("someString");
            expect(output.value.output).toEqual(
              "6f0416d8003de967a2af13a93f47aaeded2885e4b6911690d84c384b80a6e56f"
            );
          })
          .finallyDoNothing()
      )
      .nothingAfterAll()
);
