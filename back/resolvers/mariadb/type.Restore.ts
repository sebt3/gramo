type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MariadbRestoreStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface MariadbRestoreStatus {
  conditions: Array<MariadbRestoreStatusConditionsItem> | undefined
}
export interface MariadbRestoreSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbRestoreSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbRestoreSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  matchExpressions: Array<MariadbRestoreSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  matchFields: Array<MariadbRestoreSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface MariadbRestoreSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  preference: MariadbRestoreSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  weight: number
}
export interface MariadbRestoreSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbRestoreSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbRestoreSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  matchExpressions: Array<MariadbRestoreSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  matchFields: Array<MariadbRestoreSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface MariadbRestoreSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  nodeSelectorTerms: Array<MariadbRestoreSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface MariadbRestoreSpecAffinityNodeAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<MariadbRestoreSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: MariadbRestoreSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  matchExpressions: Array<MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  matchExpressions: Array<MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  labelSelector: MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  namespaceSelector: MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  podAffinityTerm: MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  weight: number
}
export interface MariadbRestoreSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbRestoreSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface MariadbRestoreSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  matchExpressions: Array<MariadbRestoreSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbRestoreSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface MariadbRestoreSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbRestoreSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface MariadbRestoreSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  matchExpressions: Array<MariadbRestoreSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbRestoreSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface MariadbRestoreSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  labelSelector: MariadbRestoreSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  namespaceSelector: MariadbRestoreSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MariadbRestoreSpecAffinityPodAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<MariadbRestoreSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: Array<MariadbRestoreSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  matchExpressions: Array<MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  matchExpressions: Array<MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  labelSelector: MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  namespaceSelector: MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  podAffinityTerm: MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  weight: number
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  matchExpressions: Array<MariadbRestoreSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbRestoreSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  matchExpressions: Array<MariadbRestoreSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbRestoreSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface MariadbRestoreSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  labelSelector: MariadbRestoreSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  namespaceSelector: MariadbRestoreSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  namespaces: Array<string> | undefined
  topologyKey: string
}
export interface MariadbRestoreSpecAffinityPodAntiAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: Array<MariadbRestoreSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  requiredDuringSchedulingIgnoredDuringExecution: Array<MariadbRestoreSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface MariadbRestoreSpecAffinity {
  nodeAffinity: MariadbRestoreSpecAffinityNodeAffinity | undefined
  podAffinity: MariadbRestoreSpecAffinityPodAffinity | undefined
  podAntiAffinity: MariadbRestoreSpecAffinityPodAntiAffinity | undefined
}
export interface MariadbRestoreSpecBackupRef {
  name: string | undefined
}
export interface MariadbRestoreSpecMariaDbRef {
  apiVersion: string | undefined
  fieldPath: string | undefined
  kind: string | undefined
  name: string | undefined
  namespace: string | undefined
  resourceVersion: string | undefined
  uid: string | undefined
  waitForIt: boolean | undefined
}
export interface MariadbRestoreSpecNodeSelector {
}
export interface MariadbRestoreSpecResourcesClaimsItem {
  name: string
}
export interface MariadbRestoreSpecResourcesLimits {
}
export interface MariadbRestoreSpecResourcesRequests {
}
export interface MariadbRestoreSpecResources {
  claims: Array<MariadbRestoreSpecResourcesClaimsItem> | undefined
  limits: MariadbRestoreSpecResourcesLimits | undefined
  requests: MariadbRestoreSpecResourcesRequests | undefined
}
export interface MariadbRestoreSpecTolerationsItem {
  effect: string | undefined
  key: string | undefined
  operator: string | undefined
  tolerationSeconds: number | undefined
  value: string | undefined
}
export interface MariadbRestoreSpecVolumeAwsElasticBlockStore {
  fsType: string | undefined
  partition: number | undefined
  readOnly: boolean | undefined
  volumeID: string
}
export interface MariadbRestoreSpecVolumeAzureDisk {
  cachingMode: string | undefined
  diskName: string
  diskURI: string
  fsType: string | undefined
  kind: string | undefined
  readOnly: boolean | undefined
}
export interface MariadbRestoreSpecVolumeAzureFile {
  readOnly: boolean | undefined
  secretName: string
  shareName: string
}
export interface MariadbRestoreSpecVolumeCephfsSecretRef {
  name: string | undefined
}
export interface MariadbRestoreSpecVolumeCephfs {
  monitors: Array<string>
  path: string | undefined
  readOnly: boolean | undefined
  secretFile: string | undefined
  secretRef: MariadbRestoreSpecVolumeCephfsSecretRef | undefined
  user: string | undefined
}
export interface MariadbRestoreSpecVolumeCinderSecretRef {
  name: string | undefined
}
export interface MariadbRestoreSpecVolumeCinder {
  fsType: string | undefined
  readOnly: boolean | undefined
  secretRef: MariadbRestoreSpecVolumeCinderSecretRef | undefined
  volumeID: string
}
export interface MariadbRestoreSpecVolumeConfigMapItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MariadbRestoreSpecVolumeConfigMap {
  defaultMode: number | undefined
  items: Array<MariadbRestoreSpecVolumeConfigMapItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface MariadbRestoreSpecVolumeCsiNodePublishSecretRef {
  name: string | undefined
}
export interface MariadbRestoreSpecVolumeCsiVolumeAttributes {
}
export interface MariadbRestoreSpecVolumeCsi {
  driver: string
  fsType: string | undefined
  nodePublishSecretRef: MariadbRestoreSpecVolumeCsiNodePublishSecretRef | undefined
  readOnly: boolean | undefined
  volumeAttributes: MariadbRestoreSpecVolumeCsiVolumeAttributes | undefined
}
export interface MariadbRestoreSpecVolumeDownwardAPIItemsItemFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface MariadbRestoreSpecVolumeDownwardAPIItemsItemResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface MariadbRestoreSpecVolumeDownwardAPIItemsItem {
  fieldRef: MariadbRestoreSpecVolumeDownwardAPIItemsItemFieldRef | undefined
  mode: number | undefined
  path: string
  resourceFieldRef: MariadbRestoreSpecVolumeDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MariadbRestoreSpecVolumeDownwardAPI {
  defaultMode: number | undefined
  items: Array<MariadbRestoreSpecVolumeDownwardAPIItemsItem> | undefined
}
export interface MariadbRestoreSpecVolumeEmptyDir {
  medium: string | undefined
  sizeLimit: object | undefined
}
export interface MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateMetadata {
}
export interface MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecDataSource {
  apiGroup: string | undefined
  kind: string
  name: string
}
export interface MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecDataSourceRef {
  apiGroup: string | undefined
  kind: string
  name: string
  namespace: string | undefined
}
export interface MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecResourcesClaimsItem {
  name: string
}
export interface MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecResources {
  claims: Array<MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  limits: MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  requests: MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecSelector {
  matchExpressions: Array<MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  matchLabels: MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpec {
  accessModes: Array<string> | undefined
  dataSource: MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecDataSource | undefined
  dataSourceRef: MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  resources: MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecResources | undefined
  selector: MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpecSelector | undefined
  storageClassName: string | undefined
  volumeMode: string | undefined
  volumeName: string | undefined
}
export interface MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplate {
  metadata: MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateMetadata | undefined
  spec: MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplateSpec
}
export interface MariadbRestoreSpecVolumeEphemeral {
  volumeClaimTemplate: MariadbRestoreSpecVolumeEphemeralVolumeClaimTemplate | undefined
}
export interface MariadbRestoreSpecVolumeFc {
  fsType: string | undefined
  lun: number | undefined
  readOnly: boolean | undefined
  targetWWNs: Array<string> | undefined
  wwids: Array<string> | undefined
}
export interface MariadbRestoreSpecVolumeFlexVolumeOptions {
}
export interface MariadbRestoreSpecVolumeFlexVolumeSecretRef {
  name: string | undefined
}
export interface MariadbRestoreSpecVolumeFlexVolume {
  driver: string
  fsType: string | undefined
  options: MariadbRestoreSpecVolumeFlexVolumeOptions | undefined
  readOnly: boolean | undefined
  secretRef: MariadbRestoreSpecVolumeFlexVolumeSecretRef | undefined
}
export interface MariadbRestoreSpecVolumeFlocker {
  datasetName: string | undefined
  datasetUUID: string | undefined
}
export interface MariadbRestoreSpecVolumeGcePersistentDisk {
  fsType: string | undefined
  partition: number | undefined
  pdName: string
  readOnly: boolean | undefined
}
export interface MariadbRestoreSpecVolumeGitRepo {
  directory: string | undefined
  repository: string
  revision: string | undefined
}
export interface MariadbRestoreSpecVolumeGlusterfs {
  endpoints: string
  path: string
  readOnly: boolean | undefined
}
export interface MariadbRestoreSpecVolumeHostPath {
  path: string
  type: string | undefined
}
export interface MariadbRestoreSpecVolumeIscsiSecretRef {
  name: string | undefined
}
export interface MariadbRestoreSpecVolumeIscsi {
  chapAuthDiscovery: boolean | undefined
  chapAuthSession: boolean | undefined
  fsType: string | undefined
  initiatorName: string | undefined
  iqn: string
  iscsiInterface: string | undefined
  lun: number
  portals: Array<string> | undefined
  readOnly: boolean | undefined
  secretRef: MariadbRestoreSpecVolumeIscsiSecretRef | undefined
  targetPortal: string
}
export interface MariadbRestoreSpecVolumeNfs {
  path: string
  readOnly: boolean | undefined
  server: string
}
export interface MariadbRestoreSpecVolumePersistentVolumeClaim {
  claimName: string
  readOnly: boolean | undefined
}
export interface MariadbRestoreSpecVolumePhotonPersistentDisk {
  fsType: string | undefined
  pdID: string
}
export interface MariadbRestoreSpecVolumePortworxVolume {
  fsType: string | undefined
  readOnly: boolean | undefined
  volumeID: string
}
export interface MariadbRestoreSpecVolumeProjectedSourcesItemConfigMapItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MariadbRestoreSpecVolumeProjectedSourcesItemConfigMap {
  items: Array<MariadbRestoreSpecVolumeProjectedSourcesItemConfigMapItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface MariadbRestoreSpecVolumeProjectedSourcesItemDownwardAPIItemsItemFieldRef {
  apiVersion: string | undefined
  fieldPath: string
}
export interface MariadbRestoreSpecVolumeProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef {
  containerName: string | undefined
  divisor: object | undefined
  resource: string
}
export interface MariadbRestoreSpecVolumeProjectedSourcesItemDownwardAPIItemsItem {
  fieldRef: MariadbRestoreSpecVolumeProjectedSourcesItemDownwardAPIItemsItemFieldRef | undefined
  mode: number | undefined
  path: string
  resourceFieldRef: MariadbRestoreSpecVolumeProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MariadbRestoreSpecVolumeProjectedSourcesItemDownwardAPI {
  items: Array<MariadbRestoreSpecVolumeProjectedSourcesItemDownwardAPIItemsItem> | undefined
}
export interface MariadbRestoreSpecVolumeProjectedSourcesItemSecretItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MariadbRestoreSpecVolumeProjectedSourcesItemSecret {
  items: Array<MariadbRestoreSpecVolumeProjectedSourcesItemSecretItemsItem> | undefined
  name: string | undefined
  optional: boolean | undefined
}
export interface MariadbRestoreSpecVolumeProjectedSourcesItemServiceAccountToken {
  audience: string | undefined
  expirationSeconds: number | undefined
  path: string
}
export interface MariadbRestoreSpecVolumeProjectedSourcesItem {
  configMap: MariadbRestoreSpecVolumeProjectedSourcesItemConfigMap | undefined
  downwardAPI: MariadbRestoreSpecVolumeProjectedSourcesItemDownwardAPI | undefined
  secret: MariadbRestoreSpecVolumeProjectedSourcesItemSecret | undefined
  serviceAccountToken: MariadbRestoreSpecVolumeProjectedSourcesItemServiceAccountToken | undefined
}
export interface MariadbRestoreSpecVolumeProjected {
  defaultMode: number | undefined
  sources: Array<MariadbRestoreSpecVolumeProjectedSourcesItem> | undefined
}
export interface MariadbRestoreSpecVolumeQuobyte {
  group: string | undefined
  readOnly: boolean | undefined
  registry: string
  tenant: string | undefined
  user: string | undefined
  volume: string
}
export interface MariadbRestoreSpecVolumeRbdSecretRef {
  name: string | undefined
}
export interface MariadbRestoreSpecVolumeRbd {
  fsType: string | undefined
  image: string
  keyring: string | undefined
  monitors: Array<string>
  pool: string | undefined
  readOnly: boolean | undefined
  secretRef: MariadbRestoreSpecVolumeRbdSecretRef | undefined
  user: string | undefined
}
export interface MariadbRestoreSpecVolumeScaleIOSecretRef {
  name: string | undefined
}
export interface MariadbRestoreSpecVolumeScaleIO {
  fsType: string | undefined
  gateway: string
  protectionDomain: string | undefined
  readOnly: boolean | undefined
  secretRef: MariadbRestoreSpecVolumeScaleIOSecretRef
  sslEnabled: boolean | undefined
  storageMode: string | undefined
  storagePool: string | undefined
  system: string
  volumeName: string | undefined
}
export interface MariadbRestoreSpecVolumeSecretItemsItem {
  key: string
  mode: number | undefined
  path: string
}
export interface MariadbRestoreSpecVolumeSecret {
  defaultMode: number | undefined
  items: Array<MariadbRestoreSpecVolumeSecretItemsItem> | undefined
  optional: boolean | undefined
  secretName: string | undefined
}
export interface MariadbRestoreSpecVolumeStorageosSecretRef {
  name: string | undefined
}
export interface MariadbRestoreSpecVolumeStorageos {
  fsType: string | undefined
  readOnly: boolean | undefined
  secretRef: MariadbRestoreSpecVolumeStorageosSecretRef | undefined
  volumeName: string | undefined
  volumeNamespace: string | undefined
}
export interface MariadbRestoreSpecVolumeVsphereVolume {
  fsType: string | undefined
  storagePolicyID: string | undefined
  storagePolicyName: string | undefined
  volumePath: string
}
export interface MariadbRestoreSpecVolume {
  awsElasticBlockStore: MariadbRestoreSpecVolumeAwsElasticBlockStore | undefined
  azureDisk: MariadbRestoreSpecVolumeAzureDisk | undefined
  azureFile: MariadbRestoreSpecVolumeAzureFile | undefined
  cephfs: MariadbRestoreSpecVolumeCephfs | undefined
  cinder: MariadbRestoreSpecVolumeCinder | undefined
  configMap: MariadbRestoreSpecVolumeConfigMap | undefined
  csi: MariadbRestoreSpecVolumeCsi | undefined
  downwardAPI: MariadbRestoreSpecVolumeDownwardAPI | undefined
  emptyDir: MariadbRestoreSpecVolumeEmptyDir | undefined
  ephemeral: MariadbRestoreSpecVolumeEphemeral | undefined
  fc: MariadbRestoreSpecVolumeFc | undefined
  flexVolume: MariadbRestoreSpecVolumeFlexVolume | undefined
  flocker: MariadbRestoreSpecVolumeFlocker | undefined
  gcePersistentDisk: MariadbRestoreSpecVolumeGcePersistentDisk | undefined
  gitRepo: MariadbRestoreSpecVolumeGitRepo | undefined
  glusterfs: MariadbRestoreSpecVolumeGlusterfs | undefined
  hostPath: MariadbRestoreSpecVolumeHostPath | undefined
  iscsi: MariadbRestoreSpecVolumeIscsi | undefined
  nfs: MariadbRestoreSpecVolumeNfs | undefined
  persistentVolumeClaim: MariadbRestoreSpecVolumePersistentVolumeClaim | undefined
  photonPersistentDisk: MariadbRestoreSpecVolumePhotonPersistentDisk | undefined
  portworxVolume: MariadbRestoreSpecVolumePortworxVolume | undefined
  projected: MariadbRestoreSpecVolumeProjected | undefined
  quobyte: MariadbRestoreSpecVolumeQuobyte | undefined
  rbd: MariadbRestoreSpecVolumeRbd | undefined
  scaleIO: MariadbRestoreSpecVolumeScaleIO | undefined
  secret: MariadbRestoreSpecVolumeSecret | undefined
  storageos: MariadbRestoreSpecVolumeStorageos | undefined
  vsphereVolume: MariadbRestoreSpecVolumeVsphereVolume | undefined
}
export interface MariadbRestoreSpec {
  affinity: MariadbRestoreSpecAffinity | undefined
  backoffLimit: number | undefined
  backupRef: MariadbRestoreSpecBackupRef | undefined
  fileName: string | undefined
  mariaDbRef: MariadbRestoreSpecMariaDbRef
  nodeSelector: MariadbRestoreSpecNodeSelector | undefined
  resources: MariadbRestoreSpecResources | undefined
  restartPolicy: string | undefined
  tolerations: Array<MariadbRestoreSpecTolerationsItem> | undefined
  volume: MariadbRestoreSpecVolume | undefined
}
export interface MariadbRestore extends KubernetesObject {
  spec: MariadbRestoreSpec
  status: MariadbRestoreStatus | undefined
}
export type MariadbRestoreList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MariadbRestore>
