import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { FileHandlingExampleAuth } from "../FileHandlingExampleAuth";
import { DownloadFileInput } from "./input";
import { DownloadFileOutput } from "./output";
import { OperationHandlerResult } from "@trayio/cdk-dsl/connector/operation/OperationHandler";

export const downloadFileHandler = OperationHandlerSetup.configureHandler<
	FileHandlingExampleAuth,
	DownloadFileInput,
	DownloadFileOutput
	>((handler) =>
		handler.usingHttp((http) =>
			http
				.get(
					"https://content.dropboxapi.com/2/files/download"
				)
				.handleRequest((ctx, input, request) =>
					request
						.withBearerToken(ctx.auth!.user.access_token)
						.addHeader(
							"Dropbox-API-Arg",
							JSON.stringify({
								path: input.file_path,
							})
						).withoutBody())
				.handleResponse((_ctx, _input, response) =>
					response.parseWithBodyAsFile<DownloadFileOutput["file"]>((file) =>
						OperationHandlerResult.success({ file })
					)
				)
		)
	);
