import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { FileHandlingExampleAuth } from "../FileHandlingExampleAuth";
import { DownloadFileFromUrlInput } from "./input";
import { DownloadFileFromUrlOutput } from "./output";
import {
  FileReference,
  OperationHandlerError,
  OperationHandlerResult,
} from "@trayio/cdk-dsl/connector/operation/OperationHandler";

export const downloadFileFromUrlHandler =
  OperationHandlerSetup.configureHandler<
    FileHandlingExampleAuth,
    DownloadFileFromUrlInput,
    DownloadFileFromUrlOutput
  >((handler) =>
    handler.usingHttp((http) =>
      http
        .get("")
        .handleRequest((ctx, input, request) =>
          request.withUrl(input.file_url).withoutBody()
        )
        .handleResponse((ctx, input, response) => {
          return response
            .withErrorHandling(() => {
              return OperationHandlerResult.failure(
                OperationHandlerError.connectorError(
                  `Failed to download file from URL: ${input.file_url}`,
                  {
                    statusCode: response.getStatusCode(),
                    headers: response.getHeaders(),
                  }
                )
              );
            })
            .parseWithBodyAsFile((file: FileReference) => {
              return OperationHandlerResult.success({ file });
            });
        })
    )
  );
