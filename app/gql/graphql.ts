/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type Access = {
  __typename?: 'Access';
  agentMessages?: Maybe<AgentMessagesAccess>;
  agents?: Maybe<AgentsAccess>;
  canAccessAdmin: Scalars['Boolean']['output'];
  channels?: Maybe<ChannelsAccess>;
  docsMockData?: Maybe<DocsMockDataAccess>;
  media?: Maybe<MediaAccess>;
  modelDefinitions?: Maybe<ModelDefinitionsAccess>;
  payload_kv?: Maybe<Payload_KvAccess>;
  payload_locked_documents?: Maybe<Payload_Locked_DocumentsAccess>;
  payload_preferences?: Maybe<Payload_PreferencesAccess>;
  threads?: Maybe<ThreadsAccess>;
  userMessages?: Maybe<UserMessagesAccess>;
  users?: Maybe<UsersAccess>;
};

export type Agent = {
  __typename?: 'Agent';
  agentModel: ModelDefinition;
  agentName: Scalars['String']['output'];
  agentSystemMessage: Scalars['String']['output'];
  agentUid: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AgentMessage = {
  __typename?: 'AgentMessage';
  channel: Channel;
  channelUid: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  messageContent: Scalars['JSON']['output'];
  messageUid?: Maybe<Scalars['String']['output']>;
  originatorUser: User;
  originatorUserUid?: Maybe<Scalars['String']['output']>;
  recipientType: AgentMessage_RecipientType;
  recipientUid?: Maybe<Scalars['String']['output']>;
  senderAgent: Agent;
  senderAgentUid?: Maybe<Scalars['String']['output']>;
  thread: Thread;
  threadUid: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum AgentMessageUpdate_RecipientType_MutationInput {
  Agent = 'agent',
  Broadcast = 'broadcast',
  User = 'user'
}

export type AgentMessage_ChannelUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AgentMessage_Channel_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type AgentMessage_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AgentMessage_DeletedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AgentMessage_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type AgentMessage_MessageContent_Operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  intersects?: InputMaybe<Scalars['JSON']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  within?: InputMaybe<Scalars['JSON']['input']>;
};

export type AgentMessage_MessageUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AgentMessage_OriginatorUserUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AgentMessage_OriginatorUser_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export enum AgentMessage_RecipientType {
  Agent = 'agent',
  Broadcast = 'broadcast',
  User = 'user'
}

export enum AgentMessage_RecipientType_Input {
  Agent = 'agent',
  Broadcast = 'broadcast',
  User = 'user'
}

export enum AgentMessage_RecipientType_MutationInput {
  Agent = 'agent',
  Broadcast = 'broadcast',
  User = 'user'
}

export type AgentMessage_RecipientType_Operator = {
  all?: InputMaybe<Array<InputMaybe<AgentMessage_RecipientType_Input>>>;
  equals?: InputMaybe<AgentMessage_RecipientType_Input>;
  in?: InputMaybe<Array<InputMaybe<AgentMessage_RecipientType_Input>>>;
  not_equals?: InputMaybe<AgentMessage_RecipientType_Input>;
  not_in?: InputMaybe<Array<InputMaybe<AgentMessage_RecipientType_Input>>>;
};

export type AgentMessage_RecipientUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AgentMessage_SenderAgentUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AgentMessage_SenderAgent_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type AgentMessage_ThreadUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AgentMessage_Thread_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type AgentMessage_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AgentMessage_Where = {
  AND?: InputMaybe<Array<InputMaybe<AgentMessage_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<AgentMessage_Where_Or>>>;
  channel?: InputMaybe<AgentMessage_Channel_Operator>;
  channelUid?: InputMaybe<AgentMessage_ChannelUid_Operator>;
  createdAt?: InputMaybe<AgentMessage_CreatedAt_Operator>;
  deletedAt?: InputMaybe<AgentMessage_DeletedAt_Operator>;
  id?: InputMaybe<AgentMessage_Id_Operator>;
  messageContent?: InputMaybe<AgentMessage_MessageContent_Operator>;
  messageUid?: InputMaybe<AgentMessage_MessageUid_Operator>;
  originatorUser?: InputMaybe<AgentMessage_OriginatorUser_Operator>;
  originatorUserUid?: InputMaybe<AgentMessage_OriginatorUserUid_Operator>;
  recipientType?: InputMaybe<AgentMessage_RecipientType_Operator>;
  recipientUid?: InputMaybe<AgentMessage_RecipientUid_Operator>;
  senderAgent?: InputMaybe<AgentMessage_SenderAgent_Operator>;
  senderAgentUid?: InputMaybe<AgentMessage_SenderAgentUid_Operator>;
  thread?: InputMaybe<AgentMessage_Thread_Operator>;
  threadUid?: InputMaybe<AgentMessage_ThreadUid_Operator>;
  updatedAt?: InputMaybe<AgentMessage_UpdatedAt_Operator>;
};

export type AgentMessage_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<AgentMessage_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<AgentMessage_Where_Or>>>;
  channel?: InputMaybe<AgentMessage_Channel_Operator>;
  channelUid?: InputMaybe<AgentMessage_ChannelUid_Operator>;
  createdAt?: InputMaybe<AgentMessage_CreatedAt_Operator>;
  deletedAt?: InputMaybe<AgentMessage_DeletedAt_Operator>;
  id?: InputMaybe<AgentMessage_Id_Operator>;
  messageContent?: InputMaybe<AgentMessage_MessageContent_Operator>;
  messageUid?: InputMaybe<AgentMessage_MessageUid_Operator>;
  originatorUser?: InputMaybe<AgentMessage_OriginatorUser_Operator>;
  originatorUserUid?: InputMaybe<AgentMessage_OriginatorUserUid_Operator>;
  recipientType?: InputMaybe<AgentMessage_RecipientType_Operator>;
  recipientUid?: InputMaybe<AgentMessage_RecipientUid_Operator>;
  senderAgent?: InputMaybe<AgentMessage_SenderAgent_Operator>;
  senderAgentUid?: InputMaybe<AgentMessage_SenderAgentUid_Operator>;
  thread?: InputMaybe<AgentMessage_Thread_Operator>;
  threadUid?: InputMaybe<AgentMessage_ThreadUid_Operator>;
  updatedAt?: InputMaybe<AgentMessage_UpdatedAt_Operator>;
};

export type AgentMessage_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<AgentMessage_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<AgentMessage_Where_Or>>>;
  channel?: InputMaybe<AgentMessage_Channel_Operator>;
  channelUid?: InputMaybe<AgentMessage_ChannelUid_Operator>;
  createdAt?: InputMaybe<AgentMessage_CreatedAt_Operator>;
  deletedAt?: InputMaybe<AgentMessage_DeletedAt_Operator>;
  id?: InputMaybe<AgentMessage_Id_Operator>;
  messageContent?: InputMaybe<AgentMessage_MessageContent_Operator>;
  messageUid?: InputMaybe<AgentMessage_MessageUid_Operator>;
  originatorUser?: InputMaybe<AgentMessage_OriginatorUser_Operator>;
  originatorUserUid?: InputMaybe<AgentMessage_OriginatorUserUid_Operator>;
  recipientType?: InputMaybe<AgentMessage_RecipientType_Operator>;
  recipientUid?: InputMaybe<AgentMessage_RecipientUid_Operator>;
  senderAgent?: InputMaybe<AgentMessage_SenderAgent_Operator>;
  senderAgentUid?: InputMaybe<AgentMessage_SenderAgentUid_Operator>;
  thread?: InputMaybe<AgentMessage_Thread_Operator>;
  threadUid?: InputMaybe<AgentMessage_ThreadUid_Operator>;
  updatedAt?: InputMaybe<AgentMessage_UpdatedAt_Operator>;
};

export type AgentMessages = {
  __typename?: 'AgentMessages';
  docs: Array<AgentMessage>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type AgentMessagesCreateAccess = {
  __typename?: 'AgentMessagesCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentMessagesCreateDocAccess = {
  __typename?: 'AgentMessagesCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentMessagesDeleteAccess = {
  __typename?: 'AgentMessagesDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentMessagesDeleteDocAccess = {
  __typename?: 'AgentMessagesDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentMessagesDocAccessFields = {
  __typename?: 'AgentMessagesDocAccessFields';
  channel?: Maybe<AgentMessagesDocAccessFields_Channel>;
  channelUid?: Maybe<AgentMessagesDocAccessFields_ChannelUid>;
  createdAt?: Maybe<AgentMessagesDocAccessFields_CreatedAt>;
  deletedAt?: Maybe<AgentMessagesDocAccessFields_DeletedAt>;
  messageContent?: Maybe<AgentMessagesDocAccessFields_MessageContent>;
  messageUid?: Maybe<AgentMessagesDocAccessFields_MessageUid>;
  originatorUser?: Maybe<AgentMessagesDocAccessFields_OriginatorUser>;
  originatorUserUid?: Maybe<AgentMessagesDocAccessFields_OriginatorUserUid>;
  recipientType?: Maybe<AgentMessagesDocAccessFields_RecipientType>;
  recipientUid?: Maybe<AgentMessagesDocAccessFields_RecipientUid>;
  senderAgent?: Maybe<AgentMessagesDocAccessFields_SenderAgent>;
  senderAgentUid?: Maybe<AgentMessagesDocAccessFields_SenderAgentUid>;
  thread?: Maybe<AgentMessagesDocAccessFields_Thread>;
  threadUid?: Maybe<AgentMessagesDocAccessFields_ThreadUid>;
  updatedAt?: Maybe<AgentMessagesDocAccessFields_UpdatedAt>;
};

export type AgentMessagesDocAccessFields_Channel = {
  __typename?: 'AgentMessagesDocAccessFields_channel';
  create?: Maybe<AgentMessagesDocAccessFields_Channel_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_Channel_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_Channel_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_Channel_Update>;
};

export type AgentMessagesDocAccessFields_ChannelUid = {
  __typename?: 'AgentMessagesDocAccessFields_channelUid';
  create?: Maybe<AgentMessagesDocAccessFields_ChannelUid_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_ChannelUid_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_ChannelUid_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_ChannelUid_Update>;
};

export type AgentMessagesDocAccessFields_ChannelUid_Create = {
  __typename?: 'AgentMessagesDocAccessFields_channelUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_ChannelUid_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_channelUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_ChannelUid_Read = {
  __typename?: 'AgentMessagesDocAccessFields_channelUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_ChannelUid_Update = {
  __typename?: 'AgentMessagesDocAccessFields_channelUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_Channel_Create = {
  __typename?: 'AgentMessagesDocAccessFields_channel_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_Channel_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_channel_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_Channel_Read = {
  __typename?: 'AgentMessagesDocAccessFields_channel_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_Channel_Update = {
  __typename?: 'AgentMessagesDocAccessFields_channel_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_CreatedAt = {
  __typename?: 'AgentMessagesDocAccessFields_createdAt';
  create?: Maybe<AgentMessagesDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_CreatedAt_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_CreatedAt_Update>;
};

export type AgentMessagesDocAccessFields_CreatedAt_Create = {
  __typename?: 'AgentMessagesDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_CreatedAt_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_CreatedAt_Read = {
  __typename?: 'AgentMessagesDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_CreatedAt_Update = {
  __typename?: 'AgentMessagesDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_DeletedAt = {
  __typename?: 'AgentMessagesDocAccessFields_deletedAt';
  create?: Maybe<AgentMessagesDocAccessFields_DeletedAt_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_DeletedAt_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_DeletedAt_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_DeletedAt_Update>;
};

export type AgentMessagesDocAccessFields_DeletedAt_Create = {
  __typename?: 'AgentMessagesDocAccessFields_deletedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_DeletedAt_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_deletedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_DeletedAt_Read = {
  __typename?: 'AgentMessagesDocAccessFields_deletedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_DeletedAt_Update = {
  __typename?: 'AgentMessagesDocAccessFields_deletedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_MessageContent = {
  __typename?: 'AgentMessagesDocAccessFields_messageContent';
  create?: Maybe<AgentMessagesDocAccessFields_MessageContent_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_MessageContent_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_MessageContent_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_MessageContent_Update>;
};

export type AgentMessagesDocAccessFields_MessageContent_Create = {
  __typename?: 'AgentMessagesDocAccessFields_messageContent_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_MessageContent_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_messageContent_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_MessageContent_Read = {
  __typename?: 'AgentMessagesDocAccessFields_messageContent_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_MessageContent_Update = {
  __typename?: 'AgentMessagesDocAccessFields_messageContent_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_MessageUid = {
  __typename?: 'AgentMessagesDocAccessFields_messageUid';
  create?: Maybe<AgentMessagesDocAccessFields_MessageUid_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_MessageUid_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_MessageUid_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_MessageUid_Update>;
};

export type AgentMessagesDocAccessFields_MessageUid_Create = {
  __typename?: 'AgentMessagesDocAccessFields_messageUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_MessageUid_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_messageUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_MessageUid_Read = {
  __typename?: 'AgentMessagesDocAccessFields_messageUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_MessageUid_Update = {
  __typename?: 'AgentMessagesDocAccessFields_messageUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_OriginatorUser = {
  __typename?: 'AgentMessagesDocAccessFields_originatorUser';
  create?: Maybe<AgentMessagesDocAccessFields_OriginatorUser_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_OriginatorUser_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_OriginatorUser_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_OriginatorUser_Update>;
};

export type AgentMessagesDocAccessFields_OriginatorUserUid = {
  __typename?: 'AgentMessagesDocAccessFields_originatorUserUid';
  create?: Maybe<AgentMessagesDocAccessFields_OriginatorUserUid_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_OriginatorUserUid_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_OriginatorUserUid_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_OriginatorUserUid_Update>;
};

export type AgentMessagesDocAccessFields_OriginatorUserUid_Create = {
  __typename?: 'AgentMessagesDocAccessFields_originatorUserUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_OriginatorUserUid_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_originatorUserUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_OriginatorUserUid_Read = {
  __typename?: 'AgentMessagesDocAccessFields_originatorUserUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_OriginatorUserUid_Update = {
  __typename?: 'AgentMessagesDocAccessFields_originatorUserUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_OriginatorUser_Create = {
  __typename?: 'AgentMessagesDocAccessFields_originatorUser_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_OriginatorUser_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_originatorUser_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_OriginatorUser_Read = {
  __typename?: 'AgentMessagesDocAccessFields_originatorUser_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_OriginatorUser_Update = {
  __typename?: 'AgentMessagesDocAccessFields_originatorUser_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_RecipientType = {
  __typename?: 'AgentMessagesDocAccessFields_recipientType';
  create?: Maybe<AgentMessagesDocAccessFields_RecipientType_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_RecipientType_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_RecipientType_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_RecipientType_Update>;
};

export type AgentMessagesDocAccessFields_RecipientType_Create = {
  __typename?: 'AgentMessagesDocAccessFields_recipientType_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_RecipientType_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_recipientType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_RecipientType_Read = {
  __typename?: 'AgentMessagesDocAccessFields_recipientType_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_RecipientType_Update = {
  __typename?: 'AgentMessagesDocAccessFields_recipientType_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_RecipientUid = {
  __typename?: 'AgentMessagesDocAccessFields_recipientUid';
  create?: Maybe<AgentMessagesDocAccessFields_RecipientUid_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_RecipientUid_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_RecipientUid_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_RecipientUid_Update>;
};

export type AgentMessagesDocAccessFields_RecipientUid_Create = {
  __typename?: 'AgentMessagesDocAccessFields_recipientUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_RecipientUid_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_recipientUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_RecipientUid_Read = {
  __typename?: 'AgentMessagesDocAccessFields_recipientUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_RecipientUid_Update = {
  __typename?: 'AgentMessagesDocAccessFields_recipientUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_SenderAgent = {
  __typename?: 'AgentMessagesDocAccessFields_senderAgent';
  create?: Maybe<AgentMessagesDocAccessFields_SenderAgent_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_SenderAgent_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_SenderAgent_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_SenderAgent_Update>;
};

export type AgentMessagesDocAccessFields_SenderAgentUid = {
  __typename?: 'AgentMessagesDocAccessFields_senderAgentUid';
  create?: Maybe<AgentMessagesDocAccessFields_SenderAgentUid_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_SenderAgentUid_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_SenderAgentUid_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_SenderAgentUid_Update>;
};

export type AgentMessagesDocAccessFields_SenderAgentUid_Create = {
  __typename?: 'AgentMessagesDocAccessFields_senderAgentUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_SenderAgentUid_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_senderAgentUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_SenderAgentUid_Read = {
  __typename?: 'AgentMessagesDocAccessFields_senderAgentUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_SenderAgentUid_Update = {
  __typename?: 'AgentMessagesDocAccessFields_senderAgentUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_SenderAgent_Create = {
  __typename?: 'AgentMessagesDocAccessFields_senderAgent_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_SenderAgent_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_senderAgent_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_SenderAgent_Read = {
  __typename?: 'AgentMessagesDocAccessFields_senderAgent_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_SenderAgent_Update = {
  __typename?: 'AgentMessagesDocAccessFields_senderAgent_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_Thread = {
  __typename?: 'AgentMessagesDocAccessFields_thread';
  create?: Maybe<AgentMessagesDocAccessFields_Thread_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_Thread_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_Thread_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_Thread_Update>;
};

export type AgentMessagesDocAccessFields_ThreadUid = {
  __typename?: 'AgentMessagesDocAccessFields_threadUid';
  create?: Maybe<AgentMessagesDocAccessFields_ThreadUid_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_ThreadUid_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_ThreadUid_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_ThreadUid_Update>;
};

export type AgentMessagesDocAccessFields_ThreadUid_Create = {
  __typename?: 'AgentMessagesDocAccessFields_threadUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_ThreadUid_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_threadUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_ThreadUid_Read = {
  __typename?: 'AgentMessagesDocAccessFields_threadUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_ThreadUid_Update = {
  __typename?: 'AgentMessagesDocAccessFields_threadUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_Thread_Create = {
  __typename?: 'AgentMessagesDocAccessFields_thread_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_Thread_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_thread_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_Thread_Read = {
  __typename?: 'AgentMessagesDocAccessFields_thread_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_Thread_Update = {
  __typename?: 'AgentMessagesDocAccessFields_thread_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_UpdatedAt = {
  __typename?: 'AgentMessagesDocAccessFields_updatedAt';
  create?: Maybe<AgentMessagesDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<AgentMessagesDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<AgentMessagesDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<AgentMessagesDocAccessFields_UpdatedAt_Update>;
};

export type AgentMessagesDocAccessFields_UpdatedAt_Create = {
  __typename?: 'AgentMessagesDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'AgentMessagesDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_UpdatedAt_Read = {
  __typename?: 'AgentMessagesDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesDocAccessFields_UpdatedAt_Update = {
  __typename?: 'AgentMessagesDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields = {
  __typename?: 'AgentMessagesFields';
  channel?: Maybe<AgentMessagesFields_Channel>;
  channelUid?: Maybe<AgentMessagesFields_ChannelUid>;
  createdAt?: Maybe<AgentMessagesFields_CreatedAt>;
  deletedAt?: Maybe<AgentMessagesFields_DeletedAt>;
  messageContent?: Maybe<AgentMessagesFields_MessageContent>;
  messageUid?: Maybe<AgentMessagesFields_MessageUid>;
  originatorUser?: Maybe<AgentMessagesFields_OriginatorUser>;
  originatorUserUid?: Maybe<AgentMessagesFields_OriginatorUserUid>;
  recipientType?: Maybe<AgentMessagesFields_RecipientType>;
  recipientUid?: Maybe<AgentMessagesFields_RecipientUid>;
  senderAgent?: Maybe<AgentMessagesFields_SenderAgent>;
  senderAgentUid?: Maybe<AgentMessagesFields_SenderAgentUid>;
  thread?: Maybe<AgentMessagesFields_Thread>;
  threadUid?: Maybe<AgentMessagesFields_ThreadUid>;
  updatedAt?: Maybe<AgentMessagesFields_UpdatedAt>;
};

export type AgentMessagesFields_Channel = {
  __typename?: 'AgentMessagesFields_channel';
  create?: Maybe<AgentMessagesFields_Channel_Create>;
  delete?: Maybe<AgentMessagesFields_Channel_Delete>;
  read?: Maybe<AgentMessagesFields_Channel_Read>;
  update?: Maybe<AgentMessagesFields_Channel_Update>;
};

export type AgentMessagesFields_ChannelUid = {
  __typename?: 'AgentMessagesFields_channelUid';
  create?: Maybe<AgentMessagesFields_ChannelUid_Create>;
  delete?: Maybe<AgentMessagesFields_ChannelUid_Delete>;
  read?: Maybe<AgentMessagesFields_ChannelUid_Read>;
  update?: Maybe<AgentMessagesFields_ChannelUid_Update>;
};

export type AgentMessagesFields_ChannelUid_Create = {
  __typename?: 'AgentMessagesFields_channelUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_ChannelUid_Delete = {
  __typename?: 'AgentMessagesFields_channelUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_ChannelUid_Read = {
  __typename?: 'AgentMessagesFields_channelUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_ChannelUid_Update = {
  __typename?: 'AgentMessagesFields_channelUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_Channel_Create = {
  __typename?: 'AgentMessagesFields_channel_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_Channel_Delete = {
  __typename?: 'AgentMessagesFields_channel_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_Channel_Read = {
  __typename?: 'AgentMessagesFields_channel_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_Channel_Update = {
  __typename?: 'AgentMessagesFields_channel_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_CreatedAt = {
  __typename?: 'AgentMessagesFields_createdAt';
  create?: Maybe<AgentMessagesFields_CreatedAt_Create>;
  delete?: Maybe<AgentMessagesFields_CreatedAt_Delete>;
  read?: Maybe<AgentMessagesFields_CreatedAt_Read>;
  update?: Maybe<AgentMessagesFields_CreatedAt_Update>;
};

export type AgentMessagesFields_CreatedAt_Create = {
  __typename?: 'AgentMessagesFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_CreatedAt_Delete = {
  __typename?: 'AgentMessagesFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_CreatedAt_Read = {
  __typename?: 'AgentMessagesFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_CreatedAt_Update = {
  __typename?: 'AgentMessagesFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_DeletedAt = {
  __typename?: 'AgentMessagesFields_deletedAt';
  create?: Maybe<AgentMessagesFields_DeletedAt_Create>;
  delete?: Maybe<AgentMessagesFields_DeletedAt_Delete>;
  read?: Maybe<AgentMessagesFields_DeletedAt_Read>;
  update?: Maybe<AgentMessagesFields_DeletedAt_Update>;
};

export type AgentMessagesFields_DeletedAt_Create = {
  __typename?: 'AgentMessagesFields_deletedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_DeletedAt_Delete = {
  __typename?: 'AgentMessagesFields_deletedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_DeletedAt_Read = {
  __typename?: 'AgentMessagesFields_deletedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_DeletedAt_Update = {
  __typename?: 'AgentMessagesFields_deletedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_MessageContent = {
  __typename?: 'AgentMessagesFields_messageContent';
  create?: Maybe<AgentMessagesFields_MessageContent_Create>;
  delete?: Maybe<AgentMessagesFields_MessageContent_Delete>;
  read?: Maybe<AgentMessagesFields_MessageContent_Read>;
  update?: Maybe<AgentMessagesFields_MessageContent_Update>;
};

export type AgentMessagesFields_MessageContent_Create = {
  __typename?: 'AgentMessagesFields_messageContent_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_MessageContent_Delete = {
  __typename?: 'AgentMessagesFields_messageContent_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_MessageContent_Read = {
  __typename?: 'AgentMessagesFields_messageContent_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_MessageContent_Update = {
  __typename?: 'AgentMessagesFields_messageContent_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_MessageUid = {
  __typename?: 'AgentMessagesFields_messageUid';
  create?: Maybe<AgentMessagesFields_MessageUid_Create>;
  delete?: Maybe<AgentMessagesFields_MessageUid_Delete>;
  read?: Maybe<AgentMessagesFields_MessageUid_Read>;
  update?: Maybe<AgentMessagesFields_MessageUid_Update>;
};

export type AgentMessagesFields_MessageUid_Create = {
  __typename?: 'AgentMessagesFields_messageUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_MessageUid_Delete = {
  __typename?: 'AgentMessagesFields_messageUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_MessageUid_Read = {
  __typename?: 'AgentMessagesFields_messageUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_MessageUid_Update = {
  __typename?: 'AgentMessagesFields_messageUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_OriginatorUser = {
  __typename?: 'AgentMessagesFields_originatorUser';
  create?: Maybe<AgentMessagesFields_OriginatorUser_Create>;
  delete?: Maybe<AgentMessagesFields_OriginatorUser_Delete>;
  read?: Maybe<AgentMessagesFields_OriginatorUser_Read>;
  update?: Maybe<AgentMessagesFields_OriginatorUser_Update>;
};

export type AgentMessagesFields_OriginatorUserUid = {
  __typename?: 'AgentMessagesFields_originatorUserUid';
  create?: Maybe<AgentMessagesFields_OriginatorUserUid_Create>;
  delete?: Maybe<AgentMessagesFields_OriginatorUserUid_Delete>;
  read?: Maybe<AgentMessagesFields_OriginatorUserUid_Read>;
  update?: Maybe<AgentMessagesFields_OriginatorUserUid_Update>;
};

export type AgentMessagesFields_OriginatorUserUid_Create = {
  __typename?: 'AgentMessagesFields_originatorUserUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_OriginatorUserUid_Delete = {
  __typename?: 'AgentMessagesFields_originatorUserUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_OriginatorUserUid_Read = {
  __typename?: 'AgentMessagesFields_originatorUserUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_OriginatorUserUid_Update = {
  __typename?: 'AgentMessagesFields_originatorUserUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_OriginatorUser_Create = {
  __typename?: 'AgentMessagesFields_originatorUser_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_OriginatorUser_Delete = {
  __typename?: 'AgentMessagesFields_originatorUser_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_OriginatorUser_Read = {
  __typename?: 'AgentMessagesFields_originatorUser_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_OriginatorUser_Update = {
  __typename?: 'AgentMessagesFields_originatorUser_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_RecipientType = {
  __typename?: 'AgentMessagesFields_recipientType';
  create?: Maybe<AgentMessagesFields_RecipientType_Create>;
  delete?: Maybe<AgentMessagesFields_RecipientType_Delete>;
  read?: Maybe<AgentMessagesFields_RecipientType_Read>;
  update?: Maybe<AgentMessagesFields_RecipientType_Update>;
};

export type AgentMessagesFields_RecipientType_Create = {
  __typename?: 'AgentMessagesFields_recipientType_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_RecipientType_Delete = {
  __typename?: 'AgentMessagesFields_recipientType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_RecipientType_Read = {
  __typename?: 'AgentMessagesFields_recipientType_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_RecipientType_Update = {
  __typename?: 'AgentMessagesFields_recipientType_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_RecipientUid = {
  __typename?: 'AgentMessagesFields_recipientUid';
  create?: Maybe<AgentMessagesFields_RecipientUid_Create>;
  delete?: Maybe<AgentMessagesFields_RecipientUid_Delete>;
  read?: Maybe<AgentMessagesFields_RecipientUid_Read>;
  update?: Maybe<AgentMessagesFields_RecipientUid_Update>;
};

export type AgentMessagesFields_RecipientUid_Create = {
  __typename?: 'AgentMessagesFields_recipientUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_RecipientUid_Delete = {
  __typename?: 'AgentMessagesFields_recipientUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_RecipientUid_Read = {
  __typename?: 'AgentMessagesFields_recipientUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_RecipientUid_Update = {
  __typename?: 'AgentMessagesFields_recipientUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_SenderAgent = {
  __typename?: 'AgentMessagesFields_senderAgent';
  create?: Maybe<AgentMessagesFields_SenderAgent_Create>;
  delete?: Maybe<AgentMessagesFields_SenderAgent_Delete>;
  read?: Maybe<AgentMessagesFields_SenderAgent_Read>;
  update?: Maybe<AgentMessagesFields_SenderAgent_Update>;
};

export type AgentMessagesFields_SenderAgentUid = {
  __typename?: 'AgentMessagesFields_senderAgentUid';
  create?: Maybe<AgentMessagesFields_SenderAgentUid_Create>;
  delete?: Maybe<AgentMessagesFields_SenderAgentUid_Delete>;
  read?: Maybe<AgentMessagesFields_SenderAgentUid_Read>;
  update?: Maybe<AgentMessagesFields_SenderAgentUid_Update>;
};

export type AgentMessagesFields_SenderAgentUid_Create = {
  __typename?: 'AgentMessagesFields_senderAgentUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_SenderAgentUid_Delete = {
  __typename?: 'AgentMessagesFields_senderAgentUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_SenderAgentUid_Read = {
  __typename?: 'AgentMessagesFields_senderAgentUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_SenderAgentUid_Update = {
  __typename?: 'AgentMessagesFields_senderAgentUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_SenderAgent_Create = {
  __typename?: 'AgentMessagesFields_senderAgent_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_SenderAgent_Delete = {
  __typename?: 'AgentMessagesFields_senderAgent_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_SenderAgent_Read = {
  __typename?: 'AgentMessagesFields_senderAgent_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_SenderAgent_Update = {
  __typename?: 'AgentMessagesFields_senderAgent_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_Thread = {
  __typename?: 'AgentMessagesFields_thread';
  create?: Maybe<AgentMessagesFields_Thread_Create>;
  delete?: Maybe<AgentMessagesFields_Thread_Delete>;
  read?: Maybe<AgentMessagesFields_Thread_Read>;
  update?: Maybe<AgentMessagesFields_Thread_Update>;
};

export type AgentMessagesFields_ThreadUid = {
  __typename?: 'AgentMessagesFields_threadUid';
  create?: Maybe<AgentMessagesFields_ThreadUid_Create>;
  delete?: Maybe<AgentMessagesFields_ThreadUid_Delete>;
  read?: Maybe<AgentMessagesFields_ThreadUid_Read>;
  update?: Maybe<AgentMessagesFields_ThreadUid_Update>;
};

export type AgentMessagesFields_ThreadUid_Create = {
  __typename?: 'AgentMessagesFields_threadUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_ThreadUid_Delete = {
  __typename?: 'AgentMessagesFields_threadUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_ThreadUid_Read = {
  __typename?: 'AgentMessagesFields_threadUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_ThreadUid_Update = {
  __typename?: 'AgentMessagesFields_threadUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_Thread_Create = {
  __typename?: 'AgentMessagesFields_thread_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_Thread_Delete = {
  __typename?: 'AgentMessagesFields_thread_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_Thread_Read = {
  __typename?: 'AgentMessagesFields_thread_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_Thread_Update = {
  __typename?: 'AgentMessagesFields_thread_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_UpdatedAt = {
  __typename?: 'AgentMessagesFields_updatedAt';
  create?: Maybe<AgentMessagesFields_UpdatedAt_Create>;
  delete?: Maybe<AgentMessagesFields_UpdatedAt_Delete>;
  read?: Maybe<AgentMessagesFields_UpdatedAt_Read>;
  update?: Maybe<AgentMessagesFields_UpdatedAt_Update>;
};

export type AgentMessagesFields_UpdatedAt_Create = {
  __typename?: 'AgentMessagesFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_UpdatedAt_Delete = {
  __typename?: 'AgentMessagesFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_UpdatedAt_Read = {
  __typename?: 'AgentMessagesFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesFields_UpdatedAt_Update = {
  __typename?: 'AgentMessagesFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentMessagesReadAccess = {
  __typename?: 'AgentMessagesReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentMessagesReadDocAccess = {
  __typename?: 'AgentMessagesReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentMessagesUpdateAccess = {
  __typename?: 'AgentMessagesUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentMessagesUpdateDocAccess = {
  __typename?: 'AgentMessagesUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentRequestMetrics = {
  __typename?: 'AgentRequestMetrics';
  failed: Scalars['Int']['output'];
  processed: Scalars['Int']['output'];
  successRate: Scalars['Float']['output'];
};

export type Agent_AgentModel_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Agent_AgentName_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Agent_AgentSystemMessage_Operator = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
};

export type Agent_AgentUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Agent_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Agent_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type Agent_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Agent_Where = {
  AND?: InputMaybe<Array<InputMaybe<Agent_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Agent_Where_Or>>>;
  agentModel?: InputMaybe<Agent_AgentModel_Operator>;
  agentName?: InputMaybe<Agent_AgentName_Operator>;
  agentSystemMessage?: InputMaybe<Agent_AgentSystemMessage_Operator>;
  agentUid?: InputMaybe<Agent_AgentUid_Operator>;
  createdAt?: InputMaybe<Agent_CreatedAt_Operator>;
  id?: InputMaybe<Agent_Id_Operator>;
  updatedAt?: InputMaybe<Agent_UpdatedAt_Operator>;
};

export type Agent_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Agent_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Agent_Where_Or>>>;
  agentModel?: InputMaybe<Agent_AgentModel_Operator>;
  agentName?: InputMaybe<Agent_AgentName_Operator>;
  agentSystemMessage?: InputMaybe<Agent_AgentSystemMessage_Operator>;
  agentUid?: InputMaybe<Agent_AgentUid_Operator>;
  createdAt?: InputMaybe<Agent_CreatedAt_Operator>;
  id?: InputMaybe<Agent_Id_Operator>;
  updatedAt?: InputMaybe<Agent_UpdatedAt_Operator>;
};

export type Agent_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Agent_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Agent_Where_Or>>>;
  agentModel?: InputMaybe<Agent_AgentModel_Operator>;
  agentName?: InputMaybe<Agent_AgentName_Operator>;
  agentSystemMessage?: InputMaybe<Agent_AgentSystemMessage_Operator>;
  agentUid?: InputMaybe<Agent_AgentUid_Operator>;
  createdAt?: InputMaybe<Agent_CreatedAt_Operator>;
  id?: InputMaybe<Agent_Id_Operator>;
  updatedAt?: InputMaybe<Agent_UpdatedAt_Operator>;
};

export type Agents = {
  __typename?: 'Agents';
  docs: Array<Agent>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type AgentsCreateAccess = {
  __typename?: 'AgentsCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentsCreateDocAccess = {
  __typename?: 'AgentsCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentsDeleteAccess = {
  __typename?: 'AgentsDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentsDeleteDocAccess = {
  __typename?: 'AgentsDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentsDocAccessFields = {
  __typename?: 'AgentsDocAccessFields';
  agentModel?: Maybe<AgentsDocAccessFields_AgentModel>;
  agentName?: Maybe<AgentsDocAccessFields_AgentName>;
  agentSystemMessage?: Maybe<AgentsDocAccessFields_AgentSystemMessage>;
  agentUid?: Maybe<AgentsDocAccessFields_AgentUid>;
  createdAt?: Maybe<AgentsDocAccessFields_CreatedAt>;
  updatedAt?: Maybe<AgentsDocAccessFields_UpdatedAt>;
};

export type AgentsDocAccessFields_AgentModel = {
  __typename?: 'AgentsDocAccessFields_agentModel';
  create?: Maybe<AgentsDocAccessFields_AgentModel_Create>;
  delete?: Maybe<AgentsDocAccessFields_AgentModel_Delete>;
  read?: Maybe<AgentsDocAccessFields_AgentModel_Read>;
  update?: Maybe<AgentsDocAccessFields_AgentModel_Update>;
};

export type AgentsDocAccessFields_AgentModel_Create = {
  __typename?: 'AgentsDocAccessFields_agentModel_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentModel_Delete = {
  __typename?: 'AgentsDocAccessFields_agentModel_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentModel_Read = {
  __typename?: 'AgentsDocAccessFields_agentModel_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentModel_Update = {
  __typename?: 'AgentsDocAccessFields_agentModel_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentName = {
  __typename?: 'AgentsDocAccessFields_agentName';
  create?: Maybe<AgentsDocAccessFields_AgentName_Create>;
  delete?: Maybe<AgentsDocAccessFields_AgentName_Delete>;
  read?: Maybe<AgentsDocAccessFields_AgentName_Read>;
  update?: Maybe<AgentsDocAccessFields_AgentName_Update>;
};

export type AgentsDocAccessFields_AgentName_Create = {
  __typename?: 'AgentsDocAccessFields_agentName_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentName_Delete = {
  __typename?: 'AgentsDocAccessFields_agentName_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentName_Read = {
  __typename?: 'AgentsDocAccessFields_agentName_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentName_Update = {
  __typename?: 'AgentsDocAccessFields_agentName_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentSystemMessage = {
  __typename?: 'AgentsDocAccessFields_agentSystemMessage';
  create?: Maybe<AgentsDocAccessFields_AgentSystemMessage_Create>;
  delete?: Maybe<AgentsDocAccessFields_AgentSystemMessage_Delete>;
  read?: Maybe<AgentsDocAccessFields_AgentSystemMessage_Read>;
  update?: Maybe<AgentsDocAccessFields_AgentSystemMessage_Update>;
};

export type AgentsDocAccessFields_AgentSystemMessage_Create = {
  __typename?: 'AgentsDocAccessFields_agentSystemMessage_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentSystemMessage_Delete = {
  __typename?: 'AgentsDocAccessFields_agentSystemMessage_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentSystemMessage_Read = {
  __typename?: 'AgentsDocAccessFields_agentSystemMessage_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentSystemMessage_Update = {
  __typename?: 'AgentsDocAccessFields_agentSystemMessage_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentUid = {
  __typename?: 'AgentsDocAccessFields_agentUid';
  create?: Maybe<AgentsDocAccessFields_AgentUid_Create>;
  delete?: Maybe<AgentsDocAccessFields_AgentUid_Delete>;
  read?: Maybe<AgentsDocAccessFields_AgentUid_Read>;
  update?: Maybe<AgentsDocAccessFields_AgentUid_Update>;
};

export type AgentsDocAccessFields_AgentUid_Create = {
  __typename?: 'AgentsDocAccessFields_agentUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentUid_Delete = {
  __typename?: 'AgentsDocAccessFields_agentUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentUid_Read = {
  __typename?: 'AgentsDocAccessFields_agentUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_AgentUid_Update = {
  __typename?: 'AgentsDocAccessFields_agentUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_CreatedAt = {
  __typename?: 'AgentsDocAccessFields_createdAt';
  create?: Maybe<AgentsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<AgentsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<AgentsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<AgentsDocAccessFields_CreatedAt_Update>;
};

export type AgentsDocAccessFields_CreatedAt_Create = {
  __typename?: 'AgentsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'AgentsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_CreatedAt_Read = {
  __typename?: 'AgentsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_CreatedAt_Update = {
  __typename?: 'AgentsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_UpdatedAt = {
  __typename?: 'AgentsDocAccessFields_updatedAt';
  create?: Maybe<AgentsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<AgentsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<AgentsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<AgentsDocAccessFields_UpdatedAt_Update>;
};

export type AgentsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'AgentsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'AgentsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'AgentsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'AgentsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields = {
  __typename?: 'AgentsFields';
  agentModel?: Maybe<AgentsFields_AgentModel>;
  agentName?: Maybe<AgentsFields_AgentName>;
  agentSystemMessage?: Maybe<AgentsFields_AgentSystemMessage>;
  agentUid?: Maybe<AgentsFields_AgentUid>;
  createdAt?: Maybe<AgentsFields_CreatedAt>;
  updatedAt?: Maybe<AgentsFields_UpdatedAt>;
};

export type AgentsFields_AgentModel = {
  __typename?: 'AgentsFields_agentModel';
  create?: Maybe<AgentsFields_AgentModel_Create>;
  delete?: Maybe<AgentsFields_AgentModel_Delete>;
  read?: Maybe<AgentsFields_AgentModel_Read>;
  update?: Maybe<AgentsFields_AgentModel_Update>;
};

export type AgentsFields_AgentModel_Create = {
  __typename?: 'AgentsFields_agentModel_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentModel_Delete = {
  __typename?: 'AgentsFields_agentModel_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentModel_Read = {
  __typename?: 'AgentsFields_agentModel_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentModel_Update = {
  __typename?: 'AgentsFields_agentModel_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentName = {
  __typename?: 'AgentsFields_agentName';
  create?: Maybe<AgentsFields_AgentName_Create>;
  delete?: Maybe<AgentsFields_AgentName_Delete>;
  read?: Maybe<AgentsFields_AgentName_Read>;
  update?: Maybe<AgentsFields_AgentName_Update>;
};

export type AgentsFields_AgentName_Create = {
  __typename?: 'AgentsFields_agentName_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentName_Delete = {
  __typename?: 'AgentsFields_agentName_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentName_Read = {
  __typename?: 'AgentsFields_agentName_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentName_Update = {
  __typename?: 'AgentsFields_agentName_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentSystemMessage = {
  __typename?: 'AgentsFields_agentSystemMessage';
  create?: Maybe<AgentsFields_AgentSystemMessage_Create>;
  delete?: Maybe<AgentsFields_AgentSystemMessage_Delete>;
  read?: Maybe<AgentsFields_AgentSystemMessage_Read>;
  update?: Maybe<AgentsFields_AgentSystemMessage_Update>;
};

export type AgentsFields_AgentSystemMessage_Create = {
  __typename?: 'AgentsFields_agentSystemMessage_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentSystemMessage_Delete = {
  __typename?: 'AgentsFields_agentSystemMessage_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentSystemMessage_Read = {
  __typename?: 'AgentsFields_agentSystemMessage_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentSystemMessage_Update = {
  __typename?: 'AgentsFields_agentSystemMessage_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentUid = {
  __typename?: 'AgentsFields_agentUid';
  create?: Maybe<AgentsFields_AgentUid_Create>;
  delete?: Maybe<AgentsFields_AgentUid_Delete>;
  read?: Maybe<AgentsFields_AgentUid_Read>;
  update?: Maybe<AgentsFields_AgentUid_Update>;
};

export type AgentsFields_AgentUid_Create = {
  __typename?: 'AgentsFields_agentUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentUid_Delete = {
  __typename?: 'AgentsFields_agentUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentUid_Read = {
  __typename?: 'AgentsFields_agentUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_AgentUid_Update = {
  __typename?: 'AgentsFields_agentUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_CreatedAt = {
  __typename?: 'AgentsFields_createdAt';
  create?: Maybe<AgentsFields_CreatedAt_Create>;
  delete?: Maybe<AgentsFields_CreatedAt_Delete>;
  read?: Maybe<AgentsFields_CreatedAt_Read>;
  update?: Maybe<AgentsFields_CreatedAt_Update>;
};

export type AgentsFields_CreatedAt_Create = {
  __typename?: 'AgentsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_CreatedAt_Delete = {
  __typename?: 'AgentsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_CreatedAt_Read = {
  __typename?: 'AgentsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_CreatedAt_Update = {
  __typename?: 'AgentsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_UpdatedAt = {
  __typename?: 'AgentsFields_updatedAt';
  create?: Maybe<AgentsFields_UpdatedAt_Create>;
  delete?: Maybe<AgentsFields_UpdatedAt_Delete>;
  read?: Maybe<AgentsFields_UpdatedAt_Read>;
  update?: Maybe<AgentsFields_UpdatedAt_Update>;
};

export type AgentsFields_UpdatedAt_Create = {
  __typename?: 'AgentsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_UpdatedAt_Delete = {
  __typename?: 'AgentsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_UpdatedAt_Read = {
  __typename?: 'AgentsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type AgentsFields_UpdatedAt_Update = {
  __typename?: 'AgentsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type AgentsReadAccess = {
  __typename?: 'AgentsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentsReadDocAccess = {
  __typename?: 'AgentsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentsUpdateAccess = {
  __typename?: 'AgentsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AgentsUpdateDocAccess = {
  __typename?: 'AgentsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type BroadcastMetrics = {
  __typename?: 'BroadcastMetrics';
  failed: Scalars['Int']['output'];
  sent: Scalars['Int']['output'];
  successRate: Scalars['Float']['output'];
};

export type Channel = {
  __typename?: 'Channel';
  blacklistedAgents?: Maybe<Array<Agent>>;
  blacklistedUsers?: Maybe<Array<User>>;
  channelName: Scalars['String']['output'];
  channelSlug?: Maybe<Scalars['String']['output']>;
  channelUid?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  mainThread?: Maybe<Thread>;
  parentChannel?: Maybe<Channel>;
  participantAgents?: Maybe<Array<Agent>>;
  participantUsers?: Maybe<Array<User>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Channel_BlacklistedAgents_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Channel_BlacklistedUsers_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Channel_ChannelName_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Channel_ChannelSlug_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Channel_ChannelUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Channel_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Channel_DeletedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Channel_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type Channel_MainThread_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Channel_ParentChannel_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Channel_ParticipantAgents_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Channel_ParticipantUsers_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Channel_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Channel_Where = {
  AND?: InputMaybe<Array<InputMaybe<Channel_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Channel_Where_Or>>>;
  blacklistedAgents?: InputMaybe<Channel_BlacklistedAgents_Operator>;
  blacklistedUsers?: InputMaybe<Channel_BlacklistedUsers_Operator>;
  channelName?: InputMaybe<Channel_ChannelName_Operator>;
  channelSlug?: InputMaybe<Channel_ChannelSlug_Operator>;
  channelUid?: InputMaybe<Channel_ChannelUid_Operator>;
  createdAt?: InputMaybe<Channel_CreatedAt_Operator>;
  deletedAt?: InputMaybe<Channel_DeletedAt_Operator>;
  id?: InputMaybe<Channel_Id_Operator>;
  mainThread?: InputMaybe<Channel_MainThread_Operator>;
  parentChannel?: InputMaybe<Channel_ParentChannel_Operator>;
  participantAgents?: InputMaybe<Channel_ParticipantAgents_Operator>;
  participantUsers?: InputMaybe<Channel_ParticipantUsers_Operator>;
  updatedAt?: InputMaybe<Channel_UpdatedAt_Operator>;
};

export type Channel_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Channel_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Channel_Where_Or>>>;
  blacklistedAgents?: InputMaybe<Channel_BlacklistedAgents_Operator>;
  blacklistedUsers?: InputMaybe<Channel_BlacklistedUsers_Operator>;
  channelName?: InputMaybe<Channel_ChannelName_Operator>;
  channelSlug?: InputMaybe<Channel_ChannelSlug_Operator>;
  channelUid?: InputMaybe<Channel_ChannelUid_Operator>;
  createdAt?: InputMaybe<Channel_CreatedAt_Operator>;
  deletedAt?: InputMaybe<Channel_DeletedAt_Operator>;
  id?: InputMaybe<Channel_Id_Operator>;
  mainThread?: InputMaybe<Channel_MainThread_Operator>;
  parentChannel?: InputMaybe<Channel_ParentChannel_Operator>;
  participantAgents?: InputMaybe<Channel_ParticipantAgents_Operator>;
  participantUsers?: InputMaybe<Channel_ParticipantUsers_Operator>;
  updatedAt?: InputMaybe<Channel_UpdatedAt_Operator>;
};

export type Channel_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Channel_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Channel_Where_Or>>>;
  blacklistedAgents?: InputMaybe<Channel_BlacklistedAgents_Operator>;
  blacklistedUsers?: InputMaybe<Channel_BlacklistedUsers_Operator>;
  channelName?: InputMaybe<Channel_ChannelName_Operator>;
  channelSlug?: InputMaybe<Channel_ChannelSlug_Operator>;
  channelUid?: InputMaybe<Channel_ChannelUid_Operator>;
  createdAt?: InputMaybe<Channel_CreatedAt_Operator>;
  deletedAt?: InputMaybe<Channel_DeletedAt_Operator>;
  id?: InputMaybe<Channel_Id_Operator>;
  mainThread?: InputMaybe<Channel_MainThread_Operator>;
  parentChannel?: InputMaybe<Channel_ParentChannel_Operator>;
  participantAgents?: InputMaybe<Channel_ParticipantAgents_Operator>;
  participantUsers?: InputMaybe<Channel_ParticipantUsers_Operator>;
  updatedAt?: InputMaybe<Channel_UpdatedAt_Operator>;
};

export type Channels = {
  __typename?: 'Channels';
  docs: Array<Channel>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type ChannelsCreateAccess = {
  __typename?: 'ChannelsCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ChannelsCreateDocAccess = {
  __typename?: 'ChannelsCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ChannelsDeleteAccess = {
  __typename?: 'ChannelsDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ChannelsDeleteDocAccess = {
  __typename?: 'ChannelsDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ChannelsDocAccessFields = {
  __typename?: 'ChannelsDocAccessFields';
  blacklistedAgents?: Maybe<ChannelsDocAccessFields_BlacklistedAgents>;
  blacklistedUsers?: Maybe<ChannelsDocAccessFields_BlacklistedUsers>;
  channelName?: Maybe<ChannelsDocAccessFields_ChannelName>;
  channelSlug?: Maybe<ChannelsDocAccessFields_ChannelSlug>;
  channelUid?: Maybe<ChannelsDocAccessFields_ChannelUid>;
  createdAt?: Maybe<ChannelsDocAccessFields_CreatedAt>;
  deletedAt?: Maybe<ChannelsDocAccessFields_DeletedAt>;
  mainThread?: Maybe<ChannelsDocAccessFields_MainThread>;
  parentChannel?: Maybe<ChannelsDocAccessFields_ParentChannel>;
  participantAgents?: Maybe<ChannelsDocAccessFields_ParticipantAgents>;
  participantUsers?: Maybe<ChannelsDocAccessFields_ParticipantUsers>;
  updatedAt?: Maybe<ChannelsDocAccessFields_UpdatedAt>;
};

export type ChannelsDocAccessFields_BlacklistedAgents = {
  __typename?: 'ChannelsDocAccessFields_blacklistedAgents';
  create?: Maybe<ChannelsDocAccessFields_BlacklistedAgents_Create>;
  delete?: Maybe<ChannelsDocAccessFields_BlacklistedAgents_Delete>;
  read?: Maybe<ChannelsDocAccessFields_BlacklistedAgents_Read>;
  update?: Maybe<ChannelsDocAccessFields_BlacklistedAgents_Update>;
};

export type ChannelsDocAccessFields_BlacklistedAgents_Create = {
  __typename?: 'ChannelsDocAccessFields_blacklistedAgents_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_BlacklistedAgents_Delete = {
  __typename?: 'ChannelsDocAccessFields_blacklistedAgents_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_BlacklistedAgents_Read = {
  __typename?: 'ChannelsDocAccessFields_blacklistedAgents_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_BlacklistedAgents_Update = {
  __typename?: 'ChannelsDocAccessFields_blacklistedAgents_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_BlacklistedUsers = {
  __typename?: 'ChannelsDocAccessFields_blacklistedUsers';
  create?: Maybe<ChannelsDocAccessFields_BlacklistedUsers_Create>;
  delete?: Maybe<ChannelsDocAccessFields_BlacklistedUsers_Delete>;
  read?: Maybe<ChannelsDocAccessFields_BlacklistedUsers_Read>;
  update?: Maybe<ChannelsDocAccessFields_BlacklistedUsers_Update>;
};

export type ChannelsDocAccessFields_BlacklistedUsers_Create = {
  __typename?: 'ChannelsDocAccessFields_blacklistedUsers_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_BlacklistedUsers_Delete = {
  __typename?: 'ChannelsDocAccessFields_blacklistedUsers_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_BlacklistedUsers_Read = {
  __typename?: 'ChannelsDocAccessFields_blacklistedUsers_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_BlacklistedUsers_Update = {
  __typename?: 'ChannelsDocAccessFields_blacklistedUsers_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ChannelName = {
  __typename?: 'ChannelsDocAccessFields_channelName';
  create?: Maybe<ChannelsDocAccessFields_ChannelName_Create>;
  delete?: Maybe<ChannelsDocAccessFields_ChannelName_Delete>;
  read?: Maybe<ChannelsDocAccessFields_ChannelName_Read>;
  update?: Maybe<ChannelsDocAccessFields_ChannelName_Update>;
};

export type ChannelsDocAccessFields_ChannelName_Create = {
  __typename?: 'ChannelsDocAccessFields_channelName_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ChannelName_Delete = {
  __typename?: 'ChannelsDocAccessFields_channelName_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ChannelName_Read = {
  __typename?: 'ChannelsDocAccessFields_channelName_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ChannelName_Update = {
  __typename?: 'ChannelsDocAccessFields_channelName_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ChannelSlug = {
  __typename?: 'ChannelsDocAccessFields_channelSlug';
  create?: Maybe<ChannelsDocAccessFields_ChannelSlug_Create>;
  delete?: Maybe<ChannelsDocAccessFields_ChannelSlug_Delete>;
  read?: Maybe<ChannelsDocAccessFields_ChannelSlug_Read>;
  update?: Maybe<ChannelsDocAccessFields_ChannelSlug_Update>;
};

export type ChannelsDocAccessFields_ChannelSlug_Create = {
  __typename?: 'ChannelsDocAccessFields_channelSlug_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ChannelSlug_Delete = {
  __typename?: 'ChannelsDocAccessFields_channelSlug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ChannelSlug_Read = {
  __typename?: 'ChannelsDocAccessFields_channelSlug_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ChannelSlug_Update = {
  __typename?: 'ChannelsDocAccessFields_channelSlug_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ChannelUid = {
  __typename?: 'ChannelsDocAccessFields_channelUid';
  create?: Maybe<ChannelsDocAccessFields_ChannelUid_Create>;
  delete?: Maybe<ChannelsDocAccessFields_ChannelUid_Delete>;
  read?: Maybe<ChannelsDocAccessFields_ChannelUid_Read>;
  update?: Maybe<ChannelsDocAccessFields_ChannelUid_Update>;
};

export type ChannelsDocAccessFields_ChannelUid_Create = {
  __typename?: 'ChannelsDocAccessFields_channelUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ChannelUid_Delete = {
  __typename?: 'ChannelsDocAccessFields_channelUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ChannelUid_Read = {
  __typename?: 'ChannelsDocAccessFields_channelUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ChannelUid_Update = {
  __typename?: 'ChannelsDocAccessFields_channelUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_CreatedAt = {
  __typename?: 'ChannelsDocAccessFields_createdAt';
  create?: Maybe<ChannelsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<ChannelsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<ChannelsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<ChannelsDocAccessFields_CreatedAt_Update>;
};

export type ChannelsDocAccessFields_CreatedAt_Create = {
  __typename?: 'ChannelsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'ChannelsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_CreatedAt_Read = {
  __typename?: 'ChannelsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_CreatedAt_Update = {
  __typename?: 'ChannelsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_DeletedAt = {
  __typename?: 'ChannelsDocAccessFields_deletedAt';
  create?: Maybe<ChannelsDocAccessFields_DeletedAt_Create>;
  delete?: Maybe<ChannelsDocAccessFields_DeletedAt_Delete>;
  read?: Maybe<ChannelsDocAccessFields_DeletedAt_Read>;
  update?: Maybe<ChannelsDocAccessFields_DeletedAt_Update>;
};

export type ChannelsDocAccessFields_DeletedAt_Create = {
  __typename?: 'ChannelsDocAccessFields_deletedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_DeletedAt_Delete = {
  __typename?: 'ChannelsDocAccessFields_deletedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_DeletedAt_Read = {
  __typename?: 'ChannelsDocAccessFields_deletedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_DeletedAt_Update = {
  __typename?: 'ChannelsDocAccessFields_deletedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_MainThread = {
  __typename?: 'ChannelsDocAccessFields_mainThread';
  create?: Maybe<ChannelsDocAccessFields_MainThread_Create>;
  delete?: Maybe<ChannelsDocAccessFields_MainThread_Delete>;
  read?: Maybe<ChannelsDocAccessFields_MainThread_Read>;
  update?: Maybe<ChannelsDocAccessFields_MainThread_Update>;
};

export type ChannelsDocAccessFields_MainThread_Create = {
  __typename?: 'ChannelsDocAccessFields_mainThread_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_MainThread_Delete = {
  __typename?: 'ChannelsDocAccessFields_mainThread_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_MainThread_Read = {
  __typename?: 'ChannelsDocAccessFields_mainThread_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_MainThread_Update = {
  __typename?: 'ChannelsDocAccessFields_mainThread_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ParentChannel = {
  __typename?: 'ChannelsDocAccessFields_parentChannel';
  create?: Maybe<ChannelsDocAccessFields_ParentChannel_Create>;
  delete?: Maybe<ChannelsDocAccessFields_ParentChannel_Delete>;
  read?: Maybe<ChannelsDocAccessFields_ParentChannel_Read>;
  update?: Maybe<ChannelsDocAccessFields_ParentChannel_Update>;
};

export type ChannelsDocAccessFields_ParentChannel_Create = {
  __typename?: 'ChannelsDocAccessFields_parentChannel_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ParentChannel_Delete = {
  __typename?: 'ChannelsDocAccessFields_parentChannel_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ParentChannel_Read = {
  __typename?: 'ChannelsDocAccessFields_parentChannel_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ParentChannel_Update = {
  __typename?: 'ChannelsDocAccessFields_parentChannel_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ParticipantAgents = {
  __typename?: 'ChannelsDocAccessFields_participantAgents';
  create?: Maybe<ChannelsDocAccessFields_ParticipantAgents_Create>;
  delete?: Maybe<ChannelsDocAccessFields_ParticipantAgents_Delete>;
  read?: Maybe<ChannelsDocAccessFields_ParticipantAgents_Read>;
  update?: Maybe<ChannelsDocAccessFields_ParticipantAgents_Update>;
};

export type ChannelsDocAccessFields_ParticipantAgents_Create = {
  __typename?: 'ChannelsDocAccessFields_participantAgents_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ParticipantAgents_Delete = {
  __typename?: 'ChannelsDocAccessFields_participantAgents_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ParticipantAgents_Read = {
  __typename?: 'ChannelsDocAccessFields_participantAgents_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ParticipantAgents_Update = {
  __typename?: 'ChannelsDocAccessFields_participantAgents_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ParticipantUsers = {
  __typename?: 'ChannelsDocAccessFields_participantUsers';
  create?: Maybe<ChannelsDocAccessFields_ParticipantUsers_Create>;
  delete?: Maybe<ChannelsDocAccessFields_ParticipantUsers_Delete>;
  read?: Maybe<ChannelsDocAccessFields_ParticipantUsers_Read>;
  update?: Maybe<ChannelsDocAccessFields_ParticipantUsers_Update>;
};

export type ChannelsDocAccessFields_ParticipantUsers_Create = {
  __typename?: 'ChannelsDocAccessFields_participantUsers_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ParticipantUsers_Delete = {
  __typename?: 'ChannelsDocAccessFields_participantUsers_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ParticipantUsers_Read = {
  __typename?: 'ChannelsDocAccessFields_participantUsers_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_ParticipantUsers_Update = {
  __typename?: 'ChannelsDocAccessFields_participantUsers_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_UpdatedAt = {
  __typename?: 'ChannelsDocAccessFields_updatedAt';
  create?: Maybe<ChannelsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<ChannelsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<ChannelsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<ChannelsDocAccessFields_UpdatedAt_Update>;
};

export type ChannelsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'ChannelsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'ChannelsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'ChannelsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'ChannelsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields = {
  __typename?: 'ChannelsFields';
  blacklistedAgents?: Maybe<ChannelsFields_BlacklistedAgents>;
  blacklistedUsers?: Maybe<ChannelsFields_BlacklistedUsers>;
  channelName?: Maybe<ChannelsFields_ChannelName>;
  channelSlug?: Maybe<ChannelsFields_ChannelSlug>;
  channelUid?: Maybe<ChannelsFields_ChannelUid>;
  createdAt?: Maybe<ChannelsFields_CreatedAt>;
  deletedAt?: Maybe<ChannelsFields_DeletedAt>;
  mainThread?: Maybe<ChannelsFields_MainThread>;
  parentChannel?: Maybe<ChannelsFields_ParentChannel>;
  participantAgents?: Maybe<ChannelsFields_ParticipantAgents>;
  participantUsers?: Maybe<ChannelsFields_ParticipantUsers>;
  updatedAt?: Maybe<ChannelsFields_UpdatedAt>;
};

export type ChannelsFields_BlacklistedAgents = {
  __typename?: 'ChannelsFields_blacklistedAgents';
  create?: Maybe<ChannelsFields_BlacklistedAgents_Create>;
  delete?: Maybe<ChannelsFields_BlacklistedAgents_Delete>;
  read?: Maybe<ChannelsFields_BlacklistedAgents_Read>;
  update?: Maybe<ChannelsFields_BlacklistedAgents_Update>;
};

export type ChannelsFields_BlacklistedAgents_Create = {
  __typename?: 'ChannelsFields_blacklistedAgents_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_BlacklistedAgents_Delete = {
  __typename?: 'ChannelsFields_blacklistedAgents_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_BlacklistedAgents_Read = {
  __typename?: 'ChannelsFields_blacklistedAgents_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_BlacklistedAgents_Update = {
  __typename?: 'ChannelsFields_blacklistedAgents_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_BlacklistedUsers = {
  __typename?: 'ChannelsFields_blacklistedUsers';
  create?: Maybe<ChannelsFields_BlacklistedUsers_Create>;
  delete?: Maybe<ChannelsFields_BlacklistedUsers_Delete>;
  read?: Maybe<ChannelsFields_BlacklistedUsers_Read>;
  update?: Maybe<ChannelsFields_BlacklistedUsers_Update>;
};

export type ChannelsFields_BlacklistedUsers_Create = {
  __typename?: 'ChannelsFields_blacklistedUsers_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_BlacklistedUsers_Delete = {
  __typename?: 'ChannelsFields_blacklistedUsers_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_BlacklistedUsers_Read = {
  __typename?: 'ChannelsFields_blacklistedUsers_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_BlacklistedUsers_Update = {
  __typename?: 'ChannelsFields_blacklistedUsers_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ChannelName = {
  __typename?: 'ChannelsFields_channelName';
  create?: Maybe<ChannelsFields_ChannelName_Create>;
  delete?: Maybe<ChannelsFields_ChannelName_Delete>;
  read?: Maybe<ChannelsFields_ChannelName_Read>;
  update?: Maybe<ChannelsFields_ChannelName_Update>;
};

export type ChannelsFields_ChannelName_Create = {
  __typename?: 'ChannelsFields_channelName_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ChannelName_Delete = {
  __typename?: 'ChannelsFields_channelName_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ChannelName_Read = {
  __typename?: 'ChannelsFields_channelName_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ChannelName_Update = {
  __typename?: 'ChannelsFields_channelName_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ChannelSlug = {
  __typename?: 'ChannelsFields_channelSlug';
  create?: Maybe<ChannelsFields_ChannelSlug_Create>;
  delete?: Maybe<ChannelsFields_ChannelSlug_Delete>;
  read?: Maybe<ChannelsFields_ChannelSlug_Read>;
  update?: Maybe<ChannelsFields_ChannelSlug_Update>;
};

export type ChannelsFields_ChannelSlug_Create = {
  __typename?: 'ChannelsFields_channelSlug_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ChannelSlug_Delete = {
  __typename?: 'ChannelsFields_channelSlug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ChannelSlug_Read = {
  __typename?: 'ChannelsFields_channelSlug_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ChannelSlug_Update = {
  __typename?: 'ChannelsFields_channelSlug_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ChannelUid = {
  __typename?: 'ChannelsFields_channelUid';
  create?: Maybe<ChannelsFields_ChannelUid_Create>;
  delete?: Maybe<ChannelsFields_ChannelUid_Delete>;
  read?: Maybe<ChannelsFields_ChannelUid_Read>;
  update?: Maybe<ChannelsFields_ChannelUid_Update>;
};

export type ChannelsFields_ChannelUid_Create = {
  __typename?: 'ChannelsFields_channelUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ChannelUid_Delete = {
  __typename?: 'ChannelsFields_channelUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ChannelUid_Read = {
  __typename?: 'ChannelsFields_channelUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ChannelUid_Update = {
  __typename?: 'ChannelsFields_channelUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_CreatedAt = {
  __typename?: 'ChannelsFields_createdAt';
  create?: Maybe<ChannelsFields_CreatedAt_Create>;
  delete?: Maybe<ChannelsFields_CreatedAt_Delete>;
  read?: Maybe<ChannelsFields_CreatedAt_Read>;
  update?: Maybe<ChannelsFields_CreatedAt_Update>;
};

export type ChannelsFields_CreatedAt_Create = {
  __typename?: 'ChannelsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_CreatedAt_Delete = {
  __typename?: 'ChannelsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_CreatedAt_Read = {
  __typename?: 'ChannelsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_CreatedAt_Update = {
  __typename?: 'ChannelsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_DeletedAt = {
  __typename?: 'ChannelsFields_deletedAt';
  create?: Maybe<ChannelsFields_DeletedAt_Create>;
  delete?: Maybe<ChannelsFields_DeletedAt_Delete>;
  read?: Maybe<ChannelsFields_DeletedAt_Read>;
  update?: Maybe<ChannelsFields_DeletedAt_Update>;
};

export type ChannelsFields_DeletedAt_Create = {
  __typename?: 'ChannelsFields_deletedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_DeletedAt_Delete = {
  __typename?: 'ChannelsFields_deletedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_DeletedAt_Read = {
  __typename?: 'ChannelsFields_deletedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_DeletedAt_Update = {
  __typename?: 'ChannelsFields_deletedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_MainThread = {
  __typename?: 'ChannelsFields_mainThread';
  create?: Maybe<ChannelsFields_MainThread_Create>;
  delete?: Maybe<ChannelsFields_MainThread_Delete>;
  read?: Maybe<ChannelsFields_MainThread_Read>;
  update?: Maybe<ChannelsFields_MainThread_Update>;
};

export type ChannelsFields_MainThread_Create = {
  __typename?: 'ChannelsFields_mainThread_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_MainThread_Delete = {
  __typename?: 'ChannelsFields_mainThread_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_MainThread_Read = {
  __typename?: 'ChannelsFields_mainThread_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_MainThread_Update = {
  __typename?: 'ChannelsFields_mainThread_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ParentChannel = {
  __typename?: 'ChannelsFields_parentChannel';
  create?: Maybe<ChannelsFields_ParentChannel_Create>;
  delete?: Maybe<ChannelsFields_ParentChannel_Delete>;
  read?: Maybe<ChannelsFields_ParentChannel_Read>;
  update?: Maybe<ChannelsFields_ParentChannel_Update>;
};

export type ChannelsFields_ParentChannel_Create = {
  __typename?: 'ChannelsFields_parentChannel_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ParentChannel_Delete = {
  __typename?: 'ChannelsFields_parentChannel_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ParentChannel_Read = {
  __typename?: 'ChannelsFields_parentChannel_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ParentChannel_Update = {
  __typename?: 'ChannelsFields_parentChannel_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ParticipantAgents = {
  __typename?: 'ChannelsFields_participantAgents';
  create?: Maybe<ChannelsFields_ParticipantAgents_Create>;
  delete?: Maybe<ChannelsFields_ParticipantAgents_Delete>;
  read?: Maybe<ChannelsFields_ParticipantAgents_Read>;
  update?: Maybe<ChannelsFields_ParticipantAgents_Update>;
};

export type ChannelsFields_ParticipantAgents_Create = {
  __typename?: 'ChannelsFields_participantAgents_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ParticipantAgents_Delete = {
  __typename?: 'ChannelsFields_participantAgents_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ParticipantAgents_Read = {
  __typename?: 'ChannelsFields_participantAgents_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ParticipantAgents_Update = {
  __typename?: 'ChannelsFields_participantAgents_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ParticipantUsers = {
  __typename?: 'ChannelsFields_participantUsers';
  create?: Maybe<ChannelsFields_ParticipantUsers_Create>;
  delete?: Maybe<ChannelsFields_ParticipantUsers_Delete>;
  read?: Maybe<ChannelsFields_ParticipantUsers_Read>;
  update?: Maybe<ChannelsFields_ParticipantUsers_Update>;
};

export type ChannelsFields_ParticipantUsers_Create = {
  __typename?: 'ChannelsFields_participantUsers_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ParticipantUsers_Delete = {
  __typename?: 'ChannelsFields_participantUsers_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ParticipantUsers_Read = {
  __typename?: 'ChannelsFields_participantUsers_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_ParticipantUsers_Update = {
  __typename?: 'ChannelsFields_participantUsers_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_UpdatedAt = {
  __typename?: 'ChannelsFields_updatedAt';
  create?: Maybe<ChannelsFields_UpdatedAt_Create>;
  delete?: Maybe<ChannelsFields_UpdatedAt_Delete>;
  read?: Maybe<ChannelsFields_UpdatedAt_Read>;
  update?: Maybe<ChannelsFields_UpdatedAt_Update>;
};

export type ChannelsFields_UpdatedAt_Create = {
  __typename?: 'ChannelsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_UpdatedAt_Delete = {
  __typename?: 'ChannelsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_UpdatedAt_Read = {
  __typename?: 'ChannelsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsFields_UpdatedAt_Update = {
  __typename?: 'ChannelsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ChannelsReadAccess = {
  __typename?: 'ChannelsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ChannelsReadDocAccess = {
  __typename?: 'ChannelsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ChannelsUpdateAccess = {
  __typename?: 'ChannelsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ChannelsUpdateDocAccess = {
  __typename?: 'ChannelsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type DocsMockDataDocAccessFields = {
  __typename?: 'DocsMockDataDocAccessFields';
  createdAt?: Maybe<DocsMockDataDocAccessFields_CreatedAt>;
  mockData?: Maybe<DocsMockDataDocAccessFields_MockData>;
  updatedAt?: Maybe<DocsMockDataDocAccessFields_UpdatedAt>;
};

export type DocsMockDataDocAccessFields_CreatedAt = {
  __typename?: 'DocsMockDataDocAccessFields_createdAt';
  create?: Maybe<DocsMockDataDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<DocsMockDataDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<DocsMockDataDocAccessFields_CreatedAt_Read>;
  update?: Maybe<DocsMockDataDocAccessFields_CreatedAt_Update>;
};

export type DocsMockDataDocAccessFields_CreatedAt_Create = {
  __typename?: 'DocsMockDataDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataDocAccessFields_CreatedAt_Delete = {
  __typename?: 'DocsMockDataDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataDocAccessFields_CreatedAt_Read = {
  __typename?: 'DocsMockDataDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataDocAccessFields_CreatedAt_Update = {
  __typename?: 'DocsMockDataDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataDocAccessFields_MockData = {
  __typename?: 'DocsMockDataDocAccessFields_mockData';
  create?: Maybe<DocsMockDataDocAccessFields_MockData_Create>;
  delete?: Maybe<DocsMockDataDocAccessFields_MockData_Delete>;
  read?: Maybe<DocsMockDataDocAccessFields_MockData_Read>;
  update?: Maybe<DocsMockDataDocAccessFields_MockData_Update>;
};

export type DocsMockDataDocAccessFields_MockData_Create = {
  __typename?: 'DocsMockDataDocAccessFields_mockData_Create';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataDocAccessFields_MockData_Delete = {
  __typename?: 'DocsMockDataDocAccessFields_mockData_Delete';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataDocAccessFields_MockData_Read = {
  __typename?: 'DocsMockDataDocAccessFields_mockData_Read';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataDocAccessFields_MockData_Update = {
  __typename?: 'DocsMockDataDocAccessFields_mockData_Update';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataDocAccessFields_UpdatedAt = {
  __typename?: 'DocsMockDataDocAccessFields_updatedAt';
  create?: Maybe<DocsMockDataDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<DocsMockDataDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<DocsMockDataDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<DocsMockDataDocAccessFields_UpdatedAt_Update>;
};

export type DocsMockDataDocAccessFields_UpdatedAt_Create = {
  __typename?: 'DocsMockDataDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'DocsMockDataDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataDocAccessFields_UpdatedAt_Read = {
  __typename?: 'DocsMockDataDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataDocAccessFields_UpdatedAt_Update = {
  __typename?: 'DocsMockDataDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataFields = {
  __typename?: 'DocsMockDataFields';
  createdAt?: Maybe<DocsMockDataFields_CreatedAt>;
  mockData?: Maybe<DocsMockDataFields_MockData>;
  updatedAt?: Maybe<DocsMockDataFields_UpdatedAt>;
};

export type DocsMockDataFields_CreatedAt = {
  __typename?: 'DocsMockDataFields_createdAt';
  create?: Maybe<DocsMockDataFields_CreatedAt_Create>;
  delete?: Maybe<DocsMockDataFields_CreatedAt_Delete>;
  read?: Maybe<DocsMockDataFields_CreatedAt_Read>;
  update?: Maybe<DocsMockDataFields_CreatedAt_Update>;
};

export type DocsMockDataFields_CreatedAt_Create = {
  __typename?: 'DocsMockDataFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataFields_CreatedAt_Delete = {
  __typename?: 'DocsMockDataFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataFields_CreatedAt_Read = {
  __typename?: 'DocsMockDataFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataFields_CreatedAt_Update = {
  __typename?: 'DocsMockDataFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataFields_MockData = {
  __typename?: 'DocsMockDataFields_mockData';
  create?: Maybe<DocsMockDataFields_MockData_Create>;
  delete?: Maybe<DocsMockDataFields_MockData_Delete>;
  read?: Maybe<DocsMockDataFields_MockData_Read>;
  update?: Maybe<DocsMockDataFields_MockData_Update>;
};

export type DocsMockDataFields_MockData_Create = {
  __typename?: 'DocsMockDataFields_mockData_Create';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataFields_MockData_Delete = {
  __typename?: 'DocsMockDataFields_mockData_Delete';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataFields_MockData_Read = {
  __typename?: 'DocsMockDataFields_mockData_Read';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataFields_MockData_Update = {
  __typename?: 'DocsMockDataFields_mockData_Update';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataFields_UpdatedAt = {
  __typename?: 'DocsMockDataFields_updatedAt';
  create?: Maybe<DocsMockDataFields_UpdatedAt_Create>;
  delete?: Maybe<DocsMockDataFields_UpdatedAt_Delete>;
  read?: Maybe<DocsMockDataFields_UpdatedAt_Read>;
  update?: Maybe<DocsMockDataFields_UpdatedAt_Update>;
};

export type DocsMockDataFields_UpdatedAt_Create = {
  __typename?: 'DocsMockDataFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataFields_UpdatedAt_Delete = {
  __typename?: 'DocsMockDataFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataFields_UpdatedAt_Read = {
  __typename?: 'DocsMockDataFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataFields_UpdatedAt_Update = {
  __typename?: 'DocsMockDataFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type DocsMockDataReadAccess = {
  __typename?: 'DocsMockDataReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type DocsMockDataReadDocAccess = {
  __typename?: 'DocsMockDataReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type DocsMockDataUpdateAccess = {
  __typename?: 'DocsMockDataUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type DocsMockDataUpdateDocAccess = {
  __typename?: 'DocsMockDataUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type DocsMockDatum = {
  __typename?: 'DocsMockDatum';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  mockData?: Maybe<Scalars['JSON']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ForceUnlockResult = {
  __typename?: 'ForceUnlockResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type HealthServices = {
  __typename?: 'HealthServices';
  database: Scalars['String']['output'];
  messageBroker: Scalars['String']['output'];
  valkey: Scalars['String']['output'];
};

export type HealthStatus = {
  __typename?: 'HealthStatus';
  services?: Maybe<HealthServices>;
  status: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

export type Media = {
  __typename?: 'Media';
  alt?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  filesize?: Maybe<Scalars['Float']['output']>;
  focalX?: Maybe<Scalars['Float']['output']>;
  focalY?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  thumbnailURL?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type MediaCreateAccess = {
  __typename?: 'MediaCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaCreateDocAccess = {
  __typename?: 'MediaCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaDeleteAccess = {
  __typename?: 'MediaDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaDeleteDocAccess = {
  __typename?: 'MediaDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaDocAccessFields = {
  __typename?: 'MediaDocAccessFields';
  alt?: Maybe<MediaDocAccessFields_Alt>;
  createdAt?: Maybe<MediaDocAccessFields_CreatedAt>;
  filename?: Maybe<MediaDocAccessFields_Filename>;
  filesize?: Maybe<MediaDocAccessFields_Filesize>;
  focalX?: Maybe<MediaDocAccessFields_FocalX>;
  focalY?: Maybe<MediaDocAccessFields_FocalY>;
  height?: Maybe<MediaDocAccessFields_Height>;
  mimeType?: Maybe<MediaDocAccessFields_MimeType>;
  thumbnailURL?: Maybe<MediaDocAccessFields_ThumbnailUrl>;
  updatedAt?: Maybe<MediaDocAccessFields_UpdatedAt>;
  url?: Maybe<MediaDocAccessFields_Url>;
  width?: Maybe<MediaDocAccessFields_Width>;
};

export type MediaDocAccessFields_Alt = {
  __typename?: 'MediaDocAccessFields_alt';
  create?: Maybe<MediaDocAccessFields_Alt_Create>;
  delete?: Maybe<MediaDocAccessFields_Alt_Delete>;
  read?: Maybe<MediaDocAccessFields_Alt_Read>;
  update?: Maybe<MediaDocAccessFields_Alt_Update>;
};

export type MediaDocAccessFields_Alt_Create = {
  __typename?: 'MediaDocAccessFields_alt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Alt_Delete = {
  __typename?: 'MediaDocAccessFields_alt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Alt_Read = {
  __typename?: 'MediaDocAccessFields_alt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Alt_Update = {
  __typename?: 'MediaDocAccessFields_alt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_CreatedAt = {
  __typename?: 'MediaDocAccessFields_createdAt';
  create?: Maybe<MediaDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<MediaDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<MediaDocAccessFields_CreatedAt_Read>;
  update?: Maybe<MediaDocAccessFields_CreatedAt_Update>;
};

export type MediaDocAccessFields_CreatedAt_Create = {
  __typename?: 'MediaDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_CreatedAt_Delete = {
  __typename?: 'MediaDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_CreatedAt_Read = {
  __typename?: 'MediaDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_CreatedAt_Update = {
  __typename?: 'MediaDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filename = {
  __typename?: 'MediaDocAccessFields_filename';
  create?: Maybe<MediaDocAccessFields_Filename_Create>;
  delete?: Maybe<MediaDocAccessFields_Filename_Delete>;
  read?: Maybe<MediaDocAccessFields_Filename_Read>;
  update?: Maybe<MediaDocAccessFields_Filename_Update>;
};

export type MediaDocAccessFields_Filename_Create = {
  __typename?: 'MediaDocAccessFields_filename_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filename_Delete = {
  __typename?: 'MediaDocAccessFields_filename_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filename_Read = {
  __typename?: 'MediaDocAccessFields_filename_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filename_Update = {
  __typename?: 'MediaDocAccessFields_filename_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filesize = {
  __typename?: 'MediaDocAccessFields_filesize';
  create?: Maybe<MediaDocAccessFields_Filesize_Create>;
  delete?: Maybe<MediaDocAccessFields_Filesize_Delete>;
  read?: Maybe<MediaDocAccessFields_Filesize_Read>;
  update?: Maybe<MediaDocAccessFields_Filesize_Update>;
};

export type MediaDocAccessFields_Filesize_Create = {
  __typename?: 'MediaDocAccessFields_filesize_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filesize_Delete = {
  __typename?: 'MediaDocAccessFields_filesize_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filesize_Read = {
  __typename?: 'MediaDocAccessFields_filesize_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filesize_Update = {
  __typename?: 'MediaDocAccessFields_filesize_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalX = {
  __typename?: 'MediaDocAccessFields_focalX';
  create?: Maybe<MediaDocAccessFields_FocalX_Create>;
  delete?: Maybe<MediaDocAccessFields_FocalX_Delete>;
  read?: Maybe<MediaDocAccessFields_FocalX_Read>;
  update?: Maybe<MediaDocAccessFields_FocalX_Update>;
};

export type MediaDocAccessFields_FocalX_Create = {
  __typename?: 'MediaDocAccessFields_focalX_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalX_Delete = {
  __typename?: 'MediaDocAccessFields_focalX_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalX_Read = {
  __typename?: 'MediaDocAccessFields_focalX_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalX_Update = {
  __typename?: 'MediaDocAccessFields_focalX_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalY = {
  __typename?: 'MediaDocAccessFields_focalY';
  create?: Maybe<MediaDocAccessFields_FocalY_Create>;
  delete?: Maybe<MediaDocAccessFields_FocalY_Delete>;
  read?: Maybe<MediaDocAccessFields_FocalY_Read>;
  update?: Maybe<MediaDocAccessFields_FocalY_Update>;
};

export type MediaDocAccessFields_FocalY_Create = {
  __typename?: 'MediaDocAccessFields_focalY_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalY_Delete = {
  __typename?: 'MediaDocAccessFields_focalY_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalY_Read = {
  __typename?: 'MediaDocAccessFields_focalY_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalY_Update = {
  __typename?: 'MediaDocAccessFields_focalY_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Height = {
  __typename?: 'MediaDocAccessFields_height';
  create?: Maybe<MediaDocAccessFields_Height_Create>;
  delete?: Maybe<MediaDocAccessFields_Height_Delete>;
  read?: Maybe<MediaDocAccessFields_Height_Read>;
  update?: Maybe<MediaDocAccessFields_Height_Update>;
};

export type MediaDocAccessFields_Height_Create = {
  __typename?: 'MediaDocAccessFields_height_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Height_Delete = {
  __typename?: 'MediaDocAccessFields_height_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Height_Read = {
  __typename?: 'MediaDocAccessFields_height_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Height_Update = {
  __typename?: 'MediaDocAccessFields_height_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_MimeType = {
  __typename?: 'MediaDocAccessFields_mimeType';
  create?: Maybe<MediaDocAccessFields_MimeType_Create>;
  delete?: Maybe<MediaDocAccessFields_MimeType_Delete>;
  read?: Maybe<MediaDocAccessFields_MimeType_Read>;
  update?: Maybe<MediaDocAccessFields_MimeType_Update>;
};

export type MediaDocAccessFields_MimeType_Create = {
  __typename?: 'MediaDocAccessFields_mimeType_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_MimeType_Delete = {
  __typename?: 'MediaDocAccessFields_mimeType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_MimeType_Read = {
  __typename?: 'MediaDocAccessFields_mimeType_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_MimeType_Update = {
  __typename?: 'MediaDocAccessFields_mimeType_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_ThumbnailUrl = {
  __typename?: 'MediaDocAccessFields_thumbnailURL';
  create?: Maybe<MediaDocAccessFields_ThumbnailUrl_Create>;
  delete?: Maybe<MediaDocAccessFields_ThumbnailUrl_Delete>;
  read?: Maybe<MediaDocAccessFields_ThumbnailUrl_Read>;
  update?: Maybe<MediaDocAccessFields_ThumbnailUrl_Update>;
};

export type MediaDocAccessFields_ThumbnailUrl_Create = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_ThumbnailUrl_Delete = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_ThumbnailUrl_Read = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_ThumbnailUrl_Update = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_UpdatedAt = {
  __typename?: 'MediaDocAccessFields_updatedAt';
  create?: Maybe<MediaDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<MediaDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<MediaDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<MediaDocAccessFields_UpdatedAt_Update>;
};

export type MediaDocAccessFields_UpdatedAt_Create = {
  __typename?: 'MediaDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'MediaDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_UpdatedAt_Read = {
  __typename?: 'MediaDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_UpdatedAt_Update = {
  __typename?: 'MediaDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Url = {
  __typename?: 'MediaDocAccessFields_url';
  create?: Maybe<MediaDocAccessFields_Url_Create>;
  delete?: Maybe<MediaDocAccessFields_Url_Delete>;
  read?: Maybe<MediaDocAccessFields_Url_Read>;
  update?: Maybe<MediaDocAccessFields_Url_Update>;
};

export type MediaDocAccessFields_Url_Create = {
  __typename?: 'MediaDocAccessFields_url_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Url_Delete = {
  __typename?: 'MediaDocAccessFields_url_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Url_Read = {
  __typename?: 'MediaDocAccessFields_url_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Url_Update = {
  __typename?: 'MediaDocAccessFields_url_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Width = {
  __typename?: 'MediaDocAccessFields_width';
  create?: Maybe<MediaDocAccessFields_Width_Create>;
  delete?: Maybe<MediaDocAccessFields_Width_Delete>;
  read?: Maybe<MediaDocAccessFields_Width_Read>;
  update?: Maybe<MediaDocAccessFields_Width_Update>;
};

export type MediaDocAccessFields_Width_Create = {
  __typename?: 'MediaDocAccessFields_width_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Width_Delete = {
  __typename?: 'MediaDocAccessFields_width_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Width_Read = {
  __typename?: 'MediaDocAccessFields_width_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Width_Update = {
  __typename?: 'MediaDocAccessFields_width_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields = {
  __typename?: 'MediaFields';
  alt?: Maybe<MediaFields_Alt>;
  createdAt?: Maybe<MediaFields_CreatedAt>;
  filename?: Maybe<MediaFields_Filename>;
  filesize?: Maybe<MediaFields_Filesize>;
  focalX?: Maybe<MediaFields_FocalX>;
  focalY?: Maybe<MediaFields_FocalY>;
  height?: Maybe<MediaFields_Height>;
  mimeType?: Maybe<MediaFields_MimeType>;
  thumbnailURL?: Maybe<MediaFields_ThumbnailUrl>;
  updatedAt?: Maybe<MediaFields_UpdatedAt>;
  url?: Maybe<MediaFields_Url>;
  width?: Maybe<MediaFields_Width>;
};

export type MediaFields_Alt = {
  __typename?: 'MediaFields_alt';
  create?: Maybe<MediaFields_Alt_Create>;
  delete?: Maybe<MediaFields_Alt_Delete>;
  read?: Maybe<MediaFields_Alt_Read>;
  update?: Maybe<MediaFields_Alt_Update>;
};

export type MediaFields_Alt_Create = {
  __typename?: 'MediaFields_alt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Alt_Delete = {
  __typename?: 'MediaFields_alt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Alt_Read = {
  __typename?: 'MediaFields_alt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Alt_Update = {
  __typename?: 'MediaFields_alt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_CreatedAt = {
  __typename?: 'MediaFields_createdAt';
  create?: Maybe<MediaFields_CreatedAt_Create>;
  delete?: Maybe<MediaFields_CreatedAt_Delete>;
  read?: Maybe<MediaFields_CreatedAt_Read>;
  update?: Maybe<MediaFields_CreatedAt_Update>;
};

export type MediaFields_CreatedAt_Create = {
  __typename?: 'MediaFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_CreatedAt_Delete = {
  __typename?: 'MediaFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_CreatedAt_Read = {
  __typename?: 'MediaFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_CreatedAt_Update = {
  __typename?: 'MediaFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filename = {
  __typename?: 'MediaFields_filename';
  create?: Maybe<MediaFields_Filename_Create>;
  delete?: Maybe<MediaFields_Filename_Delete>;
  read?: Maybe<MediaFields_Filename_Read>;
  update?: Maybe<MediaFields_Filename_Update>;
};

export type MediaFields_Filename_Create = {
  __typename?: 'MediaFields_filename_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filename_Delete = {
  __typename?: 'MediaFields_filename_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filename_Read = {
  __typename?: 'MediaFields_filename_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filename_Update = {
  __typename?: 'MediaFields_filename_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filesize = {
  __typename?: 'MediaFields_filesize';
  create?: Maybe<MediaFields_Filesize_Create>;
  delete?: Maybe<MediaFields_Filesize_Delete>;
  read?: Maybe<MediaFields_Filesize_Read>;
  update?: Maybe<MediaFields_Filesize_Update>;
};

export type MediaFields_Filesize_Create = {
  __typename?: 'MediaFields_filesize_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filesize_Delete = {
  __typename?: 'MediaFields_filesize_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filesize_Read = {
  __typename?: 'MediaFields_filesize_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filesize_Update = {
  __typename?: 'MediaFields_filesize_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalX = {
  __typename?: 'MediaFields_focalX';
  create?: Maybe<MediaFields_FocalX_Create>;
  delete?: Maybe<MediaFields_FocalX_Delete>;
  read?: Maybe<MediaFields_FocalX_Read>;
  update?: Maybe<MediaFields_FocalX_Update>;
};

export type MediaFields_FocalX_Create = {
  __typename?: 'MediaFields_focalX_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalX_Delete = {
  __typename?: 'MediaFields_focalX_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalX_Read = {
  __typename?: 'MediaFields_focalX_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalX_Update = {
  __typename?: 'MediaFields_focalX_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalY = {
  __typename?: 'MediaFields_focalY';
  create?: Maybe<MediaFields_FocalY_Create>;
  delete?: Maybe<MediaFields_FocalY_Delete>;
  read?: Maybe<MediaFields_FocalY_Read>;
  update?: Maybe<MediaFields_FocalY_Update>;
};

export type MediaFields_FocalY_Create = {
  __typename?: 'MediaFields_focalY_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalY_Delete = {
  __typename?: 'MediaFields_focalY_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalY_Read = {
  __typename?: 'MediaFields_focalY_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalY_Update = {
  __typename?: 'MediaFields_focalY_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Height = {
  __typename?: 'MediaFields_height';
  create?: Maybe<MediaFields_Height_Create>;
  delete?: Maybe<MediaFields_Height_Delete>;
  read?: Maybe<MediaFields_Height_Read>;
  update?: Maybe<MediaFields_Height_Update>;
};

export type MediaFields_Height_Create = {
  __typename?: 'MediaFields_height_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Height_Delete = {
  __typename?: 'MediaFields_height_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Height_Read = {
  __typename?: 'MediaFields_height_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Height_Update = {
  __typename?: 'MediaFields_height_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_MimeType = {
  __typename?: 'MediaFields_mimeType';
  create?: Maybe<MediaFields_MimeType_Create>;
  delete?: Maybe<MediaFields_MimeType_Delete>;
  read?: Maybe<MediaFields_MimeType_Read>;
  update?: Maybe<MediaFields_MimeType_Update>;
};

export type MediaFields_MimeType_Create = {
  __typename?: 'MediaFields_mimeType_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_MimeType_Delete = {
  __typename?: 'MediaFields_mimeType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_MimeType_Read = {
  __typename?: 'MediaFields_mimeType_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_MimeType_Update = {
  __typename?: 'MediaFields_mimeType_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_ThumbnailUrl = {
  __typename?: 'MediaFields_thumbnailURL';
  create?: Maybe<MediaFields_ThumbnailUrl_Create>;
  delete?: Maybe<MediaFields_ThumbnailUrl_Delete>;
  read?: Maybe<MediaFields_ThumbnailUrl_Read>;
  update?: Maybe<MediaFields_ThumbnailUrl_Update>;
};

export type MediaFields_ThumbnailUrl_Create = {
  __typename?: 'MediaFields_thumbnailURL_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_ThumbnailUrl_Delete = {
  __typename?: 'MediaFields_thumbnailURL_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_ThumbnailUrl_Read = {
  __typename?: 'MediaFields_thumbnailURL_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_ThumbnailUrl_Update = {
  __typename?: 'MediaFields_thumbnailURL_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_UpdatedAt = {
  __typename?: 'MediaFields_updatedAt';
  create?: Maybe<MediaFields_UpdatedAt_Create>;
  delete?: Maybe<MediaFields_UpdatedAt_Delete>;
  read?: Maybe<MediaFields_UpdatedAt_Read>;
  update?: Maybe<MediaFields_UpdatedAt_Update>;
};

export type MediaFields_UpdatedAt_Create = {
  __typename?: 'MediaFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_UpdatedAt_Delete = {
  __typename?: 'MediaFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_UpdatedAt_Read = {
  __typename?: 'MediaFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_UpdatedAt_Update = {
  __typename?: 'MediaFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Url = {
  __typename?: 'MediaFields_url';
  create?: Maybe<MediaFields_Url_Create>;
  delete?: Maybe<MediaFields_Url_Delete>;
  read?: Maybe<MediaFields_Url_Read>;
  update?: Maybe<MediaFields_Url_Update>;
};

export type MediaFields_Url_Create = {
  __typename?: 'MediaFields_url_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Url_Delete = {
  __typename?: 'MediaFields_url_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Url_Read = {
  __typename?: 'MediaFields_url_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Url_Update = {
  __typename?: 'MediaFields_url_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Width = {
  __typename?: 'MediaFields_width';
  create?: Maybe<MediaFields_Width_Create>;
  delete?: Maybe<MediaFields_Width_Delete>;
  read?: Maybe<MediaFields_Width_Read>;
  update?: Maybe<MediaFields_Width_Update>;
};

export type MediaFields_Width_Create = {
  __typename?: 'MediaFields_width_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Width_Delete = {
  __typename?: 'MediaFields_width_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Width_Read = {
  __typename?: 'MediaFields_width_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Width_Update = {
  __typename?: 'MediaFields_width_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaReadAccess = {
  __typename?: 'MediaReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaReadDocAccess = {
  __typename?: 'MediaReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaUpdateAccess = {
  __typename?: 'MediaUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaUpdateDocAccess = {
  __typename?: 'MediaUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type Media_Alt_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Media_Filename_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_Filesize_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_FocalX_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_FocalY_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_Height_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type Media_MimeType_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_ThumbnailUrl_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Media_Url_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_Where = {
  AND?: InputMaybe<Array<InputMaybe<Media_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Media_Where_Or>>>;
  alt?: InputMaybe<Media_Alt_Operator>;
  createdAt?: InputMaybe<Media_CreatedAt_Operator>;
  filename?: InputMaybe<Media_Filename_Operator>;
  filesize?: InputMaybe<Media_Filesize_Operator>;
  focalX?: InputMaybe<Media_FocalX_Operator>;
  focalY?: InputMaybe<Media_FocalY_Operator>;
  height?: InputMaybe<Media_Height_Operator>;
  id?: InputMaybe<Media_Id_Operator>;
  mimeType?: InputMaybe<Media_MimeType_Operator>;
  thumbnailURL?: InputMaybe<Media_ThumbnailUrl_Operator>;
  updatedAt?: InputMaybe<Media_UpdatedAt_Operator>;
  url?: InputMaybe<Media_Url_Operator>;
  width?: InputMaybe<Media_Width_Operator>;
};

export type Media_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Media_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Media_Where_Or>>>;
  alt?: InputMaybe<Media_Alt_Operator>;
  createdAt?: InputMaybe<Media_CreatedAt_Operator>;
  filename?: InputMaybe<Media_Filename_Operator>;
  filesize?: InputMaybe<Media_Filesize_Operator>;
  focalX?: InputMaybe<Media_FocalX_Operator>;
  focalY?: InputMaybe<Media_FocalY_Operator>;
  height?: InputMaybe<Media_Height_Operator>;
  id?: InputMaybe<Media_Id_Operator>;
  mimeType?: InputMaybe<Media_MimeType_Operator>;
  thumbnailURL?: InputMaybe<Media_ThumbnailUrl_Operator>;
  updatedAt?: InputMaybe<Media_UpdatedAt_Operator>;
  url?: InputMaybe<Media_Url_Operator>;
  width?: InputMaybe<Media_Width_Operator>;
};

export type Media_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Media_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Media_Where_Or>>>;
  alt?: InputMaybe<Media_Alt_Operator>;
  createdAt?: InputMaybe<Media_CreatedAt_Operator>;
  filename?: InputMaybe<Media_Filename_Operator>;
  filesize?: InputMaybe<Media_Filesize_Operator>;
  focalX?: InputMaybe<Media_FocalX_Operator>;
  focalY?: InputMaybe<Media_FocalY_Operator>;
  height?: InputMaybe<Media_Height_Operator>;
  id?: InputMaybe<Media_Id_Operator>;
  mimeType?: InputMaybe<Media_MimeType_Operator>;
  thumbnailURL?: InputMaybe<Media_ThumbnailUrl_Operator>;
  updatedAt?: InputMaybe<Media_UpdatedAt_Operator>;
  url?: InputMaybe<Media_Url_Operator>;
  width?: InputMaybe<Media_Width_Operator>;
};

export type Media_Width_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type MetricsSummary = {
  __typename?: 'MetricsSummary';
  agentRequests: AgentRequestMetrics;
  averageProcessingTimeMs: Scalars['Int']['output'];
  broadcasts: BroadcastMetrics;
  timestamp: Scalars['String']['output'];
};

export type ModelDefinition = {
  __typename?: 'ModelDefinition';
  apiKey: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  provider: ModelDefinition_Provider;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  value: Scalars['String']['output'];
};

export enum ModelDefinitionUpdate_Provider_MutationInput {
  Anthropic = 'anthropic',
  Google = 'google',
  Openai = 'openai',
  Openrouter = 'openrouter'
}

export type ModelDefinition_ApiKey_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ModelDefinition_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ModelDefinition_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type ModelDefinition_Label_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum ModelDefinition_Provider {
  Anthropic = 'anthropic',
  Google = 'google',
  Openai = 'openai',
  Openrouter = 'openrouter'
}

export enum ModelDefinition_Provider_Input {
  Anthropic = 'anthropic',
  Google = 'google',
  Openai = 'openai',
  Openrouter = 'openrouter'
}

export enum ModelDefinition_Provider_MutationInput {
  Anthropic = 'anthropic',
  Google = 'google',
  Openai = 'openai',
  Openrouter = 'openrouter'
}

export type ModelDefinition_Provider_Operator = {
  all?: InputMaybe<Array<InputMaybe<ModelDefinition_Provider_Input>>>;
  equals?: InputMaybe<ModelDefinition_Provider_Input>;
  in?: InputMaybe<Array<InputMaybe<ModelDefinition_Provider_Input>>>;
  not_equals?: InputMaybe<ModelDefinition_Provider_Input>;
  not_in?: InputMaybe<Array<InputMaybe<ModelDefinition_Provider_Input>>>;
};

export type ModelDefinition_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ModelDefinition_Value_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ModelDefinition_Where = {
  AND?: InputMaybe<Array<InputMaybe<ModelDefinition_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<ModelDefinition_Where_Or>>>;
  apiKey?: InputMaybe<ModelDefinition_ApiKey_Operator>;
  createdAt?: InputMaybe<ModelDefinition_CreatedAt_Operator>;
  id?: InputMaybe<ModelDefinition_Id_Operator>;
  label?: InputMaybe<ModelDefinition_Label_Operator>;
  provider?: InputMaybe<ModelDefinition_Provider_Operator>;
  updatedAt?: InputMaybe<ModelDefinition_UpdatedAt_Operator>;
  value?: InputMaybe<ModelDefinition_Value_Operator>;
};

export type ModelDefinition_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<ModelDefinition_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<ModelDefinition_Where_Or>>>;
  apiKey?: InputMaybe<ModelDefinition_ApiKey_Operator>;
  createdAt?: InputMaybe<ModelDefinition_CreatedAt_Operator>;
  id?: InputMaybe<ModelDefinition_Id_Operator>;
  label?: InputMaybe<ModelDefinition_Label_Operator>;
  provider?: InputMaybe<ModelDefinition_Provider_Operator>;
  updatedAt?: InputMaybe<ModelDefinition_UpdatedAt_Operator>;
  value?: InputMaybe<ModelDefinition_Value_Operator>;
};

export type ModelDefinition_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<ModelDefinition_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<ModelDefinition_Where_Or>>>;
  apiKey?: InputMaybe<ModelDefinition_ApiKey_Operator>;
  createdAt?: InputMaybe<ModelDefinition_CreatedAt_Operator>;
  id?: InputMaybe<ModelDefinition_Id_Operator>;
  label?: InputMaybe<ModelDefinition_Label_Operator>;
  provider?: InputMaybe<ModelDefinition_Provider_Operator>;
  updatedAt?: InputMaybe<ModelDefinition_UpdatedAt_Operator>;
  value?: InputMaybe<ModelDefinition_Value_Operator>;
};

export type ModelDefinitions = {
  __typename?: 'ModelDefinitions';
  docs: Array<ModelDefinition>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type ModelDefinitionsCreateAccess = {
  __typename?: 'ModelDefinitionsCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ModelDefinitionsCreateDocAccess = {
  __typename?: 'ModelDefinitionsCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ModelDefinitionsDeleteAccess = {
  __typename?: 'ModelDefinitionsDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ModelDefinitionsDeleteDocAccess = {
  __typename?: 'ModelDefinitionsDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ModelDefinitionsDocAccessFields = {
  __typename?: 'ModelDefinitionsDocAccessFields';
  apiKey?: Maybe<ModelDefinitionsDocAccessFields_ApiKey>;
  createdAt?: Maybe<ModelDefinitionsDocAccessFields_CreatedAt>;
  label?: Maybe<ModelDefinitionsDocAccessFields_Label>;
  provider?: Maybe<ModelDefinitionsDocAccessFields_Provider>;
  updatedAt?: Maybe<ModelDefinitionsDocAccessFields_UpdatedAt>;
  value?: Maybe<ModelDefinitionsDocAccessFields_Value>;
};

export type ModelDefinitionsDocAccessFields_ApiKey = {
  __typename?: 'ModelDefinitionsDocAccessFields_apiKey';
  create?: Maybe<ModelDefinitionsDocAccessFields_ApiKey_Create>;
  delete?: Maybe<ModelDefinitionsDocAccessFields_ApiKey_Delete>;
  read?: Maybe<ModelDefinitionsDocAccessFields_ApiKey_Read>;
  update?: Maybe<ModelDefinitionsDocAccessFields_ApiKey_Update>;
};

export type ModelDefinitionsDocAccessFields_ApiKey_Create = {
  __typename?: 'ModelDefinitionsDocAccessFields_apiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_ApiKey_Delete = {
  __typename?: 'ModelDefinitionsDocAccessFields_apiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_ApiKey_Read = {
  __typename?: 'ModelDefinitionsDocAccessFields_apiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_ApiKey_Update = {
  __typename?: 'ModelDefinitionsDocAccessFields_apiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_CreatedAt = {
  __typename?: 'ModelDefinitionsDocAccessFields_createdAt';
  create?: Maybe<ModelDefinitionsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<ModelDefinitionsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<ModelDefinitionsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<ModelDefinitionsDocAccessFields_CreatedAt_Update>;
};

export type ModelDefinitionsDocAccessFields_CreatedAt_Create = {
  __typename?: 'ModelDefinitionsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'ModelDefinitionsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_CreatedAt_Read = {
  __typename?: 'ModelDefinitionsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_CreatedAt_Update = {
  __typename?: 'ModelDefinitionsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_Label = {
  __typename?: 'ModelDefinitionsDocAccessFields_label';
  create?: Maybe<ModelDefinitionsDocAccessFields_Label_Create>;
  delete?: Maybe<ModelDefinitionsDocAccessFields_Label_Delete>;
  read?: Maybe<ModelDefinitionsDocAccessFields_Label_Read>;
  update?: Maybe<ModelDefinitionsDocAccessFields_Label_Update>;
};

export type ModelDefinitionsDocAccessFields_Label_Create = {
  __typename?: 'ModelDefinitionsDocAccessFields_label_Create';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_Label_Delete = {
  __typename?: 'ModelDefinitionsDocAccessFields_label_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_Label_Read = {
  __typename?: 'ModelDefinitionsDocAccessFields_label_Read';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_Label_Update = {
  __typename?: 'ModelDefinitionsDocAccessFields_label_Update';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_Provider = {
  __typename?: 'ModelDefinitionsDocAccessFields_provider';
  create?: Maybe<ModelDefinitionsDocAccessFields_Provider_Create>;
  delete?: Maybe<ModelDefinitionsDocAccessFields_Provider_Delete>;
  read?: Maybe<ModelDefinitionsDocAccessFields_Provider_Read>;
  update?: Maybe<ModelDefinitionsDocAccessFields_Provider_Update>;
};

export type ModelDefinitionsDocAccessFields_Provider_Create = {
  __typename?: 'ModelDefinitionsDocAccessFields_provider_Create';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_Provider_Delete = {
  __typename?: 'ModelDefinitionsDocAccessFields_provider_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_Provider_Read = {
  __typename?: 'ModelDefinitionsDocAccessFields_provider_Read';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_Provider_Update = {
  __typename?: 'ModelDefinitionsDocAccessFields_provider_Update';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_UpdatedAt = {
  __typename?: 'ModelDefinitionsDocAccessFields_updatedAt';
  create?: Maybe<ModelDefinitionsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<ModelDefinitionsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<ModelDefinitionsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<ModelDefinitionsDocAccessFields_UpdatedAt_Update>;
};

export type ModelDefinitionsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'ModelDefinitionsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'ModelDefinitionsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'ModelDefinitionsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'ModelDefinitionsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_Value = {
  __typename?: 'ModelDefinitionsDocAccessFields_value';
  create?: Maybe<ModelDefinitionsDocAccessFields_Value_Create>;
  delete?: Maybe<ModelDefinitionsDocAccessFields_Value_Delete>;
  read?: Maybe<ModelDefinitionsDocAccessFields_Value_Read>;
  update?: Maybe<ModelDefinitionsDocAccessFields_Value_Update>;
};

export type ModelDefinitionsDocAccessFields_Value_Create = {
  __typename?: 'ModelDefinitionsDocAccessFields_value_Create';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_Value_Delete = {
  __typename?: 'ModelDefinitionsDocAccessFields_value_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_Value_Read = {
  __typename?: 'ModelDefinitionsDocAccessFields_value_Read';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsDocAccessFields_Value_Update = {
  __typename?: 'ModelDefinitionsDocAccessFields_value_Update';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields = {
  __typename?: 'ModelDefinitionsFields';
  apiKey?: Maybe<ModelDefinitionsFields_ApiKey>;
  createdAt?: Maybe<ModelDefinitionsFields_CreatedAt>;
  label?: Maybe<ModelDefinitionsFields_Label>;
  provider?: Maybe<ModelDefinitionsFields_Provider>;
  updatedAt?: Maybe<ModelDefinitionsFields_UpdatedAt>;
  value?: Maybe<ModelDefinitionsFields_Value>;
};

export type ModelDefinitionsFields_ApiKey = {
  __typename?: 'ModelDefinitionsFields_apiKey';
  create?: Maybe<ModelDefinitionsFields_ApiKey_Create>;
  delete?: Maybe<ModelDefinitionsFields_ApiKey_Delete>;
  read?: Maybe<ModelDefinitionsFields_ApiKey_Read>;
  update?: Maybe<ModelDefinitionsFields_ApiKey_Update>;
};

export type ModelDefinitionsFields_ApiKey_Create = {
  __typename?: 'ModelDefinitionsFields_apiKey_Create';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_ApiKey_Delete = {
  __typename?: 'ModelDefinitionsFields_apiKey_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_ApiKey_Read = {
  __typename?: 'ModelDefinitionsFields_apiKey_Read';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_ApiKey_Update = {
  __typename?: 'ModelDefinitionsFields_apiKey_Update';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_CreatedAt = {
  __typename?: 'ModelDefinitionsFields_createdAt';
  create?: Maybe<ModelDefinitionsFields_CreatedAt_Create>;
  delete?: Maybe<ModelDefinitionsFields_CreatedAt_Delete>;
  read?: Maybe<ModelDefinitionsFields_CreatedAt_Read>;
  update?: Maybe<ModelDefinitionsFields_CreatedAt_Update>;
};

export type ModelDefinitionsFields_CreatedAt_Create = {
  __typename?: 'ModelDefinitionsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_CreatedAt_Delete = {
  __typename?: 'ModelDefinitionsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_CreatedAt_Read = {
  __typename?: 'ModelDefinitionsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_CreatedAt_Update = {
  __typename?: 'ModelDefinitionsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_Label = {
  __typename?: 'ModelDefinitionsFields_label';
  create?: Maybe<ModelDefinitionsFields_Label_Create>;
  delete?: Maybe<ModelDefinitionsFields_Label_Delete>;
  read?: Maybe<ModelDefinitionsFields_Label_Read>;
  update?: Maybe<ModelDefinitionsFields_Label_Update>;
};

export type ModelDefinitionsFields_Label_Create = {
  __typename?: 'ModelDefinitionsFields_label_Create';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_Label_Delete = {
  __typename?: 'ModelDefinitionsFields_label_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_Label_Read = {
  __typename?: 'ModelDefinitionsFields_label_Read';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_Label_Update = {
  __typename?: 'ModelDefinitionsFields_label_Update';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_Provider = {
  __typename?: 'ModelDefinitionsFields_provider';
  create?: Maybe<ModelDefinitionsFields_Provider_Create>;
  delete?: Maybe<ModelDefinitionsFields_Provider_Delete>;
  read?: Maybe<ModelDefinitionsFields_Provider_Read>;
  update?: Maybe<ModelDefinitionsFields_Provider_Update>;
};

export type ModelDefinitionsFields_Provider_Create = {
  __typename?: 'ModelDefinitionsFields_provider_Create';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_Provider_Delete = {
  __typename?: 'ModelDefinitionsFields_provider_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_Provider_Read = {
  __typename?: 'ModelDefinitionsFields_provider_Read';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_Provider_Update = {
  __typename?: 'ModelDefinitionsFields_provider_Update';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_UpdatedAt = {
  __typename?: 'ModelDefinitionsFields_updatedAt';
  create?: Maybe<ModelDefinitionsFields_UpdatedAt_Create>;
  delete?: Maybe<ModelDefinitionsFields_UpdatedAt_Delete>;
  read?: Maybe<ModelDefinitionsFields_UpdatedAt_Read>;
  update?: Maybe<ModelDefinitionsFields_UpdatedAt_Update>;
};

export type ModelDefinitionsFields_UpdatedAt_Create = {
  __typename?: 'ModelDefinitionsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_UpdatedAt_Delete = {
  __typename?: 'ModelDefinitionsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_UpdatedAt_Read = {
  __typename?: 'ModelDefinitionsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_UpdatedAt_Update = {
  __typename?: 'ModelDefinitionsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_Value = {
  __typename?: 'ModelDefinitionsFields_value';
  create?: Maybe<ModelDefinitionsFields_Value_Create>;
  delete?: Maybe<ModelDefinitionsFields_Value_Delete>;
  read?: Maybe<ModelDefinitionsFields_Value_Read>;
  update?: Maybe<ModelDefinitionsFields_Value_Update>;
};

export type ModelDefinitionsFields_Value_Create = {
  __typename?: 'ModelDefinitionsFields_value_Create';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_Value_Delete = {
  __typename?: 'ModelDefinitionsFields_value_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_Value_Read = {
  __typename?: 'ModelDefinitionsFields_value_Read';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsFields_Value_Update = {
  __typename?: 'ModelDefinitionsFields_value_Update';
  permission: Scalars['Boolean']['output'];
};

export type ModelDefinitionsReadAccess = {
  __typename?: 'ModelDefinitionsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ModelDefinitionsReadDocAccess = {
  __typename?: 'ModelDefinitionsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ModelDefinitionsUpdateAccess = {
  __typename?: 'ModelDefinitionsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ModelDefinitionsUpdateDocAccess = {
  __typename?: 'ModelDefinitionsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAgent?: Maybe<Agent>;
  createAgentMessage?: Maybe<AgentMessage>;
  createChannel?: Maybe<Channel>;
  createMedia?: Maybe<Media>;
  createModelDefinition?: Maybe<ModelDefinition>;
  createPayloadKv?: Maybe<PayloadKv>;
  createPayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  createPayloadPreference?: Maybe<PayloadPreference>;
  createThread?: Maybe<Thread>;
  createUser?: Maybe<User>;
  createUserMessage?: Maybe<UserMessage>;
  deleteAgent?: Maybe<Agent>;
  deleteAgentMessage?: Maybe<AgentMessage>;
  deleteChannel?: Maybe<Channel>;
  deleteMedia?: Maybe<Media>;
  deleteModelDefinition?: Maybe<ModelDefinition>;
  deletePayloadKv?: Maybe<PayloadKv>;
  deletePayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  deletePayloadPreference?: Maybe<PayloadPreference>;
  deleteThread?: Maybe<Thread>;
  deleteUser?: Maybe<User>;
  deleteUserMessage?: Maybe<UserMessage>;
  duplicateAgent?: Maybe<Agent>;
  duplicateAgentMessage?: Maybe<AgentMessage>;
  duplicateChannel?: Maybe<Channel>;
  duplicateMedia?: Maybe<Media>;
  duplicateModelDefinition?: Maybe<ModelDefinition>;
  duplicatePayloadKv?: Maybe<PayloadKv>;
  duplicatePayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  duplicatePayloadPreference?: Maybe<PayloadPreference>;
  duplicateThread?: Maybe<Thread>;
  duplicateUserMessage?: Maybe<UserMessage>;
  forceUnlockThread?: Maybe<ForceUnlockResult>;
  forgotPasswordUser: Scalars['Boolean']['output'];
  loginUser?: Maybe<UsersLoginResult>;
  logoutUser?: Maybe<Scalars['String']['output']>;
  refreshTokenUser?: Maybe<UsersRefreshedUser>;
  resetPasswordUser?: Maybe<UsersResetPassword>;
  unlockUser: Scalars['Boolean']['output'];
  updateAgent?: Maybe<Agent>;
  updateAgentMessage?: Maybe<AgentMessage>;
  updateChannel?: Maybe<Channel>;
  updateDocsMockDatum?: Maybe<DocsMockDatum>;
  updateMedia?: Maybe<Media>;
  updateModelDefinition?: Maybe<ModelDefinition>;
  updatePayloadKv?: Maybe<PayloadKv>;
  updatePayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  updatePayloadPreference?: Maybe<PayloadPreference>;
  updateThread?: Maybe<Thread>;
  updateUser?: Maybe<User>;
  updateUserMessage?: Maybe<UserMessage>;
  verifyEmailUser?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateAgentArgs = {
  data: MutationAgentInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateAgentMessageArgs = {
  data: MutationAgentMessageInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateChannelArgs = {
  data: MutationChannelInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateMediaArgs = {
  data: MutationMediaInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateModelDefinitionArgs = {
  data: MutationModelDefinitionInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreatePayloadKvArgs = {
  data: MutationPayloadKvInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreatePayloadLockedDocumentArgs = {
  data: MutationPayloadLockedDocumentInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreatePayloadPreferenceArgs = {
  data: MutationPayloadPreferenceInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateThreadArgs = {
  data: MutationThreadInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateUserArgs = {
  data: MutationUserInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateUserMessageArgs = {
  data: MutationUserMessageInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteAgentArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteAgentMessageArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteChannelArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteMediaArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteModelDefinitionArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeletePayloadKvArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeletePayloadLockedDocumentArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeletePayloadPreferenceArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteThreadArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteUserMessageArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDuplicateAgentArgs = {
  data: MutationAgentInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicateAgentMessageArgs = {
  data: MutationAgentMessageInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicateChannelArgs = {
  data: MutationChannelInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicateMediaArgs = {
  data: MutationMediaInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicateModelDefinitionArgs = {
  data: MutationModelDefinitionInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicatePayloadKvArgs = {
  data: MutationPayloadKvInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicatePayloadLockedDocumentArgs = {
  data: MutationPayloadLockedDocumentInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicatePayloadPreferenceArgs = {
  data: MutationPayloadPreferenceInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicateThreadArgs = {
  data: MutationThreadInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicateUserMessageArgs = {
  data: MutationUserMessageInput;
  id: Scalars['Int']['input'];
};


export type MutationForceUnlockThreadArgs = {
  threadUid: Scalars['String']['input'];
};


export type MutationForgotPasswordUserArgs = {
  disableEmail?: InputMaybe<Scalars['Boolean']['input']>;
  email: Scalars['String']['input'];
  expiration?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationLoginUserArgs = {
  email: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLogoutUserArgs = {
  allSessions?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationResetPasswordUserArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUnlockUserArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateAgentArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationAgentUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateAgentMessageArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationAgentMessageUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateChannelArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationChannelUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateDocsMockDatumArgs = {
  data: MutationDocsMockDatumInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateMediaArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationMediaUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateModelDefinitionArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationModelDefinitionUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdatePayloadKvArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationPayloadKvUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdatePayloadLockedDocumentArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationPayloadLockedDocumentUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdatePayloadPreferenceArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationPayloadPreferenceUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateThreadArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationThreadUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateUserArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationUserUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateUserMessageArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationUserMessageUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationVerifyEmailUserArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export type PayloadKv = {
  __typename?: 'PayloadKv';
  data: Scalars['JSON']['output'];
  id: Scalars['Int']['output'];
  key: Scalars['String']['output'];
};

export type PayloadKvCreateAccess = {
  __typename?: 'PayloadKvCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvCreateDocAccess = {
  __typename?: 'PayloadKvCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvDeleteAccess = {
  __typename?: 'PayloadKvDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvDeleteDocAccess = {
  __typename?: 'PayloadKvDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvDocAccessFields = {
  __typename?: 'PayloadKvDocAccessFields';
  data?: Maybe<PayloadKvDocAccessFields_Data>;
  key?: Maybe<PayloadKvDocAccessFields_Key>;
};

export type PayloadKvDocAccessFields_Data = {
  __typename?: 'PayloadKvDocAccessFields_data';
  create?: Maybe<PayloadKvDocAccessFields_Data_Create>;
  delete?: Maybe<PayloadKvDocAccessFields_Data_Delete>;
  read?: Maybe<PayloadKvDocAccessFields_Data_Read>;
  update?: Maybe<PayloadKvDocAccessFields_Data_Update>;
};

export type PayloadKvDocAccessFields_Data_Create = {
  __typename?: 'PayloadKvDocAccessFields_data_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Data_Delete = {
  __typename?: 'PayloadKvDocAccessFields_data_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Data_Read = {
  __typename?: 'PayloadKvDocAccessFields_data_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Data_Update = {
  __typename?: 'PayloadKvDocAccessFields_data_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Key = {
  __typename?: 'PayloadKvDocAccessFields_key';
  create?: Maybe<PayloadKvDocAccessFields_Key_Create>;
  delete?: Maybe<PayloadKvDocAccessFields_Key_Delete>;
  read?: Maybe<PayloadKvDocAccessFields_Key_Read>;
  update?: Maybe<PayloadKvDocAccessFields_Key_Update>;
};

export type PayloadKvDocAccessFields_Key_Create = {
  __typename?: 'PayloadKvDocAccessFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Key_Delete = {
  __typename?: 'PayloadKvDocAccessFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Key_Read = {
  __typename?: 'PayloadKvDocAccessFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Key_Update = {
  __typename?: 'PayloadKvDocAccessFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields = {
  __typename?: 'PayloadKvFields';
  data?: Maybe<PayloadKvFields_Data>;
  key?: Maybe<PayloadKvFields_Key>;
};

export type PayloadKvFields_Data = {
  __typename?: 'PayloadKvFields_data';
  create?: Maybe<PayloadKvFields_Data_Create>;
  delete?: Maybe<PayloadKvFields_Data_Delete>;
  read?: Maybe<PayloadKvFields_Data_Read>;
  update?: Maybe<PayloadKvFields_Data_Update>;
};

export type PayloadKvFields_Data_Create = {
  __typename?: 'PayloadKvFields_data_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Data_Delete = {
  __typename?: 'PayloadKvFields_data_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Data_Read = {
  __typename?: 'PayloadKvFields_data_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Data_Update = {
  __typename?: 'PayloadKvFields_data_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Key = {
  __typename?: 'PayloadKvFields_key';
  create?: Maybe<PayloadKvFields_Key_Create>;
  delete?: Maybe<PayloadKvFields_Key_Delete>;
  read?: Maybe<PayloadKvFields_Key_Read>;
  update?: Maybe<PayloadKvFields_Key_Update>;
};

export type PayloadKvFields_Key_Create = {
  __typename?: 'PayloadKvFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Key_Delete = {
  __typename?: 'PayloadKvFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Key_Read = {
  __typename?: 'PayloadKvFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Key_Update = {
  __typename?: 'PayloadKvFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvReadAccess = {
  __typename?: 'PayloadKvReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvReadDocAccess = {
  __typename?: 'PayloadKvReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvUpdateAccess = {
  __typename?: 'PayloadKvUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvUpdateDocAccess = {
  __typename?: 'PayloadKvUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKv_Data_Operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  intersects?: InputMaybe<Scalars['JSON']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  within?: InputMaybe<Scalars['JSON']['input']>;
};

export type PayloadKv_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type PayloadKv_Key_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadKv_Where = {
  AND?: InputMaybe<Array<InputMaybe<PayloadKv_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadKv_Where_Or>>>;
  data?: InputMaybe<PayloadKv_Data_Operator>;
  id?: InputMaybe<PayloadKv_Id_Operator>;
  key?: InputMaybe<PayloadKv_Key_Operator>;
};

export type PayloadKv_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<PayloadKv_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadKv_Where_Or>>>;
  data?: InputMaybe<PayloadKv_Data_Operator>;
  id?: InputMaybe<PayloadKv_Id_Operator>;
  key?: InputMaybe<PayloadKv_Key_Operator>;
};

export type PayloadKv_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<PayloadKv_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadKv_Where_Or>>>;
  data?: InputMaybe<PayloadKv_Data_Operator>;
  id?: InputMaybe<PayloadKv_Id_Operator>;
  key?: InputMaybe<PayloadKv_Key_Operator>;
};

export type PayloadKvs = {
  __typename?: 'PayloadKvs';
  docs: Array<PayloadKv>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PayloadLockedDocument = {
  __typename?: 'PayloadLockedDocument';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  document?: Maybe<PayloadLockedDocument_Document_Relationship>;
  globalSlug?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: PayloadLockedDocument_User_Relationship;
};

export type PayloadLockedDocumentUpdate_DocumentRelationshipInput = {
  relationTo?: InputMaybe<PayloadLockedDocumentUpdate_DocumentRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocumentUpdate_DocumentRelationshipInputRelationTo {
  AgentMessages = 'agentMessages',
  Agents = 'agents',
  Channels = 'channels',
  Media = 'media',
  ModelDefinitions = 'modelDefinitions',
  Threads = 'threads',
  UserMessages = 'userMessages',
  Users = 'users'
}

export type PayloadLockedDocumentUpdate_UserRelationshipInput = {
  relationTo?: InputMaybe<PayloadLockedDocumentUpdate_UserRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocumentUpdate_UserRelationshipInputRelationTo {
  Users = 'users'
}

export type PayloadLockedDocument_Document = Agent | AgentMessage | Channel | Media | ModelDefinition | Thread | User | UserMessage;

export type PayloadLockedDocument_DocumentRelationshipInput = {
  relationTo?: InputMaybe<PayloadLockedDocument_DocumentRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_DocumentRelationshipInputRelationTo {
  AgentMessages = 'agentMessages',
  Agents = 'agents',
  Channels = 'channels',
  Media = 'media',
  ModelDefinitions = 'modelDefinitions',
  Threads = 'threads',
  UserMessages = 'userMessages',
  Users = 'users'
}

export enum PayloadLockedDocument_Document_RelationTo {
  AgentMessages = 'agentMessages',
  Agents = 'agents',
  Channels = 'channels',
  Media = 'media',
  ModelDefinitions = 'modelDefinitions',
  Threads = 'threads',
  UserMessages = 'userMessages',
  Users = 'users'
}

export type PayloadLockedDocument_Document_Relationship = {
  __typename?: 'PayloadLockedDocument_Document_Relationship';
  relationTo?: Maybe<PayloadLockedDocument_Document_RelationTo>;
  value?: Maybe<PayloadLockedDocument_Document>;
};

export type PayloadLockedDocument_User = User;

export type PayloadLockedDocument_UserRelationshipInput = {
  relationTo?: InputMaybe<PayloadLockedDocument_UserRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_UserRelationshipInputRelationTo {
  Users = 'users'
}

export enum PayloadLockedDocument_User_RelationTo {
  Users = 'users'
}

export type PayloadLockedDocument_User_Relationship = {
  __typename?: 'PayloadLockedDocument_User_Relationship';
  relationTo?: Maybe<PayloadLockedDocument_User_RelationTo>;
  value?: Maybe<PayloadLockedDocument_User>;
};

export type PayloadLockedDocument_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadLockedDocument_Document_Relation = {
  relationTo?: InputMaybe<PayloadLockedDocument_Document_Relation_RelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_Document_Relation_RelationTo {
  AgentMessages = 'agentMessages',
  Agents = 'agents',
  Channels = 'channels',
  Media = 'media',
  ModelDefinitions = 'modelDefinitions',
  Threads = 'threads',
  UserMessages = 'userMessages',
  Users = 'users'
}

export type PayloadLockedDocument_GlobalSlug_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadLockedDocument_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type PayloadLockedDocument_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadLockedDocument_User_Relation = {
  relationTo?: InputMaybe<PayloadLockedDocument_User_Relation_RelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_User_Relation_RelationTo {
  Users = 'users'
}

export type PayloadLockedDocument_Where = {
  AND?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_Or>>>;
  createdAt?: InputMaybe<PayloadLockedDocument_CreatedAt_Operator>;
  document?: InputMaybe<PayloadLockedDocument_Document_Relation>;
  globalSlug?: InputMaybe<PayloadLockedDocument_GlobalSlug_Operator>;
  id?: InputMaybe<PayloadLockedDocument_Id_Operator>;
  updatedAt?: InputMaybe<PayloadLockedDocument_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadLockedDocument_User_Relation>;
};

export type PayloadLockedDocument_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_Or>>>;
  createdAt?: InputMaybe<PayloadLockedDocument_CreatedAt_Operator>;
  document?: InputMaybe<PayloadLockedDocument_Document_Relation>;
  globalSlug?: InputMaybe<PayloadLockedDocument_GlobalSlug_Operator>;
  id?: InputMaybe<PayloadLockedDocument_Id_Operator>;
  updatedAt?: InputMaybe<PayloadLockedDocument_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadLockedDocument_User_Relation>;
};

export type PayloadLockedDocument_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_Or>>>;
  createdAt?: InputMaybe<PayloadLockedDocument_CreatedAt_Operator>;
  document?: InputMaybe<PayloadLockedDocument_Document_Relation>;
  globalSlug?: InputMaybe<PayloadLockedDocument_GlobalSlug_Operator>;
  id?: InputMaybe<PayloadLockedDocument_Id_Operator>;
  updatedAt?: InputMaybe<PayloadLockedDocument_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadLockedDocument_User_Relation>;
};

export type PayloadLockedDocuments = {
  __typename?: 'PayloadLockedDocuments';
  docs: Array<PayloadLockedDocument>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PayloadLockedDocumentsCreateAccess = {
  __typename?: 'PayloadLockedDocumentsCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsCreateDocAccess = {
  __typename?: 'PayloadLockedDocumentsCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsDeleteAccess = {
  __typename?: 'PayloadLockedDocumentsDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsDeleteDocAccess = {
  __typename?: 'PayloadLockedDocumentsDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsDocAccessFields = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields';
  createdAt?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt>;
  document?: Maybe<PayloadLockedDocumentsDocAccessFields_Document>;
  globalSlug?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug>;
  updatedAt?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt>;
  user?: Maybe<PayloadLockedDocumentsDocAccessFields_User>;
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_Document = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_Document_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_Document_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_Document_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_Document_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_Document_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_Document_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_Document_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_Document_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_User = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_User_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_User_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_User_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_User_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_User_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_User_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_User_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_User_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields = {
  __typename?: 'PayloadLockedDocumentsFields';
  createdAt?: Maybe<PayloadLockedDocumentsFields_CreatedAt>;
  document?: Maybe<PayloadLockedDocumentsFields_Document>;
  globalSlug?: Maybe<PayloadLockedDocumentsFields_GlobalSlug>;
  updatedAt?: Maybe<PayloadLockedDocumentsFields_UpdatedAt>;
  user?: Maybe<PayloadLockedDocumentsFields_User>;
};

export type PayloadLockedDocumentsFields_CreatedAt = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt';
  create?: Maybe<PayloadLockedDocumentsFields_CreatedAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_CreatedAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_CreatedAt_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_CreatedAt_Update>;
};

export type PayloadLockedDocumentsFields_CreatedAt_Create = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_CreatedAt_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_CreatedAt_Read = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_CreatedAt_Update = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_Document = {
  __typename?: 'PayloadLockedDocumentsFields_document';
  create?: Maybe<PayloadLockedDocumentsFields_Document_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_Document_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_Document_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_Document_Update>;
};

export type PayloadLockedDocumentsFields_Document_Create = {
  __typename?: 'PayloadLockedDocumentsFields_document_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_Document_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_document_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_Document_Read = {
  __typename?: 'PayloadLockedDocumentsFields_document_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_Document_Update = {
  __typename?: 'PayloadLockedDocumentsFields_document_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_GlobalSlug = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug';
  create?: Maybe<PayloadLockedDocumentsFields_GlobalSlug_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_GlobalSlug_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_GlobalSlug_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_GlobalSlug_Update>;
};

export type PayloadLockedDocumentsFields_GlobalSlug_Create = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_GlobalSlug_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_GlobalSlug_Read = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_GlobalSlug_Update = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_UpdatedAt = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt';
  create?: Maybe<PayloadLockedDocumentsFields_UpdatedAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_UpdatedAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_UpdatedAt_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_UpdatedAt_Update>;
};

export type PayloadLockedDocumentsFields_UpdatedAt_Create = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_UpdatedAt_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_UpdatedAt_Read = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_UpdatedAt_Update = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_User = {
  __typename?: 'PayloadLockedDocumentsFields_user';
  create?: Maybe<PayloadLockedDocumentsFields_User_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_User_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_User_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_User_Update>;
};

export type PayloadLockedDocumentsFields_User_Create = {
  __typename?: 'PayloadLockedDocumentsFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_User_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_User_Read = {
  __typename?: 'PayloadLockedDocumentsFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_User_Update = {
  __typename?: 'PayloadLockedDocumentsFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsReadAccess = {
  __typename?: 'PayloadLockedDocumentsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsReadDocAccess = {
  __typename?: 'PayloadLockedDocumentsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsUpdateAccess = {
  __typename?: 'PayloadLockedDocumentsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsUpdateDocAccess = {
  __typename?: 'PayloadLockedDocumentsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreference = {
  __typename?: 'PayloadPreference';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  key?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: PayloadPreference_User_Relationship;
  value?: Maybe<Scalars['JSON']['output']>;
};

export type PayloadPreferenceUpdate_UserRelationshipInput = {
  relationTo?: InputMaybe<PayloadPreferenceUpdate_UserRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadPreferenceUpdate_UserRelationshipInputRelationTo {
  Users = 'users'
}

export type PayloadPreference_User = User;

export type PayloadPreference_UserRelationshipInput = {
  relationTo?: InputMaybe<PayloadPreference_UserRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadPreference_UserRelationshipInputRelationTo {
  Users = 'users'
}

export enum PayloadPreference_User_RelationTo {
  Users = 'users'
}

export type PayloadPreference_User_Relationship = {
  __typename?: 'PayloadPreference_User_Relationship';
  relationTo?: Maybe<PayloadPreference_User_RelationTo>;
  value?: Maybe<PayloadPreference_User>;
};

export type PayloadPreference_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadPreference_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type PayloadPreference_Key_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadPreference_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadPreference_User_Relation = {
  relationTo?: InputMaybe<PayloadPreference_User_Relation_RelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadPreference_User_Relation_RelationTo {
  Users = 'users'
}

export type PayloadPreference_Value_Operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  intersects?: InputMaybe<Scalars['JSON']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  within?: InputMaybe<Scalars['JSON']['input']>;
};

export type PayloadPreference_Where = {
  AND?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_Or>>>;
  createdAt?: InputMaybe<PayloadPreference_CreatedAt_Operator>;
  id?: InputMaybe<PayloadPreference_Id_Operator>;
  key?: InputMaybe<PayloadPreference_Key_Operator>;
  updatedAt?: InputMaybe<PayloadPreference_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadPreference_User_Relation>;
  value?: InputMaybe<PayloadPreference_Value_Operator>;
};

export type PayloadPreference_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_Or>>>;
  createdAt?: InputMaybe<PayloadPreference_CreatedAt_Operator>;
  id?: InputMaybe<PayloadPreference_Id_Operator>;
  key?: InputMaybe<PayloadPreference_Key_Operator>;
  updatedAt?: InputMaybe<PayloadPreference_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadPreference_User_Relation>;
  value?: InputMaybe<PayloadPreference_Value_Operator>;
};

export type PayloadPreference_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_Or>>>;
  createdAt?: InputMaybe<PayloadPreference_CreatedAt_Operator>;
  id?: InputMaybe<PayloadPreference_Id_Operator>;
  key?: InputMaybe<PayloadPreference_Key_Operator>;
  updatedAt?: InputMaybe<PayloadPreference_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadPreference_User_Relation>;
  value?: InputMaybe<PayloadPreference_Value_Operator>;
};

export type PayloadPreferences = {
  __typename?: 'PayloadPreferences';
  docs: Array<PayloadPreference>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PayloadPreferencesCreateAccess = {
  __typename?: 'PayloadPreferencesCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesCreateDocAccess = {
  __typename?: 'PayloadPreferencesCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesDeleteAccess = {
  __typename?: 'PayloadPreferencesDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesDeleteDocAccess = {
  __typename?: 'PayloadPreferencesDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesDocAccessFields = {
  __typename?: 'PayloadPreferencesDocAccessFields';
  createdAt?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt>;
  key?: Maybe<PayloadPreferencesDocAccessFields_Key>;
  updatedAt?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt>;
  user?: Maybe<PayloadPreferencesDocAccessFields_User>;
  value?: Maybe<PayloadPreferencesDocAccessFields_Value>;
};

export type PayloadPreferencesDocAccessFields_CreatedAt = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt';
  create?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt_Update>;
};

export type PayloadPreferencesDocAccessFields_CreatedAt_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_CreatedAt_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_CreatedAt_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_CreatedAt_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Key = {
  __typename?: 'PayloadPreferencesDocAccessFields_key';
  create?: Maybe<PayloadPreferencesDocAccessFields_Key_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_Key_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_Key_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_Key_Update>;
};

export type PayloadPreferencesDocAccessFields_Key_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Key_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Key_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Key_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_UpdatedAt = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt';
  create?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt_Update>;
};

export type PayloadPreferencesDocAccessFields_UpdatedAt_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_UpdatedAt_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_UpdatedAt_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_User = {
  __typename?: 'PayloadPreferencesDocAccessFields_user';
  create?: Maybe<PayloadPreferencesDocAccessFields_User_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_User_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_User_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_User_Update>;
};

export type PayloadPreferencesDocAccessFields_User_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_User_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_User_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_User_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Value = {
  __typename?: 'PayloadPreferencesDocAccessFields_value';
  create?: Maybe<PayloadPreferencesDocAccessFields_Value_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_Value_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_Value_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_Value_Update>;
};

export type PayloadPreferencesDocAccessFields_Value_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Value_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Value_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Value_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields = {
  __typename?: 'PayloadPreferencesFields';
  createdAt?: Maybe<PayloadPreferencesFields_CreatedAt>;
  key?: Maybe<PayloadPreferencesFields_Key>;
  updatedAt?: Maybe<PayloadPreferencesFields_UpdatedAt>;
  user?: Maybe<PayloadPreferencesFields_User>;
  value?: Maybe<PayloadPreferencesFields_Value>;
};

export type PayloadPreferencesFields_CreatedAt = {
  __typename?: 'PayloadPreferencesFields_createdAt';
  create?: Maybe<PayloadPreferencesFields_CreatedAt_Create>;
  delete?: Maybe<PayloadPreferencesFields_CreatedAt_Delete>;
  read?: Maybe<PayloadPreferencesFields_CreatedAt_Read>;
  update?: Maybe<PayloadPreferencesFields_CreatedAt_Update>;
};

export type PayloadPreferencesFields_CreatedAt_Create = {
  __typename?: 'PayloadPreferencesFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_CreatedAt_Delete = {
  __typename?: 'PayloadPreferencesFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_CreatedAt_Read = {
  __typename?: 'PayloadPreferencesFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_CreatedAt_Update = {
  __typename?: 'PayloadPreferencesFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Key = {
  __typename?: 'PayloadPreferencesFields_key';
  create?: Maybe<PayloadPreferencesFields_Key_Create>;
  delete?: Maybe<PayloadPreferencesFields_Key_Delete>;
  read?: Maybe<PayloadPreferencesFields_Key_Read>;
  update?: Maybe<PayloadPreferencesFields_Key_Update>;
};

export type PayloadPreferencesFields_Key_Create = {
  __typename?: 'PayloadPreferencesFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Key_Delete = {
  __typename?: 'PayloadPreferencesFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Key_Read = {
  __typename?: 'PayloadPreferencesFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Key_Update = {
  __typename?: 'PayloadPreferencesFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_UpdatedAt = {
  __typename?: 'PayloadPreferencesFields_updatedAt';
  create?: Maybe<PayloadPreferencesFields_UpdatedAt_Create>;
  delete?: Maybe<PayloadPreferencesFields_UpdatedAt_Delete>;
  read?: Maybe<PayloadPreferencesFields_UpdatedAt_Read>;
  update?: Maybe<PayloadPreferencesFields_UpdatedAt_Update>;
};

export type PayloadPreferencesFields_UpdatedAt_Create = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_UpdatedAt_Delete = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_UpdatedAt_Read = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_UpdatedAt_Update = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_User = {
  __typename?: 'PayloadPreferencesFields_user';
  create?: Maybe<PayloadPreferencesFields_User_Create>;
  delete?: Maybe<PayloadPreferencesFields_User_Delete>;
  read?: Maybe<PayloadPreferencesFields_User_Read>;
  update?: Maybe<PayloadPreferencesFields_User_Update>;
};

export type PayloadPreferencesFields_User_Create = {
  __typename?: 'PayloadPreferencesFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_User_Delete = {
  __typename?: 'PayloadPreferencesFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_User_Read = {
  __typename?: 'PayloadPreferencesFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_User_Update = {
  __typename?: 'PayloadPreferencesFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Value = {
  __typename?: 'PayloadPreferencesFields_value';
  create?: Maybe<PayloadPreferencesFields_Value_Create>;
  delete?: Maybe<PayloadPreferencesFields_Value_Delete>;
  read?: Maybe<PayloadPreferencesFields_Value_Read>;
  update?: Maybe<PayloadPreferencesFields_Value_Update>;
};

export type PayloadPreferencesFields_Value_Create = {
  __typename?: 'PayloadPreferencesFields_value_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Value_Delete = {
  __typename?: 'PayloadPreferencesFields_value_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Value_Read = {
  __typename?: 'PayloadPreferencesFields_value_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Value_Update = {
  __typename?: 'PayloadPreferencesFields_value_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesReadAccess = {
  __typename?: 'PayloadPreferencesReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesReadDocAccess = {
  __typename?: 'PayloadPreferencesReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesUpdateAccess = {
  __typename?: 'PayloadPreferencesUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesUpdateDocAccess = {
  __typename?: 'PayloadPreferencesUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type Query = {
  __typename?: 'Query';
  Access?: Maybe<Access>;
  Agent?: Maybe<Agent>;
  AgentMessage?: Maybe<AgentMessage>;
  AgentMessages?: Maybe<AgentMessages>;
  Agents?: Maybe<Agents>;
  Channel?: Maybe<Channel>;
  Channels?: Maybe<Channels>;
  DocsMockDatum?: Maybe<DocsMockDatum>;
  Media?: Maybe<Media>;
  Message?: Maybe<VirtualMessage>;
  Messages?: Maybe<VirtualMessagesResponse>;
  ModelDefinition?: Maybe<ModelDefinition>;
  ModelDefinitions?: Maybe<ModelDefinitions>;
  PayloadKv?: Maybe<PayloadKv>;
  PayloadKvs?: Maybe<PayloadKvs>;
  PayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  PayloadLockedDocuments?: Maybe<PayloadLockedDocuments>;
  PayloadPreference?: Maybe<PayloadPreference>;
  PayloadPreferences?: Maybe<PayloadPreferences>;
  RecentMessages?: Maybe<RecentMessagesResponse>;
  Thread?: Maybe<Thread>;
  Threads?: Maybe<Threads>;
  User?: Maybe<User>;
  UserMessage?: Maybe<UserMessage>;
  UserMessages?: Maybe<UserMessages>;
  Users?: Maybe<Users>;
  allMedia?: Maybe<AllMedia>;
  countAgentMessages?: Maybe<CountAgentMessages>;
  countAgents?: Maybe<CountAgents>;
  countChannels?: Maybe<CountChannels>;
  countModelDefinitions?: Maybe<CountModelDefinitions>;
  countPayloadKvs?: Maybe<CountPayloadKvs>;
  countPayloadLockedDocuments?: Maybe<CountPayloadLockedDocuments>;
  countPayloadPreferences?: Maybe<CountPayloadPreferences>;
  countThreads?: Maybe<CountThreads>;
  countUserMessages?: Maybe<CountUserMessages>;
  countUsers?: Maybe<CountUsers>;
  countallMedia?: Maybe<CountallMedia>;
  docAccessAgent?: Maybe<AgentsDocAccess>;
  docAccessAgentMessage?: Maybe<AgentMessagesDocAccess>;
  docAccessChannel?: Maybe<ChannelsDocAccess>;
  docAccessDocsMockDatum?: Maybe<DocsMockDataDocAccess>;
  docAccessMedia?: Maybe<MediaDocAccess>;
  docAccessModelDefinition?: Maybe<ModelDefinitionsDocAccess>;
  docAccessPayloadKv?: Maybe<Payload_KvDocAccess>;
  docAccessPayloadLockedDocument?: Maybe<Payload_Locked_DocumentsDocAccess>;
  docAccessPayloadPreference?: Maybe<Payload_PreferencesDocAccess>;
  docAccessThread?: Maybe<ThreadsDocAccess>;
  docAccessUser?: Maybe<UsersDocAccess>;
  docAccessUserMessage?: Maybe<UserMessagesDocAccess>;
  health?: Maybe<HealthStatus>;
  initializedUser?: Maybe<Scalars['Boolean']['output']>;
  meUser?: Maybe<UsersMe>;
  metrics?: Maybe<MetricsSummary>;
  threadLockStatus?: Maybe<ThreadLockStatus>;
};


export type QueryAgentArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAgentMessageArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAgentMessagesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AgentMessage_Where>;
};


export type QueryAgentsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Agent_Where>;
};


export type QueryChannelArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryChannelsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Channel_Where>;
};


export type QueryDocsMockDatumArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryMediaArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryMessageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMessagesArgs = {
  channelUid?: InputMaybe<Scalars['String']['input']>;
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  senderAgentUid?: InputMaybe<Scalars['String']['input']>;
  senderType?: InputMaybe<Scalars['String']['input']>;
  senderUserUid?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  threadUid: Scalars['String']['input'];
};


export type QueryModelDefinitionArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryModelDefinitionsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ModelDefinition_Where>;
};


export type QueryPayloadKvArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPayloadKvsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadKv_Where>;
};


export type QueryPayloadLockedDocumentArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPayloadLockedDocumentsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadLockedDocument_Where>;
};


export type QueryPayloadPreferenceArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPayloadPreferencesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadPreference_Where>;
};


export type QueryRecentMessagesArgs = {
  channelUid?: InputMaybe<Scalars['String']['input']>;
  senderType?: InputMaybe<Scalars['String']['input']>;
  threadUid: Scalars['String']['input'];
};


export type QueryThreadArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryThreadsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Thread_Where>;
};


export type QueryUserArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUserMessageArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUserMessagesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<UserMessage_Where>;
};


export type QueryUsersArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<User_Where>;
};


export type QueryAllMediaArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Media_Where>;
};


export type QueryCountAgentMessagesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AgentMessage_Where>;
};


export type QueryCountAgentsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Agent_Where>;
};


export type QueryCountChannelsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Channel_Where>;
};


export type QueryCountModelDefinitionsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ModelDefinition_Where>;
};


export type QueryCountPayloadKvsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadKv_Where>;
};


export type QueryCountPayloadLockedDocumentsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadLockedDocument_Where>;
};


export type QueryCountPayloadPreferencesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadPreference_Where>;
};


export type QueryCountThreadsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Thread_Where>;
};


export type QueryCountUserMessagesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<UserMessage_Where>;
};


export type QueryCountUsersArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<User_Where>;
};


export type QueryCountallMediaArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Media_Where>;
};


export type QueryDocAccessAgentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessAgentMessageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessChannelArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessMediaArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessModelDefinitionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessPayloadKvArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessPayloadLockedDocumentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessPayloadPreferenceArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessThreadArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessUserMessageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryThreadLockStatusArgs = {
  threadUid: Scalars['String']['input'];
};

export type RecentMessagesResponse = {
  __typename?: 'RecentMessagesResponse';
  docs?: Maybe<Array<Maybe<VirtualMessage>>>;
  source?: Maybe<Scalars['String']['output']>;
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type Thread = {
  __typename?: 'Thread';
  channel: Channel;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  lockReason?: Maybe<Scalars['String']['output']>;
  lockedAt?: Maybe<Scalars['DateTime']['output']>;
  threadUid: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ThreadLockStatus = {
  __typename?: 'ThreadLockStatus';
  isLocked: Scalars['Boolean']['output'];
  lockReason?: Maybe<Scalars['String']['output']>;
  lockedAt?: Maybe<Scalars['String']['output']>;
  threadUid: Scalars['String']['output'];
};

export type Thread_Channel_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Thread_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Thread_DeletedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Thread_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type Thread_LockReason_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Thread_LockedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Thread_ThreadUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Thread_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Thread_Where = {
  AND?: InputMaybe<Array<InputMaybe<Thread_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Thread_Where_Or>>>;
  channel?: InputMaybe<Thread_Channel_Operator>;
  createdAt?: InputMaybe<Thread_CreatedAt_Operator>;
  deletedAt?: InputMaybe<Thread_DeletedAt_Operator>;
  id?: InputMaybe<Thread_Id_Operator>;
  lockReason?: InputMaybe<Thread_LockReason_Operator>;
  lockedAt?: InputMaybe<Thread_LockedAt_Operator>;
  threadUid?: InputMaybe<Thread_ThreadUid_Operator>;
  updatedAt?: InputMaybe<Thread_UpdatedAt_Operator>;
};

export type Thread_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Thread_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Thread_Where_Or>>>;
  channel?: InputMaybe<Thread_Channel_Operator>;
  createdAt?: InputMaybe<Thread_CreatedAt_Operator>;
  deletedAt?: InputMaybe<Thread_DeletedAt_Operator>;
  id?: InputMaybe<Thread_Id_Operator>;
  lockReason?: InputMaybe<Thread_LockReason_Operator>;
  lockedAt?: InputMaybe<Thread_LockedAt_Operator>;
  threadUid?: InputMaybe<Thread_ThreadUid_Operator>;
  updatedAt?: InputMaybe<Thread_UpdatedAt_Operator>;
};

export type Thread_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Thread_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Thread_Where_Or>>>;
  channel?: InputMaybe<Thread_Channel_Operator>;
  createdAt?: InputMaybe<Thread_CreatedAt_Operator>;
  deletedAt?: InputMaybe<Thread_DeletedAt_Operator>;
  id?: InputMaybe<Thread_Id_Operator>;
  lockReason?: InputMaybe<Thread_LockReason_Operator>;
  lockedAt?: InputMaybe<Thread_LockedAt_Operator>;
  threadUid?: InputMaybe<Thread_ThreadUid_Operator>;
  updatedAt?: InputMaybe<Thread_UpdatedAt_Operator>;
};

export type Threads = {
  __typename?: 'Threads';
  docs: Array<Thread>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type ThreadsCreateAccess = {
  __typename?: 'ThreadsCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ThreadsCreateDocAccess = {
  __typename?: 'ThreadsCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ThreadsDeleteAccess = {
  __typename?: 'ThreadsDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ThreadsDeleteDocAccess = {
  __typename?: 'ThreadsDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ThreadsDocAccessFields = {
  __typename?: 'ThreadsDocAccessFields';
  channel?: Maybe<ThreadsDocAccessFields_Channel>;
  createdAt?: Maybe<ThreadsDocAccessFields_CreatedAt>;
  deletedAt?: Maybe<ThreadsDocAccessFields_DeletedAt>;
  lockReason?: Maybe<ThreadsDocAccessFields_LockReason>;
  lockedAt?: Maybe<ThreadsDocAccessFields_LockedAt>;
  threadUid?: Maybe<ThreadsDocAccessFields_ThreadUid>;
  updatedAt?: Maybe<ThreadsDocAccessFields_UpdatedAt>;
};

export type ThreadsDocAccessFields_Channel = {
  __typename?: 'ThreadsDocAccessFields_channel';
  create?: Maybe<ThreadsDocAccessFields_Channel_Create>;
  delete?: Maybe<ThreadsDocAccessFields_Channel_Delete>;
  read?: Maybe<ThreadsDocAccessFields_Channel_Read>;
  update?: Maybe<ThreadsDocAccessFields_Channel_Update>;
};

export type ThreadsDocAccessFields_Channel_Create = {
  __typename?: 'ThreadsDocAccessFields_channel_Create';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_Channel_Delete = {
  __typename?: 'ThreadsDocAccessFields_channel_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_Channel_Read = {
  __typename?: 'ThreadsDocAccessFields_channel_Read';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_Channel_Update = {
  __typename?: 'ThreadsDocAccessFields_channel_Update';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_CreatedAt = {
  __typename?: 'ThreadsDocAccessFields_createdAt';
  create?: Maybe<ThreadsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<ThreadsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<ThreadsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<ThreadsDocAccessFields_CreatedAt_Update>;
};

export type ThreadsDocAccessFields_CreatedAt_Create = {
  __typename?: 'ThreadsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'ThreadsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_CreatedAt_Read = {
  __typename?: 'ThreadsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_CreatedAt_Update = {
  __typename?: 'ThreadsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_DeletedAt = {
  __typename?: 'ThreadsDocAccessFields_deletedAt';
  create?: Maybe<ThreadsDocAccessFields_DeletedAt_Create>;
  delete?: Maybe<ThreadsDocAccessFields_DeletedAt_Delete>;
  read?: Maybe<ThreadsDocAccessFields_DeletedAt_Read>;
  update?: Maybe<ThreadsDocAccessFields_DeletedAt_Update>;
};

export type ThreadsDocAccessFields_DeletedAt_Create = {
  __typename?: 'ThreadsDocAccessFields_deletedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_DeletedAt_Delete = {
  __typename?: 'ThreadsDocAccessFields_deletedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_DeletedAt_Read = {
  __typename?: 'ThreadsDocAccessFields_deletedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_DeletedAt_Update = {
  __typename?: 'ThreadsDocAccessFields_deletedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_LockReason = {
  __typename?: 'ThreadsDocAccessFields_lockReason';
  create?: Maybe<ThreadsDocAccessFields_LockReason_Create>;
  delete?: Maybe<ThreadsDocAccessFields_LockReason_Delete>;
  read?: Maybe<ThreadsDocAccessFields_LockReason_Read>;
  update?: Maybe<ThreadsDocAccessFields_LockReason_Update>;
};

export type ThreadsDocAccessFields_LockReason_Create = {
  __typename?: 'ThreadsDocAccessFields_lockReason_Create';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_LockReason_Delete = {
  __typename?: 'ThreadsDocAccessFields_lockReason_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_LockReason_Read = {
  __typename?: 'ThreadsDocAccessFields_lockReason_Read';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_LockReason_Update = {
  __typename?: 'ThreadsDocAccessFields_lockReason_Update';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_LockedAt = {
  __typename?: 'ThreadsDocAccessFields_lockedAt';
  create?: Maybe<ThreadsDocAccessFields_LockedAt_Create>;
  delete?: Maybe<ThreadsDocAccessFields_LockedAt_Delete>;
  read?: Maybe<ThreadsDocAccessFields_LockedAt_Read>;
  update?: Maybe<ThreadsDocAccessFields_LockedAt_Update>;
};

export type ThreadsDocAccessFields_LockedAt_Create = {
  __typename?: 'ThreadsDocAccessFields_lockedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_LockedAt_Delete = {
  __typename?: 'ThreadsDocAccessFields_lockedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_LockedAt_Read = {
  __typename?: 'ThreadsDocAccessFields_lockedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_LockedAt_Update = {
  __typename?: 'ThreadsDocAccessFields_lockedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_ThreadUid = {
  __typename?: 'ThreadsDocAccessFields_threadUid';
  create?: Maybe<ThreadsDocAccessFields_ThreadUid_Create>;
  delete?: Maybe<ThreadsDocAccessFields_ThreadUid_Delete>;
  read?: Maybe<ThreadsDocAccessFields_ThreadUid_Read>;
  update?: Maybe<ThreadsDocAccessFields_ThreadUid_Update>;
};

export type ThreadsDocAccessFields_ThreadUid_Create = {
  __typename?: 'ThreadsDocAccessFields_threadUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_ThreadUid_Delete = {
  __typename?: 'ThreadsDocAccessFields_threadUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_ThreadUid_Read = {
  __typename?: 'ThreadsDocAccessFields_threadUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_ThreadUid_Update = {
  __typename?: 'ThreadsDocAccessFields_threadUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_UpdatedAt = {
  __typename?: 'ThreadsDocAccessFields_updatedAt';
  create?: Maybe<ThreadsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<ThreadsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<ThreadsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<ThreadsDocAccessFields_UpdatedAt_Update>;
};

export type ThreadsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'ThreadsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'ThreadsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'ThreadsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'ThreadsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields = {
  __typename?: 'ThreadsFields';
  channel?: Maybe<ThreadsFields_Channel>;
  createdAt?: Maybe<ThreadsFields_CreatedAt>;
  deletedAt?: Maybe<ThreadsFields_DeletedAt>;
  lockReason?: Maybe<ThreadsFields_LockReason>;
  lockedAt?: Maybe<ThreadsFields_LockedAt>;
  threadUid?: Maybe<ThreadsFields_ThreadUid>;
  updatedAt?: Maybe<ThreadsFields_UpdatedAt>;
};

export type ThreadsFields_Channel = {
  __typename?: 'ThreadsFields_channel';
  create?: Maybe<ThreadsFields_Channel_Create>;
  delete?: Maybe<ThreadsFields_Channel_Delete>;
  read?: Maybe<ThreadsFields_Channel_Read>;
  update?: Maybe<ThreadsFields_Channel_Update>;
};

export type ThreadsFields_Channel_Create = {
  __typename?: 'ThreadsFields_channel_Create';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_Channel_Delete = {
  __typename?: 'ThreadsFields_channel_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_Channel_Read = {
  __typename?: 'ThreadsFields_channel_Read';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_Channel_Update = {
  __typename?: 'ThreadsFields_channel_Update';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_CreatedAt = {
  __typename?: 'ThreadsFields_createdAt';
  create?: Maybe<ThreadsFields_CreatedAt_Create>;
  delete?: Maybe<ThreadsFields_CreatedAt_Delete>;
  read?: Maybe<ThreadsFields_CreatedAt_Read>;
  update?: Maybe<ThreadsFields_CreatedAt_Update>;
};

export type ThreadsFields_CreatedAt_Create = {
  __typename?: 'ThreadsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_CreatedAt_Delete = {
  __typename?: 'ThreadsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_CreatedAt_Read = {
  __typename?: 'ThreadsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_CreatedAt_Update = {
  __typename?: 'ThreadsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_DeletedAt = {
  __typename?: 'ThreadsFields_deletedAt';
  create?: Maybe<ThreadsFields_DeletedAt_Create>;
  delete?: Maybe<ThreadsFields_DeletedAt_Delete>;
  read?: Maybe<ThreadsFields_DeletedAt_Read>;
  update?: Maybe<ThreadsFields_DeletedAt_Update>;
};

export type ThreadsFields_DeletedAt_Create = {
  __typename?: 'ThreadsFields_deletedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_DeletedAt_Delete = {
  __typename?: 'ThreadsFields_deletedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_DeletedAt_Read = {
  __typename?: 'ThreadsFields_deletedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_DeletedAt_Update = {
  __typename?: 'ThreadsFields_deletedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_LockReason = {
  __typename?: 'ThreadsFields_lockReason';
  create?: Maybe<ThreadsFields_LockReason_Create>;
  delete?: Maybe<ThreadsFields_LockReason_Delete>;
  read?: Maybe<ThreadsFields_LockReason_Read>;
  update?: Maybe<ThreadsFields_LockReason_Update>;
};

export type ThreadsFields_LockReason_Create = {
  __typename?: 'ThreadsFields_lockReason_Create';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_LockReason_Delete = {
  __typename?: 'ThreadsFields_lockReason_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_LockReason_Read = {
  __typename?: 'ThreadsFields_lockReason_Read';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_LockReason_Update = {
  __typename?: 'ThreadsFields_lockReason_Update';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_LockedAt = {
  __typename?: 'ThreadsFields_lockedAt';
  create?: Maybe<ThreadsFields_LockedAt_Create>;
  delete?: Maybe<ThreadsFields_LockedAt_Delete>;
  read?: Maybe<ThreadsFields_LockedAt_Read>;
  update?: Maybe<ThreadsFields_LockedAt_Update>;
};

export type ThreadsFields_LockedAt_Create = {
  __typename?: 'ThreadsFields_lockedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_LockedAt_Delete = {
  __typename?: 'ThreadsFields_lockedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_LockedAt_Read = {
  __typename?: 'ThreadsFields_lockedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_LockedAt_Update = {
  __typename?: 'ThreadsFields_lockedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_ThreadUid = {
  __typename?: 'ThreadsFields_threadUid';
  create?: Maybe<ThreadsFields_ThreadUid_Create>;
  delete?: Maybe<ThreadsFields_ThreadUid_Delete>;
  read?: Maybe<ThreadsFields_ThreadUid_Read>;
  update?: Maybe<ThreadsFields_ThreadUid_Update>;
};

export type ThreadsFields_ThreadUid_Create = {
  __typename?: 'ThreadsFields_threadUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_ThreadUid_Delete = {
  __typename?: 'ThreadsFields_threadUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_ThreadUid_Read = {
  __typename?: 'ThreadsFields_threadUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_ThreadUid_Update = {
  __typename?: 'ThreadsFields_threadUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_UpdatedAt = {
  __typename?: 'ThreadsFields_updatedAt';
  create?: Maybe<ThreadsFields_UpdatedAt_Create>;
  delete?: Maybe<ThreadsFields_UpdatedAt_Delete>;
  read?: Maybe<ThreadsFields_UpdatedAt_Read>;
  update?: Maybe<ThreadsFields_UpdatedAt_Update>;
};

export type ThreadsFields_UpdatedAt_Create = {
  __typename?: 'ThreadsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_UpdatedAt_Delete = {
  __typename?: 'ThreadsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_UpdatedAt_Read = {
  __typename?: 'ThreadsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsFields_UpdatedAt_Update = {
  __typename?: 'ThreadsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ThreadsReadAccess = {
  __typename?: 'ThreadsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ThreadsReadDocAccess = {
  __typename?: 'ThreadsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ThreadsUpdateAccess = {
  __typename?: 'ThreadsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ThreadsUpdateDocAccess = {
  __typename?: 'ThreadsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type User = {
  __typename?: 'User';
  allowedAgents?: Maybe<Array<Agent>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['EmailAddress']['output'];
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  lockUntil?: Maybe<Scalars['DateTime']['output']>;
  loginAttempts?: Maybe<Scalars['Float']['output']>;
  loginCode?: Maybe<Scalars['String']['output']>;
  loginCodeExpiresAt?: Maybe<Scalars['DateTime']['output']>;
  resetPasswordExpiration?: Maybe<Scalars['DateTime']['output']>;
  resetPasswordToken?: Maybe<Scalars['String']['output']>;
  roles: Array<User_Roles>;
  salt?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userUid: Scalars['String']['output'];
};

export type UserMessage = {
  __typename?: 'UserMessage';
  channel: Channel;
  channelUid: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  messageContent: Scalars['JSON']['output'];
  messageUid?: Maybe<Scalars['String']['output']>;
  noStreamBroadcast?: Maybe<Scalars['Boolean']['output']>;
  processOnlyCurrentMessage?: Maybe<Scalars['Boolean']['output']>;
  recipientType: UserMessage_RecipientType;
  recipientUid?: Maybe<Scalars['String']['output']>;
  senderUser: User;
  senderUserUid?: Maybe<Scalars['String']['output']>;
  thread: Thread;
  threadUid: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum UserMessageUpdate_RecipientType_MutationInput {
  Agent = 'agent',
  Broadcast = 'broadcast',
  User = 'user'
}

export type UserMessage_ChannelUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserMessage_Channel_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type UserMessage_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserMessage_DeletedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserMessage_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type UserMessage_MessageContent_Operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  intersects?: InputMaybe<Scalars['JSON']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  within?: InputMaybe<Scalars['JSON']['input']>;
};

export type UserMessage_MessageUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserMessage_NoStreamBroadcast_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserMessage_ProcessOnlyCurrentMessage_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum UserMessage_RecipientType {
  Agent = 'agent',
  Broadcast = 'broadcast',
  User = 'user'
}

export enum UserMessage_RecipientType_Input {
  Agent = 'agent',
  Broadcast = 'broadcast',
  User = 'user'
}

export enum UserMessage_RecipientType_MutationInput {
  Agent = 'agent',
  Broadcast = 'broadcast',
  User = 'user'
}

export type UserMessage_RecipientType_Operator = {
  all?: InputMaybe<Array<InputMaybe<UserMessage_RecipientType_Input>>>;
  equals?: InputMaybe<UserMessage_RecipientType_Input>;
  in?: InputMaybe<Array<InputMaybe<UserMessage_RecipientType_Input>>>;
  not_equals?: InputMaybe<UserMessage_RecipientType_Input>;
  not_in?: InputMaybe<Array<InputMaybe<UserMessage_RecipientType_Input>>>;
};

export type UserMessage_RecipientUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserMessage_SenderUserUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserMessage_SenderUser_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type UserMessage_ThreadUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UserMessage_Thread_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type UserMessage_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserMessage_Where = {
  AND?: InputMaybe<Array<InputMaybe<UserMessage_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<UserMessage_Where_Or>>>;
  channel?: InputMaybe<UserMessage_Channel_Operator>;
  channelUid?: InputMaybe<UserMessage_ChannelUid_Operator>;
  createdAt?: InputMaybe<UserMessage_CreatedAt_Operator>;
  deletedAt?: InputMaybe<UserMessage_DeletedAt_Operator>;
  id?: InputMaybe<UserMessage_Id_Operator>;
  messageContent?: InputMaybe<UserMessage_MessageContent_Operator>;
  messageUid?: InputMaybe<UserMessage_MessageUid_Operator>;
  noStreamBroadcast?: InputMaybe<UserMessage_NoStreamBroadcast_Operator>;
  processOnlyCurrentMessage?: InputMaybe<UserMessage_ProcessOnlyCurrentMessage_Operator>;
  recipientType?: InputMaybe<UserMessage_RecipientType_Operator>;
  recipientUid?: InputMaybe<UserMessage_RecipientUid_Operator>;
  senderUser?: InputMaybe<UserMessage_SenderUser_Operator>;
  senderUserUid?: InputMaybe<UserMessage_SenderUserUid_Operator>;
  thread?: InputMaybe<UserMessage_Thread_Operator>;
  threadUid?: InputMaybe<UserMessage_ThreadUid_Operator>;
  updatedAt?: InputMaybe<UserMessage_UpdatedAt_Operator>;
};

export type UserMessage_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<UserMessage_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<UserMessage_Where_Or>>>;
  channel?: InputMaybe<UserMessage_Channel_Operator>;
  channelUid?: InputMaybe<UserMessage_ChannelUid_Operator>;
  createdAt?: InputMaybe<UserMessage_CreatedAt_Operator>;
  deletedAt?: InputMaybe<UserMessage_DeletedAt_Operator>;
  id?: InputMaybe<UserMessage_Id_Operator>;
  messageContent?: InputMaybe<UserMessage_MessageContent_Operator>;
  messageUid?: InputMaybe<UserMessage_MessageUid_Operator>;
  noStreamBroadcast?: InputMaybe<UserMessage_NoStreamBroadcast_Operator>;
  processOnlyCurrentMessage?: InputMaybe<UserMessage_ProcessOnlyCurrentMessage_Operator>;
  recipientType?: InputMaybe<UserMessage_RecipientType_Operator>;
  recipientUid?: InputMaybe<UserMessage_RecipientUid_Operator>;
  senderUser?: InputMaybe<UserMessage_SenderUser_Operator>;
  senderUserUid?: InputMaybe<UserMessage_SenderUserUid_Operator>;
  thread?: InputMaybe<UserMessage_Thread_Operator>;
  threadUid?: InputMaybe<UserMessage_ThreadUid_Operator>;
  updatedAt?: InputMaybe<UserMessage_UpdatedAt_Operator>;
};

export type UserMessage_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<UserMessage_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<UserMessage_Where_Or>>>;
  channel?: InputMaybe<UserMessage_Channel_Operator>;
  channelUid?: InputMaybe<UserMessage_ChannelUid_Operator>;
  createdAt?: InputMaybe<UserMessage_CreatedAt_Operator>;
  deletedAt?: InputMaybe<UserMessage_DeletedAt_Operator>;
  id?: InputMaybe<UserMessage_Id_Operator>;
  messageContent?: InputMaybe<UserMessage_MessageContent_Operator>;
  messageUid?: InputMaybe<UserMessage_MessageUid_Operator>;
  noStreamBroadcast?: InputMaybe<UserMessage_NoStreamBroadcast_Operator>;
  processOnlyCurrentMessage?: InputMaybe<UserMessage_ProcessOnlyCurrentMessage_Operator>;
  recipientType?: InputMaybe<UserMessage_RecipientType_Operator>;
  recipientUid?: InputMaybe<UserMessage_RecipientUid_Operator>;
  senderUser?: InputMaybe<UserMessage_SenderUser_Operator>;
  senderUserUid?: InputMaybe<UserMessage_SenderUserUid_Operator>;
  thread?: InputMaybe<UserMessage_Thread_Operator>;
  threadUid?: InputMaybe<UserMessage_ThreadUid_Operator>;
  updatedAt?: InputMaybe<UserMessage_UpdatedAt_Operator>;
};

export type UserMessages = {
  __typename?: 'UserMessages';
  docs: Array<UserMessage>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type UserMessagesCreateAccess = {
  __typename?: 'UserMessagesCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UserMessagesCreateDocAccess = {
  __typename?: 'UserMessagesCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UserMessagesDeleteAccess = {
  __typename?: 'UserMessagesDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UserMessagesDeleteDocAccess = {
  __typename?: 'UserMessagesDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UserMessagesDocAccessFields = {
  __typename?: 'UserMessagesDocAccessFields';
  channel?: Maybe<UserMessagesDocAccessFields_Channel>;
  channelUid?: Maybe<UserMessagesDocAccessFields_ChannelUid>;
  createdAt?: Maybe<UserMessagesDocAccessFields_CreatedAt>;
  deletedAt?: Maybe<UserMessagesDocAccessFields_DeletedAt>;
  messageContent?: Maybe<UserMessagesDocAccessFields_MessageContent>;
  messageUid?: Maybe<UserMessagesDocAccessFields_MessageUid>;
  noStreamBroadcast?: Maybe<UserMessagesDocAccessFields_NoStreamBroadcast>;
  processOnlyCurrentMessage?: Maybe<UserMessagesDocAccessFields_ProcessOnlyCurrentMessage>;
  recipientType?: Maybe<UserMessagesDocAccessFields_RecipientType>;
  recipientUid?: Maybe<UserMessagesDocAccessFields_RecipientUid>;
  senderUser?: Maybe<UserMessagesDocAccessFields_SenderUser>;
  senderUserUid?: Maybe<UserMessagesDocAccessFields_SenderUserUid>;
  thread?: Maybe<UserMessagesDocAccessFields_Thread>;
  threadUid?: Maybe<UserMessagesDocAccessFields_ThreadUid>;
  updatedAt?: Maybe<UserMessagesDocAccessFields_UpdatedAt>;
};

export type UserMessagesDocAccessFields_Channel = {
  __typename?: 'UserMessagesDocAccessFields_channel';
  create?: Maybe<UserMessagesDocAccessFields_Channel_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_Channel_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_Channel_Read>;
  update?: Maybe<UserMessagesDocAccessFields_Channel_Update>;
};

export type UserMessagesDocAccessFields_ChannelUid = {
  __typename?: 'UserMessagesDocAccessFields_channelUid';
  create?: Maybe<UserMessagesDocAccessFields_ChannelUid_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_ChannelUid_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_ChannelUid_Read>;
  update?: Maybe<UserMessagesDocAccessFields_ChannelUid_Update>;
};

export type UserMessagesDocAccessFields_ChannelUid_Create = {
  __typename?: 'UserMessagesDocAccessFields_channelUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_ChannelUid_Delete = {
  __typename?: 'UserMessagesDocAccessFields_channelUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_ChannelUid_Read = {
  __typename?: 'UserMessagesDocAccessFields_channelUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_ChannelUid_Update = {
  __typename?: 'UserMessagesDocAccessFields_channelUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_Channel_Create = {
  __typename?: 'UserMessagesDocAccessFields_channel_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_Channel_Delete = {
  __typename?: 'UserMessagesDocAccessFields_channel_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_Channel_Read = {
  __typename?: 'UserMessagesDocAccessFields_channel_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_Channel_Update = {
  __typename?: 'UserMessagesDocAccessFields_channel_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_CreatedAt = {
  __typename?: 'UserMessagesDocAccessFields_createdAt';
  create?: Maybe<UserMessagesDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_CreatedAt_Read>;
  update?: Maybe<UserMessagesDocAccessFields_CreatedAt_Update>;
};

export type UserMessagesDocAccessFields_CreatedAt_Create = {
  __typename?: 'UserMessagesDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_CreatedAt_Delete = {
  __typename?: 'UserMessagesDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_CreatedAt_Read = {
  __typename?: 'UserMessagesDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_CreatedAt_Update = {
  __typename?: 'UserMessagesDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_DeletedAt = {
  __typename?: 'UserMessagesDocAccessFields_deletedAt';
  create?: Maybe<UserMessagesDocAccessFields_DeletedAt_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_DeletedAt_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_DeletedAt_Read>;
  update?: Maybe<UserMessagesDocAccessFields_DeletedAt_Update>;
};

export type UserMessagesDocAccessFields_DeletedAt_Create = {
  __typename?: 'UserMessagesDocAccessFields_deletedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_DeletedAt_Delete = {
  __typename?: 'UserMessagesDocAccessFields_deletedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_DeletedAt_Read = {
  __typename?: 'UserMessagesDocAccessFields_deletedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_DeletedAt_Update = {
  __typename?: 'UserMessagesDocAccessFields_deletedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_MessageContent = {
  __typename?: 'UserMessagesDocAccessFields_messageContent';
  create?: Maybe<UserMessagesDocAccessFields_MessageContent_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_MessageContent_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_MessageContent_Read>;
  update?: Maybe<UserMessagesDocAccessFields_MessageContent_Update>;
};

export type UserMessagesDocAccessFields_MessageContent_Create = {
  __typename?: 'UserMessagesDocAccessFields_messageContent_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_MessageContent_Delete = {
  __typename?: 'UserMessagesDocAccessFields_messageContent_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_MessageContent_Read = {
  __typename?: 'UserMessagesDocAccessFields_messageContent_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_MessageContent_Update = {
  __typename?: 'UserMessagesDocAccessFields_messageContent_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_MessageUid = {
  __typename?: 'UserMessagesDocAccessFields_messageUid';
  create?: Maybe<UserMessagesDocAccessFields_MessageUid_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_MessageUid_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_MessageUid_Read>;
  update?: Maybe<UserMessagesDocAccessFields_MessageUid_Update>;
};

export type UserMessagesDocAccessFields_MessageUid_Create = {
  __typename?: 'UserMessagesDocAccessFields_messageUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_MessageUid_Delete = {
  __typename?: 'UserMessagesDocAccessFields_messageUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_MessageUid_Read = {
  __typename?: 'UserMessagesDocAccessFields_messageUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_MessageUid_Update = {
  __typename?: 'UserMessagesDocAccessFields_messageUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_NoStreamBroadcast = {
  __typename?: 'UserMessagesDocAccessFields_noStreamBroadcast';
  create?: Maybe<UserMessagesDocAccessFields_NoStreamBroadcast_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_NoStreamBroadcast_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_NoStreamBroadcast_Read>;
  update?: Maybe<UserMessagesDocAccessFields_NoStreamBroadcast_Update>;
};

export type UserMessagesDocAccessFields_NoStreamBroadcast_Create = {
  __typename?: 'UserMessagesDocAccessFields_noStreamBroadcast_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_NoStreamBroadcast_Delete = {
  __typename?: 'UserMessagesDocAccessFields_noStreamBroadcast_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_NoStreamBroadcast_Read = {
  __typename?: 'UserMessagesDocAccessFields_noStreamBroadcast_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_NoStreamBroadcast_Update = {
  __typename?: 'UserMessagesDocAccessFields_noStreamBroadcast_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_ProcessOnlyCurrentMessage = {
  __typename?: 'UserMessagesDocAccessFields_processOnlyCurrentMessage';
  create?: Maybe<UserMessagesDocAccessFields_ProcessOnlyCurrentMessage_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_ProcessOnlyCurrentMessage_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_ProcessOnlyCurrentMessage_Read>;
  update?: Maybe<UserMessagesDocAccessFields_ProcessOnlyCurrentMessage_Update>;
};

export type UserMessagesDocAccessFields_ProcessOnlyCurrentMessage_Create = {
  __typename?: 'UserMessagesDocAccessFields_processOnlyCurrentMessage_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_ProcessOnlyCurrentMessage_Delete = {
  __typename?: 'UserMessagesDocAccessFields_processOnlyCurrentMessage_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_ProcessOnlyCurrentMessage_Read = {
  __typename?: 'UserMessagesDocAccessFields_processOnlyCurrentMessage_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_ProcessOnlyCurrentMessage_Update = {
  __typename?: 'UserMessagesDocAccessFields_processOnlyCurrentMessage_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_RecipientType = {
  __typename?: 'UserMessagesDocAccessFields_recipientType';
  create?: Maybe<UserMessagesDocAccessFields_RecipientType_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_RecipientType_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_RecipientType_Read>;
  update?: Maybe<UserMessagesDocAccessFields_RecipientType_Update>;
};

export type UserMessagesDocAccessFields_RecipientType_Create = {
  __typename?: 'UserMessagesDocAccessFields_recipientType_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_RecipientType_Delete = {
  __typename?: 'UserMessagesDocAccessFields_recipientType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_RecipientType_Read = {
  __typename?: 'UserMessagesDocAccessFields_recipientType_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_RecipientType_Update = {
  __typename?: 'UserMessagesDocAccessFields_recipientType_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_RecipientUid = {
  __typename?: 'UserMessagesDocAccessFields_recipientUid';
  create?: Maybe<UserMessagesDocAccessFields_RecipientUid_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_RecipientUid_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_RecipientUid_Read>;
  update?: Maybe<UserMessagesDocAccessFields_RecipientUid_Update>;
};

export type UserMessagesDocAccessFields_RecipientUid_Create = {
  __typename?: 'UserMessagesDocAccessFields_recipientUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_RecipientUid_Delete = {
  __typename?: 'UserMessagesDocAccessFields_recipientUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_RecipientUid_Read = {
  __typename?: 'UserMessagesDocAccessFields_recipientUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_RecipientUid_Update = {
  __typename?: 'UserMessagesDocAccessFields_recipientUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_SenderUser = {
  __typename?: 'UserMessagesDocAccessFields_senderUser';
  create?: Maybe<UserMessagesDocAccessFields_SenderUser_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_SenderUser_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_SenderUser_Read>;
  update?: Maybe<UserMessagesDocAccessFields_SenderUser_Update>;
};

export type UserMessagesDocAccessFields_SenderUserUid = {
  __typename?: 'UserMessagesDocAccessFields_senderUserUid';
  create?: Maybe<UserMessagesDocAccessFields_SenderUserUid_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_SenderUserUid_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_SenderUserUid_Read>;
  update?: Maybe<UserMessagesDocAccessFields_SenderUserUid_Update>;
};

export type UserMessagesDocAccessFields_SenderUserUid_Create = {
  __typename?: 'UserMessagesDocAccessFields_senderUserUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_SenderUserUid_Delete = {
  __typename?: 'UserMessagesDocAccessFields_senderUserUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_SenderUserUid_Read = {
  __typename?: 'UserMessagesDocAccessFields_senderUserUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_SenderUserUid_Update = {
  __typename?: 'UserMessagesDocAccessFields_senderUserUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_SenderUser_Create = {
  __typename?: 'UserMessagesDocAccessFields_senderUser_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_SenderUser_Delete = {
  __typename?: 'UserMessagesDocAccessFields_senderUser_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_SenderUser_Read = {
  __typename?: 'UserMessagesDocAccessFields_senderUser_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_SenderUser_Update = {
  __typename?: 'UserMessagesDocAccessFields_senderUser_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_Thread = {
  __typename?: 'UserMessagesDocAccessFields_thread';
  create?: Maybe<UserMessagesDocAccessFields_Thread_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_Thread_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_Thread_Read>;
  update?: Maybe<UserMessagesDocAccessFields_Thread_Update>;
};

export type UserMessagesDocAccessFields_ThreadUid = {
  __typename?: 'UserMessagesDocAccessFields_threadUid';
  create?: Maybe<UserMessagesDocAccessFields_ThreadUid_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_ThreadUid_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_ThreadUid_Read>;
  update?: Maybe<UserMessagesDocAccessFields_ThreadUid_Update>;
};

export type UserMessagesDocAccessFields_ThreadUid_Create = {
  __typename?: 'UserMessagesDocAccessFields_threadUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_ThreadUid_Delete = {
  __typename?: 'UserMessagesDocAccessFields_threadUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_ThreadUid_Read = {
  __typename?: 'UserMessagesDocAccessFields_threadUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_ThreadUid_Update = {
  __typename?: 'UserMessagesDocAccessFields_threadUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_Thread_Create = {
  __typename?: 'UserMessagesDocAccessFields_thread_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_Thread_Delete = {
  __typename?: 'UserMessagesDocAccessFields_thread_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_Thread_Read = {
  __typename?: 'UserMessagesDocAccessFields_thread_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_Thread_Update = {
  __typename?: 'UserMessagesDocAccessFields_thread_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_UpdatedAt = {
  __typename?: 'UserMessagesDocAccessFields_updatedAt';
  create?: Maybe<UserMessagesDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<UserMessagesDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<UserMessagesDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<UserMessagesDocAccessFields_UpdatedAt_Update>;
};

export type UserMessagesDocAccessFields_UpdatedAt_Create = {
  __typename?: 'UserMessagesDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'UserMessagesDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_UpdatedAt_Read = {
  __typename?: 'UserMessagesDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesDocAccessFields_UpdatedAt_Update = {
  __typename?: 'UserMessagesDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields = {
  __typename?: 'UserMessagesFields';
  channel?: Maybe<UserMessagesFields_Channel>;
  channelUid?: Maybe<UserMessagesFields_ChannelUid>;
  createdAt?: Maybe<UserMessagesFields_CreatedAt>;
  deletedAt?: Maybe<UserMessagesFields_DeletedAt>;
  messageContent?: Maybe<UserMessagesFields_MessageContent>;
  messageUid?: Maybe<UserMessagesFields_MessageUid>;
  noStreamBroadcast?: Maybe<UserMessagesFields_NoStreamBroadcast>;
  processOnlyCurrentMessage?: Maybe<UserMessagesFields_ProcessOnlyCurrentMessage>;
  recipientType?: Maybe<UserMessagesFields_RecipientType>;
  recipientUid?: Maybe<UserMessagesFields_RecipientUid>;
  senderUser?: Maybe<UserMessagesFields_SenderUser>;
  senderUserUid?: Maybe<UserMessagesFields_SenderUserUid>;
  thread?: Maybe<UserMessagesFields_Thread>;
  threadUid?: Maybe<UserMessagesFields_ThreadUid>;
  updatedAt?: Maybe<UserMessagesFields_UpdatedAt>;
};

export type UserMessagesFields_Channel = {
  __typename?: 'UserMessagesFields_channel';
  create?: Maybe<UserMessagesFields_Channel_Create>;
  delete?: Maybe<UserMessagesFields_Channel_Delete>;
  read?: Maybe<UserMessagesFields_Channel_Read>;
  update?: Maybe<UserMessagesFields_Channel_Update>;
};

export type UserMessagesFields_ChannelUid = {
  __typename?: 'UserMessagesFields_channelUid';
  create?: Maybe<UserMessagesFields_ChannelUid_Create>;
  delete?: Maybe<UserMessagesFields_ChannelUid_Delete>;
  read?: Maybe<UserMessagesFields_ChannelUid_Read>;
  update?: Maybe<UserMessagesFields_ChannelUid_Update>;
};

export type UserMessagesFields_ChannelUid_Create = {
  __typename?: 'UserMessagesFields_channelUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_ChannelUid_Delete = {
  __typename?: 'UserMessagesFields_channelUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_ChannelUid_Read = {
  __typename?: 'UserMessagesFields_channelUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_ChannelUid_Update = {
  __typename?: 'UserMessagesFields_channelUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_Channel_Create = {
  __typename?: 'UserMessagesFields_channel_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_Channel_Delete = {
  __typename?: 'UserMessagesFields_channel_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_Channel_Read = {
  __typename?: 'UserMessagesFields_channel_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_Channel_Update = {
  __typename?: 'UserMessagesFields_channel_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_CreatedAt = {
  __typename?: 'UserMessagesFields_createdAt';
  create?: Maybe<UserMessagesFields_CreatedAt_Create>;
  delete?: Maybe<UserMessagesFields_CreatedAt_Delete>;
  read?: Maybe<UserMessagesFields_CreatedAt_Read>;
  update?: Maybe<UserMessagesFields_CreatedAt_Update>;
};

export type UserMessagesFields_CreatedAt_Create = {
  __typename?: 'UserMessagesFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_CreatedAt_Delete = {
  __typename?: 'UserMessagesFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_CreatedAt_Read = {
  __typename?: 'UserMessagesFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_CreatedAt_Update = {
  __typename?: 'UserMessagesFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_DeletedAt = {
  __typename?: 'UserMessagesFields_deletedAt';
  create?: Maybe<UserMessagesFields_DeletedAt_Create>;
  delete?: Maybe<UserMessagesFields_DeletedAt_Delete>;
  read?: Maybe<UserMessagesFields_DeletedAt_Read>;
  update?: Maybe<UserMessagesFields_DeletedAt_Update>;
};

export type UserMessagesFields_DeletedAt_Create = {
  __typename?: 'UserMessagesFields_deletedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_DeletedAt_Delete = {
  __typename?: 'UserMessagesFields_deletedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_DeletedAt_Read = {
  __typename?: 'UserMessagesFields_deletedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_DeletedAt_Update = {
  __typename?: 'UserMessagesFields_deletedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_MessageContent = {
  __typename?: 'UserMessagesFields_messageContent';
  create?: Maybe<UserMessagesFields_MessageContent_Create>;
  delete?: Maybe<UserMessagesFields_MessageContent_Delete>;
  read?: Maybe<UserMessagesFields_MessageContent_Read>;
  update?: Maybe<UserMessagesFields_MessageContent_Update>;
};

export type UserMessagesFields_MessageContent_Create = {
  __typename?: 'UserMessagesFields_messageContent_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_MessageContent_Delete = {
  __typename?: 'UserMessagesFields_messageContent_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_MessageContent_Read = {
  __typename?: 'UserMessagesFields_messageContent_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_MessageContent_Update = {
  __typename?: 'UserMessagesFields_messageContent_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_MessageUid = {
  __typename?: 'UserMessagesFields_messageUid';
  create?: Maybe<UserMessagesFields_MessageUid_Create>;
  delete?: Maybe<UserMessagesFields_MessageUid_Delete>;
  read?: Maybe<UserMessagesFields_MessageUid_Read>;
  update?: Maybe<UserMessagesFields_MessageUid_Update>;
};

export type UserMessagesFields_MessageUid_Create = {
  __typename?: 'UserMessagesFields_messageUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_MessageUid_Delete = {
  __typename?: 'UserMessagesFields_messageUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_MessageUid_Read = {
  __typename?: 'UserMessagesFields_messageUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_MessageUid_Update = {
  __typename?: 'UserMessagesFields_messageUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_NoStreamBroadcast = {
  __typename?: 'UserMessagesFields_noStreamBroadcast';
  create?: Maybe<UserMessagesFields_NoStreamBroadcast_Create>;
  delete?: Maybe<UserMessagesFields_NoStreamBroadcast_Delete>;
  read?: Maybe<UserMessagesFields_NoStreamBroadcast_Read>;
  update?: Maybe<UserMessagesFields_NoStreamBroadcast_Update>;
};

export type UserMessagesFields_NoStreamBroadcast_Create = {
  __typename?: 'UserMessagesFields_noStreamBroadcast_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_NoStreamBroadcast_Delete = {
  __typename?: 'UserMessagesFields_noStreamBroadcast_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_NoStreamBroadcast_Read = {
  __typename?: 'UserMessagesFields_noStreamBroadcast_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_NoStreamBroadcast_Update = {
  __typename?: 'UserMessagesFields_noStreamBroadcast_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_ProcessOnlyCurrentMessage = {
  __typename?: 'UserMessagesFields_processOnlyCurrentMessage';
  create?: Maybe<UserMessagesFields_ProcessOnlyCurrentMessage_Create>;
  delete?: Maybe<UserMessagesFields_ProcessOnlyCurrentMessage_Delete>;
  read?: Maybe<UserMessagesFields_ProcessOnlyCurrentMessage_Read>;
  update?: Maybe<UserMessagesFields_ProcessOnlyCurrentMessage_Update>;
};

export type UserMessagesFields_ProcessOnlyCurrentMessage_Create = {
  __typename?: 'UserMessagesFields_processOnlyCurrentMessage_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_ProcessOnlyCurrentMessage_Delete = {
  __typename?: 'UserMessagesFields_processOnlyCurrentMessage_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_ProcessOnlyCurrentMessage_Read = {
  __typename?: 'UserMessagesFields_processOnlyCurrentMessage_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_ProcessOnlyCurrentMessage_Update = {
  __typename?: 'UserMessagesFields_processOnlyCurrentMessage_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_RecipientType = {
  __typename?: 'UserMessagesFields_recipientType';
  create?: Maybe<UserMessagesFields_RecipientType_Create>;
  delete?: Maybe<UserMessagesFields_RecipientType_Delete>;
  read?: Maybe<UserMessagesFields_RecipientType_Read>;
  update?: Maybe<UserMessagesFields_RecipientType_Update>;
};

export type UserMessagesFields_RecipientType_Create = {
  __typename?: 'UserMessagesFields_recipientType_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_RecipientType_Delete = {
  __typename?: 'UserMessagesFields_recipientType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_RecipientType_Read = {
  __typename?: 'UserMessagesFields_recipientType_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_RecipientType_Update = {
  __typename?: 'UserMessagesFields_recipientType_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_RecipientUid = {
  __typename?: 'UserMessagesFields_recipientUid';
  create?: Maybe<UserMessagesFields_RecipientUid_Create>;
  delete?: Maybe<UserMessagesFields_RecipientUid_Delete>;
  read?: Maybe<UserMessagesFields_RecipientUid_Read>;
  update?: Maybe<UserMessagesFields_RecipientUid_Update>;
};

export type UserMessagesFields_RecipientUid_Create = {
  __typename?: 'UserMessagesFields_recipientUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_RecipientUid_Delete = {
  __typename?: 'UserMessagesFields_recipientUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_RecipientUid_Read = {
  __typename?: 'UserMessagesFields_recipientUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_RecipientUid_Update = {
  __typename?: 'UserMessagesFields_recipientUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_SenderUser = {
  __typename?: 'UserMessagesFields_senderUser';
  create?: Maybe<UserMessagesFields_SenderUser_Create>;
  delete?: Maybe<UserMessagesFields_SenderUser_Delete>;
  read?: Maybe<UserMessagesFields_SenderUser_Read>;
  update?: Maybe<UserMessagesFields_SenderUser_Update>;
};

export type UserMessagesFields_SenderUserUid = {
  __typename?: 'UserMessagesFields_senderUserUid';
  create?: Maybe<UserMessagesFields_SenderUserUid_Create>;
  delete?: Maybe<UserMessagesFields_SenderUserUid_Delete>;
  read?: Maybe<UserMessagesFields_SenderUserUid_Read>;
  update?: Maybe<UserMessagesFields_SenderUserUid_Update>;
};

export type UserMessagesFields_SenderUserUid_Create = {
  __typename?: 'UserMessagesFields_senderUserUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_SenderUserUid_Delete = {
  __typename?: 'UserMessagesFields_senderUserUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_SenderUserUid_Read = {
  __typename?: 'UserMessagesFields_senderUserUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_SenderUserUid_Update = {
  __typename?: 'UserMessagesFields_senderUserUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_SenderUser_Create = {
  __typename?: 'UserMessagesFields_senderUser_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_SenderUser_Delete = {
  __typename?: 'UserMessagesFields_senderUser_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_SenderUser_Read = {
  __typename?: 'UserMessagesFields_senderUser_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_SenderUser_Update = {
  __typename?: 'UserMessagesFields_senderUser_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_Thread = {
  __typename?: 'UserMessagesFields_thread';
  create?: Maybe<UserMessagesFields_Thread_Create>;
  delete?: Maybe<UserMessagesFields_Thread_Delete>;
  read?: Maybe<UserMessagesFields_Thread_Read>;
  update?: Maybe<UserMessagesFields_Thread_Update>;
};

export type UserMessagesFields_ThreadUid = {
  __typename?: 'UserMessagesFields_threadUid';
  create?: Maybe<UserMessagesFields_ThreadUid_Create>;
  delete?: Maybe<UserMessagesFields_ThreadUid_Delete>;
  read?: Maybe<UserMessagesFields_ThreadUid_Read>;
  update?: Maybe<UserMessagesFields_ThreadUid_Update>;
};

export type UserMessagesFields_ThreadUid_Create = {
  __typename?: 'UserMessagesFields_threadUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_ThreadUid_Delete = {
  __typename?: 'UserMessagesFields_threadUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_ThreadUid_Read = {
  __typename?: 'UserMessagesFields_threadUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_ThreadUid_Update = {
  __typename?: 'UserMessagesFields_threadUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_Thread_Create = {
  __typename?: 'UserMessagesFields_thread_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_Thread_Delete = {
  __typename?: 'UserMessagesFields_thread_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_Thread_Read = {
  __typename?: 'UserMessagesFields_thread_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_Thread_Update = {
  __typename?: 'UserMessagesFields_thread_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_UpdatedAt = {
  __typename?: 'UserMessagesFields_updatedAt';
  create?: Maybe<UserMessagesFields_UpdatedAt_Create>;
  delete?: Maybe<UserMessagesFields_UpdatedAt_Delete>;
  read?: Maybe<UserMessagesFields_UpdatedAt_Read>;
  update?: Maybe<UserMessagesFields_UpdatedAt_Update>;
};

export type UserMessagesFields_UpdatedAt_Create = {
  __typename?: 'UserMessagesFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_UpdatedAt_Delete = {
  __typename?: 'UserMessagesFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_UpdatedAt_Read = {
  __typename?: 'UserMessagesFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesFields_UpdatedAt_Update = {
  __typename?: 'UserMessagesFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UserMessagesReadAccess = {
  __typename?: 'UserMessagesReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UserMessagesReadDocAccess = {
  __typename?: 'UserMessagesReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UserMessagesUpdateAccess = {
  __typename?: 'UserMessagesUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UserMessagesUpdateDocAccess = {
  __typename?: 'UserMessagesUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export enum UserUpdate_Roles_MutationInput {
  Admin = 'ADMIN',
  ReadOnly = 'READ_ONLY',
  SuperAdmin = 'SUPER_ADMIN',
  Write = 'WRITE'
}

export type User_AllowedAgents_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type User_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_Email_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
  contains?: InputMaybe<Scalars['EmailAddress']['input']>;
  equals?: InputMaybe<Scalars['EmailAddress']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
  like?: InputMaybe<Scalars['EmailAddress']['input']>;
  not_equals?: InputMaybe<Scalars['EmailAddress']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
};

export type User_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type User_LastLoginAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_LoginCodeExpiresAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_LoginCode_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum User_Roles {
  Admin = 'ADMIN',
  ReadOnly = 'READ_ONLY',
  SuperAdmin = 'SUPER_ADMIN',
  Write = 'WRITE'
}

export enum User_Roles_Input {
  Admin = 'ADMIN',
  ReadOnly = 'READ_ONLY',
  SuperAdmin = 'SUPER_ADMIN',
  Write = 'WRITE'
}

export enum User_Roles_MutationInput {
  Admin = 'ADMIN',
  ReadOnly = 'READ_ONLY',
  SuperAdmin = 'SUPER_ADMIN',
  Write = 'WRITE'
}

export type User_Roles_Operator = {
  all?: InputMaybe<Array<InputMaybe<User_Roles_Input>>>;
  equals?: InputMaybe<User_Roles_Input>;
  in?: InputMaybe<Array<InputMaybe<User_Roles_Input>>>;
  not_equals?: InputMaybe<User_Roles_Input>;
  not_in?: InputMaybe<Array<InputMaybe<User_Roles_Input>>>;
};

export type User_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_UserUid_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type User_Where = {
  AND?: InputMaybe<Array<InputMaybe<User_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<User_Where_Or>>>;
  allowedAgents?: InputMaybe<User_AllowedAgents_Operator>;
  createdAt?: InputMaybe<User_CreatedAt_Operator>;
  email?: InputMaybe<User_Email_Operator>;
  id?: InputMaybe<User_Id_Operator>;
  lastLoginAt?: InputMaybe<User_LastLoginAt_Operator>;
  loginCode?: InputMaybe<User_LoginCode_Operator>;
  loginCodeExpiresAt?: InputMaybe<User_LoginCodeExpiresAt_Operator>;
  roles?: InputMaybe<User_Roles_Operator>;
  updatedAt?: InputMaybe<User_UpdatedAt_Operator>;
  userUid?: InputMaybe<User_UserUid_Operator>;
};

export type User_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<User_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<User_Where_Or>>>;
  allowedAgents?: InputMaybe<User_AllowedAgents_Operator>;
  createdAt?: InputMaybe<User_CreatedAt_Operator>;
  email?: InputMaybe<User_Email_Operator>;
  id?: InputMaybe<User_Id_Operator>;
  lastLoginAt?: InputMaybe<User_LastLoginAt_Operator>;
  loginCode?: InputMaybe<User_LoginCode_Operator>;
  loginCodeExpiresAt?: InputMaybe<User_LoginCodeExpiresAt_Operator>;
  roles?: InputMaybe<User_Roles_Operator>;
  updatedAt?: InputMaybe<User_UpdatedAt_Operator>;
  userUid?: InputMaybe<User_UserUid_Operator>;
};

export type User_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<User_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<User_Where_Or>>>;
  allowedAgents?: InputMaybe<User_AllowedAgents_Operator>;
  createdAt?: InputMaybe<User_CreatedAt_Operator>;
  email?: InputMaybe<User_Email_Operator>;
  id?: InputMaybe<User_Id_Operator>;
  lastLoginAt?: InputMaybe<User_LastLoginAt_Operator>;
  loginCode?: InputMaybe<User_LoginCode_Operator>;
  loginCodeExpiresAt?: InputMaybe<User_LoginCodeExpiresAt_Operator>;
  roles?: InputMaybe<User_Roles_Operator>;
  updatedAt?: InputMaybe<User_UpdatedAt_Operator>;
  userUid?: InputMaybe<User_UserUid_Operator>;
};

export type Users = {
  __typename?: 'Users';
  docs: Array<User>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type UsersCreateAccess = {
  __typename?: 'UsersCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersCreateDocAccess = {
  __typename?: 'UsersCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersDeleteAccess = {
  __typename?: 'UsersDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersDeleteDocAccess = {
  __typename?: 'UsersDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersDocAccessFields = {
  __typename?: 'UsersDocAccessFields';
  allowedAgents?: Maybe<UsersDocAccessFields_AllowedAgents>;
  createdAt?: Maybe<UsersDocAccessFields_CreatedAt>;
  email?: Maybe<UsersDocAccessFields_Email>;
  lastLoginAt?: Maybe<UsersDocAccessFields_LastLoginAt>;
  loginCode?: Maybe<UsersDocAccessFields_LoginCode>;
  loginCodeExpiresAt?: Maybe<UsersDocAccessFields_LoginCodeExpiresAt>;
  roles?: Maybe<UsersDocAccessFields_Roles>;
  updatedAt?: Maybe<UsersDocAccessFields_UpdatedAt>;
  userUid?: Maybe<UsersDocAccessFields_UserUid>;
};

export type UsersDocAccessFields_AllowedAgents = {
  __typename?: 'UsersDocAccessFields_allowedAgents';
  create?: Maybe<UsersDocAccessFields_AllowedAgents_Create>;
  delete?: Maybe<UsersDocAccessFields_AllowedAgents_Delete>;
  read?: Maybe<UsersDocAccessFields_AllowedAgents_Read>;
  update?: Maybe<UsersDocAccessFields_AllowedAgents_Update>;
};

export type UsersDocAccessFields_AllowedAgents_Create = {
  __typename?: 'UsersDocAccessFields_allowedAgents_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_AllowedAgents_Delete = {
  __typename?: 'UsersDocAccessFields_allowedAgents_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_AllowedAgents_Read = {
  __typename?: 'UsersDocAccessFields_allowedAgents_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_AllowedAgents_Update = {
  __typename?: 'UsersDocAccessFields_allowedAgents_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_CreatedAt = {
  __typename?: 'UsersDocAccessFields_createdAt';
  create?: Maybe<UsersDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<UsersDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<UsersDocAccessFields_CreatedAt_Read>;
  update?: Maybe<UsersDocAccessFields_CreatedAt_Update>;
};

export type UsersDocAccessFields_CreatedAt_Create = {
  __typename?: 'UsersDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_CreatedAt_Delete = {
  __typename?: 'UsersDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_CreatedAt_Read = {
  __typename?: 'UsersDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_CreatedAt_Update = {
  __typename?: 'UsersDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Email = {
  __typename?: 'UsersDocAccessFields_email';
  create?: Maybe<UsersDocAccessFields_Email_Create>;
  delete?: Maybe<UsersDocAccessFields_Email_Delete>;
  read?: Maybe<UsersDocAccessFields_Email_Read>;
  update?: Maybe<UsersDocAccessFields_Email_Update>;
};

export type UsersDocAccessFields_Email_Create = {
  __typename?: 'UsersDocAccessFields_email_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Email_Delete = {
  __typename?: 'UsersDocAccessFields_email_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Email_Read = {
  __typename?: 'UsersDocAccessFields_email_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Email_Update = {
  __typename?: 'UsersDocAccessFields_email_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_LastLoginAt = {
  __typename?: 'UsersDocAccessFields_lastLoginAt';
  create?: Maybe<UsersDocAccessFields_LastLoginAt_Create>;
  delete?: Maybe<UsersDocAccessFields_LastLoginAt_Delete>;
  read?: Maybe<UsersDocAccessFields_LastLoginAt_Read>;
  update?: Maybe<UsersDocAccessFields_LastLoginAt_Update>;
};

export type UsersDocAccessFields_LastLoginAt_Create = {
  __typename?: 'UsersDocAccessFields_lastLoginAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_LastLoginAt_Delete = {
  __typename?: 'UsersDocAccessFields_lastLoginAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_LastLoginAt_Read = {
  __typename?: 'UsersDocAccessFields_lastLoginAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_LastLoginAt_Update = {
  __typename?: 'UsersDocAccessFields_lastLoginAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_LoginCode = {
  __typename?: 'UsersDocAccessFields_loginCode';
  create?: Maybe<UsersDocAccessFields_LoginCode_Create>;
  delete?: Maybe<UsersDocAccessFields_LoginCode_Delete>;
  read?: Maybe<UsersDocAccessFields_LoginCode_Read>;
  update?: Maybe<UsersDocAccessFields_LoginCode_Update>;
};

export type UsersDocAccessFields_LoginCodeExpiresAt = {
  __typename?: 'UsersDocAccessFields_loginCodeExpiresAt';
  create?: Maybe<UsersDocAccessFields_LoginCodeExpiresAt_Create>;
  delete?: Maybe<UsersDocAccessFields_LoginCodeExpiresAt_Delete>;
  read?: Maybe<UsersDocAccessFields_LoginCodeExpiresAt_Read>;
  update?: Maybe<UsersDocAccessFields_LoginCodeExpiresAt_Update>;
};

export type UsersDocAccessFields_LoginCodeExpiresAt_Create = {
  __typename?: 'UsersDocAccessFields_loginCodeExpiresAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_LoginCodeExpiresAt_Delete = {
  __typename?: 'UsersDocAccessFields_loginCodeExpiresAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_LoginCodeExpiresAt_Read = {
  __typename?: 'UsersDocAccessFields_loginCodeExpiresAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_LoginCodeExpiresAt_Update = {
  __typename?: 'UsersDocAccessFields_loginCodeExpiresAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_LoginCode_Create = {
  __typename?: 'UsersDocAccessFields_loginCode_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_LoginCode_Delete = {
  __typename?: 'UsersDocAccessFields_loginCode_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_LoginCode_Read = {
  __typename?: 'UsersDocAccessFields_loginCode_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_LoginCode_Update = {
  __typename?: 'UsersDocAccessFields_loginCode_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Roles = {
  __typename?: 'UsersDocAccessFields_roles';
  create?: Maybe<UsersDocAccessFields_Roles_Create>;
  delete?: Maybe<UsersDocAccessFields_Roles_Delete>;
  read?: Maybe<UsersDocAccessFields_Roles_Read>;
  update?: Maybe<UsersDocAccessFields_Roles_Update>;
};

export type UsersDocAccessFields_Roles_Create = {
  __typename?: 'UsersDocAccessFields_roles_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Roles_Delete = {
  __typename?: 'UsersDocAccessFields_roles_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Roles_Read = {
  __typename?: 'UsersDocAccessFields_roles_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Roles_Update = {
  __typename?: 'UsersDocAccessFields_roles_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UpdatedAt = {
  __typename?: 'UsersDocAccessFields_updatedAt';
  create?: Maybe<UsersDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<UsersDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<UsersDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<UsersDocAccessFields_UpdatedAt_Update>;
};

export type UsersDocAccessFields_UpdatedAt_Create = {
  __typename?: 'UsersDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'UsersDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UpdatedAt_Read = {
  __typename?: 'UsersDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UpdatedAt_Update = {
  __typename?: 'UsersDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UserUid = {
  __typename?: 'UsersDocAccessFields_userUid';
  create?: Maybe<UsersDocAccessFields_UserUid_Create>;
  delete?: Maybe<UsersDocAccessFields_UserUid_Delete>;
  read?: Maybe<UsersDocAccessFields_UserUid_Read>;
  update?: Maybe<UsersDocAccessFields_UserUid_Update>;
};

export type UsersDocAccessFields_UserUid_Create = {
  __typename?: 'UsersDocAccessFields_userUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UserUid_Delete = {
  __typename?: 'UsersDocAccessFields_userUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UserUid_Read = {
  __typename?: 'UsersDocAccessFields_userUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UserUid_Update = {
  __typename?: 'UsersDocAccessFields_userUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields = {
  __typename?: 'UsersFields';
  allowedAgents?: Maybe<UsersFields_AllowedAgents>;
  createdAt?: Maybe<UsersFields_CreatedAt>;
  email?: Maybe<UsersFields_Email>;
  lastLoginAt?: Maybe<UsersFields_LastLoginAt>;
  loginCode?: Maybe<UsersFields_LoginCode>;
  loginCodeExpiresAt?: Maybe<UsersFields_LoginCodeExpiresAt>;
  roles?: Maybe<UsersFields_Roles>;
  updatedAt?: Maybe<UsersFields_UpdatedAt>;
  userUid?: Maybe<UsersFields_UserUid>;
};

export type UsersFields_AllowedAgents = {
  __typename?: 'UsersFields_allowedAgents';
  create?: Maybe<UsersFields_AllowedAgents_Create>;
  delete?: Maybe<UsersFields_AllowedAgents_Delete>;
  read?: Maybe<UsersFields_AllowedAgents_Read>;
  update?: Maybe<UsersFields_AllowedAgents_Update>;
};

export type UsersFields_AllowedAgents_Create = {
  __typename?: 'UsersFields_allowedAgents_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_AllowedAgents_Delete = {
  __typename?: 'UsersFields_allowedAgents_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_AllowedAgents_Read = {
  __typename?: 'UsersFields_allowedAgents_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_AllowedAgents_Update = {
  __typename?: 'UsersFields_allowedAgents_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_CreatedAt = {
  __typename?: 'UsersFields_createdAt';
  create?: Maybe<UsersFields_CreatedAt_Create>;
  delete?: Maybe<UsersFields_CreatedAt_Delete>;
  read?: Maybe<UsersFields_CreatedAt_Read>;
  update?: Maybe<UsersFields_CreatedAt_Update>;
};

export type UsersFields_CreatedAt_Create = {
  __typename?: 'UsersFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_CreatedAt_Delete = {
  __typename?: 'UsersFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_CreatedAt_Read = {
  __typename?: 'UsersFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_CreatedAt_Update = {
  __typename?: 'UsersFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Email = {
  __typename?: 'UsersFields_email';
  create?: Maybe<UsersFields_Email_Create>;
  delete?: Maybe<UsersFields_Email_Delete>;
  read?: Maybe<UsersFields_Email_Read>;
  update?: Maybe<UsersFields_Email_Update>;
};

export type UsersFields_Email_Create = {
  __typename?: 'UsersFields_email_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Email_Delete = {
  __typename?: 'UsersFields_email_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Email_Read = {
  __typename?: 'UsersFields_email_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Email_Update = {
  __typename?: 'UsersFields_email_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_LastLoginAt = {
  __typename?: 'UsersFields_lastLoginAt';
  create?: Maybe<UsersFields_LastLoginAt_Create>;
  delete?: Maybe<UsersFields_LastLoginAt_Delete>;
  read?: Maybe<UsersFields_LastLoginAt_Read>;
  update?: Maybe<UsersFields_LastLoginAt_Update>;
};

export type UsersFields_LastLoginAt_Create = {
  __typename?: 'UsersFields_lastLoginAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_LastLoginAt_Delete = {
  __typename?: 'UsersFields_lastLoginAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_LastLoginAt_Read = {
  __typename?: 'UsersFields_lastLoginAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_LastLoginAt_Update = {
  __typename?: 'UsersFields_lastLoginAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_LoginCode = {
  __typename?: 'UsersFields_loginCode';
  create?: Maybe<UsersFields_LoginCode_Create>;
  delete?: Maybe<UsersFields_LoginCode_Delete>;
  read?: Maybe<UsersFields_LoginCode_Read>;
  update?: Maybe<UsersFields_LoginCode_Update>;
};

export type UsersFields_LoginCodeExpiresAt = {
  __typename?: 'UsersFields_loginCodeExpiresAt';
  create?: Maybe<UsersFields_LoginCodeExpiresAt_Create>;
  delete?: Maybe<UsersFields_LoginCodeExpiresAt_Delete>;
  read?: Maybe<UsersFields_LoginCodeExpiresAt_Read>;
  update?: Maybe<UsersFields_LoginCodeExpiresAt_Update>;
};

export type UsersFields_LoginCodeExpiresAt_Create = {
  __typename?: 'UsersFields_loginCodeExpiresAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_LoginCodeExpiresAt_Delete = {
  __typename?: 'UsersFields_loginCodeExpiresAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_LoginCodeExpiresAt_Read = {
  __typename?: 'UsersFields_loginCodeExpiresAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_LoginCodeExpiresAt_Update = {
  __typename?: 'UsersFields_loginCodeExpiresAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_LoginCode_Create = {
  __typename?: 'UsersFields_loginCode_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_LoginCode_Delete = {
  __typename?: 'UsersFields_loginCode_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_LoginCode_Read = {
  __typename?: 'UsersFields_loginCode_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_LoginCode_Update = {
  __typename?: 'UsersFields_loginCode_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Roles = {
  __typename?: 'UsersFields_roles';
  create?: Maybe<UsersFields_Roles_Create>;
  delete?: Maybe<UsersFields_Roles_Delete>;
  read?: Maybe<UsersFields_Roles_Read>;
  update?: Maybe<UsersFields_Roles_Update>;
};

export type UsersFields_Roles_Create = {
  __typename?: 'UsersFields_roles_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Roles_Delete = {
  __typename?: 'UsersFields_roles_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Roles_Read = {
  __typename?: 'UsersFields_roles_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Roles_Update = {
  __typename?: 'UsersFields_roles_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UpdatedAt = {
  __typename?: 'UsersFields_updatedAt';
  create?: Maybe<UsersFields_UpdatedAt_Create>;
  delete?: Maybe<UsersFields_UpdatedAt_Delete>;
  read?: Maybe<UsersFields_UpdatedAt_Read>;
  update?: Maybe<UsersFields_UpdatedAt_Update>;
};

export type UsersFields_UpdatedAt_Create = {
  __typename?: 'UsersFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UpdatedAt_Delete = {
  __typename?: 'UsersFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UpdatedAt_Read = {
  __typename?: 'UsersFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UpdatedAt_Update = {
  __typename?: 'UsersFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UserUid = {
  __typename?: 'UsersFields_userUid';
  create?: Maybe<UsersFields_UserUid_Create>;
  delete?: Maybe<UsersFields_UserUid_Delete>;
  read?: Maybe<UsersFields_UserUid_Read>;
  update?: Maybe<UsersFields_UserUid_Update>;
};

export type UsersFields_UserUid_Create = {
  __typename?: 'UsersFields_userUid_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UserUid_Delete = {
  __typename?: 'UsersFields_userUid_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UserUid_Read = {
  __typename?: 'UsersFields_userUid_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UserUid_Update = {
  __typename?: 'UsersFields_userUid_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersReadAccess = {
  __typename?: 'UsersReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersReadDocAccess = {
  __typename?: 'UsersReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersUnlockAccess = {
  __typename?: 'UsersUnlockAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersUnlockDocAccess = {
  __typename?: 'UsersUnlockDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersUpdateAccess = {
  __typename?: 'UsersUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersUpdateDocAccess = {
  __typename?: 'UsersUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type VirtualAgent = {
  __typename?: 'VirtualAgent';
  agentName: Scalars['String']['output'];
  agentUid: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type VirtualMessage = {
  __typename?: 'VirtualMessage';
  channelUid: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  messageContent?: Maybe<VirtualMessageContent>;
  messageUid?: Maybe<Scalars['String']['output']>;
  originatorUser?: Maybe<VirtualUser>;
  originatorUserUid?: Maybe<Scalars['String']['output']>;
  recipientType: Scalars['String']['output'];
  recipientUid?: Maybe<Scalars['String']['output']>;
  senderAgent?: Maybe<VirtualAgent>;
  senderAgentUid?: Maybe<Scalars['String']['output']>;
  senderType: Scalars['String']['output'];
  senderUser?: Maybe<VirtualUser>;
  senderUserUid?: Maybe<Scalars['String']['output']>;
  threadUid: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type VirtualMessageContent = {
  __typename?: 'VirtualMessageContent';
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  text: Scalars['String']['output'];
};

export type VirtualMessagesResponse = {
  __typename?: 'VirtualMessagesResponse';
  docs?: Maybe<Array<Maybe<VirtualMessage>>>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPrevPage?: Maybe<Scalars['Boolean']['output']>;
  limit?: Maybe<Scalars['Int']['output']>;
  nextPage?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
  pagingCounter?: Maybe<Scalars['Int']['output']>;
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type VirtualUser = {
  __typename?: 'VirtualUser';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  userUid: Scalars['String']['output'];
};

export type AgentMessagesAccess = {
  __typename?: 'agentMessagesAccess';
  create?: Maybe<AgentMessagesCreateAccess>;
  delete?: Maybe<AgentMessagesDeleteAccess>;
  fields?: Maybe<AgentMessagesFields>;
  read?: Maybe<AgentMessagesReadAccess>;
  update?: Maybe<AgentMessagesUpdateAccess>;
};

export type AgentMessagesDocAccess = {
  __typename?: 'agentMessagesDocAccess';
  create?: Maybe<AgentMessagesCreateDocAccess>;
  delete?: Maybe<AgentMessagesDeleteDocAccess>;
  fields?: Maybe<AgentMessagesDocAccessFields>;
  read?: Maybe<AgentMessagesReadDocAccess>;
  update?: Maybe<AgentMessagesUpdateDocAccess>;
};

export type AgentsAccess = {
  __typename?: 'agentsAccess';
  create?: Maybe<AgentsCreateAccess>;
  delete?: Maybe<AgentsDeleteAccess>;
  fields?: Maybe<AgentsFields>;
  read?: Maybe<AgentsReadAccess>;
  update?: Maybe<AgentsUpdateAccess>;
};

export type AgentsDocAccess = {
  __typename?: 'agentsDocAccess';
  create?: Maybe<AgentsCreateDocAccess>;
  delete?: Maybe<AgentsDeleteDocAccess>;
  fields?: Maybe<AgentsDocAccessFields>;
  read?: Maybe<AgentsReadDocAccess>;
  update?: Maybe<AgentsUpdateDocAccess>;
};

export type AllMedia = {
  __typename?: 'allMedia';
  docs: Array<Media>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type ChannelsAccess = {
  __typename?: 'channelsAccess';
  create?: Maybe<ChannelsCreateAccess>;
  delete?: Maybe<ChannelsDeleteAccess>;
  fields?: Maybe<ChannelsFields>;
  read?: Maybe<ChannelsReadAccess>;
  update?: Maybe<ChannelsUpdateAccess>;
};

export type ChannelsDocAccess = {
  __typename?: 'channelsDocAccess';
  create?: Maybe<ChannelsCreateDocAccess>;
  delete?: Maybe<ChannelsDeleteDocAccess>;
  fields?: Maybe<ChannelsDocAccessFields>;
  read?: Maybe<ChannelsReadDocAccess>;
  update?: Maybe<ChannelsUpdateDocAccess>;
};

export type CountAgentMessages = {
  __typename?: 'countAgentMessages';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountAgents = {
  __typename?: 'countAgents';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountChannels = {
  __typename?: 'countChannels';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountModelDefinitions = {
  __typename?: 'countModelDefinitions';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountPayloadKvs = {
  __typename?: 'countPayloadKvs';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountPayloadLockedDocuments = {
  __typename?: 'countPayloadLockedDocuments';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountPayloadPreferences = {
  __typename?: 'countPayloadPreferences';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountThreads = {
  __typename?: 'countThreads';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountUserMessages = {
  __typename?: 'countUserMessages';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountUsers = {
  __typename?: 'countUsers';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountallMedia = {
  __typename?: 'countallMedia';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type DocsMockDataAccess = {
  __typename?: 'docsMockDataAccess';
  fields?: Maybe<DocsMockDataFields>;
  read?: Maybe<DocsMockDataReadAccess>;
  update?: Maybe<DocsMockDataUpdateAccess>;
};

export type DocsMockDataDocAccess = {
  __typename?: 'docsMockDataDocAccess';
  fields?: Maybe<DocsMockDataDocAccessFields>;
  read?: Maybe<DocsMockDataReadDocAccess>;
  update?: Maybe<DocsMockDataUpdateDocAccess>;
};

export type MediaAccess = {
  __typename?: 'mediaAccess';
  create?: Maybe<MediaCreateAccess>;
  delete?: Maybe<MediaDeleteAccess>;
  fields?: Maybe<MediaFields>;
  read?: Maybe<MediaReadAccess>;
  update?: Maybe<MediaUpdateAccess>;
};

export type MediaDocAccess = {
  __typename?: 'mediaDocAccess';
  create?: Maybe<MediaCreateDocAccess>;
  delete?: Maybe<MediaDeleteDocAccess>;
  fields?: Maybe<MediaDocAccessFields>;
  read?: Maybe<MediaReadDocAccess>;
  update?: Maybe<MediaUpdateDocAccess>;
};

export type ModelDefinitionsAccess = {
  __typename?: 'modelDefinitionsAccess';
  create?: Maybe<ModelDefinitionsCreateAccess>;
  delete?: Maybe<ModelDefinitionsDeleteAccess>;
  fields?: Maybe<ModelDefinitionsFields>;
  read?: Maybe<ModelDefinitionsReadAccess>;
  update?: Maybe<ModelDefinitionsUpdateAccess>;
};

export type ModelDefinitionsDocAccess = {
  __typename?: 'modelDefinitionsDocAccess';
  create?: Maybe<ModelDefinitionsCreateDocAccess>;
  delete?: Maybe<ModelDefinitionsDeleteDocAccess>;
  fields?: Maybe<ModelDefinitionsDocAccessFields>;
  read?: Maybe<ModelDefinitionsReadDocAccess>;
  update?: Maybe<ModelDefinitionsUpdateDocAccess>;
};

export type MutationAgentInput = {
  agentModel?: InputMaybe<Scalars['Int']['input']>;
  agentName: Scalars['String']['input'];
  agentSystemMessage: Scalars['String']['input'];
  agentUid: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationAgentMessageInput = {
  channel?: InputMaybe<Scalars['Int']['input']>;
  channelUid: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['String']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  messageContent: Scalars['JSON']['input'];
  messageUid?: InputMaybe<Scalars['String']['input']>;
  originatorUser?: InputMaybe<Scalars['Int']['input']>;
  originatorUserUid?: InputMaybe<Scalars['String']['input']>;
  recipientType: AgentMessage_RecipientType_MutationInput;
  recipientUid?: InputMaybe<Scalars['String']['input']>;
  senderAgent?: InputMaybe<Scalars['Int']['input']>;
  senderAgentUid?: InputMaybe<Scalars['String']['input']>;
  thread?: InputMaybe<Scalars['Int']['input']>;
  threadUid: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationAgentMessageUpdateInput = {
  channel?: InputMaybe<Scalars['Int']['input']>;
  channelUid?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  messageContent?: InputMaybe<Scalars['JSON']['input']>;
  messageUid?: InputMaybe<Scalars['String']['input']>;
  originatorUser?: InputMaybe<Scalars['Int']['input']>;
  originatorUserUid?: InputMaybe<Scalars['String']['input']>;
  recipientType?: InputMaybe<AgentMessageUpdate_RecipientType_MutationInput>;
  recipientUid?: InputMaybe<Scalars['String']['input']>;
  senderAgent?: InputMaybe<Scalars['Int']['input']>;
  senderAgentUid?: InputMaybe<Scalars['String']['input']>;
  thread?: InputMaybe<Scalars['Int']['input']>;
  threadUid?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationAgentUpdateInput = {
  agentModel?: InputMaybe<Scalars['Int']['input']>;
  agentName?: InputMaybe<Scalars['String']['input']>;
  agentSystemMessage?: InputMaybe<Scalars['String']['input']>;
  agentUid?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationChannelInput = {
  blacklistedAgents?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  blacklistedUsers?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  channelName: Scalars['String']['input'];
  channelSlug?: InputMaybe<Scalars['String']['input']>;
  channelUid?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  mainThread?: InputMaybe<Scalars['Int']['input']>;
  parentChannel?: InputMaybe<Scalars['Int']['input']>;
  participantAgents?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  participantUsers?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationChannelUpdateInput = {
  blacklistedAgents?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  blacklistedUsers?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  channelName?: InputMaybe<Scalars['String']['input']>;
  channelSlug?: InputMaybe<Scalars['String']['input']>;
  channelUid?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  mainThread?: InputMaybe<Scalars['Int']['input']>;
  parentChannel?: InputMaybe<Scalars['Int']['input']>;
  participantAgents?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  participantUsers?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationDocsMockDatumInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  mockData?: InputMaybe<Scalars['JSON']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationMediaInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  filesize?: InputMaybe<Scalars['Float']['input']>;
  focalX?: InputMaybe<Scalars['Float']['input']>;
  focalY?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  thumbnailURL?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type MutationMediaUpdateInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  filesize?: InputMaybe<Scalars['Float']['input']>;
  focalX?: InputMaybe<Scalars['Float']['input']>;
  focalY?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  thumbnailURL?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type MutationModelDefinitionInput = {
  apiKey: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['String']['input']>;
  label: Scalars['String']['input'];
  provider: ModelDefinition_Provider_MutationInput;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  value: Scalars['String']['input'];
};

export type MutationModelDefinitionUpdateInput = {
  apiKey?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<ModelDefinitionUpdate_Provider_MutationInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type MutationPayloadKvInput = {
  data: Scalars['JSON']['input'];
  key: Scalars['String']['input'];
};

export type MutationPayloadKvUpdateInput = {
  data?: InputMaybe<Scalars['JSON']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
};

export type MutationPayloadLockedDocumentInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  document?: InputMaybe<PayloadLockedDocument_DocumentRelationshipInput>;
  globalSlug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadLockedDocument_UserRelationshipInput>;
};

export type MutationPayloadLockedDocumentUpdateInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  document?: InputMaybe<PayloadLockedDocumentUpdate_DocumentRelationshipInput>;
  globalSlug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadLockedDocumentUpdate_UserRelationshipInput>;
};

export type MutationPayloadPreferenceInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadPreference_UserRelationshipInput>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export type MutationPayloadPreferenceUpdateInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadPreferenceUpdate_UserRelationshipInput>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export type MutationThreadInput = {
  channel?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  lockReason?: InputMaybe<Scalars['String']['input']>;
  lockedAt?: InputMaybe<Scalars['String']['input']>;
  threadUid: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationThreadUpdateInput = {
  channel?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  lockReason?: InputMaybe<Scalars['String']['input']>;
  lockedAt?: InputMaybe<Scalars['String']['input']>;
  threadUid?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUserInput = {
  allowedAgents?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  hash?: InputMaybe<Scalars['String']['input']>;
  lastLoginAt?: InputMaybe<Scalars['String']['input']>;
  lockUntil?: InputMaybe<Scalars['String']['input']>;
  loginAttempts?: InputMaybe<Scalars['Float']['input']>;
  loginCode?: InputMaybe<Scalars['String']['input']>;
  loginCodeExpiresAt?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  resetPasswordExpiration?: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
  roles: Array<InputMaybe<User_Roles_MutationInput>>;
  salt?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  userUid: Scalars['String']['input'];
};

export type MutationUserMessageInput = {
  channel?: InputMaybe<Scalars['Int']['input']>;
  channelUid: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['String']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  messageContent: Scalars['JSON']['input'];
  messageUid?: InputMaybe<Scalars['String']['input']>;
  noStreamBroadcast?: InputMaybe<Scalars['Boolean']['input']>;
  processOnlyCurrentMessage?: InputMaybe<Scalars['Boolean']['input']>;
  recipientType: UserMessage_RecipientType_MutationInput;
  recipientUid?: InputMaybe<Scalars['String']['input']>;
  senderUser?: InputMaybe<Scalars['Int']['input']>;
  senderUserUid?: InputMaybe<Scalars['String']['input']>;
  thread?: InputMaybe<Scalars['Int']['input']>;
  threadUid: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUserMessageUpdateInput = {
  channel?: InputMaybe<Scalars['Int']['input']>;
  channelUid?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  deletedAt?: InputMaybe<Scalars['String']['input']>;
  messageContent?: InputMaybe<Scalars['JSON']['input']>;
  messageUid?: InputMaybe<Scalars['String']['input']>;
  noStreamBroadcast?: InputMaybe<Scalars['Boolean']['input']>;
  processOnlyCurrentMessage?: InputMaybe<Scalars['Boolean']['input']>;
  recipientType?: InputMaybe<UserMessageUpdate_RecipientType_MutationInput>;
  recipientUid?: InputMaybe<Scalars['String']['input']>;
  senderUser?: InputMaybe<Scalars['Int']['input']>;
  senderUserUid?: InputMaybe<Scalars['String']['input']>;
  thread?: InputMaybe<Scalars['Int']['input']>;
  threadUid?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUserUpdateInput = {
  allowedAgents?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  lastLoginAt?: InputMaybe<Scalars['String']['input']>;
  lockUntil?: InputMaybe<Scalars['String']['input']>;
  loginAttempts?: InputMaybe<Scalars['Float']['input']>;
  loginCode?: InputMaybe<Scalars['String']['input']>;
  loginCodeExpiresAt?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  resetPasswordExpiration?: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<InputMaybe<UserUpdate_Roles_MutationInput>>>;
  salt?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  userUid?: InputMaybe<Scalars['String']['input']>;
};

export type Payload_KvAccess = {
  __typename?: 'payload_kvAccess';
  create?: Maybe<PayloadKvCreateAccess>;
  delete?: Maybe<PayloadKvDeleteAccess>;
  fields?: Maybe<PayloadKvFields>;
  read?: Maybe<PayloadKvReadAccess>;
  update?: Maybe<PayloadKvUpdateAccess>;
};

export type Payload_KvDocAccess = {
  __typename?: 'payload_kvDocAccess';
  create?: Maybe<PayloadKvCreateDocAccess>;
  delete?: Maybe<PayloadKvDeleteDocAccess>;
  fields?: Maybe<PayloadKvDocAccessFields>;
  read?: Maybe<PayloadKvReadDocAccess>;
  update?: Maybe<PayloadKvUpdateDocAccess>;
};

export type Payload_Locked_DocumentsAccess = {
  __typename?: 'payload_locked_documentsAccess';
  create?: Maybe<PayloadLockedDocumentsCreateAccess>;
  delete?: Maybe<PayloadLockedDocumentsDeleteAccess>;
  fields?: Maybe<PayloadLockedDocumentsFields>;
  read?: Maybe<PayloadLockedDocumentsReadAccess>;
  update?: Maybe<PayloadLockedDocumentsUpdateAccess>;
};

export type Payload_Locked_DocumentsDocAccess = {
  __typename?: 'payload_locked_documentsDocAccess';
  create?: Maybe<PayloadLockedDocumentsCreateDocAccess>;
  delete?: Maybe<PayloadLockedDocumentsDeleteDocAccess>;
  fields?: Maybe<PayloadLockedDocumentsDocAccessFields>;
  read?: Maybe<PayloadLockedDocumentsReadDocAccess>;
  update?: Maybe<PayloadLockedDocumentsUpdateDocAccess>;
};

export type Payload_PreferencesAccess = {
  __typename?: 'payload_preferencesAccess';
  create?: Maybe<PayloadPreferencesCreateAccess>;
  delete?: Maybe<PayloadPreferencesDeleteAccess>;
  fields?: Maybe<PayloadPreferencesFields>;
  read?: Maybe<PayloadPreferencesReadAccess>;
  update?: Maybe<PayloadPreferencesUpdateAccess>;
};

export type Payload_PreferencesDocAccess = {
  __typename?: 'payload_preferencesDocAccess';
  create?: Maybe<PayloadPreferencesCreateDocAccess>;
  delete?: Maybe<PayloadPreferencesDeleteDocAccess>;
  fields?: Maybe<PayloadPreferencesDocAccessFields>;
  read?: Maybe<PayloadPreferencesReadDocAccess>;
  update?: Maybe<PayloadPreferencesUpdateDocAccess>;
};

export type ThreadsAccess = {
  __typename?: 'threadsAccess';
  create?: Maybe<ThreadsCreateAccess>;
  delete?: Maybe<ThreadsDeleteAccess>;
  fields?: Maybe<ThreadsFields>;
  read?: Maybe<ThreadsReadAccess>;
  update?: Maybe<ThreadsUpdateAccess>;
};

export type ThreadsDocAccess = {
  __typename?: 'threadsDocAccess';
  create?: Maybe<ThreadsCreateDocAccess>;
  delete?: Maybe<ThreadsDeleteDocAccess>;
  fields?: Maybe<ThreadsDocAccessFields>;
  read?: Maybe<ThreadsReadDocAccess>;
  update?: Maybe<ThreadsUpdateDocAccess>;
};

export type UserMessagesAccess = {
  __typename?: 'userMessagesAccess';
  create?: Maybe<UserMessagesCreateAccess>;
  delete?: Maybe<UserMessagesDeleteAccess>;
  fields?: Maybe<UserMessagesFields>;
  read?: Maybe<UserMessagesReadAccess>;
  update?: Maybe<UserMessagesUpdateAccess>;
};

export type UserMessagesDocAccess = {
  __typename?: 'userMessagesDocAccess';
  create?: Maybe<UserMessagesCreateDocAccess>;
  delete?: Maybe<UserMessagesDeleteDocAccess>;
  fields?: Maybe<UserMessagesDocAccessFields>;
  read?: Maybe<UserMessagesReadDocAccess>;
  update?: Maybe<UserMessagesUpdateDocAccess>;
};

export type UsersAccess = {
  __typename?: 'usersAccess';
  create?: Maybe<UsersCreateAccess>;
  delete?: Maybe<UsersDeleteAccess>;
  fields?: Maybe<UsersFields>;
  read?: Maybe<UsersReadAccess>;
  unlock?: Maybe<UsersUnlockAccess>;
  update?: Maybe<UsersUpdateAccess>;
};

export type UsersDocAccess = {
  __typename?: 'usersDocAccess';
  create?: Maybe<UsersCreateDocAccess>;
  delete?: Maybe<UsersDeleteDocAccess>;
  fields?: Maybe<UsersDocAccessFields>;
  read?: Maybe<UsersReadDocAccess>;
  unlock?: Maybe<UsersUnlockDocAccess>;
  update?: Maybe<UsersUpdateDocAccess>;
};

export type UsersJwt = {
  __typename?: 'usersJWT';
  collection: Scalars['String']['output'];
  email: Scalars['EmailAddress']['output'];
  roles: Array<UsersJwt_Roles>;
};

export enum UsersJwt_Roles {
  Admin = 'ADMIN',
  ReadOnly = 'READ_ONLY',
  SuperAdmin = 'SUPER_ADMIN',
  Write = 'WRITE'
}

export type UsersLoginResult = {
  __typename?: 'usersLoginResult';
  exp?: Maybe<Scalars['Int']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type UsersMe = {
  __typename?: 'usersMe';
  collection?: Maybe<Scalars['String']['output']>;
  exp?: Maybe<Scalars['Int']['output']>;
  strategy?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type UsersRefreshedUser = {
  __typename?: 'usersRefreshedUser';
  exp?: Maybe<Scalars['Int']['output']>;
  refreshedToken?: Maybe<Scalars['String']['output']>;
  strategy?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UsersJwt>;
};

export type UsersResetPassword = {
  __typename?: 'usersResetPassword';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};
