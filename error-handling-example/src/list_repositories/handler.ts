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
      .handleResponse((_ctx, _input, response) => {
        /**
         * This example operation handler demonstrates how error handling can be used.
         * Different error types either show or obscure the error from the end user in the Tray workflow builder.
         * Additionally, different error types either trigger a retry of the failed operation or not.
         * This code is just an example and shouldn't be intepreted as a best practice.
         * Different APIs may require different error handling strategies.
         * 
         * Any errors the connector encouters that aren't handled by the connector will be treated as a connector error.
         * Causing the underlying error message to be obscured from the end user in the Tray workflow builder.
         * And the failed operation will be retried two additional times.
         */

        const statusCode = response.getStatusCode();

        /**
         * If the status code is 200, we return the response as a successful result
         */
        if (statusCode === 200) {
          return response.parseWithBodyAsJson();
        }

        /**
         * If the status code is 402, 
         * we return a user input error that will be visible in the Tray workflow builder 
         * and will not trigger a retry of the failed operation
         */
        else if (statusCode === 402) {
          return response
            .withJsonErrorHandling<{ message: string }>((body) =>
              OperationHandlerResult.failure(
                OperationHandlerError.userInputError(
                  `API returned a 402 error: User input error`,
                  {
                    statusCode: 402,
                  }
                )
              )
            ).parseWithBodyAsJson();
        }

        /**
         * If the status code is 404, 
         * we return a connector error that will be not be visible in the Tray workflow builder. 
         * The user will see "Unfortunately, the connector unexpectedly failed". 
         * The failed operation will be retried two additional times.
         */
        else if (statusCode === 404) {
          return response
            .withJsonErrorHandling<{ message: string }>((body) =>
              OperationHandlerResult.failure(
                OperationHandlerError.connectorError(
                  `API returned a 404 error: URL not found`,
                  {
                    statusCode: 404,
                  }
                )
              )
            ).parseWithBodyAsJson();
        }

        /**
         * If the status code is 401,
         * we return a OAuth refresh error.
         * The auth token will be refreshed and the failed operation will be retried two additional times.
         * The user will see the error message in the Tray workflow builder.
         */
        else if (statusCode === 401) {
          return response
            .withJsonErrorHandling<{ message: string }>((body) =>
              OperationHandlerResult.failure(
                OperationHandlerError.oauthRefreshError(
                  `API returned a 401 error: OAuth refresh error`,
                  {
                    statusCode: 401,
                  }
                )
              )
            ).parseWithBodyAsJson();
        }
        /**
         * Any other status code will be treated as a failure,
         * we'll return an API error so that the message will be visible in the Tray workflow builder
         * and the failed operation will be retried two additional times.
         */
        else {
          return response
            .withJsonErrorHandling<{ message: string }>((body) =>
              OperationHandlerResult.failure(
                OperationHandlerError.apiError(
                  `API returned an error: ${body.message
                  }, status code: ${response.getStatusCode()}`,
                  {
                    statusCode: (response.getStatusCode()),
                  }
                )
              )
            )
            .parseWithBodyAsJson()
        }
      })
  )
);
