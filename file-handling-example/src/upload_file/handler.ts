import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { FileHandlingExampleAuth } from "../FileHandlingExampleAuth";
import { UploadFileInput } from "./input";
import { UploadFileOutput } from "./output";

export const uploadFileHandler = OperationHandlerSetup.configureHandler<
	FileHandlingExampleAuth,
	UploadFileInput,
	UploadFileOutput
	>((handler) =>
		handler.usingHttp((http) =>
			http
				.post("https://content.dropboxapi.com/2/files/upload")
				.handleRequest((ctx, input, request) =>
					request
						.withBearerToken(ctx.auth!.user.access_token)
						.addHeader(
							"Dropbox-API-Arg",
							JSON.stringify({
								path: input.file_path,
								mode: "add",
								autorename: true,
								mute: false,
								strict_conflict: false,
							})
						)
						.withBodyAsFile(input.file)
				)
				.handleResponse((_ctx, _input, response) => response.parseWithBodyAsJson())
		)
	);
