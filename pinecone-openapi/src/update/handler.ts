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
          handler.usingHttp((http) =>
            http
              .post("https://controller.{environment}.pinecone.io/update")
              .handleRequest((ctx, input, request) => request.withBodyAsJson(_.pickBy({ filter: input.filter }, _.isUndefined)))
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
