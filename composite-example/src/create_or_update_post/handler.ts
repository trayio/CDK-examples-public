import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import {
  OperationHandlerError,
  OperationHandlerResult,
} from "@trayio/cdk-dsl/connector/operation/OperationHandler";
import { CompositeExampleAuth } from "../CompositeExampleAuth";
import { CreateOrUpdatePostInput } from "./input";
import { CreateOrUpdatePostOutput } from "./output";
import axios, { AxiosResponse } from "axios";

const acceptedResponseCodes = [200, 201];

export const createOrUpdatePostHandler = OperationHandlerSetup.configureHandler<
  CompositeExampleAuth,
  CreateOrUpdatePostInput,
  CreateOrUpdatePostOutput
>((handler) =>
  handler.usingComposite(async (ctx, input, invoke) => {
    let response: AxiosResponse;
    // If the input has an id, we update the post
    if (input.id) {
      response = await axios({
        method: "put",
        url: `https://jsonplaceholder.typicode.com/posts/${input.id}`,
        data: JSON.stringify({
          title: input.title,
          body: input.body,
          userId: input.userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // If the input does not have an id, we create the post
    } else {
      response = await axios({
        method: "post",
        url: `https://jsonplaceholder.typicode.com/posts`,
        data: JSON.stringify({
          title: input.title,
          body: input.body,
          userId: input.userId,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
    }

    // If the response is an error, we return a connector error with a custom message
    if (!acceptedResponseCodes.includes(response.status)) {
      return OperationHandlerResult.failure(
        OperationHandlerError.connectorError(
          "There was an error creating/updating the post"
        )
      );
    }

    // If the response is successful, we return the response data
    return OperationHandlerResult.success(response.data);
  })
);
