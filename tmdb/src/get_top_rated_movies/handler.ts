import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { TmdbAuth } from "../TmdbAuth";
import { GetTopRatedMoviesInput } from "./input";
import { GetTopRatedMoviesOutput } from "./output";

export const getTopRatedMoviesHandler = OperationHandlerSetup.configureHandler<
  TmdbAuth,
  GetTopRatedMoviesInput,
  GetTopRatedMoviesOutput
>((handler) =>
  handler.usingHttp((http) =>
    http
      .get("https://api.themoviedb.org/3/movie/top_rated")
      .handleRequest((ctx, input, request) =>
        request.withBearerToken(ctx.auth!.user.access_token).withoutBody()
      )
      .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
  )
);
