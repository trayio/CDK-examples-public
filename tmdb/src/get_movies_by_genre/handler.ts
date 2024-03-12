import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { TmdbAuth } from "../TmdbAuth";
import { GetMoviesByGenreInput } from "./input";
import { GetMoviesByGenreOutput } from "./output";
import { globalConfigHttp } from "../GlobalConfig";

export const getMoviesByGenreHandler = OperationHandlerSetup.configureHandler<
  TmdbAuth,
  GetMoviesByGenreInput,
  GetMoviesByGenreOutput
>((handler) =>
  handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
    http
      .get("/3/discover/movie")
      .handleRequest((_ctx, input, request) =>
        request
          .addQueryString("with_genres", input.genre.toString())
          .withoutBody()
      )
      .handleResponse((_ctx, _input, response) =>
        response.parseWithBodyAsJson()
      )
  )
);
