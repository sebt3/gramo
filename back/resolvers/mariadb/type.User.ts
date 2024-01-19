type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MariadbUserStatusConditionsItem {
  "lastTransitionTime": string
  "message": string
  "observedGeneration": number | undefined
  "reason": string
  "status": string
  "type": string
}
export interface MariadbUserStatus {
  "conditions": Array<MariadbUserStatusConditionsItem> | undefined
}
export interface MariadbUserSpecMariaDbRef {
  "apiVersion": string | undefined
  "fieldPath": string | undefined
  "kind": string | undefined
  "name": string | undefined
  "namespace": string | undefined
  "resourceVersion": string | undefined
  "uid": string | undefined
  "waitForIt": boolean | undefined
}
export interface MariadbUserSpecPasswordSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbUserSpec {
  "host": string | undefined
  "mariaDbRef": MariadbUserSpecMariaDbRef
  "maxUserConnections": number | undefined
  "name": string | undefined
  "passwordSecretKeyRef": MariadbUserSpecPasswordSecretKeyRef
  "retryInterval": string | undefined
}
export interface MariadbUser extends KubernetesObject {
  spec: MariadbUserSpec
  status: MariadbUserStatus | undefined
}
export type MariadbUserList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MariadbUser>
