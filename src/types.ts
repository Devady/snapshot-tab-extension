export type MessageSnapshotRequest = 'SNAPSHOT::REQUEST';
export type MessageSnapshotSrcRequest = 'SNAPSHOT::SRC::REQUEST';

export interface ISnapshotRequest {
  type: MessageSnapshotRequest | MessageSnapshotSrcRequest;
  data: {};
}

export type MessageTypes = ISnapshotRequest;
