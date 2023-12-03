import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { TmdbAuth } from "../TmdbAuth";
import { ListMovieGenresDdlInput } from "./input";
import { ListMovieGenresDdlOutput } from "./output";
import {
  OperationHandlerError,
  OperationHandlerResult,
} from "@trayio/cdk-dsl/connector/operation/OperationHandler";
import axios from "axios";

type GenreObject = {
  id: number;
  name: string;
};

type GenreList = {
  text: string;
  value: number;
};

export const listMovieGenresDdlHandler = OperationHandlerSetup.configureHandler<
  TmdbAuth,
  ListMovieGenresDdlInput,
  ListMovieGenresDdlOutput
>((handler) =>
  handler.usingComposite(async (ctx, input, invoke) => {
    const genresListResponse = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list`,
      {
        headers: {
          Authorization: `Bearer ${ctx.auth?.user.access_token}`,
        },
      }
    );

    if (genresListResponse.status !== 200) {
      return OperationHandlerResult.failure(
        OperationHandlerError.connectorError("Network call failed")
      );
    }

    const genresList: GenreList[] = genresListResponse.data.genres.map(
      (genre: GenreObject) => {
        return {
          text: genre.name,
          value: genre.id,
        };
      }
    );

    return OperationHandlerResult.success({
      result: genresList,
    });
  })
);
