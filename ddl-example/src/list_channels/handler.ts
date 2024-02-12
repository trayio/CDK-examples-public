import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { DdlExampleAuth } from "../DdlExampleAuth";
import { ListChannelsInput } from "./input";
import { ListChannelsOutput } from "./output";

export const listChannelsHandler = OperationHandlerSetup.configureHandler<
  DdlExampleAuth,
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
      .handleResponse((_ctx, _input, response) => response.parseWithBodyAsJson())
  )
);
