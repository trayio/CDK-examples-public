import { OperationHandlerTestSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerTest";
import { OperationHandlerResult } from "@trayio/cdk-dsl/connector/operation/OperationHandler";
import { uploadFileToFilebinHandler } from "./handler";
import "@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner";

OperationHandlerTestSetup.configureHandlerTest(
  uploadFileToFilebinHandler,
  (handlerTest) =>
    handlerTest
      .usingHandlerContext("test")
      .nothingBeforeAll()
      .testCase("should do something", (testCase) =>
        testCase
          .givenNothing()
          .when(() => ({
            file: {
              url: "https://plus.unsplash.com/premium_photo-1682091872078-46c5ed6a006d?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              name: "scuba.png",
              mime_type: "image/jpeg",
              expires: 0,
            },
          }))
          .then(({ output }) => {
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
