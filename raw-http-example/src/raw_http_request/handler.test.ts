import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { rawHttpRequestHandler as rawHttpRequestHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';
import { HttpMethod, HttpRequestBodyType } from './input';

OperationHandlerTestSetup.configureHandlerTest(
  rawHttpRequestHandler,
  (handlerTest) =>
    handlerTest
      .usingHandlerContext('test')
      .nothingBeforeAll()
      .testCase('should do something', (testCase) =>
        testCase
          .givenNothing()
          .when(() => ({
            method: HttpMethod.GET,
            url: { fullUrl: 'https://jsonplaceholder.typicode.com/posts/1' },
            headers: {},
            queryParams: {},
            bodyType: HttpRequestBodyType.NONE,
            body: {},
          }))
          .then(({ output }) => {})
          .finallyDoNothing()
      )
      .nothingAfterAll()
);
