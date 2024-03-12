import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { TmdbAuth } from "../TmdbAuth";
import { GetMovieGenresInput } from "./input";
import { GetMovieGenresOutput } from "./output";
import { globalConfigHttp } from "../GlobalConfig";

export const getMovieGenresHandler = OperationHandlerSetup.configureHandler<
  TmdbAuth,
  GetMovieGenresInput,
  GetMovieGenresOutput
>((handler) =>
  handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
    http
      .get("/3/genre/movie/list")
      .handleRequest((_ctx, _input, request) => request.withoutBody())
      .handleResponse((_ctx, _input, response) =>
        response.parseWithBodyAsJson()
      )
  )
);
