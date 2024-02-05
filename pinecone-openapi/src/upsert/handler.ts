import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
        import { PineconeOpenapiAuth } from "../PineconeOpenapiAuth";
        import { UpsertInput } from "./input";
        import { UpsertOutput } from "./output";
        const _ = require("lodash");

        export const upsertHandler = OperationHandlerSetup.configureHandler<
          PineconeOpenapiAuth,
          UpsertInput,
          UpsertOutput
        >((handler) =>
            handler.addInputValidation((validation) =>
                validation
                    .condition((ctx) => ctx.auth?.user.api_key !== undefined)
                    .errorMessage(_ => 'Authorization is required')
            ).usingHttp((http) => http
              .post("https://api.pinecone.io/vectors/upsert")
              .handleRequest((ctx, input, request) => request
                .addHeader('Api-Key', `${ctx.auth!.user.api_key}`)
                .withBodyAsJson(_.pickBy({
                vectors: input.vectors,
                namespace: input.namespace,
             },_.isUndefined)))
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
