export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
}

export enum HttpRequestBodyType {
  RAW = 'raw',
  FORM_DATA = 'form-data',
  FORM_URL_ENCODED = 'form-url-encoded',
  BINARY = 'binary',
  NONE = 'none',
}

/**
 * @title Endpoint
 */
export type Endpoint = {
  /**
   * @title Endpoint
   * @description The endpoint to call in relation to the base URL used by the connector. E.g: '/department/marketing/employees'.
   */
  endpoint: string;
};

/**
 * @title Full URL
 */
export type FullUrl = {
  /**
   * @title Full URL
   * @description The full URL to make the request against. Must begin with `http://` or `https://`.
   */
  fullUrl: string;
};

export type RawHttpRequestInput = {
  /**
   * @title Method
   * @description The HTTP verb to perform the request with.
   * @default GET
   */
  method: HttpMethod;

  /**
   * @title URL
   * @description The URL to make the request with.
   */
  url: Endpoint | FullUrl;

  /**
   * @title Headers
   * @description Headers to include in the request.
   */
  headers?: object;

  /**
   * @title Query Params
   * @description Query parameters to be supplied with the request.
   */
  queryParams?: object;

  /**
   * @title Body Type
   * @description The body of the request.
   */
  bodyType: HttpRequestBodyType;

  /**
   * @title Body
   * @description The body of the request.
   */
  body?: object;
};
