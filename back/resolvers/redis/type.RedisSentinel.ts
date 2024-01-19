type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface RedisRedisSentinelStatus {
}
export interface RedisRedisSentinelSpecTLSSecretItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface RedisRedisSentinelSpecTLSSecret {
  "defaultMode": number | undefined
  "items": Array<RedisRedisSentinelSpecTLSSecretItemsItem> | undefined
  "optional": boolean | undefined
  "secretName": string | undefined
}
export interface RedisRedisSentinelSpecTLS {
  "ca": string | undefined
  "cert": string | undefined
  "key": string | undefined
  "secret": RedisRedisSentinelSpecTLSSecret
}
export interface RedisRedisSentinelSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSentinelSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSentinelSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  "matchExpressions": Array<RedisRedisSentinelSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  "matchFields": Array<RedisRedisSentinelSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface RedisRedisSentinelSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "preference": RedisRedisSentinelSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  "weight": number
}
export interface RedisRedisSentinelSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSentinelSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSentinelSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  "matchExpressions": Array<RedisRedisSentinelSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  "matchFields": Array<RedisRedisSentinelSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface RedisRedisSentinelSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  "nodeSelectorTerms": Array<RedisRedisSentinelSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface RedisRedisSentinelSpecAffinityNodeAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisSentinelSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": RedisRedisSentinelSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface RedisRedisSentinelSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface RedisRedisSentinelSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<RedisRedisSentinelSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSentinelSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface RedisRedisSentinelSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<RedisRedisSentinelSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSentinelSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": RedisRedisSentinelSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": RedisRedisSentinelSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisSentinelSpecAffinityPodAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisSentinelSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisSentinelSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<RedisRedisSentinelSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSentinelSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<RedisRedisSentinelSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisSentinelSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": RedisRedisSentinelSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": RedisRedisSentinelSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisSentinelSpecAffinityPodAntiAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisSentinelSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisSentinelSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface RedisRedisSentinelSpecAffinity {
  "nodeAffinity": RedisRedisSentinelSpecAffinityNodeAffinity | undefined
  "podAffinity": RedisRedisSentinelSpecAffinityPodAffinity | undefined
  "podAntiAffinity": RedisRedisSentinelSpecAffinityPodAntiAffinity | undefined
}
export interface RedisRedisSentinelSpecKubernetesConfigImagePullSecretsItem {
  "name": string | undefined
}
export interface RedisRedisSentinelSpecKubernetesConfigRedisSecret {
  "key": string | undefined
  "name": string | undefined
}
export interface RedisRedisSentinelSpecKubernetesConfigResourcesLimits {
}
export interface RedisRedisSentinelSpecKubernetesConfigResourcesRequests {
}
export interface RedisRedisSentinelSpecKubernetesConfigResources {
  "limits": RedisRedisSentinelSpecKubernetesConfigResourcesLimits | undefined
  "requests": RedisRedisSentinelSpecKubernetesConfigResourcesRequests | undefined
}
export interface RedisRedisSentinelSpecKubernetesConfigServiceAnnotations {
}
export interface RedisRedisSentinelSpecKubernetesConfigService {
  "annotations": RedisRedisSentinelSpecKubernetesConfigServiceAnnotations | undefined
  "serviceType": string | undefined
}
export interface RedisRedisSentinelSpecKubernetesConfigUpdateStrategyRollingUpdate {
  "partition": number | undefined
}
export interface RedisRedisSentinelSpecKubernetesConfigUpdateStrategy {
  "rollingUpdate": RedisRedisSentinelSpecKubernetesConfigUpdateStrategyRollingUpdate | undefined
  "type": string | undefined
}
export interface RedisRedisSentinelSpecKubernetesConfig {
  "image": string
  "imagePullPolicy": string | undefined
  "imagePullSecrets": Array<RedisRedisSentinelSpecKubernetesConfigImagePullSecretsItem> | undefined
  "redisSecret": RedisRedisSentinelSpecKubernetesConfigRedisSecret | undefined
  "resources": RedisRedisSentinelSpecKubernetesConfigResources | undefined
  "service": RedisRedisSentinelSpecKubernetesConfigService | undefined
  "updateStrategy": RedisRedisSentinelSpecKubernetesConfigUpdateStrategy | undefined
}
export interface RedisRedisSentinelSpecLivenessProbe {
  "failureThreshold": number | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "timeoutSeconds": number | undefined
}
export interface RedisRedisSentinelSpecNodeSelector {
}
export interface RedisRedisSentinelSpecPdb {
  "enabled": boolean | undefined
  "maxUnavailable": number | undefined
  "minAvailable": number | undefined
}
export interface RedisRedisSentinelSpecReadinessProbe {
  "failureThreshold": number | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "timeoutSeconds": number | undefined
}
export interface RedisRedisSentinelSpecRedisSentinelConfig {
  "additionalSentinelConfig": string | undefined
  "downAfterMilliseconds": string | undefined
  "failoverTimeout": string | undefined
  "masterGroupName": string | undefined
  "parallelSyncs": string | undefined
  "quorum": string | undefined
  "redisPort": string | undefined
  "redisReplicationName": string
}
export interface RedisRedisSentinelSpecSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface RedisRedisSentinelSpecSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface RedisRedisSentinelSpecSecurityContextSysctlsItem {
  "name": string
  "value": string
}
export interface RedisRedisSentinelSpecSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface RedisRedisSentinelSpecSecurityContext {
  "fsGroup": number | undefined
  "fsGroupChangePolicy": string | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": RedisRedisSentinelSpecSecurityContextSeLinuxOptions | undefined
  "seccompProfile": RedisRedisSentinelSpecSecurityContextSeccompProfile | undefined
  "supplementalGroups": Array<number> | undefined
  "sysctls": Array<RedisRedisSentinelSpecSecurityContextSysctlsItem> | undefined
  "windowsOptions": RedisRedisSentinelSpecSecurityContextWindowsOptions | undefined
}
export interface RedisRedisSentinelSpecSidecarsItemEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface RedisRedisSentinelSpecSidecarsItemEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface RedisRedisSentinelSpecSidecarsItemEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface RedisRedisSentinelSpecSidecarsItemEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface RedisRedisSentinelSpecSidecarsItemEnvItemValueFrom {
  "configMapKeyRef": RedisRedisSentinelSpecSidecarsItemEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": RedisRedisSentinelSpecSidecarsItemEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": RedisRedisSentinelSpecSidecarsItemEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": RedisRedisSentinelSpecSidecarsItemEnvItemValueFromSecretKeyRef | undefined
}
export interface RedisRedisSentinelSpecSidecarsItemEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": RedisRedisSentinelSpecSidecarsItemEnvItemValueFrom | undefined
}
export interface RedisRedisSentinelSpecSidecarsItemResourcesLimits {
}
export interface RedisRedisSentinelSpecSidecarsItemResourcesRequests {
}
export interface RedisRedisSentinelSpecSidecarsItemResources {
  "limits": RedisRedisSentinelSpecSidecarsItemResourcesLimits | undefined
  "requests": RedisRedisSentinelSpecSidecarsItemResourcesRequests | undefined
}
export interface RedisRedisSentinelSpecSidecarsItem {
  "env": Array<RedisRedisSentinelSpecSidecarsItemEnvItem> | undefined
  "image": string
  "imagePullPolicy": string | undefined
  "name": string
  "resources": RedisRedisSentinelSpecSidecarsItemResources | undefined
}
export interface RedisRedisSentinelSpecTolerationsItem {
  "effect": string | undefined
  "key": string | undefined
  "operator": string | undefined
  "tolerationSeconds": number | undefined
  "value": string | undefined
}
export interface RedisRedisSentinelSpec {
  "TLS": RedisRedisSentinelSpecTLS | undefined
  "affinity": RedisRedisSentinelSpecAffinity | undefined
  "clusterSize": number
  "kubernetesConfig": RedisRedisSentinelSpecKubernetesConfig
  "livenessProbe": RedisRedisSentinelSpecLivenessProbe | undefined
  "nodeSelector": RedisRedisSentinelSpecNodeSelector | undefined
  "pdb": RedisRedisSentinelSpecPdb | undefined
  "priorityClassName": string | undefined
  "readinessProbe": RedisRedisSentinelSpecReadinessProbe | undefined
  "redisSentinelConfig": RedisRedisSentinelSpecRedisSentinelConfig | undefined
  "securityContext": RedisRedisSentinelSpecSecurityContext | undefined
  "serviceAccountName": string | undefined
  "sidecars": Array<RedisRedisSentinelSpecSidecarsItem> | undefined
  "tolerations": Array<RedisRedisSentinelSpecTolerationsItem> | undefined
}
export interface RedisRedisSentinel extends KubernetesObject {
  spec: RedisRedisSentinelSpec
  status: RedisRedisSentinelStatus | undefined
}
export type RedisRedisSentinelList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<RedisRedisSentinel>
