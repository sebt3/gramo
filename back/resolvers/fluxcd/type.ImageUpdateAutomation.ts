type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface FluxcdImageUpdateAutomationStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface FluxcdImageUpdateAutomationStatus {
  conditions: Array<FluxcdImageUpdateAutomationStatusConditionsItem> | undefined
  lastAutomationRunTime: string | undefined
  lastHandledReconcileAt: string | undefined
  lastPushCommit: string | undefined
  lastPushTime: string | undefined
  observedGeneration: number | undefined
}
export interface FluxcdImageUpdateAutomationSpecGitCheckoutRef {
  branch: string | undefined
  commit: string | undefined
  name: string | undefined
  semver: string | undefined
  tag: string | undefined
}
export interface FluxcdImageUpdateAutomationSpecGitCheckout {
  ref: FluxcdImageUpdateAutomationSpecGitCheckoutRef
}
export interface FluxcdImageUpdateAutomationSpecGitCommitAuthor {
  email: string
  name: string | undefined
}
export interface FluxcdImageUpdateAutomationSpecGitCommitSigningKeySecretRef {
  name: string
}
export interface FluxcdImageUpdateAutomationSpecGitCommitSigningKey {
  secretRef: FluxcdImageUpdateAutomationSpecGitCommitSigningKeySecretRef | undefined
}
export interface FluxcdImageUpdateAutomationSpecGitCommit {
  author: FluxcdImageUpdateAutomationSpecGitCommitAuthor
  messageTemplate: string | undefined
  signingKey: FluxcdImageUpdateAutomationSpecGitCommitSigningKey | undefined
}
export interface FluxcdImageUpdateAutomationSpecGitPush {
  branch: string
}
export interface FluxcdImageUpdateAutomationSpecGit {
  checkout: FluxcdImageUpdateAutomationSpecGitCheckout | undefined
  commit: FluxcdImageUpdateAutomationSpecGitCommit
  push: FluxcdImageUpdateAutomationSpecGitPush | undefined
}
export interface FluxcdImageUpdateAutomationSpecSourceRef {
  apiVersion: string | undefined
  kind: string
  name: string
  namespace: string | undefined
}
export interface FluxcdImageUpdateAutomationSpecUpdate {
  path: string | undefined
  strategy: string
}
export interface FluxcdImageUpdateAutomationSpec {
  git: FluxcdImageUpdateAutomationSpecGit | undefined
  interval: string
  sourceRef: FluxcdImageUpdateAutomationSpecSourceRef
  suspend: boolean | undefined
  update: FluxcdImageUpdateAutomationSpecUpdate | undefined
}
export interface FluxcdImageUpdateAutomation extends KubernetesObject {
  spec: FluxcdImageUpdateAutomationSpec
  status: FluxcdImageUpdateAutomationStatus | undefined
}
export type FluxcdImageUpdateAutomationList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<FluxcdImageUpdateAutomation>
