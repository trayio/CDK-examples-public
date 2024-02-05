import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
        import { PineconeOpenapiAuth } from "../PineconeOpenapiAuth";
        import { FetchInput } from "./input";
        import { FetchOutput } from "./output";
        const _ = require("lodash");

        export const fetchHandler = OperationHandlerSetup.configureHandler<
          PineconeOpenapiAuth,
          FetchInput,
          FetchOutput
        >((handler) =>
            handler.addInputValidation((validation) =>
                validation
                    .condition((ctx) => ctx.auth?.user.api_key !== undefined)
                    .errorMessage(_ => 'Authorization is required')
            ).usingHttp((http) => http
              .get("https://api.pinecone.io/vectors/fetch")
              .handleRequest((ctx, input, request) => request.addHeader('Api-Key', `${ctx.auth!.user.api_key}`).withBodyAsJson(_.pickBy({
                ids: input.ids,
                namespace: input.namespace,
            },_.isUndefined)))
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
