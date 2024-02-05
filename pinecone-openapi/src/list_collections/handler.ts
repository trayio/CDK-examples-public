import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { PineconeOpenapiAuth } from "../PineconeOpenapiAuth";
import { ListCollectionsInput } from "./input";
import { ListCollectionsOutput } from "./output";
const _ = require("lodash");

export const listCollectionsHandler =
    OperationHandlerSetup.configureHandler<
          PineconeOpenapiAuth,
          ListCollectionsInput,
          ListCollectionsOutput
        >((handler) =>
          handler
              .addInputValidation((validation) =>
                  validation
                      .condition((ctx) => ctx.auth?.user.api_key !== undefined)
                      .errorMessage(_ => 'Authorization is required')
              ).usingHttp((http) =>
            http
              .get("https://api.pinecone.io/collections")
              .handleRequest((ctx, input, request) => request.addHeader('api-key', `${ctx.auth!.user.api_key}`).withoutBody())
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
