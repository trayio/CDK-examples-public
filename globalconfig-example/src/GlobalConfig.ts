import { OperationGlobalConfigHttp } from "@trayio/cdk-dsl/connector/operation/OperationGlobalConfig";
import { GlobalConfigExampleAuth } from "./GlobalConfigExampleAuth";

export const globalConfig =
  OperationGlobalConfigHttp.create<GlobalConfigExampleAuth>()
    .withBaseUrl((ctx) => "https://slack.com/api")
    .withBearerToken((ctx) => ctx.auth?.user.access_token as string);
