import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { TmdbAuth } from "../TmdbAuth";
import { GetMovieGenresInput } from "./input";
import { GetMovieGenresOutput } from "./output";

export const getMovieGenresHandler = OperationHandlerSetup.configureHandler<
  TmdbAuth,
  GetMovieGenresInput,
  GetMovieGenresOutput
>((handler) =>
  handler.usingHttp((http) =>
    http
      .get("https://api.themoviedb.org/3/genre/movie/list")
      .handleRequest((ctx, input, request) =>
        request.withBearerToken(ctx.auth!.user.access_token).withoutBody()
      )
      .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
  )
);
