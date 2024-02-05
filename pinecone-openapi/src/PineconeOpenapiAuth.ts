import { TokenOperationHandlerAuth } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
export type UserAuth = {
    api_key: string;
};
export type AppAuth = {};
export type PineconeOpenapiAuth = TokenOperationHandlerAuth<UserAuth, AppAuth>;
