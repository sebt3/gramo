type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface RedisRedisClusterStatus {
}
export interface RedisRedisClusterSpecTLSSecretItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface RedisRedisClusterSpecTLSSecret {
  "defaultMode": number | undefined
  "items": Array<RedisRedisClusterSpecTLSSecretItemsItem> | undefined
  "optional": boolean | undefined
  "secretName": string | undefined
}
export interface RedisRedisClusterSpecTLS {
  "ca": string | undefined
  "cert": string | undefined
  "key": string | undefined
  "secret": RedisRedisClusterSpecTLSSecret
}
export interface RedisRedisClusterSpecKubernetesConfigImagePullSecretsItem {
  "name": string | undefined
}
export interface RedisRedisClusterSpecKubernetesConfigRedisSecret {
  "key": string | undefined
  "name": string | undefined
}
export interface RedisRedisClusterSpecKubernetesConfigResourcesLimits {
}
export interface RedisRedisClusterSpecKubernetesConfigResourcesRequests {
}
export interface RedisRedisClusterSpecKubernetesConfigResources {
  "limits": RedisRedisClusterSpecKubernetesConfigResourcesLimits | undefined
  "requests": RedisRedisClusterSpecKubernetesConfigResourcesRequests | undefined
}
export interface RedisRedisClusterSpecKubernetesConfigUpdateStrategyRollingUpdate {
  "partition": number | undefined
}
export interface RedisRedisClusterSpecKubernetesConfigUpdateStrategy {
  "rollingUpdate": RedisRedisClusterSpecKubernetesConfigUpdateStrategyRollingUpdate | undefined
  "type": string | undefined
}
export interface RedisRedisClusterSpecKubernetesConfig {
  "image": string
  "imagePullPolicy": string | undefined
  "imagePullSecrets": Array<RedisRedisClusterSpecKubernetesConfigImagePullSecretsItem> | undefined
  "redisSecret": RedisRedisClusterSpecKubernetesConfigRedisSecret | undefined
  "resources": RedisRedisClusterSpecKubernetesConfigResources | undefined
  "updateStrategy": RedisRedisClusterSpecKubernetesConfigUpdateStrategy | undefined
}
export interface RedisRedisClusterSpecNodeSelector {
}
export interface RedisRedisClusterSpecRedisExporterEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface RedisRedisClusterSpecRedisExporterEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface RedisRedisClusterSpecRedisExporterEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface RedisRedisClusterSpecRedisExporterEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface RedisRedisClusterSpecRedisExporterEnvItemValueFrom {
  "configMapKeyRef": RedisRedisClusterSpecRedisExporterEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": RedisRedisClusterSpecRedisExporterEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": RedisRedisClusterSpecRedisExporterEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": RedisRedisClusterSpecRedisExporterEnvItemValueFromSecretKeyRef | undefined
}
export interface RedisRedisClusterSpecRedisExporterEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": RedisRedisClusterSpecRedisExporterEnvItemValueFrom | undefined
}
export interface RedisRedisClusterSpecRedisExporterResourcesLimits {
}
export interface RedisRedisClusterSpecRedisExporterResourcesRequests {
}
export interface RedisRedisClusterSpecRedisExporterResources {
  "limits": RedisRedisClusterSpecRedisExporterResourcesLimits | undefined
  "requests": RedisRedisClusterSpecRedisExporterResourcesRequests | undefined
}
export interface RedisRedisClusterSpecRedisExporter {
  "enabled": boolean | undefined
  "env": Array<RedisRedisClusterSpecRedisExporterEnvItem> | undefined
  "image": string
  "imagePullPolicy": string | undefined
  "resources": RedisRedisClusterSpecRedisExporterResources | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  "matchExpressions": Array<RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  "matchFields": Array<RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "preference": RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  "weight": number
}
export interface RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  "matchExpressions": Array<RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  "matchFields": Array<RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  "nodeSelectorTerms": Array<RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface RedisRedisClusterSpecRedisFollowerAffinityNodeAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": RedisRedisClusterSpecRedisFollowerAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisFollowerAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisFollowerAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisFollowerAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisFollowerAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": RedisRedisClusterSpecRedisFollowerAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": RedisRedisClusterSpecRedisFollowerAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisClusterSpecRedisFollowerAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisClusterSpecRedisFollowerAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface RedisRedisClusterSpecRedisFollowerAffinity {
  "nodeAffinity": RedisRedisClusterSpecRedisFollowerAffinityNodeAffinity | undefined
  "podAffinity": RedisRedisClusterSpecRedisFollowerAffinityPodAffinity | undefined
  "podAntiAffinity": RedisRedisClusterSpecRedisFollowerAffinityPodAntiAffinity | undefined
}
export interface RedisRedisClusterSpecRedisFollowerLivenessProbe {
  "failureThreshold": number | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "timeoutSeconds": number | undefined
}
export interface RedisRedisClusterSpecRedisFollowerPdb {
  "enabled": boolean | undefined
  "maxUnavailable": number | undefined
  "minAvailable": number | undefined
}
export interface RedisRedisClusterSpecRedisFollowerReadinessProbe {
  "failureThreshold": number | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "timeoutSeconds": number | undefined
}
export interface RedisRedisClusterSpecRedisFollowerRedisConfig {
  "additionalRedisConfig": string | undefined
}
export interface RedisRedisClusterSpecRedisFollower {
  "affinity": RedisRedisClusterSpecRedisFollowerAffinity | undefined
  "livenessProbe": RedisRedisClusterSpecRedisFollowerLivenessProbe | undefined
  "pdb": RedisRedisClusterSpecRedisFollowerPdb | undefined
  "readinessProbe": RedisRedisClusterSpecRedisFollowerReadinessProbe | undefined
  "redisConfig": RedisRedisClusterSpecRedisFollowerRedisConfig | undefined
  "replicas": number | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  "matchExpressions": Array<RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  "matchFields": Array<RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "preference": RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  "weight": number
}
export interface RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  "matchExpressions": Array<RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  "matchFields": Array<RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  "nodeSelectorTerms": Array<RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface RedisRedisClusterSpecRedisLeaderAffinityNodeAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": RedisRedisClusterSpecRedisLeaderAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisLeaderAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisLeaderAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisLeaderAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisLeaderAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": RedisRedisClusterSpecRedisLeaderAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": RedisRedisClusterSpecRedisLeaderAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisClusterSpecRedisLeaderAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisClusterSpecRedisLeaderAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface RedisRedisClusterSpecRedisLeaderAffinity {
  "nodeAffinity": RedisRedisClusterSpecRedisLeaderAffinityNodeAffinity | undefined
  "podAffinity": RedisRedisClusterSpecRedisLeaderAffinityPodAffinity | undefined
  "podAntiAffinity": RedisRedisClusterSpecRedisLeaderAffinityPodAntiAffinity | undefined
}
export interface RedisRedisClusterSpecRedisLeaderLivenessProbe {
  "failureThreshold": number | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "timeoutSeconds": number | undefined
}
export interface RedisRedisClusterSpecRedisLeaderPdb {
  "enabled": boolean | undefined
  "maxUnavailable": number | undefined
  "minAvailable": number | undefined
}
export interface RedisRedisClusterSpecRedisLeaderReadinessProbe {
  "failureThreshold": number | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "timeoutSeconds": number | undefined
}
export interface RedisRedisClusterSpecRedisLeaderRedisConfig {
  "additionalRedisConfig": string | undefined
}
export interface RedisRedisClusterSpecRedisLeader {
  "affinity": RedisRedisClusterSpecRedisLeaderAffinity | undefined
  "livenessProbe": RedisRedisClusterSpecRedisLeaderLivenessProbe | undefined
  "pdb": RedisRedisClusterSpecRedisLeaderPdb | undefined
  "readinessProbe": RedisRedisClusterSpecRedisLeaderReadinessProbe | undefined
  "redisConfig": RedisRedisClusterSpecRedisLeaderRedisConfig | undefined
  "replicas": number | undefined
}
export interface RedisRedisClusterSpecResourcesLimits {
}
export interface RedisRedisClusterSpecResourcesRequests {
}
export interface RedisRedisClusterSpecResources {
  "limits": RedisRedisClusterSpecResourcesLimits | undefined
  "requests": RedisRedisClusterSpecResourcesRequests | undefined
}
export interface RedisRedisClusterSpecSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface RedisRedisClusterSpecSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface RedisRedisClusterSpecSecurityContextSysctlsItem {
  "name": string
  "value": string
}
export interface RedisRedisClusterSpecSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface RedisRedisClusterSpecSecurityContext {
  "fsGroup": number | undefined
  "fsGroupChangePolicy": string | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": RedisRedisClusterSpecSecurityContextSeLinuxOptions | undefined
  "seccompProfile": RedisRedisClusterSpecSecurityContextSeccompProfile | undefined
  "supplementalGroups": Array<number> | undefined
  "sysctls": Array<RedisRedisClusterSpecSecurityContextSysctlsItem> | undefined
  "windowsOptions": RedisRedisClusterSpecSecurityContextWindowsOptions | undefined
}
export interface RedisRedisClusterSpecSidecarsItemEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface RedisRedisClusterSpecSidecarsItemEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface RedisRedisClusterSpecSidecarsItemEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface RedisRedisClusterSpecSidecarsItemEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface RedisRedisClusterSpecSidecarsItemEnvItemValueFrom {
  "configMapKeyRef": RedisRedisClusterSpecSidecarsItemEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": RedisRedisClusterSpecSidecarsItemEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": RedisRedisClusterSpecSidecarsItemEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": RedisRedisClusterSpecSidecarsItemEnvItemValueFromSecretKeyRef | undefined
}
export interface RedisRedisClusterSpecSidecarsItemEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": RedisRedisClusterSpecSidecarsItemEnvItemValueFrom | undefined
}
export interface RedisRedisClusterSpecSidecarsItemResourcesLimits {
}
export interface RedisRedisClusterSpecSidecarsItemResourcesRequests {
}
export interface RedisRedisClusterSpecSidecarsItemResources {
  "limits": RedisRedisClusterSpecSidecarsItemResourcesLimits | undefined
  "requests": RedisRedisClusterSpecSidecarsItemResourcesRequests | undefined
}
export interface RedisRedisClusterSpecSidecarsItem {
  "env": Array<RedisRedisClusterSpecSidecarsItemEnvItem> | undefined
  "image": string
  "imagePullPolicy": string | undefined
  "name": string
  "resources": RedisRedisClusterSpecSidecarsItemResources | undefined
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplateMetadata {
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplateSpecDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplateSpecDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplateSpecResourcesLimits {
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplateSpecResourcesRequests {
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplateSpecResources {
  "limits": RedisRedisClusterSpecStorageVolumeClaimTemplateSpecResourcesLimits | undefined
  "requests": RedisRedisClusterSpecStorageVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplateSpecSelector {
  "matchExpressions": Array<RedisRedisClusterSpecStorageVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  "matchLabels": RedisRedisClusterSpecStorageVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplateSpec {
  "accessModes": Array<string> | undefined
  "dataSource": RedisRedisClusterSpecStorageVolumeClaimTemplateSpecDataSource | undefined
  "dataSourceRef": RedisRedisClusterSpecStorageVolumeClaimTemplateSpecDataSourceRef | undefined
  "resources": RedisRedisClusterSpecStorageVolumeClaimTemplateSpecResources | undefined
  "selector": RedisRedisClusterSpecStorageVolumeClaimTemplateSpecSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplateStatusAllocatedResources {
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplateStatusCapacity {
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplateStatusConditionsItem {
  "lastProbeTime": string | undefined
  "lastTransitionTime": string | undefined
  "message": string | undefined
  "reason": string | undefined
  "status": string
  "type": string
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplateStatus {
  "accessModes": Array<string> | undefined
  "allocatedResources": RedisRedisClusterSpecStorageVolumeClaimTemplateStatusAllocatedResources | undefined
  "capacity": RedisRedisClusterSpecStorageVolumeClaimTemplateStatusCapacity | undefined
  "conditions": Array<RedisRedisClusterSpecStorageVolumeClaimTemplateStatusConditionsItem> | undefined
  "phase": string | undefined
  "resizeStatus": string | undefined
}
export interface RedisRedisClusterSpecStorageVolumeClaimTemplate {
  "apiVersion": string | undefined
  "kind": string | undefined
  "metadata": RedisRedisClusterSpecStorageVolumeClaimTemplateMetadata | undefined
  "spec": RedisRedisClusterSpecStorageVolumeClaimTemplateSpec | undefined
  "status": RedisRedisClusterSpecStorageVolumeClaimTemplateStatus | undefined
}
export interface RedisRedisClusterSpecStorage {
  "volumeClaimTemplate": RedisRedisClusterSpecStorageVolumeClaimTemplate | undefined
}
export interface RedisRedisClusterSpecTolerationsItem {
  "effect": string | undefined
  "key": string | undefined
  "operator": string | undefined
  "tolerationSeconds": number | undefined
  "value": string | undefined
}
export interface RedisRedisClusterSpec {
  "TLS": RedisRedisClusterSpecTLS | undefined
  "clusterSize": number
  "clusterVersion": string | undefined
  "kubernetesConfig": RedisRedisClusterSpecKubernetesConfig
  "nodeSelector": RedisRedisClusterSpecNodeSelector | undefined
  "persistenceEnabled": boolean | undefined
  "priorityClassName": string | undefined
  "redisExporter": RedisRedisClusterSpecRedisExporter | undefined
  "redisFollower": RedisRedisClusterSpecRedisFollower | undefined
  "redisLeader": RedisRedisClusterSpecRedisLeader | undefined
  "resources": RedisRedisClusterSpecResources | undefined
  "securityContext": RedisRedisClusterSpecSecurityContext | undefined
  "serviceAccountName": string | undefined
  "sidecars": Array<RedisRedisClusterSpecSidecarsItem> | undefined
  "storage": RedisRedisClusterSpecStorage | undefined
  "tolerations": Array<RedisRedisClusterSpecTolerationsItem> | undefined
}
export interface RedisRedisCluster extends KubernetesObject {
  spec: RedisRedisClusterSpec
  status: RedisRedisClusterStatus | undefined
}
export type RedisRedisClusterList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<RedisRedisCluster>
