import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { FileHandlingExampleAuth } from "../FileHandlingExampleAuth";
import { UploadFileToFilebinInput } from "./input";
import { FileBinApiResponse, UploadFileToFilebinOutput } from "./output";
import {
  OperationHandlerError,
  OperationHandlerResult,
} from "@trayio/cdk-dsl/connector/operation/OperationHandler";

export const FILE_BIN_UPLOAD_BASE_URL = "https://filebin.net/3wiztthj1e3h29l6/";

export const uploadFileToFilebinHandler =
  OperationHandlerSetup.configureHandler<
    FileHandlingExampleAuth,
    UploadFileToFilebinInput,
    UploadFileToFilebinOutput
  >((handler) =>
    handler.usingHttp((http) =>
      http
        .post("https://jsonplaceholder.typicode.com/todos/:id")
        .handleRequest((ctx, input, request) => {
          return request
            .withUrl(`${FILE_BIN_UPLOAD_BASE_URL}${input.file.name}`)
            .addHeader("Content-Length", "1000000")
            .withBodyAsFile(input.file);
        })
        .handleResponse((ctx, input, response) =>
          response
            .withErrorHandling(() => {
              return OperationHandlerResult.failure(
                OperationHandlerError.connectorError(
                  "Failed to upload file to Filebin",
                  {
                    statusCode: response.getStatusCode(),
                    headers: response.getHeaders(),
                  }
                )
              );
            })
            .parseWithBodyAsJson<FileBinApiResponse>((body) => {
              return OperationHandlerResult.success({
                file: {
                  url: FILE_BIN_UPLOAD_BASE_URL + body.file.filename,
                  name: body.file.filename,
                  mime_type: body.file["content-type"],
                  expires: 0,
                },
              });
            })
        )
    )
  );
