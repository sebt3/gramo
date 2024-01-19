type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface FluxcdAlertStatusConditionsItem {
  "lastTransitionTime": string
  "message": string
  "observedGeneration": number | undefined
  "reason": string
  "status": string
  "type": string
}
export interface FluxcdAlertStatus {
  "conditions": Array<FluxcdAlertStatusConditionsItem> | undefined
  "lastHandledReconcileAt": string | undefined
  "observedGeneration": number | undefined
}
export interface FluxcdAlertSpecEventMetadata {
}
export interface FluxcdAlertSpecEventSourcesItemMatchLabels {
}
export interface FluxcdAlertSpecEventSourcesItem {
  "apiVersion": string | undefined
  "kind": string
  "matchLabels": FluxcdAlertSpecEventSourcesItemMatchLabels | undefined
  "name": string
  "namespace": string | undefined
}
export interface FluxcdAlertSpecProviderRef {
  "name": string
}
export interface FluxcdAlertSpec {
  "eventMetadata": FluxcdAlertSpecEventMetadata | undefined
  "eventSeverity": string | undefined
  "eventSources": Array<FluxcdAlertSpecEventSourcesItem>
  "exclusionList": Array<string> | undefined
  "inclusionList": Array<string> | undefined
  "providerRef": FluxcdAlertSpecProviderRef
  "summary": string | undefined
  "suspend": boolean | undefined
}
export interface FluxcdAlert extends KubernetesObject {
  spec: FluxcdAlertSpec
  status: FluxcdAlertStatus | undefined
}
export type FluxcdAlertList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<FluxcdAlert>
