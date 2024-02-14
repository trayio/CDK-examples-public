import { Oauth2OperationHandlerAuth } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
export type UserAuth = {
    access_token: string
}

export type FileHandlingExampleAuth = Oauth2OperationHandlerAuth<UserAuth, {}>;
