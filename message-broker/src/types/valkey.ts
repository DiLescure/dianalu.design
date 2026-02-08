export interface SocketMapping {
  socketId: string;
  channelUid: string;
  threadUid: string;
  subscribedAt: number;
}

export interface ChannelMapping {
  channelUid: string;
  threadUid: string;
  sockets: string[];
}
