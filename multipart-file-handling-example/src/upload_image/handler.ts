import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { MultipartFileHandlingExampleAuth } from "../MultipartFileHandlingExampleAuth";
import { UploadImageInput } from "./input";
import { UploadImageOutput } from "./output";
import { randomUUID } from "crypto";
import { globalConfigHttp } from "../GlobalConfig";

export const uploadImageHandler = OperationHandlerSetup.configureHandler<
  MultipartFileHandlingExampleAuth,
  UploadImageInput,
  UploadImageOutput
>((handler) =>
  handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
    http
      .post("/3/image")
      .handleRequest((ctx, input, request) => {
        if ("url" in input.source) {
          return request.withBodyAsMultipart({
            files: {},
            fields: {
              image: input.source.url,
              name: input.name || randomUUID(),
              title: <string>input.title,
              description: <string>input.description,
            },
          });
        } else {
          return request.withBodyAsMultipart({
            files: {
              image: input.source.file,
            },
            fields: {
              name: input.name || randomUUID(),
              title: <string>input.title,
              description: <string>input.description,
            },
          });
        }
      })

      .handleResponse((_ctx, _input, response) =>
        response.parseWithBodyAsJson()
      )
  )
);
