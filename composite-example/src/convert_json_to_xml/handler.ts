import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { OperationHandlerResult } from "@trayio/cdk-dsl/connector/operation/OperationHandler";
import { CompositeExampleAuth } from "../CompositeExampleAuth";
import { ConvertJsonToXmlInput } from "./input";
import { ConvertJsonToXmlOutput } from "./output";
import * as xml from "xml-js";

export const listPostsHandler = OperationHandlerSetup.configureHandler<
  CompositeExampleAuth,
  ConvertJsonToXmlInput,
  ConvertJsonToXmlOutput
>((handler) =>
  handler.usingComposite(async (ctx, input, invoke) => {
    // We use the xml-js library to convert the JSON string to an XML string
    const xmlData = xml.json2xml(input.json, { compact: true, spaces: 4 });

    return OperationHandlerResult.success({
      output: xmlData,
    });
  })
);
