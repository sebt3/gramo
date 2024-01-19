type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MonitoringAlertmanagerStatusConditionsItem {
  "lastTransitionTime": string
  "message": string | undefined
  "observedGeneration": number | undefined
  "reason": string | undefined
  "status": string
  "type": string
}
export interface MonitoringAlertmanagerStatus {
  "availableReplicas": number
  "conditions": Array<MonitoringAlertmanagerStatusConditionsItem> | undefined
  "paused": boolean
  "replicas": number
  "unavailableReplicas": number
  "updatedReplicas": number
}
export interface MonitoringAlertmanagerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference {
  "matchExpressions": Array<MonitoringAlertmanagerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchExpressionsItem> | undefined
  "matchFields": Array<MonitoringAlertmanagerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreferenceMatchFieldsItem> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "preference": MonitoringAlertmanagerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPreference
  "weight": number
}
export interface MonitoringAlertmanagerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem {
  "matchExpressions": Array<MonitoringAlertmanagerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchExpressionsItem> | undefined
  "matchFields": Array<MonitoringAlertmanagerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItemMatchFieldsItem> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution {
  "nodeSelectorTerms": Array<MonitoringAlertmanagerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecutionNodeSelectorTermsItem>
}
export interface MonitoringAlertmanagerSpecAffinityNodeAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<MonitoringAlertmanagerSpecAffinityNodeAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": MonitoringAlertmanagerSpecAffinityNodeAffinityRequiredDuringSchedulingIgnoredDuringExecution | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<MonitoringAlertmanagerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringAlertmanagerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<MonitoringAlertmanagerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringAlertmanagerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": MonitoringAlertmanagerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": MonitoringAlertmanagerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface MonitoringAlertmanagerSpecAffinityPodAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<MonitoringAlertmanagerSpecAffinityPodAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<MonitoringAlertmanagerSpecAffinityPodAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels {
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector {
  "matchExpressions": Array<MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelectorMatchLabels | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels {
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector {
  "matchExpressions": Array<MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm {
  "labelSelector": MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermLabelSelector | undefined
  "namespaceSelector": MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTermNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem {
  "podAffinityTerm": MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItemPodAffinityTerm
  "weight": number
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels {
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector {
  "matchExpressions": Array<MonitoringAlertmanagerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringAlertmanagerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelectorMatchLabels | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels {
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector {
  "matchExpressions": Array<MonitoringAlertmanagerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringAlertmanagerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem {
  "labelSelector": MonitoringAlertmanagerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemLabelSelector | undefined
  "namespaceSelector": MonitoringAlertmanagerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItemNamespaceSelector | undefined
  "namespaces": Array<string> | undefined
  "topologyKey": string
}
export interface MonitoringAlertmanagerSpecAffinityPodAntiAffinity {
  "preferredDuringSchedulingIgnoredDuringExecution": Array<MonitoringAlertmanagerSpecAffinityPodAntiAffinityPreferredDuringSchedulingIgnoredDuringExecutionItem> | undefined
  "requiredDuringSchedulingIgnoredDuringExecution": Array<MonitoringAlertmanagerSpecAffinityPodAntiAffinityRequiredDuringSchedulingIgnoredDuringExecutionItem> | undefined
}
export interface MonitoringAlertmanagerSpecAffinity {
  "nodeAffinity": MonitoringAlertmanagerSpecAffinityNodeAffinity | undefined
  "podAffinity": MonitoringAlertmanagerSpecAffinityPodAffinity | undefined
  "podAntiAffinity": MonitoringAlertmanagerSpecAffinityPodAntiAffinity | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigMatcherStrategy {
  "type": string | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigNamespaceSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigNamespaceSelectorMatchLabels {
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigNamespaceSelector {
  "matchExpressions": Array<MonitoringAlertmanagerSpecAlertmanagerConfigNamespaceSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringAlertmanagerSpecAlertmanagerConfigNamespaceSelectorMatchLabels | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigSelectorMatchLabels {
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigSelector {
  "matchExpressions": Array<MonitoringAlertmanagerSpecAlertmanagerConfigSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringAlertmanagerSpecAlertmanagerConfigSelectorMatchLabels | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigAuthorizationCredentials {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigAuthorization {
  "credentials": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigAuthorizationCredentials | undefined
  "type": string | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigBasicAuthPassword {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigBasicAuthUsername {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigBasicAuth {
  "password": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigBasicAuthPassword | undefined
  "username": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigBasicAuthUsername | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigBearerTokenSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigOauth2ClientIdConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigOauth2ClientIdSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigOauth2ClientId {
  "configMap": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigOauth2ClientIdConfigMap | undefined
  "secret": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigOauth2ClientIdSecret | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigOauth2ClientSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigOauth2EndpointParams {
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigOauth2 {
  "clientId": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigOauth2ClientId
  "clientSecret": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigOauth2ClientSecret
  "endpointParams": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigOauth2EndpointParams | undefined
  "scopes": Array<string> | undefined
  "tokenUrl": string
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfigCaConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfigCaSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfigCa {
  "configMap": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfigCaConfigMap | undefined
  "secret": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfigCaSecret | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfigCertConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfigCertSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfigCert {
  "configMap": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfigCertConfigMap | undefined
  "secret": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfigCertSecret | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfigKeySecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfig {
  "ca": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfigCa | undefined
  "cert": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfigCert | undefined
  "insecureSkipVerify": boolean | undefined
  "keySecret": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfigKeySecret | undefined
  "serverName": string | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfig {
  "authorization": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigAuthorization | undefined
  "basicAuth": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigBasicAuth | undefined
  "bearerTokenSecret": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigBearerTokenSecret | undefined
  "followRedirects": boolean | undefined
  "oauth2": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigOauth2 | undefined
  "proxyURL": string | undefined
  "tlsConfig": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfigTlsConfig | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalOpsGenieApiKey {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalOpsGenieApiUrl {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalSlackApiUrl {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobal {
  "httpConfig": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalHttpConfig | undefined
  "opsGenieApiKey": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalOpsGenieApiKey | undefined
  "opsGenieApiUrl": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalOpsGenieApiUrl | undefined
  "resolveTimeout": string | undefined
  "slackApiUrl": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobalSlackApiUrl | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationTemplatesItemConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationTemplatesItemSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfigurationTemplatesItem {
  "configMap": MonitoringAlertmanagerSpecAlertmanagerConfigurationTemplatesItemConfigMap | undefined
  "secret": MonitoringAlertmanagerSpecAlertmanagerConfigurationTemplatesItemSecret | undefined
}
export interface MonitoringAlertmanagerSpecAlertmanagerConfiguration {
  "global": MonitoringAlertmanagerSpecAlertmanagerConfigurationGlobal | undefined
  "name": string | undefined
  "templates": Array<MonitoringAlertmanagerSpecAlertmanagerConfigurationTemplatesItem> | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MonitoringAlertmanagerSpecContainersItemEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MonitoringAlertmanagerSpecContainersItemEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemEnvItemValueFrom {
  "configMapKeyRef": MonitoringAlertmanagerSpecContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": MonitoringAlertmanagerSpecContainersItemEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": MonitoringAlertmanagerSpecContainersItemEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": MonitoringAlertmanagerSpecContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": MonitoringAlertmanagerSpecContainersItemEnvItemValueFrom | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemEnvFromItem {
  "configMapRef": MonitoringAlertmanagerSpecContainersItemEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": MonitoringAlertmanagerSpecContainersItemEnvFromItemSecretRef | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemLifecyclePostStartExec {
  "command": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemLifecyclePostStartHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringAlertmanagerSpecContainersItemLifecyclePostStartHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringAlertmanagerSpecContainersItemLifecyclePostStartHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemLifecyclePostStartTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringAlertmanagerSpecContainersItemLifecyclePostStart {
  "exec": MonitoringAlertmanagerSpecContainersItemLifecyclePostStartExec | undefined
  "httpGet": MonitoringAlertmanagerSpecContainersItemLifecyclePostStartHttpGet | undefined
  "tcpSocket": MonitoringAlertmanagerSpecContainersItemLifecyclePostStartTcpSocket | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemLifecyclePreStopExec {
  "command": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemLifecyclePreStopHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringAlertmanagerSpecContainersItemLifecyclePreStopHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringAlertmanagerSpecContainersItemLifecyclePreStopHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemLifecyclePreStopTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringAlertmanagerSpecContainersItemLifecyclePreStop {
  "exec": MonitoringAlertmanagerSpecContainersItemLifecyclePreStopExec | undefined
  "httpGet": MonitoringAlertmanagerSpecContainersItemLifecyclePreStopHttpGet | undefined
  "tcpSocket": MonitoringAlertmanagerSpecContainersItemLifecyclePreStopTcpSocket | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemLifecycle {
  "postStart": MonitoringAlertmanagerSpecContainersItemLifecyclePostStart | undefined
  "preStop": MonitoringAlertmanagerSpecContainersItemLifecyclePreStop | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemLivenessProbeExec {
  "command": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemLivenessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemLivenessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringAlertmanagerSpecContainersItemLivenessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringAlertmanagerSpecContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemLivenessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringAlertmanagerSpecContainersItemLivenessProbe {
  "exec": MonitoringAlertmanagerSpecContainersItemLivenessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MonitoringAlertmanagerSpecContainersItemLivenessProbeGrpc | undefined
  "httpGet": MonitoringAlertmanagerSpecContainersItemLivenessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MonitoringAlertmanagerSpecContainersItemLivenessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemPortsItem {
  "containerPort": number
  "hostIP": string | undefined
  "hostPort": number | undefined
  "name": string | undefined
  "protocol": string | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemReadinessProbeExec {
  "command": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemReadinessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemReadinessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringAlertmanagerSpecContainersItemReadinessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringAlertmanagerSpecContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemReadinessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringAlertmanagerSpecContainersItemReadinessProbe {
  "exec": MonitoringAlertmanagerSpecContainersItemReadinessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MonitoringAlertmanagerSpecContainersItemReadinessProbeGrpc | undefined
  "httpGet": MonitoringAlertmanagerSpecContainersItemReadinessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MonitoringAlertmanagerSpecContainersItemReadinessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemResizePolicyItem {
  "resourceName": string
  "restartPolicy": string
}
export interface MonitoringAlertmanagerSpecContainersItemResourcesClaimsItem {
  "name": string
}
export interface MonitoringAlertmanagerSpecContainersItemResourcesLimits {
}
export interface MonitoringAlertmanagerSpecContainersItemResourcesRequests {
}
export interface MonitoringAlertmanagerSpecContainersItemResources {
  "claims": Array<MonitoringAlertmanagerSpecContainersItemResourcesClaimsItem> | undefined
  "limits": MonitoringAlertmanagerSpecContainersItemResourcesLimits | undefined
  "requests": MonitoringAlertmanagerSpecContainersItemResourcesRequests | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemSecurityContextCapabilities {
  "add": Array<string> | undefined
  "drop": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface MonitoringAlertmanagerSpecContainersItemSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemSecurityContext {
  "allowPrivilegeEscalation": boolean | undefined
  "capabilities": MonitoringAlertmanagerSpecContainersItemSecurityContextCapabilities | undefined
  "privileged": boolean | undefined
  "procMount": string | undefined
  "readOnlyRootFilesystem": boolean | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": MonitoringAlertmanagerSpecContainersItemSecurityContextSeLinuxOptions | undefined
  "seccompProfile": MonitoringAlertmanagerSpecContainersItemSecurityContextSeccompProfile | undefined
  "windowsOptions": MonitoringAlertmanagerSpecContainersItemSecurityContextWindowsOptions | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemStartupProbeExec {
  "command": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemStartupProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemStartupProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringAlertmanagerSpecContainersItemStartupProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringAlertmanagerSpecContainersItemStartupProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemStartupProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringAlertmanagerSpecContainersItemStartupProbe {
  "exec": MonitoringAlertmanagerSpecContainersItemStartupProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MonitoringAlertmanagerSpecContainersItemStartupProbeGrpc | undefined
  "httpGet": MonitoringAlertmanagerSpecContainersItemStartupProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MonitoringAlertmanagerSpecContainersItemStartupProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MonitoringAlertmanagerSpecContainersItemVolumeDevicesItem {
  "devicePath": string
  "name": string
}
export interface MonitoringAlertmanagerSpecContainersItemVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface MonitoringAlertmanagerSpecContainersItem {
  "args": Array<string> | undefined
  "command": Array<string> | undefined
  "env": Array<MonitoringAlertmanagerSpecContainersItemEnvItem> | undefined
  "envFrom": Array<MonitoringAlertmanagerSpecContainersItemEnvFromItem> | undefined
  "image": string | undefined
  "imagePullPolicy": string | undefined
  "lifecycle": MonitoringAlertmanagerSpecContainersItemLifecycle | undefined
  "livenessProbe": MonitoringAlertmanagerSpecContainersItemLivenessProbe | undefined
  "name": string
  "ports": Array<MonitoringAlertmanagerSpecContainersItemPortsItem> | undefined
  "readinessProbe": MonitoringAlertmanagerSpecContainersItemReadinessProbe | undefined
  "resizePolicy": Array<MonitoringAlertmanagerSpecContainersItemResizePolicyItem> | undefined
  "resources": MonitoringAlertmanagerSpecContainersItemResources | undefined
  "securityContext": MonitoringAlertmanagerSpecContainersItemSecurityContext | undefined
  "startupProbe": MonitoringAlertmanagerSpecContainersItemStartupProbe | undefined
  "stdin": boolean | undefined
  "stdinOnce": boolean | undefined
  "terminationMessagePath": string | undefined
  "terminationMessagePolicy": string | undefined
  "tty": boolean | undefined
  "volumeDevices": Array<MonitoringAlertmanagerSpecContainersItemVolumeDevicesItem> | undefined
  "volumeMounts": Array<MonitoringAlertmanagerSpecContainersItemVolumeMountsItem> | undefined
  "workingDir": string | undefined
}
export interface MonitoringAlertmanagerSpecHostAliasesItem {
  "hostnames": Array<string>
  "ip": string
}
export interface MonitoringAlertmanagerSpecImagePullSecretsItem {
  "name": string | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemEnvItemValueFromConfigMapKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemEnvItemValueFromFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MonitoringAlertmanagerSpecInitContainersItemEnvItemValueFromResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MonitoringAlertmanagerSpecInitContainersItemEnvItemValueFromSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemEnvItemValueFrom {
  "configMapKeyRef": MonitoringAlertmanagerSpecInitContainersItemEnvItemValueFromConfigMapKeyRef | undefined
  "fieldRef": MonitoringAlertmanagerSpecInitContainersItemEnvItemValueFromFieldRef | undefined
  "resourceFieldRef": MonitoringAlertmanagerSpecInitContainersItemEnvItemValueFromResourceFieldRef | undefined
  "secretKeyRef": MonitoringAlertmanagerSpecInitContainersItemEnvItemValueFromSecretKeyRef | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemEnvItem {
  "name": string
  "value": string | undefined
  "valueFrom": MonitoringAlertmanagerSpecInitContainersItemEnvItemValueFrom | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemEnvFromItem {
  "configMapRef": MonitoringAlertmanagerSpecInitContainersItemEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": MonitoringAlertmanagerSpecInitContainersItemEnvFromItemSecretRef | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemLifecyclePostStartExec {
  "command": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemLifecyclePostStartHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringAlertmanagerSpecInitContainersItemLifecyclePostStartHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringAlertmanagerSpecInitContainersItemLifecyclePostStartHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemLifecyclePostStartTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringAlertmanagerSpecInitContainersItemLifecyclePostStart {
  "exec": MonitoringAlertmanagerSpecInitContainersItemLifecyclePostStartExec | undefined
  "httpGet": MonitoringAlertmanagerSpecInitContainersItemLifecyclePostStartHttpGet | undefined
  "tcpSocket": MonitoringAlertmanagerSpecInitContainersItemLifecyclePostStartTcpSocket | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemLifecyclePreStopExec {
  "command": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemLifecyclePreStopHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringAlertmanagerSpecInitContainersItemLifecyclePreStopHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringAlertmanagerSpecInitContainersItemLifecyclePreStopHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemLifecyclePreStopTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringAlertmanagerSpecInitContainersItemLifecyclePreStop {
  "exec": MonitoringAlertmanagerSpecInitContainersItemLifecyclePreStopExec | undefined
  "httpGet": MonitoringAlertmanagerSpecInitContainersItemLifecyclePreStopHttpGet | undefined
  "tcpSocket": MonitoringAlertmanagerSpecInitContainersItemLifecyclePreStopTcpSocket | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemLifecycle {
  "postStart": MonitoringAlertmanagerSpecInitContainersItemLifecyclePostStart | undefined
  "preStop": MonitoringAlertmanagerSpecInitContainersItemLifecyclePreStop | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemLivenessProbeExec {
  "command": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemLivenessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemLivenessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringAlertmanagerSpecInitContainersItemLivenessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringAlertmanagerSpecInitContainersItemLivenessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemLivenessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringAlertmanagerSpecInitContainersItemLivenessProbe {
  "exec": MonitoringAlertmanagerSpecInitContainersItemLivenessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MonitoringAlertmanagerSpecInitContainersItemLivenessProbeGrpc | undefined
  "httpGet": MonitoringAlertmanagerSpecInitContainersItemLivenessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MonitoringAlertmanagerSpecInitContainersItemLivenessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemPortsItem {
  "containerPort": number
  "hostIP": string | undefined
  "hostPort": number | undefined
  "name": string | undefined
  "protocol": string | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemReadinessProbeExec {
  "command": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemReadinessProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemReadinessProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringAlertmanagerSpecInitContainersItemReadinessProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringAlertmanagerSpecInitContainersItemReadinessProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemReadinessProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringAlertmanagerSpecInitContainersItemReadinessProbe {
  "exec": MonitoringAlertmanagerSpecInitContainersItemReadinessProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MonitoringAlertmanagerSpecInitContainersItemReadinessProbeGrpc | undefined
  "httpGet": MonitoringAlertmanagerSpecInitContainersItemReadinessProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MonitoringAlertmanagerSpecInitContainersItemReadinessProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemResizePolicyItem {
  "resourceName": string
  "restartPolicy": string
}
export interface MonitoringAlertmanagerSpecInitContainersItemResourcesClaimsItem {
  "name": string
}
export interface MonitoringAlertmanagerSpecInitContainersItemResourcesLimits {
}
export interface MonitoringAlertmanagerSpecInitContainersItemResourcesRequests {
}
export interface MonitoringAlertmanagerSpecInitContainersItemResources {
  "claims": Array<MonitoringAlertmanagerSpecInitContainersItemResourcesClaimsItem> | undefined
  "limits": MonitoringAlertmanagerSpecInitContainersItemResourcesLimits | undefined
  "requests": MonitoringAlertmanagerSpecInitContainersItemResourcesRequests | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemSecurityContextCapabilities {
  "add": Array<string> | undefined
  "drop": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface MonitoringAlertmanagerSpecInitContainersItemSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemSecurityContext {
  "allowPrivilegeEscalation": boolean | undefined
  "capabilities": MonitoringAlertmanagerSpecInitContainersItemSecurityContextCapabilities | undefined
  "privileged": boolean | undefined
  "procMount": string | undefined
  "readOnlyRootFilesystem": boolean | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": MonitoringAlertmanagerSpecInitContainersItemSecurityContextSeLinuxOptions | undefined
  "seccompProfile": MonitoringAlertmanagerSpecInitContainersItemSecurityContextSeccompProfile | undefined
  "windowsOptions": MonitoringAlertmanagerSpecInitContainersItemSecurityContextWindowsOptions | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemStartupProbeExec {
  "command": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemStartupProbeGrpc {
  "port": number
  "service": string | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemStartupProbeHttpGetHttpHeadersItem {
  "name": string
  "value": string
}
export interface MonitoringAlertmanagerSpecInitContainersItemStartupProbeHttpGet {
  "host": string | undefined
  "httpHeaders": Array<MonitoringAlertmanagerSpecInitContainersItemStartupProbeHttpGetHttpHeadersItem> | undefined
  "path": string | undefined
  "port": object
  "scheme": string | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemStartupProbeTcpSocket {
  "host": string | undefined
  "port": object
}
export interface MonitoringAlertmanagerSpecInitContainersItemStartupProbe {
  "exec": MonitoringAlertmanagerSpecInitContainersItemStartupProbeExec | undefined
  "failureThreshold": number | undefined
  "grpc": MonitoringAlertmanagerSpecInitContainersItemStartupProbeGrpc | undefined
  "httpGet": MonitoringAlertmanagerSpecInitContainersItemStartupProbeHttpGet | undefined
  "initialDelaySeconds": number | undefined
  "periodSeconds": number | undefined
  "successThreshold": number | undefined
  "tcpSocket": MonitoringAlertmanagerSpecInitContainersItemStartupProbeTcpSocket | undefined
  "terminationGracePeriodSeconds": number | undefined
  "timeoutSeconds": number | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItemVolumeDevicesItem {
  "devicePath": string
  "name": string
}
export interface MonitoringAlertmanagerSpecInitContainersItemVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface MonitoringAlertmanagerSpecInitContainersItem {
  "args": Array<string> | undefined
  "command": Array<string> | undefined
  "env": Array<MonitoringAlertmanagerSpecInitContainersItemEnvItem> | undefined
  "envFrom": Array<MonitoringAlertmanagerSpecInitContainersItemEnvFromItem> | undefined
  "image": string | undefined
  "imagePullPolicy": string | undefined
  "lifecycle": MonitoringAlertmanagerSpecInitContainersItemLifecycle | undefined
  "livenessProbe": MonitoringAlertmanagerSpecInitContainersItemLivenessProbe | undefined
  "name": string
  "ports": Array<MonitoringAlertmanagerSpecInitContainersItemPortsItem> | undefined
  "readinessProbe": MonitoringAlertmanagerSpecInitContainersItemReadinessProbe | undefined
  "resizePolicy": Array<MonitoringAlertmanagerSpecInitContainersItemResizePolicyItem> | undefined
  "resources": MonitoringAlertmanagerSpecInitContainersItemResources | undefined
  "securityContext": MonitoringAlertmanagerSpecInitContainersItemSecurityContext | undefined
  "startupProbe": MonitoringAlertmanagerSpecInitContainersItemStartupProbe | undefined
  "stdin": boolean | undefined
  "stdinOnce": boolean | undefined
  "terminationMessagePath": string | undefined
  "terminationMessagePolicy": string | undefined
  "tty": boolean | undefined
  "volumeDevices": Array<MonitoringAlertmanagerSpecInitContainersItemVolumeDevicesItem> | undefined
  "volumeMounts": Array<MonitoringAlertmanagerSpecInitContainersItemVolumeMountsItem> | undefined
  "workingDir": string | undefined
}
export interface MonitoringAlertmanagerSpecNodeSelector {
}
export interface MonitoringAlertmanagerSpecPodMetadataAnnotations {
}
export interface MonitoringAlertmanagerSpecPodMetadataLabels {
}
export interface MonitoringAlertmanagerSpecPodMetadata {
  "annotations": MonitoringAlertmanagerSpecPodMetadataAnnotations | undefined
  "labels": MonitoringAlertmanagerSpecPodMetadataLabels | undefined
  "name": string | undefined
}
export interface MonitoringAlertmanagerSpecResourcesClaimsItem {
  "name": string
}
export interface MonitoringAlertmanagerSpecResourcesLimits {
}
export interface MonitoringAlertmanagerSpecResourcesRequests {
}
export interface MonitoringAlertmanagerSpecResources {
  "claims": Array<MonitoringAlertmanagerSpecResourcesClaimsItem> | undefined
  "limits": MonitoringAlertmanagerSpecResourcesLimits | undefined
  "requests": MonitoringAlertmanagerSpecResourcesRequests | undefined
}
export interface MonitoringAlertmanagerSpecSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface MonitoringAlertmanagerSpecSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface MonitoringAlertmanagerSpecSecurityContextSysctlsItem {
  "name": string
  "value": string
}
export interface MonitoringAlertmanagerSpecSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface MonitoringAlertmanagerSpecSecurityContext {
  "fsGroup": number | undefined
  "fsGroupChangePolicy": string | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": MonitoringAlertmanagerSpecSecurityContextSeLinuxOptions | undefined
  "seccompProfile": MonitoringAlertmanagerSpecSecurityContextSeccompProfile | undefined
  "supplementalGroups": Array<number> | undefined
  "sysctls": Array<MonitoringAlertmanagerSpecSecurityContextSysctlsItem> | undefined
  "windowsOptions": MonitoringAlertmanagerSpecSecurityContextWindowsOptions | undefined
}
export interface MonitoringAlertmanagerSpecStorageEmptyDir {
  "medium": string | undefined
  "sizeLimit": object | undefined
}
export interface MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateMetadata {
}
export interface MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
  "namespace": string | undefined
}
export interface MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecResourcesClaimsItem {
  "name": string
}
export interface MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecResources {
  "claims": Array<MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  "limits": MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  "requests": MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecSelector {
  "matchExpressions": Array<MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpec {
  "accessModes": Array<string> | undefined
  "dataSource": MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecDataSource | undefined
  "dataSourceRef": MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  "resources": MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecResources | undefined
  "selector": MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpecSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplate {
  "metadata": MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateMetadata | undefined
  "spec": MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplateSpec
}
export interface MonitoringAlertmanagerSpecStorageEphemeral {
  "volumeClaimTemplate": MonitoringAlertmanagerSpecStorageEphemeralVolumeClaimTemplate | undefined
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateMetadataAnnotations {
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateMetadataLabels {
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateMetadata {
  "annotations": MonitoringAlertmanagerSpecStorageVolumeClaimTemplateMetadataAnnotations | undefined
  "labels": MonitoringAlertmanagerSpecStorageVolumeClaimTemplateMetadataLabels | undefined
  "name": string | undefined
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
  "namespace": string | undefined
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecResourcesClaimsItem {
  "name": string
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecResourcesLimits {
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecResourcesRequests {
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecResources {
  "claims": Array<MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  "limits": MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecResourcesLimits | undefined
  "requests": MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecSelector {
  "matchExpressions": Array<MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpec {
  "accessModes": Array<string> | undefined
  "dataSource": MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecDataSource | undefined
  "dataSourceRef": MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecDataSourceRef | undefined
  "resources": MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecResources | undefined
  "selector": MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpecSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateStatusAllocatedResources {
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateStatusCapacity {
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateStatusConditionsItem {
  "lastProbeTime": string | undefined
  "lastTransitionTime": string | undefined
  "message": string | undefined
  "reason": string | undefined
  "status": string
  "type": string
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplateStatus {
  "accessModes": Array<string> | undefined
  "allocatedResources": MonitoringAlertmanagerSpecStorageVolumeClaimTemplateStatusAllocatedResources | undefined
  "capacity": MonitoringAlertmanagerSpecStorageVolumeClaimTemplateStatusCapacity | undefined
  "conditions": Array<MonitoringAlertmanagerSpecStorageVolumeClaimTemplateStatusConditionsItem> | undefined
  "phase": string | undefined
  "resizeStatus": string | undefined
}
export interface MonitoringAlertmanagerSpecStorageVolumeClaimTemplate {
  "apiVersion": string | undefined
  "kind": string | undefined
  "metadata": MonitoringAlertmanagerSpecStorageVolumeClaimTemplateMetadata | undefined
  "spec": MonitoringAlertmanagerSpecStorageVolumeClaimTemplateSpec | undefined
  "status": MonitoringAlertmanagerSpecStorageVolumeClaimTemplateStatus | undefined
}
export interface MonitoringAlertmanagerSpecStorage {
  "disableMountSubPath": boolean | undefined
  "emptyDir": MonitoringAlertmanagerSpecStorageEmptyDir | undefined
  "ephemeral": MonitoringAlertmanagerSpecStorageEphemeral | undefined
  "volumeClaimTemplate": MonitoringAlertmanagerSpecStorageVolumeClaimTemplate | undefined
}
export interface MonitoringAlertmanagerSpecTolerationsItem {
  "effect": string | undefined
  "key": string | undefined
  "operator": string | undefined
  "tolerationSeconds": number | undefined
  "value": string | undefined
}
export interface MonitoringAlertmanagerSpecTopologySpreadConstraintsItemLabelSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecTopologySpreadConstraintsItemLabelSelectorMatchLabels {
}
export interface MonitoringAlertmanagerSpecTopologySpreadConstraintsItemLabelSelector {
  "matchExpressions": Array<MonitoringAlertmanagerSpecTopologySpreadConstraintsItemLabelSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringAlertmanagerSpecTopologySpreadConstraintsItemLabelSelectorMatchLabels | undefined
}
export interface MonitoringAlertmanagerSpecTopologySpreadConstraintsItem {
  "labelSelector": MonitoringAlertmanagerSpecTopologySpreadConstraintsItemLabelSelector | undefined
  "matchLabelKeys": Array<string> | undefined
  "maxSkew": number
  "minDomains": number | undefined
  "nodeAffinityPolicy": string | undefined
  "nodeTaintsPolicy": string | undefined
  "topologyKey": string
  "whenUnsatisfiable": string
}
export interface MonitoringAlertmanagerSpecVolumeMountsItem {
  "mountPath": string
  "mountPropagation": string | undefined
  "name": string
  "readOnly": boolean | undefined
  "subPath": string | undefined
  "subPathExpr": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemAwsElasticBlockStore {
  "fsType": string | undefined
  "partition": number | undefined
  "readOnly": boolean | undefined
  "volumeID": string
}
export interface MonitoringAlertmanagerSpecVolumesItemAzureDisk {
  "cachingMode": string | undefined
  "diskName": string
  "diskURI": string
  "fsType": string | undefined
  "kind": string | undefined
  "readOnly": boolean | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemAzureFile {
  "readOnly": boolean | undefined
  "secretName": string
  "shareName": string
}
export interface MonitoringAlertmanagerSpecVolumesItemCephfsSecretRef {
  "name": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemCephfs {
  "monitors": Array<string>
  "path": string | undefined
  "readOnly": boolean | undefined
  "secretFile": string | undefined
  "secretRef": MonitoringAlertmanagerSpecVolumesItemCephfsSecretRef | undefined
  "user": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemCinderSecretRef {
  "name": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemCinder {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MonitoringAlertmanagerSpecVolumesItemCinderSecretRef | undefined
  "volumeID": string
}
export interface MonitoringAlertmanagerSpecVolumesItemConfigMapItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MonitoringAlertmanagerSpecVolumesItemConfigMap {
  "defaultMode": number | undefined
  "items": Array<MonitoringAlertmanagerSpecVolumesItemConfigMapItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemCsiNodePublishSecretRef {
  "name": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemCsiVolumeAttributes {
}
export interface MonitoringAlertmanagerSpecVolumesItemCsi {
  "driver": string
  "fsType": string | undefined
  "nodePublishSecretRef": MonitoringAlertmanagerSpecVolumesItemCsiNodePublishSecretRef | undefined
  "readOnly": boolean | undefined
  "volumeAttributes": MonitoringAlertmanagerSpecVolumesItemCsiVolumeAttributes | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemDownwardAPIItemsItemFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MonitoringAlertmanagerSpecVolumesItemDownwardAPIItemsItemResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MonitoringAlertmanagerSpecVolumesItemDownwardAPIItemsItem {
  "fieldRef": MonitoringAlertmanagerSpecVolumesItemDownwardAPIItemsItemFieldRef | undefined
  "mode": number | undefined
  "path": string
  "resourceFieldRef": MonitoringAlertmanagerSpecVolumesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemDownwardAPI {
  "defaultMode": number | undefined
  "items": Array<MonitoringAlertmanagerSpecVolumesItemDownwardAPIItemsItem> | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemEmptyDir {
  "medium": string | undefined
  "sizeLimit": object | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateMetadata {
}
export interface MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSource {
  "apiGroup": string | undefined
  "kind": string
  "name": string
}
export interface MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSourceRef {
  "apiGroup": string | undefined
  "kind": string
  "name": string
  "namespace": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesClaimsItem {
  "name": string
}
export interface MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesLimits {
}
export interface MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesRequests {
}
export interface MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResources {
  "claims": Array<MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesClaimsItem> | undefined
  "limits": MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesLimits | undefined
  "requests": MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResourcesRequests | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels {
}
export interface MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelector {
  "matchExpressions": Array<MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelectorMatchLabels | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpec {
  "accessModes": Array<string> | undefined
  "dataSource": MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSource | undefined
  "dataSourceRef": MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecDataSourceRef | undefined
  "resources": MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecResources | undefined
  "selector": MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpecSelector | undefined
  "storageClassName": string | undefined
  "volumeMode": string | undefined
  "volumeName": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplate {
  "metadata": MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateMetadata | undefined
  "spec": MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplateSpec
}
export interface MonitoringAlertmanagerSpecVolumesItemEphemeral {
  "volumeClaimTemplate": MonitoringAlertmanagerSpecVolumesItemEphemeralVolumeClaimTemplate | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemFc {
  "fsType": string | undefined
  "lun": number | undefined
  "readOnly": boolean | undefined
  "targetWWNs": Array<string> | undefined
  "wwids": Array<string> | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemFlexVolumeOptions {
}
export interface MonitoringAlertmanagerSpecVolumesItemFlexVolumeSecretRef {
  "name": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemFlexVolume {
  "driver": string
  "fsType": string | undefined
  "options": MonitoringAlertmanagerSpecVolumesItemFlexVolumeOptions | undefined
  "readOnly": boolean | undefined
  "secretRef": MonitoringAlertmanagerSpecVolumesItemFlexVolumeSecretRef | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemFlocker {
  "datasetName": string | undefined
  "datasetUUID": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemGcePersistentDisk {
  "fsType": string | undefined
  "partition": number | undefined
  "pdName": string
  "readOnly": boolean | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemGitRepo {
  "directory": string | undefined
  "repository": string
  "revision": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemGlusterfs {
  "endpoints": string
  "path": string
  "readOnly": boolean | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemHostPath {
  "path": string
  "type": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemIscsiSecretRef {
  "name": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemIscsi {
  "chapAuthDiscovery": boolean | undefined
  "chapAuthSession": boolean | undefined
  "fsType": string | undefined
  "initiatorName": string | undefined
  "iqn": string
  "iscsiInterface": string | undefined
  "lun": number
  "portals": Array<string> | undefined
  "readOnly": boolean | undefined
  "secretRef": MonitoringAlertmanagerSpecVolumesItemIscsiSecretRef | undefined
  "targetPortal": string
}
export interface MonitoringAlertmanagerSpecVolumesItemNfs {
  "path": string
  "readOnly": boolean | undefined
  "server": string
}
export interface MonitoringAlertmanagerSpecVolumesItemPersistentVolumeClaim {
  "claimName": string
  "readOnly": boolean | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemPhotonPersistentDisk {
  "fsType": string | undefined
  "pdID": string
}
export interface MonitoringAlertmanagerSpecVolumesItemPortworxVolume {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "volumeID": string
}
export interface MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemConfigMapItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemConfigMap {
  "items": Array<MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemConfigMapItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemFieldRef {
  "apiVersion": string | undefined
  "fieldPath": string
}
export interface MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef {
  "containerName": string | undefined
  "divisor": object | undefined
  "resource": string
}
export interface MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItem {
  "fieldRef": MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemFieldRef | undefined
  "mode": number | undefined
  "path": string
  "resourceFieldRef": MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItemResourceFieldRef | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemDownwardAPI {
  "items": Array<MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemDownwardAPIItemsItem> | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemSecretItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemSecret {
  "items": Array<MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemSecretItemsItem> | undefined
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemServiceAccountToken {
  "audience": string | undefined
  "expirationSeconds": number | undefined
  "path": string
}
export interface MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItem {
  "configMap": MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemConfigMap | undefined
  "downwardAPI": MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemDownwardAPI | undefined
  "secret": MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemSecret | undefined
  "serviceAccountToken": MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItemServiceAccountToken | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemProjected {
  "defaultMode": number | undefined
  "sources": Array<MonitoringAlertmanagerSpecVolumesItemProjectedSourcesItem> | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemQuobyte {
  "group": string | undefined
  "readOnly": boolean | undefined
  "registry": string
  "tenant": string | undefined
  "user": string | undefined
  "volume": string
}
export interface MonitoringAlertmanagerSpecVolumesItemRbdSecretRef {
  "name": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemRbd {
  "fsType": string | undefined
  "image": string
  "keyring": string | undefined
  "monitors": Array<string>
  "pool": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MonitoringAlertmanagerSpecVolumesItemRbdSecretRef | undefined
  "user": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemScaleIOSecretRef {
  "name": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemScaleIO {
  "fsType": string | undefined
  "gateway": string
  "protectionDomain": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MonitoringAlertmanagerSpecVolumesItemScaleIOSecretRef
  "sslEnabled": boolean | undefined
  "storageMode": string | undefined
  "storagePool": string | undefined
  "system": string
  "volumeName": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemSecretItemsItem {
  "key": string
  "mode": number | undefined
  "path": string
}
export interface MonitoringAlertmanagerSpecVolumesItemSecret {
  "defaultMode": number | undefined
  "items": Array<MonitoringAlertmanagerSpecVolumesItemSecretItemsItem> | undefined
  "optional": boolean | undefined
  "secretName": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemStorageosSecretRef {
  "name": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemStorageos {
  "fsType": string | undefined
  "readOnly": boolean | undefined
  "secretRef": MonitoringAlertmanagerSpecVolumesItemStorageosSecretRef | undefined
  "volumeName": string | undefined
  "volumeNamespace": string | undefined
}
export interface MonitoringAlertmanagerSpecVolumesItemVsphereVolume {
  "fsType": string | undefined
  "storagePolicyID": string | undefined
  "storagePolicyName": string | undefined
  "volumePath": string
}
export interface MonitoringAlertmanagerSpecVolumesItem {
  "awsElasticBlockStore": MonitoringAlertmanagerSpecVolumesItemAwsElasticBlockStore | undefined
  "azureDisk": MonitoringAlertmanagerSpecVolumesItemAzureDisk | undefined
  "azureFile": MonitoringAlertmanagerSpecVolumesItemAzureFile | undefined
  "cephfs": MonitoringAlertmanagerSpecVolumesItemCephfs | undefined
  "cinder": MonitoringAlertmanagerSpecVolumesItemCinder | undefined
  "configMap": MonitoringAlertmanagerSpecVolumesItemConfigMap | undefined
  "csi": MonitoringAlertmanagerSpecVolumesItemCsi | undefined
  "downwardAPI": MonitoringAlertmanagerSpecVolumesItemDownwardAPI | undefined
  "emptyDir": MonitoringAlertmanagerSpecVolumesItemEmptyDir | undefined
  "ephemeral": MonitoringAlertmanagerSpecVolumesItemEphemeral | undefined
  "fc": MonitoringAlertmanagerSpecVolumesItemFc | undefined
  "flexVolume": MonitoringAlertmanagerSpecVolumesItemFlexVolume | undefined
  "flocker": MonitoringAlertmanagerSpecVolumesItemFlocker | undefined
  "gcePersistentDisk": MonitoringAlertmanagerSpecVolumesItemGcePersistentDisk | undefined
  "gitRepo": MonitoringAlertmanagerSpecVolumesItemGitRepo | undefined
  "glusterfs": MonitoringAlertmanagerSpecVolumesItemGlusterfs | undefined
  "hostPath": MonitoringAlertmanagerSpecVolumesItemHostPath | undefined
  "iscsi": MonitoringAlertmanagerSpecVolumesItemIscsi | undefined
  "name": string
  "nfs": MonitoringAlertmanagerSpecVolumesItemNfs | undefined
  "persistentVolumeClaim": MonitoringAlertmanagerSpecVolumesItemPersistentVolumeClaim | undefined
  "photonPersistentDisk": MonitoringAlertmanagerSpecVolumesItemPhotonPersistentDisk | undefined
  "portworxVolume": MonitoringAlertmanagerSpecVolumesItemPortworxVolume | undefined
  "projected": MonitoringAlertmanagerSpecVolumesItemProjected | undefined
  "quobyte": MonitoringAlertmanagerSpecVolumesItemQuobyte | undefined
  "rbd": MonitoringAlertmanagerSpecVolumesItemRbd | undefined
  "scaleIO": MonitoringAlertmanagerSpecVolumesItemScaleIO | undefined
  "secret": MonitoringAlertmanagerSpecVolumesItemSecret | undefined
  "storageos": MonitoringAlertmanagerSpecVolumesItemStorageos | undefined
  "vsphereVolume": MonitoringAlertmanagerSpecVolumesItemVsphereVolume | undefined
}
export interface MonitoringAlertmanagerSpecWebHttpConfigHeaders {
  "contentSecurityPolicy": string | undefined
  "strictTransportSecurity": string | undefined
  "xContentTypeOptions": string | undefined
  "xFrameOptions": string | undefined
  "xXSSProtection": string | undefined
}
export interface MonitoringAlertmanagerSpecWebHttpConfig {
  "headers": MonitoringAlertmanagerSpecWebHttpConfigHeaders | undefined
  "http2": boolean | undefined
}
export interface MonitoringAlertmanagerSpecWebTlsConfigCertConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecWebTlsConfigCertSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecWebTlsConfigCert {
  "configMap": MonitoringAlertmanagerSpecWebTlsConfigCertConfigMap | undefined
  "secret": MonitoringAlertmanagerSpecWebTlsConfigCertSecret | undefined
}
export interface MonitoringAlertmanagerSpecWebTlsConfigClient_caConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecWebTlsConfigClient_caSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecWebTlsConfigClient_ca {
  "configMap": MonitoringAlertmanagerSpecWebTlsConfigClient_caConfigMap | undefined
  "secret": MonitoringAlertmanagerSpecWebTlsConfigClient_caSecret | undefined
}
export interface MonitoringAlertmanagerSpecWebTlsConfigKeySecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringAlertmanagerSpecWebTlsConfig {
  "cert": MonitoringAlertmanagerSpecWebTlsConfigCert
  "cipherSuites": Array<string> | undefined
  "clientAuthType": string | undefined
  "client_ca": MonitoringAlertmanagerSpecWebTlsConfigClient_ca | undefined
  "curvePreferences": Array<string> | undefined
  "keySecret": MonitoringAlertmanagerSpecWebTlsConfigKeySecret
  "maxVersion": string | undefined
  "minVersion": string | undefined
  "preferServerCipherSuites": boolean | undefined
}
export interface MonitoringAlertmanagerSpecWeb {
  "getConcurrency": number | undefined
  "httpConfig": MonitoringAlertmanagerSpecWebHttpConfig | undefined
  "timeout": number | undefined
  "tlsConfig": MonitoringAlertmanagerSpecWebTlsConfig | undefined
}
export interface MonitoringAlertmanagerSpec {
  "additionalPeers": Array<string> | undefined
  "affinity": MonitoringAlertmanagerSpecAffinity | undefined
  "alertmanagerConfigMatcherStrategy": MonitoringAlertmanagerSpecAlertmanagerConfigMatcherStrategy | undefined
  "alertmanagerConfigNamespaceSelector": MonitoringAlertmanagerSpecAlertmanagerConfigNamespaceSelector | undefined
  "alertmanagerConfigSelector": MonitoringAlertmanagerSpecAlertmanagerConfigSelector | undefined
  "alertmanagerConfiguration": MonitoringAlertmanagerSpecAlertmanagerConfiguration | undefined
  "baseImage": string | undefined
  "clusterAdvertiseAddress": string | undefined
  "clusterGossipInterval": string | undefined
  "clusterPeerTimeout": string | undefined
  "clusterPushpullInterval": string | undefined
  "configMaps": Array<string> | undefined
  "configSecret": string | undefined
  "containers": Array<MonitoringAlertmanagerSpecContainersItem> | undefined
  "externalUrl": string | undefined
  "forceEnableClusterMode": boolean | undefined
  "hostAliases": Array<MonitoringAlertmanagerSpecHostAliasesItem> | undefined
  "image": string | undefined
  "imagePullPolicy": string | undefined
  "imagePullSecrets": Array<MonitoringAlertmanagerSpecImagePullSecretsItem> | undefined
  "initContainers": Array<MonitoringAlertmanagerSpecInitContainersItem> | undefined
  "listenLocal": boolean | undefined
  "logFormat": string | undefined
  "logLevel": string | undefined
  "minReadySeconds": number | undefined
  "nodeSelector": MonitoringAlertmanagerSpecNodeSelector | undefined
  "paused": boolean | undefined
  "podMetadata": MonitoringAlertmanagerSpecPodMetadata | undefined
  "portName": string | undefined
  "priorityClassName": string | undefined
  "replicas": number | undefined
  "resources": MonitoringAlertmanagerSpecResources | undefined
  "retention": string | undefined
  "routePrefix": string | undefined
  "secrets": Array<string> | undefined
  "securityContext": MonitoringAlertmanagerSpecSecurityContext | undefined
  "serviceAccountName": string | undefined
  "sha": string | undefined
  "storage": MonitoringAlertmanagerSpecStorage | undefined
  "tag": string | undefined
  "tolerations": Array<MonitoringAlertmanagerSpecTolerationsItem> | undefined
  "topologySpreadConstraints": Array<MonitoringAlertmanagerSpecTopologySpreadConstraintsItem> | undefined
  "version": string | undefined
  "volumeMounts": Array<MonitoringAlertmanagerSpecVolumeMountsItem> | undefined
  "volumes": Array<MonitoringAlertmanagerSpecVolumesItem> | undefined
  "web": MonitoringAlertmanagerSpecWeb | undefined
}
export interface MonitoringAlertmanager extends KubernetesObject {
  spec: MonitoringAlertmanagerSpec
  status: MonitoringAlertmanagerStatus | undefined
}
export type MonitoringAlertmanagerList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MonitoringAlertmanager>
