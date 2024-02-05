import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
        import { PineconeOpenapiAuth } from "../PineconeOpenapiAuth";
        import { CreateIndexInput } from "./input";
        import { CreateIndexOutput } from "./output";
        const _ = require("lodash");

        export const createIndexHandler = OperationHandlerSetup.configureHandler<
          PineconeOpenapiAuth,
          CreateIndexInput,
          CreateIndexOutput
        >((handler) =>
          handler.addInputValidation((validation) =>
              validation
                  .condition((ctx) => ctx.auth?.user.api_key !== undefined)
                  .errorMessage(_ => 'Authorization is required')
          ).usingHttp((http) => http
              .post("https://api.pinecone.io/databases")
              .handleRequest((ctx, input, request) => request
              .addHeader('Api-Key', `${ctx.auth!.user.api_key}`)
              .withBodyAsJson(_.pickBy({
                name: input.name,
                dimension: input.dimension,
                metric: input.metric,
                pods: input.pods,
                replicas: input.replicas,
                pod_type: input.pod_type,
                metadata_config: input.metadata_config,
                source_collection: input.source_collection
            },_.isUndefined)))
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
