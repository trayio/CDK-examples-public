import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { DdlExampleAuth } from "../DdlExampleAuth";
import { SendMessageInput } from "./input";
import { SendMessageOutput } from "./output";

export const sendMessageHandler = OperationHandlerSetup.configureHandler<
  DdlExampleAuth,
  SendMessageInput,
  SendMessageOutput
>((handler) =>
  handler.usingHttp((http) =>
    http
      .post("https://slack.com/api/chat.postMessage")
      .handleRequest((ctx, input, request) => {
        const access_token = ctx.auth?.user.access_token as string;

        return request.withBearerToken(access_token).withBodyAsJson(input);
      })
      .handleResponse((_ctx, _input, response) => response.parseWithBodyAsJson())
  )
);
