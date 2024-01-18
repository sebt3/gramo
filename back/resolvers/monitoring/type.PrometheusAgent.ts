type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MonitoringPrometheusAgentStatusConditionsItem {
  lastTransitionTime: string
  message: string | undefined
  observedGeneration: number | undefined
  reason: string | undefined
  status: string
  type: string
}
export interface MonitoringPrometheusAgentStatusShardStatusesItem {
  availableReplicas: number
  replicas: number
  shardID: string
  unavailableReplicas: number
  updatedReplicas: number
}
export interface MonitoringPrometheusAgentStatus {
  availableReplicas: number
  conditions: Array<MonitoringPrometheusAgentStatusConditionsItem> | undefined
  paused: boolean
  replicas: number
  shardStatuses: Array<MonitoringPrometheusAgentStatusShardStatusesItem> | undefined
  unavailableReplicas: number
  updatedReplicas: number
}
export interface MonitoringPrometheusAgentSpecAdditionalArgsItem {
  name: string
  value: string | undefined
}
export interface MonitoringPrometheusAgentSpecAdditionalScrapeConfigs {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  matchExpressions: Array<MonitoringPrometheusAgentSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  matchFields: Array<MonitoringPrometheusAgentSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  preference: MonitoringPrometheusAgentSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  weight: number
}
export interface MonitoringPrometheusAgentSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  matchExpressions: Array<MonitoringPrometheusAgentSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  matchFields: Array<MonitoringPrometheusAgentSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  nodeSelectorTerms: Array<MonitoringPrometheusAgentSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface MonitoringPrometheusAgentSpecAffinityNodeAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<MonitoringPrometheusAgentSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: MonitoringPrometheusAgentSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  labelSelector: MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  namespaceSelector: MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  podAffinityTerm: MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  weight: number
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  labelSelector: MonitoringPrometheusAgentSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  namespaceSelector: MonitoringPrometheusAgentSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MonitoringPrometheusAgentSpecAffinityPodAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<MonitoringPrometheusAgentSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: Array<MonitoringPrometheusAgentSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  labelSelector: MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  namespaceSelector: MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  podAffinityTerm: MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  weight: number
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  labelSelector: MonitoringPrometheusAgentSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  namespaceSelector: MonitoringPrometheusAgentSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MonitoringPrometheusAgentSpecAffinityPodAntiAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<MonitoringPrometheusAgentSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: Array<MonitoringPrometheusAgentSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface MonitoringPrometheusAgentSpecAffinity {
  nodeAffinity: MonitoringPrometheusAgentSpecAffinityNodeAffinity | undefined
  podAffinity: MonitoringPrometheusAgentSpecAffinityPodAffinity | undefined
  podAntiAffinity: MonitoringPrometheusAgentSpecAffinityPodAntiAffinity | undefined
}
export interface MonitoringPrometheusAgentSpecApiserverConfigAuthorizationCredentials {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecApiserverConfigAuthorization {
  credentials: MonitoringPrometheusAgentSpecApiserverConfigAuthorizationCredentials | undefined
  credentialsFile: string | undefined
  type: string | undefined
}
export interface MonitoringPrometheusAgentSpecApiserverConfigBasicAuthPassword {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecApiserverConfigBasicAuthUsername {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecApiserverConfigBasicAuth {
  password: MonitoringPrometheusAgentSpecApiserverConfigBasicAuthPassword | undefined
  username: MonitoringPrometheusAgentSpecApiserverConfigBasicAuthUsername | undefined
}
export interface MonitoringPrometheusAgentSpecApiserverConfigTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecApiserverConfigTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecApiserverConfigTlsConfigCa {
  configMap: MonitoringPrometheusAgentSpecApiserverConfigTlsConfigCaConfigMap | undefined
  secret: MonitoringPrometheusAgentSpecApiserverConfigTlsConfigCaSecret | undefined
}
export interface MonitoringPrometheusAgentSpecApiserverConfigTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecApiserverConfigTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecApiserverConfigTlsConfigCert {
  configMap: MonitoringPrometheusAgentSpecApiserverConfigTlsConfigCertConfigMap | undefined
  secret: MonitoringPrometheusAgentSpecApiserverConfigTlsConfigCertSecret | undefined
}
export interface MonitoringPrometheusAgentSpecApiserverConfigTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecApiserverConfigTlsConfig {
  ca: MonitoringPrometheusAgentSpecApiserverConfigTlsConfigCa | undefined
  caFile: string | undefined
  cert: MonitoringPrometheusAgentSpecApiserverConfigTlsConfigCert | undefined
  certFile: string | undefined
  insecureSkipVerify: boolean | undefined
  keyFile: string | undefined
  keySecret: MonitoringPrometheusAgentSpecApiserverConfigTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringPrometheusAgentSpecApiserverConfig {
  authorization: MonitoringPrometheusAgentSpecApiserverConfigAuthorization | undefined
  basicAuth: MonitoringPrometheusAgentSpecApiserverConfigBasicAuth | undefined
  bearerToken: string | undefined
  bearerTokenFile: string | undefined
  host: string
  tlsConfig: MonitoringPrometheusAgentSpecApiserverConfigTlsConfig | undefined
}
export interface MonitoringPrometheusAgentSpecArbitraryFSAccessThroughSMs {
  deny: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemEnvItemValueFromConfigMapKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemEnvItemValueFromFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface MonitoringPrometheusAgentSpecContainersItemEnvItemValueFromResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface MonitoringPrometheusAgentSpecContainersItemEnvItemValueFromSecretKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemEnvItemValueFrom {
  configMapKeyRef: MonitoringPrometheusAgentSpecContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  fieldRef: MonitoringPrometheusAgentSpecContainersItemEnvItemValueFromFieldRef | undefined
  resourceFieldRef: MonitoringPrometheusAgentSpecContainersItemEnvItemValueFromResourceFieldRef | undefined
  secretKeyRef: MonitoringPrometheusAgentSpecContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemEnvItem {
  name: string
  value: string | undefined
  valueFrom: MonitoringPrometheusAgentSpecContainersItemEnvItemValueFrom | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemEnvFromItem {
  configMapRef: MonitoringPrometheusAgentSpecContainersItemEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: MonitoringPrometheusAgentSpecContainersItemEnvFromItemSecretRef | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemLifecyclePostStartExec {
  command: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemLifecyclePostStartHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringPrometheusAgentSpecContainersItemLifecyclePostStartHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringPrometheusAgentSpecContainersItemLifecyclePostStartHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemLifecyclePostStartTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringPrometheusAgentSpecContainersItemLifecyclePostStart {
  exec: MonitoringPrometheusAgentSpecContainersItemLifecyclePostStartExec | undefined
  httpGet: MonitoringPrometheusAgentSpecContainersItemLifecyclePostStartHttpGet | undefined
  tcpSocket: MonitoringPrometheusAgentSpecContainersItemLifecyclePostStartTcpSocket | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemLifecyclePreStopExec {
  command: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemLifecyclePreStopHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringPrometheusAgentSpecContainersItemLifecyclePreStopHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringPrometheusAgentSpecContainersItemLifecyclePreStopHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemLifecyclePreStopTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringPrometheusAgentSpecContainersItemLifecyclePreStop {
  exec: MonitoringPrometheusAgentSpecContainersItemLifecyclePreStopExec | undefined
  httpGet: MonitoringPrometheusAgentSpecContainersItemLifecyclePreStopHttpGet | undefined
  tcpSocket: MonitoringPrometheusAgentSpecContainersItemLifecyclePreStopTcpSocket | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemLifecycle {
  postStart: MonitoringPrometheusAgentSpecContainersItemLifecyclePostStart | undefined
  preStop: MonitoringPrometheusAgentSpecContainersItemLifecyclePreStop | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemLivenessProbeExec {
  command: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemLivenessProbeGrpc {
  port: number
  service: string | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemLivenessProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringPrometheusAgentSpecContainersItemLivenessProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringPrometheusAgentSpecContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemLivenessProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringPrometheusAgentSpecContainersItemLivenessProbe {
  exec: MonitoringPrometheusAgentSpecContainersItemLivenessProbeExec | undefined
  failureThreshold: number | undefined
  grpc: MonitoringPrometheusAgentSpecContainersItemLivenessProbeGrpc | undefined
  httpGet: MonitoringPrometheusAgentSpecContainersItemLivenessProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: MonitoringPrometheusAgentSpecContainersItemLivenessProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemPortsItem {
  containerPort: number
  hostIP: string | undefined
  hostPort: number | undefined
  name: string | undefined
  protocol: string | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemReadinessProbeExec {
  command: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemReadinessProbeGrpc {
  port: number
  service: string | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemReadinessProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringPrometheusAgentSpecContainersItemReadinessProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringPrometheusAgentSpecContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemReadinessProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringPrometheusAgentSpecContainersItemReadinessProbe {
  exec: MonitoringPrometheusAgentSpecContainersItemReadinessProbeExec | undefined
  failureThreshold: number | undefined
  grpc: MonitoringPrometheusAgentSpecContainersItemReadinessProbeGrpc | undefined
  httpGet: MonitoringPrometheusAgentSpecContainersItemReadinessProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: MonitoringPrometheusAgentSpecContainersItemReadinessProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemResizePolicyItem {
  resourceName: string
  restartPolicy: string
}
export interface MonitoringPrometheusAgentSpecContainersItemResourcesClaimsItem {
  name: string
}
export interface MonitoringPrometheusAgentSpecContainersItemResourcesLimits {
}
export interface MonitoringPrometheusAgentSpecContainersItemResourcesRequests {
}
export interface MonitoringPrometheusAgentSpecContainersItemResources {
  claims: Array<MonitoringPrometheusAgentSpecContainersItemResourcesClaimsItem> | undefined
  limits: MonitoringPrometheusAgentSpecContainersItemResourcesLimits | undefined
  requests: MonitoringPrometheusAgentSpecContainersItemResourcesRequests | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemSecurityContextCapabilities {
  add: Array<string> | undefined
  drop: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface MonitoringPrometheusAgentSpecContainersItemSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemSecurityContext {
  allowPrivilegeEscalation: boolean | undefined
  capabilities: MonitoringPrometheusAgentSpecContainersItemSecurityContextCapabilities | undefined
  privileged: boolean | undefined
  procMount: string | undefined
  readOnlyRootFilesystem: boolean | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: MonitoringPrometheusAgentSpecContainersItemSecurityContextSeLinuxOptions | undefined
  seccompProfile: MonitoringPrometheusAgentSpecContainersItemSecurityContextSeccompProfile | undefined
  windowsOptions: MonitoringPrometheusAgentSpecContainersItemSecurityContextWindowsOptions | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemStartupProbeExec {
  command: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemStartupProbeGrpc {
  port: number
  service: string | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemStartupProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringPrometheusAgentSpecContainersItemStartupProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringPrometheusAgentSpecContainersItemStartupProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemStartupProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringPrometheusAgentSpecContainersItemStartupProbe {
  exec: MonitoringPrometheusAgentSpecContainersItemStartupProbeExec | undefined
  failureThreshold: number | undefined
  grpc: MonitoringPrometheusAgentSpecContainersItemStartupProbeGrpc | undefined
  httpGet: MonitoringPrometheusAgentSpecContainersItemStartupProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: MonitoringPrometheusAgentSpecContainersItemStartupProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItemVolumeDevicesItem {
  devicePath: string
  name: string
}
export interface MonitoringPrometheusAgentSpecContainersItemVolumeMountsItem {
  mountPath: string
  mountPropagation: string | undefined
  name: string
  readOnly: boolean | undefined
  subPath: string | undefined
  subPathExpr: string | undefined
}
export interface MonitoringPrometheusAgentSpecContainersItem {
  args: Array<string> | undefined
  command: Array<string> | undefined
  env: Array<MonitoringPrometheusAgentSpecContainersItemEnvItem> | undefined
  envFrom: Array<MonitoringPrometheusAgentSpecContainersItemEnvFromItem> | undefined
  image: string | undefined
  imagePullPolicy: string | undefined
  lifecycle: MonitoringPrometheusAgentSpecContainersItemLifecycle | undefined
  livenessProbe: MonitoringPrometheusAgentSpecContainersItemLivenessProbe | undefined
  name: string
  ports: Array<MonitoringPrometheusAgentSpecContainersItemPortsItem> | undefined
  readinessProbe: MonitoringPrometheusAgentSpecContainersItemReadinessProbe | undefined
  resizePolicy: Array<MonitoringPrometheusAgentSpecContainersItemResizePolicyItem> | undefined
  resources: MonitoringPrometheusAgentSpecContainersItemResources | undefined
  securityContext: MonitoringPrometheusAgentSpecContainersItemSecurityContext | undefined
  startupProbe: MonitoringPrometheusAgentSpecContainersItemStartupProbe | undefined
  stdin: boolean | undefined
  stdinOnce: boolean | undefined
  terminationMessagePath: string | undefined
  terminationMessagePolicy: string | undefined
  tty: boolean | undefined
  volumeDevices: Array<MonitoringPrometheusAgentSpecContainersItemVolumeDevicesItem> | undefined
  volumeMounts: Array<MonitoringPrometheusAgentSpecContainersItemVolumeMountsItem> | undefined
  workingDir: string | undefined
}
export interface MonitoringPrometheusAgentSpecExcludedFromEnforcementItem {
  group: string | undefined
  name: string | undefined
  namespace: string
  resource: string
}
export interface MonitoringPrometheusAgentSpecExternalLabels {
}
export interface MonitoringPrometheusAgentSpecHostAliasesItem {
  hostnames: Array<string>
  ip: string
}
export interface MonitoringPrometheusAgentSpecImagePullSecretsItem {
  name: string | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemEnvItemValueFromConfigMapKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemEnvItemValueFromFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface MonitoringPrometheusAgentSpecInitContainersItemEnvItemValueFromResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface MonitoringPrometheusAgentSpecInitContainersItemEnvItemValueFromSecretKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemEnvItemValueFrom {
  configMapKeyRef: MonitoringPrometheusAgentSpecInitContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  fieldRef: MonitoringPrometheusAgentSpecInitContainersItemEnvItemValueFromFieldRef | undefined
  resourceFieldRef: MonitoringPrometheusAgentSpecInitContainersItemEnvItemValueFromResourceFieldRef | undefined
  secretKeyRef: MonitoringPrometheusAgentSpecInitContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemEnvItem {
  name: string
  value: string | undefined
  valueFrom: MonitoringPrometheusAgentSpecInitContainersItemEnvItemValueFrom | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemEnvFromItem {
  configMapRef: MonitoringPrometheusAgentSpecInitContainersItemEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: MonitoringPrometheusAgentSpecInitContainersItemEnvFromItemSecretRef | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLifecyclePostStartExec {
  command: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLifecyclePostStartHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLifecyclePostStartHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringPrometheusAgentSpecInitContainersItemLifecyclePostStartHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLifecyclePostStartTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLifecyclePostStart {
  exec: MonitoringPrometheusAgentSpecInitContainersItemLifecyclePostStartExec | undefined
  httpGet: MonitoringPrometheusAgentSpecInitContainersItemLifecyclePostStartHttpGet | undefined
  tcpSocket: MonitoringPrometheusAgentSpecInitContainersItemLifecyclePostStartTcpSocket | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLifecyclePreStopExec {
  command: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLifecyclePreStopHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLifecyclePreStopHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringPrometheusAgentSpecInitContainersItemLifecyclePreStopHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLifecyclePreStopTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLifecyclePreStop {
  exec: MonitoringPrometheusAgentSpecInitContainersItemLifecyclePreStopExec | undefined
  httpGet: MonitoringPrometheusAgentSpecInitContainersItemLifecyclePreStopHttpGet | undefined
  tcpSocket: MonitoringPrometheusAgentSpecInitContainersItemLifecyclePreStopTcpSocket | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLifecycle {
  postStart: MonitoringPrometheusAgentSpecInitContainersItemLifecyclePostStart | undefined
  preStop: MonitoringPrometheusAgentSpecInitContainersItemLifecyclePreStop | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLivenessProbeExec {
  command: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLivenessProbeGrpc {
  port: number
  service: string | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLivenessProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLivenessProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringPrometheusAgentSpecInitContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLivenessProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringPrometheusAgentSpecInitContainersItemLivenessProbe {
  exec: MonitoringPrometheusAgentSpecInitContainersItemLivenessProbeExec | undefined
  failureThreshold: number | undefined
  grpc: MonitoringPrometheusAgentSpecInitContainersItemLivenessProbeGrpc | undefined
  httpGet: MonitoringPrometheusAgentSpecInitContainersItemLivenessProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: MonitoringPrometheusAgentSpecInitContainersItemLivenessProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemPortsItem {
  containerPort: number
  hostIP: string | undefined
  hostPort: number | undefined
  name: string | undefined
  protocol: string | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemReadinessProbeExec {
  command: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemReadinessProbeGrpc {
  port: number
  service: string | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemReadinessProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringPrometheusAgentSpecInitContainersItemReadinessProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringPrometheusAgentSpecInitContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemReadinessProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringPrometheusAgentSpecInitContainersItemReadinessProbe {
  exec: MonitoringPrometheusAgentSpecInitContainersItemReadinessProbeExec | undefined
  failureThreshold: number | undefined
  grpc: MonitoringPrometheusAgentSpecInitContainersItemReadinessProbeGrpc | undefined
  httpGet: MonitoringPrometheusAgentSpecInitContainersItemReadinessProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: MonitoringPrometheusAgentSpecInitContainersItemReadinessProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemResizePolicyItem {
  resourceName: string
  restartPolicy: string
}
export interface MonitoringPrometheusAgentSpecInitContainersItemResourcesClaimsItem {
  name: string
}
export interface MonitoringPrometheusAgentSpecInitContainersItemResourcesLimits {
}
export interface MonitoringPrometheusAgentSpecInitContainersItemResourcesRequests {
}
export interface MonitoringPrometheusAgentSpecInitContainersItemResources {
  claims: Array<MonitoringPrometheusAgentSpecInitContainersItemResourcesClaimsItem> | undefined
  limits: MonitoringPrometheusAgentSpecInitContainersItemResourcesLimits | undefined
  requests: MonitoringPrometheusAgentSpecInitContainersItemResourcesRequests | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemSecurityContextCapabilities {
  add: Array<string> | undefined
  drop: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface MonitoringPrometheusAgentSpecInitContainersItemSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemSecurityContext {
  allowPrivilegeEscalation: boolean | undefined
  capabilities: MonitoringPrometheusAgentSpecInitContainersItemSecurityContextCapabilities | undefined
  privileged: boolean | undefined
  procMount: string | undefined
  readOnlyRootFilesystem: boolean | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: MonitoringPrometheusAgentSpecInitContainersItemSecurityContextSeLinuxOptions | undefined
  seccompProfile: MonitoringPrometheusAgentSpecInitContainersItemSecurityContextSeccompProfile | undefined
  windowsOptions: MonitoringPrometheusAgentSpecInitContainersItemSecurityContextWindowsOptions | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemStartupProbeExec {
  command: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemStartupProbeGrpc {
  port: number
  service: string | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemStartupProbeHttpGetHttpHeadersItem {
  name: string
  value: string
}
export interface MonitoringPrometheusAgentSpecInitContainersItemStartupProbeHttpGet {
  host: string | undefined
  httpHeaders: Array<MonitoringPrometheusAgentSpecInitContainersItemStartupProbeHttpGetHttpHeadersItem> | undefined
  path: string | undefined
  port: object
  scheme: string | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemStartupProbeTcpSocket {
  host: string | undefined
  port: object
}
export interface MonitoringPrometheusAgentSpecInitContainersItemStartupProbe {
  exec: MonitoringPrometheusAgentSpecInitContainersItemStartupProbeExec | undefined
  failureThreshold: number | undefined
  grpc: MonitoringPrometheusAgentSpecInitContainersItemStartupProbeGrpc | undefined
  httpGet: MonitoringPrometheusAgentSpecInitContainersItemStartupProbeHttpGet | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  tcpSocket: MonitoringPrometheusAgentSpecInitContainersItemStartupProbeTcpSocket | undefined
  terminationGracePeriodSeconds: number | undefined
  timeoutSeconds: number | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItemVolumeDevicesItem {
  devicePath: string
  name: string
}
export interface MonitoringPrometheusAgentSpecInitContainersItemVolumeMountsItem {
  mountPath: string
  mountPropagation: string | undefined
  name: string
  readOnly: boolean | undefined
  subPath: string | undefined
  subPathExpr: string | undefined
}
export interface MonitoringPrometheusAgentSpecInitContainersItem {
  args: Array<string> | undefined
  command: Array<string> | undefined
  env: Array<MonitoringPrometheusAgentSpecInitContainersItemEnvItem> | undefined
  envFrom: Array<MonitoringPrometheusAgentSpecInitContainersItemEnvFromItem> | undefined
  image: string | undefined
  imagePullPolicy: string | undefined
  lifecycle: MonitoringPrometheusAgentSpecInitContainersItemLifecycle | undefined
  livenessProbe: MonitoringPrometheusAgentSpecInitContainersItemLivenessProbe | undefined
  name: string
  ports: Array<MonitoringPrometheusAgentSpecInitContainersItemPortsItem> | undefined
  readinessProbe: MonitoringPrometheusAgentSpecInitContainersItemReadinessProbe | undefined
  resizePolicy: Array<MonitoringPrometheusAgentSpecInitContainersItemResizePolicyItem> | undefined
  resources: MonitoringPrometheusAgentSpecInitContainersItemResources | undefined
  securityContext: MonitoringPrometheusAgentSpecInitContainersItemSecurityContext | undefined
  startupProbe: MonitoringPrometheusAgentSpecInitContainersItemStartupProbe | undefined
  stdin: boolean | undefined
  stdinOnce: boolean | undefined
  terminationMessagePath: string | undefined
  terminationMessagePolicy: string | undefined
  tty: boolean | undefined
  volumeDevices: Array<MonitoringPrometheusAgentSpecInitContainersItemVolumeDevicesItem> | undefined
  volumeMounts: Array<MonitoringPrometheusAgentSpecInitContainersItemVolumeMountsItem> | undefined
  workingDir: string | undefined
}
export interface MonitoringPrometheusAgentSpecNodeSelector {
}
export interface MonitoringPrometheusAgentSpecPodMetadataAnnotations {
}
export interface MonitoringPrometheusAgentSpecPodMetadataLabels {
}
export interface MonitoringPrometheusAgentSpecPodMetadata {
  annotations: MonitoringPrometheusAgentSpecPodMetadataAnnotations | undefined
  labels: MonitoringPrometheusAgentSpecPodMetadataLabels | undefined
  name: string | undefined
}
export interface MonitoringPrometheusAgentSpecPodMonitorNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecPodMonitorNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecPodMonitorNamespaceSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecPodMonitorNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecPodMonitorNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecPodMonitorSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecPodMonitorSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecPodMonitorSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecPodMonitorSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecPodMonitorSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecProbeNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecProbeNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecProbeNamespaceSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecProbeNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecProbeNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecProbeSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecProbeSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecProbeSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecProbeSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecProbeSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemAuthorizationCredentials {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemAuthorization {
  credentials: MonitoringPrometheusAgentSpecRemoteWriteItemAuthorizationCredentials | undefined
  credentialsFile: string | undefined
  type: string | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemBasicAuthPassword {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemBasicAuthUsername {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemBasicAuth {
  password: MonitoringPrometheusAgentSpecRemoteWriteItemBasicAuthPassword | undefined
  username: MonitoringPrometheusAgentSpecRemoteWriteItemBasicAuthUsername | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemHeaders {
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemMetadataConfig {
  send: boolean | undefined
  sendInterval: string | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemOauth2ClientIdConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemOauth2ClientIdSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemOauth2ClientId {
  configMap: MonitoringPrometheusAgentSpecRemoteWriteItemOauth2ClientIdConfigMap | undefined
  secret: MonitoringPrometheusAgentSpecRemoteWriteItemOauth2ClientIdSecret | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemOauth2ClientSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemOauth2EndpointParams {
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemOauth2 {
  clientId: MonitoringPrometheusAgentSpecRemoteWriteItemOauth2ClientId
  clientSecret: MonitoringPrometheusAgentSpecRemoteWriteItemOauth2ClientSecret
  endpointParams: MonitoringPrometheusAgentSpecRemoteWriteItemOauth2EndpointParams | undefined
  scopes: Array<string> | undefined
  tokenUrl: string
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemQueueConfig {
  batchSendDeadline: string | undefined
  capacity: number | undefined
  maxBackoff: string | undefined
  maxRetries: number | undefined
  maxSamplesPerSend: number | undefined
  maxShards: number | undefined
  minBackoff: string | undefined
  minShards: number | undefined
  retryOnRateLimit: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemSigv4AccessKey {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemSigv4SecretKey {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemSigv4 {
  accessKey: MonitoringPrometheusAgentSpecRemoteWriteItemSigv4AccessKey | undefined
  profile: string | undefined
  region: string | undefined
  roleArn: string | undefined
  secretKey: MonitoringPrometheusAgentSpecRemoteWriteItemSigv4SecretKey | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfigCa {
  configMap: MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfigCaConfigMap | undefined
  secret: MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfigCaSecret | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfigCert {
  configMap: MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfigCertConfigMap | undefined
  secret: MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfigCertSecret | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfig {
  ca: MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfigCa | undefined
  caFile: string | undefined
  cert: MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfigCert | undefined
  certFile: string | undefined
  insecureSkipVerify: boolean | undefined
  keyFile: string | undefined
  keySecret: MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItemWriteRelabelConfigsItem {
  action: string | undefined
  modulus: number | undefined
  regex: string | undefined
  replacement: string | undefined
  separator: string | undefined
  sourceLabels: Array<string> | undefined
  targetLabel: string | undefined
}
export interface MonitoringPrometheusAgentSpecRemoteWriteItem {
  authorization: MonitoringPrometheusAgentSpecRemoteWriteItemAuthorization | undefined
  basicAuth: MonitoringPrometheusAgentSpecRemoteWriteItemBasicAuth | undefined
  bearerToken: string | undefined
  bearerTokenFile: string | undefined
  headers: MonitoringPrometheusAgentSpecRemoteWriteItemHeaders | undefined
  metadataConfig: MonitoringPrometheusAgentSpecRemoteWriteItemMetadataConfig | undefined
  name: string | undefined
  oauth2: MonitoringPrometheusAgentSpecRemoteWriteItemOauth2 | undefined
  proxyUrl: string | undefined
  queueConfig: MonitoringPrometheusAgentSpecRemoteWriteItemQueueConfig | undefined
  remoteTimeout: string | undefined
  sendExemplars: boolean | undefined
  sigv4: MonitoringPrometheusAgentSpecRemoteWriteItemSigv4 | undefined
  tlsConfig: MonitoringPrometheusAgentSpecRemoteWriteItemTlsConfig | undefined
  url: string
  writeRelabelConfigs: Array<MonitoringPrometheusAgentSpecRemoteWriteItemWriteRelabelConfigsItem> | undefined
}
export interface MonitoringPrometheusAgentSpecResourcesClaimsItem {
  name: string
}
export interface MonitoringPrometheusAgentSpecResourcesLimits {
}
export interface MonitoringPrometheusAgentSpecResourcesRequests {
}
export interface MonitoringPrometheusAgentSpecResources {
  claims: Array<MonitoringPrometheusAgentSpecResourcesClaimsItem> | undefined
  limits: MonitoringPrometheusAgentSpecResourcesLimits | undefined
  requests: MonitoringPrometheusAgentSpecResourcesRequests | undefined
}
export interface MonitoringPrometheusAgentSpecScrapeConfigNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecScrapeConfigNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecScrapeConfigNamespaceSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecScrapeConfigNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecScrapeConfigNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecScrapeConfigSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecScrapeConfigSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecScrapeConfigSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecScrapeConfigSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecScrapeConfigSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface MonitoringPrometheusAgentSpecSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface MonitoringPrometheusAgentSpecSecurityContextSysctlsItem {
  name: string
  value: string
}
export interface MonitoringPrometheusAgentSpecSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface MonitoringPrometheusAgentSpecSecurityContext {
  fsGroup: number | undefined
  fsGroupChangePolicy: string | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: MonitoringPrometheusAgentSpecSecurityContextSeLinuxOptions | undefined
  seccompProfile: MonitoringPrometheusAgentSpecSecurityContextSeccompProfile | undefined
  supplementalGroups: Array<number> | undefined
  sysctls: Array<MonitoringPrometheusAgentSpecSecurityContextSysctlsItem> | undefined
  windowsOptions: MonitoringPrometheusAgentSpecSecurityContextWindowsOptions | undefined
}
export interface MonitoringPrometheusAgentSpecServiceMonitorNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecServiceMonitorNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecServiceMonitorNamespaceSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecServiceMonitorNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecServiceMonitorNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecServiceMonitorSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecServiceMonitorSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecServiceMonitorSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecServiceMonitorSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecServiceMonitorSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecStorageEmptyDir {
  medium: string | undefined
  sizeLimit: object | undefined
}
export interface MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateMetadata {
}
export interface MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecDataSource {
  apiGroup: string | undefined
  kind: string
  name: string
}
export interface MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecDataSourceRef {
  apiGroup: string | undefined
  kind: string
  name: string
  namespace: string | undefined
}
export interface MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecResourcesClaimsItem {
  name: string
}
export interface MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecResources {
  claims: Array<MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  limits: MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  requests: MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpec {
  accessModes: Array<string> | undefined
  dataSource: MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecDataSource | undefined
  dataSourceRef: MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  resources: MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecResources | undefined
  selector: MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpecSelector | undefined
  storageClassName: string | undefined
  volumeMode: string | undefined
  volumeName: string | undefined
}
export interface MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplate {
  metadata: MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateMetadata | undefined
  spec: MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplateSpec
}
export interface MonitoringPrometheusAgentSpecStorageEphemeral {
  volumeClaimTemplate: MonitoringPrometheusAgentSpecStorageEphemeralVolumeClaimTemplate | undefined
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateMetadataAnnotations {
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateMetadataLabels {
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateMetadata {
  annotations: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateMetadataAnnotations | undefined
  labels: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateMetadataLabels | undefined
  name: string | undefined
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecDataSource {
  apiGroup: string | undefined
  kind: string
  name: string
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecDataSourceRef {
  apiGroup: string | undefined
  kind: string
  name: string
  namespace: string | undefined
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecResourcesClaimsItem {
  name: string
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecResourcesLimits {
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecResourcesRequests {
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecResources {
  claims: Array<MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  limits: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecResourcesLimits | undefined
  requests: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpec {
  accessModes: Array<string> | undefined
  dataSource: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecDataSource | undefined
  dataSourceRef: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecDataSourceRef | undefined
  resources: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecResources | undefined
  selector: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpecSelector | undefined
  storageClassName: string | undefined
  volumeMode: string | undefined
  volumeName: string | undefined
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateStatusAllocatedResources {
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateStatusCapacity {
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateStatusConditionsItem {
  lastProbeTime: string | undefined
  lastTransitionTime: string | undefined
  message: string | undefined
  reason: string | undefined
  status: string
  type: string
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateStatus {
  accessModes: Array<string> | undefined
  allocatedResources: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateStatusAllocatedResources | undefined
  capacity: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateStatusCapacity | undefined
  conditions: Array<MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateStatusConditionsItem> | undefined
  phase: string | undefined
  resizeStatus: string | undefined
}
export interface MonitoringPrometheusAgentSpecStorageVolumeClaimTemplate {
  apiVersion: string | undefined
  kind: string | undefined
  metadata: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateMetadata | undefined
  spec: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateSpec | undefined
  status: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplateStatus | undefined
}
export interface MonitoringPrometheusAgentSpecStorage {
  disableMountSubPath: boolean | undefined
  emptyDir: MonitoringPrometheusAgentSpecStorageEmptyDir | undefined
  ephemeral: MonitoringPrometheusAgentSpecStorageEphemeral | undefined
  volumeClaimTemplate: MonitoringPrometheusAgentSpecStorageVolumeClaimTemplate | undefined
}
export interface MonitoringPrometheusAgentSpecTolerationsItem {
  effect: string | undefined
  key: string | undefined
  operator: string | undefined
  tolerationSeconds: number | undefined
  value: string | undefined
}
export interface MonitoringPrometheusAgentSpecTopologySpreadConstraintsItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecTopologySpreadConstraintsItemLabelSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecTopologySpreadConstraintsItemLabelSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecTopologySpreadConstraintsItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecTopologySpreadConstraintsItemLabelSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecTopologySpreadConstraintsItem {
  labelSelector: MonitoringPrometheusAgentSpecTopologySpreadConstraintsItemLabelSelector | undefined
  matchLabelKeys: Array<string> | undefined
  maxSkew: number
  minDomains: number | undefined
  nodeAffinityPolicy: string | undefined
  nodeTaintsPolicy: string | undefined
  topologyKey: string
  whenUnsatisfiable: string
}
export interface MonitoringPrometheusAgentSpecVolumeMountsItem {
  mountPath: string
  mountPropagation: string | undefined
  name: string
  readOnly: boolean | undefined
  subPath: string | undefined
  subPathExpr: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemAwsElasticBlockStore {
  fsType: string | undefined
  partition: number | undefined
  readOnly: boolean | undefined
  volumeID: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemAzureDisk {
  cachingMode: string | undefined
  diskName: string
  diskURI: string
  fsType: string | undefined
  kind: string | undefined
  readOnly: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemAzureFile {
  readOnly: boolean | undefined
  secretName: string
  shareName: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemCephfsSecretRef {
  name: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemCephfs {
  monitors: Array<string>
  path: string | undefined
  readOnly: boolean | undefined
  secretFile: string | undefined
  secretRef: MonitoringPrometheusAgentSpecVolumesItemCephfsSecretRef | undefined
  user: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemCinderSecretRef {
  name: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemCinder {
  fsType: string | undefined
  readOnly: boolean | undefined
  secretRef: MonitoringPrometheusAgentSpecVolumesItemCinderSecretRef | undefined
  volumeID: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemConfigMapItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemConfigMap {
  defaultMode: number | undefined
  items: Array<MonitoringPrometheusAgentSpecVolumesItemConfigMapItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemCsiNodePublishSecretRef {
  name: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemCsiVolumeAttributes {
}
export interface MonitoringPrometheusAgentSpecVolumesItemCsi {
  driver: string
  fsType: string | undefined
  nodePublishSecretRef: MonitoringPrometheusAgentSpecVolumesItemCsiNodePublishSecretRef | undefined
  readOnly: boolean | undefined
  volumeAttributes: MonitoringPrometheusAgentSpecVolumesItemCsiVolumeAttributes | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemDownwardAPIItemsItemFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemDownwardAPIItemsItemResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemDownwardAPIItemsItem {
  fieldRef: MonitoringPrometheusAgentSpecVolumesItemDownwardAPIItemsItemFieldRef | undefined
  mode: number | undefined
  path: string
  resourceFieldRef: MonitoringPrometheusAgentSpecVolumesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemDownwardAPI {
  defaultMode: number | undefined
  items: Array<MonitoringPrometheusAgentSpecVolumesItemDownwardAPIItemsItem> | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemEmptyDir {
  medium: string | undefined
  sizeLimit: object | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateMetadata {
}
export interface MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSource {
  apiGroup: string | undefined
  kind: string
  name: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSourceRef {
  apiGroup: string | undefined
  kind: string
  name: string
  namespace: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesClaimsItem {
  name: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecResources {
  claims: Array<MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  limits: MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  requests: MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelector {
  matchExpressions: Array<MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpec {
  accessModes: Array<string> | undefined
  dataSource: MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSource | undefined
  dataSourceRef: MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  resources: MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecResources | undefined
  selector: MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelector | undefined
  storageClassName: string | undefined
  volumeMode: string | undefined
  volumeName: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplate {
  metadata: MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateMetadata | undefined
  spec: MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplateSpec
}
export interface MonitoringPrometheusAgentSpecVolumesItemEphemeral {
  volumeClaimTemplate: MonitoringPrometheusAgentSpecVolumesItemEphemeralVolumeClaimTemplate | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemFc {
  fsType: string | undefined
  lun: number | undefined
  readOnly: boolean | undefined
  targetWWNs: Array<string> | undefined
  wwids: Array<string> | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemFlexVolumeOptions {
}
export interface MonitoringPrometheusAgentSpecVolumesItemFlexVolumeSecretRef {
  name: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemFlexVolume {
  driver: string
  fsType: string | undefined
  options: MonitoringPrometheusAgentSpecVolumesItemFlexVolumeOptions | undefined
  readOnly: boolean | undefined
  secretRef: MonitoringPrometheusAgentSpecVolumesItemFlexVolumeSecretRef | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemFlocker {
  datasetName: string | undefined
  datasetUUID: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemGcePersistentDisk {
  fsType: string | undefined
  partition: number | undefined
  pdName: string
  readOnly: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemGitRepo {
  directory: string | undefined
  repository: string
  revision: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemGlusterfs {
  endpoints: string
  path: string
  readOnly: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemHostPath {
  path: string
  type: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemIscsiSecretRef {
  name: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemIscsi {
  chapAuthDiscovery: boolean | undefined
  chapAuthSession: boolean | undefined
  fsType: string | undefined
  initiatorName: string | undefined
  iqn: string
  iscsiInterface: string | undefined
  lun: number
  portals: Array<string> | undefined
  readOnly: boolean | undefined
  secretRef: MonitoringPrometheusAgentSpecVolumesItemIscsiSecretRef | undefined
  targetPortal: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemNfs {
  path: string
  readOnly: boolean | undefined
  server: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemPersistentVolumeClaim {
  claimName: string
  readOnly: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemPhotonPersistentDisk {
  fsType: string | undefined
  pdID: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemPortworxVolume {
  fsType: string | undefined
  readOnly: boolean | undefined
  volumeID: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemConfigMapItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemConfigMap {
  items: Array<MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemConfigMapItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItem {
  fieldRef: MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemFieldRef | undefined
  mode: number | undefined
  path: string
  resourceFieldRef: MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemDownwardAPI {
  items: Array<MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItem> | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemSecretItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemSecret {
  items: Array<MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemSecretItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemServiceAccountToken {
  audience: string | undefined
  expirationSeconds: number | undefined
  path: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItem {
  configMap: MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemConfigMap | undefined
  downwardAPI: MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemDownwardAPI | undefined
  secret: MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemSecret | undefined
  serviceAccountToken: MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItemServiceAccountToken | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemProjected {
  defaultMode: number | undefined
  sources: Array<MonitoringPrometheusAgentSpecVolumesItemProjectedSourcesItem> | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemQuobyte {
  group: string | undefined
  readOnly: boolean | undefined
  registry: string
  tenant: string | undefined
  user: string | undefined
  volume: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemRbdSecretRef {
  name: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemRbd {
  fsType: string | undefined
  image: string
  keyring: string | undefined
  monitors: Array<string>
  pool: string | undefined
  readOnly: boolean | undefined
  secretRef: MonitoringPrometheusAgentSpecVolumesItemRbdSecretRef | undefined
  user: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemScaleIOSecretRef {
  name: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemScaleIO {
  fsType: string | undefined
  gateway: string
  protectionDomain: string | undefined
  readOnly: boolean | undefined
  secretRef: MonitoringPrometheusAgentSpecVolumesItemScaleIOSecretRef
  sslEnabled: boolean | undefined
  storageMode: string | undefined
  storagePool: string | undefined
  system: string
  volumeName: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemSecretItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MonitoringPrometheusAgentSpecVolumesItemSecret {
  defaultMode: number | undefined
  items: Array<MonitoringPrometheusAgentSpecVolumesItemSecretItemsItem> | undefined
  optional: boolean | undefined
  secretName: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemStorageosSecretRef {
  name: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemStorageos {
  fsType: string | undefined
  readOnly: boolean | undefined
  secretRef: MonitoringPrometheusAgentSpecVolumesItemStorageosSecretRef | undefined
  volumeName: string | undefined
  volumeNamespace: string | undefined
}
export interface MonitoringPrometheusAgentSpecVolumesItemVsphereVolume {
  fsType: string | undefined
  storagePolicyID: string | undefined
  storagePolicyName: string | undefined
  volumePath: string
}
export interface MonitoringPrometheusAgentSpecVolumesItem {
  awsElasticBlockStore: MonitoringPrometheusAgentSpecVolumesItemAwsElasticBlockStore | undefined
  azureDisk: MonitoringPrometheusAgentSpecVolumesItemAzureDisk | undefined
  azureFile: MonitoringPrometheusAgentSpecVolumesItemAzureFile | undefined
  cephfs: MonitoringPrometheusAgentSpecVolumesItemCephfs | undefined
  cinder: MonitoringPrometheusAgentSpecVolumesItemCinder | undefined
  configMap: MonitoringPrometheusAgentSpecVolumesItemConfigMap | undefined
  csi: MonitoringPrometheusAgentSpecVolumesItemCsi | undefined
  downwardAPI: MonitoringPrometheusAgentSpecVolumesItemDownwardAPI | undefined
  emptyDir: MonitoringPrometheusAgentSpecVolumesItemEmptyDir | undefined
  ephemeral: MonitoringPrometheusAgentSpecVolumesItemEphemeral | undefined
  fc: MonitoringPrometheusAgentSpecVolumesItemFc | undefined
  flexVolume: MonitoringPrometheusAgentSpecVolumesItemFlexVolume | undefined
  flocker: MonitoringPrometheusAgentSpecVolumesItemFlocker | undefined
  gcePersistentDisk: MonitoringPrometheusAgentSpecVolumesItemGcePersistentDisk | undefined
  gitRepo: MonitoringPrometheusAgentSpecVolumesItemGitRepo | undefined
  glusterfs: MonitoringPrometheusAgentSpecVolumesItemGlusterfs | undefined
  hostPath: MonitoringPrometheusAgentSpecVolumesItemHostPath | undefined
  iscsi: MonitoringPrometheusAgentSpecVolumesItemIscsi | undefined
  name: string
  nfs: MonitoringPrometheusAgentSpecVolumesItemNfs | undefined
  persistentVolumeClaim: MonitoringPrometheusAgentSpecVolumesItemPersistentVolumeClaim | undefined
  photonPersistentDisk: MonitoringPrometheusAgentSpecVolumesItemPhotonPersistentDisk | undefined
  portworxVolume: MonitoringPrometheusAgentSpecVolumesItemPortworxVolume | undefined
  projected: MonitoringPrometheusAgentSpecVolumesItemProjected | undefined
  quobyte: MonitoringPrometheusAgentSpecVolumesItemQuobyte | undefined
  rbd: MonitoringPrometheusAgentSpecVolumesItemRbd | undefined
  scaleIO: MonitoringPrometheusAgentSpecVolumesItemScaleIO | undefined
  secret: MonitoringPrometheusAgentSpecVolumesItemSecret | undefined
  storageos: MonitoringPrometheusAgentSpecVolumesItemStorageos | undefined
  vsphereVolume: MonitoringPrometheusAgentSpecVolumesItemVsphereVolume | undefined
}
export interface MonitoringPrometheusAgentSpecWebHttpConfigHeaders {
  contentSecurityPolicy: string | undefined
  strictTransportSecurity: string | undefined
  xContentTypeOptions: string | undefined
  xFrameOptions: string | undefined
  xXSSProtection: string | undefined
}
export interface MonitoringPrometheusAgentSpecWebHttpConfig {
  headers: MonitoringPrometheusAgentSpecWebHttpConfigHeaders | undefined
  http2: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecWebTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecWebTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecWebTlsConfigCert {
  configMap: MonitoringPrometheusAgentSpecWebTlsConfigCertConfigMap | undefined
  secret: MonitoringPrometheusAgentSpecWebTlsConfigCertSecret | undefined
}
export interface MonitoringPrometheusAgentSpecWebTlsConfigClient_caConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecWebTlsConfigClient_caSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecWebTlsConfigClient_ca {
  configMap: MonitoringPrometheusAgentSpecWebTlsConfigClient_caConfigMap | undefined
  secret: MonitoringPrometheusAgentSpecWebTlsConfigClient_caSecret | undefined
}
export interface MonitoringPrometheusAgentSpecWebTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecWebTlsConfig {
  cert: MonitoringPrometheusAgentSpecWebTlsConfigCert
  cipherSuites: Array<string> | undefined
  clientAuthType: string | undefined
  client_ca: MonitoringPrometheusAgentSpecWebTlsConfigClient_ca | undefined
  curvePreferences: Array<string> | undefined
  keySecret: MonitoringPrometheusAgentSpecWebTlsConfigKeySecret
  maxVersion: string | undefined
  minVersion: string | undefined
  preferServerCipherSuites: boolean | undefined
}
export interface MonitoringPrometheusAgentSpecWeb {
  httpConfig: MonitoringPrometheusAgentSpecWebHttpConfig | undefined
  maxConnections: number | undefined
  pageTitle: string | undefined
  tlsConfig: MonitoringPrometheusAgentSpecWebTlsConfig | undefined
}
export interface MonitoringPrometheusAgentSpec {
  additionalArgs: Array<MonitoringPrometheusAgentSpecAdditionalArgsItem> | undefined
  additionalScrapeConfigs: MonitoringPrometheusAgentSpecAdditionalScrapeConfigs | undefined
  affinity: MonitoringPrometheusAgentSpecAffinity | undefined
  apiserverConfig: MonitoringPrometheusAgentSpecApiserverConfig | undefined
  arbitraryFSAccessThroughSMs: MonitoringPrometheusAgentSpecArbitraryFSAccessThroughSMs | undefined
  configMaps: Array<string> | undefined
  containers: Array<MonitoringPrometheusAgentSpecContainersItem> | undefined
  enableFeatures: Array<string> | undefined
  enableRemoteWriteReceiver: boolean | undefined
  enforcedBodySizeLimit: string | undefined
  enforcedLabelLimit: number | undefined
  enforcedLabelNameLengthLimit: number | undefined
  enforcedLabelValueLengthLimit: number | undefined
  enforcedNamespaceLabel: string | undefined
  enforcedSampleLimit: number | undefined
  enforcedTargetLimit: number | undefined
  excludedFromEnforcement: Array<MonitoringPrometheusAgentSpecExcludedFromEnforcementItem> | undefined
  externalLabels: MonitoringPrometheusAgentSpecExternalLabels | undefined
  externalUrl: string | undefined
  hostAliases: Array<MonitoringPrometheusAgentSpecHostAliasesItem> | undefined
  hostNetwork: boolean | undefined
  ignoreNamespaceSelectors: boolean | undefined
  image: string | undefined
  imagePullPolicy: string | undefined
  imagePullSecrets: Array<MonitoringPrometheusAgentSpecImagePullSecretsItem> | undefined
  initContainers: Array<MonitoringPrometheusAgentSpecInitContainersItem> | undefined
  listenLocal: boolean | undefined
  logFormat: string | undefined
  logLevel: string | undefined
  minReadySeconds: number | undefined
  nodeSelector: MonitoringPrometheusAgentSpecNodeSelector | undefined
  overrideHonorLabels: boolean | undefined
  overrideHonorTimestamps: boolean | undefined
  paused: boolean | undefined
  podMetadata: MonitoringPrometheusAgentSpecPodMetadata | undefined
  podMonitorNamespaceSelector: MonitoringPrometheusAgentSpecPodMonitorNamespaceSelector | undefined
  podMonitorSelector: MonitoringPrometheusAgentSpecPodMonitorSelector | undefined
  podTargetLabels: Array<string> | undefined
  portName: string | undefined
  priorityClassName: string | undefined
  probeNamespaceSelector: MonitoringPrometheusAgentSpecProbeNamespaceSelector | undefined
  probeSelector: MonitoringPrometheusAgentSpecProbeSelector | undefined
  prometheusExternalLabelName: string | undefined
  remoteWrite: Array<MonitoringPrometheusAgentSpecRemoteWriteItem> | undefined
  replicaExternalLabelName: string | undefined
  replicas: number | undefined
  resources: MonitoringPrometheusAgentSpecResources | undefined
  routePrefix: string | undefined
  scrapeConfigNamespaceSelector: MonitoringPrometheusAgentSpecScrapeConfigNamespaceSelector | undefined
  scrapeConfigSelector: MonitoringPrometheusAgentSpecScrapeConfigSelector | undefined
  scrapeInterval: string | undefined
  scrapeTimeout: string | undefined
  secrets: Array<string> | undefined
  securityContext: MonitoringPrometheusAgentSpecSecurityContext | undefined
  serviceAccountName: string | undefined
  serviceMonitorNamespaceSelector: MonitoringPrometheusAgentSpecServiceMonitorNamespaceSelector | undefined
  serviceMonitorSelector: MonitoringPrometheusAgentSpecServiceMonitorSelector | undefined
  shards: number | undefined
  storage: MonitoringPrometheusAgentSpecStorage | undefined
  tolerations: Array<MonitoringPrometheusAgentSpecTolerationsItem> | undefined
  topologySpreadConstraints: Array<MonitoringPrometheusAgentSpecTopologySpreadConstraintsItem> | undefined
  version: string | undefined
  volumeMounts: Array<MonitoringPrometheusAgentSpecVolumeMountsItem> | undefined
  volumes: Array<MonitoringPrometheusAgentSpecVolumesItem> | undefined
  walCompression: boolean | undefined
  web: MonitoringPrometheusAgentSpecWeb | undefined
}
export interface MonitoringPrometheusAgent extends KubernetesObject {
  spec: MonitoringPrometheusAgentSpec
  status: MonitoringPrometheusAgentStatus | undefined
}
export type MonitoringPrometheusAgentList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MonitoringPrometheusAgent>
