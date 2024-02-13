import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { MultipartFileHandlingExampleAuth } from '../MultipartFileHandlingExampleAuth';
import { UploadImageInput } from './input';
import { UploadImageOutput } from './output';
import { randomUUID } from 'crypto';

export const uploadImageHandler =
	OperationHandlerSetup.configureHandler<
		MultipartFileHandlingExampleAuth,
		UploadImageInput,
		UploadImageOutput
	>((handler) =>
		handler.usingHttp((http) =>
			http
				.post('https://api.imgur.com/3/image')
				.handleRequest((ctx, input, request) => {
					if ('url' in input.source) {
						return request.withBearerToken(ctx.auth!.user.access_token)
							.withBodyAsMultipart({
								files: {},
								fields: {
									image: input.source.url,
									name: input.name || randomUUID(),
									title: <string>input.title,
									description: <string>input.description
								}
							})

					} else {
						return request.withBearerToken(ctx.auth!.user.access_token)
							.withBodyAsMultipart({
								files: {
									image: input.source.file
								},
								fields: {
									name: input.name || randomUUID(),
									title: <string>input.title,
									description: <string>input.description
								 }
							})
					}
				})

				.handleResponse((_ctx, _input, response) =>
					response.parseWithBodyAsJson()
				)
		)
	);
