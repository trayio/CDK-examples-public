import { OperationHandlerSetup } from "@trayio/cdk-dsl/connector/operation/OperationHandlerSetup";
import { SmessTestSlackAuth } from "../SmessTestSlackAuth";
import { ListChannelsDdlInput } from "./input";
import { ListChannelsDdlOutput } from "./output";
import {
  OperationHandlerError,
  OperationHandlerResult,
} from "@trayio/cdk-dsl/connector/operation/OperationHandler";
import { listChannelsHandler } from "../list_channels/handler";

export const listChannelsDdlHandler = OperationHandlerSetup.configureHandler<
  SmessTestSlackAuth,
  ListChannelsDdlInput,
  ListChannelsDdlOutput
>((handler) =>
  handler.usingComposite(async (_ctx, _input, invoke) => {
    const listChannelsResult = await invoke(listChannelsHandler)({
      dummy: true,
    });

    if (listChannelsResult.isFailure) {
      return listChannelsResult;
    }

    const channelName = listChannelsResult.value.channels.map((channel) => {
      return {
        text: channel.name,
        value: channel.id,
      };
    });

    return OperationHandlerResult.success({
      result: channelName,
    });
  })
);
