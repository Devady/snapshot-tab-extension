export type MessageSnapshotRequest = 'SNAPSHOT::REQUEST';
export type MessageSnapshotData = 'SNAPSHOT::DATA';

export type MessageSnapshotBlockDomain = 'SNAPSHOT::BLOCK::DOMAIN';
export type MessageSnapshotAllowDomain = 'SNAPSHOT::ALLOW::DOMAIN';

export interface ISnapshotRequest {
  type: MessageSnapshotRequest;
}

export interface ISnapshotData {
  type: MessageSnapshotData;
  data: {
    screenshotUrl: string;
  };
}

export interface ISnapshotBlockDomain {
  type: MessageSnapshotBlockDomain;
  data: {
    domain: string;
  };
}

export interface ISnapshotAllowDomain {
  type: MessageSnapshotAllowDomain;
  data: {
    domain: string;
  };
}

export type MessageTypes =
  | ISnapshotRequest
  | ISnapshotData
  | ISnapshotBlockDomain
  | ISnapshotAllowDomain;
