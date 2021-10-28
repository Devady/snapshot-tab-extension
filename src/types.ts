export type MessageSnapshotRequest = 'SNAPSHOT::REQUEST';

export interface ISnapshotRequest {
  type: MessageSnapshotRequest;
}

export type MessageTypes = ISnapshotRequest;
