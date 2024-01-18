type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MonitoringProbeSpecAuthorizationCredentials {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringProbeSpecAuthorization {
  credentials: MonitoringProbeSpecAuthorizationCredentials | undefined
  type: string | undefined
}
export interface MonitoringProbeSpecBasicAuthPassword {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringProbeSpecBasicAuthUsername {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringProbeSpecBasicAuth {
  password: MonitoringProbeSpecBasicAuthPassword | undefined
  username: MonitoringProbeSpecBasicAuthUsername | undefined
}
export interface MonitoringProbeSpecBearerTokenSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringProbeSpecMetricRelabelingsItem {
  action: string | undefined
  modulus: number | undefined
  regex: string | undefined
  replacement: string | undefined
  separator: string | undefined
  sourceLabels: Array<string> | undefined
  targetLabel: string | undefined
}
export interface MonitoringProbeSpecOauth2ClientIdConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringProbeSpecOauth2ClientIdSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringProbeSpecOauth2ClientId {
  configMap: MonitoringProbeSpecOauth2ClientIdConfigMap | undefined
  secret: MonitoringProbeSpecOauth2ClientIdSecret | undefined
}
export interface MonitoringProbeSpecOauth2ClientSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringProbeSpecOauth2EndpointParams {
}
export interface MonitoringProbeSpecOauth2 {
  clientId: MonitoringProbeSpecOauth2ClientId
  clientSecret: MonitoringProbeSpecOauth2ClientSecret
  endpointParams: MonitoringProbeSpecOauth2EndpointParams | undefined
  scopes: Array<string> | undefined
  tokenUrl: string
}
export interface MonitoringProbeSpecProber {
  path: string | undefined
  proxyUrl: string | undefined
  scheme: string | undefined
  url: string
}
export interface MonitoringProbeSpecTargetsIngressNamespaceSelector {
  any: boolean | undefined
  matchNames: Array<string> | undefined
}
export interface MonitoringProbeSpecTargetsIngressRelabelingConfigsItem {
  action: string | undefined
  modulus: number | undefined
  regex: string | undefined
  replacement: string | undefined
  separator: string | undefined
  sourceLabels: Array<string> | undefined
  targetLabel: string | undefined
}
export interface MonitoringProbeSpecTargetsIngressSelectorMatchExpressionsItem {
  key: string
  operator: string
  values: Array<string> | undefined
}
export interface MonitoringProbeSpecTargetsIngressSelectorMatchLabels {
}
export interface MonitoringProbeSpecTargetsIngressSelector {
  matchExpressions: Array<MonitoringProbeSpecTargetsIngressSelectorMatchExpressionsItem> | undefined
  matchLabels: MonitoringProbeSpecTargetsIngressSelectorMatchLabels | undefined
}
export interface MonitoringProbeSpecTargetsIngress {
  namespaceSelector: MonitoringProbeSpecTargetsIngressNamespaceSelector | undefined
  relabelingConfigs: Array<MonitoringProbeSpecTargetsIngressRelabelingConfigsItem> | undefined
  selector: MonitoringProbeSpecTargetsIngressSelector | undefined
}
export interface MonitoringProbeSpecTargetsStaticConfigLabels {
}
export interface MonitoringProbeSpecTargetsStaticConfigRelabelingConfigsItem {
  action: string | undefined
  modulus: number | undefined
  regex: string | undefined
  replacement: string | undefined
  separator: string | undefined
  sourceLabels: Array<string> | undefined
  targetLabel: string | undefined
}
export interface MonitoringProbeSpecTargetsStaticConfig {
  labels: MonitoringProbeSpecTargetsStaticConfigLabels | undefined
  relabelingConfigs: Array<MonitoringProbeSpecTargetsStaticConfigRelabelingConfigsItem> | undefined
  static: Array<string> | undefined
}
export interface MonitoringProbeSpecTargets {
  ingress: MonitoringProbeSpecTargetsIngress | undefined
  staticConfig: MonitoringProbeSpecTargetsStaticConfig | undefined
}
export interface MonitoringProbeSpecTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringProbeSpecTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringProbeSpecTlsConfigCa {
  configMap: MonitoringProbeSpecTlsConfigCaConfigMap | undefined
  secret: MonitoringProbeSpecTlsConfigCaSecret | undefined
}
export interface MonitoringProbeSpecTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringProbeSpecTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringProbeSpecTlsConfigCert {
  configMap: MonitoringProbeSpecTlsConfigCertConfigMap | undefined
  secret: MonitoringProbeSpecTlsConfigCertSecret | undefined
}
export interface MonitoringProbeSpecTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringProbeSpecTlsConfig {
  ca: MonitoringProbeSpecTlsConfigCa | undefined
  cert: MonitoringProbeSpecTlsConfigCert | undefined
  insecureSkipVerify: boolean | undefined
  keySecret: MonitoringProbeSpecTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringProbeSpec {
  authorization: MonitoringProbeSpecAuthorization | undefined
  basicAuth: MonitoringProbeSpecBasicAuth | undefined
  bearerTokenSecret: MonitoringProbeSpecBearerTokenSecret | undefined
  interval: string | undefined
  jobName: string | undefined
  labelLimit: number | undefined
  labelNameLengthLimit: number | undefined
  labelValueLengthLimit: number | undefined
  metricRelabelings: Array<MonitoringProbeSpecMetricRelabelingsItem> | undefined
  module: string | undefined
  oauth2: MonitoringProbeSpecOauth2 | undefined
  prober: MonitoringProbeSpecProber | undefined
  sampleLimit: number | undefined
  scrapeTimeout: string | undefined
  targetLimit: number | undefined
  targets: MonitoringProbeSpecTargets | undefined
  tlsConfig: MonitoringProbeSpecTlsConfig | undefined
}
export interface MonitoringProbe extends KubernetesObject {
  spec: MonitoringProbeSpec
}
export type MonitoringProbeList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MonitoringProbe>
