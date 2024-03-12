import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { TmdbAuth } from "../TmdbAuth";
import { GetTopRatedMoviesInput } from "./input";
import { GetTopRatedMoviesOutput } from "./output";
import { globalConfigHttp } from "../GlobalConfig";

export const getTopRatedMoviesHandler = OperationHandlerSetup.configureHandler<
  TmdbAuth,
  GetTopRatedMoviesInput,
  GetTopRatedMoviesOutput
>((handler) =>
  handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
    http
      .get("/3/movie/top_rated")
      .handleRequest((_ctx, _input, request) => request.withoutBody())
      .handleResponse((_ctx, _input, response) =>
        response.parseWithBodyAsJson()
      )
  )
);
