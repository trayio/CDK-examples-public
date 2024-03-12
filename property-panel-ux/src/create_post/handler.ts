import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { PropertyPanelUxAuth } from "../PropertyPanelUxAuth";
import { CreatePostInput } from "./input";
import { CreatePostOutput } from "./output";
import { globalConfigHttp } from "../GlobalConfig";

export const createPostHandler = OperationHandlerSetup.configureHandler<
  PropertyPanelUxAuth,
  CreatePostInput,
  CreatePostOutput
>((handler) =>
  handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
    http
      .post("/posts")
      .handleRequest((_ctx, input, request) =>
        request.withBodyAsJson({
          title: input.title,
          body: input.body || "",
          owner: input.owner,
          userId: input.userId,
        })
      )
      .handleResponse((_ctx, _input, response) =>
        response.parseWithBodyAsJson()
      )
  )
);
