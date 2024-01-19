type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface FluxcdProviderStatusConditionsItem {
  "lastTransitionTime": string
  "message": string
  "observedGeneration": number | undefined
  "reason": string
  "status": string
  "type": string
}
export interface FluxcdProviderStatus {
  "conditions": Array<FluxcdProviderStatusConditionsItem> | undefined
  "lastHandledReconcileAt": string | undefined
  "observedGeneration": number | undefined
}
export interface FluxcdProviderSpecCertSecretRef {
  "name": string
}
export interface FluxcdProviderSpecSecretRef {
  "name": string
}
export interface FluxcdProviderSpec {
  "address": string | undefined
  "certSecretRef": FluxcdProviderSpecCertSecretRef | undefined
  "channel": string | undefined
  "interval": string | undefined
  "proxy": string | undefined
  "secretRef": FluxcdProviderSpecSecretRef | undefined
  "suspend": boolean | undefined
  "timeout": string | undefined
  "type": string
  "username": string | undefined
}
export interface FluxcdProvider extends KubernetesObject {
  spec: FluxcdProviderSpec
  status: FluxcdProviderStatus | undefined
}
export type FluxcdProviderList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<FluxcdProvider>
