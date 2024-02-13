import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { MultipartFileHandlingExampleAuth } from '../MultipartFileHandlingExampleAuth';
import { DownloadImageInput } from './input';
import { DownloadImageOutput } from './output';

export const downloadImageHandler =
	OperationHandlerSetup.configureHandler<
		MultipartFileHandlingExampleAuth,
		DownloadImageInput,
		DownloadImageOutput
	>((handler) =>
		handler.usingHttp((http) =>
			http
				.get('https://api.imgur.com/3/image/:image_hash')
				.handleRequest((ctx, input, request) =>
					request
					.withBearerToken(ctx.auth!.user.access_token)
					.addPathParameter('image_hash', input.image_hash)
					.withoutBody()
				)
				.handleResponse((_ctx, _input, response) =>
					response.parseWithBodyAsFile<DownloadImageOutput['file']>(
						(file) => OperationHandlerResult.success({ file })
					)
				)
		)
	);
