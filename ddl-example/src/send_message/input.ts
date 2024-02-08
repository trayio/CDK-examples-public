export type SendMessageInput = {
  /**
   * @title Channels
   * @description The channel to send a message to
   * @lookupOperation list_channels_ddl
   * @lookupInput {}
   * @lookupAuthRequired true
   */
  channel: string;
  /**
   * @title Message
   * @description The message to send
   */
  text: string;
};
