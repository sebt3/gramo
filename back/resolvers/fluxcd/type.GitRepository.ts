type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface FluxcdGitRepositoryStatusArtifactMetadata {
}
export interface FluxcdGitRepositoryStatusArtifact {
  "digest": string | undefined
  "lastUpdateTime": string
  "metadata": FluxcdGitRepositoryStatusArtifactMetadata | undefined
  "path": string
  "revision": string
  "size": number | undefined
  "url": string
}
export interface FluxcdGitRepositoryStatusConditionsItem {
  "lastTransitionTime": string
  "message": string
  "observedGeneration": number | undefined
  "reason": string
  "status": string
  "type": string
}
export interface FluxcdGitRepositoryStatusIncludedArtifactsItemMetadata {
}
export interface FluxcdGitRepositoryStatusIncludedArtifactsItem {
  "digest": string | undefined
  "lastUpdateTime": string
  "metadata": FluxcdGitRepositoryStatusIncludedArtifactsItemMetadata | undefined
  "path": string
  "revision": string
  "size": number | undefined
  "url": string
}
export interface FluxcdGitRepositoryStatusObservedIncludeItemRepository {
  "name": string
}
export interface FluxcdGitRepositoryStatusObservedIncludeItem {
  "fromPath": string | undefined
  "repository": FluxcdGitRepositoryStatusObservedIncludeItemRepository
  "toPath": string | undefined
}
export interface FluxcdGitRepositoryStatus {
  "artifact": FluxcdGitRepositoryStatusArtifact | undefined
  "conditions": Array<FluxcdGitRepositoryStatusConditionsItem> | undefined
  "includedArtifacts": Array<FluxcdGitRepositoryStatusIncludedArtifactsItem> | undefined
  "lastHandledReconcileAt": string | undefined
  "observedGeneration": number | undefined
  "observedIgnore": string | undefined
  "observedInclude": Array<FluxcdGitRepositoryStatusObservedIncludeItem> | undefined
  "observedRecurseSubmodules": boolean | undefined
}
export interface FluxcdGitRepositorySpecIncludeItemRepository {
  "name": string
}
export interface FluxcdGitRepositorySpecIncludeItem {
  "fromPath": string | undefined
  "repository": FluxcdGitRepositorySpecIncludeItemRepository
  "toPath": string | undefined
}
export interface FluxcdGitRepositorySpecRef {
  "branch": string | undefined
  "commit": string | undefined
  "name": string | undefined
  "semver": string | undefined
  "tag": string | undefined
}
export interface FluxcdGitRepositorySpecSecretRef {
  "name": string
}
export interface FluxcdGitRepositorySpecVerifySecretRef {
  "name": string
}
export interface FluxcdGitRepositorySpecVerify {
  "mode": string
  "secretRef": FluxcdGitRepositorySpecVerifySecretRef
}
export interface FluxcdGitRepositorySpec {
  "ignore": string | undefined
  "include": Array<FluxcdGitRepositorySpecIncludeItem> | undefined
  "interval": string
  "recurseSubmodules": boolean | undefined
  "ref": FluxcdGitRepositorySpecRef | undefined
  "secretRef": FluxcdGitRepositorySpecSecretRef | undefined
  "suspend": boolean | undefined
  "timeout": string | undefined
  "url": string
  "verify": FluxcdGitRepositorySpecVerify | undefined
}
export interface FluxcdGitRepository extends KubernetesObject {
  spec: FluxcdGitRepositorySpec
  status: FluxcdGitRepositoryStatus | undefined
}
export type FluxcdGitRepositoryList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<FluxcdGitRepository>
