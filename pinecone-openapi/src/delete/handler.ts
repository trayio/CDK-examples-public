import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { PineconeOpenapiAuth } from "../PineconeOpenapiAuth";
import {DeleteInput} from "./input";
import { DeleteOutput } from "./output";
const _ = require("lodash");

export const deleteHandler = OperationHandlerSetup.configureHandler<
          PineconeOpenapiAuth,
    DeleteInput,
          DeleteOutput
        >((handler) =>
          handler.usingHttp((http) =>
            http
              .delete("https://controller.{environment}.pinecone.io/databases")
              .handleRequest((ctx, input, request) => request.withBodyAsJson(_.pickBy({
                  ids: input.ids,
                  deleteAll: input.deleteAll,
                  namespace: input.namespace, }, _.isUndefined)))
              .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
          )
        );
