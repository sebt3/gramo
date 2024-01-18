type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MonitoringThanosRulerStatusConditionsItem {
  lastTransitionTime: string
  message: string | undefined
  observedGeneration: number | undefined
  reason: string | undefined
  status: string
  type: string
}
export interface MonitoringThanosRulerStatus {
  availableReplicas: number
  conditions: Array<MonitoringThanosRulerStatusConditionsItem> | undefined
  paused: boolean
  replicas: number
  unavailableReplicas: number
  updatedReplicas: number
}
export interface MonitoringThanosRulerSpecAdditionalArgsItem {
  name: string
  value: string | undefined
}
export interface MonitoringThanosRulerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  matchExpressions: Array<MonitoringThanosRulerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  matchFields: Array<MonitoringThanosRulerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface MonitoringThanosRulerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  preference: MonitoringThanosRulerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  weight: number
}
export interface MonitoringThanosRulerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  matchExpressions: Array<MonitoringThanosRulerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  matchFields: Array<MonitoringThanosRulerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface MonitoringThanosRulerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  nodeSelectorTerms: Array<MonitoringThanosRulerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface MonitoringThanosRulerSpecAffinityNodeAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<MonitoringThanosRulerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: MonitoringThanosRulerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  matchExpressions: Array<MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  matchExpressions: Array<MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  labelSelector: MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  namespaceSelector: MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  podAffinityTerm: MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  weight: number
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  matchExpressions: Array<MonitoringThanosRulerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringThanosRulerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  matchExpressions: Array<MonitoringThanosRulerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringThanosRulerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  labelSelector: MonitoringThanosRulerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  namespaceSelector: MonitoringThanosRulerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MonitoringThanosRulerSpecAffinityPodAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<MonitoringThanosRulerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: Array<MonitoringThanosRulerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  matchExpressions: Array<MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  matchExpressions: Array<MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  labelSelector: MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  namespaceSelector: MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  podAffinityTerm: MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  weight: number
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  matchExpressions: Array<MonitoringThanosRulerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringThanosRulerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  matchExpressions: Array<MonitoringThanosRulerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringThanosRulerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  labelSelector: MonitoringThanosRulerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  namespaceSelector: MonitoringThanosRulerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MonitoringThanosRulerSpecAffinityPodAntiAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<MonitoringThanosRulerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: Array<MonitoringThanosRulerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface MonitoringThanosRulerSpecAffinity {
  nodeAffinity: MonitoringThanosRulerSpecAffinityNodeAffinity | undefined
  podAffinity: MonitoringThanosRulerSpecAffinityPodAffinity | undefined
  podAntiAffinity: MonitoringThanosRulerSpecAffinityPodAntiAffinity | undefined
}
export interface MonitoringThanosRulerSpecAlertRelabelConfigs {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecAlertmanagersConfig {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecContainersItemEnvItemValueFromConfigMapKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecContainersItemEnvItemValueFromFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface MonitoringThanosRulerSpecContainersItemEnvItemValueFromResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface MonitoringThanosRulerSpecContainersItemEnvItemValueFromSecretKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecContainersItemEnvItemValueFrom {
  configMapKeyRef: MonitoringThanosRulerSpecContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  fieldRef: MonitoringThanosRulerSpecContainersItemEnvItemValueFromFieldRef | undefined
  resourceFieldRef: MonitoringThanosRulerSpecContainersItemEnvItemValueFromResourceFieldRef | undefined
  secretKeyRef: MonitoringThanosRulerSpecContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface MonitoringThanosRulerSpecContainersItemEnvItem {
  name: string
  value: string | undefined
  valueFrom: MonitoringThanosRulerSpecContainersItemEnvItemValueFrom | undefined
}
export interface MonitoringThanosRulerSpecContainersItemEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecContainersItemEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecContainersItemEnvFromItem {
  configMapRef: MonitoringThanosRulerSpecContainersItemEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: MonitoringThanosRulerSpecContainersItemEnvFromItemSecretRef | undefined
}
export interface MonitoringThanosRulerSpecContainersItemLifecyclePostStartExec {
  command: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecContainersItemLifecyclePostStartHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringThanosRulerSpecContainersItemLifecyclePostStartHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringThanosRulerSpecContainersItemLifecyclePostStartHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringThanosRulerSpecContainersItemLifecyclePostStartTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringThanosRulerSpecContainersItemLifecyclePostStart {
  exec: MonitoringThanosRulerSpecContainersItemLifecyclePostStartExec | undefined
  httpGet: MonitoringThanosRulerSpecContainersItemLifecyclePostStartHttpGet | undefined
  tcpSocket: MonitoringThanosRulerSpecContainersItemLifecyclePostStartTcpSocket | undefined
}
export interface MonitoringThanosRulerSpecContainersItemLifecyclePreStopExec {
  command: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecContainersItemLifecyclePreStopHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringThanosRulerSpecContainersItemLifecyclePreStopHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringThanosRulerSpecContainersItemLifecyclePreStopHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringThanosRulerSpecContainersItemLifecyclePreStopTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringThanosRulerSpecContainersItemLifecyclePreStop {
  exec: MonitoringThanosRulerSpecContainersItemLifecyclePreStopExec | undefined
  httpGet: MonitoringThanosRulerSpecContainersItemLifecyclePreStopHttpGet | undefined
  tcpSocket: MonitoringThanosRulerSpecContainersItemLifecyclePreStopTcpSocket | undefined
}
export interface MonitoringThanosRulerSpecContainersItemLifecycle {
  postStart: MonitoringThanosRulerSpecContainersItemLifecyclePostStart | undefined
  preStop: MonitoringThanosRulerSpecContainersItemLifecyclePreStop | undefined
}
export interface MonitoringThanosRulerSpecContainersItemLivenessProbeExec {
  command: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecContainersItemLivenessProbeGrpc {
  port: number
  service: string | undefined
}
export interface MonitoringThanosRulerSpecContainersItemLivenessProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringThanosRulerSpecContainersItemLivenessProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringThanosRulerSpecContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringThanosRulerSpecContainersItemLivenessProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringThanosRulerSpecContainersItemLivenessProbe {
  exec: MonitoringThanosRulerSpecContainersItemLivenessProbeExec | undefined
  failureThreshold: number | undefined
  grpc: MonitoringThanosRulerSpecContainersItemLivenessProbeGrpc | undefined
  httpGet: MonitoringThanosRulerSpecContainersItemLivenessProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: MonitoringThanosRulerSpecContainersItemLivenessProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface MonitoringThanosRulerSpecContainersItemPortsItem {
  containerPort: number
  hostIP: string | undefined
  hostPort: number | undefined
  name: string | undefined
  protocol: string | undefined
}
export interface MonitoringThanosRulerSpecContainersItemReadinessProbeExec {
  command: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecContainersItemReadinessProbeGrpc {
  port: number
  service: string | undefined
}
export interface MonitoringThanosRulerSpecContainersItemReadinessProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringThanosRulerSpecContainersItemReadinessProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringThanosRulerSpecContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringThanosRulerSpecContainersItemReadinessProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringThanosRulerSpecContainersItemReadinessProbe {
  exec: MonitoringThanosRulerSpecContainersItemReadinessProbeExec | undefined
  failureThreshold: number | undefined
  grpc: MonitoringThanosRulerSpecContainersItemReadinessProbeGrpc | undefined
  httpGet: MonitoringThanosRulerSpecContainersItemReadinessProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: MonitoringThanosRulerSpecContainersItemReadinessProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface MonitoringThanosRulerSpecContainersItemResizePolicyItem {
  resourceName: string
  restartPolicy: string
}
export interface MonitoringThanosRulerSpecContainersItemResourcesClaimsItem {
  name: string
}
export interface MonitoringThanosRulerSpecContainersItemResourcesLimits {
}
export interface MonitoringThanosRulerSpecContainersItemResourcesRequests {
}
export interface MonitoringThanosRulerSpecContainersItemResources {
  claims: Array<MonitoringThanosRulerSpecContainersItemResourcesClaimsItem> | undefined
  limits: MonitoringThanosRulerSpecContainersItemResourcesLimits | undefined
  requests: MonitoringThanosRulerSpecContainersItemResourcesRequests | undefined
}
export interface MonitoringThanosRulerSpecContainersItemSecurityContextCapabilities {
  add: Array<string> | undefined
  drop: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecContainersItemSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface MonitoringThanosRulerSpecContainersItemSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface MonitoringThanosRulerSpecContainersItemSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface MonitoringThanosRulerSpecContainersItemSecurityContext {
  allowPrivilegeEscalation: boolean | undefined
  capabilities: MonitoringThanosRulerSpecContainersItemSecurityContextCapabilities | undefined
  privileged: boolean | undefined
  procMount: string | undefined
  readOnlyRootFilesystem: boolean | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: MonitoringThanosRulerSpecContainersItemSecurityContextSeLinuxOptions | undefined
  seccompProfile: MonitoringThanosRulerSpecContainersItemSecurityContextSeccompProfile | undefined
  windowsOptions: MonitoringThanosRulerSpecContainersItemSecurityContextWindowsOptions | undefined
}
export interface MonitoringThanosRulerSpecContainersItemStartupProbeExec {
  command: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecContainersItemStartupProbeGrpc {
  port: number
  service: string | undefined
}
export interface MonitoringThanosRulerSpecContainersItemStartupProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringThanosRulerSpecContainersItemStartupProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringThanosRulerSpecContainersItemStartupProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringThanosRulerSpecContainersItemStartupProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringThanosRulerSpecContainersItemStartupProbe {
  exec: MonitoringThanosRulerSpecContainersItemStartupProbeExec | undefined
  failureThreshold: number | undefined
  grpc: MonitoringThanosRulerSpecContainersItemStartupProbeGrpc | undefined
  httpGet: MonitoringThanosRulerSpecContainersItemStartupProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: MonitoringThanosRulerSpecContainersItemStartupProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface MonitoringThanosRulerSpecContainersItemVolumeDevicesItem {
  devicePath: string
  name: string
}
export interface MonitoringThanosRulerSpecContainersItemVolumeMountsItem {
  mountPath: string
  mountPropagation: string | undefined
  name: string
  readOnly: boolean | undefined
  subPath: string | undefined
  subPathExpr: string | undefined
}
export interface MonitoringThanosRulerSpecContainersItem {
  args: Array<string> | undefined
  command: Array<string> | undefined
  env: Array<MonitoringThanosRulerSpecContainersItemEnvItem> | undefined
  envFrom: Array<MonitoringThanosRulerSpecContainersItemEnvFromItem> | undefined
  image: string | undefined
  imagePullPolicy: string | undefined
  lifecycle: MonitoringThanosRulerSpecContainersItemLifecycle | undefined
  livenessProbe: MonitoringThanosRulerSpecContainersItemLivenessProbe | undefined
  name: string
  ports: Array<MonitoringThanosRulerSpecContainersItemPortsItem> | undefined
  readinessProbe: MonitoringThanosRulerSpecContainersItemReadinessProbe | undefined
  resizePolicy: Array<MonitoringThanosRulerSpecContainersItemResizePolicyItem> | undefined
  resources: MonitoringThanosRulerSpecContainersItemResources | undefined
  securityContext: MonitoringThanosRulerSpecContainersItemSecurityContext | undefined
  startupProbe: MonitoringThanosRulerSpecContainersItemStartupProbe | undefined
  stdin: boolean | undefined
  stdinOnce: boolean | undefined
  terminationMessagePath: string | undefined
  terminationMessagePolicy: string | undefined
  tty: boolean | undefined
  volumeDevices: Array<MonitoringThanosRulerSpecContainersItemVolumeDevicesItem> | undefined
  volumeMounts: Array<MonitoringThanosRulerSpecContainersItemVolumeMountsItem> | undefined
  workingDir: string | undefined
}
export interface MonitoringThanosRulerSpecExcludedFromEnforcementItem {
  group: string | undefined
  name: string | undefined
  namespace: string
  resource: string
}
export interface MonitoringThanosRulerSpecGrpcServerTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecGrpcServerTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecGrpcServerTlsConfigCa {
  configMap: MonitoringThanosRulerSpecGrpcServerTlsConfigCaConfigMap | undefined
  secret: MonitoringThanosRulerSpecGrpcServerTlsConfigCaSecret | undefined
}
export interface MonitoringThanosRulerSpecGrpcServerTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecGrpcServerTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecGrpcServerTlsConfigCert {
  configMap: MonitoringThanosRulerSpecGrpcServerTlsConfigCertConfigMap | undefined
  secret: MonitoringThanosRulerSpecGrpcServerTlsConfigCertSecret | undefined
}
export interface MonitoringThanosRulerSpecGrpcServerTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecGrpcServerTlsConfig {
  ca: MonitoringThanosRulerSpecGrpcServerTlsConfigCa | undefined
  caFile: string | undefined
  cert: MonitoringThanosRulerSpecGrpcServerTlsConfigCert | undefined
  certFile: string | undefined
  insecureSkipVerify: boolean | undefined
  keyFile: string | undefined
  keySecret: MonitoringThanosRulerSpecGrpcServerTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringThanosRulerSpecHostAliasesItem {
  hostnames: Array<string>
  ip: string
}
export interface MonitoringThanosRulerSpecImagePullSecretsItem {
  name: string | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemEnvItemValueFromConfigMapKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemEnvItemValueFromFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface MonitoringThanosRulerSpecInitContainersItemEnvItemValueFromResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface MonitoringThanosRulerSpecInitContainersItemEnvItemValueFromSecretKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemEnvItemValueFrom {
  configMapKeyRef: MonitoringThanosRulerSpecInitContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  fieldRef: MonitoringThanosRulerSpecInitContainersItemEnvItemValueFromFieldRef | undefined
  resourceFieldRef: MonitoringThanosRulerSpecInitContainersItemEnvItemValueFromResourceFieldRef | undefined
  secretKeyRef: MonitoringThanosRulerSpecInitContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemEnvItem {
  name: string
  value: string | undefined
  valueFrom: MonitoringThanosRulerSpecInitContainersItemEnvItemValueFrom | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemEnvFromItem {
  configMapRef: MonitoringThanosRulerSpecInitContainersItemEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: MonitoringThanosRulerSpecInitContainersItemEnvFromItemSecretRef | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemLifecyclePostStartExec {
  command: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemLifecyclePostStartHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringThanosRulerSpecInitContainersItemLifecyclePostStartHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringThanosRulerSpecInitContainersItemLifecyclePostStartHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemLifecyclePostStartTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringThanosRulerSpecInitContainersItemLifecyclePostStart {
  exec: MonitoringThanosRulerSpecInitContainersItemLifecyclePostStartExec | undefined
  httpGet: MonitoringThanosRulerSpecInitContainersItemLifecyclePostStartHttpGet | undefined
  tcpSocket: MonitoringThanosRulerSpecInitContainersItemLifecyclePostStartTcpSocket | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemLifecyclePreStopExec {
  command: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemLifecyclePreStopHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringThanosRulerSpecInitContainersItemLifecyclePreStopHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringThanosRulerSpecInitContainersItemLifecyclePreStopHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemLifecyclePreStopTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringThanosRulerSpecInitContainersItemLifecyclePreStop {
  exec: MonitoringThanosRulerSpecInitContainersItemLifecyclePreStopExec | undefined
  httpGet: MonitoringThanosRulerSpecInitContainersItemLifecyclePreStopHttpGet | undefined
  tcpSocket: MonitoringThanosRulerSpecInitContainersItemLifecyclePreStopTcpSocket | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemLifecycle {
  postStart: MonitoringThanosRulerSpecInitContainersItemLifecyclePostStart | undefined
  preStop: MonitoringThanosRulerSpecInitContainersItemLifecyclePreStop | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemLivenessProbeExec {
  command: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemLivenessProbeGrpc {
  port: number
  service: string | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemLivenessProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringThanosRulerSpecInitContainersItemLivenessProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringThanosRulerSpecInitContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemLivenessProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringThanosRulerSpecInitContainersItemLivenessProbe {
  exec: MonitoringThanosRulerSpecInitContainersItemLivenessProbeExec | undefined
  failureThreshold: number | undefined
  grpc: MonitoringThanosRulerSpecInitContainersItemLivenessProbeGrpc | undefined
  httpGet: MonitoringThanosRulerSpecInitContainersItemLivenessProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: MonitoringThanosRulerSpecInitContainersItemLivenessProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemPortsItem {
  containerPort: number
  hostIP: string | undefined
  hostPort: number | undefined
  name: string | undefined
  protocol: string | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemReadinessProbeExec {
  command: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemReadinessProbeGrpc {
  port: number
  service: string | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemReadinessProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringThanosRulerSpecInitContainersItemReadinessProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringThanosRulerSpecInitContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemReadinessProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringThanosRulerSpecInitContainersItemReadinessProbe {
  exec: MonitoringThanosRulerSpecInitContainersItemReadinessProbeExec | undefined
  failureThreshold: number | undefined
  grpc: MonitoringThanosRulerSpecInitContainersItemReadinessProbeGrpc | undefined
  httpGet: MonitoringThanosRulerSpecInitContainersItemReadinessProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: MonitoringThanosRulerSpecInitContainersItemReadinessProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemResizePolicyItem {
  resourceName: string
  restartPolicy: string
}
export interface MonitoringThanosRulerSpecInitContainersItemResourcesClaimsItem {
  name: string
}
export interface MonitoringThanosRulerSpecInitContainersItemResourcesLimits {
}
export interface MonitoringThanosRulerSpecInitContainersItemResourcesRequests {
}
export interface MonitoringThanosRulerSpecInitContainersItemResources {
  claims: Array<MonitoringThanosRulerSpecInitContainersItemResourcesClaimsItem> | undefined
  limits: MonitoringThanosRulerSpecInitContainersItemResourcesLimits | undefined
  requests: MonitoringThanosRulerSpecInitContainersItemResourcesRequests | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemSecurityContextCapabilities {
  add: Array<string> | undefined
  drop: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface MonitoringThanosRulerSpecInitContainersItemSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemSecurityContext {
  allowPrivilegeEscalation: boolean | undefined
  capabilities: MonitoringThanosRulerSpecInitContainersItemSecurityContextCapabilities | undefined
  privileged: boolean | undefined
  procMount: string | undefined
  readOnlyRootFilesystem: boolean | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: MonitoringThanosRulerSpecInitContainersItemSecurityContextSeLinuxOptions | undefined
  seccompProfile: MonitoringThanosRulerSpecInitContainersItemSecurityContextSeccompProfile | undefined
  windowsOptions: MonitoringThanosRulerSpecInitContainersItemSecurityContextWindowsOptions | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemStartupProbeExec {
  command: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemStartupProbeGrpc {
  port: number
  service: string | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemStartupProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringThanosRulerSpecInitContainersItemStartupProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringThanosRulerSpecInitContainersItemStartupProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemStartupProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringThanosRulerSpecInitContainersItemStartupProbe {
  exec: MonitoringThanosRulerSpecInitContainersItemStartupProbeExec | undefined
  failureThreshold: number | undefined
  grpc: MonitoringThanosRulerSpecInitContainersItemStartupProbeGrpc | undefined
  httpGet: MonitoringThanosRulerSpecInitContainersItemStartupProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: MonitoringThanosRulerSpecInitContainersItemStartupProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItemVolumeDevicesItem {
  devicePath: string
  name: string
}
export interface MonitoringThanosRulerSpecInitContainersItemVolumeMountsItem {
  mountPath: string
  mountPropagation: string | undefined
  name: string
  readOnly: boolean | undefined
  subPath: string | undefined
  subPathExpr: string | undefined
}
export interface MonitoringThanosRulerSpecInitContainersItem {
  args: Array<string> | undefined
  command: Array<string> | undefined
  env: Array<MonitoringThanosRulerSpecInitContainersItemEnvItem> | undefined
  envFrom: Array<MonitoringThanosRulerSpecInitContainersItemEnvFromItem> | undefined
  image: string | undefined
  imagePullPolicy: string | undefined
  lifecycle: MonitoringThanosRulerSpecInitContainersItemLifecycle | undefined
  livenessProbe: MonitoringThanosRulerSpecInitContainersItemLivenessProbe | undefined
  name: string
  ports: Array<MonitoringThanosRulerSpecInitContainersItemPortsItem> | undefined
  readinessProbe: MonitoringThanosRulerSpecInitContainersItemReadinessProbe | undefined
  resizePolicy: Array<MonitoringThanosRulerSpecInitContainersItemResizePolicyItem> | undefined
  resources: MonitoringThanosRulerSpecInitContainersItemResources | undefined
  securityContext: MonitoringThanosRulerSpecInitContainersItemSecurityContext | undefined
  startupProbe: MonitoringThanosRulerSpecInitContainersItemStartupProbe | undefined
  stdin: boolean | undefined
  stdinOnce: boolean | undefined
  terminationMessagePath: string | undefined
  terminationMessagePolicy: string | undefined
  tty: boolean | undefined
  volumeDevices: Array<MonitoringThanosRulerSpecInitContainersItemVolumeDevicesItem> | undefined
  volumeMounts: Array<MonitoringThanosRulerSpecInitContainersItemVolumeMountsItem> | undefined
  workingDir: string | undefined
}
export interface MonitoringThanosRulerSpecLabels {
}
export interface MonitoringThanosRulerSpecNodeSelector {
}
export interface MonitoringThanosRulerSpecObjectStorageConfig {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecPodMetadataAnnotations {
}
export interface MonitoringThanosRulerSpecPodMetadataLabels {
}
export interface MonitoringThanosRulerSpecPodMetadata {
  annotations: MonitoringThanosRulerSpecPodMetadataAnnotations | undefined
  labels: MonitoringThanosRulerSpecPodMetadataLabels | undefined
  name: string | undefined
}
export interface MonitoringThanosRulerSpecPrometheusRulesExcludedFromEnforceItem {
  ruleName: string
  ruleNamespace: string
}
export interface MonitoringThanosRulerSpecQueryConfig {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecResourcesClaimsItem {
  name: string
}
export interface MonitoringThanosRulerSpecResourcesLimits {
}
export interface MonitoringThanosRulerSpecResourcesRequests {
}
export interface MonitoringThanosRulerSpecResources {
  claims: Array<MonitoringThanosRulerSpecResourcesClaimsItem> | undefined
  limits: MonitoringThanosRulerSpecResourcesLimits | undefined
  requests: MonitoringThanosRulerSpecResourcesRequests | undefined
}
export interface MonitoringThanosRulerSpecRuleNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecRuleNamespaceSelectorMatchLabels {
}
export interface MonitoringThanosRulerSpecRuleNamespaceSelector {
  matchExpressions: Array<MonitoringThanosRulerSpecRuleNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringThanosRulerSpecRuleNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringThanosRulerSpecRuleSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecRuleSelectorMatchLabels {
}
export interface MonitoringThanosRulerSpecRuleSelector {
  matchExpressions: Array<MonitoringThanosRulerSpecRuleSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringThanosRulerSpecRuleSelectorMatchLabels | undefined
}
export interface MonitoringThanosRulerSpecSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface MonitoringThanosRulerSpecSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface MonitoringThanosRulerSpecSecurityContextSysctlsItem {
  name: string
  value: string
}
export interface MonitoringThanosRulerSpecSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface MonitoringThanosRulerSpecSecurityContext {
  fsGroup: number | undefined
  fsGroupChangePolicy: string | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: MonitoringThanosRulerSpecSecurityContextSeLinuxOptions | undefined
  seccompProfile: MonitoringThanosRulerSpecSecurityContextSeccompProfile | undefined
  supplementalGroups: Array<number> | undefined
  sysctls: Array<MonitoringThanosRulerSpecSecurityContextSysctlsItem> | undefined
  windowsOptions: MonitoringThanosRulerSpecSecurityContextWindowsOptions | undefined
}
export interface MonitoringThanosRulerSpecStorageEmptyDir {
  medium: string | undefined
  sizeLimit: object | undefined
}
export interface MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateMetadata {
}
export interface MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecDataSource {
  apiGroup: string | undefined
  kind: string
  name: string
}
export interface MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecDataSourceRef {
  apiGroup: string | undefined
  kind: string
  name: string
  namespace: string | undefined
}
export interface MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecResourcesClaimsItem {
  name: string
}
export interface MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecResources {
  claims: Array<MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  limits: MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  requests: MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecSelector {
  matchExpressions: Array<MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpec {
  accessModes: Array<string> | undefined
  dataSource: MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecDataSource | undefined
  dataSourceRef: MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  resources: MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecResources | undefined
  selector: MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpecSelector | undefined
  storageClassName: string | undefined
  volumeMode: string | undefined
  volumeName: string | undefined
}
export interface MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplate {
  metadata: MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateMetadata | undefined
  spec: MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplateSpec
}
export interface MonitoringThanosRulerSpecStorageEphemeral {
  volumeClaimTemplate: MonitoringThanosRulerSpecStorageEphemeralVolumeClaimTemplate | undefined
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateMetadataAnnotations {
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateMetadataLabels {
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateMetadata {
  annotations: MonitoringThanosRulerSpecStorageVolumeClaimTemplateMetadataAnnotations | undefined
  labels: MonitoringThanosRulerSpecStorageVolumeClaimTemplateMetadataLabels | undefined
  name: string | undefined
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecDataSource {
  apiGroup: string | undefined
  kind: string
  name: string
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecDataSourceRef {
  apiGroup: string | undefined
  kind: string
  name: string
  namespace: string | undefined
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecResourcesClaimsItem {
  name: string
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecResourcesLimits {
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecResourcesRequests {
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecResources {
  claims: Array<MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  limits: MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecResourcesLimits | undefined
  requests: MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecSelector {
  matchExpressions: Array<MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpec {
  accessModes: Array<string> | undefined
  dataSource: MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecDataSource | undefined
  dataSourceRef: MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecDataSourceRef | undefined
  resources: MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecResources | undefined
  selector: MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpecSelector | undefined
  storageClassName: string | undefined
  volumeMode: string | undefined
  volumeName: string | undefined
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateStatusAllocatedResources {
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateStatusCapacity {
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateStatusConditionsItem {
  lastProbeTime: string | undefined
  lastTransitionTime: string | undefined
  message: string | undefined
  reason: string | undefined
  status: string
  type: string
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplateStatus {
  accessModes: Array<string> | undefined
  allocatedResources: MonitoringThanosRulerSpecStorageVolumeClaimTemplateStatusAllocatedResources | undefined
  capacity: MonitoringThanosRulerSpecStorageVolumeClaimTemplateStatusCapacity | undefined
  conditions: Array<MonitoringThanosRulerSpecStorageVolumeClaimTemplateStatusConditionsItem> | undefined
  phase: string | undefined
  resizeStatus: string | undefined
}
export interface MonitoringThanosRulerSpecStorageVolumeClaimTemplate {
  apiVersion: string | undefined
  kind: string | undefined
  metadata: MonitoringThanosRulerSpecStorageVolumeClaimTemplateMetadata | undefined
  spec: MonitoringThanosRulerSpecStorageVolumeClaimTemplateSpec | undefined
  status: MonitoringThanosRulerSpecStorageVolumeClaimTemplateStatus | undefined
}
export interface MonitoringThanosRulerSpecStorage {
  disableMountSubPath: boolean | undefined
  emptyDir: MonitoringThanosRulerSpecStorageEmptyDir | undefined
  ephemeral: MonitoringThanosRulerSpecStorageEphemeral | undefined
  volumeClaimTemplate: MonitoringThanosRulerSpecStorageVolumeClaimTemplate | undefined
}
export interface MonitoringThanosRulerSpecTolerationsItem {
  effect: string | undefined
  key: string | undefined
  operator: string | undefined
  tolerationSeconds: number | undefined
  value: string | undefined
}
export interface MonitoringThanosRulerSpecTopologySpreadConstraintsItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecTopologySpreadConstraintsItemLabelSelectorMatchLabels {
}
export interface MonitoringThanosRulerSpecTopologySpreadConstraintsItemLabelSelector {
  matchExpressions: Array<MonitoringThanosRulerSpecTopologySpreadConstraintsItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringThanosRulerSpecTopologySpreadConstraintsItemLabelSelectorMatchLabels | undefined
}
export interface MonitoringThanosRulerSpecTopologySpreadConstraintsItem {
  labelSelector: MonitoringThanosRulerSpecTopologySpreadConstraintsItemLabelSelector | undefined
  matchLabelKeys: Array<string> | undefined
  maxSkew: number
  minDomains: number | undefined
  nodeAffinityPolicy: string | undefined
  nodeTaintsPolicy: string | undefined
  topologyKey: string
  whenUnsatisfiable: string
}
export interface MonitoringThanosRulerSpecTracingConfig {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemAwsElasticBlockStore {
  fsType: string | undefined
  partition: number | undefined
  readOnly: boolean | undefined
  volumeID: string
}
export interface MonitoringThanosRulerSpecVolumesItemAzureDisk {
  cachingMode: string | undefined
  diskName: string
  diskURI: string
  fsType: string | undefined
  kind: string | undefined
  readOnly: boolean | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemAzureFile {
  readOnly: boolean | undefined
  secretName: string
  shareName: string
}
export interface MonitoringThanosRulerSpecVolumesItemCephfsSecretRef {
  name: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemCephfs {
  monitors: Array<string>
  path: string | undefined
  readOnly: boolean | undefined
  secretFile: string | undefined
  secretRef: MonitoringThanosRulerSpecVolumesItemCephfsSecretRef | undefined
  user: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemCinderSecretRef {
  name: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemCinder {
  fsType: string | undefined
  readOnly: boolean | undefined
  secretRef: MonitoringThanosRulerSpecVolumesItemCinderSecretRef | undefined
  volumeID: string
}
export interface MonitoringThanosRulerSpecVolumesItemConfigMapItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MonitoringThanosRulerSpecVolumesItemConfigMap {
  defaultMode: number | undefined
  items: Array<MonitoringThanosRulerSpecVolumesItemConfigMapItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemCsiNodePublishSecretRef {
  name: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemCsiVolumeAttributes {
}
export interface MonitoringThanosRulerSpecVolumesItemCsi {
  driver: string
  fsType: string | undefined
  nodePublishSecretRef: MonitoringThanosRulerSpecVolumesItemCsiNodePublishSecretRef | undefined
  readOnly: boolean | undefined
  volumeAttributes: MonitoringThanosRulerSpecVolumesItemCsiVolumeAttributes | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemDownwardAPIItemsItemFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface MonitoringThanosRulerSpecVolumesItemDownwardAPIItemsItemResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface MonitoringThanosRulerSpecVolumesItemDownwardAPIItemsItem {
  fieldRef: MonitoringThanosRulerSpecVolumesItemDownwardAPIItemsItemFieldRef | undefined
  mode: number | undefined
  path: string
  resourceFieldRef: MonitoringThanosRulerSpecVolumesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemDownwardAPI {
  defaultMode: number | undefined
  items: Array<MonitoringThanosRulerSpecVolumesItemDownwardAPIItemsItem> | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemEmptyDir {
  medium: string | undefined
  sizeLimit: object | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateMetadata {
}
export interface MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSource {
  apiGroup: string | undefined
  kind: string
  name: string
}
export interface MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSourceRef {
  apiGroup: string | undefined
  kind: string
  name: string
  namespace: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesClaimsItem {
  name: string
}
export interface MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResources {
  claims: Array<MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  limits: MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  requests: MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelector {
  matchExpressions: Array<MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpec {
  accessModes: Array<string> | undefined
  dataSource: MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSource | undefined
  dataSourceRef: MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  resources: MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResources | undefined
  selector: MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelector | undefined
  storageClassName: string | undefined
  volumeMode: string | undefined
  volumeName: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplate {
  metadata: MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateMetadata | undefined
  spec: MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplateSpec
}
export interface MonitoringThanosRulerSpecVolumesItemEphemeral {
  volumeClaimTemplate: MonitoringThanosRulerSpecVolumesItemEphemeralVolumeClaimTemplate | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemFc {
  fsType: string | undefined
  lun: number | undefined
  readOnly: boolean | undefined
  targetWWNs: Array<string> | undefined
  wwids: Array<string> | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemFlexVolumeOptions {
}
export interface MonitoringThanosRulerSpecVolumesItemFlexVolumeSecretRef {
  name: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemFlexVolume {
  driver: string
  fsType: string | undefined
  options: MonitoringThanosRulerSpecVolumesItemFlexVolumeOptions | undefined
  readOnly: boolean | undefined
  secretRef: MonitoringThanosRulerSpecVolumesItemFlexVolumeSecretRef | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemFlocker {
  datasetName: string | undefined
  datasetUUID: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemGcePersistentDisk {
  fsType: string | undefined
  partition: number | undefined
  pdName: string
  readOnly: boolean | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemGitRepo {
  directory: string | undefined
  repository: string
  revision: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemGlusterfs {
  endpoints: string
  path: string
  readOnly: boolean | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemHostPath {
  path: string
  type: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemIscsiSecretRef {
  name: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemIscsi {
  chapAuthDiscovery: boolean | undefined
  chapAuthSession: boolean | undefined
  fsType: string | undefined
  initiatorName: string | undefined
  iqn: string
  iscsiInterface: string | undefined
  lun: number
  portals: Array<string> | undefined
  readOnly: boolean | undefined
  secretRef: MonitoringThanosRulerSpecVolumesItemIscsiSecretRef | undefined
  targetPortal: string
}
export interface MonitoringThanosRulerSpecVolumesItemNfs {
  path: string
  readOnly: boolean | undefined
  server: string
}
export interface MonitoringThanosRulerSpecVolumesItemPersistentVolumeClaim {
  claimName: string
  readOnly: boolean | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemPhotonPersistentDisk {
  fsType: string | undefined
  pdID: string
}
export interface MonitoringThanosRulerSpecVolumesItemPortworxVolume {
  fsType: string | undefined
  readOnly: boolean | undefined
  volumeID: string
}
export interface MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemConfigMapItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemConfigMap {
  items: Array<MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemConfigMapItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItem {
  fieldRef: MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemFieldRef | undefined
  mode: number | undefined
  path: string
  resourceFieldRef: MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemDownwardAPI {
  items: Array<MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItem> | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemSecretItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemSecret {
  items: Array<MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemSecretItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemServiceAccountToken {
  audience: string | undefined
  expirationSeconds: number | undefined
  path: string
}
export interface MonitoringThanosRulerSpecVolumesItemProjectedSourcesItem {
  configMap: MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemConfigMap | undefined
  downwardAPI: MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemDownwardAPI | undefined
  secret: MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemSecret | undefined
  serviceAccountToken: MonitoringThanosRulerSpecVolumesItemProjectedSourcesItemServiceAccountToken | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemProjected {
  defaultMode: number | undefined
  sources: Array<MonitoringThanosRulerSpecVolumesItemProjectedSourcesItem> | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemQuobyte {
  group: string | undefined
  readOnly: boolean | undefined
  registry: string
  tenant: string | undefined
  user: string | undefined
  volume: string
}
export interface MonitoringThanosRulerSpecVolumesItemRbdSecretRef {
  name: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemRbd {
  fsType: string | undefined
  image: string
  keyring: string | undefined
  monitors: Array<string>
  pool: string | undefined
  readOnly: boolean | undefined
  secretRef: MonitoringThanosRulerSpecVolumesItemRbdSecretRef | undefined
  user: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemScaleIOSecretRef {
  name: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemScaleIO {
  fsType: string | undefined
  gateway: string
  protectionDomain: string | undefined
  readOnly: boolean | undefined
  secretRef: MonitoringThanosRulerSpecVolumesItemScaleIOSecretRef
  sslEnabled: boolean | undefined
  storageMode: string | undefined
  storagePool: string | undefined
  system: string
  volumeName: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemSecretItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MonitoringThanosRulerSpecVolumesItemSecret {
  defaultMode: number | undefined
  items: Array<MonitoringThanosRulerSpecVolumesItemSecretItemsItem> | undefined
  optional: boolean | undefined
  secretName: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemStorageosSecretRef {
  name: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemStorageos {
  fsType: string | undefined
  readOnly: boolean | undefined
  secretRef: MonitoringThanosRulerSpecVolumesItemStorageosSecretRef | undefined
  volumeName: string | undefined
  volumeNamespace: string | undefined
}
export interface MonitoringThanosRulerSpecVolumesItemVsphereVolume {
  fsType: string | undefined
  storagePolicyID: string | undefined
  storagePolicyName: string | undefined
  volumePath: string
}
export interface MonitoringThanosRulerSpecVolumesItem {
  awsElasticBlockStore: MonitoringThanosRulerSpecVolumesItemAwsElasticBlockStore | undefined
  azureDisk: MonitoringThanosRulerSpecVolumesItemAzureDisk | undefined
  azureFile: MonitoringThanosRulerSpecVolumesItemAzureFile | undefined
  cephfs: MonitoringThanosRulerSpecVolumesItemCephfs | undefined
  cinder: MonitoringThanosRulerSpecVolumesItemCinder | undefined
  configMap: MonitoringThanosRulerSpecVolumesItemConfigMap | undefined
  csi: MonitoringThanosRulerSpecVolumesItemCsi | undefined
  downwardAPI: MonitoringThanosRulerSpecVolumesItemDownwardAPI | undefined
  emptyDir: MonitoringThanosRulerSpecVolumesItemEmptyDir | undefined
  ephemeral: MonitoringThanosRulerSpecVolumesItemEphemeral | undefined
  fc: MonitoringThanosRulerSpecVolumesItemFc | undefined
  flexVolume: MonitoringThanosRulerSpecVolumesItemFlexVolume | undefined
  flocker: MonitoringThanosRulerSpecVolumesItemFlocker | undefined
  gcePersistentDisk: MonitoringThanosRulerSpecVolumesItemGcePersistentDisk | undefined
  gitRepo: MonitoringThanosRulerSpecVolumesItemGitRepo | undefined
  glusterfs: MonitoringThanosRulerSpecVolumesItemGlusterfs | undefined
  hostPath: MonitoringThanosRulerSpecVolumesItemHostPath | undefined
  iscsi: MonitoringThanosRulerSpecVolumesItemIscsi | undefined
  name: string
  nfs: MonitoringThanosRulerSpecVolumesItemNfs | undefined
  persistentVolumeClaim: MonitoringThanosRulerSpecVolumesItemPersistentVolumeClaim | undefined
  photonPersistentDisk: MonitoringThanosRulerSpecVolumesItemPhotonPersistentDisk | undefined
  portworxVolume: MonitoringThanosRulerSpecVolumesItemPortworxVolume | undefined
  projected: MonitoringThanosRulerSpecVolumesItemProjected | undefined
  quobyte: MonitoringThanosRulerSpecVolumesItemQuobyte | undefined
  rbd: MonitoringThanosRulerSpecVolumesItemRbd | undefined
  scaleIO: MonitoringThanosRulerSpecVolumesItemScaleIO | undefined
  secret: MonitoringThanosRulerSpecVolumesItemSecret | undefined
  storageos: MonitoringThanosRulerSpecVolumesItemStorageos | undefined
  vsphereVolume: MonitoringThanosRulerSpecVolumesItemVsphereVolume | undefined
}
export interface MonitoringThanosRulerSpec {
  additionalArgs: Array<MonitoringThanosRulerSpecAdditionalArgsItem> | undefined
  affinity: MonitoringThanosRulerSpecAffinity | undefined
  alertDropLabels: Array<string> | undefined
  alertQueryUrl: string | undefined
  alertRelabelConfigFile: string | undefined
  alertRelabelConfigs: MonitoringThanosRulerSpecAlertRelabelConfigs | undefined
  alertmanagersConfig: MonitoringThanosRulerSpecAlertmanagersConfig | undefined
  alertmanagersUrl: Array<string> | undefined
  containers: Array<MonitoringThanosRulerSpecContainersItem> | undefined
  enforcedNamespaceLabel: string | undefined
  evaluationInterval: string | undefined
  excludedFromEnforcement: Array<MonitoringThanosRulerSpecExcludedFromEnforcementItem> | undefined
  externalPrefix: string | undefined
  grpcServerTlsConfig: MonitoringThanosRulerSpecGrpcServerTlsConfig | undefined
  hostAliases: Array<MonitoringThanosRulerSpecHostAliasesItem> | undefined
  image: string | undefined
  imagePullPolicy: string | undefined
  imagePullSecrets: Array<MonitoringThanosRulerSpecImagePullSecretsItem> | undefined
  initContainers: Array<MonitoringThanosRulerSpecInitContainersItem> | undefined
  labels: MonitoringThanosRulerSpecLabels | undefined
  listenLocal: boolean | undefined
  logFormat: string | undefined
  logLevel: string | undefined
  minReadySeconds: number | undefined
  nodeSelector: MonitoringThanosRulerSpecNodeSelector | undefined
  objectStorageConfig: MonitoringThanosRulerSpecObjectStorageConfig | undefined
  objectStorageConfigFile: string | undefined
  paused: boolean | undefined
  podMetadata: MonitoringThanosRulerSpecPodMetadata | undefined
  portName: string | undefined
  priorityClassName: string | undefined
  prometheusRulesExcludedFromEnforce: Array<MonitoringThanosRulerSpecPrometheusRulesExcludedFromEnforceItem> | undefined
  queryConfig: MonitoringThanosRulerSpecQueryConfig | undefined
  queryEndpoints: Array<string> | undefined
  replicas: number | undefined
  resources: MonitoringThanosRulerSpecResources | undefined
  retention: string | undefined
  routePrefix: string | undefined
  ruleNamespaceSelector: MonitoringThanosRulerSpecRuleNamespaceSelector | undefined
  ruleSelector: MonitoringThanosRulerSpecRuleSelector | undefined
  securityContext: MonitoringThanosRulerSpecSecurityContext | undefined
  serviceAccountName: string | undefined
  storage: MonitoringThanosRulerSpecStorage | undefined
  tolerations: Array<MonitoringThanosRulerSpecTolerationsItem> | undefined
  topologySpreadConstraints: Array<MonitoringThanosRulerSpecTopologySpreadConstraintsItem> | undefined
  tracingConfig: MonitoringThanosRulerSpecTracingConfig | undefined
  tracingConfigFile: string | undefined
  version: string | undefined
  volumes: Array<MonitoringThanosRulerSpecVolumesItem> | undefined
}
export interface MonitoringThanosRuler extends KubernetesObject {
  spec: MonitoringThanosRulerSpec
  status: MonitoringThanosRulerStatus | undefined
}
export type MonitoringThanosRulerList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MonitoringThanosRuler>
