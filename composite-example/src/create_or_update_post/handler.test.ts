import { OperationHandlerTestSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerTest";
import { createOrUpdatePostHandler } from "./handler";
import "@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner";

OperationHandlerTestSetup.configureHandlerTest(
  createOrUpdatePostHandler,
  (handlerTest) =>
    handlerTest
      .usingHandlerContext("test")
      .nothingBeforeAll()
      .testCase("should create a new post when there is no ID", (testCase) =>
        testCase
          .givenNothing()
          .when(() => ({
            title: "myNewPost",
            body: "myNewPostDescription",
            userId: 1,
          }))
          .then(({ output }) => {
            if (output.isFailure) {
              console.warn(JSON.stringify(output));
              throw new Error("Output is a failure, expected success");
            }
            expect(output.value).toEqual({
              id: expect.any(Number),
              userId: 1,
              title: "myNewPost",
              body: "myNewPostDescription",
            });
          })
          .finallyDoNothing()
      )
      .testCase(
        "should update an existing post when the ID is present",
        (testCase) =>
          testCase
            .givenNothing()
            .when(() => ({
              id: 1,
              title: "myUpdatedPost",
              body: "myUpdatedPostDescription",
            }))
            .then(({ output }) => {
              if (output.isFailure) {
                console.warn(JSON.stringify(output));
                throw new Error("Output is a failure, expected success");
              }
              expect(output.value).toEqual({
                id: 1,
                userId: undefined,
                title: "myUpdatedPost",
                body: "myUpdatedPostDescription",
              });
            })
            .finallyDoNothing()
      )
      .nothingAfterAll()
);
