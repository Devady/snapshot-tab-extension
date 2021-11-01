export type MessageSnapshotRequest = 'SNAPSHOT::REQUEST';
export type MessageSnapshotData = 'SNAPSHOT::DATA';

export interface ISnapshotRequest {
  type: MessageSnapshotRequest;
}

export interface ISnapshotData {
  type: MessageSnapshotData;
  data: {
    screenshotUrl: string;
  };
}

export type MessageTypes = ISnapshotRequest | ISnapshotData;
