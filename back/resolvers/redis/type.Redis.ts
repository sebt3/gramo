type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface RedisRedisStatus {
}
export interface RedisRedisSpecTLSSecretItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface RedisRedisSpecTLSSecret {
  "defaultMode": number | undefined
  "items": Array<RedisRedisSpecTLSSecretItemsItem> | undefined
  "optional": boolean | undefined
  "secretName": string | undefined
}
export interface RedisRedisSpecTLS {
  "ca": string | undefined
  "cert": string | undefined
  "key": string | undefined
  "secret": RedisRedisSpecTLSSecret
}
export interface RedisRedisSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  "matchExpressions": Array<RedisRedisSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  "matchFields": Array<RedisRedisSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface RedisRedisSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "preference": RedisRedisSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  "weight": number
}
export interface RedisRedisSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  "matchExpressions": Array<RedisRedisSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  "matchFields": Array<RedisRedisSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface RedisRedisSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  "nodeSelectorTerms": Array<RedisRedisSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface RedisRedisSpecAffinityNodeAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": RedisRedisSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface RedisRedisSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface RedisRedisSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<RedisRedisSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface RedisRedisSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface RedisRedisSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<RedisRedisSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": RedisRedisSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": RedisRedisSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisSpecAffinityPodAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface RedisRedisSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface RedisRedisSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<RedisRedisSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface RedisRedisSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface RedisRedisSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<RedisRedisSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": RedisRedisSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": RedisRedisSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisSpecAffinityPodAntiAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface RedisRedisSpecAffinity {
  "nodeAffinity": RedisRedisSpecAffinityNodeAffinity | undefined
  "podAffinity": RedisRedisSpecAffinityPodAffinity | undefined
  "podAntiAffinity": RedisRedisSpecAffinityPodAntiAffinity | undefined
}
export interface RedisRedisSpecKubernetesConfigImagePullSecretsItem {
  "name": string | undefined
}
export interface RedisRedisSpecKubernetesConfigRedisSecret {
  "key": string | undefined
  "name": string | undefined
}
export interface RedisRedisSpecKubernetesConfigResourcesLimits {
}
export interface RedisRedisSpecKubernetesConfigResourcesRequests {
}
export interface RedisRedisSpecKubernetesConfigResources {
  "limits": RedisRedisSpecKubernetesConfigResourcesLimits | undefined
  "requests": RedisRedisSpecKubernetesConfigResourcesRequests | undefined
}
export interface RedisRedisSpecKubernetesConfigUpdateStrategyRollingUpdate {
  "partition": number | undefined
}
export interface RedisRedisSpecKubernetesConfigUpdateStrategy {
  "rollingUpdate": RedisRedisSpecKubernetesConfigUpdateStrategyRollingUpdate | undefined
  "type": string | undefined
}
export interface RedisRedisSpecKubernetesConfig {
  "image": string
  "imagePullPolicy": string | undefined
  "imagePullSecrets": Array<RedisRedisSpecKubernetesConfigImagePullSecretsItem> | undefined
  "redisSecret": RedisRedisSpecKubernetesConfigRedisSecret | undefined
  "resources": RedisRedisSpecKubernetesConfigResources | undefined
  "updateStrategy": RedisRedisSpecKubernetesConfigUpdateStrategy | undefined
}
export interface RedisRedisSpecLivenessProbe {
  "failureThreshold": number | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "timeoutSeconds": number | undefined
}
export interface RedisRedisSpecNodeSelector {
}
export interface RedisRedisSpecReadinessProbe {
  "failureThreshold": number | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "timeoutSeconds": number | undefined
}
export interface RedisRedisSpecRedisConfig {
  "additionalRedisConfig": string | undefined
}
export interface RedisRedisSpecRedisExporterEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface RedisRedisSpecRedisExporterEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface RedisRedisSpecRedisExporterEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface RedisRedisSpecRedisExporterEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface RedisRedisSpecRedisExporterEnvItemValueFrom {
  "configMapKeyRef": RedisRedisSpecRedisExporterEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": RedisRedisSpecRedisExporterEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": RedisRedisSpecRedisExporterEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": RedisRedisSpecRedisExporterEnvItemValueFromSecretKeyRef | undefined
}
export interface RedisRedisSpecRedisExporterEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": RedisRedisSpecRedisExporterEnvItemValueFrom | undefined
}
export interface RedisRedisSpecRedisExporterResourcesLimits {
}
export interface RedisRedisSpecRedisExporterResourcesRequests {
}
export interface RedisRedisSpecRedisExporterResources {
  "limits": RedisRedisSpecRedisExporterResourcesLimits | undefined
  "requests": RedisRedisSpecRedisExporterResourcesRequests | undefined
}
export interface RedisRedisSpecRedisExporter {
  "enabled": boolean | undefined
  "env": Array<RedisRedisSpecRedisExporterEnvItem> | undefined
  "image": string
  "imagePullPolicy": string | undefined
  "resources": RedisRedisSpecRedisExporterResources | undefined
}
export interface RedisRedisSpecSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface RedisRedisSpecSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface RedisRedisSpecSecurityContextSysctlsItem {
  "name": string
  "value": string
}
export interface RedisRedisSpecSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface RedisRedisSpecSecurityContext {
  "fsGroup": number | undefined
  "fsGroupChangePolicy": string | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": RedisRedisSpecSecurityContextSeLinuxOptions | undefined
  "seccompProfile": RedisRedisSpecSecurityContextSeccompProfile | undefined
  "supplementalGroups": Array<number> | undefined
  "sysctls": Array<RedisRedisSpecSecurityContextSysctlsItem> | undefined
  "windowsOptions": RedisRedisSpecSecurityContextWindowsOptions | undefined
}
export interface RedisRedisSpecSidecarsItemEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface RedisRedisSpecSidecarsItemEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface RedisRedisSpecSidecarsItemEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface RedisRedisSpecSidecarsItemEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface RedisRedisSpecSidecarsItemEnvItemValueFrom {
  "configMapKeyRef": RedisRedisSpecSidecarsItemEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": RedisRedisSpecSidecarsItemEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": RedisRedisSpecSidecarsItemEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": RedisRedisSpecSidecarsItemEnvItemValueFromSecretKeyRef | undefined
}
export interface RedisRedisSpecSidecarsItemEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": RedisRedisSpecSidecarsItemEnvItemValueFrom | undefined
}
export interface RedisRedisSpecSidecarsItemResourcesLimits {
}
export interface RedisRedisSpecSidecarsItemResourcesRequests {
}
export interface RedisRedisSpecSidecarsItemResources {
  "limits": RedisRedisSpecSidecarsItemResourcesLimits | undefined
  "requests": RedisRedisSpecSidecarsItemResourcesRequests | undefined
}
export interface RedisRedisSpecSidecarsItem {
  "env": Array<RedisRedisSpecSidecarsItemEnvItem> | undefined
  "image": string
  "imagePullPolicy": string | undefined
  "name": string
  "resources": RedisRedisSpecSidecarsItemResources | undefined
}
export interface RedisRedisSpecStorageVolumeClaimTemplateMetadata {
}
export interface RedisRedisSpecStorageVolumeClaimTemplateSpecDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface RedisRedisSpecStorageVolumeClaimTemplateSpecDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface RedisRedisSpecStorageVolumeClaimTemplateSpecResourcesLimits {
}
export interface RedisRedisSpecStorageVolumeClaimTemplateSpecResourcesRequests {
}
export interface RedisRedisSpecStorageVolumeClaimTemplateSpecResources {
  "limits": RedisRedisSpecStorageVolumeClaimTemplateSpecResourcesLimits | undefined
  "requests": RedisRedisSpecStorageVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface RedisRedisSpecStorageVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSpecStorageVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface RedisRedisSpecStorageVolumeClaimTemplateSpecSelector {
  "matchExpressions": Array<RedisRedisSpecStorageVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSpecStorageVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface RedisRedisSpecStorageVolumeClaimTemplateSpec {
  "accessModes": Array<string> | undefined
  "dataSource": RedisRedisSpecStorageVolumeClaimTemplateSpecDataSource | undefined
  "dataSourceRef": RedisRedisSpecStorageVolumeClaimTemplateSpecDataSourceRef | undefined
  "resources": RedisRedisSpecStorageVolumeClaimTemplateSpecResources | undefined
  "selector": RedisRedisSpecStorageVolumeClaimTemplateSpecSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface RedisRedisSpecStorageVolumeClaimTemplateStatusAllocatedResources {
}
export interface RedisRedisSpecStorageVolumeClaimTemplateStatusCapacity {
}
export interface RedisRedisSpecStorageVolumeClaimTemplateStatusConditionsItem {
  "lastProbeTime": string | undefined
  "lastTransitionTime": string | undefined
  "message": string | undefined
  "reason": string | undefined
  "status": string
  "type": string
}
export interface RedisRedisSpecStorageVolumeClaimTemplateStatus {
  "accessModes": Array<string> | undefined
  "allocatedResources": RedisRedisSpecStorageVolumeClaimTemplateStatusAllocatedResources | undefined
  "capacity": RedisRedisSpecStorageVolumeClaimTemplateStatusCapacity | undefined
  "conditions": Array<RedisRedisSpecStorageVolumeClaimTemplateStatusConditionsItem> | undefined
  "phase": string | undefined
  "resizeStatus": string | undefined
}
export interface RedisRedisSpecStorageVolumeClaimTemplate {
  "apiVersion": string | undefined
  "kind": string | undefined
  "metadata": RedisRedisSpecStorageVolumeClaimTemplateMetadata | undefined
  "spec": RedisRedisSpecStorageVolumeClaimTemplateSpec | undefined
  "status": RedisRedisSpecStorageVolumeClaimTemplateStatus | undefined
}
export interface RedisRedisSpecStorage {
  "volumeClaimTemplate": RedisRedisSpecStorageVolumeClaimTemplate | undefined
}
export interface RedisRedisSpecTolerationsItem {
  "effect": string | undefined
  "key": string | undefined
  "operator": string | undefined
  "tolerationSeconds": number | undefined
  "value": string | undefined
}
export interface RedisRedisSpec {
  "TLS": RedisRedisSpecTLS | undefined
  "affinity": RedisRedisSpecAffinity | undefined
  "kubernetesConfig": RedisRedisSpecKubernetesConfig
  "livenessProbe": RedisRedisSpecLivenessProbe | undefined
  "nodeSelector": RedisRedisSpecNodeSelector | undefined
  "priorityClassName": string | undefined
  "readinessProbe": RedisRedisSpecReadinessProbe | undefined
  "redisConfig": RedisRedisSpecRedisConfig | undefined
  "redisExporter": RedisRedisSpecRedisExporter | undefined
  "securityContext": RedisRedisSpecSecurityContext | undefined
  "serviceAccountName": string | undefined
  "sidecars": Array<RedisRedisSpecSidecarsItem> | undefined
  "storage": RedisRedisSpecStorage | undefined
  "tolerations": Array<RedisRedisSpecTolerationsItem> | undefined
}
export interface RedisRedis extends KubernetesObject {
  spec: RedisRedisSpec
  status: RedisRedisStatus | undefined
}
export type RedisRedisList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<RedisRedis>
