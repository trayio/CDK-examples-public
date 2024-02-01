import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { CompositeExampleAuth } from "../CompositeExampleAuth";
import { ListPostsInput } from "./input";
import { ListPostsOutput } from "./output";

export const listPostsHandler = OperationHandlerSetup.configureHandler<
  CompositeExampleAuth,
  ListPostsInput,
  ListPostsOutput
>((handler) =>
  handler.usingHttp((http) =>
    http
      .get("https://jsonplaceholder.typicode.com/posts")
      .handleRequest((ctx, input, request) => request.withoutBody())
      .handleResponse((ctx, input, response) =>  response.parseWithBodyAsJson())
  )
);
