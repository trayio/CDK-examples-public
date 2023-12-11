import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { CdkAcademyBadgeAuth } from '../CdkAcademyBadgeAuth'
import { GetRecordsInput } from './input'
import { GetRecordsOutput } from './output'

export const getRecordsHandler = 
    OperationHandlerSetup.configureHandler<CdkAcademyBadgeAuth, GetRecordsInput, GetRecordsOutput>((handler) =>
        handler.usingHttp((http) =>
			//CDK_TEST_URL can be obtained from 'https://academy.tray.io/badges/htsvpmuEBA8B31h4sP8CPX/coding-the-handler/7o6z5s5Lmd8PWkL2zzPdCY'
            http.get('https://{CDK_TEST_URL}/:record_type') 
            .handleRequest((ctx, input, request) => {
                //log the API request to console before sending
                console.log(request.withBearerToken(ctx.auth!.user.access_token)) 
                return request
                    //simple token-based auth
                    .withBearerToken(ctx.auth!.user.access_token)
                    //path parameter code
                    .addPathParameter('record_type', input.record_type)
										//we must declare the body of the request even if it is blank
									  .withoutBody()

            })
            .handleResponse((ctx, input, response) => {
                //log the API response to the console
                console.log(response) 
                return response
                    .parseWithBodyAsJson()
            }
            )
    )
);