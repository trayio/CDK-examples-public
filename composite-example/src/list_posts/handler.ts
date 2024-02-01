import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { CompositeExampleAuth } from "../CompositeExampleAuth";
import { ListPostsInput } from "./input";
import { ListPostsOutput } from "./output";
import axios from "axios";
import {
  OperationHandlerError,
  OperationHandlerResult,
} from "@trayio/cdk-dsl/connector/operation/OperationHandler";

export const listPostsHandler = OperationHandlerSetup.configureHandler<
  CompositeExampleAuth,
  ListPostsInput,
  ListPostsOutput
>((handler) =>
  handler.usingComposite(async (ctx, input, invoke) => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    if (response.status !== 200 && response.status !== 201) {
      return OperationHandlerResult.failure(
        OperationHandlerError.connectorError(
          "There was an error retrieving the posts"
        )
      );
    }

    return OperationHandlerResult.success({
      results: response.data,
    });
  })
);
