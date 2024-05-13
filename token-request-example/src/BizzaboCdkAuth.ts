import { Oauth2ClientCredentialsOperationHandlerAuth } from '@trayio/cdk-dsl/connector/operation/OperationHandler';

export type UserAuth = {
    access_token: string
}

export type AppAuth = {
    client_id: string
    client_secret: string
    account_id: string
}

export type BizzaboCdkAuth = Oauth2ClientCredentialsOperationHandlerAuth<UserAuth, AppAuth>;