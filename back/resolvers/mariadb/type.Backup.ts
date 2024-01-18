type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MariadbBackupStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface MariadbBackupStatus {
  conditions: Array<MariadbBackupStatusConditionsItem> | undefined
}
export interface MariadbBackupSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbBackupSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbBackupSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  matchExpressions: Array<MariadbBackupSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  matchFields: Array<MariadbBackupSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface MariadbBackupSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  preference: MariadbBackupSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  weight: number
}
export interface MariadbBackupSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbBackupSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbBackupSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  matchExpressions: Array<MariadbBackupSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  matchFields: Array<MariadbBackupSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface MariadbBackupSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  nodeSelectorTerms: Array<MariadbBackupSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface MariadbBackupSpecAffinityNodeAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<MariadbBackupSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: MariadbBackupSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  matchExpressions: Array<MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  matchExpressions: Array<MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  labelSelector: MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  namespaceSelector: MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  podAffinityTerm: MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  weight: number
}
export interface MariadbBackupSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbBackupSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface MariadbBackupSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  matchExpressions: Array<MariadbBackupSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbBackupSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface MariadbBackupSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbBackupSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface MariadbBackupSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  matchExpressions: Array<MariadbBackupSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbBackupSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface MariadbBackupSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  labelSelector: MariadbBackupSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  namespaceSelector: MariadbBackupSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MariadbBackupSpecAffinityPodAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<MariadbBackupSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: Array<MariadbBackupSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  matchExpressions: Array<MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  matchExpressions: Array<MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  labelSelector: MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  namespaceSelector: MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  podAffinityTerm: MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  weight: number
}
export interface MariadbBackupSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbBackupSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface MariadbBackupSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  matchExpressions: Array<MariadbBackupSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbBackupSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface MariadbBackupSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbBackupSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface MariadbBackupSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  matchExpressions: Array<MariadbBackupSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbBackupSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface MariadbBackupSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  labelSelector: MariadbBackupSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  namespaceSelector: MariadbBackupSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MariadbBackupSpecAffinityPodAntiAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<MariadbBackupSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: Array<MariadbBackupSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface MariadbBackupSpecAffinity {
  nodeAffinity: MariadbBackupSpecAffinityNodeAffinity | undefined
  podAffinity: MariadbBackupSpecAffinityPodAffinity | undefined
  podAntiAffinity: MariadbBackupSpecAffinityPodAntiAffinity | undefined
}
export interface MariadbBackupSpecMariaDbRef {
  apiVersion: string | undefined
  fieldPath: string | undefined
  kind: string | undefined
  name: string | undefined
  namespace: string | undefined
  resourceVersion: string | undefined
  uid: string | undefined
  waitForIt: boolean | undefined
}
export interface MariadbBackupSpecNodeSelector {
}
export interface MariadbBackupSpecResourcesClaimsItem {
  name: string
}
export interface MariadbBackupSpecResourcesLimits {
}
export interface MariadbBackupSpecResourcesRequests {
}
export interface MariadbBackupSpecResources {
  claims: Array<MariadbBackupSpecResourcesClaimsItem> | undefined
  limits: MariadbBackupSpecResourcesLimits | undefined
  requests: MariadbBackupSpecResourcesRequests | undefined
}
export interface MariadbBackupSpecSchedule {
  cron: string
  suspend: boolean | undefined
}
export interface MariadbBackupSpecStoragePersistentVolumeClaimDataSource {
  apiGroup: string | undefined
  kind: string
  name: string
}
export interface MariadbBackupSpecStoragePersistentVolumeClaimDataSourceRef {
  apiGroup: string | undefined
  kind: string
  name: string
  namespace: string | undefined
}
export interface MariadbBackupSpecStoragePersistentVolumeClaimResourcesClaimsItem {
  name: string
}
export interface MariadbBackupSpecStoragePersistentVolumeClaimResourcesLimits {
}
export interface MariadbBackupSpecStoragePersistentVolumeClaimResourcesRequests {
}
export interface MariadbBackupSpecStoragePersistentVolumeClaimResources {
  claims: Array<MariadbBackupSpecStoragePersistentVolumeClaimResourcesClaimsItem> | undefined
  limits: MariadbBackupSpecStoragePersistentVolumeClaimResourcesLimits | undefined
  requests: MariadbBackupSpecStoragePersistentVolumeClaimResourcesRequests | undefined
}
export interface MariadbBackupSpecStoragePersistentVolumeClaimSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbBackupSpecStoragePersistentVolumeClaimSelectorMatchLabels {
}
export interface MariadbBackupSpecStoragePersistentVolumeClaimSelector {
  matchExpressions: Array<MariadbBackupSpecStoragePersistentVolumeClaimSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbBackupSpecStoragePersistentVolumeClaimSelectorMatchLabels | undefined
}
export interface MariadbBackupSpecStoragePersistentVolumeClaim {
  accessModes: Array<string> | undefined
  dataSource: MariadbBackupSpecStoragePersistentVolumeClaimDataSource | undefined
  dataSourceRef: MariadbBackupSpecStoragePersistentVolumeClaimDataSourceRef | undefined
  resources: MariadbBackupSpecStoragePersistentVolumeClaimResources | undefined
  selector: MariadbBackupSpecStoragePersistentVolumeClaimSelector | undefined
  storageClassName: string | undefined
  volumeMode: string | undefined
  volumeName: string | undefined
}
export interface MariadbBackupSpecStorageVolumeAwsElasticBlockStore {
  fsType: string | undefined
  partition: number | undefined
  readOnly: boolean | undefined
  volumeID: string
}
export interface MariadbBackupSpecStorageVolumeAzureDisk {
  cachingMode: string | undefined
  diskName: string
  diskURI: string
  fsType: string | undefined
  kind: string | undefined
  readOnly: boolean | undefined
}
export interface MariadbBackupSpecStorageVolumeAzureFile {
  readOnly: boolean | undefined
  secretName: string
  shareName: string
}
export interface MariadbBackupSpecStorageVolumeCephfsSecretRef {
  name: string | undefined
}
export interface MariadbBackupSpecStorageVolumeCephfs {
  monitors: Array<string>
  path: string | undefined
  readOnly: boolean | undefined
  secretFile: string | undefined
  secretRef: MariadbBackupSpecStorageVolumeCephfsSecretRef | undefined
  user: string | undefined
}
export interface MariadbBackupSpecStorageVolumeCinderSecretRef {
  name: string | undefined
}
export interface MariadbBackupSpecStorageVolumeCinder {
  fsType: string | undefined
  readOnly: boolean | undefined
  secretRef: MariadbBackupSpecStorageVolumeCinderSecretRef | undefined
  volumeID: string
}
export interface MariadbBackupSpecStorageVolumeConfigMapItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MariadbBackupSpecStorageVolumeConfigMap {
  defaultMode: number | undefined
  items: Array<MariadbBackupSpecStorageVolumeConfigMapItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface MariadbBackupSpecStorageVolumeCsiNodePublishSecretRef {
  name: string | undefined
}
export interface MariadbBackupSpecStorageVolumeCsiVolumeAttributes {
}
export interface MariadbBackupSpecStorageVolumeCsi {
  driver: string
  fsType: string | undefined
  nodePublishSecretRef: MariadbBackupSpecStorageVolumeCsiNodePublishSecretRef | undefined
  readOnly: boolean | undefined
  volumeAttributes: MariadbBackupSpecStorageVolumeCsiVolumeAttributes | undefined
}
export interface MariadbBackupSpecStorageVolumeDownwardAPIItemsItemFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface MariadbBackupSpecStorageVolumeDownwardAPIItemsItemResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface MariadbBackupSpecStorageVolumeDownwardAPIItemsItem {
  fieldRef: MariadbBackupSpecStorageVolumeDownwardAPIItemsItemFieldRef | undefined
  mode: number | undefined
  path: string
  resourceFieldRef: MariadbBackupSpecStorageVolumeDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MariadbBackupSpecStorageVolumeDownwardAPI {
  defaultMode: number | undefined
  items: Array<MariadbBackupSpecStorageVolumeDownwardAPIItemsItem> | undefined
}
export interface MariadbBackupSpecStorageVolumeEmptyDir {
  medium: string | undefined
  sizeLimit: object | undefined
}
export interface MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateMetadata {
}
export interface MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecDataSource {
  apiGroup: string | undefined
  kind: string
  name: string
}
export interface MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecDataSourceRef {
  apiGroup: string | undefined
  kind: string
  name: string
  namespace: string | undefined
}
export interface MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecResourcesClaimsItem {
  name: string
}
export interface MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecResources {
  claims: Array<MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  limits: MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  requests: MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecSelector {
  matchExpressions: Array<MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpec {
  accessModes: Array<string> | undefined
  dataSource: MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecDataSource | undefined
  dataSourceRef: MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  resources: MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecResources | undefined
  selector: MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpecSelector | undefined
  storageClassName: string | undefined
  volumeMode: string | undefined
  volumeName: string | undefined
}
export interface MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplate {
  metadata: MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateMetadata | undefined
  spec: MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplateSpec
}
export interface MariadbBackupSpecStorageVolumeEphemeral {
  volumeClaimTemplate: MariadbBackupSpecStorageVolumeEphemeralVolumeClaimTemplate | undefined
}
export interface MariadbBackupSpecStorageVolumeFc {
  fsType: string | undefined
  lun: number | undefined
  readOnly: boolean | undefined
  targetWWNs: Array<string> | undefined
  wwids: Array<string> | undefined
}
export interface MariadbBackupSpecStorageVolumeFlexVolumeOptions {
}
export interface MariadbBackupSpecStorageVolumeFlexVolumeSecretRef {
  name: string | undefined
}
export interface MariadbBackupSpecStorageVolumeFlexVolume {
  driver: string
  fsType: string | undefined
  options: MariadbBackupSpecStorageVolumeFlexVolumeOptions | undefined
  readOnly: boolean | undefined
  secretRef: MariadbBackupSpecStorageVolumeFlexVolumeSecretRef | undefined
}
export interface MariadbBackupSpecStorageVolumeFlocker {
  datasetName: string | undefined
  datasetUUID: string | undefined
}
export interface MariadbBackupSpecStorageVolumeGcePersistentDisk {
  fsType: string | undefined
  partition: number | undefined
  pdName: string
  readOnly: boolean | undefined
}
export interface MariadbBackupSpecStorageVolumeGitRepo {
  directory: string | undefined
  repository: string
  revision: string | undefined
}
export interface MariadbBackupSpecStorageVolumeGlusterfs {
  endpoints: string
  path: string
  readOnly: boolean | undefined
}
export interface MariadbBackupSpecStorageVolumeHostPath {
  path: string
  type: string | undefined
}
export interface MariadbBackupSpecStorageVolumeIscsiSecretRef {
  name: string | undefined
}
export interface MariadbBackupSpecStorageVolumeIscsi {
  chapAuthDiscovery: boolean | undefined
  chapAuthSession: boolean | undefined
  fsType: string | undefined
  initiatorName: string | undefined
  iqn: string
  iscsiInterface: string | undefined
  lun: number
  portals: Array<string> | undefined
  readOnly: boolean | undefined
  secretRef: MariadbBackupSpecStorageVolumeIscsiSecretRef | undefined
  targetPortal: string
}
export interface MariadbBackupSpecStorageVolumeNfs {
  path: string
  readOnly: boolean | undefined
  server: string
}
export interface MariadbBackupSpecStorageVolumePersistentVolumeClaim {
  claimName: string
  readOnly: boolean | undefined
}
export interface MariadbBackupSpecStorageVolumePhotonPersistentDisk {
  fsType: string | undefined
  pdID: string
}
export interface MariadbBackupSpecStorageVolumePortworxVolume {
  fsType: string | undefined
  readOnly: boolean | undefined
  volumeID: string
}
export interface MariadbBackupSpecStorageVolumeProjectedSourcesItemConfigMapItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MariadbBackupSpecStorageVolumeProjectedSourcesItemConfigMap {
  items: Array<MariadbBackupSpecStorageVolumeProjectedSourcesItemConfigMapItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface MariadbBackupSpecStorageVolumeProjectedSourcesItemDownwardAPIItemsItemFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface MariadbBackupSpecStorageVolumeProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface MariadbBackupSpecStorageVolumeProjectedSourcesItemDownwardAPIItemsItem {
  fieldRef: MariadbBackupSpecStorageVolumeProjectedSourcesItemDownwardAPIItemsItemFieldRef | undefined
  mode: number | undefined
  path: string
  resourceFieldRef: MariadbBackupSpecStorageVolumeProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MariadbBackupSpecStorageVolumeProjectedSourcesItemDownwardAPI {
  items: Array<MariadbBackupSpecStorageVolumeProjectedSourcesItemDownwardAPIItemsItem> | undefined
}
export interface MariadbBackupSpecStorageVolumeProjectedSourcesItemSecretItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MariadbBackupSpecStorageVolumeProjectedSourcesItemSecret {
  items: Array<MariadbBackupSpecStorageVolumeProjectedSourcesItemSecretItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface MariadbBackupSpecStorageVolumeProjectedSourcesItemServiceAccountToken {
  audience: string | undefined
  expirationSeconds: number | undefined
  path: string
}
export interface MariadbBackupSpecStorageVolumeProjectedSourcesItem {
  configMap: MariadbBackupSpecStorageVolumeProjectedSourcesItemConfigMap | undefined
  downwardAPI: MariadbBackupSpecStorageVolumeProjectedSourcesItemDownwardAPI | undefined
  secret: MariadbBackupSpecStorageVolumeProjectedSourcesItemSecret | undefined
  serviceAccountToken: MariadbBackupSpecStorageVolumeProjectedSourcesItemServiceAccountToken | undefined
}
export interface MariadbBackupSpecStorageVolumeProjected {
  defaultMode: number | undefined
  sources: Array<MariadbBackupSpecStorageVolumeProjectedSourcesItem> | undefined
}
export interface MariadbBackupSpecStorageVolumeQuobyte {
  group: string | undefined
  readOnly: boolean | undefined
  registry: string
  tenant: string | undefined
  user: string | undefined
  volume: string
}
export interface MariadbBackupSpecStorageVolumeRbdSecretRef {
  name: string | undefined
}
export interface MariadbBackupSpecStorageVolumeRbd {
  fsType: string | undefined
  image: string
  keyring: string | undefined
  monitors: Array<string>
  pool: string | undefined
  readOnly: boolean | undefined
  secretRef: MariadbBackupSpecStorageVolumeRbdSecretRef | undefined
  user: string | undefined
}
export interface MariadbBackupSpecStorageVolumeScaleIOSecretRef {
  name: string | undefined
}
export interface MariadbBackupSpecStorageVolumeScaleIO {
  fsType: string | undefined
  gateway: string
  protectionDomain: string | undefined
  readOnly: boolean | undefined
  secretRef: MariadbBackupSpecStorageVolumeScaleIOSecretRef
  sslEnabled: boolean | undefined
  storageMode: string | undefined
  storagePool: string | undefined
  system: string
  volumeName: string | undefined
}
export interface MariadbBackupSpecStorageVolumeSecretItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MariadbBackupSpecStorageVolumeSecret {
  defaultMode: number | undefined
  items: Array<MariadbBackupSpecStorageVolumeSecretItemsItem> | undefined
  optional: boolean | undefined
  secretName: string | undefined
}
export interface MariadbBackupSpecStorageVolumeStorageosSecretRef {
  name: string | undefined
}
export interface MariadbBackupSpecStorageVolumeStorageos {
  fsType: string | undefined
  readOnly: boolean | undefined
  secretRef: MariadbBackupSpecStorageVolumeStorageosSecretRef | undefined
  volumeName: string | undefined
  volumeNamespace: string | undefined
}
export interface MariadbBackupSpecStorageVolumeVsphereVolume {
  fsType: string | undefined
  storagePolicyID: string | undefined
  storagePolicyName: string | undefined
  volumePath: string
}
export interface MariadbBackupSpecStorageVolume {
  awsElasticBlockStore: MariadbBackupSpecStorageVolumeAwsElasticBlockStore | undefined
  azureDisk: MariadbBackupSpecStorageVolumeAzureDisk | undefined
  azureFile: MariadbBackupSpecStorageVolumeAzureFile | undefined
  cephfs: MariadbBackupSpecStorageVolumeCephfs | undefined
  cinder: MariadbBackupSpecStorageVolumeCinder | undefined
  configMap: MariadbBackupSpecStorageVolumeConfigMap | undefined
  csi: MariadbBackupSpecStorageVolumeCsi | undefined
  downwardAPI: MariadbBackupSpecStorageVolumeDownwardAPI | undefined
  emptyDir: MariadbBackupSpecStorageVolumeEmptyDir | undefined
  ephemeral: MariadbBackupSpecStorageVolumeEphemeral | undefined
  fc: MariadbBackupSpecStorageVolumeFc | undefined
  flexVolume: MariadbBackupSpecStorageVolumeFlexVolume | undefined
  flocker: MariadbBackupSpecStorageVolumeFlocker | undefined
  gcePersistentDisk: MariadbBackupSpecStorageVolumeGcePersistentDisk | undefined
  gitRepo: MariadbBackupSpecStorageVolumeGitRepo | undefined
  glusterfs: MariadbBackupSpecStorageVolumeGlusterfs | undefined
  hostPath: MariadbBackupSpecStorageVolumeHostPath | undefined
  iscsi: MariadbBackupSpecStorageVolumeIscsi | undefined
  nfs: MariadbBackupSpecStorageVolumeNfs | undefined
  persistentVolumeClaim: MariadbBackupSpecStorageVolumePersistentVolumeClaim | undefined
  photonPersistentDisk: MariadbBackupSpecStorageVolumePhotonPersistentDisk | undefined
  portworxVolume: MariadbBackupSpecStorageVolumePortworxVolume | undefined
  projected: MariadbBackupSpecStorageVolumeProjected | undefined
  quobyte: MariadbBackupSpecStorageVolumeQuobyte | undefined
  rbd: MariadbBackupSpecStorageVolumeRbd | undefined
  scaleIO: MariadbBackupSpecStorageVolumeScaleIO | undefined
  secret: MariadbBackupSpecStorageVolumeSecret | undefined
  storageos: MariadbBackupSpecStorageVolumeStorageos | undefined
  vsphereVolume: MariadbBackupSpecStorageVolumeVsphereVolume | undefined
}
export interface MariadbBackupSpecStorage {
  persistentVolumeClaim: MariadbBackupSpecStoragePersistentVolumeClaim | undefined
  volume: MariadbBackupSpecStorageVolume | undefined
}
export interface MariadbBackupSpecTolerationsItem {
  effect: string | undefined
  key: string | undefined
  operator: string | undefined
  tolerationSeconds: number | undefined
  value: string | undefined
}
export interface MariadbBackupSpec {
  affinity: MariadbBackupSpecAffinity | undefined
  args: Array<string> | undefined
  backoffLimit: number | undefined
  mariaDbRef: MariadbBackupSpecMariaDbRef
  maxRetentionDays: number | undefined
  nodeSelector: MariadbBackupSpecNodeSelector | undefined
  resources: MariadbBackupSpecResources | undefined
  restartPolicy: string | undefined
  schedule: MariadbBackupSpecSchedule | undefined
  storage: MariadbBackupSpecStorage
  tolerations: Array<MariadbBackupSpecTolerationsItem> | undefined
}
export interface MariadbBackup extends KubernetesObject {
  spec: MariadbBackupSpec
  status: MariadbBackupStatus | undefined
}
export type MariadbBackupList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MariadbBackup>
