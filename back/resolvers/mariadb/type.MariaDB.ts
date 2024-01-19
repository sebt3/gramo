type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MariadbMariaDBStatusConditionsItem {
  "lastTransitionTime": string
  "message": string
  "observedGeneration": number | undefined
  "reason": string
  "status": string
  "type": string
}
export interface MariadbMariaDBStatusGaleraRecoveryBootstrap {
  "pod": string | undefined
  "time": string | undefined
}
export interface MariadbMariaDBStatusGaleraRecoveryRecovered {
}
export interface MariadbMariaDBStatusGaleraRecoveryState {
}
export interface MariadbMariaDBStatusGaleraRecovery {
  "bootstrap": MariadbMariaDBStatusGaleraRecoveryBootstrap | undefined
  "recovered": MariadbMariaDBStatusGaleraRecoveryRecovered | undefined
  "state": MariadbMariaDBStatusGaleraRecoveryState | undefined
}
export interface MariadbMariaDBStatus {
  "conditions": Array<MariadbMariaDBStatusConditionsItem> | undefined
  "currentPrimary": string | undefined
  "currentPrimaryPodIndex": number | undefined
  "galeraRecovery": MariadbMariaDBStatusGaleraRecovery | undefined
}
export interface MariadbMariaDBSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  "matchExpressions": Array<MariadbMariaDBSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  "matchFields": Array<MariadbMariaDBSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface MariadbMariaDBSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "preference": MariadbMariaDBSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  "weight": number
}
export interface MariadbMariaDBSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  "matchExpressions": Array<MariadbMariaDBSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  "matchFields": Array<MariadbMariaDBSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface MariadbMariaDBSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  "nodeSelectorTerms": Array<MariadbMariaDBSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface MariadbMariaDBSpecAffinityNodeAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<MariadbMariaDBSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": MariadbMariaDBSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface MariadbMariaDBSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface MariadbMariaDBSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<MariadbMariaDBSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": MariadbMariaDBSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface MariadbMariaDBSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface MariadbMariaDBSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<MariadbMariaDBSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MariadbMariaDBSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface MariadbMariaDBSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": MariadbMariaDBSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": MariadbMariaDBSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface MariadbMariaDBSpecAffinityPodAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<MariadbMariaDBSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<MariadbMariaDBSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<MariadbMariaDBSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": MariadbMariaDBSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<MariadbMariaDBSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MariadbMariaDBSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": MariadbMariaDBSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": MariadbMariaDBSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface MariadbMariaDBSpecAffinityPodAntiAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<MariadbMariaDBSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<MariadbMariaDBSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface MariadbMariaDBSpecAffinity {
  "nodeAffinity": MariadbMariaDBSpecAffinityNodeAffinity | undefined
  "podAffinity": MariadbMariaDBSpecAffinityPodAffinity | undefined
  "podAntiAffinity": MariadbMariaDBSpecAffinityPodAntiAffinity | undefined
}
export interface MariadbMariaDBSpecBootstrapFromBackupRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeAwsElasticBlockStore {
  "fsType": string | undefined
  "partition": number | undefined
  "readOnly": boolean | undefined
  "volumeID": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeAzureDisk {
  "cachingMode": string | undefined
  "diskName": string
  "diskURI": string
  "fsType": string | undefined
  "kind": string | undefined
  "readOnly": boolean | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeAzureFile {
  "readOnly": boolean | undefined
  "secretName": string
  "shareName": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeCephfsSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeCephfs {
  "monitors": Array<string>
  "path": string | undefined
  "readOnly": boolean | undefined
  "secretFile": string | undefined
  "secretRef": MariadbMariaDBSpecBootstrapFromVolumeCephfsSecretRef | undefined
  "user": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeCinderSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeCinder {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MariadbMariaDBSpecBootstrapFromVolumeCinderSecretRef | undefined
  "volumeID": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeConfigMapItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeConfigMap {
  "defaultMode": number | undefined
  "items": Array<MariadbMariaDBSpecBootstrapFromVolumeConfigMapItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeCsiNodePublishSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeCsiVolumeAttributes {
}
export interface MariadbMariaDBSpecBootstrapFromVolumeCsi {
  "driver": string
  "fsType": string | undefined
  "nodePublishSecretRef": MariadbMariaDBSpecBootstrapFromVolumeCsiNodePublishSecretRef | undefined
  "readOnly": boolean | undefined
  "volumeAttributes": MariadbMariaDBSpecBootstrapFromVolumeCsiVolumeAttributes | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeDownwardAPIItemsItemFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeDownwardAPIItemsItemResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeDownwardAPIItemsItem {
  "fieldRef": MariadbMariaDBSpecBootstrapFromVolumeDownwardAPIItemsItemFieldRef | undefined
  "mode": number | undefined
  "path": string
  "resourceFieldRef": MariadbMariaDBSpecBootstrapFromVolumeDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeDownwardAPI {
  "defaultMode": number | undefined
  "items": Array<MariadbMariaDBSpecBootstrapFromVolumeDownwardAPIItemsItem> | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeEmptyDir {
  "medium": string | undefined
  "sizeLimit": object | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateMetadata {
}
export interface MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
  "namespace": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecResourcesClaimsItem {
  "name": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecResources {
  "claims": Array<MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  "limits": MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  "requests": MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecSelector {
  "matchExpressions": Array<MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  "matchLabels": MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpec {
  "accessModes": Array<string> | undefined
  "dataSource": MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecDataSource | undefined
  "dataSourceRef": MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  "resources": MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecResources | undefined
  "selector": MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpecSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplate {
  "metadata": MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateMetadata | undefined
  "spec": MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplateSpec
}
export interface MariadbMariaDBSpecBootstrapFromVolumeEphemeral {
  "volumeClaimTemplate": MariadbMariaDBSpecBootstrapFromVolumeEphemeralVolumeClaimTemplate | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeFc {
  "fsType": string | undefined
  "lun": number | undefined
  "readOnly": boolean | undefined
  "targetWWNs": Array<string> | undefined
  "wwids": Array<string> | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeFlexVolumeOptions {
}
export interface MariadbMariaDBSpecBootstrapFromVolumeFlexVolumeSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeFlexVolume {
  "driver": string
  "fsType": string | undefined
  "options": MariadbMariaDBSpecBootstrapFromVolumeFlexVolumeOptions | undefined
  "readOnly": boolean | undefined
  "secretRef": MariadbMariaDBSpecBootstrapFromVolumeFlexVolumeSecretRef | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeFlocker {
  "datasetName": string | undefined
  "datasetUUID": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeGcePersistentDisk {
  "fsType": string | undefined
  "partition": number | undefined
  "pdName": string
  "readOnly": boolean | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeGitRepo {
  "directory": string | undefined
  "repository": string
  "revision": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeGlusterfs {
  "endpoints": string
  "path": string
  "readOnly": boolean | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeHostPath {
  "path": string
  "type": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeIscsiSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeIscsi {
  "chapAuthDiscovery": boolean | undefined
  "chapAuthSession": boolean | undefined
  "fsType": string | undefined
  "initiatorName": string | undefined
  "iqn": string
  "iscsiInterface": string | undefined
  "lun": number
  "portals": Array<string> | undefined
  "readOnly": boolean | undefined
  "secretRef": MariadbMariaDBSpecBootstrapFromVolumeIscsiSecretRef | undefined
  "targetPortal": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeNfs {
  "path": string
  "readOnly": boolean | undefined
  "server": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumePersistentVolumeClaim {
  "claimName": string
  "readOnly": boolean | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumePhotonPersistentDisk {
  "fsType": string | undefined
  "pdID": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumePortworxVolume {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "volumeID": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemConfigMapItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemConfigMap {
  "items": Array<MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemConfigMapItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemDownwardAPIItemsItemFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemDownwardAPIItemsItem {
  "fieldRef": MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemDownwardAPIItemsItemFieldRef | undefined
  "mode": number | undefined
  "path": string
  "resourceFieldRef": MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemDownwardAPI {
  "items": Array<MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemDownwardAPIItemsItem> | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemSecretItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemSecret {
  "items": Array<MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemSecretItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemServiceAccountToken {
  "audience": string | undefined
  "expirationSeconds": number | undefined
  "path": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItem {
  "configMap": MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemConfigMap | undefined
  "downwardAPI": MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemDownwardAPI | undefined
  "secret": MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemSecret | undefined
  "serviceAccountToken": MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItemServiceAccountToken | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeProjected {
  "defaultMode": number | undefined
  "sources": Array<MariadbMariaDBSpecBootstrapFromVolumeProjectedSourcesItem> | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeQuobyte {
  "group": string | undefined
  "readOnly": boolean | undefined
  "registry": string
  "tenant": string | undefined
  "user": string | undefined
  "volume": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeRbdSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeRbd {
  "fsType": string | undefined
  "image": string
  "keyring": string | undefined
  "monitors": Array<string>
  "pool": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MariadbMariaDBSpecBootstrapFromVolumeRbdSecretRef | undefined
  "user": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeScaleIOSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeScaleIO {
  "fsType": string | undefined
  "gateway": string
  "protectionDomain": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MariadbMariaDBSpecBootstrapFromVolumeScaleIOSecretRef
  "sslEnabled": boolean | undefined
  "storageMode": string | undefined
  "storagePool": string | undefined
  "system": string
  "volumeName": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeSecretItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MariadbMariaDBSpecBootstrapFromVolumeSecret {
  "defaultMode": number | undefined
  "items": Array<MariadbMariaDBSpecBootstrapFromVolumeSecretItemsItem> | undefined
  "optional": boolean | undefined
  "secretName": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeStorageosSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeStorageos {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MariadbMariaDBSpecBootstrapFromVolumeStorageosSecretRef | undefined
  "volumeName": string | undefined
  "volumeNamespace": string | undefined
}
export interface MariadbMariaDBSpecBootstrapFromVolumeVsphereVolume {
  "fsType": string | undefined
  "storagePolicyID": string | undefined
  "storagePolicyName": string | undefined
  "volumePath": string
}
export interface MariadbMariaDBSpecBootstrapFromVolume {
  "awsElasticBlockStore": MariadbMariaDBSpecBootstrapFromVolumeAwsElasticBlockStore | undefined
  "azureDisk": MariadbMariaDBSpecBootstrapFromVolumeAzureDisk | undefined
  "azureFile": MariadbMariaDBSpecBootstrapFromVolumeAzureFile | undefined
  "cephfs": MariadbMariaDBSpecBootstrapFromVolumeCephfs | undefined
  "cinder": MariadbMariaDBSpecBootstrapFromVolumeCinder | undefined
  "configMap": MariadbMariaDBSpecBootstrapFromVolumeConfigMap | undefined
  "csi": MariadbMariaDBSpecBootstrapFromVolumeCsi | undefined
  "downwardAPI": MariadbMariaDBSpecBootstrapFromVolumeDownwardAPI | undefined
  "emptyDir": MariadbMariaDBSpecBootstrapFromVolumeEmptyDir | undefined
  "ephemeral": MariadbMariaDBSpecBootstrapFromVolumeEphemeral | undefined
  "fc": MariadbMariaDBSpecBootstrapFromVolumeFc | undefined
  "flexVolume": MariadbMariaDBSpecBootstrapFromVolumeFlexVolume | undefined
  "flocker": MariadbMariaDBSpecBootstrapFromVolumeFlocker | undefined
  "gcePersistentDisk": MariadbMariaDBSpecBootstrapFromVolumeGcePersistentDisk | undefined
  "gitRepo": MariadbMariaDBSpecBootstrapFromVolumeGitRepo | undefined
  "glusterfs": MariadbMariaDBSpecBootstrapFromVolumeGlusterfs | undefined
  "hostPath": MariadbMariaDBSpecBootstrapFromVolumeHostPath | undefined
  "iscsi": MariadbMariaDBSpecBootstrapFromVolumeIscsi | undefined
  "nfs": MariadbMariaDBSpecBootstrapFromVolumeNfs | undefined
  "persistentVolumeClaim": MariadbMariaDBSpecBootstrapFromVolumePersistentVolumeClaim | undefined
  "photonPersistentDisk": MariadbMariaDBSpecBootstrapFromVolumePhotonPersistentDisk | undefined
  "portworxVolume": MariadbMariaDBSpecBootstrapFromVolumePortworxVolume | undefined
  "projected": MariadbMariaDBSpecBootstrapFromVolumeProjected | undefined
  "quobyte": MariadbMariaDBSpecBootstrapFromVolumeQuobyte | undefined
  "rbd": MariadbMariaDBSpecBootstrapFromVolumeRbd | undefined
  "scaleIO": MariadbMariaDBSpecBootstrapFromVolumeScaleIO | undefined
  "secret": MariadbMariaDBSpecBootstrapFromVolumeSecret | undefined
  "storageos": MariadbMariaDBSpecBootstrapFromVolumeStorageos | undefined
  "vsphereVolume": MariadbMariaDBSpecBootstrapFromVolumeVsphereVolume | undefined
}
export interface MariadbMariaDBSpecBootstrapFrom {
  "backupRef": MariadbMariaDBSpecBootstrapFromBackupRef | undefined
  "fileName": string | undefined
  "volume": MariadbMariaDBSpecBootstrapFromVolume | undefined
}
export interface MariadbMariaDBSpecConnectionHealthCheck {
  "interval": string | undefined
  "retryInterval": string | undefined
}
export interface MariadbMariaDBSpecConnectionParams {
}
export interface MariadbMariaDBSpecConnectionSecretTemplateAnnotations {
}
export interface MariadbMariaDBSpecConnectionSecretTemplateLabels {
}
export interface MariadbMariaDBSpecConnectionSecretTemplate {
  "annotations": MariadbMariaDBSpecConnectionSecretTemplateAnnotations | undefined
  "databaseKey": string | undefined
  "format": string | undefined
  "hostKey": string | undefined
  "key": string | undefined
  "labels": MariadbMariaDBSpecConnectionSecretTemplateLabels | undefined
  "passwordKey": string | undefined
  "portKey": string | undefined
  "usernameKey": string | undefined
}
export interface MariadbMariaDBSpecConnection {
  "healthCheck": MariadbMariaDBSpecConnectionHealthCheck | undefined
  "params": MariadbMariaDBSpecConnectionParams | undefined
  "secretName": string | undefined
  "secretTemplate": MariadbMariaDBSpecConnectionSecretTemplate | undefined
  "serviceName": string | undefined
}
export interface MariadbMariaDBSpecEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MariadbMariaDBSpecEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MariadbMariaDBSpecEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecEnvItemValueFrom {
  "configMapKeyRef": MariadbMariaDBSpecEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": MariadbMariaDBSpecEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": MariadbMariaDBSpecEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": MariadbMariaDBSpecEnvItemValueFromSecretKeyRef | undefined
}
export interface MariadbMariaDBSpecEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": MariadbMariaDBSpecEnvItemValueFrom | undefined
}
export interface MariadbMariaDBSpecEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecEnvFromItem {
  "configMapRef": MariadbMariaDBSpecEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": MariadbMariaDBSpecEnvFromItemSecretRef | undefined
}
export interface MariadbMariaDBSpecGaleraAgentEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecGaleraAgentEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MariadbMariaDBSpecGaleraAgentEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MariadbMariaDBSpecGaleraAgentEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecGaleraAgentEnvItemValueFrom {
  "configMapKeyRef": MariadbMariaDBSpecGaleraAgentEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": MariadbMariaDBSpecGaleraAgentEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": MariadbMariaDBSpecGaleraAgentEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": MariadbMariaDBSpecGaleraAgentEnvItemValueFromSecretKeyRef | undefined
}
export interface MariadbMariaDBSpecGaleraAgentEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": MariadbMariaDBSpecGaleraAgentEnvItemValueFrom | undefined
}
export interface MariadbMariaDBSpecGaleraAgentEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecGaleraAgentEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecGaleraAgentEnvFromItem {
  "configMapRef": MariadbMariaDBSpecGaleraAgentEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": MariadbMariaDBSpecGaleraAgentEnvFromItemSecretRef | undefined
}
export interface MariadbMariaDBSpecGaleraAgentKubernetesAuth {
  "authDelegatorRoleName": string | undefined
  "enabled": boolean | undefined
}
export interface MariadbMariaDBSpecGaleraAgentLivenessProbeExec {
  "command": Array<string> | undefined
}
export interface MariadbMariaDBSpecGaleraAgentLivenessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MariadbMariaDBSpecGaleraAgentLivenessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MariadbMariaDBSpecGaleraAgentLivenessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MariadbMariaDBSpecGaleraAgentLivenessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MariadbMariaDBSpecGaleraAgentLivenessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MariadbMariaDBSpecGaleraAgentLivenessProbe {
  "exec": MariadbMariaDBSpecGaleraAgentLivenessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MariadbMariaDBSpecGaleraAgentLivenessProbeGrpc | undefined
  "httpGet": MariadbMariaDBSpecGaleraAgentLivenessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MariadbMariaDBSpecGaleraAgentLivenessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MariadbMariaDBSpecGaleraAgentReadinessProbeExec {
  "command": Array<string> | undefined
}
export interface MariadbMariaDBSpecGaleraAgentReadinessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MariadbMariaDBSpecGaleraAgentReadinessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MariadbMariaDBSpecGaleraAgentReadinessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MariadbMariaDBSpecGaleraAgentReadinessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MariadbMariaDBSpecGaleraAgentReadinessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MariadbMariaDBSpecGaleraAgentReadinessProbe {
  "exec": MariadbMariaDBSpecGaleraAgentReadinessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MariadbMariaDBSpecGaleraAgentReadinessProbeGrpc | undefined
  "httpGet": MariadbMariaDBSpecGaleraAgentReadinessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MariadbMariaDBSpecGaleraAgentReadinessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MariadbMariaDBSpecGaleraAgentResourcesClaimsItem {
  "name": string
}
export interface MariadbMariaDBSpecGaleraAgentResourcesLimits {
}
export interface MariadbMariaDBSpecGaleraAgentResourcesRequests {
}
export interface MariadbMariaDBSpecGaleraAgentResources {
  "claims": Array<MariadbMariaDBSpecGaleraAgentResourcesClaimsItem> | undefined
  "limits": MariadbMariaDBSpecGaleraAgentResourcesLimits | undefined
  "requests": MariadbMariaDBSpecGaleraAgentResourcesRequests | undefined
}
export interface MariadbMariaDBSpecGaleraAgentSecurityContextCapabilities {
  "add": Array<string> | undefined
  "drop": Array<string> | undefined
}
export interface MariadbMariaDBSpecGaleraAgentSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface MariadbMariaDBSpecGaleraAgentSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface MariadbMariaDBSpecGaleraAgentSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface MariadbMariaDBSpecGaleraAgentSecurityContext {
  "allowPrivilegeEscalation": boolean | undefined
  "capabilities": MariadbMariaDBSpecGaleraAgentSecurityContextCapabilities | undefined
  "privileged": boolean | undefined
  "procMount": string | undefined
  "readOnlyRootFilesystem": boolean | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": MariadbMariaDBSpecGaleraAgentSecurityContextSeLinuxOptions | undefined
  "seccompProfile": MariadbMariaDBSpecGaleraAgentSecurityContextSeccompProfile | undefined
  "windowsOptions": MariadbMariaDBSpecGaleraAgentSecurityContextWindowsOptions | undefined
}
export interface MariadbMariaDBSpecGaleraAgentVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface MariadbMariaDBSpecGaleraAgent {
  "args": Array<string> | undefined
  "command": Array<string> | undefined
  "env": Array<MariadbMariaDBSpecGaleraAgentEnvItem> | undefined
  "envFrom": Array<MariadbMariaDBSpecGaleraAgentEnvFromItem> | undefined
  "gracefulShutdownTimeout": string | undefined
  "image": string
  "imagePullPolicy": string | undefined
  "kubernetesAuth": MariadbMariaDBSpecGaleraAgentKubernetesAuth | undefined
  "livenessProbe": MariadbMariaDBSpecGaleraAgentLivenessProbe | undefined
  "port": number | undefined
  "readinessProbe": MariadbMariaDBSpecGaleraAgentReadinessProbe | undefined
  "resources": MariadbMariaDBSpecGaleraAgentResources | undefined
  "securityContext": MariadbMariaDBSpecGaleraAgentSecurityContext | undefined
  "volumeMounts": Array<MariadbMariaDBSpecGaleraAgentVolumeMountsItem> | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MariadbMariaDBSpecGaleraInitContainerEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MariadbMariaDBSpecGaleraInitContainerEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerEnvItemValueFrom {
  "configMapKeyRef": MariadbMariaDBSpecGaleraInitContainerEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": MariadbMariaDBSpecGaleraInitContainerEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": MariadbMariaDBSpecGaleraInitContainerEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": MariadbMariaDBSpecGaleraInitContainerEnvItemValueFromSecretKeyRef | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": MariadbMariaDBSpecGaleraInitContainerEnvItemValueFrom | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerEnvFromItem {
  "configMapRef": MariadbMariaDBSpecGaleraInitContainerEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": MariadbMariaDBSpecGaleraInitContainerEnvFromItemSecretRef | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerLivenessProbeExec {
  "command": Array<string> | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerLivenessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerLivenessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MariadbMariaDBSpecGaleraInitContainerLivenessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MariadbMariaDBSpecGaleraInitContainerLivenessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerLivenessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MariadbMariaDBSpecGaleraInitContainerLivenessProbe {
  "exec": MariadbMariaDBSpecGaleraInitContainerLivenessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MariadbMariaDBSpecGaleraInitContainerLivenessProbeGrpc | undefined
  "httpGet": MariadbMariaDBSpecGaleraInitContainerLivenessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MariadbMariaDBSpecGaleraInitContainerLivenessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerReadinessProbeExec {
  "command": Array<string> | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerReadinessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerReadinessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MariadbMariaDBSpecGaleraInitContainerReadinessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MariadbMariaDBSpecGaleraInitContainerReadinessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerReadinessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MariadbMariaDBSpecGaleraInitContainerReadinessProbe {
  "exec": MariadbMariaDBSpecGaleraInitContainerReadinessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MariadbMariaDBSpecGaleraInitContainerReadinessProbeGrpc | undefined
  "httpGet": MariadbMariaDBSpecGaleraInitContainerReadinessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MariadbMariaDBSpecGaleraInitContainerReadinessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerResourcesClaimsItem {
  "name": string
}
export interface MariadbMariaDBSpecGaleraInitContainerResourcesLimits {
}
export interface MariadbMariaDBSpecGaleraInitContainerResourcesRequests {
}
export interface MariadbMariaDBSpecGaleraInitContainerResources {
  "claims": Array<MariadbMariaDBSpecGaleraInitContainerResourcesClaimsItem> | undefined
  "limits": MariadbMariaDBSpecGaleraInitContainerResourcesLimits | undefined
  "requests": MariadbMariaDBSpecGaleraInitContainerResourcesRequests | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerSecurityContextCapabilities {
  "add": Array<string> | undefined
  "drop": Array<string> | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface MariadbMariaDBSpecGaleraInitContainerSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerSecurityContext {
  "allowPrivilegeEscalation": boolean | undefined
  "capabilities": MariadbMariaDBSpecGaleraInitContainerSecurityContextCapabilities | undefined
  "privileged": boolean | undefined
  "procMount": string | undefined
  "readOnlyRootFilesystem": boolean | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": MariadbMariaDBSpecGaleraInitContainerSecurityContextSeLinuxOptions | undefined
  "seccompProfile": MariadbMariaDBSpecGaleraInitContainerSecurityContextSeccompProfile | undefined
  "windowsOptions": MariadbMariaDBSpecGaleraInitContainerSecurityContextWindowsOptions | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainerVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface MariadbMariaDBSpecGaleraInitContainer {
  "args": Array<string> | undefined
  "command": Array<string> | undefined
  "env": Array<MariadbMariaDBSpecGaleraInitContainerEnvItem> | undefined
  "envFrom": Array<MariadbMariaDBSpecGaleraInitContainerEnvFromItem> | undefined
  "image": string
  "imagePullPolicy": string | undefined
  "livenessProbe": MariadbMariaDBSpecGaleraInitContainerLivenessProbe | undefined
  "readinessProbe": MariadbMariaDBSpecGaleraInitContainerReadinessProbe | undefined
  "resources": MariadbMariaDBSpecGaleraInitContainerResources | undefined
  "securityContext": MariadbMariaDBSpecGaleraInitContainerSecurityContext | undefined
  "volumeMounts": Array<MariadbMariaDBSpecGaleraInitContainerVolumeMountsItem> | undefined
}
export interface MariadbMariaDBSpecGaleraPrimary {
  "automaticFailover": boolean | undefined
  "podIndex": number | undefined
}
export interface MariadbMariaDBSpecGaleraRecovery {
  "clusterBootstrapTimeout": string | undefined
  "clusterHealthyTimeout": string | undefined
  "enabled": boolean | undefined
  "podRecoveryTimeout": string | undefined
  "podSyncTimeout": string | undefined
}
export interface MariadbMariaDBSpecGaleraVolumeClaimTemplateAnnotations {
}
export interface MariadbMariaDBSpecGaleraVolumeClaimTemplateDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface MariadbMariaDBSpecGaleraVolumeClaimTemplateDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
  "namespace": string | undefined
}
export interface MariadbMariaDBSpecGaleraVolumeClaimTemplateLabels {
}
export interface MariadbMariaDBSpecGaleraVolumeClaimTemplateResourcesClaimsItem {
  "name": string
}
export interface MariadbMariaDBSpecGaleraVolumeClaimTemplateResourcesLimits {
}
export interface MariadbMariaDBSpecGaleraVolumeClaimTemplateResourcesRequests {
}
export interface MariadbMariaDBSpecGaleraVolumeClaimTemplateResources {
  "claims": Array<MariadbMariaDBSpecGaleraVolumeClaimTemplateResourcesClaimsItem> | undefined
  "limits": MariadbMariaDBSpecGaleraVolumeClaimTemplateResourcesLimits | undefined
  "requests": MariadbMariaDBSpecGaleraVolumeClaimTemplateResourcesRequests | undefined
}
export interface MariadbMariaDBSpecGaleraVolumeClaimTemplateSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecGaleraVolumeClaimTemplateSelectorMatchLabels {
}
export interface MariadbMariaDBSpecGaleraVolumeClaimTemplateSelector {
  "matchExpressions": Array<MariadbMariaDBSpecGaleraVolumeClaimTemplateSelectorMatchExpressionsItem> | undefined
  "matchLabels": MariadbMariaDBSpecGaleraVolumeClaimTemplateSelectorMatchLabels | undefined
}
export interface MariadbMariaDBSpecGaleraVolumeClaimTemplate {
  "accessModes": Array<string> | undefined
  "annotations": MariadbMariaDBSpecGaleraVolumeClaimTemplateAnnotations | undefined
  "dataSource": MariadbMariaDBSpecGaleraVolumeClaimTemplateDataSource | undefined
  "dataSourceRef": MariadbMariaDBSpecGaleraVolumeClaimTemplateDataSourceRef | undefined
  "labels": MariadbMariaDBSpecGaleraVolumeClaimTemplateLabels | undefined
  "resources": MariadbMariaDBSpecGaleraVolumeClaimTemplateResources | undefined
  "selector": MariadbMariaDBSpecGaleraVolumeClaimTemplateSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface MariadbMariaDBSpecGalera {
  "agent": MariadbMariaDBSpecGaleraAgent | undefined
  "enabled": boolean | undefined
  "initContainer": MariadbMariaDBSpecGaleraInitContainer | undefined
  "primary": MariadbMariaDBSpecGaleraPrimary | undefined
  "recovery": MariadbMariaDBSpecGaleraRecovery | undefined
  "replicaThreads": number | undefined
  "sst": string | undefined
  "volumeClaimTemplate": MariadbMariaDBSpecGaleraVolumeClaimTemplate | undefined
}
export interface MariadbMariaDBSpecImagePullSecretsItem {
  "name": string | undefined
}
export interface MariadbMariaDBSpecInheritMetadataAnnotations {
}
export interface MariadbMariaDBSpecInheritMetadataLabels {
}
export interface MariadbMariaDBSpecInheritMetadata {
  "annotations": MariadbMariaDBSpecInheritMetadataAnnotations | undefined
  "labels": MariadbMariaDBSpecInheritMetadataLabels | undefined
}
export interface MariadbMariaDBSpecInitContainersItemEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecInitContainersItemEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MariadbMariaDBSpecInitContainersItemEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MariadbMariaDBSpecInitContainersItemEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecInitContainersItemEnvItemValueFrom {
  "configMapKeyRef": MariadbMariaDBSpecInitContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": MariadbMariaDBSpecInitContainersItemEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": MariadbMariaDBSpecInitContainersItemEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": MariadbMariaDBSpecInitContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface MariadbMariaDBSpecInitContainersItemEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": MariadbMariaDBSpecInitContainersItemEnvItemValueFrom | undefined
}
export interface MariadbMariaDBSpecInitContainersItemEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecInitContainersItemEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecInitContainersItemEnvFromItem {
  "configMapRef": MariadbMariaDBSpecInitContainersItemEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": MariadbMariaDBSpecInitContainersItemEnvFromItemSecretRef | undefined
}
export interface MariadbMariaDBSpecInitContainersItemLivenessProbeExec {
  "command": Array<string> | undefined
}
export interface MariadbMariaDBSpecInitContainersItemLivenessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MariadbMariaDBSpecInitContainersItemLivenessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MariadbMariaDBSpecInitContainersItemLivenessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MariadbMariaDBSpecInitContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MariadbMariaDBSpecInitContainersItemLivenessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MariadbMariaDBSpecInitContainersItemLivenessProbe {
  "exec": MariadbMariaDBSpecInitContainersItemLivenessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MariadbMariaDBSpecInitContainersItemLivenessProbeGrpc | undefined
  "httpGet": MariadbMariaDBSpecInitContainersItemLivenessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MariadbMariaDBSpecInitContainersItemLivenessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MariadbMariaDBSpecInitContainersItemReadinessProbeExec {
  "command": Array<string> | undefined
}
export interface MariadbMariaDBSpecInitContainersItemReadinessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MariadbMariaDBSpecInitContainersItemReadinessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MariadbMariaDBSpecInitContainersItemReadinessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MariadbMariaDBSpecInitContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MariadbMariaDBSpecInitContainersItemReadinessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MariadbMariaDBSpecInitContainersItemReadinessProbe {
  "exec": MariadbMariaDBSpecInitContainersItemReadinessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MariadbMariaDBSpecInitContainersItemReadinessProbeGrpc | undefined
  "httpGet": MariadbMariaDBSpecInitContainersItemReadinessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MariadbMariaDBSpecInitContainersItemReadinessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MariadbMariaDBSpecInitContainersItemResourcesClaimsItem {
  "name": string
}
export interface MariadbMariaDBSpecInitContainersItemResourcesLimits {
}
export interface MariadbMariaDBSpecInitContainersItemResourcesRequests {
}
export interface MariadbMariaDBSpecInitContainersItemResources {
  "claims": Array<MariadbMariaDBSpecInitContainersItemResourcesClaimsItem> | undefined
  "limits": MariadbMariaDBSpecInitContainersItemResourcesLimits | undefined
  "requests": MariadbMariaDBSpecInitContainersItemResourcesRequests | undefined
}
export interface MariadbMariaDBSpecInitContainersItemSecurityContextCapabilities {
  "add": Array<string> | undefined
  "drop": Array<string> | undefined
}
export interface MariadbMariaDBSpecInitContainersItemSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface MariadbMariaDBSpecInitContainersItemSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface MariadbMariaDBSpecInitContainersItemSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface MariadbMariaDBSpecInitContainersItemSecurityContext {
  "allowPrivilegeEscalation": boolean | undefined
  "capabilities": MariadbMariaDBSpecInitContainersItemSecurityContextCapabilities | undefined
  "privileged": boolean | undefined
  "procMount": string | undefined
  "readOnlyRootFilesystem": boolean | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": MariadbMariaDBSpecInitContainersItemSecurityContextSeLinuxOptions | undefined
  "seccompProfile": MariadbMariaDBSpecInitContainersItemSecurityContextSeccompProfile | undefined
  "windowsOptions": MariadbMariaDBSpecInitContainersItemSecurityContextWindowsOptions | undefined
}
export interface MariadbMariaDBSpecInitContainersItemVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface MariadbMariaDBSpecInitContainersItem {
  "args": Array<string> | undefined
  "command": Array<string> | undefined
  "env": Array<MariadbMariaDBSpecInitContainersItemEnvItem> | undefined
  "envFrom": Array<MariadbMariaDBSpecInitContainersItemEnvFromItem> | undefined
  "image": string
  "imagePullPolicy": string | undefined
  "livenessProbe": MariadbMariaDBSpecInitContainersItemLivenessProbe | undefined
  "readinessProbe": MariadbMariaDBSpecInitContainersItemReadinessProbe | undefined
  "resources": MariadbMariaDBSpecInitContainersItemResources | undefined
  "securityContext": MariadbMariaDBSpecInitContainersItemSecurityContext | undefined
  "volumeMounts": Array<MariadbMariaDBSpecInitContainersItemVolumeMountsItem> | undefined
}
export interface MariadbMariaDBSpecLivenessProbeExec {
  "command": Array<string> | undefined
}
export interface MariadbMariaDBSpecLivenessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MariadbMariaDBSpecLivenessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MariadbMariaDBSpecLivenessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MariadbMariaDBSpecLivenessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MariadbMariaDBSpecLivenessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MariadbMariaDBSpecLivenessProbe {
  "exec": MariadbMariaDBSpecLivenessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MariadbMariaDBSpecLivenessProbeGrpc | undefined
  "httpGet": MariadbMariaDBSpecLivenessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MariadbMariaDBSpecLivenessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MariadbMariaDBSpecMetricsExporterEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecMetricsExporterEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MariadbMariaDBSpecMetricsExporterEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MariadbMariaDBSpecMetricsExporterEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecMetricsExporterEnvItemValueFrom {
  "configMapKeyRef": MariadbMariaDBSpecMetricsExporterEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": MariadbMariaDBSpecMetricsExporterEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": MariadbMariaDBSpecMetricsExporterEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": MariadbMariaDBSpecMetricsExporterEnvItemValueFromSecretKeyRef | undefined
}
export interface MariadbMariaDBSpecMetricsExporterEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": MariadbMariaDBSpecMetricsExporterEnvItemValueFrom | undefined
}
export interface MariadbMariaDBSpecMetricsExporterEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecMetricsExporterEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecMetricsExporterEnvFromItem {
  "configMapRef": MariadbMariaDBSpecMetricsExporterEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": MariadbMariaDBSpecMetricsExporterEnvFromItemSecretRef | undefined
}
export interface MariadbMariaDBSpecMetricsExporterLivenessProbeExec {
  "command": Array<string> | undefined
}
export interface MariadbMariaDBSpecMetricsExporterLivenessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MariadbMariaDBSpecMetricsExporterLivenessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MariadbMariaDBSpecMetricsExporterLivenessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MariadbMariaDBSpecMetricsExporterLivenessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MariadbMariaDBSpecMetricsExporterLivenessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MariadbMariaDBSpecMetricsExporterLivenessProbe {
  "exec": MariadbMariaDBSpecMetricsExporterLivenessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MariadbMariaDBSpecMetricsExporterLivenessProbeGrpc | undefined
  "httpGet": MariadbMariaDBSpecMetricsExporterLivenessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MariadbMariaDBSpecMetricsExporterLivenessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MariadbMariaDBSpecMetricsExporterReadinessProbeExec {
  "command": Array<string> | undefined
}
export interface MariadbMariaDBSpecMetricsExporterReadinessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MariadbMariaDBSpecMetricsExporterReadinessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MariadbMariaDBSpecMetricsExporterReadinessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MariadbMariaDBSpecMetricsExporterReadinessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MariadbMariaDBSpecMetricsExporterReadinessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MariadbMariaDBSpecMetricsExporterReadinessProbe {
  "exec": MariadbMariaDBSpecMetricsExporterReadinessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MariadbMariaDBSpecMetricsExporterReadinessProbeGrpc | undefined
  "httpGet": MariadbMariaDBSpecMetricsExporterReadinessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MariadbMariaDBSpecMetricsExporterReadinessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MariadbMariaDBSpecMetricsExporterResourcesClaimsItem {
  "name": string
}
export interface MariadbMariaDBSpecMetricsExporterResourcesLimits {
}
export interface MariadbMariaDBSpecMetricsExporterResourcesRequests {
}
export interface MariadbMariaDBSpecMetricsExporterResources {
  "claims": Array<MariadbMariaDBSpecMetricsExporterResourcesClaimsItem> | undefined
  "limits": MariadbMariaDBSpecMetricsExporterResourcesLimits | undefined
  "requests": MariadbMariaDBSpecMetricsExporterResourcesRequests | undefined
}
export interface MariadbMariaDBSpecMetricsExporterSecurityContextCapabilities {
  "add": Array<string> | undefined
  "drop": Array<string> | undefined
}
export interface MariadbMariaDBSpecMetricsExporterSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface MariadbMariaDBSpecMetricsExporterSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface MariadbMariaDBSpecMetricsExporterSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface MariadbMariaDBSpecMetricsExporterSecurityContext {
  "allowPrivilegeEscalation": boolean | undefined
  "capabilities": MariadbMariaDBSpecMetricsExporterSecurityContextCapabilities | undefined
  "privileged": boolean | undefined
  "procMount": string | undefined
  "readOnlyRootFilesystem": boolean | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": MariadbMariaDBSpecMetricsExporterSecurityContextSeLinuxOptions | undefined
  "seccompProfile": MariadbMariaDBSpecMetricsExporterSecurityContextSeccompProfile | undefined
  "windowsOptions": MariadbMariaDBSpecMetricsExporterSecurityContextWindowsOptions | undefined
}
export interface MariadbMariaDBSpecMetricsExporterVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface MariadbMariaDBSpecMetricsExporter {
  "args": Array<string> | undefined
  "command": Array<string> | undefined
  "env": Array<MariadbMariaDBSpecMetricsExporterEnvItem> | undefined
  "envFrom": Array<MariadbMariaDBSpecMetricsExporterEnvFromItem> | undefined
  "image": string
  "imagePullPolicy": string | undefined
  "livenessProbe": MariadbMariaDBSpecMetricsExporterLivenessProbe | undefined
  "port": number | undefined
  "readinessProbe": MariadbMariaDBSpecMetricsExporterReadinessProbe | undefined
  "resources": MariadbMariaDBSpecMetricsExporterResources | undefined
  "securityContext": MariadbMariaDBSpecMetricsExporterSecurityContext | undefined
  "volumeMounts": Array<MariadbMariaDBSpecMetricsExporterVolumeMountsItem> | undefined
}
export interface MariadbMariaDBSpecMetricsServiceMonitor {
  "interval": string | undefined
  "prometheusRelease": string
  "scrapeTimeout": string | undefined
}
export interface MariadbMariaDBSpecMetrics {
  "exporter": MariadbMariaDBSpecMetricsExporter
  "serviceMonitor": MariadbMariaDBSpecMetricsServiceMonitor
}
export interface MariadbMariaDBSpecMyCnfConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecNodeSelector {
}
export interface MariadbMariaDBSpecPasswordSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecPodAnnotations {
}
export interface MariadbMariaDBSpecPodDisruptionBudget {
  "maxUnavailable": object | undefined
  "minAvailable": object | undefined
}
export interface MariadbMariaDBSpecPodSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface MariadbMariaDBSpecPodSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface MariadbMariaDBSpecPodSecurityContextSysctlsItem {
  "name": string
  "value": string
}
export interface MariadbMariaDBSpecPodSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface MariadbMariaDBSpecPodSecurityContext {
  "fsGroup": number | undefined
  "fsGroupChangePolicy": string | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": MariadbMariaDBSpecPodSecurityContextSeLinuxOptions | undefined
  "seccompProfile": MariadbMariaDBSpecPodSecurityContextSeccompProfile | undefined
  "supplementalGroups": Array<number> | undefined
  "sysctls": Array<MariadbMariaDBSpecPodSecurityContextSysctlsItem> | undefined
  "windowsOptions": MariadbMariaDBSpecPodSecurityContextWindowsOptions | undefined
}
export interface MariadbMariaDBSpecPrimaryConnectionHealthCheck {
  "interval": string | undefined
  "retryInterval": string | undefined
}
export interface MariadbMariaDBSpecPrimaryConnectionParams {
}
export interface MariadbMariaDBSpecPrimaryConnectionSecretTemplateAnnotations {
}
export interface MariadbMariaDBSpecPrimaryConnectionSecretTemplateLabels {
}
export interface MariadbMariaDBSpecPrimaryConnectionSecretTemplate {
  "annotations": MariadbMariaDBSpecPrimaryConnectionSecretTemplateAnnotations | undefined
  "databaseKey": string | undefined
  "format": string | undefined
  "hostKey": string | undefined
  "key": string | undefined
  "labels": MariadbMariaDBSpecPrimaryConnectionSecretTemplateLabels | undefined
  "passwordKey": string | undefined
  "portKey": string | undefined
  "usernameKey": string | undefined
}
export interface MariadbMariaDBSpecPrimaryConnection {
  "healthCheck": MariadbMariaDBSpecPrimaryConnectionHealthCheck | undefined
  "params": MariadbMariaDBSpecPrimaryConnectionParams | undefined
  "secretName": string | undefined
  "secretTemplate": MariadbMariaDBSpecPrimaryConnectionSecretTemplate | undefined
  "serviceName": string | undefined
}
export interface MariadbMariaDBSpecPrimaryServiceAnnotations {
}
export interface MariadbMariaDBSpecPrimaryServiceLabels {
}
export interface MariadbMariaDBSpecPrimaryService {
  "annotations": MariadbMariaDBSpecPrimaryServiceAnnotations | undefined
  "externalTrafficPolicy": string | undefined
  "labels": MariadbMariaDBSpecPrimaryServiceLabels | undefined
  "loadBalancerIP": string | undefined
  "loadBalancerSourceRanges": Array<string> | undefined
  "sessionAffinity": string | undefined
  "type": string | undefined
}
export interface MariadbMariaDBSpecReadinessProbeExec {
  "command": Array<string> | undefined
}
export interface MariadbMariaDBSpecReadinessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MariadbMariaDBSpecReadinessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MariadbMariaDBSpecReadinessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MariadbMariaDBSpecReadinessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MariadbMariaDBSpecReadinessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MariadbMariaDBSpecReadinessProbe {
  "exec": MariadbMariaDBSpecReadinessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MariadbMariaDBSpecReadinessProbeGrpc | undefined
  "httpGet": MariadbMariaDBSpecReadinessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MariadbMariaDBSpecReadinessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MariadbMariaDBSpecReplicationPrimary {
  "automaticFailover": boolean | undefined
  "podIndex": number | undefined
}
export interface MariadbMariaDBSpecReplicationReplicaReplPasswordSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecReplicationReplica {
  "connectionRetries": number | undefined
  "connectionTimeout": string | undefined
  "gtid": string | undefined
  "replPasswordSecretKeyRef": MariadbMariaDBSpecReplicationReplicaReplPasswordSecretKeyRef | undefined
  "syncTimeout": string | undefined
  "waitPoint": string | undefined
}
export interface MariadbMariaDBSpecReplication {
  "enabled": boolean | undefined
  "primary": MariadbMariaDBSpecReplicationPrimary | undefined
  "replica": MariadbMariaDBSpecReplicationReplica | undefined
  "syncBinlog": boolean | undefined
}
export interface MariadbMariaDBSpecResourcesClaimsItem {
  "name": string
}
export interface MariadbMariaDBSpecResourcesLimits {
}
export interface MariadbMariaDBSpecResourcesRequests {
}
export interface MariadbMariaDBSpecResources {
  "claims": Array<MariadbMariaDBSpecResourcesClaimsItem> | undefined
  "limits": MariadbMariaDBSpecResourcesLimits | undefined
  "requests": MariadbMariaDBSpecResourcesRequests | undefined
}
export interface MariadbMariaDBSpecRootPasswordSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecSecondaryConnectionHealthCheck {
  "interval": string | undefined
  "retryInterval": string | undefined
}
export interface MariadbMariaDBSpecSecondaryConnectionParams {
}
export interface MariadbMariaDBSpecSecondaryConnectionSecretTemplateAnnotations {
}
export interface MariadbMariaDBSpecSecondaryConnectionSecretTemplateLabels {
}
export interface MariadbMariaDBSpecSecondaryConnectionSecretTemplate {
  "annotations": MariadbMariaDBSpecSecondaryConnectionSecretTemplateAnnotations | undefined
  "databaseKey": string | undefined
  "format": string | undefined
  "hostKey": string | undefined
  "key": string | undefined
  "labels": MariadbMariaDBSpecSecondaryConnectionSecretTemplateLabels | undefined
  "passwordKey": string | undefined
  "portKey": string | undefined
  "usernameKey": string | undefined
}
export interface MariadbMariaDBSpecSecondaryConnection {
  "healthCheck": MariadbMariaDBSpecSecondaryConnectionHealthCheck | undefined
  "params": MariadbMariaDBSpecSecondaryConnectionParams | undefined
  "secretName": string | undefined
  "secretTemplate": MariadbMariaDBSpecSecondaryConnectionSecretTemplate | undefined
  "serviceName": string | undefined
}
export interface MariadbMariaDBSpecSecondaryServiceAnnotations {
}
export interface MariadbMariaDBSpecSecondaryServiceLabels {
}
export interface MariadbMariaDBSpecSecondaryService {
  "annotations": MariadbMariaDBSpecSecondaryServiceAnnotations | undefined
  "externalTrafficPolicy": string | undefined
  "labels": MariadbMariaDBSpecSecondaryServiceLabels | undefined
  "loadBalancerIP": string | undefined
  "loadBalancerSourceRanges": Array<string> | undefined
  "sessionAffinity": string | undefined
  "type": string | undefined
}
export interface MariadbMariaDBSpecSecurityContextCapabilities {
  "add": Array<string> | undefined
  "drop": Array<string> | undefined
}
export interface MariadbMariaDBSpecSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface MariadbMariaDBSpecSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface MariadbMariaDBSpecSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface MariadbMariaDBSpecSecurityContext {
  "allowPrivilegeEscalation": boolean | undefined
  "capabilities": MariadbMariaDBSpecSecurityContextCapabilities | undefined
  "privileged": boolean | undefined
  "procMount": string | undefined
  "readOnlyRootFilesystem": boolean | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": MariadbMariaDBSpecSecurityContextSeLinuxOptions | undefined
  "seccompProfile": MariadbMariaDBSpecSecurityContextSeccompProfile | undefined
  "windowsOptions": MariadbMariaDBSpecSecurityContextWindowsOptions | undefined
}
export interface MariadbMariaDBSpecServiceAnnotations {
}
export interface MariadbMariaDBSpecServiceLabels {
}
export interface MariadbMariaDBSpecService {
  "annotations": MariadbMariaDBSpecServiceAnnotations | undefined
  "externalTrafficPolicy": string | undefined
  "labels": MariadbMariaDBSpecServiceLabels | undefined
  "loadBalancerIP": string | undefined
  "loadBalancerSourceRanges": Array<string> | undefined
  "sessionAffinity": string | undefined
  "type": string | undefined
}
export interface MariadbMariaDBSpecTolerationsItem {
  "effect": string | undefined
  "key": string | undefined
  "operator": string | undefined
  "tolerationSeconds": number | undefined
  "value": string | undefined
}
export interface MariadbMariaDBSpecUpdateStrategyRollingUpdate {
  "maxUnavailable": object | undefined
  "partition": number | undefined
}
export interface MariadbMariaDBSpecUpdateStrategy {
  "rollingUpdate": MariadbMariaDBSpecUpdateStrategyRollingUpdate | undefined
  "type": string | undefined
}
export interface MariadbMariaDBSpecVolumeClaimTemplateAnnotations {
}
export interface MariadbMariaDBSpecVolumeClaimTemplateDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface MariadbMariaDBSpecVolumeClaimTemplateDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
  "namespace": string | undefined
}
export interface MariadbMariaDBSpecVolumeClaimTemplateLabels {
}
export interface MariadbMariaDBSpecVolumeClaimTemplateResourcesClaimsItem {
  "name": string
}
export interface MariadbMariaDBSpecVolumeClaimTemplateResourcesLimits {
}
export interface MariadbMariaDBSpecVolumeClaimTemplateResourcesRequests {
}
export interface MariadbMariaDBSpecVolumeClaimTemplateResources {
  "claims": Array<MariadbMariaDBSpecVolumeClaimTemplateResourcesClaimsItem> | undefined
  "limits": MariadbMariaDBSpecVolumeClaimTemplateResourcesLimits | undefined
  "requests": MariadbMariaDBSpecVolumeClaimTemplateResourcesRequests | undefined
}
export interface MariadbMariaDBSpecVolumeClaimTemplateSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecVolumeClaimTemplateSelectorMatchLabels {
}
export interface MariadbMariaDBSpecVolumeClaimTemplateSelector {
  "matchExpressions": Array<MariadbMariaDBSpecVolumeClaimTemplateSelectorMatchExpressionsItem> | undefined
  "matchLabels": MariadbMariaDBSpecVolumeClaimTemplateSelectorMatchLabels | undefined
}
export interface MariadbMariaDBSpecVolumeClaimTemplate {
  "accessModes": Array<string> | undefined
  "annotations": MariadbMariaDBSpecVolumeClaimTemplateAnnotations | undefined
  "dataSource": MariadbMariaDBSpecVolumeClaimTemplateDataSource | undefined
  "dataSourceRef": MariadbMariaDBSpecVolumeClaimTemplateDataSourceRef | undefined
  "labels": MariadbMariaDBSpecVolumeClaimTemplateLabels | undefined
  "resources": MariadbMariaDBSpecVolumeClaimTemplateResources | undefined
  "selector": MariadbMariaDBSpecVolumeClaimTemplateSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface MariadbMariaDBSpecVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemAwsElasticBlockStore {
  "fsType": string | undefined
  "partition": number | undefined
  "readOnly": boolean | undefined
  "volumeID": string
}
export interface MariadbMariaDBSpecVolumesItemAzureDisk {
  "cachingMode": string | undefined
  "diskName": string
  "diskURI": string
  "fsType": string | undefined
  "kind": string | undefined
  "readOnly": boolean | undefined
}
export interface MariadbMariaDBSpecVolumesItemAzureFile {
  "readOnly": boolean | undefined
  "secretName": string
  "shareName": string
}
export interface MariadbMariaDBSpecVolumesItemCephfsSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemCephfs {
  "monitors": Array<string>
  "path": string | undefined
  "readOnly": boolean | undefined
  "secretFile": string | undefined
  "secretRef": MariadbMariaDBSpecVolumesItemCephfsSecretRef | undefined
  "user": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemCinderSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemCinder {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MariadbMariaDBSpecVolumesItemCinderSecretRef | undefined
  "volumeID": string
}
export interface MariadbMariaDBSpecVolumesItemConfigMapItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MariadbMariaDBSpecVolumesItemConfigMap {
  "defaultMode": number | undefined
  "items": Array<MariadbMariaDBSpecVolumesItemConfigMapItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecVolumesItemCsiNodePublishSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemCsiVolumeAttributes {
}
export interface MariadbMariaDBSpecVolumesItemCsi {
  "driver": string
  "fsType": string | undefined
  "nodePublishSecretRef": MariadbMariaDBSpecVolumesItemCsiNodePublishSecretRef | undefined
  "readOnly": boolean | undefined
  "volumeAttributes": MariadbMariaDBSpecVolumesItemCsiVolumeAttributes | undefined
}
export interface MariadbMariaDBSpecVolumesItemDownwardAPIItemsItemFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MariadbMariaDBSpecVolumesItemDownwardAPIItemsItemResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MariadbMariaDBSpecVolumesItemDownwardAPIItemsItem {
  "fieldRef": MariadbMariaDBSpecVolumesItemDownwardAPIItemsItemFieldRef | undefined
  "mode": number | undefined
  "path": string
  "resourceFieldRef": MariadbMariaDBSpecVolumesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MariadbMariaDBSpecVolumesItemDownwardAPI {
  "defaultMode": number | undefined
  "items": Array<MariadbMariaDBSpecVolumesItemDownwardAPIItemsItem> | undefined
}
export interface MariadbMariaDBSpecVolumesItemEmptyDir {
  "medium": string | undefined
  "sizeLimit": object | undefined
}
export interface MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateMetadata {
}
export interface MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
  "namespace": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesClaimsItem {
  "name": string
}
export interface MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecResources {
  "claims": Array<MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  "limits": MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  "requests": MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelector {
  "matchExpressions": Array<MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  "matchLabels": MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpec {
  "accessModes": Array<string> | undefined
  "dataSource": MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSource | undefined
  "dataSourceRef": MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  "resources": MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecResources | undefined
  "selector": MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplate {
  "metadata": MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateMetadata | undefined
  "spec": MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplateSpec
}
export interface MariadbMariaDBSpecVolumesItemEphemeral {
  "volumeClaimTemplate": MariadbMariaDBSpecVolumesItemEphemeralVolumeClaimTemplate | undefined
}
export interface MariadbMariaDBSpecVolumesItemFc {
  "fsType": string | undefined
  "lun": number | undefined
  "readOnly": boolean | undefined
  "targetWWNs": Array<string> | undefined
  "wwids": Array<string> | undefined
}
export interface MariadbMariaDBSpecVolumesItemFlexVolumeOptions {
}
export interface MariadbMariaDBSpecVolumesItemFlexVolumeSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemFlexVolume {
  "driver": string
  "fsType": string | undefined
  "options": MariadbMariaDBSpecVolumesItemFlexVolumeOptions | undefined
  "readOnly": boolean | undefined
  "secretRef": MariadbMariaDBSpecVolumesItemFlexVolumeSecretRef | undefined
}
export interface MariadbMariaDBSpecVolumesItemFlocker {
  "datasetName": string | undefined
  "datasetUUID": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemGcePersistentDisk {
  "fsType": string | undefined
  "partition": number | undefined
  "pdName": string
  "readOnly": boolean | undefined
}
export interface MariadbMariaDBSpecVolumesItemGitRepo {
  "directory": string | undefined
  "repository": string
  "revision": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemGlusterfs {
  "endpoints": string
  "path": string
  "readOnly": boolean | undefined
}
export interface MariadbMariaDBSpecVolumesItemHostPath {
  "path": string
  "type": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemIscsiSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemIscsi {
  "chapAuthDiscovery": boolean | undefined
  "chapAuthSession": boolean | undefined
  "fsType": string | undefined
  "initiatorName": string | undefined
  "iqn": string
  "iscsiInterface": string | undefined
  "lun": number
  "portals": Array<string> | undefined
  "readOnly": boolean | undefined
  "secretRef": MariadbMariaDBSpecVolumesItemIscsiSecretRef | undefined
  "targetPortal": string
}
export interface MariadbMariaDBSpecVolumesItemNfs {
  "path": string
  "readOnly": boolean | undefined
  "server": string
}
export interface MariadbMariaDBSpecVolumesItemPersistentVolumeClaim {
  "claimName": string
  "readOnly": boolean | undefined
}
export interface MariadbMariaDBSpecVolumesItemPhotonPersistentDisk {
  "fsType": string | undefined
  "pdID": string
}
export interface MariadbMariaDBSpecVolumesItemPortworxVolume {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "volumeID": string
}
export interface MariadbMariaDBSpecVolumesItemProjectedSourcesItemConfigMapItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MariadbMariaDBSpecVolumesItemProjectedSourcesItemConfigMap {
  "items": Array<MariadbMariaDBSpecVolumesItemProjectedSourcesItemConfigMapItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MariadbMariaDBSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MariadbMariaDBSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItem {
  "fieldRef": MariadbMariaDBSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemFieldRef | undefined
  "mode": number | undefined
  "path": string
  "resourceFieldRef": MariadbMariaDBSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MariadbMariaDBSpecVolumesItemProjectedSourcesItemDownwardAPI {
  "items": Array<MariadbMariaDBSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItem> | undefined
}
export interface MariadbMariaDBSpecVolumesItemProjectedSourcesItemSecretItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MariadbMariaDBSpecVolumesItemProjectedSourcesItemSecret {
  "items": Array<MariadbMariaDBSpecVolumesItemProjectedSourcesItemSecretItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MariadbMariaDBSpecVolumesItemProjectedSourcesItemServiceAccountToken {
  "audience": string | undefined
  "expirationSeconds": number | undefined
  "path": string
}
export interface MariadbMariaDBSpecVolumesItemProjectedSourcesItem {
  "configMap": MariadbMariaDBSpecVolumesItemProjectedSourcesItemConfigMap | undefined
  "downwardAPI": MariadbMariaDBSpecVolumesItemProjectedSourcesItemDownwardAPI | undefined
  "secret": MariadbMariaDBSpecVolumesItemProjectedSourcesItemSecret | undefined
  "serviceAccountToken": MariadbMariaDBSpecVolumesItemProjectedSourcesItemServiceAccountToken | undefined
}
export interface MariadbMariaDBSpecVolumesItemProjected {
  "defaultMode": number | undefined
  "sources": Array<MariadbMariaDBSpecVolumesItemProjectedSourcesItem> | undefined
}
export interface MariadbMariaDBSpecVolumesItemQuobyte {
  "group": string | undefined
  "readOnly": boolean | undefined
  "registry": string
  "tenant": string | undefined
  "user": string | undefined
  "volume": string
}
export interface MariadbMariaDBSpecVolumesItemRbdSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemRbd {
  "fsType": string | undefined
  "image": string
  "keyring": string | undefined
  "monitors": Array<string>
  "pool": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MariadbMariaDBSpecVolumesItemRbdSecretRef | undefined
  "user": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemScaleIOSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemScaleIO {
  "fsType": string | undefined
  "gateway": string
  "protectionDomain": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MariadbMariaDBSpecVolumesItemScaleIOSecretRef
  "sslEnabled": boolean | undefined
  "storageMode": string | undefined
  "storagePool": string | undefined
  "system": string
  "volumeName": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemSecretItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MariadbMariaDBSpecVolumesItemSecret {
  "defaultMode": number | undefined
  "items": Array<MariadbMariaDBSpecVolumesItemSecretItemsItem> | undefined
  "optional": boolean | undefined
  "secretName": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemStorageosSecretRef {
  "name": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemStorageos {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MariadbMariaDBSpecVolumesItemStorageosSecretRef | undefined
  "volumeName": string | undefined
  "volumeNamespace": string | undefined
}
export interface MariadbMariaDBSpecVolumesItemVsphereVolume {
  "fsType": string | undefined
  "storagePolicyID": string | undefined
  "storagePolicyName": string | undefined
  "volumePath": string
}
export interface MariadbMariaDBSpecVolumesItem {
  "awsElasticBlockStore": MariadbMariaDBSpecVolumesItemAwsElasticBlockStore | undefined
  "azureDisk": MariadbMariaDBSpecVolumesItemAzureDisk | undefined
  "azureFile": MariadbMariaDBSpecVolumesItemAzureFile | undefined
  "cephfs": MariadbMariaDBSpecVolumesItemCephfs | undefined
  "cinder": MariadbMariaDBSpecVolumesItemCinder | undefined
  "configMap": MariadbMariaDBSpecVolumesItemConfigMap | undefined
  "csi": MariadbMariaDBSpecVolumesItemCsi | undefined
  "downwardAPI": MariadbMariaDBSpecVolumesItemDownwardAPI | undefined
  "emptyDir": MariadbMariaDBSpecVolumesItemEmptyDir | undefined
  "ephemeral": MariadbMariaDBSpecVolumesItemEphemeral | undefined
  "fc": MariadbMariaDBSpecVolumesItemFc | undefined
  "flexVolume": MariadbMariaDBSpecVolumesItemFlexVolume | undefined
  "flocker": MariadbMariaDBSpecVolumesItemFlocker | undefined
  "gcePersistentDisk": MariadbMariaDBSpecVolumesItemGcePersistentDisk | undefined
  "gitRepo": MariadbMariaDBSpecVolumesItemGitRepo | undefined
  "glusterfs": MariadbMariaDBSpecVolumesItemGlusterfs | undefined
  "hostPath": MariadbMariaDBSpecVolumesItemHostPath | undefined
  "iscsi": MariadbMariaDBSpecVolumesItemIscsi | undefined
  "name": string
  "nfs": MariadbMariaDBSpecVolumesItemNfs | undefined
  "persistentVolumeClaim": MariadbMariaDBSpecVolumesItemPersistentVolumeClaim | undefined
  "photonPersistentDisk": MariadbMariaDBSpecVolumesItemPhotonPersistentDisk | undefined
  "portworxVolume": MariadbMariaDBSpecVolumesItemPortworxVolume | undefined
  "projected": MariadbMariaDBSpecVolumesItemProjected | undefined
  "quobyte": MariadbMariaDBSpecVolumesItemQuobyte | undefined
  "rbd": MariadbMariaDBSpecVolumesItemRbd | undefined
  "scaleIO": MariadbMariaDBSpecVolumesItemScaleIO | undefined
  "secret": MariadbMariaDBSpecVolumesItemSecret | undefined
  "storageos": MariadbMariaDBSpecVolumesItemStorageos | undefined
  "vsphereVolume": MariadbMariaDBSpecVolumesItemVsphereVolume | undefined
}
export interface MariadbMariaDBSpec {
  "affinity": MariadbMariaDBSpecAffinity | undefined
  "args": Array<string> | undefined
  "bootstrapFrom": MariadbMariaDBSpecBootstrapFrom | undefined
  "command": Array<string> | undefined
  "connection": MariadbMariaDBSpecConnection | undefined
  "database": string | undefined
  "env": Array<MariadbMariaDBSpecEnvItem> | undefined
  "envFrom": Array<MariadbMariaDBSpecEnvFromItem> | undefined
  "galera": MariadbMariaDBSpecGalera | undefined
  "image": string
  "imagePullPolicy": string | undefined
  "imagePullSecrets": Array<MariadbMariaDBSpecImagePullSecretsItem> | undefined
  "inheritMetadata": MariadbMariaDBSpecInheritMetadata | undefined
  "initContainers": Array<MariadbMariaDBSpecInitContainersItem> | undefined
  "livenessProbe": MariadbMariaDBSpecLivenessProbe | undefined
  "metrics": MariadbMariaDBSpecMetrics | undefined
  "myCnf": string | undefined
  "myCnfConfigMapKeyRef": MariadbMariaDBSpecMyCnfConfigMapKeyRef | undefined
  "nodeSelector": MariadbMariaDBSpecNodeSelector | undefined
  "passwordSecretKeyRef": MariadbMariaDBSpecPasswordSecretKeyRef | undefined
  "podAnnotations": MariadbMariaDBSpecPodAnnotations | undefined
  "podDisruptionBudget": MariadbMariaDBSpecPodDisruptionBudget | undefined
  "podSecurityContext": MariadbMariaDBSpecPodSecurityContext | undefined
  "port": number | undefined
  "primaryConnection": MariadbMariaDBSpecPrimaryConnection | undefined
  "primaryService": MariadbMariaDBSpecPrimaryService | undefined
  "readinessProbe": MariadbMariaDBSpecReadinessProbe | undefined
  "replicas": number | undefined
  "replication": MariadbMariaDBSpecReplication | undefined
  "resources": MariadbMariaDBSpecResources | undefined
  "rootPasswordSecretKeyRef": MariadbMariaDBSpecRootPasswordSecretKeyRef
  "secondaryConnection": MariadbMariaDBSpecSecondaryConnection | undefined
  "secondaryService": MariadbMariaDBSpecSecondaryService | undefined
  "securityContext": MariadbMariaDBSpecSecurityContext | undefined
  "service": MariadbMariaDBSpecService | undefined
  "tolerations": Array<MariadbMariaDBSpecTolerationsItem> | undefined
  "updateStrategy": MariadbMariaDBSpecUpdateStrategy | undefined
  "username": string | undefined
  "volumeClaimTemplate": MariadbMariaDBSpecVolumeClaimTemplate
  "volumeMounts": Array<MariadbMariaDBSpecVolumeMountsItem> | undefined
  "volumes": Array<MariadbMariaDBSpecVolumesItem> | undefined
}
export interface MariadbMariaDB extends KubernetesObject {
  spec: MariadbMariaDBSpec
  status: MariadbMariaDBStatus | undefined
}
export type MariadbMariaDBList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MariadbMariaDB>
