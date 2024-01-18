type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface PostgresqlPoolerStatusSecretsClientCA {
  name: string | undefined
  version: string | undefined
}
export interface PostgresqlPoolerStatusSecretsPgBouncerSecretsAuthQuery {
  name: string | undefined
  version: string | undefined
}
export interface PostgresqlPoolerStatusSecretsPgBouncerSecrets {
  authQuery: PostgresqlPoolerStatusSecretsPgBouncerSecretsAuthQuery | undefined
}
export interface PostgresqlPoolerStatusSecretsServerCA {
  name: string | undefined
  version: string | undefined
}
export interface PostgresqlPoolerStatusSecretsServerTLS {
  name: string | undefined
  version: string | undefined
}
export interface PostgresqlPoolerStatusSecrets {
  clientCA: PostgresqlPoolerStatusSecretsClientCA | undefined
  pgBouncerSecrets: PostgresqlPoolerStatusSecretsPgBouncerSecrets | undefined
  serverCA: PostgresqlPoolerStatusSecretsServerCA | undefined
  serverTLS: PostgresqlPoolerStatusSecretsServerTLS | undefined
}
export interface PostgresqlPoolerStatus {
  instances: number | undefined
  secrets: PostgresqlPoolerStatusSecrets | undefined
}
export interface PostgresqlPoolerSpecCluster {
  name: string
}
export interface PostgresqlPoolerSpecDeploymentStrategyRollingUpdate {
  maxSurge: object | undefined
  maxUnavailable: object | undefined
}
export interface PostgresqlPoolerSpecDeploymentStrategy {
  rollingUpdate: PostgresqlPoolerSpecDeploymentStrategyRollingUpdate | undefined
  type: string | undefined
}
export interface PostgresqlPoolerSpecMonitoring {
  enablePodMonitor: boolean | undefined
}
export interface PostgresqlPoolerSpecPgbouncerAuthQuerySecret {
  name: string
}
export interface PostgresqlPoolerSpecPgbouncerParameters {
}
export interface PostgresqlPoolerSpecPgbouncer {
  authQuery: string | undefined
  authQuerySecret: PostgresqlPoolerSpecPgbouncerAuthQuerySecret | undefined
  parameters: PostgresqlPoolerSpecPgbouncerParameters | undefined
  paused: boolean | undefined
  pg_hba: Array<string> | undefined
  poolMode: string
}
export interface PostgresqlPoolerSpecTemplateMetadataAnnotations {
}
export interface PostgresqlPoolerSpecTemplateMetadataLabels {
}
export interface PostgresqlPoolerSpecTemplateMetadata {
  annotations: PostgresqlPoolerSpecTemplateMetadataAnnotations | undefined
  labels: PostgresqlPoolerSpecTemplateMetadataLabels | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  matchExpressions: Array<PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  matchFields: Array<PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  preference: PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  weight: number
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  matchExpressions: Array<PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  matchFields: Array<PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  nodeSelectorTerms: Array<PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  matchExpressions: Array<PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  matchExpressions: Array<PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  labelSelector: PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  namespaceSelector: PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  podAffinityTerm: PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  weight: number
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  matchExpressions: Array<PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  matchExpressions: Array<PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  labelSelector: PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  namespaceSelector: PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: Array<PostgresqlPoolerSpecTemplateSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  matchExpressions: Array<PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  matchExpressions: Array<PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  labelSelector: PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  namespaceSelector: PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  podAffinityTerm: PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  weight: number
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  matchExpressions: Array<PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  matchExpressions: Array<PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  labelSelector: PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  namespaceSelector: PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: Array<PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecAffinity {
  nodeAffinity: PostgresqlPoolerSpecTemplateSpecAffinityNodeAffinity | undefined
  podAffinity: PostgresqlPoolerSpecTemplateSpecAffinityPodAffinity | undefined
  podAntiAffinity: PostgresqlPoolerSpecTemplateSpecAffinityPodAntiAffinity | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemEnvItemValueFromConfigMapKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemEnvItemValueFromFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemEnvItemValueFromResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemEnvItemValueFromSecretKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemEnvItemValueFrom {
  configMapKeyRef: PostgresqlPoolerSpecTemplateSpecContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  fieldRef: PostgresqlPoolerSpecTemplateSpecContainersItemEnvItemValueFromFieldRef | undefined
  resourceFieldRef: PostgresqlPoolerSpecTemplateSpecContainersItemEnvItemValueFromResourceFieldRef | undefined
  secretKeyRef: PostgresqlPoolerSpecTemplateSpecContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemEnvItem {
  name: string
  value: string | undefined
  valueFrom: PostgresqlPoolerSpecTemplateSpecContainersItemEnvItemValueFrom | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemEnvFromItem {
  configMapRef: PostgresqlPoolerSpecTemplateSpecContainersItemEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: PostgresqlPoolerSpecTemplateSpecContainersItemEnvFromItemSecretRef | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePostStartExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePostStartHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePostStartHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePostStartHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePostStartTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePostStart {
  exec: PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePostStartExec | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePostStartHttpGet | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePostStartTcpSocket | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePreStopExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePreStopHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePreStopHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePreStopHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePreStopTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePreStop {
  exec: PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePreStopExec | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePreStopHttpGet | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePreStopTcpSocket | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLifecycle {
  postStart: PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePostStart | undefined
  preStop: PostgresqlPoolerSpecTemplateSpecContainersItemLifecyclePreStop | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLivenessProbeExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLivenessProbeGrpc {
  port: number
  service: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLivenessProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLivenessProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLivenessProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemLivenessProbe {
  exec: PostgresqlPoolerSpecTemplateSpecContainersItemLivenessProbeExec | undefined
  failureThreshold: number | undefined
  grpc: PostgresqlPoolerSpecTemplateSpecContainersItemLivenessProbeGrpc | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecContainersItemLivenessProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecContainersItemLivenessProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemPortsItem {
  containerPort: number
  hostIP: string | undefined
  hostPort: number | undefined
  name: string | undefined
  protocol: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemReadinessProbeExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemReadinessProbeGrpc {
  port: number
  service: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemReadinessProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemReadinessProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemReadinessProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemReadinessProbe {
  exec: PostgresqlPoolerSpecTemplateSpecContainersItemReadinessProbeExec | undefined
  failureThreshold: number | undefined
  grpc: PostgresqlPoolerSpecTemplateSpecContainersItemReadinessProbeGrpc | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecContainersItemReadinessProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecContainersItemReadinessProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemResizePolicyItem {
  resourceName: string
  restartPolicy: string
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemResourcesClaimsItem {
  name: string
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemResourcesLimits {
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemResourcesRequests {
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemResources {
  claims: Array<PostgresqlPoolerSpecTemplateSpecContainersItemResourcesClaimsItem> | undefined
  limits: PostgresqlPoolerSpecTemplateSpecContainersItemResourcesLimits | undefined
  requests: PostgresqlPoolerSpecTemplateSpecContainersItemResourcesRequests | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemSecurityContextCapabilities {
  add: Array<string> | undefined
  drop: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemSecurityContext {
  allowPrivilegeEscalation: boolean | undefined
  capabilities: PostgresqlPoolerSpecTemplateSpecContainersItemSecurityContextCapabilities | undefined
  privileged: boolean | undefined
  procMount: string | undefined
  readOnlyRootFilesystem: boolean | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: PostgresqlPoolerSpecTemplateSpecContainersItemSecurityContextSeLinuxOptions | undefined
  seccompProfile: PostgresqlPoolerSpecTemplateSpecContainersItemSecurityContextSeccompProfile | undefined
  windowsOptions: PostgresqlPoolerSpecTemplateSpecContainersItemSecurityContextWindowsOptions | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemStartupProbeExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemStartupProbeGrpc {
  port: number
  service: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemStartupProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemStartupProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecContainersItemStartupProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemStartupProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemStartupProbe {
  exec: PostgresqlPoolerSpecTemplateSpecContainersItemStartupProbeExec | undefined
  failureThreshold: number | undefined
  grpc: PostgresqlPoolerSpecTemplateSpecContainersItemStartupProbeGrpc | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecContainersItemStartupProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecContainersItemStartupProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemVolumeDevicesItem {
  devicePath: string
  name: string
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItemVolumeMountsItem {
  mountPath: string
  mountPropagation: string | undefined
  name: string
  readOnly: boolean | undefined
  subPath: string | undefined
  subPathExpr: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecContainersItem {
  args: Array<string> | undefined
  command: Array<string> | undefined
  env: Array<PostgresqlPoolerSpecTemplateSpecContainersItemEnvItem> | undefined
  envFrom: Array<PostgresqlPoolerSpecTemplateSpecContainersItemEnvFromItem> | undefined
  image: string | undefined
  imagePullPolicy: string | undefined
  lifecycle: PostgresqlPoolerSpecTemplateSpecContainersItemLifecycle | undefined
  livenessProbe: PostgresqlPoolerSpecTemplateSpecContainersItemLivenessProbe | undefined
  name: string
  ports: Array<PostgresqlPoolerSpecTemplateSpecContainersItemPortsItem> | undefined
  readinessProbe: PostgresqlPoolerSpecTemplateSpecContainersItemReadinessProbe | undefined
  resizePolicy: Array<PostgresqlPoolerSpecTemplateSpecContainersItemResizePolicyItem> | undefined
  resources: PostgresqlPoolerSpecTemplateSpecContainersItemResources | undefined
  securityContext: PostgresqlPoolerSpecTemplateSpecContainersItemSecurityContext | undefined
  startupProbe: PostgresqlPoolerSpecTemplateSpecContainersItemStartupProbe | undefined
  stdin: boolean | undefined
  stdinOnce: boolean | undefined
  terminationMessagePath: string | undefined
  terminationMessagePolicy: string | undefined
  tty: boolean | undefined
  volumeDevices: Array<PostgresqlPoolerSpecTemplateSpecContainersItemVolumeDevicesItem> | undefined
  volumeMounts: Array<PostgresqlPoolerSpecTemplateSpecContainersItemVolumeMountsItem> | undefined
  workingDir: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecDnsConfigOptionsItem {
  name: string | undefined
  value: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecDnsConfig {
  nameservers: Array<string> | undefined
  options: Array<PostgresqlPoolerSpecTemplateSpecDnsConfigOptionsItem> | undefined
  searches: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvItemValueFromConfigMapKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvItemValueFromFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvItemValueFromResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvItemValueFromSecretKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvItemValueFrom {
  configMapKeyRef: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  fieldRef: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvItemValueFromFieldRef | undefined
  resourceFieldRef: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvItemValueFromResourceFieldRef | undefined
  secretKeyRef: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvItem {
  name: string
  value: string | undefined
  valueFrom: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvItemValueFrom | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvFromItem {
  configMapRef: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvFromItemSecretRef | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePostStartExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePostStartHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePostStartHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePostStartHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePostStartTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePostStart {
  exec: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePostStartExec | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePostStartHttpGet | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePostStartTcpSocket | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePreStopExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePreStopHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePreStopHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePreStopHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePreStopTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePreStop {
  exec: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePreStopExec | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePreStopHttpGet | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePreStopTcpSocket | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecycle {
  postStart: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePostStart | undefined
  preStop: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecyclePreStop | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLivenessProbeExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLivenessProbeGrpc {
  port: number
  service: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLivenessProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLivenessProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLivenessProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLivenessProbe {
  exec: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLivenessProbeExec | undefined
  failureThreshold: number | undefined
  grpc: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLivenessProbeGrpc | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLivenessProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLivenessProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemPortsItem {
  containerPort: number
  hostIP: string | undefined
  hostPort: number | undefined
  name: string | undefined
  protocol: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemReadinessProbeExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemReadinessProbeGrpc {
  port: number
  service: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemReadinessProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemReadinessProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemReadinessProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemReadinessProbe {
  exec: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemReadinessProbeExec | undefined
  failureThreshold: number | undefined
  grpc: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemReadinessProbeGrpc | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemReadinessProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemReadinessProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemResizePolicyItem {
  resourceName: string
  restartPolicy: string
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemResourcesClaimsItem {
  name: string
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemResourcesLimits {
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemResourcesRequests {
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemResources {
  claims: Array<PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemResourcesClaimsItem> | undefined
  limits: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemResourcesLimits | undefined
  requests: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemResourcesRequests | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemSecurityContextCapabilities {
  add: Array<string> | undefined
  drop: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemSecurityContext {
  allowPrivilegeEscalation: boolean | undefined
  capabilities: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemSecurityContextCapabilities | undefined
  privileged: boolean | undefined
  procMount: string | undefined
  readOnlyRootFilesystem: boolean | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemSecurityContextSeLinuxOptions | undefined
  seccompProfile: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemSecurityContextSeccompProfile | undefined
  windowsOptions: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemSecurityContextWindowsOptions | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemStartupProbeExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemStartupProbeGrpc {
  port: number
  service: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemStartupProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemStartupProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemStartupProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemStartupProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemStartupProbe {
  exec: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemStartupProbeExec | undefined
  failureThreshold: number | undefined
  grpc: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemStartupProbeGrpc | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemStartupProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemStartupProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemVolumeDevicesItem {
  devicePath: string
  name: string
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemVolumeMountsItem {
  mountPath: string
  mountPropagation: string | undefined
  name: string
  readOnly: boolean | undefined
  subPath: string | undefined
  subPathExpr: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecEphemeralContainersItem {
  args: Array<string> | undefined
  command: Array<string> | undefined
  env: Array<PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvItem> | undefined
  envFrom: Array<PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemEnvFromItem> | undefined
  image: string | undefined
  imagePullPolicy: string | undefined
  lifecycle: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLifecycle | undefined
  livenessProbe: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemLivenessProbe | undefined
  name: string
  ports: Array<PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemPortsItem> | undefined
  readinessProbe: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemReadinessProbe | undefined
  resizePolicy: Array<PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemResizePolicyItem> | undefined
  resources: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemResources | undefined
  securityContext: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemSecurityContext | undefined
  startupProbe: PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemStartupProbe | undefined
  stdin: boolean | undefined
  stdinOnce: boolean | undefined
  targetContainerName: string | undefined
  terminationMessagePath: string | undefined
  terminationMessagePolicy: string | undefined
  tty: boolean | undefined
  volumeDevices: Array<PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemVolumeDevicesItem> | undefined
  volumeMounts: Array<PostgresqlPoolerSpecTemplateSpecEphemeralContainersItemVolumeMountsItem> | undefined
  workingDir: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecHostAliasesItem {
  hostnames: Array<string> | undefined
  ip: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecImagePullSecretsItem {
  name: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvItemValueFromConfigMapKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvItemValueFromFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvItemValueFromResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvItemValueFromSecretKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvItemValueFrom {
  configMapKeyRef: PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  fieldRef: PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvItemValueFromFieldRef | undefined
  resourceFieldRef: PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvItemValueFromResourceFieldRef | undefined
  secretKeyRef: PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvItem {
  name: string
  value: string | undefined
  valueFrom: PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvItemValueFrom | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvFromItem {
  configMapRef: PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvFromItemSecretRef | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePostStartExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePostStartHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePostStartHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePostStartHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePostStartTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePostStart {
  exec: PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePostStartExec | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePostStartHttpGet | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePostStartTcpSocket | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePreStopExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePreStopHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePreStopHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePreStopHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePreStopTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePreStop {
  exec: PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePreStopExec | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePreStopHttpGet | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePreStopTcpSocket | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecycle {
  postStart: PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePostStart | undefined
  preStop: PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecyclePreStop | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLivenessProbeExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLivenessProbeGrpc {
  port: number
  service: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLivenessProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLivenessProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecInitContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLivenessProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemLivenessProbe {
  exec: PostgresqlPoolerSpecTemplateSpecInitContainersItemLivenessProbeExec | undefined
  failureThreshold: number | undefined
  grpc: PostgresqlPoolerSpecTemplateSpecInitContainersItemLivenessProbeGrpc | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecInitContainersItemLivenessProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecInitContainersItemLivenessProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemPortsItem {
  containerPort: number
  hostIP: string | undefined
  hostPort: number | undefined
  name: string | undefined
  protocol: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemReadinessProbeExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemReadinessProbeGrpc {
  port: number
  service: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemReadinessProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemReadinessProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecInitContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemReadinessProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemReadinessProbe {
  exec: PostgresqlPoolerSpecTemplateSpecInitContainersItemReadinessProbeExec | undefined
  failureThreshold: number | undefined
  grpc: PostgresqlPoolerSpecTemplateSpecInitContainersItemReadinessProbeGrpc | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecInitContainersItemReadinessProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecInitContainersItemReadinessProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemResizePolicyItem {
  resourceName: string
  restartPolicy: string
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemResourcesClaimsItem {
  name: string
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemResourcesLimits {
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemResourcesRequests {
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemResources {
  claims: Array<PostgresqlPoolerSpecTemplateSpecInitContainersItemResourcesClaimsItem> | undefined
  limits: PostgresqlPoolerSpecTemplateSpecInitContainersItemResourcesLimits | undefined
  requests: PostgresqlPoolerSpecTemplateSpecInitContainersItemResourcesRequests | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemSecurityContextCapabilities {
  add: Array<string> | undefined
  drop: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemSecurityContext {
  allowPrivilegeEscalation: boolean | undefined
  capabilities: PostgresqlPoolerSpecTemplateSpecInitContainersItemSecurityContextCapabilities | undefined
  privileged: boolean | undefined
  procMount: string | undefined
  readOnlyRootFilesystem: boolean | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: PostgresqlPoolerSpecTemplateSpecInitContainersItemSecurityContextSeLinuxOptions | undefined
  seccompProfile: PostgresqlPoolerSpecTemplateSpecInitContainersItemSecurityContextSeccompProfile | undefined
  windowsOptions: PostgresqlPoolerSpecTemplateSpecInitContainersItemSecurityContextWindowsOptions | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemStartupProbeExec {
  command: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemStartupProbeGrpc {
  port: number
  service: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemStartupProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemStartupProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<PostgresqlPoolerSpecTemplateSpecInitContainersItemStartupProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemStartupProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemStartupProbe {
  exec: PostgresqlPoolerSpecTemplateSpecInitContainersItemStartupProbeExec | undefined
  failureThreshold: number | undefined
  grpc: PostgresqlPoolerSpecTemplateSpecInitContainersItemStartupProbeGrpc | undefined
  httpGet: PostgresqlPoolerSpecTemplateSpecInitContainersItemStartupProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: PostgresqlPoolerSpecTemplateSpecInitContainersItemStartupProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemVolumeDevicesItem {
  devicePath: string
  name: string
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItemVolumeMountsItem {
  mountPath: string
  mountPropagation: string | undefined
  name: string
  readOnly: boolean | undefined
  subPath: string | undefined
  subPathExpr: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecInitContainersItem {
  args: Array<string> | undefined
  command: Array<string> | undefined
  env: Array<PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvItem> | undefined
  envFrom: Array<PostgresqlPoolerSpecTemplateSpecInitContainersItemEnvFromItem> | undefined
  image: string | undefined
  imagePullPolicy: string | undefined
  lifecycle: PostgresqlPoolerSpecTemplateSpecInitContainersItemLifecycle | undefined
  livenessProbe: PostgresqlPoolerSpecTemplateSpecInitContainersItemLivenessProbe | undefined
  name: string
  ports: Array<PostgresqlPoolerSpecTemplateSpecInitContainersItemPortsItem> | undefined
  readinessProbe: PostgresqlPoolerSpecTemplateSpecInitContainersItemReadinessProbe | undefined
  resizePolicy: Array<PostgresqlPoolerSpecTemplateSpecInitContainersItemResizePolicyItem> | undefined
  resources: PostgresqlPoolerSpecTemplateSpecInitContainersItemResources | undefined
  securityContext: PostgresqlPoolerSpecTemplateSpecInitContainersItemSecurityContext | undefined
  startupProbe: PostgresqlPoolerSpecTemplateSpecInitContainersItemStartupProbe | undefined
  stdin: boolean | undefined
  stdinOnce: boolean | undefined
  terminationMessagePath: string | undefined
  terminationMessagePolicy: string | undefined
  tty: boolean | undefined
  volumeDevices: Array<PostgresqlPoolerSpecTemplateSpecInitContainersItemVolumeDevicesItem> | undefined
  volumeMounts: Array<PostgresqlPoolerSpecTemplateSpecInitContainersItemVolumeMountsItem> | undefined
  workingDir: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecNodeSelector {
}
export interface PostgresqlPoolerSpecTemplateSpecOs {
  name: string
}
export interface PostgresqlPoolerSpecTemplateSpecOverhead {
}
export interface PostgresqlPoolerSpecTemplateSpecReadinessGatesItem {
  conditionType: string
}
export interface PostgresqlPoolerSpecTemplateSpecResourceClaimsItemSource {
  resourceClaimName: string | undefined
  resourceClaimTemplateName: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecResourceClaimsItem {
  name: string
  source: PostgresqlPoolerSpecTemplateSpecResourceClaimsItemSource | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecSchedulingGatesItem {
  name: string
}
export interface PostgresqlPoolerSpecTemplateSpecSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface PostgresqlPoolerSpecTemplateSpecSecurityContextSysctlsItem {
  name: string
  value: string
}
export interface PostgresqlPoolerSpecTemplateSpecSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecSecurityContext {
  fsGroup: number | undefined
  fsGroupChangePolicy: string | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: PostgresqlPoolerSpecTemplateSpecSecurityContextSeLinuxOptions | undefined
  seccompProfile: PostgresqlPoolerSpecTemplateSpecSecurityContextSeccompProfile | undefined
  supplementalGroups: Array<number> | undefined
  sysctls: Array<PostgresqlPoolerSpecTemplateSpecSecurityContextSysctlsItem> | undefined
  windowsOptions: PostgresqlPoolerSpecTemplateSpecSecurityContextWindowsOptions | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecTolerationsItem {
  effect: string | undefined
  key: string | undefined
  operator: string | undefined
  tolerationSeconds: number | undefined
  value: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecTopologySpreadConstraintsItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecTopologySpreadConstraintsItemLabelSelectorMatchLabels {
}
export interface PostgresqlPoolerSpecTemplateSpecTopologySpreadConstraintsItemLabelSelector {
  matchExpressions: Array<PostgresqlPoolerSpecTemplateSpecTopologySpreadConstraintsItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: PostgresqlPoolerSpecTemplateSpecTopologySpreadConstraintsItemLabelSelectorMatchLabels | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecTopologySpreadConstraintsItem {
  labelSelector: PostgresqlPoolerSpecTemplateSpecTopologySpreadConstraintsItemLabelSelector | undefined
  matchLabelKeys: Array<string> | undefined
  maxSkew: number
  minDomains: number | undefined
  nodeAffinityPolicy: string | undefined
  nodeTaintsPolicy: string | undefined
  topologyKey: string
  whenUnsatisfiable: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemAwsElasticBlockStore {
  fsType: string | undefined
  partition: number | undefined
  readOnly: boolean | undefined
  volumeID: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemAzureDisk {
  cachingMode: string | undefined
  diskName: string
  diskURI: string
  fsType: string | undefined
  kind: string | undefined
  readOnly: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemAzureFile {
  readOnly: boolean | undefined
  secretName: string
  shareName: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemCephfsSecretRef {
  name: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemCephfs {
  monitors: Array<string>
  path: string | undefined
  readOnly: boolean | undefined
  secretFile: string | undefined
  secretRef: PostgresqlPoolerSpecTemplateSpecVolumesItemCephfsSecretRef | undefined
  user: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemCinderSecretRef {
  name: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemCinder {
  fsType: string | undefined
  readOnly: boolean | undefined
  secretRef: PostgresqlPoolerSpecTemplateSpecVolumesItemCinderSecretRef | undefined
  volumeID: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemConfigMapItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemConfigMap {
  defaultMode: number | undefined
  items: Array<PostgresqlPoolerSpecTemplateSpecVolumesItemConfigMapItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemCsiNodePublishSecretRef {
  name: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemCsiVolumeAttributes {
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemCsi {
  driver: string
  fsType: string | undefined
  nodePublishSecretRef: PostgresqlPoolerSpecTemplateSpecVolumesItemCsiNodePublishSecretRef | undefined
  readOnly: boolean | undefined
  volumeAttributes: PostgresqlPoolerSpecTemplateSpecVolumesItemCsiVolumeAttributes | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemDownwardAPIItemsItemFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemDownwardAPIItemsItemResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemDownwardAPIItemsItem {
  fieldRef: PostgresqlPoolerSpecTemplateSpecVolumesItemDownwardAPIItemsItemFieldRef | undefined
  mode: number | undefined
  path: string
  resourceFieldRef: PostgresqlPoolerSpecTemplateSpecVolumesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemDownwardAPI {
  defaultMode: number | undefined
  items: Array<PostgresqlPoolerSpecTemplateSpecVolumesItemDownwardAPIItemsItem> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemEmptyDir {
  medium: string | undefined
  sizeLimit: object | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateMetadata {
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSource {
  apiGroup: string | undefined
  kind: string
  name: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSourceRef {
  apiGroup: string | undefined
  kind: string
  name: string
  namespace: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesClaimsItem {
  name: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecResources {
  claims: Array<PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  limits: PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  requests: PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelector {
  matchExpressions: Array<PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  matchLabels: PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpec {
  accessModes: Array<string> | undefined
  dataSource: PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSource | undefined
  dataSourceRef: PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  resources: PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecResources | undefined
  selector: PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelector | undefined
  storageClassName: string | undefined
  volumeMode: string | undefined
  volumeName: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplate {
  metadata: PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateMetadata | undefined
  spec: PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplateSpec
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeral {
  volumeClaimTemplate: PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeralVolumeClaimTemplate | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemFc {
  fsType: string | undefined
  lun: number | undefined
  readOnly: boolean | undefined
  targetWWNs: Array<string> | undefined
  wwids: Array<string> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemFlexVolumeOptions {
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemFlexVolumeSecretRef {
  name: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemFlexVolume {
  driver: string
  fsType: string | undefined
  options: PostgresqlPoolerSpecTemplateSpecVolumesItemFlexVolumeOptions | undefined
  readOnly: boolean | undefined
  secretRef: PostgresqlPoolerSpecTemplateSpecVolumesItemFlexVolumeSecretRef | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemFlocker {
  datasetName: string | undefined
  datasetUUID: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemGcePersistentDisk {
  fsType: string | undefined
  partition: number | undefined
  pdName: string
  readOnly: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemGitRepo {
  directory: string | undefined
  repository: string
  revision: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemGlusterfs {
  endpoints: string
  path: string
  readOnly: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemHostPath {
  path: string
  type: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemIscsiSecretRef {
  name: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemIscsi {
  chapAuthDiscovery: boolean | undefined
  chapAuthSession: boolean | undefined
  fsType: string | undefined
  initiatorName: string | undefined
  iqn: string
  iscsiInterface: string | undefined
  lun: number
  portals: Array<string> | undefined
  readOnly: boolean | undefined
  secretRef: PostgresqlPoolerSpecTemplateSpecVolumesItemIscsiSecretRef | undefined
  targetPortal: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemNfs {
  path: string
  readOnly: boolean | undefined
  server: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemPersistentVolumeClaim {
  claimName: string
  readOnly: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemPhotonPersistentDisk {
  fsType: string | undefined
  pdID: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemPortworxVolume {
  fsType: string | undefined
  readOnly: boolean | undefined
  volumeID: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemConfigMapItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemConfigMap {
  items: Array<PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemConfigMapItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItem {
  fieldRef: PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemFieldRef | undefined
  mode: number | undefined
  path: string
  resourceFieldRef: PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemDownwardAPI {
  items: Array<PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItem> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemSecretItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemSecret {
  items: Array<PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemSecretItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemServiceAccountToken {
  audience: string | undefined
  expirationSeconds: number | undefined
  path: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItem {
  configMap: PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemConfigMap | undefined
  downwardAPI: PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemDownwardAPI | undefined
  secret: PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemSecret | undefined
  serviceAccountToken: PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItemServiceAccountToken | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemProjected {
  defaultMode: number | undefined
  sources: Array<PostgresqlPoolerSpecTemplateSpecVolumesItemProjectedSourcesItem> | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemQuobyte {
  group: string | undefined
  readOnly: boolean | undefined
  registry: string
  tenant: string | undefined
  user: string | undefined
  volume: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemRbdSecretRef {
  name: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemRbd {
  fsType: string | undefined
  image: string
  keyring: string | undefined
  monitors: Array<string>
  pool: string | undefined
  readOnly: boolean | undefined
  secretRef: PostgresqlPoolerSpecTemplateSpecVolumesItemRbdSecretRef | undefined
  user: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemScaleIOSecretRef {
  name: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemScaleIO {
  fsType: string | undefined
  gateway: string
  protectionDomain: string | undefined
  readOnly: boolean | undefined
  secretRef: PostgresqlPoolerSpecTemplateSpecVolumesItemScaleIOSecretRef
  sslEnabled: boolean | undefined
  storageMode: string | undefined
  storagePool: string | undefined
  system: string
  volumeName: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemSecretItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemSecret {
  defaultMode: number | undefined
  items: Array<PostgresqlPoolerSpecTemplateSpecVolumesItemSecretItemsItem> | undefined
  optional: boolean | undefined
  secretName: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemStorageosSecretRef {
  name: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemStorageos {
  fsType: string | undefined
  readOnly: boolean | undefined
  secretRef: PostgresqlPoolerSpecTemplateSpecVolumesItemStorageosSecretRef | undefined
  volumeName: string | undefined
  volumeNamespace: string | undefined
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItemVsphereVolume {
  fsType: string | undefined
  storagePolicyID: string | undefined
  storagePolicyName: string | undefined
  volumePath: string
}
export interface PostgresqlPoolerSpecTemplateSpecVolumesItem {
  awsElasticBlockStore: PostgresqlPoolerSpecTemplateSpecVolumesItemAwsElasticBlockStore | undefined
  azureDisk: PostgresqlPoolerSpecTemplateSpecVolumesItemAzureDisk | undefined
  azureFile: PostgresqlPoolerSpecTemplateSpecVolumesItemAzureFile | undefined
  cephfs: PostgresqlPoolerSpecTemplateSpecVolumesItemCephfs | undefined
  cinder: PostgresqlPoolerSpecTemplateSpecVolumesItemCinder | undefined
  configMap: PostgresqlPoolerSpecTemplateSpecVolumesItemConfigMap | undefined
  csi: PostgresqlPoolerSpecTemplateSpecVolumesItemCsi | undefined
  downwardAPI: PostgresqlPoolerSpecTemplateSpecVolumesItemDownwardAPI | undefined
  emptyDir: PostgresqlPoolerSpecTemplateSpecVolumesItemEmptyDir | undefined
  ephemeral: PostgresqlPoolerSpecTemplateSpecVolumesItemEphemeral | undefined
  fc: PostgresqlPoolerSpecTemplateSpecVolumesItemFc | undefined
  flexVolume: PostgresqlPoolerSpecTemplateSpecVolumesItemFlexVolume | undefined
  flocker: PostgresqlPoolerSpecTemplateSpecVolumesItemFlocker | undefined
  gcePersistentDisk: PostgresqlPoolerSpecTemplateSpecVolumesItemGcePersistentDisk | undefined
  gitRepo: PostgresqlPoolerSpecTemplateSpecVolumesItemGitRepo | undefined
  glusterfs: PostgresqlPoolerSpecTemplateSpecVolumesItemGlusterfs | undefined
  hostPath: PostgresqlPoolerSpecTemplateSpecVolumesItemHostPath | undefined
  iscsi: PostgresqlPoolerSpecTemplateSpecVolumesItemIscsi | undefined
  name: string
  nfs: PostgresqlPoolerSpecTemplateSpecVolumesItemNfs | undefined
  persistentVolumeClaim: PostgresqlPoolerSpecTemplateSpecVolumesItemPersistentVolumeClaim | undefined
  photonPersistentDisk: PostgresqlPoolerSpecTemplateSpecVolumesItemPhotonPersistentDisk | undefined
  portworxVolume: PostgresqlPoolerSpecTemplateSpecVolumesItemPortworxVolume | undefined
  projected: PostgresqlPoolerSpecTemplateSpecVolumesItemProjected | undefined
  quobyte: PostgresqlPoolerSpecTemplateSpecVolumesItemQuobyte | undefined
  rbd: PostgresqlPoolerSpecTemplateSpecVolumesItemRbd | undefined
  scaleIO: PostgresqlPoolerSpecTemplateSpecVolumesItemScaleIO | undefined
  secret: PostgresqlPoolerSpecTemplateSpecVolumesItemSecret | undefined
  storageos: PostgresqlPoolerSpecTemplateSpecVolumesItemStorageos | undefined
  vsphereVolume: PostgresqlPoolerSpecTemplateSpecVolumesItemVsphereVolume | undefined
}
export interface PostgresqlPoolerSpecTemplateSpec {
  activeDeadlineSeconds: number | undefined
  affinity: PostgresqlPoolerSpecTemplateSpecAffinity | undefined
  automountServiceAccountToken: boolean | undefined
  containers: Array<PostgresqlPoolerSpecTemplateSpecContainersItem>
  dnsConfig: PostgresqlPoolerSpecTemplateSpecDnsConfig | undefined
  dnsPolicy: string | undefined
  enableServiceLinks: boolean | undefined
  ephemeralContainers: Array<PostgresqlPoolerSpecTemplateSpecEphemeralContainersItem> | undefined
  hostAliases: Array<PostgresqlPoolerSpecTemplateSpecHostAliasesItem> | undefined
  hostIPC: boolean | undefined
  hostNetwork: boolean | undefined
  hostPID: boolean | undefined
  hostUsers: boolean | undefined
  hostname: string | undefined
  imagePullSecrets: Array<PostgresqlPoolerSpecTemplateSpecImagePullSecretsItem> | undefined
  initContainers: Array<PostgresqlPoolerSpecTemplateSpecInitContainersItem> | undefined
  nodeName: string | undefined
  nodeSelector: PostgresqlPoolerSpecTemplateSpecNodeSelector | undefined
  os: PostgresqlPoolerSpecTemplateSpecOs | undefined
  overhead: PostgresqlPoolerSpecTemplateSpecOverhead | undefined
  preemptionPolicy: string | undefined
  priority: number | undefined
  priorityClassName: string | undefined
  readinessGates: Array<PostgresqlPoolerSpecTemplateSpecReadinessGatesItem> | undefined
  resourceClaims: Array<PostgresqlPoolerSpecTemplateSpecResourceClaimsItem> | undefined
  restartPolicy: string | undefined
  runtimeClassName: string | undefined
  schedulerName: string | undefined
  schedulingGates: Array<PostgresqlPoolerSpecTemplateSpecSchedulingGatesItem> | undefined
  securityContext: PostgresqlPoolerSpecTemplateSpecSecurityContext | undefined
  serviceAccount: string | undefined
  serviceAccountName: string | undefined
  setHostnameAsFQDN: boolean | undefined
  shareProcessNamespace: boolean | undefined
  subdomain: string | undefined
  terminationGracePeriodSeconds: number | undefined
  tolerations: Array<PostgresqlPoolerSpecTemplateSpecTolerationsItem> | undefined
  topologySpreadConstraints: Array<PostgresqlPoolerSpecTemplateSpecTopologySpreadConstraintsItem> | undefined
  volumes: Array<PostgresqlPoolerSpecTemplateSpecVolumesItem> | undefined
}
export interface PostgresqlPoolerSpecTemplate {
  metadata: PostgresqlPoolerSpecTemplateMetadata | undefined
  spec: PostgresqlPoolerSpecTemplateSpec | undefined
}
export interface PostgresqlPoolerSpec {
  cluster: PostgresqlPoolerSpecCluster
  deploymentStrategy: PostgresqlPoolerSpecDeploymentStrategy | undefined
  instances: number
  monitoring: PostgresqlPoolerSpecMonitoring | undefined
  pgbouncer: PostgresqlPoolerSpecPgbouncer
  template: PostgresqlPoolerSpecTemplate | undefined
  type: string
}
export interface PostgresqlPooler extends KubernetesObject {
  spec: PostgresqlPoolerSpec
  status: PostgresqlPoolerStatus | undefined
}
export type PostgresqlPoolerList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<PostgresqlPooler>
