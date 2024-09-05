import { OperationHandlerTestSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerTest";
import { OperationHandlerResult } from "@trayio/cdk-dsl/connector/operation/OperationHandler";
import { downloadFileFromUrlHandler } from "./handler";
import "@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner";

OperationHandlerTestSetup.configureHandlerTest(
  downloadFileFromUrlHandler,
  (handlerTest) =>
    handlerTest
      .usingHandlerContext("test")
      .nothingBeforeAll()
      .testCase("should do something", (testCase) =>
        testCase
          .givenNothing()
          .when(() => ({
            file_url:
              "https://plus.unsplash.com/premium_photo-1673028716408-51942fd0b117?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }))
          .then(({ output }) => {
            // console.log(output);
            const outputValue =
              OperationHandlerResult.getSuccessfulValueOrFail(output);
            expect(outputValue.file).toEqual({
              expires: 0,
              mime_type: "image/jpeg",
              name: expect.any(String),
              url: expect.any(String),
            });
          })
          .finallyDoNothing()
      )
      .nothingAfterAll()
);
