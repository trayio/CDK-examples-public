import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { ErrorHandlingExampleAuth } from "../ErrorHandlingExampleAuth";
import { ListRepositoriesInput } from "./input";
import { ListRepositoriesOutput } from "./output";
import { globalConfigHttp } from "../GlobalConfig";
import {
  OperationHandlerError,
  OperationHandlerResult,
} from "@trayio/cdk-dsl/connector/operation/OperationHandler";

export const listRepositoriesHandler = OperationHandlerSetup.configureHandler<
  ErrorHandlingExampleAuth,
  ListRepositoriesInput,
  ListRepositoriesOutput
>((handler) =>
  handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
    http
      .get("/user/repos")
      .handleRequest((_ctx, _input, request) => request.withoutBody())
      .handleResponse((_ctx, _input, response) =>
        response
          .withJsonErrorHandling<{ message: string }>((body) =>
            OperationHandlerResult.failure(
              OperationHandlerError.apiError(
                `API returned an error: ${
                  body.message
                }, status code: ${response.getStatusCode()}`,
                {
                  statusCode: (response.getStatusCode()),
                }
              )
            )
          )
          .parseWithBodyAsJson()
      )
  )
);
