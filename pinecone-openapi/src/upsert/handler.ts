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
          handler.usingHttp((http) =>
            http
              .post("https://controller.{environment}.pinecone.io/describe_index_stats")
              .handleRequest((ctx, input, request) => request.withBodyAsJson(_.pickBy({ filter: input.filter }, _.isUndefined)))
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
