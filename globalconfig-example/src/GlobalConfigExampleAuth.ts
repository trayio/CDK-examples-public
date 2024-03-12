import { Oauth2OperationHandlerAuth } from '@trayio/cdk-dsl/connector/operation/OperationHandler';

export type TestSlackUserAuth = {
    access_token: string
    scopes: string[]
}

export type TestSlackAppAuth = {
    client_id: string
    client_secret: string
}

export type GlobalConfigExampleAuth = Oauth2OperationHandlerAuth<TestSlackUserAuth, TestSlackAppAuth>
