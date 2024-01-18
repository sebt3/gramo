type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MariadbDatabaseStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface MariadbDatabaseStatus {
  conditions: Array<MariadbDatabaseStatusConditionsItem> | undefined
}
export interface MariadbDatabaseSpecMariaDbRef {
  apiVersion: string | undefined
  fieldPath: string | undefined
  kind: string | undefined
  name: string | undefined
  namespace: string | undefined
  resourceVersion: string | undefined
  uid: string | undefined
  waitForIt: boolean | undefined
}
export interface MariadbDatabaseSpec {
  characterSet: string | undefined
  collate: string | undefined
  mariaDbRef: MariadbDatabaseSpecMariaDbRef
  name: string | undefined
  retryInterval: string | undefined
}
export interface MariadbDatabase extends KubernetesObject {
  spec: MariadbDatabaseSpec
  status: MariadbDatabaseStatus | undefined
}
export type MariadbDatabaseList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MariadbDatabase>
