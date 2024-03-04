import { OperationGlobalConfigHttp } from "@trayio/cdk-dsl/connector/operation/OperationGlobalConfig";
import { GlobalConfigExampleAuth } from "./GlobalConfigExampleAuth";

export const globalConfigHttp =
  OperationGlobalConfigHttp.create<GlobalConfigExampleAuth>()
    .withBaseUrl((ctx) => `https://slack.com/api/`)
    .withBearerToken((ctx) => ctx.auth?.user.access_token as string)
    .addHeader((ctx) => ({ name: "Content-Type", value: "application/json" }));
