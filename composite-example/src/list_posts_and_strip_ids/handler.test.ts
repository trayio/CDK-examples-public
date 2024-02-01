import { OperationHandlerTestSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerTest";
import { getSomethingHandler } from "./handler";
import "@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner";

OperationHandlerTestSetup.configureHandlerTest(
  getSomethingHandler,
  (handlerTest) =>
    handlerTest
      .usingHandlerContext("test")
      .nothingBeforeAll()
      .testCase("should do something", (testCase) =>
        testCase
          .givenNothing()
          .when(() => ({}))
          .then(({ output }) => {
            if (output.isFailure) {
              throw new Error("Output is a failure, expected success");
            }
            expect(output.value.results).toEqual(expect.any(Array));
            expect(output.value.results[0]).toEqual({
              title: expect.any(String),
              body: expect.any(String),
            });
          })
          .finallyDoNothing()
      )
      .nothingAfterAll()
);
