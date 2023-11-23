type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface FluxcdHelmReleaseStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface FluxcdHelmReleaseStatus {
  conditions: Array<FluxcdHelmReleaseStatusConditionsItem> | undefined
  failures: number | undefined
  helmChart: string | undefined
  installFailures: number | undefined
  lastAppliedRevision: string | undefined
  lastAttemptedRevision: string | undefined
  lastAttemptedValuesChecksum: string | undefined
  lastHandledReconcileAt: string | undefined
  lastReleaseRevision: number | undefined
  observedGeneration: number | undefined
  upgradeFailures: number | undefined
}
export interface FluxcdHelmReleaseSpecChartMetadataAnnotations {
}
export interface FluxcdHelmReleaseSpecChartMetadataLabels {
}
export interface FluxcdHelmReleaseSpecChartMetadata {
  annotations: FluxcdHelmReleaseSpecChartMetadataAnnotations | undefined
  labels: FluxcdHelmReleaseSpecChartMetadataLabels | undefined
}
export interface FluxcdHelmReleaseSpecChartSpecSourceRef {
  apiVersion: string | undefined
  kind: string | undefined
  name: string
  namespace: string | undefined
}
export interface FluxcdHelmReleaseSpecChartSpecVerifySecretRef {
  name: string
}
export interface FluxcdHelmReleaseSpecChartSpecVerify {
  provider: string
  secretRef: FluxcdHelmReleaseSpecChartSpecVerifySecretRef | undefined
}
export interface FluxcdHelmReleaseSpecChartSpec {
  chart: string
  interval: string | undefined
  reconcileStrategy: string | undefined
  sourceRef: FluxcdHelmReleaseSpecChartSpecSourceRef
  valuesFile: string | undefined
  valuesFiles: Array<string> | undefined
  verify: FluxcdHelmReleaseSpecChartSpecVerify | undefined
  version: string | undefined
}
export interface FluxcdHelmReleaseSpecChart {
  metadata: FluxcdHelmReleaseSpecChartMetadata | undefined
  spec: FluxcdHelmReleaseSpecChartSpec
}
export interface FluxcdHelmReleaseSpecDependsOnItem {
  name: string
  namespace: string | undefined
}
export interface FluxcdHelmReleaseSpecInstallRemediation {
  ignoreTestFailures: boolean | undefined
  remediateLastFailure: boolean | undefined
  retries: number | undefined
}
export interface FluxcdHelmReleaseSpecInstall {
  crds: string | undefined
  createNamespace: boolean | undefined
  disableHooks: boolean | undefined
  disableOpenAPIValidation: boolean | undefined
  disableWait: boolean | undefined
  disableWaitForJobs: boolean | undefined
  remediation: FluxcdHelmReleaseSpecInstallRemediation | undefined
  replace: boolean | undefined
  skipCRDs: boolean | undefined
  timeout: string | undefined
}
export interface FluxcdHelmReleaseSpecKubeConfigSecretRef {
  key: string | undefined
  name: string
}
export interface FluxcdHelmReleaseSpecKubeConfig {
  secretRef: FluxcdHelmReleaseSpecKubeConfigSecretRef
}
export interface FluxcdHelmReleaseSpecPostRenderersItemKustomizeImagesItem {
  digest: string | undefined
  name: string
  newName: string | undefined
  newTag: string | undefined
}
export interface FluxcdHelmReleaseSpecPostRenderersItemKustomizePatchesItemTarget {
  annotationSelector: string | undefined
  group: string | undefined
  kind: string | undefined
  labelSelector: string | undefined
  name: string | undefined
  namespace: string | undefined
  version: string | undefined
}
export interface FluxcdHelmReleaseSpecPostRenderersItemKustomizePatchesItem {
  patch: string
  target: FluxcdHelmReleaseSpecPostRenderersItemKustomizePatchesItemTarget | undefined
}
export interface FluxcdHelmReleaseSpecPostRenderersItemKustomizePatchesJson6902ItemPatchItem {
  from: string | undefined
  op: string
  path: string
  value: object | undefined
}
export interface FluxcdHelmReleaseSpecPostRenderersItemKustomizePatchesJson6902ItemTarget {
  annotationSelector: string | undefined
  group: string | undefined
  kind: string | undefined
  labelSelector: string | undefined
  name: string | undefined
  namespace: string | undefined
  version: string | undefined
}
export interface FluxcdHelmReleaseSpecPostRenderersItemKustomizePatchesJson6902Item {
  patch: Array<FluxcdHelmReleaseSpecPostRenderersItemKustomizePatchesJson6902ItemPatchItem>
  target: FluxcdHelmReleaseSpecPostRenderersItemKustomizePatchesJson6902ItemTarget
}
export interface FluxcdHelmReleaseSpecPostRenderersItemKustomize {
  images: Array<FluxcdHelmReleaseSpecPostRenderersItemKustomizeImagesItem> | undefined
  patches: Array<FluxcdHelmReleaseSpecPostRenderersItemKustomizePatchesItem> | undefined
  patchesJson6902: Array<FluxcdHelmReleaseSpecPostRenderersItemKustomizePatchesJson6902Item> | undefined
  patchesStrategicMerge: Array<object> | undefined
}
export interface FluxcdHelmReleaseSpecPostRenderersItem {
  kustomize: FluxcdHelmReleaseSpecPostRenderersItemKustomize | undefined
}
export interface FluxcdHelmReleaseSpecRollback {
  cleanupOnFail: boolean | undefined
  disableHooks: boolean | undefined
  disableWait: boolean | undefined
  disableWaitForJobs: boolean | undefined
  force: boolean | undefined
  recreate: boolean | undefined
  timeout: string | undefined
}
export interface FluxcdHelmReleaseSpecTest {
  enable: boolean | undefined
  ignoreFailures: boolean | undefined
  timeout: string | undefined
}
export interface FluxcdHelmReleaseSpecUninstall {
  disableHooks: boolean | undefined
  disableWait: boolean | undefined
  keepHistory: boolean | undefined
  timeout: string | undefined
}
export interface FluxcdHelmReleaseSpecUpgradeRemediation {
  ignoreTestFailures: boolean | undefined
  remediateLastFailure: boolean | undefined
  retries: number | undefined
  strategy: string | undefined
}
export interface FluxcdHelmReleaseSpecUpgrade {
  cleanupOnFail: boolean | undefined
  crds: string | undefined
  disableHooks: boolean | undefined
  disableOpenAPIValidation: boolean | undefined
  disableWait: boolean | undefined
  disableWaitForJobs: boolean | undefined
  force: boolean | undefined
  preserveValues: boolean | undefined
  remediation: FluxcdHelmReleaseSpecUpgradeRemediation | undefined
  timeout: string | undefined
}
export interface FluxcdHelmReleaseSpecValuesFromItem {
  kind: string
  name: string
  optional: boolean | undefined
  targetPath: string | undefined
  valuesKey: string | undefined
}
export interface FluxcdHelmReleaseSpec {
  chart: FluxcdHelmReleaseSpecChart
  dependsOn: Array<FluxcdHelmReleaseSpecDependsOnItem> | undefined
  install: FluxcdHelmReleaseSpecInstall | undefined
  interval: string
  kubeConfig: FluxcdHelmReleaseSpecKubeConfig | undefined
  maxHistory: number | undefined
  persistentClient: boolean | undefined
  postRenderers: Array<FluxcdHelmReleaseSpecPostRenderersItem> | undefined
  releaseName: string | undefined
  rollback: FluxcdHelmReleaseSpecRollback | undefined
  serviceAccountName: string | undefined
  storageNamespace: string | undefined
  suspend: boolean | undefined
  targetNamespace: string | undefined
  test: FluxcdHelmReleaseSpecTest | undefined
  timeout: string | undefined
  uninstall: FluxcdHelmReleaseSpecUninstall | undefined
  upgrade: FluxcdHelmReleaseSpecUpgrade | undefined
  values: object | undefined
  valuesFrom: Array<FluxcdHelmReleaseSpecValuesFromItem> | undefined
}
export interface FluxcdHelmRelease extends KubernetesObject {
  spec: FluxcdHelmReleaseSpec
  status: FluxcdHelmReleaseStatus | undefined
}
export type FluxcdHelmReleaseList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<FluxcdHelmRelease>
