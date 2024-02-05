import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { PineconeOpenapiAuth } from '../PineconeOpenapiAuth';
import { ListVectorsInput } from './input';
import { ListVectorsOutput } from './output';

export const listVectorsHandler =
	OperationHandlerSetup.configureHandler<
		PineconeOpenapiAuth,
		ListVectorsInput,
		ListVectorsOutput
	>((handler) =>
		handler.addInputValidation((validation) =>
			validation
				.condition((ctx) => ctx.auth?.user.api_key !== undefined)
				.errorMessage(_ => 'Authorization is required')
		).usingHttp((http) => http
				.get('https://api.pinecone.io/vectors/list')
				.handleRequest((ctx, input, request) =>
					request
                    .addHeader('Api-Key', `${ctx.auth!.user.api_key}`)
                    .addPathParameter('id', input.id.toString()).withoutBody()
				)
				.handleResponse((ctx, input, response) =>
					response.parseWithBodyAsJson()
				)
		)
	);
