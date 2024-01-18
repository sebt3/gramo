type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MonitoringServiceMonitorSpecAttachMetadata {
  node: boolean | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemAuthorizationCredentials {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemAuthorization {
  credentials: MonitoringServiceMonitorSpecEndpointsItemAuthorizationCredentials | undefined
  type: string | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemBasicAuthPassword {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemBasicAuthUsername {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemBasicAuth {
  password: MonitoringServiceMonitorSpecEndpointsItemBasicAuthPassword | undefined
  username: MonitoringServiceMonitorSpecEndpointsItemBasicAuthUsername | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemBearerTokenSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemMetricRelabelingsItem {
  action: string | undefined
  modulus: number | undefined
  regex: string | undefined
  replacement: string | undefined
  separator: string | undefined
  sourceLabels: Array<string> | undefined
  targetLabel: string | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemOauth2ClientIdConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemOauth2ClientIdSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemOauth2ClientId {
  configMap: MonitoringServiceMonitorSpecEndpointsItemOauth2ClientIdConfigMap | undefined
  secret: MonitoringServiceMonitorSpecEndpointsItemOauth2ClientIdSecret | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemOauth2ClientSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemOauth2EndpointParams {
}
export interface MonitoringServiceMonitorSpecEndpointsItemOauth2 {
  clientId: MonitoringServiceMonitorSpecEndpointsItemOauth2ClientId
  clientSecret: MonitoringServiceMonitorSpecEndpointsItemOauth2ClientSecret
  endpointParams: MonitoringServiceMonitorSpecEndpointsItemOauth2EndpointParams | undefined
  scopes: Array<string> | undefined
  tokenUrl: string
}
export interface MonitoringServiceMonitorSpecEndpointsItemParams {
}
export interface MonitoringServiceMonitorSpecEndpointsItemRelabelingsItem {
  action: string | undefined
  modulus: number | undefined
  regex: string | undefined
  replacement: string | undefined
  separator: string | undefined
  sourceLabels: Array<string> | undefined
  targetLabel: string | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemTlsConfigCa {
  configMap: MonitoringServiceMonitorSpecEndpointsItemTlsConfigCaConfigMap | undefined
  secret: MonitoringServiceMonitorSpecEndpointsItemTlsConfigCaSecret | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemTlsConfigCert {
  configMap: MonitoringServiceMonitorSpecEndpointsItemTlsConfigCertConfigMap | undefined
  secret: MonitoringServiceMonitorSpecEndpointsItemTlsConfigCertSecret | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItemTlsConfig {
  ca: MonitoringServiceMonitorSpecEndpointsItemTlsConfigCa | undefined
  caFile: string | undefined
  cert: MonitoringServiceMonitorSpecEndpointsItemTlsConfigCert | undefined
  certFile: string | undefined
  insecureSkipVerify: boolean | undefined
  keyFile: string | undefined
  keySecret: MonitoringServiceMonitorSpecEndpointsItemTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringServiceMonitorSpecEndpointsItem {
  authorization: MonitoringServiceMonitorSpecEndpointsItemAuthorization | undefined
  basicAuth: MonitoringServiceMonitorSpecEndpointsItemBasicAuth | undefined
  bearerTokenFile: string | undefined
  bearerTokenSecret: MonitoringServiceMonitorSpecEndpointsItemBearerTokenSecret | undefined
  enableHttp2: boolean | undefined
  filterRunning: boolean | undefined
  followRedirects: boolean | undefined
  honorLabels: boolean | undefined
  honorTimestamps: boolean | undefined
  interval: string | undefined
  metricRelabelings: Array<MonitoringServiceMonitorSpecEndpointsItemMetricRelabelingsItem> | undefined
  oauth2: MonitoringServiceMonitorSpecEndpointsItemOauth2 | undefined
  params: MonitoringServiceMonitorSpecEndpointsItemParams | undefined
  path: string | undefined
  port: string | undefined
  proxyUrl: string | undefined
  relabelings: Array<MonitoringServiceMonitorSpecEndpointsItemRelabelingsItem> | undefined
  scheme: string | undefined
  scrapeTimeout: string | undefined
  targetPort: object | undefined
  tlsConfig: MonitoringServiceMonitorSpecEndpointsItemTlsConfig | undefined
}
export interface MonitoringServiceMonitorSpecNamespaceSelector {
  any: boolean | undefined
  matchNames: Array<string> | undefined
}
export interface MonitoringServiceMonitorSpecSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringServiceMonitorSpecSelectorMatchLabels {
}
export interface MonitoringServiceMonitorSpecSelector {
  matchExpressions: Array<MonitoringServiceMonitorSpecSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringServiceMonitorSpecSelectorMatchLabels | undefined
}
export interface MonitoringServiceMonitorSpec {
  attachMetadata: MonitoringServiceMonitorSpecAttachMetadata | undefined
  endpoints: Array<MonitoringServiceMonitorSpecEndpointsItem>
  jobLabel: string | undefined
  labelLimit: number | undefined
  labelNameLengthLimit: number | undefined
  labelValueLengthLimit: number | undefined
  namespaceSelector: MonitoringServiceMonitorSpecNamespaceSelector | undefined
  podTargetLabels: Array<string> | undefined
  sampleLimit: number | undefined
  selector: MonitoringServiceMonitorSpecSelector
  targetLabels: Array<string> | undefined
  targetLimit: number | undefined
}
export interface MonitoringServiceMonitor extends KubernetesObject {
  spec: MonitoringServiceMonitorSpec
}
export type MonitoringServiceMonitorList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MonitoringServiceMonitor>
