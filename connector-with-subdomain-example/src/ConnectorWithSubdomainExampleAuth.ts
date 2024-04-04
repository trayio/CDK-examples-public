import { Oauth2OperationHandlerAuth } from "@trayio/cdk-dsl/connector/operation/OperationHandler";

export type ShopifyUserAuth = {
  access_token: string;
  "#shop": string;
};

export type ConnectorWithSubdomainExampleAuth = Oauth2OperationHandlerAuth<
  ShopifyUserAuth,
  never
>;
