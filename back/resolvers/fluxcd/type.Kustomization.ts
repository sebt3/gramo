type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface FluxcdKustomizationStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface FluxcdKustomizationStatusInventoryEntriesItem {
  id: string
  v: string
}
export interface FluxcdKustomizationStatusInventory {
  entries: Array<FluxcdKustomizationStatusInventoryEntriesItem>
}
export interface FluxcdKustomizationStatus {
  conditions: Array<FluxcdKustomizationStatusConditionsItem> | undefined
  inventory: FluxcdKustomizationStatusInventory | undefined
  lastAppliedRevision: string | undefined
  lastAttemptedRevision: string | undefined
  lastHandledReconcileAt: string | undefined
  observedGeneration: number | undefined
}
export interface FluxcdKustomizationSpecCommonMetadataAnnotations {
}
export interface FluxcdKustomizationSpecCommonMetadataLabels {
}
export interface FluxcdKustomizationSpecCommonMetadata {
  annotations: FluxcdKustomizationSpecCommonMetadataAnnotations | undefined
  labels: FluxcdKustomizationSpecCommonMetadataLabels | undefined
}
export interface FluxcdKustomizationSpecDecryptionSecretRef {
  name: string
}
export interface FluxcdKustomizationSpecDecryption {
  provider: string
  secretRef: FluxcdKustomizationSpecDecryptionSecretRef | undefined
}
export interface FluxcdKustomizationSpecDependsOnItem {
  name: string
  namespace: string | undefined
}
export interface FluxcdKustomizationSpecHealthChecksItem {
  apiVersion: string | undefined
  kind: string
  name: string
  namespace: string | undefined
}
export interface FluxcdKustomizationSpecImagesItem {
  digest: string | undefined
  name: string
  newName: string | undefined
  newTag: string | undefined
}
export interface FluxcdKustomizationSpecKubeConfigSecretRef {
  key: string | undefined
  name: string
}
export interface FluxcdKustomizationSpecKubeConfig {
  secretRef: FluxcdKustomizationSpecKubeConfigSecretRef
}
export interface FluxcdKustomizationSpecPatchesItemTarget {
  annotationSelector: string | undefined
  group: string | undefined
  kind: string | undefined
  labelSelector: string | undefined
  name: string | undefined
  namespace: string | undefined
  version: string | undefined
}
export interface FluxcdKustomizationSpecPatchesItem {
  patch: string
  target: FluxcdKustomizationSpecPatchesItemTarget | undefined
}
export interface FluxcdKustomizationSpecPostBuildSubstitute {
}
export interface FluxcdKustomizationSpecPostBuildSubstituteFromItem {
  kind: string
  name: string
  optional: boolean | undefined
}
export interface FluxcdKustomizationSpecPostBuild {
  substitute: FluxcdKustomizationSpecPostBuildSubstitute | undefined
  substituteFrom: Array<FluxcdKustomizationSpecPostBuildSubstituteFromItem> | undefined
}
export interface FluxcdKustomizationSpecSourceRef {
  apiVersion: string | undefined
  kind: string
  name: string
  namespace: string | undefined
}
export interface FluxcdKustomizationSpec {
  commonMetadata: FluxcdKustomizationSpecCommonMetadata | undefined
  components: Array<string> | undefined
  decryption: FluxcdKustomizationSpecDecryption | undefined
  dependsOn: Array<FluxcdKustomizationSpecDependsOnItem> | undefined
  force: boolean | undefined
  healthChecks: Array<FluxcdKustomizationSpecHealthChecksItem> | undefined
  images: Array<FluxcdKustomizationSpecImagesItem> | undefined
  interval: string
  kubeConfig: FluxcdKustomizationSpecKubeConfig | undefined
  patches: Array<FluxcdKustomizationSpecPatchesItem> | undefined
  path: string | undefined
  postBuild: FluxcdKustomizationSpecPostBuild | undefined
  prune: boolean
  retryInterval: string | undefined
  serviceAccountName: string | undefined
  sourceRef: FluxcdKustomizationSpecSourceRef
  suspend: boolean | undefined
  targetNamespace: string | undefined
  timeout: string | undefined
  wait: boolean | undefined
}
export interface FluxcdKustomization extends KubernetesObject {
  spec: FluxcdKustomizationSpec
  status: FluxcdKustomizationStatus | undefined
}
export type FluxcdKustomizationList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<FluxcdKustomization>
