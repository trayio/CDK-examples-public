import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { OperationHandlerResult } from "@trayio/cdk-dsl/connector/operation/OperationHandler";
import { MultipartFileHandlingExampleAuth } from "../MultipartFileHandlingExampleAuth";
import { DownloadImageInput } from "./input";
import { DownloadImageOutput } from "./output";
import { globalConfigHttp } from "../GlobalConfig";

export const downloadImageHandler = OperationHandlerSetup.configureHandler<
  MultipartFileHandlingExampleAuth,
  DownloadImageInput,
  DownloadImageOutput
>((handler) =>
  handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
    http
      .get("/3/image/:image_hash")
      .handleRequest((_ctx, input, request) =>
        request.addPathParameter("image_hash", input.image_hash).withoutBody()
      )
      .handleResponse((_ctx, _input, response) =>
        response.parseWithBodyAsFile<DownloadImageOutput["file"]>((file) =>
          OperationHandlerResult.success({ file })
        )
      )
  )
);
