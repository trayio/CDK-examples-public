import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
        import { PineconeOpenapiAuth } from "../PineconeOpenapiAuth";
        import { DescribeIndexStatsInput } from "./input";
        import { DescribeIndexStatsOutput } from "./output";
        const _ = require("lodash");

        export const describeIndexStatsHandler = OperationHandlerSetup.configureHandler<
          PineconeOpenapiAuth,
          DescribeIndexStatsInput,
          DescribeIndexStatsOutput
        >((handler) =>
            handler.addInputValidation((validation) =>
                validation
                    .condition((ctx) => ctx.auth?.user.api_key !== undefined)
                    .errorMessage(_ => 'Authorization is required')
            ).usingHttp((http) => http
              .post("https://api.pinecone.io/describe_index_stats")
              .handleRequest((ctx, input, request) => request
                .addHeader('Api-Key', `${ctx.auth!.user.api_key}`)
                .withBodyAsJson(_.pickBy({ filter: input.filter },_.isUndefined)))
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
