type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface RedisRedisReplicationStatus {
}
export interface RedisRedisReplicationSpecTLSSecretItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface RedisRedisReplicationSpecTLSSecret {
  defaultMode: number | undefined
  items: Array<RedisRedisReplicationSpecTLSSecretItemsItem> | undefined
  optional: boolean | undefined
  secretName: string | undefined
}
export interface RedisRedisReplicationSpecTLS {
  ca: string | undefined
  cert: string | undefined
  key: string | undefined
  secret: RedisRedisReplicationSpecTLSSecret
}
export interface RedisRedisReplicationSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface RedisRedisReplicationSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface RedisRedisReplicationSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  matchExpressions: Array<RedisRedisReplicationSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  matchFields: Array<RedisRedisReplicationSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface RedisRedisReplicationSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  preference: RedisRedisReplicationSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  weight: number
}
export interface RedisRedisReplicationSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface RedisRedisReplicationSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface RedisRedisReplicationSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  matchExpressions: Array<RedisRedisReplicationSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  matchFields: Array<RedisRedisReplicationSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface RedisRedisReplicationSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  nodeSelectorTerms: Array<RedisRedisReplicationSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface RedisRedisReplicationSpecAffinityNodeAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<RedisRedisReplicationSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: RedisRedisReplicationSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  matchExpressions: Array<RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  matchExpressions: Array<RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  labelSelector: RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  namespaceSelector: RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  podAffinityTerm: RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  weight: number
}
export interface RedisRedisReplicationSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface RedisRedisReplicationSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  matchExpressions: Array<RedisRedisReplicationSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: RedisRedisReplicationSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface RedisRedisReplicationSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  matchExpressions: Array<RedisRedisReplicationSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: RedisRedisReplicationSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  labelSelector: RedisRedisReplicationSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  namespaceSelector: RedisRedisReplicationSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface RedisRedisReplicationSpecAffinityPodAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<RedisRedisReplicationSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: Array<RedisRedisReplicationSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  matchExpressions: Array<RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  matchExpressions: Array<RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  labelSelector: RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  namespaceSelector: RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  podAffinityTerm: RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  weight: number
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  matchExpressions: Array<RedisRedisReplicationSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: RedisRedisReplicationSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  matchExpressions: Array<RedisRedisReplicationSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: RedisRedisReplicationSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  labelSelector: RedisRedisReplicationSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  namespaceSelector: RedisRedisReplicationSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface RedisRedisReplicationSpecAffinityPodAntiAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<RedisRedisReplicationSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: Array<RedisRedisReplicationSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface RedisRedisReplicationSpecAffinity {
  nodeAffinity: RedisRedisReplicationSpecAffinityNodeAffinity | undefined
  podAffinity: RedisRedisReplicationSpecAffinityPodAffinity | undefined
  podAntiAffinity: RedisRedisReplicationSpecAffinityPodAntiAffinity | undefined
}
export interface RedisRedisReplicationSpecKubernetesConfigImagePullSecretsItem {
  name: string | undefined
}
export interface RedisRedisReplicationSpecKubernetesConfigRedisSecret {
  key: string | undefined
  name: string | undefined
}
export interface RedisRedisReplicationSpecKubernetesConfigResourcesLimits {
}
export interface RedisRedisReplicationSpecKubernetesConfigResourcesRequests {
}
export interface RedisRedisReplicationSpecKubernetesConfigResources {
  limits: RedisRedisReplicationSpecKubernetesConfigResourcesLimits | undefined
  requests: RedisRedisReplicationSpecKubernetesConfigResourcesRequests | undefined
}
export interface RedisRedisReplicationSpecKubernetesConfigServiceAnnotations {
}
export interface RedisRedisReplicationSpecKubernetesConfigService {
  annotations: RedisRedisReplicationSpecKubernetesConfigServiceAnnotations | undefined
  serviceType: string | undefined
}
export interface RedisRedisReplicationSpecKubernetesConfigUpdateStrategyRollingUpdate {
  partition: number | undefined
}
export interface RedisRedisReplicationSpecKubernetesConfigUpdateStrategy {
  rollingUpdate: RedisRedisReplicationSpecKubernetesConfigUpdateStrategyRollingUpdate | undefined
  type: string | undefined
}
export interface RedisRedisReplicationSpecKubernetesConfig {
  image: string
  imagePullPolicy: string | undefined
  imagePullSecrets: Array<RedisRedisReplicationSpecKubernetesConfigImagePullSecretsItem> | undefined
  redisSecret: RedisRedisReplicationSpecKubernetesConfigRedisSecret | undefined
  resources: RedisRedisReplicationSpecKubernetesConfigResources | undefined
  service: RedisRedisReplicationSpecKubernetesConfigService | undefined
  updateStrategy: RedisRedisReplicationSpecKubernetesConfigUpdateStrategy | undefined
}
export interface RedisRedisReplicationSpecLivenessProbe {
  failureThreshold: number | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  timeoutSeconds: number | undefined
}
export interface RedisRedisReplicationSpecNodeSelector {
}
export interface RedisRedisReplicationSpecReadinessProbe {
  failureThreshold: number | undefined
  initialDelaySeconds: number | undefined
  periodSeconds: number | undefined
  successThreshold: number | undefined
  timeoutSeconds: number | undefined
}
export interface RedisRedisReplicationSpecRedisConfig {
  additionalRedisConfig: string | undefined
}
export interface RedisRedisReplicationSpecRedisExporterEnvItemValueFromConfigMapKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface RedisRedisReplicationSpecRedisExporterEnvItemValueFromFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface RedisRedisReplicationSpecRedisExporterEnvItemValueFromResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface RedisRedisReplicationSpecRedisExporterEnvItemValueFromSecretKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface RedisRedisReplicationSpecRedisExporterEnvItemValueFrom {
  configMapKeyRef: RedisRedisReplicationSpecRedisExporterEnvItemValueFromConfigMapKeyRef | undefined
  fieldRef: RedisRedisReplicationSpecRedisExporterEnvItemValueFromFieldRef | undefined
  resourceFieldRef: RedisRedisReplicationSpecRedisExporterEnvItemValueFromResourceFieldRef | undefined
  secretKeyRef: RedisRedisReplicationSpecRedisExporterEnvItemValueFromSecretKeyRef | undefined
}
export interface RedisRedisReplicationSpecRedisExporterEnvItem {
  name: string
  value: string | undefined
  valueFrom: RedisRedisReplicationSpecRedisExporterEnvItemValueFrom | undefined
}
export interface RedisRedisReplicationSpecRedisExporterResourcesLimits {
}
export interface RedisRedisReplicationSpecRedisExporterResourcesRequests {
}
export interface RedisRedisReplicationSpecRedisExporterResources {
  limits: RedisRedisReplicationSpecRedisExporterResourcesLimits | undefined
  requests: RedisRedisReplicationSpecRedisExporterResourcesRequests | undefined
}
export interface RedisRedisReplicationSpecRedisExporter {
  enabled: boolean | undefined
  env: Array<RedisRedisReplicationSpecRedisExporterEnvItem> | undefined
  image: string
  imagePullPolicy: string | undefined
  resources: RedisRedisReplicationSpecRedisExporterResources | undefined
}
export interface RedisRedisReplicationSpecSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface RedisRedisReplicationSpecSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface RedisRedisReplicationSpecSecurityContextSysctlsItem {
  name: string
  value: string
}
export interface RedisRedisReplicationSpecSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface RedisRedisReplicationSpecSecurityContext {
  fsGroup: number | undefined
  fsGroupChangePolicy: string | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: RedisRedisReplicationSpecSecurityContextSeLinuxOptions | undefined
  seccompProfile: RedisRedisReplicationSpecSecurityContextSeccompProfile | undefined
  supplementalGroups: Array<number> | undefined
  sysctls: Array<RedisRedisReplicationSpecSecurityContextSysctlsItem> | undefined
  windowsOptions: RedisRedisReplicationSpecSecurityContextWindowsOptions | undefined
}
export interface RedisRedisReplicationSpecSidecarsItemEnvItemValueFromConfigMapKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface RedisRedisReplicationSpecSidecarsItemEnvItemValueFromFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface RedisRedisReplicationSpecSidecarsItemEnvItemValueFromResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface RedisRedisReplicationSpecSidecarsItemEnvItemValueFromSecretKeyRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface RedisRedisReplicationSpecSidecarsItemEnvItemValueFrom {
  configMapKeyRef: RedisRedisReplicationSpecSidecarsItemEnvItemValueFromConfigMapKeyRef | undefined
  fieldRef: RedisRedisReplicationSpecSidecarsItemEnvItemValueFromFieldRef | undefined
  resourceFieldRef: RedisRedisReplicationSpecSidecarsItemEnvItemValueFromResourceFieldRef | undefined
  secretKeyRef: RedisRedisReplicationSpecSidecarsItemEnvItemValueFromSecretKeyRef | undefined
}
export interface RedisRedisReplicationSpecSidecarsItemEnvItem {
  name: string
  value: string | undefined
  valueFrom: RedisRedisReplicationSpecSidecarsItemEnvItemValueFrom | undefined
}
export interface RedisRedisReplicationSpecSidecarsItemResourcesLimits {
}
export interface RedisRedisReplicationSpecSidecarsItemResourcesRequests {
}
export interface RedisRedisReplicationSpecSidecarsItemResources {
  limits: RedisRedisReplicationSpecSidecarsItemResourcesLimits | undefined
  requests: RedisRedisReplicationSpecSidecarsItemResourcesRequests | undefined
}
export interface RedisRedisReplicationSpecSidecarsItem {
  env: Array<RedisRedisReplicationSpecSidecarsItemEnvItem> | undefined
  image: string
  imagePullPolicy: string | undefined
  name: string
  resources: RedisRedisReplicationSpecSidecarsItemResources | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplateMetadata {
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecDataSource {
  apiGroup: string | undefined
  kind: string
  name: string
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecDataSourceRef {
  apiGroup: string | undefined
  kind: string
  name: string
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecResourcesLimits {
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecResourcesRequests {
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecResources {
  limits: RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecResourcesLimits | undefined
  requests: RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecSelector {
  matchExpressions: Array<RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  matchLabels: RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplateSpec {
  accessModes: Array<string> | undefined
  dataSource: RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecDataSource | undefined
  dataSourceRef: RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecDataSourceRef | undefined
  resources: RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecResources | undefined
  selector: RedisRedisReplicationSpecStorageVolumeClaimTemplateSpecSelector | undefined
  storageClassName: string | undefined
  volumeMode: string | undefined
  volumeName: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplateStatusAllocatedResources {
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplateStatusCapacity {
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplateStatusConditionsItem {
  lastProbeTime: string | undefined
  lastTransitionTime: string | undefined
  message: string | undefined
  reason: string | undefined
  status: string
  type: string
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplateStatus {
  accessModes: Array<string> | undefined
  allocatedResources: RedisRedisReplicationSpecStorageVolumeClaimTemplateStatusAllocatedResources | undefined
  capacity: RedisRedisReplicationSpecStorageVolumeClaimTemplateStatusCapacity | undefined
  conditions: Array<RedisRedisReplicationSpecStorageVolumeClaimTemplateStatusConditionsItem> | undefined
  phase: string | undefined
  resizeStatus: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeClaimTemplate {
  apiVersion: string | undefined
  kind: string | undefined
  metadata: RedisRedisReplicationSpecStorageVolumeClaimTemplateMetadata | undefined
  spec: RedisRedisReplicationSpecStorageVolumeClaimTemplateSpec | undefined
  status: RedisRedisReplicationSpecStorageVolumeClaimTemplateStatus | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountMountPathItem {
  mountPath: string
  mountPropagation: string | undefined
  name: string
  readOnly: boolean | undefined
  subPath: string | undefined
  subPathExpr: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemAwsElasticBlockStore {
  fsType: string | undefined
  partition: number | undefined
  readOnly: boolean | undefined
  volumeID: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemAzureDisk {
  cachingMode: string | undefined
  diskName: string
  diskURI: string
  fsType: string | undefined
  kind: string | undefined
  readOnly: boolean | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemAzureFile {
  readOnly: boolean | undefined
  secretName: string
  shareName: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemCephfsSecretRef {
  name: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemCephfs {
  monitors: Array<string>
  path: string | undefined
  readOnly: boolean | undefined
  secretFile: string | undefined
  secretRef: RedisRedisReplicationSpecStorageVolumeMountVolumeItemCephfsSecretRef | undefined
  user: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemCinderSecretRef {
  name: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemCinder {
  fsType: string | undefined
  readOnly: boolean | undefined
  secretRef: RedisRedisReplicationSpecStorageVolumeMountVolumeItemCinderSecretRef | undefined
  volumeID: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemConfigMapItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemConfigMap {
  defaultMode: number | undefined
  items: Array<RedisRedisReplicationSpecStorageVolumeMountVolumeItemConfigMapItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemCsiNodePublishSecretRef {
  name: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemCsiVolumeAttributes {
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemCsi {
  driver: string
  fsType: string | undefined
  nodePublishSecretRef: RedisRedisReplicationSpecStorageVolumeMountVolumeItemCsiNodePublishSecretRef | undefined
  readOnly: boolean | undefined
  volumeAttributes: RedisRedisReplicationSpecStorageVolumeMountVolumeItemCsiVolumeAttributes | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemDownwardAPIItemsItemFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemDownwardAPIItemsItemResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemDownwardAPIItemsItem {
  fieldRef: RedisRedisReplicationSpecStorageVolumeMountVolumeItemDownwardAPIItemsItemFieldRef | undefined
  mode: number | undefined
  path: string
  resourceFieldRef: RedisRedisReplicationSpecStorageVolumeMountVolumeItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemDownwardAPI {
  defaultMode: number | undefined
  items: Array<RedisRedisReplicationSpecStorageVolumeMountVolumeItemDownwardAPIItemsItem> | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemEmptyDir {
  medium: string | undefined
  sizeLimit: object | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateMetadata {
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecDataSource {
  apiGroup: string | undefined
  kind: string
  name: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecDataSourceRef {
  apiGroup: string | undefined
  kind: string
  name: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecResources {
  limits: RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  requests: RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecSelector {
  matchExpressions: Array<RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  matchLabels: RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpec {
  accessModes: Array<string> | undefined
  dataSource: RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecDataSource | undefined
  dataSourceRef: RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  resources: RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecResources | undefined
  selector: RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpecSelector | undefined
  storageClassName: string | undefined
  volumeMode: string | undefined
  volumeName: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplate {
  metadata: RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateMetadata | undefined
  spec: RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplateSpec
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeral {
  volumeClaimTemplate: RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeralVolumeClaimTemplate | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemFc {
  fsType: string | undefined
  lun: number | undefined
  readOnly: boolean | undefined
  targetWWNs: Array<string> | undefined
  wwids: Array<string> | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemFlexVolumeOptions {
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemFlexVolumeSecretRef {
  name: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemFlexVolume {
  driver: string
  fsType: string | undefined
  options: RedisRedisReplicationSpecStorageVolumeMountVolumeItemFlexVolumeOptions | undefined
  readOnly: boolean | undefined
  secretRef: RedisRedisReplicationSpecStorageVolumeMountVolumeItemFlexVolumeSecretRef | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemFlocker {
  datasetName: string | undefined
  datasetUUID: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemGcePersistentDisk {
  fsType: string | undefined
  partition: number | undefined
  pdName: string
  readOnly: boolean | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemGitRepo {
  directory: string | undefined
  repository: string
  revision: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemGlusterfs {
  endpoints: string
  path: string
  readOnly: boolean | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemHostPath {
  path: string
  type: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemIscsiSecretRef {
  name: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemIscsi {
  chapAuthDiscovery: boolean | undefined
  chapAuthSession: boolean | undefined
  fsType: string | undefined
  initiatorName: string | undefined
  iqn: string
  iscsiInterface: string | undefined
  lun: number
  portals: Array<string> | undefined
  readOnly: boolean | undefined
  secretRef: RedisRedisReplicationSpecStorageVolumeMountVolumeItemIscsiSecretRef | undefined
  targetPortal: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemNfs {
  path: string
  readOnly: boolean | undefined
  server: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemPersistentVolumeClaim {
  claimName: string
  readOnly: boolean | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemPhotonPersistentDisk {
  fsType: string | undefined
  pdID: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemPortworxVolume {
  fsType: string | undefined
  readOnly: boolean | undefined
  volumeID: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemConfigMapItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemConfigMap {
  items: Array<RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemConfigMapItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemDownwardAPIItemsItemFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemDownwardAPIItemsItem {
  fieldRef: RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemDownwardAPIItemsItemFieldRef | undefined
  mode: number | undefined
  path: string
  resourceFieldRef: RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemDownwardAPI {
  items: Array<RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemDownwardAPIItemsItem> | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemSecretItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemSecret {
  items: Array<RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemSecretItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemServiceAccountToken {
  audience: string | undefined
  expirationSeconds: number | undefined
  path: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItem {
  configMap: RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemConfigMap | undefined
  downwardAPI: RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemDownwardAPI | undefined
  secret: RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemSecret | undefined
  serviceAccountToken: RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItemServiceAccountToken | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjected {
  defaultMode: number | undefined
  sources: Array<RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjectedSourcesItem> | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemQuobyte {
  group: string | undefined
  readOnly: boolean | undefined
  registry: string
  tenant: string | undefined
  user: string | undefined
  volume: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemRbdSecretRef {
  name: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemRbd {
  fsType: string | undefined
  image: string
  keyring: string | undefined
  monitors: Array<string>
  pool: string | undefined
  readOnly: boolean | undefined
  secretRef: RedisRedisReplicationSpecStorageVolumeMountVolumeItemRbdSecretRef | undefined
  user: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemScaleIOSecretRef {
  name: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemScaleIO {
  fsType: string | undefined
  gateway: string
  protectionDomain: string | undefined
  readOnly: boolean | undefined
  secretRef: RedisRedisReplicationSpecStorageVolumeMountVolumeItemScaleIOSecretRef
  sslEnabled: boolean | undefined
  storageMode: string | undefined
  storagePool: string | undefined
  system: string
  volumeName: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemSecretItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemSecret {
  defaultMode: number | undefined
  items: Array<RedisRedisReplicationSpecStorageVolumeMountVolumeItemSecretItemsItem> | undefined
  optional: boolean | undefined
  secretName: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemStorageosSecretRef {
  name: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemStorageos {
  fsType: string | undefined
  readOnly: boolean | undefined
  secretRef: RedisRedisReplicationSpecStorageVolumeMountVolumeItemStorageosSecretRef | undefined
  volumeName: string | undefined
  volumeNamespace: string | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItemVsphereVolume {
  fsType: string | undefined
  storagePolicyID: string | undefined
  storagePolicyName: string | undefined
  volumePath: string
}
export interface RedisRedisReplicationSpecStorageVolumeMountVolumeItem {
  awsElasticBlockStore: RedisRedisReplicationSpecStorageVolumeMountVolumeItemAwsElasticBlockStore | undefined
  azureDisk: RedisRedisReplicationSpecStorageVolumeMountVolumeItemAzureDisk | undefined
  azureFile: RedisRedisReplicationSpecStorageVolumeMountVolumeItemAzureFile | undefined
  cephfs: RedisRedisReplicationSpecStorageVolumeMountVolumeItemCephfs | undefined
  cinder: RedisRedisReplicationSpecStorageVolumeMountVolumeItemCinder | undefined
  configMap: RedisRedisReplicationSpecStorageVolumeMountVolumeItemConfigMap | undefined
  csi: RedisRedisReplicationSpecStorageVolumeMountVolumeItemCsi | undefined
  downwardAPI: RedisRedisReplicationSpecStorageVolumeMountVolumeItemDownwardAPI | undefined
  emptyDir: RedisRedisReplicationSpecStorageVolumeMountVolumeItemEmptyDir | undefined
  ephemeral: RedisRedisReplicationSpecStorageVolumeMountVolumeItemEphemeral | undefined
  fc: RedisRedisReplicationSpecStorageVolumeMountVolumeItemFc | undefined
  flexVolume: RedisRedisReplicationSpecStorageVolumeMountVolumeItemFlexVolume | undefined
  flocker: RedisRedisReplicationSpecStorageVolumeMountVolumeItemFlocker | undefined
  gcePersistentDisk: RedisRedisReplicationSpecStorageVolumeMountVolumeItemGcePersistentDisk | undefined
  gitRepo: RedisRedisReplicationSpecStorageVolumeMountVolumeItemGitRepo | undefined
  glusterfs: RedisRedisReplicationSpecStorageVolumeMountVolumeItemGlusterfs | undefined
  hostPath: RedisRedisReplicationSpecStorageVolumeMountVolumeItemHostPath | undefined
  iscsi: RedisRedisReplicationSpecStorageVolumeMountVolumeItemIscsi | undefined
  name: string
  nfs: RedisRedisReplicationSpecStorageVolumeMountVolumeItemNfs | undefined
  persistentVolumeClaim: RedisRedisReplicationSpecStorageVolumeMountVolumeItemPersistentVolumeClaim | undefined
  photonPersistentDisk: RedisRedisReplicationSpecStorageVolumeMountVolumeItemPhotonPersistentDisk | undefined
  portworxVolume: RedisRedisReplicationSpecStorageVolumeMountVolumeItemPortworxVolume | undefined
  projected: RedisRedisReplicationSpecStorageVolumeMountVolumeItemProjected | undefined
  quobyte: RedisRedisReplicationSpecStorageVolumeMountVolumeItemQuobyte | undefined
  rbd: RedisRedisReplicationSpecStorageVolumeMountVolumeItemRbd | undefined
  scaleIO: RedisRedisReplicationSpecStorageVolumeMountVolumeItemScaleIO | undefined
  secret: RedisRedisReplicationSpecStorageVolumeMountVolumeItemSecret | undefined
  storageos: RedisRedisReplicationSpecStorageVolumeMountVolumeItemStorageos | undefined
  vsphereVolume: RedisRedisReplicationSpecStorageVolumeMountVolumeItemVsphereVolume | undefined
}
export interface RedisRedisReplicationSpecStorageVolumeMount {
  mountPath: Array<RedisRedisReplicationSpecStorageVolumeMountMountPathItem> | undefined
  volume: Array<RedisRedisReplicationSpecStorageVolumeMountVolumeItem> | undefined
}
export interface RedisRedisReplicationSpecStorage {
  volumeClaimTemplate: RedisRedisReplicationSpecStorageVolumeClaimTemplate | undefined
  volumeMount: RedisRedisReplicationSpecStorageVolumeMount | undefined
}
export interface RedisRedisReplicationSpecTolerationsItem {
  effect: string | undefined
  key: string | undefined
  operator: string | undefined
  tolerationSeconds: number | undefined
  value: string | undefined
}
export interface RedisRedisReplicationSpec {
  TLS: RedisRedisReplicationSpecTLS | undefined
  affinity: RedisRedisReplicationSpecAffinity | undefined
  clusterSize: number
  kubernetesConfig: RedisRedisReplicationSpecKubernetesConfig
  livenessProbe: RedisRedisReplicationSpecLivenessProbe | undefined
  nodeSelector: RedisRedisReplicationSpecNodeSelector | undefined
  priorityClassName: string | undefined
  readinessProbe: RedisRedisReplicationSpecReadinessProbe | undefined
  redisConfig: RedisRedisReplicationSpecRedisConfig | undefined
  redisExporter: RedisRedisReplicationSpecRedisExporter | undefined
  securityContext: RedisRedisReplicationSpecSecurityContext | undefined
  serviceAccountName: string | undefined
  sidecars: Array<RedisRedisReplicationSpecSidecarsItem> | undefined
  storage: RedisRedisReplicationSpecStorage | undefined
  tolerations: Array<RedisRedisReplicationSpecTolerationsItem> | undefined
}
export interface RedisRedisReplication extends KubernetesObject {
  spec: RedisRedisReplicationSpec
  status: RedisRedisReplicationStatus | undefined
}
export type RedisRedisReplicationList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<RedisRedisReplication>
