import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
        import { PineconeOpenapiAuth } from "../PineconeOpenapiAuth";
        import { UpdateInput } from "./input";
        import { UpdateOutput } from "./output";
        const _ = require("lodash");

        export const updateHandler = OperationHandlerSetup.configureHandler<
          PineconeOpenapiAuth,
          UpdateInput,
          UpdateOutput
        >((handler) =>
            handler.addInputValidation((validation) =>
                validation
                    .condition((ctx) => ctx.auth?.user.api_key !== undefined)
                    .errorMessage(_ => 'Authorization is required')
            ).usingHttp((http) => http
              .post("https://api.pinecone.io/vectors/update")
              .handleRequest((ctx, input, request) => request
              .addHeader('Api-Key', `${ctx.auth!.user.api_key}`)
              .withBodyAsJson(_.pickBy({
                id: input.id,
                values: input.values,
                sparseValues: input.sparseValues,
                setMetadata: input.setMetadata,
                namespace: input.namespace,
            },_.isUndefined)))
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
