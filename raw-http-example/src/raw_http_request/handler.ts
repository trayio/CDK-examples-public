import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import {
  OperationHandlerError,
  OperationHandlerResult,
} from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import axios, { AxiosRequestConfig } from 'axios';
import { RawHttpExampleAuth } from '../RawHttpExampleAuth';
import { RawHttpRequestInput } from './input';
import { RawHttpRequestOutput } from './output';

export const rawHttpRequestHandler = OperationHandlerSetup.configureHandler<
  RawHttpExampleAuth,
  RawHttpRequestInput,
  RawHttpRequestOutput
>((handler) =>
  handler.usingComposite(async (ctx, input, invoke) => {
    const { method, url, headers, queryParams, bodyType, body } = input;

    const headersForAxios = Object.entries(headers ?? {}).reduce<
      Record<string, string>
    >((acc, [key, value]) => {
      const newValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      return {
        ...acc,
        [key.toLowerCase()]: newValue,
      };
    }, {});

    let urlString: string;
    if ('fullUrl' in url) {
      urlString = url.fullUrl;
    } else if ('endpoint' in url) {
      urlString = url.endpoint;
    } else {
      throw new Error('URL is required.');
    }

    const axiosConfig: AxiosRequestConfig = {
      method,
      url: urlString,
      headers: headersForAxios,
      params: queryParams,
      data: body,
    };

    try {
      const response = await axios(axiosConfig);

      console.log('response', response);

      return OperationHandlerResult.success({
        status: response.status,
        headers: response.headers,
        body: response.data,
      });
    } catch (error) {
      return OperationHandlerResult.failure(
        OperationHandlerError.apiError((error as Error).message)
      );
    }
  })
);
