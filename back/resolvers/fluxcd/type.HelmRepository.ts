type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface FluxcdHelmRepositoryStatusArtifactMetadata {
}
export interface FluxcdHelmRepositoryStatusArtifact {
  "digest": string | undefined
  "lastUpdateTime": string
  "metadata": FluxcdHelmRepositoryStatusArtifactMetadata | undefined
  "path": string
  "revision": string
  "size": number | undefined
  "url": string
}
export interface FluxcdHelmRepositoryStatusConditionsItem {
  "lastTransitionTime": string
  "message": string
  "observedGeneration": number | undefined
  "reason": string
  "status": string
  "type": string
}
export interface FluxcdHelmRepositoryStatus {
  "artifact": FluxcdHelmRepositoryStatusArtifact | undefined
  "conditions": Array<FluxcdHelmRepositoryStatusConditionsItem> | undefined
  "lastHandledReconcileAt": string | undefined
  "observedGeneration": number | undefined
  "url": string | undefined
}
export interface FluxcdHelmRepositorySpecAccessFromNamespaceSelectorsItemMatchLabels {
}
export interface FluxcdHelmRepositorySpecAccessFromNamespaceSelectorsItem {
  "matchLabels": FluxcdHelmRepositorySpecAccessFromNamespaceSelectorsItemMatchLabels | undefined
}
export interface FluxcdHelmRepositorySpecAccessFrom {
  "namespaceSelectors": Array<FluxcdHelmRepositorySpecAccessFromNamespaceSelectorsItem>
}
export interface FluxcdHelmRepositorySpecSecretRef {
  "name": string
}
export interface FluxcdHelmRepositorySpec {
  "accessFrom": FluxcdHelmRepositorySpecAccessFrom | undefined
  "interval": string
  "passCredentials": boolean | undefined
  "provider": string | undefined
  "secretRef": FluxcdHelmRepositorySpecSecretRef | undefined
  "suspend": boolean | undefined
  "timeout": string | undefined
  "type": string | undefined
  "url": string
}
export interface FluxcdHelmRepository extends KubernetesObject {
  spec: FluxcdHelmRepositorySpec
  status: FluxcdHelmRepositoryStatus | undefined
}
export type FluxcdHelmRepositoryList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<FluxcdHelmRepository>
