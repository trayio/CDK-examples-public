import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
        import { PineconeOpenapiAuth } from "../PineconeOpenapiAuth";
        import { ListIndexesInput } from "./input";
        import { ListIndexesOutput } from "./output";
const _ = require("lodash");

        export const listIndexesHandler = OperationHandlerSetup.configureHandler<
          PineconeOpenapiAuth,
          ListIndexesInput,
          ListIndexesOutput
        >((handler) =>
          handler.usingHttp((http) =>
            http
              .get("https://controller.{environment}.pinecone.io/databases")
              .handleRequest((ctx, input, request) => request.withoutBody())
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
