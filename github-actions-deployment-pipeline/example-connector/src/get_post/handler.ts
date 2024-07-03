import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { ExampleConnectorAuth } from '../ExampleConnectorAuth';
import { GetPostInput } from './input';
import { GetPostOutput } from './output';

export const getPostHandler = OperationHandlerSetup.configureHandler<
	ExampleConnectorAuth,
	GetPostInput,
	GetPostOutput
>((handler) =>
	handler.usingHttp((http) =>
		http
			.get('https://jsonplaceholder.typicode.com/posts/:id')
			.handleRequest((ctx, input, request) =>
				request.addPathParameter('id', input.id.toString()).withoutBody()
			)
			.handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
	)
);
