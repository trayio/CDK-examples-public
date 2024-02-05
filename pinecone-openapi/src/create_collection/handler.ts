import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
        import { PineconeOpenapiAuth } from "../PineconeOpenapiAuth";
        import { CreateCollectionInput } from "./input";
        import { CreateCollectionOutput } from "./output";
        const _ = require("lodash");

        export const createCollectionHandler = OperationHandlerSetup.configureHandler<
          PineconeOpenapiAuth,
          CreateCollectionInput,
          CreateCollectionOutput
        >((handler) =>
            handler.addInputValidation((validation) =>
                validation
                    .condition((ctx) => ctx.auth?.user.api_key !== undefined)
                    .errorMessage(_ => 'Authorization is required')
            ).usingHttp((http) => http
              .post("https://api.pinecone.io/collections")
              .handleRequest((ctx, input, request) => request
              .addHeader('Api-Key', `${ctx.auth!.user.api_key}`)
              .withBodyAsJson(_.pickBy({
                name: input.name,
                source: input.source
            },_.isUndefined)))
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
