import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { SmessTestSlackAuth } from "../SmessTestSlackAuth";
import { ListChannelsInput } from "./input";
import { ListChannelsOutput } from "./output";

export const listChannelsHandler = OperationHandlerSetup.configureHandler<
  SmessTestSlackAuth,
  ListChannelsInput,
  ListChannelsOutput
>((handler) =>
  handler.usingHttp((http) =>
    http
      .post("https://slack.com/api/conversations.list")
      .handleRequest((ctx, input, request) => {
        const access_token = ctx.auth?.user.access_token as string;
        return request.withBearerToken(access_token).withBodyAsJson(input);
      })
      .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
  )
);
