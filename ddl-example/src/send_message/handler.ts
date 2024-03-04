import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { DdlExampleAuth } from "../DdlExampleAuth";
import { SendMessageInput } from "./input";
import { SendMessageOutput } from "./output";
import { globalConfigHttp } from "../GlobalConfig";

export const sendMessageHandler = OperationHandlerSetup.configureHandler<
  DdlExampleAuth,
  SendMessageInput,
  SendMessageOutput
>((handler) =>
  handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
    http
      .post("/chat.postMessage")
      .handleRequest((_ctx, input, request) => {
        return request.withBodyAsJson(input);
      })
      .handleResponse((_ctx, _input, response) =>
        response.parseWithBodyAsJson()
      )
  )
);
