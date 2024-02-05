import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
        import { PineconeOpenapiAuth } from "../PineconeOpenapiAuth";
        import { CreateCollectionInput } from "./input";
        import { CreateCollectionOutput } from "./output";

        export const createCollectionHandler = OperationHandlerSetup.configureHandler<
          PineconeOpenapiAuth,
          CreateCollectionInput,
          CreateCollectionOutput
        >((handler) =>
          handler.usingHttp((http) =>
            http
              .post("https://controller.{environment}.pinecone.io/collections")
              .handleRequest((ctx, input, request) => request.withBodyAsJson({ name: input.name,source: input.source }))
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );