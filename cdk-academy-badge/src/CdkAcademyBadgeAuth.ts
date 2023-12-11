import { TokenOperationHandlerAuth } from "@trayio/cdk-dsl/connector/operation/OperationHandler";

export type UserAuth = {
    access_token: string, //you can call this property anything e.g. token, auth_token etc.
}
  
export type AppAuth = {
    //OAuth app credentials
}
  
export type CdkAcademyBadgeAuth = TokenOperationHandlerAuth<UserAuth, AppAuth>