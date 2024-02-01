import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import {
  OperationHandlerError,
  OperationHandlerResult,
} from "@trayio/cdk-dsl/connector/operation/OperationHandler";
import { CompositeExampleAuth } from "../CompositeExampleAuth";
import { ListPostsAndStripIdsInput } from "./input";
import { ListPostsAndStripIdsOutput } from "./output";
// the handler for list_posts is exported by default so we can import it
import { listPostsHandler } from "../list_posts/handler";

export const getSomethingHandler = OperationHandlerSetup.configureHandler<
  CompositeExampleAuth,
  ListPostsAndStripIdsInput,
  ListPostsAndStripIdsOutput
>((handler) =>
  handler.usingComposite(async (ctx, input, invoke) => {
    // We invoke the List Posts operation to retrieve a list of posts
    const posts = await invoke(listPostsHandler)({});

    // We check if the List Posts operation was successful
    const postsValue = OperationHandlerResult.getSuccessfulValueOrFail(posts);
    // We iterate through the response array and strip out the ids
    const postsWithoutIds = postsValue.map((post) => {
      return {
        title: post.title,
        body: post.body,
      };
    });

    // We return the stripped down posts as successful
    return OperationHandlerResult.success({
      results: postsWithoutIds,
    });
  })
);
