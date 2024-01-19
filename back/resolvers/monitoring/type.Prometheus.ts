type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MonitoringPrometheusStatusConditionsItem {
  "lastTransitionTime": string
  "message": string | undefined
  "observedGeneration": number | undefined
  "reason": string | undefined
  "status": string
  "type": string
}
export interface MonitoringPrometheusStatusShardStatusesItem {
  "availableReplicas": number
  "replicas": number
  "shardID": string
  "unavailableReplicas": number
  "updatedReplicas": number
}
export interface MonitoringPrometheusStatus {
  "availableReplicas": number
  "conditions": Array<MonitoringPrometheusStatusConditionsItem> | undefined
  "paused": boolean
  "replicas": number
  "shardStatuses": Array<MonitoringPrometheusStatusShardStatusesItem> | undefined
  "unavailableReplicas": number
  "updatedReplicas": number
}
export interface MonitoringPrometheusSpecAdditionalAlertManagerConfigs {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecAdditionalAlertRelabelConfigs {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecAdditionalArgsItem {
  "name": string
  "value": string | undefined
}
export interface MonitoringPrometheusSpecAdditionalScrapeConfigs {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  "matchExpressions": Array<MonitoringPrometheusSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  "matchFields": Array<MonitoringPrometheusSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface MonitoringPrometheusSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "preference": MonitoringPrometheusSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  "weight": number
}
export interface MonitoringPrometheusSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  "matchExpressions": Array<MonitoringPrometheusSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  "matchFields": Array<MonitoringPrometheusSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface MonitoringPrometheusSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  "nodeSelectorTerms": Array<MonitoringPrometheusSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface MonitoringPrometheusSpecAffinityNodeAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<MonitoringPrometheusSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": MonitoringPrometheusSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface MonitoringPrometheusSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": MonitoringPrometheusSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": MonitoringPrometheusSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface MonitoringPrometheusSpecAffinityPodAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<MonitoringPrometheusSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<MonitoringPrometheusSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": MonitoringPrometheusSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": MonitoringPrometheusSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface MonitoringPrometheusSpecAffinityPodAntiAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<MonitoringPrometheusSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<MonitoringPrometheusSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface MonitoringPrometheusSpecAffinity {
  "nodeAffinity": MonitoringPrometheusSpecAffinityNodeAffinity | undefined
  "podAffinity": MonitoringPrometheusSpecAffinityPodAffinity | undefined
  "podAntiAffinity": MonitoringPrometheusSpecAffinityPodAntiAffinity | undefined
}
export interface MonitoringPrometheusSpecAlertingAlertmanagersItemAuthorizationCredentials {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecAlertingAlertmanagersItemAuthorization {
  "credentials": MonitoringPrometheusSpecAlertingAlertmanagersItemAuthorizationCredentials | undefined
  "type": string | undefined
}
export interface MonitoringPrometheusSpecAlertingAlertmanagersItemBasicAuthPassword {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecAlertingAlertmanagersItemBasicAuthUsername {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecAlertingAlertmanagersItemBasicAuth {
  "password": MonitoringPrometheusSpecAlertingAlertmanagersItemBasicAuthPassword | undefined
  "username": MonitoringPrometheusSpecAlertingAlertmanagersItemBasicAuthUsername | undefined
}
export interface MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfigCaConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfigCaSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfigCa {
  "configMap": MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfigCaConfigMap | undefined
  "secret": MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfigCaSecret | undefined
}
export interface MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfigCertConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfigCertSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfigCert {
  "configMap": MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfigCertConfigMap | undefined
  "secret": MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfigCertSecret | undefined
}
export interface MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfigKeySecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfig {
  "ca": MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfigCa | undefined
  "caFile": string | undefined
  "cert": MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfigCert | undefined
  "certFile": string | undefined
  "insecureSkipVerify": boolean | undefined
  "keyFile": string | undefined
  "keySecret": MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfigKeySecret | undefined
  "serverName": string | undefined
}
export interface MonitoringPrometheusSpecAlertingAlertmanagersItem {
  "apiVersion": string | undefined
  "authorization": MonitoringPrometheusSpecAlertingAlertmanagersItemAuthorization | undefined
  "basicAuth": MonitoringPrometheusSpecAlertingAlertmanagersItemBasicAuth | undefined
  "bearerTokenFile": string | undefined
  "enableHttp2": boolean | undefined
  "name": string
  "namespace": string
  "pathPrefix": string | undefined
  "port": object
  "scheme": string | undefined
  "timeout": string | undefined
  "tlsConfig": MonitoringPrometheusSpecAlertingAlertmanagersItemTlsConfig | undefined
}
export interface MonitoringPrometheusSpecAlerting {
  "alertmanagers": Array<MonitoringPrometheusSpecAlertingAlertmanagersItem>
}
export interface MonitoringPrometheusSpecApiserverConfigAuthorizationCredentials {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecApiserverConfigAuthorization {
  "credentials": MonitoringPrometheusSpecApiserverConfigAuthorizationCredentials | undefined
  "credentialsFile": string | undefined
  "type": string | undefined
}
export interface MonitoringPrometheusSpecApiserverConfigBasicAuthPassword {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecApiserverConfigBasicAuthUsername {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecApiserverConfigBasicAuth {
  "password": MonitoringPrometheusSpecApiserverConfigBasicAuthPassword | undefined
  "username": MonitoringPrometheusSpecApiserverConfigBasicAuthUsername | undefined
}
export interface MonitoringPrometheusSpecApiserverConfigTlsConfigCaConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecApiserverConfigTlsConfigCaSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecApiserverConfigTlsConfigCa {
  "configMap": MonitoringPrometheusSpecApiserverConfigTlsConfigCaConfigMap | undefined
  "secret": MonitoringPrometheusSpecApiserverConfigTlsConfigCaSecret | undefined
}
export interface MonitoringPrometheusSpecApiserverConfigTlsConfigCertConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecApiserverConfigTlsConfigCertSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecApiserverConfigTlsConfigCert {
  "configMap": MonitoringPrometheusSpecApiserverConfigTlsConfigCertConfigMap | undefined
  "secret": MonitoringPrometheusSpecApiserverConfigTlsConfigCertSecret | undefined
}
export interface MonitoringPrometheusSpecApiserverConfigTlsConfigKeySecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecApiserverConfigTlsConfig {
  "ca": MonitoringPrometheusSpecApiserverConfigTlsConfigCa | undefined
  "caFile": string | undefined
  "cert": MonitoringPrometheusSpecApiserverConfigTlsConfigCert | undefined
  "certFile": string | undefined
  "insecureSkipVerify": boolean | undefined
  "keyFile": string | undefined
  "keySecret": MonitoringPrometheusSpecApiserverConfigTlsConfigKeySecret | undefined
  "serverName": string | undefined
}
export interface MonitoringPrometheusSpecApiserverConfig {
  "authorization": MonitoringPrometheusSpecApiserverConfigAuthorization | undefined
  "basicAuth": MonitoringPrometheusSpecApiserverConfigBasicAuth | undefined
  "bearerToken": string | undefined
  "bearerTokenFile": string | undefined
  "host": string
  "tlsConfig": MonitoringPrometheusSpecApiserverConfigTlsConfig | undefined
}
export interface MonitoringPrometheusSpecArbitraryFSAccessThroughSMs {
  "deny": boolean | undefined
}
export interface MonitoringPrometheusSpecContainersItemEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecContainersItemEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MonitoringPrometheusSpecContainersItemEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MonitoringPrometheusSpecContainersItemEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecContainersItemEnvItemValueFrom {
  "configMapKeyRef": MonitoringPrometheusSpecContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": MonitoringPrometheusSpecContainersItemEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": MonitoringPrometheusSpecContainersItemEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": MonitoringPrometheusSpecContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface MonitoringPrometheusSpecContainersItemEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": MonitoringPrometheusSpecContainersItemEnvItemValueFrom | undefined
}
export interface MonitoringPrometheusSpecContainersItemEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecContainersItemEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecContainersItemEnvFromItem {
  "configMapRef": MonitoringPrometheusSpecContainersItemEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": MonitoringPrometheusSpecContainersItemEnvFromItemSecretRef | undefined
}
export interface MonitoringPrometheusSpecContainersItemLifecyclePostStartExec {
  "command": Array<string> | undefined
}
export interface MonitoringPrometheusSpecContainersItemLifecyclePostStartHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringPrometheusSpecContainersItemLifecyclePostStartHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringPrometheusSpecContainersItemLifecyclePostStartHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringPrometheusSpecContainersItemLifecyclePostStartTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringPrometheusSpecContainersItemLifecyclePostStart {
  "exec": MonitoringPrometheusSpecContainersItemLifecyclePostStartExec | undefined
  "httpGet": MonitoringPrometheusSpecContainersItemLifecyclePostStartHttpGet | undefined
  "tcpSocket": MonitoringPrometheusSpecContainersItemLifecyclePostStartTcpSocket | undefined
}
export interface MonitoringPrometheusSpecContainersItemLifecyclePreStopExec {
  "command": Array<string> | undefined
}
export interface MonitoringPrometheusSpecContainersItemLifecyclePreStopHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringPrometheusSpecContainersItemLifecyclePreStopHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringPrometheusSpecContainersItemLifecyclePreStopHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringPrometheusSpecContainersItemLifecyclePreStopTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringPrometheusSpecContainersItemLifecyclePreStop {
  "exec": MonitoringPrometheusSpecContainersItemLifecyclePreStopExec | undefined
  "httpGet": MonitoringPrometheusSpecContainersItemLifecyclePreStopHttpGet | undefined
  "tcpSocket": MonitoringPrometheusSpecContainersItemLifecyclePreStopTcpSocket | undefined
}
export interface MonitoringPrometheusSpecContainersItemLifecycle {
  "postStart": MonitoringPrometheusSpecContainersItemLifecyclePostStart | undefined
  "preStop": MonitoringPrometheusSpecContainersItemLifecyclePreStop | undefined
}
export interface MonitoringPrometheusSpecContainersItemLivenessProbeExec {
  "command": Array<string> | undefined
}
export interface MonitoringPrometheusSpecContainersItemLivenessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MonitoringPrometheusSpecContainersItemLivenessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringPrometheusSpecContainersItemLivenessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringPrometheusSpecContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringPrometheusSpecContainersItemLivenessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringPrometheusSpecContainersItemLivenessProbe {
  "exec": MonitoringPrometheusSpecContainersItemLivenessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MonitoringPrometheusSpecContainersItemLivenessProbeGrpc | undefined
  "httpGet": MonitoringPrometheusSpecContainersItemLivenessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MonitoringPrometheusSpecContainersItemLivenessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MonitoringPrometheusSpecContainersItemPortsItem {
  "containerPort": number
  "hostIP": string | undefined
  "hostPort": number | undefined
  "name": string | undefined
  "protocol": string | undefined
}
export interface MonitoringPrometheusSpecContainersItemReadinessProbeExec {
  "command": Array<string> | undefined
}
export interface MonitoringPrometheusSpecContainersItemReadinessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MonitoringPrometheusSpecContainersItemReadinessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringPrometheusSpecContainersItemReadinessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringPrometheusSpecContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringPrometheusSpecContainersItemReadinessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringPrometheusSpecContainersItemReadinessProbe {
  "exec": MonitoringPrometheusSpecContainersItemReadinessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MonitoringPrometheusSpecContainersItemReadinessProbeGrpc | undefined
  "httpGet": MonitoringPrometheusSpecContainersItemReadinessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MonitoringPrometheusSpecContainersItemReadinessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MonitoringPrometheusSpecContainersItemResizePolicyItem {
  "resourceName": string
  "restartPolicy": string
}
export interface MonitoringPrometheusSpecContainersItemResourcesClaimsItem {
  "name": string
}
export interface MonitoringPrometheusSpecContainersItemResourcesLimits {
}
export interface MonitoringPrometheusSpecContainersItemResourcesRequests {
}
export interface MonitoringPrometheusSpecContainersItemResources {
  "claims": Array<MonitoringPrometheusSpecContainersItemResourcesClaimsItem> | undefined
  "limits": MonitoringPrometheusSpecContainersItemResourcesLimits | undefined
  "requests": MonitoringPrometheusSpecContainersItemResourcesRequests | undefined
}
export interface MonitoringPrometheusSpecContainersItemSecurityContextCapabilities {
  "add": Array<string> | undefined
  "drop": Array<string> | undefined
}
export interface MonitoringPrometheusSpecContainersItemSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface MonitoringPrometheusSpecContainersItemSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface MonitoringPrometheusSpecContainersItemSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface MonitoringPrometheusSpecContainersItemSecurityContext {
  "allowPrivilegeEscalation": boolean | undefined
  "capabilities": MonitoringPrometheusSpecContainersItemSecurityContextCapabilities | undefined
  "privileged": boolean | undefined
  "procMount": string | undefined
  "readOnlyRootFilesystem": boolean | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": MonitoringPrometheusSpecContainersItemSecurityContextSeLinuxOptions | undefined
  "seccompProfile": MonitoringPrometheusSpecContainersItemSecurityContextSeccompProfile | undefined
  "windowsOptions": MonitoringPrometheusSpecContainersItemSecurityContextWindowsOptions | undefined
}
export interface MonitoringPrometheusSpecContainersItemStartupProbeExec {
  "command": Array<string> | undefined
}
export interface MonitoringPrometheusSpecContainersItemStartupProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MonitoringPrometheusSpecContainersItemStartupProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringPrometheusSpecContainersItemStartupProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringPrometheusSpecContainersItemStartupProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringPrometheusSpecContainersItemStartupProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringPrometheusSpecContainersItemStartupProbe {
  "exec": MonitoringPrometheusSpecContainersItemStartupProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MonitoringPrometheusSpecContainersItemStartupProbeGrpc | undefined
  "httpGet": MonitoringPrometheusSpecContainersItemStartupProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MonitoringPrometheusSpecContainersItemStartupProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MonitoringPrometheusSpecContainersItemVolumeDevicesItem {
  "devicePath": string
  "name": string
}
export interface MonitoringPrometheusSpecContainersItemVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface MonitoringPrometheusSpecContainersItem {
  "args": Array<string> | undefined
  "command": Array<string> | undefined
  "env": Array<MonitoringPrometheusSpecContainersItemEnvItem> | undefined
  "envFrom": Array<MonitoringPrometheusSpecContainersItemEnvFromItem> | undefined
  "image": string | undefined
  "imagePullPolicy": string | undefined
  "lifecycle": MonitoringPrometheusSpecContainersItemLifecycle | undefined
  "livenessProbe": MonitoringPrometheusSpecContainersItemLivenessProbe | undefined
  "name": string
  "ports": Array<MonitoringPrometheusSpecContainersItemPortsItem> | undefined
  "readinessProbe": MonitoringPrometheusSpecContainersItemReadinessProbe | undefined
  "resizePolicy": Array<MonitoringPrometheusSpecContainersItemResizePolicyItem> | undefined
  "resources": MonitoringPrometheusSpecContainersItemResources | undefined
  "securityContext": MonitoringPrometheusSpecContainersItemSecurityContext | undefined
  "startupProbe": MonitoringPrometheusSpecContainersItemStartupProbe | undefined
  "stdin": boolean | undefined
  "stdinOnce": boolean | undefined
  "terminationMessagePath": string | undefined
  "terminationMessagePolicy": string | undefined
  "tty": boolean | undefined
  "volumeDevices": Array<MonitoringPrometheusSpecContainersItemVolumeDevicesItem> | undefined
  "volumeMounts": Array<MonitoringPrometheusSpecContainersItemVolumeMountsItem> | undefined
  "workingDir": string | undefined
}
export interface MonitoringPrometheusSpecExcludedFromEnforcementItem {
  "group": string | undefined
  "name": string | undefined
  "namespace": string
  "resource": string
}
export interface MonitoringPrometheusSpecExemplars {
  "maxSize": number | undefined
}
export interface MonitoringPrometheusSpecExternalLabels {
}
export interface MonitoringPrometheusSpecHostAliasesItem {
  "hostnames": Array<string>
  "ip": string
}
export interface MonitoringPrometheusSpecImagePullSecretsItem {
  "name": string | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MonitoringPrometheusSpecInitContainersItemEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MonitoringPrometheusSpecInitContainersItemEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemEnvItemValueFrom {
  "configMapKeyRef": MonitoringPrometheusSpecInitContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": MonitoringPrometheusSpecInitContainersItemEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": MonitoringPrometheusSpecInitContainersItemEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": MonitoringPrometheusSpecInitContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": MonitoringPrometheusSpecInitContainersItemEnvItemValueFrom | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemEnvFromItem {
  "configMapRef": MonitoringPrometheusSpecInitContainersItemEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": MonitoringPrometheusSpecInitContainersItemEnvFromItemSecretRef | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemLifecyclePostStartExec {
  "command": Array<string> | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemLifecyclePostStartHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringPrometheusSpecInitContainersItemLifecyclePostStartHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringPrometheusSpecInitContainersItemLifecyclePostStartHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemLifecyclePostStartTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringPrometheusSpecInitContainersItemLifecyclePostStart {
  "exec": MonitoringPrometheusSpecInitContainersItemLifecyclePostStartExec | undefined
  "httpGet": MonitoringPrometheusSpecInitContainersItemLifecyclePostStartHttpGet | undefined
  "tcpSocket": MonitoringPrometheusSpecInitContainersItemLifecyclePostStartTcpSocket | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemLifecyclePreStopExec {
  "command": Array<string> | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemLifecyclePreStopHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringPrometheusSpecInitContainersItemLifecyclePreStopHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringPrometheusSpecInitContainersItemLifecyclePreStopHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemLifecyclePreStopTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringPrometheusSpecInitContainersItemLifecyclePreStop {
  "exec": MonitoringPrometheusSpecInitContainersItemLifecyclePreStopExec | undefined
  "httpGet": MonitoringPrometheusSpecInitContainersItemLifecyclePreStopHttpGet | undefined
  "tcpSocket": MonitoringPrometheusSpecInitContainersItemLifecyclePreStopTcpSocket | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemLifecycle {
  "postStart": MonitoringPrometheusSpecInitContainersItemLifecyclePostStart | undefined
  "preStop": MonitoringPrometheusSpecInitContainersItemLifecyclePreStop | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemLivenessProbeExec {
  "command": Array<string> | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemLivenessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemLivenessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringPrometheusSpecInitContainersItemLivenessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringPrometheusSpecInitContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemLivenessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringPrometheusSpecInitContainersItemLivenessProbe {
  "exec": MonitoringPrometheusSpecInitContainersItemLivenessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MonitoringPrometheusSpecInitContainersItemLivenessProbeGrpc | undefined
  "httpGet": MonitoringPrometheusSpecInitContainersItemLivenessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MonitoringPrometheusSpecInitContainersItemLivenessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemPortsItem {
  "containerPort": number
  "hostIP": string | undefined
  "hostPort": number | undefined
  "name": string | undefined
  "protocol": string | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemReadinessProbeExec {
  "command": Array<string> | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemReadinessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemReadinessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringPrometheusSpecInitContainersItemReadinessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringPrometheusSpecInitContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemReadinessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringPrometheusSpecInitContainersItemReadinessProbe {
  "exec": MonitoringPrometheusSpecInitContainersItemReadinessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MonitoringPrometheusSpecInitContainersItemReadinessProbeGrpc | undefined
  "httpGet": MonitoringPrometheusSpecInitContainersItemReadinessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MonitoringPrometheusSpecInitContainersItemReadinessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemResizePolicyItem {
  "resourceName": string
  "restartPolicy": string
}
export interface MonitoringPrometheusSpecInitContainersItemResourcesClaimsItem {
  "name": string
}
export interface MonitoringPrometheusSpecInitContainersItemResourcesLimits {
}
export interface MonitoringPrometheusSpecInitContainersItemResourcesRequests {
}
export interface MonitoringPrometheusSpecInitContainersItemResources {
  "claims": Array<MonitoringPrometheusSpecInitContainersItemResourcesClaimsItem> | undefined
  "limits": MonitoringPrometheusSpecInitContainersItemResourcesLimits | undefined
  "requests": MonitoringPrometheusSpecInitContainersItemResourcesRequests | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemSecurityContextCapabilities {
  "add": Array<string> | undefined
  "drop": Array<string> | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface MonitoringPrometheusSpecInitContainersItemSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemSecurityContext {
  "allowPrivilegeEscalation": boolean | undefined
  "capabilities": MonitoringPrometheusSpecInitContainersItemSecurityContextCapabilities | undefined
  "privileged": boolean | undefined
  "procMount": string | undefined
  "readOnlyRootFilesystem": boolean | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": MonitoringPrometheusSpecInitContainersItemSecurityContextSeLinuxOptions | undefined
  "seccompProfile": MonitoringPrometheusSpecInitContainersItemSecurityContextSeccompProfile | undefined
  "windowsOptions": MonitoringPrometheusSpecInitContainersItemSecurityContextWindowsOptions | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemStartupProbeExec {
  "command": Array<string> | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemStartupProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemStartupProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringPrometheusSpecInitContainersItemStartupProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringPrometheusSpecInitContainersItemStartupProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemStartupProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringPrometheusSpecInitContainersItemStartupProbe {
  "exec": MonitoringPrometheusSpecInitContainersItemStartupProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MonitoringPrometheusSpecInitContainersItemStartupProbeGrpc | undefined
  "httpGet": MonitoringPrometheusSpecInitContainersItemStartupProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MonitoringPrometheusSpecInitContainersItemStartupProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MonitoringPrometheusSpecInitContainersItemVolumeDevicesItem {
  "devicePath": string
  "name": string
}
export interface MonitoringPrometheusSpecInitContainersItemVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface MonitoringPrometheusSpecInitContainersItem {
  "args": Array<string> | undefined
  "command": Array<string> | undefined
  "env": Array<MonitoringPrometheusSpecInitContainersItemEnvItem> | undefined
  "envFrom": Array<MonitoringPrometheusSpecInitContainersItemEnvFromItem> | undefined
  "image": string | undefined
  "imagePullPolicy": string | undefined
  "lifecycle": MonitoringPrometheusSpecInitContainersItemLifecycle | undefined
  "livenessProbe": MonitoringPrometheusSpecInitContainersItemLivenessProbe | undefined
  "name": string
  "ports": Array<MonitoringPrometheusSpecInitContainersItemPortsItem> | undefined
  "readinessProbe": MonitoringPrometheusSpecInitContainersItemReadinessProbe | undefined
  "resizePolicy": Array<MonitoringPrometheusSpecInitContainersItemResizePolicyItem> | undefined
  "resources": MonitoringPrometheusSpecInitContainersItemResources | undefined
  "securityContext": MonitoringPrometheusSpecInitContainersItemSecurityContext | undefined
  "startupProbe": MonitoringPrometheusSpecInitContainersItemStartupProbe | undefined
  "stdin": boolean | undefined
  "stdinOnce": boolean | undefined
  "terminationMessagePath": string | undefined
  "terminationMessagePolicy": string | undefined
  "tty": boolean | undefined
  "volumeDevices": Array<MonitoringPrometheusSpecInitContainersItemVolumeDevicesItem> | undefined
  "volumeMounts": Array<MonitoringPrometheusSpecInitContainersItemVolumeMountsItem> | undefined
  "workingDir": string | undefined
}
export interface MonitoringPrometheusSpecNodeSelector {
}
export interface MonitoringPrometheusSpecPodMetadataAnnotations {
}
export interface MonitoringPrometheusSpecPodMetadataLabels {
}
export interface MonitoringPrometheusSpecPodMetadata {
  "annotations": MonitoringPrometheusSpecPodMetadataAnnotations | undefined
  "labels": MonitoringPrometheusSpecPodMetadataLabels | undefined
  "name": string | undefined
}
export interface MonitoringPrometheusSpecPodMonitorNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecPodMonitorNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecPodMonitorNamespaceSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecPodMonitorNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecPodMonitorNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecPodMonitorSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecPodMonitorSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecPodMonitorSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecPodMonitorSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecPodMonitorSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecProbeNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecProbeNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecProbeNamespaceSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecProbeNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecProbeNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecProbeSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecProbeSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecProbeSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecProbeSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecProbeSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecPrometheusRulesExcludedFromEnforceItem {
  "ruleName": string
  "ruleNamespace": string
}
export interface MonitoringPrometheusSpecQuery {
  "lookbackDelta": string | undefined
  "maxConcurrency": number | undefined
  "maxSamples": number | undefined
  "timeout": string | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemAuthorizationCredentials {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemAuthorization {
  "credentials": MonitoringPrometheusSpecRemoteReadItemAuthorizationCredentials | undefined
  "credentialsFile": string | undefined
  "type": string | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemBasicAuthPassword {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemBasicAuthUsername {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemBasicAuth {
  "password": MonitoringPrometheusSpecRemoteReadItemBasicAuthPassword | undefined
  "username": MonitoringPrometheusSpecRemoteReadItemBasicAuthUsername | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemHeaders {
}
export interface MonitoringPrometheusSpecRemoteReadItemOauth2ClientIdConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemOauth2ClientIdSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemOauth2ClientId {
  "configMap": MonitoringPrometheusSpecRemoteReadItemOauth2ClientIdConfigMap | undefined
  "secret": MonitoringPrometheusSpecRemoteReadItemOauth2ClientIdSecret | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemOauth2ClientSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemOauth2EndpointParams {
}
export interface MonitoringPrometheusSpecRemoteReadItemOauth2 {
  "clientId": MonitoringPrometheusSpecRemoteReadItemOauth2ClientId
  "clientSecret": MonitoringPrometheusSpecRemoteReadItemOauth2ClientSecret
  "endpointParams": MonitoringPrometheusSpecRemoteReadItemOauth2EndpointParams | undefined
  "scopes": Array<string> | undefined
  "tokenUrl": string
}
export interface MonitoringPrometheusSpecRemoteReadItemRequiredMatchers {
}
export interface MonitoringPrometheusSpecRemoteReadItemTlsConfigCaConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemTlsConfigCaSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemTlsConfigCa {
  "configMap": MonitoringPrometheusSpecRemoteReadItemTlsConfigCaConfigMap | undefined
  "secret": MonitoringPrometheusSpecRemoteReadItemTlsConfigCaSecret | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemTlsConfigCertConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemTlsConfigCertSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemTlsConfigCert {
  "configMap": MonitoringPrometheusSpecRemoteReadItemTlsConfigCertConfigMap | undefined
  "secret": MonitoringPrometheusSpecRemoteReadItemTlsConfigCertSecret | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemTlsConfigKeySecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItemTlsConfig {
  "ca": MonitoringPrometheusSpecRemoteReadItemTlsConfigCa | undefined
  "caFile": string | undefined
  "cert": MonitoringPrometheusSpecRemoteReadItemTlsConfigCert | undefined
  "certFile": string | undefined
  "insecureSkipVerify": boolean | undefined
  "keyFile": string | undefined
  "keySecret": MonitoringPrometheusSpecRemoteReadItemTlsConfigKeySecret | undefined
  "serverName": string | undefined
}
export interface MonitoringPrometheusSpecRemoteReadItem {
  "authorization": MonitoringPrometheusSpecRemoteReadItemAuthorization | undefined
  "basicAuth": MonitoringPrometheusSpecRemoteReadItemBasicAuth | undefined
  "bearerToken": string | undefined
  "bearerTokenFile": string | undefined
  "filterExternalLabels": boolean | undefined
  "headers": MonitoringPrometheusSpecRemoteReadItemHeaders | undefined
  "name": string | undefined
  "oauth2": MonitoringPrometheusSpecRemoteReadItemOauth2 | undefined
  "proxyUrl": string | undefined
  "readRecent": boolean | undefined
  "remoteTimeout": string | undefined
  "requiredMatchers": MonitoringPrometheusSpecRemoteReadItemRequiredMatchers | undefined
  "tlsConfig": MonitoringPrometheusSpecRemoteReadItemTlsConfig | undefined
  "url": string
}
export interface MonitoringPrometheusSpecRemoteWriteItemAuthorizationCredentials {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemAuthorization {
  "credentials": MonitoringPrometheusSpecRemoteWriteItemAuthorizationCredentials | undefined
  "credentialsFile": string | undefined
  "type": string | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemBasicAuthPassword {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemBasicAuthUsername {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemBasicAuth {
  "password": MonitoringPrometheusSpecRemoteWriteItemBasicAuthPassword | undefined
  "username": MonitoringPrometheusSpecRemoteWriteItemBasicAuthUsername | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemHeaders {
}
export interface MonitoringPrometheusSpecRemoteWriteItemMetadataConfig {
  "send": boolean | undefined
  "sendInterval": string | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemOauth2ClientIdConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemOauth2ClientIdSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemOauth2ClientId {
  "configMap": MonitoringPrometheusSpecRemoteWriteItemOauth2ClientIdConfigMap | undefined
  "secret": MonitoringPrometheusSpecRemoteWriteItemOauth2ClientIdSecret | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemOauth2ClientSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemOauth2EndpointParams {
}
export interface MonitoringPrometheusSpecRemoteWriteItemOauth2 {
  "clientId": MonitoringPrometheusSpecRemoteWriteItemOauth2ClientId
  "clientSecret": MonitoringPrometheusSpecRemoteWriteItemOauth2ClientSecret
  "endpointParams": MonitoringPrometheusSpecRemoteWriteItemOauth2EndpointParams | undefined
  "scopes": Array<string> | undefined
  "tokenUrl": string
}
export interface MonitoringPrometheusSpecRemoteWriteItemQueueConfig {
  "batchSendDeadline": string | undefined
  "capacity": number | undefined
  "maxBackoff": string | undefined
  "maxRetries": number | undefined
  "maxSamplesPerSend": number | undefined
  "maxShards": number | undefined
  "minBackoff": string | undefined
  "minShards": number | undefined
  "retryOnRateLimit": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemSigv4AccessKey {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemSigv4SecretKey {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemSigv4 {
  "accessKey": MonitoringPrometheusSpecRemoteWriteItemSigv4AccessKey | undefined
  "profile": string | undefined
  "region": string | undefined
  "roleArn": string | undefined
  "secretKey": MonitoringPrometheusSpecRemoteWriteItemSigv4SecretKey | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemTlsConfigCaConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemTlsConfigCaSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemTlsConfigCa {
  "configMap": MonitoringPrometheusSpecRemoteWriteItemTlsConfigCaConfigMap | undefined
  "secret": MonitoringPrometheusSpecRemoteWriteItemTlsConfigCaSecret | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemTlsConfigCertConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemTlsConfigCertSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemTlsConfigCert {
  "configMap": MonitoringPrometheusSpecRemoteWriteItemTlsConfigCertConfigMap | undefined
  "secret": MonitoringPrometheusSpecRemoteWriteItemTlsConfigCertSecret | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemTlsConfigKeySecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemTlsConfig {
  "ca": MonitoringPrometheusSpecRemoteWriteItemTlsConfigCa | undefined
  "caFile": string | undefined
  "cert": MonitoringPrometheusSpecRemoteWriteItemTlsConfigCert | undefined
  "certFile": string | undefined
  "insecureSkipVerify": boolean | undefined
  "keyFile": string | undefined
  "keySecret": MonitoringPrometheusSpecRemoteWriteItemTlsConfigKeySecret | undefined
  "serverName": string | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItemWriteRelabelConfigsItem {
  "action": string | undefined
  "modulus": number | undefined
  "regex": string | undefined
  "replacement": string | undefined
  "separator": string | undefined
  "sourceLabels": Array<string> | undefined
  "targetLabel": string | undefined
}
export interface MonitoringPrometheusSpecRemoteWriteItem {
  "authorization": MonitoringPrometheusSpecRemoteWriteItemAuthorization | undefined
  "basicAuth": MonitoringPrometheusSpecRemoteWriteItemBasicAuth | undefined
  "bearerToken": string | undefined
  "bearerTokenFile": string | undefined
  "headers": MonitoringPrometheusSpecRemoteWriteItemHeaders | undefined
  "metadataConfig": MonitoringPrometheusSpecRemoteWriteItemMetadataConfig | undefined
  "name": string | undefined
  "oauth2": MonitoringPrometheusSpecRemoteWriteItemOauth2 | undefined
  "proxyUrl": string | undefined
  "queueConfig": MonitoringPrometheusSpecRemoteWriteItemQueueConfig | undefined
  "remoteTimeout": string | undefined
  "sendExemplars": boolean | undefined
  "sigv4": MonitoringPrometheusSpecRemoteWriteItemSigv4 | undefined
  "tlsConfig": MonitoringPrometheusSpecRemoteWriteItemTlsConfig | undefined
  "url": string
  "writeRelabelConfigs": Array<MonitoringPrometheusSpecRemoteWriteItemWriteRelabelConfigsItem> | undefined
}
export interface MonitoringPrometheusSpecResourcesClaimsItem {
  "name": string
}
export interface MonitoringPrometheusSpecResourcesLimits {
}
export interface MonitoringPrometheusSpecResourcesRequests {
}
export interface MonitoringPrometheusSpecResources {
  "claims": Array<MonitoringPrometheusSpecResourcesClaimsItem> | undefined
  "limits": MonitoringPrometheusSpecResourcesLimits | undefined
  "requests": MonitoringPrometheusSpecResourcesRequests | undefined
}
export interface MonitoringPrometheusSpecRuleNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecRuleNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecRuleNamespaceSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecRuleNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecRuleNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecRuleSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecRuleSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecRuleSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecRuleSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecRuleSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecRulesAlert {
  "forGracePeriod": string | undefined
  "forOutageTolerance": string | undefined
  "resendDelay": string | undefined
}
export interface MonitoringPrometheusSpecRules {
  "alert": MonitoringPrometheusSpecRulesAlert | undefined
}
export interface MonitoringPrometheusSpecScrapeConfigNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecScrapeConfigNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecScrapeConfigNamespaceSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecScrapeConfigNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecScrapeConfigNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecScrapeConfigSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecScrapeConfigSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecScrapeConfigSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecScrapeConfigSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecScrapeConfigSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface MonitoringPrometheusSpecSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface MonitoringPrometheusSpecSecurityContextSysctlsItem {
  "name": string
  "value": string
}
export interface MonitoringPrometheusSpecSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface MonitoringPrometheusSpecSecurityContext {
  "fsGroup": number | undefined
  "fsGroupChangePolicy": string | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": MonitoringPrometheusSpecSecurityContextSeLinuxOptions | undefined
  "seccompProfile": MonitoringPrometheusSpecSecurityContextSeccompProfile | undefined
  "supplementalGroups": Array<number> | undefined
  "sysctls": Array<MonitoringPrometheusSpecSecurityContextSysctlsItem> | undefined
  "windowsOptions": MonitoringPrometheusSpecSecurityContextWindowsOptions | undefined
}
export interface MonitoringPrometheusSpecServiceMonitorNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecServiceMonitorNamespaceSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecServiceMonitorNamespaceSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecServiceMonitorNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecServiceMonitorNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecServiceMonitorSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecServiceMonitorSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecServiceMonitorSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecServiceMonitorSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecServiceMonitorSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecStorageEmptyDir {
  "medium": string | undefined
  "sizeLimit": object | undefined
}
export interface MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateMetadata {
}
export interface MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
  "namespace": string | undefined
}
export interface MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecResourcesClaimsItem {
  "name": string
}
export interface MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecResources {
  "claims": Array<MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  "limits": MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  "requests": MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpec {
  "accessModes": Array<string> | undefined
  "dataSource": MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecDataSource | undefined
  "dataSourceRef": MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  "resources": MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecResources | undefined
  "selector": MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpecSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplate {
  "metadata": MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateMetadata | undefined
  "spec": MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplateSpec
}
export interface MonitoringPrometheusSpecStorageEphemeral {
  "volumeClaimTemplate": MonitoringPrometheusSpecStorageEphemeralVolumeClaimTemplate | undefined
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateMetadataAnnotations {
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateMetadataLabels {
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateMetadata {
  "annotations": MonitoringPrometheusSpecStorageVolumeClaimTemplateMetadataAnnotations | undefined
  "labels": MonitoringPrometheusSpecStorageVolumeClaimTemplateMetadataLabels | undefined
  "name": string | undefined
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
  "namespace": string | undefined
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecResourcesClaimsItem {
  "name": string
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecResourcesLimits {
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecResourcesRequests {
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecResources {
  "claims": Array<MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  "limits": MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecResourcesLimits | undefined
  "requests": MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateSpec {
  "accessModes": Array<string> | undefined
  "dataSource": MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecDataSource | undefined
  "dataSourceRef": MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecDataSourceRef | undefined
  "resources": MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecResources | undefined
  "selector": MonitoringPrometheusSpecStorageVolumeClaimTemplateSpecSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateStatusAllocatedResources {
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateStatusCapacity {
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateStatusConditionsItem {
  "lastProbeTime": string | undefined
  "lastTransitionTime": string | undefined
  "message": string | undefined
  "reason": string | undefined
  "status": string
  "type": string
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplateStatus {
  "accessModes": Array<string> | undefined
  "allocatedResources": MonitoringPrometheusSpecStorageVolumeClaimTemplateStatusAllocatedResources | undefined
  "capacity": MonitoringPrometheusSpecStorageVolumeClaimTemplateStatusCapacity | undefined
  "conditions": Array<MonitoringPrometheusSpecStorageVolumeClaimTemplateStatusConditionsItem> | undefined
  "phase": string | undefined
  "resizeStatus": string | undefined
}
export interface MonitoringPrometheusSpecStorageVolumeClaimTemplate {
  "apiVersion": string | undefined
  "kind": string | undefined
  "metadata": MonitoringPrometheusSpecStorageVolumeClaimTemplateMetadata | undefined
  "spec": MonitoringPrometheusSpecStorageVolumeClaimTemplateSpec | undefined
  "status": MonitoringPrometheusSpecStorageVolumeClaimTemplateStatus | undefined
}
export interface MonitoringPrometheusSpecStorage {
  "disableMountSubPath": boolean | undefined
  "emptyDir": MonitoringPrometheusSpecStorageEmptyDir | undefined
  "ephemeral": MonitoringPrometheusSpecStorageEphemeral | undefined
  "volumeClaimTemplate": MonitoringPrometheusSpecStorageVolumeClaimTemplate | undefined
}
export interface MonitoringPrometheusSpecThanosAdditionalArgsItem {
  "name": string
  "value": string | undefined
}
export interface MonitoringPrometheusSpecThanosGrpcServerTlsConfigCaConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecThanosGrpcServerTlsConfigCaSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecThanosGrpcServerTlsConfigCa {
  "configMap": MonitoringPrometheusSpecThanosGrpcServerTlsConfigCaConfigMap | undefined
  "secret": MonitoringPrometheusSpecThanosGrpcServerTlsConfigCaSecret | undefined
}
export interface MonitoringPrometheusSpecThanosGrpcServerTlsConfigCertConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecThanosGrpcServerTlsConfigCertSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecThanosGrpcServerTlsConfigCert {
  "configMap": MonitoringPrometheusSpecThanosGrpcServerTlsConfigCertConfigMap | undefined
  "secret": MonitoringPrometheusSpecThanosGrpcServerTlsConfigCertSecret | undefined
}
export interface MonitoringPrometheusSpecThanosGrpcServerTlsConfigKeySecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecThanosGrpcServerTlsConfig {
  "ca": MonitoringPrometheusSpecThanosGrpcServerTlsConfigCa | undefined
  "caFile": string | undefined
  "cert": MonitoringPrometheusSpecThanosGrpcServerTlsConfigCert | undefined
  "certFile": string | undefined
  "insecureSkipVerify": boolean | undefined
  "keyFile": string | undefined
  "keySecret": MonitoringPrometheusSpecThanosGrpcServerTlsConfigKeySecret | undefined
  "serverName": string | undefined
}
export interface MonitoringPrometheusSpecThanosObjectStorageConfig {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecThanosResourcesClaimsItem {
  "name": string
}
export interface MonitoringPrometheusSpecThanosResourcesLimits {
}
export interface MonitoringPrometheusSpecThanosResourcesRequests {
}
export interface MonitoringPrometheusSpecThanosResources {
  "claims": Array<MonitoringPrometheusSpecThanosResourcesClaimsItem> | undefined
  "limits": MonitoringPrometheusSpecThanosResourcesLimits | undefined
  "requests": MonitoringPrometheusSpecThanosResourcesRequests | undefined
}
export interface MonitoringPrometheusSpecThanosTracingConfig {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecThanosVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface MonitoringPrometheusSpecThanos {
  "additionalArgs": Array<MonitoringPrometheusSpecThanosAdditionalArgsItem> | undefined
  "baseImage": string | undefined
  "blockSize": string | undefined
  "getConfigInterval": string | undefined
  "getConfigTimeout": string | undefined
  "grpcListenLocal": boolean | undefined
  "grpcServerTlsConfig": MonitoringPrometheusSpecThanosGrpcServerTlsConfig | undefined
  "httpListenLocal": boolean | undefined
  "image": string | undefined
  "listenLocal": boolean | undefined
  "logFormat": string | undefined
  "logLevel": string | undefined
  "minTime": string | undefined
  "objectStorageConfig": MonitoringPrometheusSpecThanosObjectStorageConfig | undefined
  "objectStorageConfigFile": string | undefined
  "readyTimeout": string | undefined
  "resources": MonitoringPrometheusSpecThanosResources | undefined
  "sha": string | undefined
  "tag": string | undefined
  "tracingConfig": MonitoringPrometheusSpecThanosTracingConfig | undefined
  "tracingConfigFile": string | undefined
  "version": string | undefined
  "volumeMounts": Array<MonitoringPrometheusSpecThanosVolumeMountsItem> | undefined
}
export interface MonitoringPrometheusSpecTolerationsItem {
  "effect": string | undefined
  "key": string | undefined
  "operator": string | undefined
  "tolerationSeconds": number | undefined
  "value": string | undefined
}
export interface MonitoringPrometheusSpecTopologySpreadConstraintsItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecTopologySpreadConstraintsItemLabelSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecTopologySpreadConstraintsItemLabelSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecTopologySpreadConstraintsItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecTopologySpreadConstraintsItemLabelSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecTopologySpreadConstraintsItem {
  "labelSelector": MonitoringPrometheusSpecTopologySpreadConstraintsItemLabelSelector | undefined
  "matchLabelKeys": Array<string> | undefined
  "maxSkew": number
  "minDomains": number | undefined
  "nodeAffinityPolicy": string | undefined
  "nodeTaintsPolicy": string | undefined
  "topologyKey": string
  "whenUnsatisfiable": string
}
export interface MonitoringPrometheusSpecTsdb {
  "outOfOrderTimeWindow": string | undefined
}
export interface MonitoringPrometheusSpecVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemAwsElasticBlockStore {
  "fsType": string | undefined
  "partition": number | undefined
  "readOnly": boolean | undefined
  "volumeID": string
}
export interface MonitoringPrometheusSpecVolumesItemAzureDisk {
  "cachingMode": string | undefined
  "diskName": string
  "diskURI": string
  "fsType": string | undefined
  "kind": string | undefined
  "readOnly": boolean | undefined
}
export interface MonitoringPrometheusSpecVolumesItemAzureFile {
  "readOnly": boolean | undefined
  "secretName": string
  "shareName": string
}
export interface MonitoringPrometheusSpecVolumesItemCephfsSecretRef {
  "name": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemCephfs {
  "monitors": Array<string>
  "path": string | undefined
  "readOnly": boolean | undefined
  "secretFile": string | undefined
  "secretRef": MonitoringPrometheusSpecVolumesItemCephfsSecretRef | undefined
  "user": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemCinderSecretRef {
  "name": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemCinder {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MonitoringPrometheusSpecVolumesItemCinderSecretRef | undefined
  "volumeID": string
}
export interface MonitoringPrometheusSpecVolumesItemConfigMapItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MonitoringPrometheusSpecVolumesItemConfigMap {
  "defaultMode": number | undefined
  "items": Array<MonitoringPrometheusSpecVolumesItemConfigMapItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecVolumesItemCsiNodePublishSecretRef {
  "name": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemCsiVolumeAttributes {
}
export interface MonitoringPrometheusSpecVolumesItemCsi {
  "driver": string
  "fsType": string | undefined
  "nodePublishSecretRef": MonitoringPrometheusSpecVolumesItemCsiNodePublishSecretRef | undefined
  "readOnly": boolean | undefined
  "volumeAttributes": MonitoringPrometheusSpecVolumesItemCsiVolumeAttributes | undefined
}
export interface MonitoringPrometheusSpecVolumesItemDownwardAPIItemsItemFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MonitoringPrometheusSpecVolumesItemDownwardAPIItemsItemResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MonitoringPrometheusSpecVolumesItemDownwardAPIItemsItem {
  "fieldRef": MonitoringPrometheusSpecVolumesItemDownwardAPIItemsItemFieldRef | undefined
  "mode": number | undefined
  "path": string
  "resourceFieldRef": MonitoringPrometheusSpecVolumesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MonitoringPrometheusSpecVolumesItemDownwardAPI {
  "defaultMode": number | undefined
  "items": Array<MonitoringPrometheusSpecVolumesItemDownwardAPIItemsItem> | undefined
}
export interface MonitoringPrometheusSpecVolumesItemEmptyDir {
  "medium": string | undefined
  "sizeLimit": object | undefined
}
export interface MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateMetadata {
}
export interface MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
  "namespace": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesClaimsItem {
  "name": string
}
export interface MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecResources {
  "claims": Array<MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  "limits": MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  "requests": MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelector {
  "matchExpressions": Array<MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpec {
  "accessModes": Array<string> | undefined
  "dataSource": MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSource | undefined
  "dataSourceRef": MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  "resources": MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecResources | undefined
  "selector": MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplate {
  "metadata": MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateMetadata | undefined
  "spec": MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplateSpec
}
export interface MonitoringPrometheusSpecVolumesItemEphemeral {
  "volumeClaimTemplate": MonitoringPrometheusSpecVolumesItemEphemeralVolumeClaimTemplate | undefined
}
export interface MonitoringPrometheusSpecVolumesItemFc {
  "fsType": string | undefined
  "lun": number | undefined
  "readOnly": boolean | undefined
  "targetWWNs": Array<string> | undefined
  "wwids": Array<string> | undefined
}
export interface MonitoringPrometheusSpecVolumesItemFlexVolumeOptions {
}
export interface MonitoringPrometheusSpecVolumesItemFlexVolumeSecretRef {
  "name": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemFlexVolume {
  "driver": string
  "fsType": string | undefined
  "options": MonitoringPrometheusSpecVolumesItemFlexVolumeOptions | undefined
  "readOnly": boolean | undefined
  "secretRef": MonitoringPrometheusSpecVolumesItemFlexVolumeSecretRef | undefined
}
export interface MonitoringPrometheusSpecVolumesItemFlocker {
  "datasetName": string | undefined
  "datasetUUID": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemGcePersistentDisk {
  "fsType": string | undefined
  "partition": number | undefined
  "pdName": string
  "readOnly": boolean | undefined
}
export interface MonitoringPrometheusSpecVolumesItemGitRepo {
  "directory": string | undefined
  "repository": string
  "revision": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemGlusterfs {
  "endpoints": string
  "path": string
  "readOnly": boolean | undefined
}
export interface MonitoringPrometheusSpecVolumesItemHostPath {
  "path": string
  "type": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemIscsiSecretRef {
  "name": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemIscsi {
  "chapAuthDiscovery": boolean | undefined
  "chapAuthSession": boolean | undefined
  "fsType": string | undefined
  "initiatorName": string | undefined
  "iqn": string
  "iscsiInterface": string | undefined
  "lun": number
  "portals": Array<string> | undefined
  "readOnly": boolean | undefined
  "secretRef": MonitoringPrometheusSpecVolumesItemIscsiSecretRef | undefined
  "targetPortal": string
}
export interface MonitoringPrometheusSpecVolumesItemNfs {
  "path": string
  "readOnly": boolean | undefined
  "server": string
}
export interface MonitoringPrometheusSpecVolumesItemPersistentVolumeClaim {
  "claimName": string
  "readOnly": boolean | undefined
}
export interface MonitoringPrometheusSpecVolumesItemPhotonPersistentDisk {
  "fsType": string | undefined
  "pdID": string
}
export interface MonitoringPrometheusSpecVolumesItemPortworxVolume {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "volumeID": string
}
export interface MonitoringPrometheusSpecVolumesItemProjectedSourcesItemConfigMapItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MonitoringPrometheusSpecVolumesItemProjectedSourcesItemConfigMap {
  "items": Array<MonitoringPrometheusSpecVolumesItemProjectedSourcesItemConfigMapItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MonitoringPrometheusSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MonitoringPrometheusSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItem {
  "fieldRef": MonitoringPrometheusSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemFieldRef | undefined
  "mode": number | undefined
  "path": string
  "resourceFieldRef": MonitoringPrometheusSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MonitoringPrometheusSpecVolumesItemProjectedSourcesItemDownwardAPI {
  "items": Array<MonitoringPrometheusSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItem> | undefined
}
export interface MonitoringPrometheusSpecVolumesItemProjectedSourcesItemSecretItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MonitoringPrometheusSpecVolumesItemProjectedSourcesItemSecret {
  "items": Array<MonitoringPrometheusSpecVolumesItemProjectedSourcesItemSecretItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecVolumesItemProjectedSourcesItemServiceAccountToken {
  "audience": string | undefined
  "expirationSeconds": number | undefined
  "path": string
}
export interface MonitoringPrometheusSpecVolumesItemProjectedSourcesItem {
  "configMap": MonitoringPrometheusSpecVolumesItemProjectedSourcesItemConfigMap | undefined
  "downwardAPI": MonitoringPrometheusSpecVolumesItemProjectedSourcesItemDownwardAPI | undefined
  "secret": MonitoringPrometheusSpecVolumesItemProjectedSourcesItemSecret | undefined
  "serviceAccountToken": MonitoringPrometheusSpecVolumesItemProjectedSourcesItemServiceAccountToken | undefined
}
export interface MonitoringPrometheusSpecVolumesItemProjected {
  "defaultMode": number | undefined
  "sources": Array<MonitoringPrometheusSpecVolumesItemProjectedSourcesItem> | undefined
}
export interface MonitoringPrometheusSpecVolumesItemQuobyte {
  "group": string | undefined
  "readOnly": boolean | undefined
  "registry": string
  "tenant": string | undefined
  "user": string | undefined
  "volume": string
}
export interface MonitoringPrometheusSpecVolumesItemRbdSecretRef {
  "name": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemRbd {
  "fsType": string | undefined
  "image": string
  "keyring": string | undefined
  "monitors": Array<string>
  "pool": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MonitoringPrometheusSpecVolumesItemRbdSecretRef | undefined
  "user": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemScaleIOSecretRef {
  "name": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemScaleIO {
  "fsType": string | undefined
  "gateway": string
  "protectionDomain": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MonitoringPrometheusSpecVolumesItemScaleIOSecretRef
  "sslEnabled": boolean | undefined
  "storageMode": string | undefined
  "storagePool": string | undefined
  "system": string
  "volumeName": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemSecretItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MonitoringPrometheusSpecVolumesItemSecret {
  "defaultMode": number | undefined
  "items": Array<MonitoringPrometheusSpecVolumesItemSecretItemsItem> | undefined
  "optional": boolean | undefined
  "secretName": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemStorageosSecretRef {
  "name": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemStorageos {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MonitoringPrometheusSpecVolumesItemStorageosSecretRef | undefined
  "volumeName": string | undefined
  "volumeNamespace": string | undefined
}
export interface MonitoringPrometheusSpecVolumesItemVsphereVolume {
  "fsType": string | undefined
  "storagePolicyID": string | undefined
  "storagePolicyName": string | undefined
  "volumePath": string
}
export interface MonitoringPrometheusSpecVolumesItem {
  "awsElasticBlockStore": MonitoringPrometheusSpecVolumesItemAwsElasticBlockStore | undefined
  "azureDisk": MonitoringPrometheusSpecVolumesItemAzureDisk | undefined
  "azureFile": MonitoringPrometheusSpecVolumesItemAzureFile | undefined
  "cephfs": MonitoringPrometheusSpecVolumesItemCephfs | undefined
  "cinder": MonitoringPrometheusSpecVolumesItemCinder | undefined
  "configMap": MonitoringPrometheusSpecVolumesItemConfigMap | undefined
  "csi": MonitoringPrometheusSpecVolumesItemCsi | undefined
  "downwardAPI": MonitoringPrometheusSpecVolumesItemDownwardAPI | undefined
  "emptyDir": MonitoringPrometheusSpecVolumesItemEmptyDir | undefined
  "ephemeral": MonitoringPrometheusSpecVolumesItemEphemeral | undefined
  "fc": MonitoringPrometheusSpecVolumesItemFc | undefined
  "flexVolume": MonitoringPrometheusSpecVolumesItemFlexVolume | undefined
  "flocker": MonitoringPrometheusSpecVolumesItemFlocker | undefined
  "gcePersistentDisk": MonitoringPrometheusSpecVolumesItemGcePersistentDisk | undefined
  "gitRepo": MonitoringPrometheusSpecVolumesItemGitRepo | undefined
  "glusterfs": MonitoringPrometheusSpecVolumesItemGlusterfs | undefined
  "hostPath": MonitoringPrometheusSpecVolumesItemHostPath | undefined
  "iscsi": MonitoringPrometheusSpecVolumesItemIscsi | undefined
  "name": string
  "nfs": MonitoringPrometheusSpecVolumesItemNfs | undefined
  "persistentVolumeClaim": MonitoringPrometheusSpecVolumesItemPersistentVolumeClaim | undefined
  "photonPersistentDisk": MonitoringPrometheusSpecVolumesItemPhotonPersistentDisk | undefined
  "portworxVolume": MonitoringPrometheusSpecVolumesItemPortworxVolume | undefined
  "projected": MonitoringPrometheusSpecVolumesItemProjected | undefined
  "quobyte": MonitoringPrometheusSpecVolumesItemQuobyte | undefined
  "rbd": MonitoringPrometheusSpecVolumesItemRbd | undefined
  "scaleIO": MonitoringPrometheusSpecVolumesItemScaleIO | undefined
  "secret": MonitoringPrometheusSpecVolumesItemSecret | undefined
  "storageos": MonitoringPrometheusSpecVolumesItemStorageos | undefined
  "vsphereVolume": MonitoringPrometheusSpecVolumesItemVsphereVolume | undefined
}
export interface MonitoringPrometheusSpecWebHttpConfigHeaders {
  "contentSecurityPolicy": string | undefined
  "strictTransportSecurity": string | undefined
  "xContentTypeOptions": string | undefined
  "xFrameOptions": string | undefined
  "xXSSProtection": string | undefined
}
export interface MonitoringPrometheusSpecWebHttpConfig {
  "headers": MonitoringPrometheusSpecWebHttpConfigHeaders | undefined
  "http2": boolean | undefined
}
export interface MonitoringPrometheusSpecWebTlsConfigCertConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecWebTlsConfigCertSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecWebTlsConfigCert {
  "configMap": MonitoringPrometheusSpecWebTlsConfigCertConfigMap | undefined
  "secret": MonitoringPrometheusSpecWebTlsConfigCertSecret | undefined
}
export interface MonitoringPrometheusSpecWebTlsConfigClient_caConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecWebTlsConfigClient_caSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecWebTlsConfigClient_ca {
  "configMap": MonitoringPrometheusSpecWebTlsConfigClient_caConfigMap | undefined
  "secret": MonitoringPrometheusSpecWebTlsConfigClient_caSecret | undefined
}
export interface MonitoringPrometheusSpecWebTlsConfigKeySecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPrometheusSpecWebTlsConfig {
  "cert": MonitoringPrometheusSpecWebTlsConfigCert
  "cipherSuites": Array<string> | undefined
  "clientAuthType": string | undefined
  "client_ca": MonitoringPrometheusSpecWebTlsConfigClient_ca | undefined
  "curvePreferences": Array<string> | undefined
  "keySecret": MonitoringPrometheusSpecWebTlsConfigKeySecret
  "maxVersion": string | undefined
  "minVersion": string | undefined
  "preferServerCipherSuites": boolean | undefined
}
export interface MonitoringPrometheusSpecWeb {
  "httpConfig": MonitoringPrometheusSpecWebHttpConfig | undefined
  "maxConnections": number | undefined
  "pageTitle": string | undefined
  "tlsConfig": MonitoringPrometheusSpecWebTlsConfig | undefined
}
export interface MonitoringPrometheusSpec {
  "additionalAlertManagerConfigs": MonitoringPrometheusSpecAdditionalAlertManagerConfigs | undefined
  "additionalAlertRelabelConfigs": MonitoringPrometheusSpecAdditionalAlertRelabelConfigs | undefined
  "additionalArgs": Array<MonitoringPrometheusSpecAdditionalArgsItem> | undefined
  "additionalScrapeConfigs": MonitoringPrometheusSpecAdditionalScrapeConfigs | undefined
  "affinity": MonitoringPrometheusSpecAffinity | undefined
  "alerting": MonitoringPrometheusSpecAlerting | undefined
  "allowOverlappingBlocks": boolean | undefined
  "apiserverConfig": MonitoringPrometheusSpecApiserverConfig | undefined
  "arbitraryFSAccessThroughSMs": MonitoringPrometheusSpecArbitraryFSAccessThroughSMs | undefined
  "baseImage": string | undefined
  "configMaps": Array<string> | undefined
  "containers": Array<MonitoringPrometheusSpecContainersItem> | undefined
  "disableCompaction": boolean | undefined
  "enableAdminAPI": boolean | undefined
  "enableFeatures": Array<string> | undefined
  "enableRemoteWriteReceiver": boolean | undefined
  "enforcedBodySizeLimit": string | undefined
  "enforcedLabelLimit": number | undefined
  "enforcedLabelNameLengthLimit": number | undefined
  "enforcedLabelValueLengthLimit": number | undefined
  "enforcedNamespaceLabel": string | undefined
  "enforcedSampleLimit": number | undefined
  "enforcedTargetLimit": number | undefined
  "evaluationInterval": string | undefined
  "excludedFromEnforcement": Array<MonitoringPrometheusSpecExcludedFromEnforcementItem> | undefined
  "exemplars": MonitoringPrometheusSpecExemplars | undefined
  "externalLabels": MonitoringPrometheusSpecExternalLabels | undefined
  "externalUrl": string | undefined
  "hostAliases": Array<MonitoringPrometheusSpecHostAliasesItem> | undefined
  "hostNetwork": boolean | undefined
  "ignoreNamespaceSelectors": boolean | undefined
  "image": string | undefined
  "imagePullPolicy": string | undefined
  "imagePullSecrets": Array<MonitoringPrometheusSpecImagePullSecretsItem> | undefined
  "initContainers": Array<MonitoringPrometheusSpecInitContainersItem> | undefined
  "listenLocal": boolean | undefined
  "logFormat": string | undefined
  "logLevel": string | undefined
  "minReadySeconds": number | undefined
  "nodeSelector": MonitoringPrometheusSpecNodeSelector | undefined
  "overrideHonorLabels": boolean | undefined
  "overrideHonorTimestamps": boolean | undefined
  "paused": boolean | undefined
  "podMetadata": MonitoringPrometheusSpecPodMetadata | undefined
  "podMonitorNamespaceSelector": MonitoringPrometheusSpecPodMonitorNamespaceSelector | undefined
  "podMonitorSelector": MonitoringPrometheusSpecPodMonitorSelector | undefined
  "podTargetLabels": Array<string> | undefined
  "portName": string | undefined
  "priorityClassName": string | undefined
  "probeNamespaceSelector": MonitoringPrometheusSpecProbeNamespaceSelector | undefined
  "probeSelector": MonitoringPrometheusSpecProbeSelector | undefined
  "prometheusExternalLabelName": string | undefined
  "prometheusRulesExcludedFromEnforce": Array<MonitoringPrometheusSpecPrometheusRulesExcludedFromEnforceItem> | undefined
  "query": MonitoringPrometheusSpecQuery | undefined
  "queryLogFile": string | undefined
  "remoteRead": Array<MonitoringPrometheusSpecRemoteReadItem> | undefined
  "remoteWrite": Array<MonitoringPrometheusSpecRemoteWriteItem> | undefined
  "replicaExternalLabelName": string | undefined
  "replicas": number | undefined
  "resources": MonitoringPrometheusSpecResources | undefined
  "retention": string | undefined
  "retentionSize": string | undefined
  "routePrefix": string | undefined
  "ruleNamespaceSelector": MonitoringPrometheusSpecRuleNamespaceSelector | undefined
  "ruleSelector": MonitoringPrometheusSpecRuleSelector | undefined
  "rules": MonitoringPrometheusSpecRules | undefined
  "scrapeConfigNamespaceSelector": MonitoringPrometheusSpecScrapeConfigNamespaceSelector | undefined
  "scrapeConfigSelector": MonitoringPrometheusSpecScrapeConfigSelector | undefined
  "scrapeInterval": string | undefined
  "scrapeTimeout": string | undefined
  "secrets": Array<string> | undefined
  "securityContext": MonitoringPrometheusSpecSecurityContext | undefined
  "serviceAccountName": string | undefined
  "serviceMonitorNamespaceSelector": MonitoringPrometheusSpecServiceMonitorNamespaceSelector | undefined
  "serviceMonitorSelector": MonitoringPrometheusSpecServiceMonitorSelector | undefined
  "sha": string | undefined
  "shards": number | undefined
  "storage": MonitoringPrometheusSpecStorage | undefined
  "tag": string | undefined
  "thanos": MonitoringPrometheusSpecThanos | undefined
  "tolerations": Array<MonitoringPrometheusSpecTolerationsItem> | undefined
  "topologySpreadConstraints": Array<MonitoringPrometheusSpecTopologySpreadConstraintsItem> | undefined
  "tsdb": MonitoringPrometheusSpecTsdb | undefined
  "version": string | undefined
  "volumeMounts": Array<MonitoringPrometheusSpecVolumeMountsItem> | undefined
  "volumes": Array<MonitoringPrometheusSpecVolumesItem> | undefined
  "walCompression": boolean | undefined
  "web": MonitoringPrometheusSpecWeb | undefined
}
export interface MonitoringPrometheus extends KubernetesObject {
  spec: MonitoringPrometheusSpec
  status: MonitoringPrometheusStatus | undefined
}
export type MonitoringPrometheusList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MonitoringPrometheus>
