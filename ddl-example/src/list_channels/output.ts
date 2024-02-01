type Channel = {
  id: string;
  name: string;
};

export type ListChannelsOutput = {
  ok: boolean;
  channels: Channel[];
};
