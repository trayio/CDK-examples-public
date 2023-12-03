import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { TmdbAuth } from "../TmdbAuth";
import { GetMoviesByGenreInput } from "./input";
import { GetMoviesByGenreOutput } from "./output";

export const getMoviesByGenreHandler = OperationHandlerSetup.configureHandler<
  TmdbAuth,
  GetMoviesByGenreInput,
  GetMoviesByGenreOutput
>((handler) =>
  handler.usingHttp((http) =>
    http
      .get("https://api.themoviedb.org/3/discover/movie")
      .handleRequest((ctx, input, request) =>
        request
          .addQueryString("with_genres", input.genre.toString())
          .withBearerToken(ctx.auth!.user.access_token)
          .withoutBody()
      )
      .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
  )
);
