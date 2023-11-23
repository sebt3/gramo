type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface FluxcdHelmChartStatusArtifactMetadata {
}
export interface FluxcdHelmChartStatusArtifact {
  digest: string | undefined
  lastUpdateTime: string
  metadata: FluxcdHelmChartStatusArtifactMetadata | undefined
  path: string
  revision: string
  size: number | undefined
  url: string
}
export interface FluxcdHelmChartStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface FluxcdHelmChartStatus {
  artifact: FluxcdHelmChartStatusArtifact | undefined
  conditions: Array<FluxcdHelmChartStatusConditionsItem> | undefined
  lastHandledReconcileAt: string | undefined
  observedChartName: string | undefined
  observedGeneration: number | undefined
  observedSourceArtifactRevision: string | undefined
  url: string | undefined
}
export interface FluxcdHelmChartSpecAccessFromNamespaceSelectorsItemMatchLabels {
}
export interface FluxcdHelmChartSpecAccessFromNamespaceSelectorsItem {
  matchLabels: FluxcdHelmChartSpecAccessFromNamespaceSelectorsItemMatchLabels | undefined
}
export interface FluxcdHelmChartSpecAccessFrom {
  namespaceSelectors: Array<FluxcdHelmChartSpecAccessFromNamespaceSelectorsItem>
}
export interface FluxcdHelmChartSpecSourceRef {
  apiVersion: string | undefined
  kind: string
  name: string
}
export interface FluxcdHelmChartSpecVerifySecretRef {
  name: string
}
export interface FluxcdHelmChartSpecVerify {
  provider: string
  secretRef: FluxcdHelmChartSpecVerifySecretRef | undefined
}
export interface FluxcdHelmChartSpec {
  accessFrom: FluxcdHelmChartSpecAccessFrom | undefined
  chart: string
  interval: string
  reconcileStrategy: string | undefined
  sourceRef: FluxcdHelmChartSpecSourceRef
  suspend: boolean | undefined
  valuesFile: string | undefined
  valuesFiles: Array<string> | undefined
  verify: FluxcdHelmChartSpecVerify | undefined
  version: string | undefined
}
export interface FluxcdHelmChart extends KubernetesObject {
  spec: FluxcdHelmChartSpec
  status: FluxcdHelmChartStatus | undefined
}
export type FluxcdHelmChartList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<FluxcdHelmChart>
