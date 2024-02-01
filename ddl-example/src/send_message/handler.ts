import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { SmessTestSlackAuth } from "../SmessTestSlackAuth";
import { SendMessageInput } from "./input";
import { SendMessageOutput } from "./output";
import _ from "lodash";

export const sendMessageHandler = OperationHandlerSetup.configureHandler<
  SmessTestSlackAuth,
  SendMessageInput,
  SendMessageOutput
>((handler) =>
  handler.usingHttp((http) =>
    http
      .post("https://slack.com/api/chat.postMessage")
      .handleRequest((ctx, input, request) => {
        const access_token = ctx.auth?.user.access_token as string;
        const lowercase_input = _.capitalize("FRED");

        console.log(lowercase_input);
        return request.withBearerToken(access_token).withBodyAsJson(input);
      })
      .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
  )
);
