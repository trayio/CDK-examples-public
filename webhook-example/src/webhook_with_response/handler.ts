import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup'
import { MyTriggerAuth } from '../MyTriggerAuth'
import { WebhookWithResponseInput } from './input'
import { WebhookWithResponseOutput } from './output'
import {
  OperationHandlerError,
  OperationHandlerResult,
  TriggerOperationHttpResponse,
} from '@trayio/cdk-dsl/connector/operation/OperationHandler'
import { WebhookWithResponseResponse } from './response'

/*
 *  These handlers belong to the same trigger operation, they are regular handlers so they can add validation checks
 *  and use any of the available implementations (http or composite as of now), the only constraint is that operation name needs to be the same in all of them
 */

export const webhookCreateHandler = OperationHandlerSetup.configureTriggerCreateHandler<
  MyTriggerAuth,
  WebhookWithResponseInput
>((handler) =>
  handler.usingComposite(async (auth, input, invoke) =>
    OperationHandlerResult.success({}),
  ),
)
export const webhookDestroyHandler = OperationHandlerSetup.configureTriggerDestroyHandler<
  MyTriggerAuth,
  WebhookWithResponseInput
>((handler) =>
  handler.usingComposite(async (auth, input, invoke) =>
    OperationHandlerResult.success({}),
  ),
)

export const webhookRequestHandler = OperationHandlerSetup.configureTriggerRequestHandler<
  MyTriggerAuth,
  WebhookWithResponseInput,
  WebhookWithResponseOutput
>((handler) =>
  handler.usingComposite(async (auth, { input, request }, invoke) => {
    /*
     * This is the _request operation, it parses the webhook callback and return a parsed output or an error, including an error type that will skip the execution of a workflow
     *
     * It takes a value that has two fields, "input" of type "SimpleWebhookWithResponseInput" (the input schema of this trigger) and "request" of type "TriggerOperationHttpRequest" which represents the http
     * request we received from trigger ingestion service (replacement of sniper), that type is generic, so it is the same for all triggers that have a _request operation
     *
     * The output also has two fields "output" of type "SimpleWebhookWithResponseOutput" (the output schema of this trigger) and "response" of type "TriggerOperationHttpResponse" which represents the http
     * response that we'll send back to the webhook callback, this type is also generic and shared by all triggers.
     *
     * This operation can return generic errors and also a "skip trigger error" that will cause the WF not to be executed
     */

    if (!request.hasLargeBody) {
      //if the body is not big, we have it as a string, otherwise we have a "body_url" property, this is typed using a union type
      return OperationHandlerResult.success({
        output: {
          method: request.method,
          path: request.path,
          body: request.body,
          query: request.query,
          headers: request.headers,
        },
        response: TriggerOperationHttpResponse.withStatusCode(200), //this is the response that will be sent to the webhook unless this trigger is request_response
      })
    }

    //We can send a response to the webhook with errors too
    const errorResponse = TriggerOperationHttpResponse.withStatusCode(200)
    return OperationHandlerResult.failure(
      OperationHandlerError.skipTriggerError('body is too big', errorResponse),
    )
  }),
)

export const webhookResponseHandler = OperationHandlerSetup.configureTriggerResponseHandler<
  MyTriggerAuth,
  WebhookWithResponseInput,
  WebhookWithResponseResponse
>((handler) =>
  handler.usingComposite(async (auth, { input, response }, invoke) => {
    return OperationHandlerResult.success(
      TriggerOperationHttpResponse.withStatusCodeAndBody(
        200,
        JSON.stringify({
          message: response.message,
          ack: response.ack,
        }),
      ),
    )
  }),
)
