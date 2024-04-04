import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { ConnectorWithSubdomainExampleAuth } from "../ConnectorWithSubdomainExampleAuth";
import { GetOrderInput } from "./input";
import { GetOrderOutput } from "./output";
import {
  OperationHandlerError,
  OperationHandlerResult,
} from "@trayio/cdk-dsl/connector/operation/OperationHandler";
import { globalConfigHttp } from "../GlobalConfig";

export const getOrderHandler = OperationHandlerSetup.configureHandler<
  ConnectorWithSubdomainExampleAuth,
  GetOrderInput,
  GetOrderOutput
>((handler) =>
  handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
    http
      .get(`/orders/:id.json`)
      .handleRequest((ctx, input, request) =>
        request.addPathParameter("id", input.id.toString()).withoutBody()
      )
      .handleResponse((ctx, input, response) =>
        response
          .withJsonErrorHandling((body) => {
            return OperationHandlerResult.failure(
              OperationHandlerError.apiError(
                `API returned an error: ${body}, status code: ${response.getStatusCode()}`,
                {
                  statusCode: response.getStatusCode(),
                  headers: response.getHeaders(),
                  body: JSON.stringify(body),
                }
              )
            );
          })
          .parseWithBodyAsJson()
      )
  )
);
