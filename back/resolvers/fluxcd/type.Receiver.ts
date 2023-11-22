type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface FluxcdReceiverStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface FluxcdReceiverStatus {
  conditions: Array<FluxcdReceiverStatusConditionsItem> | undefined
  lastHandledReconcileAt: string | undefined
  observedGeneration: number | undefined
  webhookPath: string | undefined
}
export interface FluxcdReceiverSpecResourcesItemMatchLabels {
}
export interface FluxcdReceiverSpecResourcesItem {
  apiVersion: string | undefined
  kind: string
  matchLabels: FluxcdReceiverSpecResourcesItemMatchLabels | undefined
  name: string
  namespace: string | undefined
}
export interface FluxcdReceiverSpecSecretRef {
  name: string
}
export interface FluxcdReceiverSpec {
  events: Array<string> | undefined
  interval: string | undefined
  resources: Array<FluxcdReceiverSpecResourcesItem>
  secretRef: FluxcdReceiverSpecSecretRef
  suspend: boolean | undefined
  type: string
}
export interface FluxcdReceiver extends KubernetesObject {
  spec: FluxcdReceiverSpec
  status: FluxcdReceiverStatus | undefined
}
export type FluxcdReceiverList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<FluxcdReceiver>
