import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { OperationHandlerResult } from "@trayio/cdk-dsl/connector/operation/OperationHandler";
import { CompositeExampleAuth } from "../CompositeExampleAuth";
import { GenerateSha256HashInput } from "./input";
import { GenerateSha256HashOutput } from "./output";
import * as crypto from "node:crypto";

export const generateSha256HashHandler = OperationHandlerSetup.configureHandler<
  CompositeExampleAuth,
  GenerateSha256HashInput,
  GenerateSha256HashOutput
>((handler) =>
  handler.usingComposite(async (ctx, input, invoke) => {
    // hash the input value using sha256
    const hashedValue = crypto
      .createHash("sha256")
      .update(input.value)
      .digest("hex");

    // return the input and the hashed value
    return OperationHandlerResult.success({
      input: input.value,
      output: hashedValue,
    });
  })
);
