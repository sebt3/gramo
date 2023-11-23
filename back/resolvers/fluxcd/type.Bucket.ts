type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface FluxcdBucketStatusArtifactMetadata {
}
export interface FluxcdBucketStatusArtifact {
  digest: string | undefined
  lastUpdateTime: string
  metadata: FluxcdBucketStatusArtifactMetadata | undefined
  path: string
  revision: string
  size: number | undefined
  url: string
}
export interface FluxcdBucketStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface FluxcdBucketStatus {
  artifact: FluxcdBucketStatusArtifact | undefined
  conditions: Array<FluxcdBucketStatusConditionsItem> | undefined
  lastHandledReconcileAt: string | undefined
  observedGeneration: number | undefined
  observedIgnore: string | undefined
  url: string | undefined
}
export interface FluxcdBucketSpecAccessFromNamespaceSelectorsItemMatchLabels {
}
export interface FluxcdBucketSpecAccessFromNamespaceSelectorsItem {
  matchLabels: FluxcdBucketSpecAccessFromNamespaceSelectorsItemMatchLabels | undefined
}
export interface FluxcdBucketSpecAccessFrom {
  namespaceSelectors: Array<FluxcdBucketSpecAccessFromNamespaceSelectorsItem>
}
export interface FluxcdBucketSpecSecretRef {
  name: string
}
export interface FluxcdBucketSpec {
  accessFrom: FluxcdBucketSpecAccessFrom | undefined
  bucketName: string
  endpoint: string
  ignore: string | undefined
  insecure: boolean | undefined
  interval: string
  provider: string | undefined
  region: string | undefined
  secretRef: FluxcdBucketSpecSecretRef | undefined
  suspend: boolean | undefined
  timeout: string | undefined
}
export interface FluxcdBucket extends KubernetesObject {
  spec: FluxcdBucketSpec
  status: FluxcdBucketStatus | undefined
}
export type FluxcdBucketList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<FluxcdBucket>
