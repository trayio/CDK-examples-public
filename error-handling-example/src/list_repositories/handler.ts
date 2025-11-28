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
      .handleResponse(
        (_ctx, _input, response) =>
          /**
           * This example demonstrates how to access error body content using
           * withJsonErrorHandling and withErrorHandling.
           *
           * withJsonErrorHandling: For JSON error responses - gives you a parsed object
           * withErrorHandling: For non-JSON responses (HTML, plain text, etc.) - gives you raw content
           *
           * Example 1: Using withJsonErrorHandling to access JSON error body
           * The body parameter contains the parsed JSON error response from the API
           */
          response
            .withJsonErrorHandling<{
              message: string;
              documentation_url?: string;
            }>((body) => {
              // Log the error body to show it's accessible
              console.log("API Error Body:", JSON.stringify(body, null, 2));

              const statusCode = response.getStatusCode();

              // Handle different error types based on status code
              if (statusCode === 401) {
                return OperationHandlerResult.failure(
                  OperationHandlerError.oauthRefreshError(
                    `Authentication failed: ${body.message}`,
                    {
                      statusCode,
                      errorBody: body,
                    }
                  )
                );
              } else if (statusCode === 404) {
                return OperationHandlerResult.failure(
                  OperationHandlerError.userInputError(
                    `Resource not found: ${body.message}`,
                    {
                      statusCode,
                      errorBody: body,
                    }
                  )
                );
              } else {
                return OperationHandlerResult.failure(
                  OperationHandlerError.apiError(
                    `GitHub API Error: ${body.message}`,
                    {
                      statusCode,
                      errorBody: body,
                    }
                  )
                );
              }
            })
            .parseWithBodyAsJson()

        /**
         * Example 2: Using withErrorHandling for non-JSON responses
         * Uncomment this block and comment out the above to see withErrorHandling in action
         *
         * response
         *   .withErrorHandling((body) => {
         *     // body can be string, number, boolean, DynamicObject, or DynamicArray
         *     const errorBodyStr = typeof body === "string" ? body : JSON.stringify(body);
         *     console.log("Error Body:", errorBodyStr.substring(0, 200));
         *
         *     return OperationHandlerResult.failure(
         *       OperationHandlerError.apiError(
         *         `API Error: ${errorBodyStr.substring(0, 100)}`,
         *         { statusCode: response.getStatusCode() }
         *       )
         *     );
         *   })
         *   .parseWithBodyAsJson();
         */
      )
  )
);
