import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { PineconeOpenapiAuth } from "../PineconeOpenapiAuth";
import { QueryInput } from "./input";
import { QueryOutput } from "./output";
const _ = require("lodash");

export const queryHandler = OperationHandlerSetup.configureHandler<
    PineconeOpenapiAuth,
    QueryInput,
    QueryOutput
>((handler) =>
    handler.usingHttp((http) =>
        http
        .post("https://controller.{environment}.pinecone.io/query")
        .handleRequest((ctx, input, request) => request.withBodyAsJson(_.pickBy({ filter: input.filter }, _.isUndefined)))
        .handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
    )
);
