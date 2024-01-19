type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MonitoringPodMonitorSpecAttachMetadata {
  "node": boolean | undefined
}
export interface MonitoringPodMonitorSpecNamespaceSelector {
  "any": boolean | undefined
  "matchNames": Array<string> | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemAuthorizationCredentials {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemAuthorization {
  "credentials": MonitoringPodMonitorSpecPodMetricsEndpointsItemAuthorizationCredentials | undefined
  "type": string | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemBasicAuthPassword {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemBasicAuthUsername {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemBasicAuth {
  "password": MonitoringPodMonitorSpecPodMetricsEndpointsItemBasicAuthPassword | undefined
  "username": MonitoringPodMonitorSpecPodMetricsEndpointsItemBasicAuthUsername | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemBearerTokenSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemMetricRelabelingsItem {
  "action": string | undefined
  "modulus": number | undefined
  "regex": string | undefined
  "replacement": string | undefined
  "separator": string | undefined
  "sourceLabels": Array<string> | undefined
  "targetLabel": string | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemOauth2ClientIdConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemOauth2ClientIdSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemOauth2ClientId {
  "configMap": MonitoringPodMonitorSpecPodMetricsEndpointsItemOauth2ClientIdConfigMap | undefined
  "secret": MonitoringPodMonitorSpecPodMetricsEndpointsItemOauth2ClientIdSecret | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemOauth2ClientSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemOauth2EndpointParams {
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemOauth2 {
  "clientId": MonitoringPodMonitorSpecPodMetricsEndpointsItemOauth2ClientId
  "clientSecret": MonitoringPodMonitorSpecPodMetricsEndpointsItemOauth2ClientSecret
  "endpointParams": MonitoringPodMonitorSpecPodMetricsEndpointsItemOauth2EndpointParams | undefined
  "scopes": Array<string> | undefined
  "tokenUrl": string
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemParams {
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemRelabelingsItem {
  "action": string | undefined
  "modulus": number | undefined
  "regex": string | undefined
  "replacement": string | undefined
  "separator": string | undefined
  "sourceLabels": Array<string> | undefined
  "targetLabel": string | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfigCaConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfigCaSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfigCa {
  "configMap": MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfigCaConfigMap | undefined
  "secret": MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfigCaSecret | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfigCertConfigMap {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfigCertSecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfigCert {
  "configMap": MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfigCertConfigMap | undefined
  "secret": MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfigCertSecret | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfigKeySecret {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfig {
  "ca": MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfigCa | undefined
  "cert": MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfigCert | undefined
  "insecureSkipVerify": boolean | undefined
  "keySecret": MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfigKeySecret | undefined
  "serverName": string | undefined
}
export interface MonitoringPodMonitorSpecPodMetricsEndpointsItem {
  "authorization": MonitoringPodMonitorSpecPodMetricsEndpointsItemAuthorization | undefined
  "basicAuth": MonitoringPodMonitorSpecPodMetricsEndpointsItemBasicAuth | undefined
  "bearerTokenSecret": MonitoringPodMonitorSpecPodMetricsEndpointsItemBearerTokenSecret | undefined
  "enableHttp2": boolean | undefined
  "filterRunning": boolean | undefined
  "followRedirects": boolean | undefined
  "honorLabels": boolean | undefined
  "honorTimestamps": boolean | undefined
  "interval": string | undefined
  "metricRelabelings": Array<MonitoringPodMonitorSpecPodMetricsEndpointsItemMetricRelabelingsItem> | undefined
  "oauth2": MonitoringPodMonitorSpecPodMetricsEndpointsItemOauth2 | undefined
  "params": MonitoringPodMonitorSpecPodMetricsEndpointsItemParams | undefined
  "path": string | undefined
  "port": string | undefined
  "proxyUrl": string | undefined
  "relabelings": Array<MonitoringPodMonitorSpecPodMetricsEndpointsItemRelabelingsItem> | undefined
  "scheme": string | undefined
  "scrapeTimeout": string | undefined
  "targetPort": object | undefined
  "tlsConfig": MonitoringPodMonitorSpecPodMetricsEndpointsItemTlsConfig | undefined
}
export interface MonitoringPodMonitorSpecSelectorMatchExpressionsItem {
  "key": string
  "operator": string
  "values": Array<string> | undefined
}
export interface MonitoringPodMonitorSpecSelectorMatchLabels {
}
export interface MonitoringPodMonitorSpecSelector {
  "matchExpressions": Array<MonitoringPodMonitorSpecSelectorMatchExpressionsItem> | undefined
  "matchLabels": MonitoringPodMonitorSpecSelectorMatchLabels | undefined
}
export interface MonitoringPodMonitorSpec {
  "attachMetadata": MonitoringPodMonitorSpecAttachMetadata | undefined
  "jobLabel": string | undefined
  "labelLimit": number | undefined
  "labelNameLengthLimit": number | undefined
  "labelValueLengthLimit": number | undefined
  "namespaceSelector": MonitoringPodMonitorSpecNamespaceSelector | undefined
  "podMetricsEndpoints": Array<MonitoringPodMonitorSpecPodMetricsEndpointsItem>
  "podTargetLabels": Array<string> | undefined
  "sampleLimit": number | undefined
  "selector": MonitoringPodMonitorSpecSelector
  "targetLimit": number | undefined
}
export interface MonitoringPodMonitor extends KubernetesObject {
  spec: MonitoringPodMonitorSpec
}
export type MonitoringPodMonitorList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MonitoringPodMonitor>
