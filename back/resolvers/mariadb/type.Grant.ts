type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MariadbGrantStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface MariadbGrantStatus {
  conditions: Array<MariadbGrantStatusConditionsItem> | undefined
}
export interface MariadbGrantSpecMariaDbRef {
  apiVersion: string | undefined
  fieldPath: string | undefined
  kind: string | undefined
  name: string | undefined
  namespace: string | undefined
  resourceVersion: string | undefined
  uid: string | undefined
  waitForIt: boolean | undefined
}
export interface MariadbGrantSpec {
  database: string | undefined
  grantOption: boolean | undefined
  host: string | undefined
  mariaDbRef: MariadbGrantSpecMariaDbRef
  privileges: Array<string>
  retryInterval: string | undefined
  table: string | undefined
  username: string
}
export interface MariadbGrant extends KubernetesObject {
  spec: MariadbGrantSpec
  status: MariadbGrantStatus | undefined
}
export type MariadbGrantList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MariadbGrant>
