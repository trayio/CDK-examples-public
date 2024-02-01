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
			.handleRequest((ctx, input, request) => {

				const thing = request.withBodyAsJson({
					title: input.title,
					body: input.body,
					userId: input.userId,
				});
				console.log(thing);
				return thing;
			}
			)
			.handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
	)
);
