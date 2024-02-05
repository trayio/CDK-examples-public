import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { PineconeOpenapiAuth } from "../PineconeOpenapiAuth";
import { DeleteInput } from "./input";
import { DeleteOutput } from "./output";
const _ = require("lodash");

        export const deleteHandler = OperationHandlerSetup.configureHandler<
          PineconeOpenapiAuth,
          DeleteInput,
          DeleteOutput
        >((handler) =>
            handler.addInputValidation((validation) =>
                validation
                    .condition((ctx) => ctx.auth?.user.api_key !== undefined)
                    .errorMessage(_ => 'Authorization is required')
            ).usingHttp((http) => http
              .post("https://api.pinecone.io/vectors/delete")
              .handleRequest((ctx, input, request) => request
              .addHeader('Api-Key', `${ctx.auth!.user.api_key}`)
              .withBodyAsJson(_.pickBy({
                ids: input.ids,
                deleteAll: input.deleteAll,
                namespace: input.namespace,
                filter: input.filter,
            },_.isUndefined)))
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
