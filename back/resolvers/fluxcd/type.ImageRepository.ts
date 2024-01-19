type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface FluxcdImageRepositoryStatusConditionsItem {
  "lastTransitionTime": string
  "message": string
  "observedGeneration": number | undefined
  "reason": string
  "status": string
  "type": string
}
export interface FluxcdImageRepositoryStatusLastScanResult {
  "latestTags": Array<string> | undefined
  "scanTime": string | undefined
  "tagCount": number
}
export interface FluxcdImageRepositoryStatus {
  "canonicalImageName": string | undefined
  "conditions": Array<FluxcdImageRepositoryStatusConditionsItem> | undefined
  "lastHandledReconcileAt": string | undefined
  "lastScanResult": FluxcdImageRepositoryStatusLastScanResult | undefined
  "observedExclusionList": Array<string> | undefined
  "observedGeneration": number | undefined
}
export interface FluxcdImageRepositorySpecAccessFromNamespaceSelectorsItemMatchLabels {
}
export interface FluxcdImageRepositorySpecAccessFromNamespaceSelectorsItem {
  "matchLabels": FluxcdImageRepositorySpecAccessFromNamespaceSelectorsItemMatchLabels | undefined
}
export interface FluxcdImageRepositorySpecAccessFrom {
  "namespaceSelectors": Array<FluxcdImageRepositorySpecAccessFromNamespaceSelectorsItem>
}
export interface FluxcdImageRepositorySpecCertSecretRef {
  "name": string
}
export interface FluxcdImageRepositorySpecSecretRef {
  "name": string
}
export interface FluxcdImageRepositorySpec {
  "accessFrom": FluxcdImageRepositorySpecAccessFrom | undefined
  "certSecretRef": FluxcdImageRepositorySpecCertSecretRef | undefined
  "exclusionList": Array<string> | undefined
  "image": string | undefined
  "interval": string | undefined
  "provider": string | undefined
  "secretRef": FluxcdImageRepositorySpecSecretRef | undefined
  "serviceAccountName": string | undefined
  "suspend": boolean | undefined
  "timeout": string | undefined
}
export interface FluxcdImageRepository extends KubernetesObject {
  spec: FluxcdImageRepositorySpec
  status: FluxcdImageRepositoryStatus | undefined
}
export type FluxcdImageRepositoryList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<FluxcdImageRepository>
