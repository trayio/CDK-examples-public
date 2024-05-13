import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { BizzaboCdkAuth } from "../BizzaboCdkAuth";
import { ListEventsInput } from "./input";
import { ListEventsOutput } from "./output";

export const listEventsHandler = OperationHandlerSetup.configureHandler<
  BizzaboCdkAuth,
  ListEventsInput,
  ListEventsOutput
>((handler) =>
  handler.usingHttp((http) =>
    http
      .get("https://api.bizzabo.com/v1/events")
      .handleRequest((ctx, input, request) => {
        // The access token is returned from the #token_request operation
        return request
          .withBearerToken(<string>ctx.auth?.user.access_token)
          .withoutBody();
      })
      .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
  )
);
