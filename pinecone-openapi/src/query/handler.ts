import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
        import { PineconeOpenapiAuth } from "../PineconeOpenapiAuth";
        import { QueryInput } from "./input";
        import { QueryOutput } from "./output";
        const _ = require("lodash");

        export const queryHandler = OperationHandlerSetup.configureHandler<
          PineconeOpenapiAuth,
          QueryInput,
          QueryOutput
        >((handler) =>
            handler.addInputValidation((validation) =>
                validation
                    .condition((ctx) => ctx.auth?.user.api_key !== undefined)
                    .errorMessage(_ => 'Authorization is required')
            ).usingHttp((http) => http
              .post("https://api.pinecone.io/query")
              .handleRequest((ctx, input, request) => request
              .addHeader('Api-Key', `${ctx.auth!.user.api_key}`)
              .withBodyAsJson(_.pickBy({
                namespace: input.namespace,
                topK: input.topK,
                filter: input.filter,
                includeValues: input.includeValues,
                includeMetadata: input.includeMetadata,
                vector: input.vector,
                sparseVector: input.sparseVector,
                id: input.id,
            },_.isUndefined)))
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
