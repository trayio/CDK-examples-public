import { Oauth2OperationHandlerAuth } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
export type UserAuth = {
    access_token: string
}

export type MultipartFileHandlingExampleAuth = Oauth2OperationHandlerAuth<UserAuth, {}>;
