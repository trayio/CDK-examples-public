import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { DdlExampleAuth } from "../DdlExampleAuth";
import { ListChannelsInput } from "./input";
import { ListChannelsOutput } from "./output";
import { globalConfigHttp } from "../GlobalConfig";

export const listChannelsHandler = OperationHandlerSetup.configureHandler<
  DdlExampleAuth,
  ListChannelsInput,
  ListChannelsOutput
>((handler) =>
  handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
    http
      .post("/conversations.list")
      .handleRequest((_ctx, input, request) => {
        return request.withBodyAsJson(input);
      })
      .handleResponse((_ctx, _input, response) =>
        response.parseWithBodyAsJson()
      )
  )
);
