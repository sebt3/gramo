type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface FluxcdOCIRepositoryStatusArtifact {
  digest: string | undefined
  lastUpdateTime: string
  metadata: metadata
  path: string
  revision: string
  size: number | undefined
  url: string
}
export interface FluxcdOCIRepositoryStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface FluxcdOCIRepositoryStatusObservedLayerSelector {
  mediaType: string | undefined
  operation: string | undefined
}
export interface FluxcdOCIRepositoryStatus {
  artifact: FluxcdOCIRepositoryStatusArtifact | undefined
  conditions: Array<FluxcdOCIRepositoryStatusConditionsItem> | undefined
  contentConfigChecksum: string | undefined
  lastHandledReconcileAt: string | undefined
  observedGeneration: number | undefined
  observedIgnore: string | undefined
  observedLayerSelector: FluxcdOCIRepositoryStatusObservedLayerSelector | undefined
  url: string | undefined
}
export interface FluxcdOCIRepositorySpecCertSecretRef {
  name: string
}
export interface FluxcdOCIRepositorySpecLayerSelector {
  mediaType: string | undefined
  operation: string | undefined
}
export interface FluxcdOCIRepositorySpecRef {
  digest: string | undefined
  semver: string | undefined
  tag: string | undefined
}
export interface FluxcdOCIRepositorySpecSecretRef {
  name: string
}
export interface FluxcdOCIRepositorySpecVerifySecretRef {
  name: string
}
export interface FluxcdOCIRepositorySpecVerify {
  provider: string
  secretRef: FluxcdOCIRepositorySpecVerifySecretRef | undefined
}
export interface FluxcdOCIRepositorySpec {
  certSecretRef: FluxcdOCIRepositorySpecCertSecretRef | undefined
  ignore: string | undefined
  insecure: boolean | undefined
  interval: string
  layerSelector: FluxcdOCIRepositorySpecLayerSelector | undefined
  provider: string | undefined
  ref: FluxcdOCIRepositorySpecRef | undefined
  secretRef: FluxcdOCIRepositorySpecSecretRef | undefined
  serviceAccountName: string | undefined
  suspend: boolean | undefined
  timeout: string | undefined
  url: string
  verify: FluxcdOCIRepositorySpecVerify | undefined
}
export interface FluxcdOCIRepository extends KubernetesObject {
  spec: FluxcdOCIRepositorySpec
  status: FluxcdOCIRepositoryStatus | undefined
}
export type FluxcdOCIRepositoryList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<FluxcdOCIRepository>
