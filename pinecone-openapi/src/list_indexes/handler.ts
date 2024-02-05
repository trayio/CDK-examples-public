import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
        import { PineconeOpenapiAuth } from "../PineconeOpenapiAuth";
        import { ListIndexesInput } from "./input";
        import { ListIndexesOutput } from "./output";

        export const listIndexesHandler = OperationHandlerSetup.configureHandler<
          PineconeOpenapiAuth,
          ListIndexesInput,
          ListIndexesOutput
        >((handler) =>
            handler
                .addInputValidation((validation) =>
                    validation
                        .condition((ctx) => ctx.auth?.user.api_key !== undefined)
                        .errorMessage(_ => 'Authorization is required')
                ).usingHttp((http) => http
              .get("https://api.pinecone.io/indexes")
              .handleRequest((ctx, input, request) => request.addHeader('Api-Key', `${ctx.auth!.user.api_key}`).withoutBody())
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
