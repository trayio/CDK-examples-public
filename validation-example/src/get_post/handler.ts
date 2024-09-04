import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { ValidationExampleAuth } from '../ValidationExampleAuth';
import { GetPostInput } from './input';
import { GetPostOutput } from './output';
import { globalConfigHttp } from '../GlobalConfig';
import { isValidEmail } from '../utils/isValidEmail';

export const getPostHandler = OperationHandlerSetup.configureHandler<
	ValidationExampleAuth,
	GetPostInput,
	GetPostOutput
>((handler) =>
	handler
		// Validate that the id is greater than 0
		.addInputValidation((validation) =>
			validation
				.condition((ctx, input) => input.id > 0)
				.errorMessage((ctx, input) => 'id must be greater than 0')
		)
		// Validate that the id is an integer
		.addInputValidation((validation) =>
			validation
				.condition((ctx, input) => Number.isInteger(input.id))
				.errorMessage((ctx, input) => 'id must be an integer')
		)
		// Use a custom validation function to validate the email format, which can be reused across multiple operations
		.addInputValidation((validation) => isValidEmail(validation))
		.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
			http
				.get('/posts/:id')
				.handleRequest((ctx, input, request) =>
					request.addPathParameter('id', input.id.toString()).withoutBody()
				)
				.handleResponse((ctx, input, response) => response.parseWithBodyAsJson())
		)
);
