type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface K8upSnapshotStatus {
}
export interface K8upSnapshotSpec {
  date: string | undefined
  id: string | undefined
  paths: Array<string> | undefined
  repository: string | undefined
}
export interface K8upSnapshot extends KubernetesObject {
  spec: K8upSnapshotSpec
  status: K8upSnapshotStatus | undefined
}
export type K8upSnapshotList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<K8upSnapshot>
