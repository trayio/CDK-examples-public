import { OperationGlobalConfigHttp } from "@trayio/cdk-dsl/connector/operation/OperationGlobalConfig";
import { ConnectorWithSubdomainExampleAuth } from "./ConnectorWithSubdomainExampleAuth";

/*
 * IMPORTANT NOTE: DO NOT DELETE THIS FILE
 * This is a global configuration that is used by all operations in the connector.
 * Update the <never> with the right Auth type of the connector.
 * Update the baseUrl to the base url of the API.
 * To configure the auth use the withBearerToken method or use addHeader method to add custom headers.
 *
 * IMPORTANT NOTE: Do not change the name of the variable `globalConfigHttp` as it is used by the internal Raw Http Operation.
 * You can ignore this configuration if you have disabled the Raw Http Operation in connector.json
 */
export const globalConfigHttp =
  OperationGlobalConfigHttp.create<ConnectorWithSubdomainExampleAuth>()
    .withBaseUrl((ctx) => {
      console.log({ ctx, json: JSON.stringify(ctx) });
      return `https://${ctx.auth?.user["#shop"]}.myshopify.com/admin/api/2024-04`;
    })
    .addHeader((ctx) => ({
      name: "X-Shopify-Access-Token",
      value: ctx.auth?.user.access_token,
    }));
