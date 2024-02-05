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
          handler.usingHttp((http) =>
            http
              .post("https://controller.{environment}.pinecone.io/describe_index_stats")
              .handleRequest((ctx, input, request) => request.withBodyAsJson(_.pickBy({ filter: input.filter }, _.isUndefined)))
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
