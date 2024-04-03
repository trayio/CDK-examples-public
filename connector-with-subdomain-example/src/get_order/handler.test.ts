import { OperationHandlerTestSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerTest";
import { OperationHandlerResult } from "@trayio/cdk-dsl/connector/operation/OperationHandler";
import { getOrderHandler } from "./handler";
import "@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner";

OperationHandlerTestSetup.configureHandlerTest(getOrderHandler, (handlerTest) =>
  handlerTest
    .usingHandlerContext("test")
    .nothingBeforeAll()
    .testCase("should do something", (testCase) =>
      testCase
        .givenNothing()
        .when(() => ({ id: 5640571912285 }))
        .then(({ output }) => {
          //   console.log(output);
          const outputValue =
            OperationHandlerResult.getSuccessfulValueOrFail(output);
          expect(outputValue.order.id).toEqual(5640571912285);
        })
        .finallyDoNothing()
    )
    .nothingAfterAll()
);
