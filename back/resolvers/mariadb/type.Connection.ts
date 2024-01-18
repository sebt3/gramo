type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MariadbConnectionStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface MariadbConnectionStatus {
  conditions: Array<MariadbConnectionStatusConditionsItem> | undefined
}
export interface MariadbConnectionSpecHealthCheck {
  interval: string | undefined
  retryInterval: string | undefined
}
export interface MariadbConnectionSpecMariaDbRef {
  apiVersion: string | undefined
  fieldPath: string | undefined
  kind: string | undefined
  name: string | undefined
  namespace: string | undefined
  resourceVersion: string | undefined
  uid: string | undefined
  waitForIt: boolean | undefined
}
export interface MariadbConnectionSpecParams {
}
export interface MariadbConnectionSpecPasswordSecretKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MariadbConnectionSpecSecretTemplateAnnotations {
}
export interface MariadbConnectionSpecSecretTemplateLabels {
}
export interface MariadbConnectionSpecSecretTemplate {
  annotations: MariadbConnectionSpecSecretTemplateAnnotations | undefined
  databaseKey: string | undefined
  format: string | undefined
  hostKey: string | undefined
  key: string | undefined
  labels: MariadbConnectionSpecSecretTemplateLabels | undefined
  passwordKey: string | undefined
  portKey: string | undefined
  usernameKey: string | undefined
}
export interface MariadbConnectionSpec {
  database: string | undefined
  healthCheck: MariadbConnectionSpecHealthCheck | undefined
  mariaDbRef: MariadbConnectionSpecMariaDbRef
  params: MariadbConnectionSpecParams | undefined
  passwordSecretKeyRef: MariadbConnectionSpecPasswordSecretKeyRef
  secretName: string | undefined
  secretTemplate: MariadbConnectionSpecSecretTemplate | undefined
  serviceName: string | undefined
  username: string
}
export interface MariadbConnection extends KubernetesObject {
  spec: MariadbConnectionSpec
  status: MariadbConnectionStatus | undefined
}
export type MariadbConnectionList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MariadbConnection>
