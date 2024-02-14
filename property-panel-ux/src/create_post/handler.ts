import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { PropertyPanelUxAuth } from '../PropertyPanelUxAuth';
import { CreatePostInput } from './input';
import { CreatePostOutput } from './output';

export const createPostHandler = OperationHandlerSetup.configureHandler<
	PropertyPanelUxAuth,
	CreatePostInput,
	CreatePostOutput
>((handler) =>
	handler.usingHttp((http) =>
		http
			.post('https://jsonplaceholder.typicode.com/posts')
			.handleRequest((ctx, input, request) =>  request.withBodyAsJson({
					title: input.title,
					body: input.body || '',
					owner: input.owner,
					userId: input.userId,
				})
			)
			.handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
	)
);
