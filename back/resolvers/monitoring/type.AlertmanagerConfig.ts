type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MonitoringAlertmanagerConfigSpecInhibitRulesItemSourceMatchItem {
  matchType: string | undefined
  name: string
  regex: boolean | undefined
  value: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecInhibitRulesItemTargetMatchItem {
  matchType: string | undefined
  name: string
  regex: boolean | undefined
  value: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecInhibitRulesItem {
  equal: Array<string> | undefined
  sourceMatch: Array<MonitoringAlertmanagerConfigSpecInhibitRulesItemSourceMatchItem> | undefined
  targetMatch: Array<MonitoringAlertmanagerConfigSpecInhibitRulesItemTargetMatchItem> | undefined
}
export interface MonitoringAlertmanagerConfigSpecMuteTimeIntervalsItemTimeIntervalsItemDaysOfMonthItem {
  end: number | undefined
  start: number | undefined
}
export interface MonitoringAlertmanagerConfigSpecMuteTimeIntervalsItemTimeIntervalsItemTimesItem {
  endTime: string | undefined
  startTime: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecMuteTimeIntervalsItemTimeIntervalsItem {
  daysOfMonth: Array<MonitoringAlertmanagerConfigSpecMuteTimeIntervalsItemTimeIntervalsItemDaysOfMonthItem> | undefined
  months: Array<string> | undefined
  times: Array<MonitoringAlertmanagerConfigSpecMuteTimeIntervalsItemTimeIntervalsItemTimesItem> | undefined
  weekdays: Array<string> | undefined
  years: Array<string> | undefined
}
export interface MonitoringAlertmanagerConfigSpecMuteTimeIntervalsItem {
  name: string | undefined
  timeIntervals: Array<MonitoringAlertmanagerConfigSpecMuteTimeIntervalsItemTimeIntervalsItem> | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemAuthPassword {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemAuthSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemHeadersItem {
  key: string
  value: string
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfigCa {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfigCaConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfigCaSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfigCert {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfigCertConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfigCertSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfig {
  ca: MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfigCa | undefined
  cert: MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfigCert | undefined
  insecureSkipVerify: boolean | undefined
  keySecret: MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItem {
  authIdentity: string | undefined
  authPassword: MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemAuthPassword | undefined
  authSecret: MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemAuthSecret | undefined
  authUsername: string | undefined
  from: string | undefined
  headers: Array<MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemHeadersItem> | undefined
  hello: string | undefined
  html: string | undefined
  requireTLS: boolean | undefined
  sendResolved: boolean | undefined
  smarthost: string | undefined
  text: string | undefined
  tlsConfig: MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItemTlsConfig | undefined
  to: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemApiKey {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemDetailsItem {
  key: string
  value: string
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigAuthorizationCredentials {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigAuthorization {
  credentials: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigAuthorizationCredentials | undefined
  type: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigBasicAuthPassword {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigBasicAuthUsername {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigBasicAuth {
  password: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigBasicAuthPassword | undefined
  username: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigBasicAuthUsername | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigBearerTokenSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigOauth2ClientIdConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigOauth2ClientIdSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigOauth2ClientId {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigOauth2ClientIdConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigOauth2ClientIdSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigOauth2ClientSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigOauth2EndpointParams {
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigOauth2 {
  clientId: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigOauth2ClientId
  clientSecret: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigOauth2ClientSecret
  endpointParams: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigOauth2EndpointParams | undefined
  scopes: Array<string> | undefined
  tokenUrl: string
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfigCa {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfigCaConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfigCaSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfigCert {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfigCertConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfigCertSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfig {
  ca: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfigCa | undefined
  cert: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfigCert | undefined
  insecureSkipVerify: boolean | undefined
  keySecret: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfig {
  authorization: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigAuthorization | undefined
  basicAuth: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigBasicAuth | undefined
  bearerTokenSecret: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigBearerTokenSecret | undefined
  followRedirects: boolean | undefined
  oauth2: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigOauth2 | undefined
  proxyURL: string | undefined
  tlsConfig: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfigTlsConfig | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemRespondersItem {
  id: string | undefined
  name: string | undefined
  type: string
  username: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItem {
  actions: string | undefined
  apiKey: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemApiKey | undefined
  apiURL: string | undefined
  description: string | undefined
  details: Array<MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemDetailsItem> | undefined
  entity: string | undefined
  httpConfig: MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemHttpConfig | undefined
  message: string | undefined
  note: string | undefined
  priority: string | undefined
  responders: Array<MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItemRespondersItem> | undefined
  sendResolved: boolean | undefined
  source: string | undefined
  tags: string | undefined
  updateAlerts: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemDetailsItem {
  key: string
  value: string
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigAuthorizationCredentials {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigAuthorization {
  credentials: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigAuthorizationCredentials | undefined
  type: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigBasicAuthPassword {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigBasicAuthUsername {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigBasicAuth {
  password: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigBasicAuthPassword | undefined
  username: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigBasicAuthUsername | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigBearerTokenSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigOauth2ClientIdConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigOauth2ClientIdSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigOauth2ClientId {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigOauth2ClientIdConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigOauth2ClientIdSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigOauth2ClientSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigOauth2EndpointParams {
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigOauth2 {
  clientId: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigOauth2ClientId
  clientSecret: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigOauth2ClientSecret
  endpointParams: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigOauth2EndpointParams | undefined
  scopes: Array<string> | undefined
  tokenUrl: string
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfigCa {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfigCaConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfigCaSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfigCert {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfigCertConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfigCertSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfig {
  ca: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfigCa | undefined
  cert: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfigCert | undefined
  insecureSkipVerify: boolean | undefined
  keySecret: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfig {
  authorization: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigAuthorization | undefined
  basicAuth: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigBasicAuth | undefined
  bearerTokenSecret: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigBearerTokenSecret | undefined
  followRedirects: boolean | undefined
  oauth2: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigOauth2 | undefined
  proxyURL: string | undefined
  tlsConfig: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfigTlsConfig | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemPagerDutyImageConfigsItem {
  alt: string | undefined
  href: string | undefined
  src: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemPagerDutyLinkConfigsItem {
  alt: string | undefined
  href: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemRoutingKey {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemServiceKey {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItem {
  class: string | undefined
  client: string | undefined
  clientURL: string | undefined
  component: string | undefined
  description: string | undefined
  details: Array<MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemDetailsItem> | undefined
  group: string | undefined
  httpConfig: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemHttpConfig | undefined
  pagerDutyImageConfigs: Array<MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemPagerDutyImageConfigsItem> | undefined
  pagerDutyLinkConfigs: Array<MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemPagerDutyLinkConfigsItem> | undefined
  routingKey: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemRoutingKey | undefined
  sendResolved: boolean | undefined
  serviceKey: MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItemServiceKey | undefined
  severity: string | undefined
  url: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigAuthorizationCredentials {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigAuthorization {
  credentials: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigAuthorizationCredentials | undefined
  type: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigBasicAuthPassword {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigBasicAuthUsername {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigBasicAuth {
  password: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigBasicAuthPassword | undefined
  username: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigBasicAuthUsername | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigBearerTokenSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigOauth2ClientIdConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigOauth2ClientIdSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigOauth2ClientId {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigOauth2ClientIdConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigOauth2ClientIdSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigOauth2ClientSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigOauth2EndpointParams {
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigOauth2 {
  clientId: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigOauth2ClientId
  clientSecret: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigOauth2ClientSecret
  endpointParams: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigOauth2EndpointParams | undefined
  scopes: Array<string> | undefined
  tokenUrl: string
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfigCa {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfigCaConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfigCaSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfigCert {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfigCertConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfigCertSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfig {
  ca: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfigCa | undefined
  cert: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfigCert | undefined
  insecureSkipVerify: boolean | undefined
  keySecret: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfig {
  authorization: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigAuthorization | undefined
  basicAuth: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigBasicAuth | undefined
  bearerTokenSecret: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigBearerTokenSecret | undefined
  followRedirects: boolean | undefined
  oauth2: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigOauth2 | undefined
  proxyURL: string | undefined
  tlsConfig: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfigTlsConfig | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemToken {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemUserKey {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItem {
  expire: string | undefined
  html: boolean | undefined
  httpConfig: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemHttpConfig | undefined
  message: string | undefined
  priority: string | undefined
  retry: string | undefined
  sendResolved: boolean | undefined
  sound: string | undefined
  title: string | undefined
  token: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemToken | undefined
  url: string | undefined
  urlTitle: string | undefined
  userKey: MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItemUserKey | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemActionsItemConfirm {
  dismissText: string | undefined
  okText: string | undefined
  text: string
  title: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemActionsItem {
  confirm: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemActionsItemConfirm | undefined
  name: string | undefined
  style: string | undefined
  text: string
  type: string
  url: string | undefined
  value: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemApiURL {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemFieldsItem {
  short: boolean | undefined
  title: string
  value: string
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigAuthorizationCredentials {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigAuthorization {
  credentials: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigAuthorizationCredentials | undefined
  type: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigBasicAuthPassword {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigBasicAuthUsername {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigBasicAuth {
  password: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigBasicAuthPassword | undefined
  username: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigBasicAuthUsername | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigBearerTokenSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigOauth2ClientIdConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigOauth2ClientIdSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigOauth2ClientId {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigOauth2ClientIdConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigOauth2ClientIdSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigOauth2ClientSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigOauth2EndpointParams {
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigOauth2 {
  clientId: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigOauth2ClientId
  clientSecret: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigOauth2ClientSecret
  endpointParams: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigOauth2EndpointParams | undefined
  scopes: Array<string> | undefined
  tokenUrl: string
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfigCa {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfigCaConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfigCaSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfigCert {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfigCertConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfigCertSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfig {
  ca: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfigCa | undefined
  cert: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfigCert | undefined
  insecureSkipVerify: boolean | undefined
  keySecret: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfig {
  authorization: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigAuthorization | undefined
  basicAuth: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigBasicAuth | undefined
  bearerTokenSecret: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigBearerTokenSecret | undefined
  followRedirects: boolean | undefined
  oauth2: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigOauth2 | undefined
  proxyURL: string | undefined
  tlsConfig: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfigTlsConfig | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItem {
  actions: Array<MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemActionsItem> | undefined
  apiURL: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemApiURL | undefined
  callbackId: string | undefined
  channel: string | undefined
  color: string | undefined
  fallback: string | undefined
  fields: Array<MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemFieldsItem> | undefined
  footer: string | undefined
  httpConfig: MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItemHttpConfig | undefined
  iconEmoji: string | undefined
  iconURL: string | undefined
  imageURL: string | undefined
  linkNames: boolean | undefined
  mrkdwnIn: Array<string> | undefined
  pretext: string | undefined
  sendResolved: boolean | undefined
  shortFields: boolean | undefined
  text: string | undefined
  thumbURL: string | undefined
  title: string | undefined
  titleLink: string | undefined
  username: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemAttributes {
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigAuthorizationCredentials {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigAuthorization {
  credentials: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigAuthorizationCredentials | undefined
  type: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigBasicAuthPassword {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigBasicAuthUsername {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigBasicAuth {
  password: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigBasicAuthPassword | undefined
  username: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigBasicAuthUsername | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigBearerTokenSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigOauth2ClientIdConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigOauth2ClientIdSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigOauth2ClientId {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigOauth2ClientIdConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigOauth2ClientIdSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigOauth2ClientSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigOauth2EndpointParams {
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigOauth2 {
  clientId: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigOauth2ClientId
  clientSecret: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigOauth2ClientSecret
  endpointParams: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigOauth2EndpointParams | undefined
  scopes: Array<string> | undefined
  tokenUrl: string
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfigCa {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfigCaConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfigCaSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfigCert {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfigCertConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfigCertSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfig {
  ca: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfigCa | undefined
  cert: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfigCert | undefined
  insecureSkipVerify: boolean | undefined
  keySecret: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfig {
  authorization: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigAuthorization | undefined
  basicAuth: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigBasicAuth | undefined
  bearerTokenSecret: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigBearerTokenSecret | undefined
  followRedirects: boolean | undefined
  oauth2: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigOauth2 | undefined
  proxyURL: string | undefined
  tlsConfig: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfigTlsConfig | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemSigv4AccessKey {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemSigv4SecretKey {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemSigv4 {
  accessKey: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemSigv4AccessKey | undefined
  profile: string | undefined
  region: string | undefined
  roleArn: string | undefined
  secretKey: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemSigv4SecretKey | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItem {
  apiURL: string | undefined
  attributes: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemAttributes | undefined
  httpConfig: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemHttpConfig | undefined
  message: string | undefined
  phoneNumber: string | undefined
  sendResolved: boolean | undefined
  sigv4: MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItemSigv4 | undefined
  subject: string | undefined
  targetARN: string | undefined
  topicARN: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemBotToken {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigAuthorizationCredentials {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigAuthorization {
  credentials: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigAuthorizationCredentials | undefined
  type: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigBasicAuthPassword {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigBasicAuthUsername {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigBasicAuth {
  password: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigBasicAuthPassword | undefined
  username: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigBasicAuthUsername | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigBearerTokenSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigOauth2ClientIdConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigOauth2ClientIdSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigOauth2ClientId {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigOauth2ClientIdConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigOauth2ClientIdSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigOauth2ClientSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigOauth2EndpointParams {
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigOauth2 {
  clientId: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigOauth2ClientId
  clientSecret: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigOauth2ClientSecret
  endpointParams: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigOauth2EndpointParams | undefined
  scopes: Array<string> | undefined
  tokenUrl: string
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfigCa {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfigCaConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfigCaSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfigCert {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfigCertConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfigCertSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfig {
  ca: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfigCa | undefined
  cert: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfigCert | undefined
  insecureSkipVerify: boolean | undefined
  keySecret: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfig {
  authorization: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigAuthorization | undefined
  basicAuth: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigBasicAuth | undefined
  bearerTokenSecret: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigBearerTokenSecret | undefined
  followRedirects: boolean | undefined
  oauth2: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigOauth2 | undefined
  proxyURL: string | undefined
  tlsConfig: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfigTlsConfig | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItem {
  apiURL: string | undefined
  botToken: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemBotToken | undefined
  chatID: number | undefined
  disableNotifications: boolean | undefined
  httpConfig: MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItemHttpConfig | undefined
  message: string | undefined
  parseMode: string | undefined
  sendResolved: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemApiKey {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemCustomFieldsItem {
  key: string
  value: string
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigAuthorizationCredentials {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigAuthorization {
  credentials: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigAuthorizationCredentials | undefined
  type: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigBasicAuthPassword {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigBasicAuthUsername {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigBasicAuth {
  password: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigBasicAuthPassword | undefined
  username: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigBasicAuthUsername | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigBearerTokenSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigOauth2ClientIdConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigOauth2ClientIdSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigOauth2ClientId {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigOauth2ClientIdConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigOauth2ClientIdSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigOauth2ClientSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigOauth2EndpointParams {
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigOauth2 {
  clientId: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigOauth2ClientId
  clientSecret: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigOauth2ClientSecret
  endpointParams: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigOauth2EndpointParams | undefined
  scopes: Array<string> | undefined
  tokenUrl: string
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfigCa {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfigCaConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfigCaSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfigCert {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfigCertConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfigCertSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfig {
  ca: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfigCa | undefined
  cert: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfigCert | undefined
  insecureSkipVerify: boolean | undefined
  keySecret: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfig {
  authorization: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigAuthorization | undefined
  basicAuth: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigBasicAuth | undefined
  bearerTokenSecret: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigBearerTokenSecret | undefined
  followRedirects: boolean | undefined
  oauth2: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigOauth2 | undefined
  proxyURL: string | undefined
  tlsConfig: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfigTlsConfig | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItem {
  apiKey: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemApiKey | undefined
  apiUrl: string | undefined
  customFields: Array<MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemCustomFieldsItem> | undefined
  entityDisplayName: string | undefined
  httpConfig: MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItemHttpConfig | undefined
  messageType: string | undefined
  monitoringTool: string | undefined
  routingKey: string | undefined
  sendResolved: boolean | undefined
  stateMessage: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigAuthorizationCredentials {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigAuthorization {
  credentials: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigAuthorizationCredentials | undefined
  type: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigBasicAuthPassword {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigBasicAuthUsername {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigBasicAuth {
  password: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigBasicAuthPassword | undefined
  username: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigBasicAuthUsername | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigBearerTokenSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigOauth2ClientIdConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigOauth2ClientIdSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigOauth2ClientId {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigOauth2ClientIdConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigOauth2ClientIdSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigOauth2ClientSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigOauth2EndpointParams {
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigOauth2 {
  clientId: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigOauth2ClientId
  clientSecret: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigOauth2ClientSecret
  endpointParams: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigOauth2EndpointParams | undefined
  scopes: Array<string> | undefined
  tokenUrl: string
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfigCa {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfigCaConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfigCaSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfigCert {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfigCertConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfigCertSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfig {
  ca: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfigCa | undefined
  cert: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfigCert | undefined
  insecureSkipVerify: boolean | undefined
  keySecret: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfig {
  authorization: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigAuthorization | undefined
  basicAuth: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigBasicAuth | undefined
  bearerTokenSecret: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigBearerTokenSecret | undefined
  followRedirects: boolean | undefined
  oauth2: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigOauth2 | undefined
  proxyURL: string | undefined
  tlsConfig: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfigTlsConfig | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemUrlSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItem {
  httpConfig: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemHttpConfig | undefined
  maxAlerts: number | undefined
  sendResolved: boolean | undefined
  url: string | undefined
  urlSecret: MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItemUrlSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemApiSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigAuthorizationCredentials {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigAuthorization {
  credentials: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigAuthorizationCredentials | undefined
  type: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigBasicAuthPassword {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigBasicAuthUsername {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigBasicAuth {
  password: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigBasicAuthPassword | undefined
  username: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigBasicAuthUsername | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigBearerTokenSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigOauth2ClientIdConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigOauth2ClientIdSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigOauth2ClientId {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigOauth2ClientIdConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigOauth2ClientIdSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigOauth2ClientSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigOauth2EndpointParams {
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigOauth2 {
  clientId: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigOauth2ClientId
  clientSecret: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigOauth2ClientSecret
  endpointParams: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigOauth2EndpointParams | undefined
  scopes: Array<string> | undefined
  tokenUrl: string
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfigCaConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfigCaSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfigCa {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfigCaConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfigCaSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfigCertConfigMap {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfigCertSecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfigCert {
  configMap: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfigCertConfigMap | undefined
  secret: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfigCertSecret | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfigKeySecret {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfig {
  ca: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfigCa | undefined
  cert: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfigCert | undefined
  insecureSkipVerify: boolean | undefined
  keySecret: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfigKeySecret | undefined
  serverName: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfig {
  authorization: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigAuthorization | undefined
  basicAuth: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigBasicAuth | undefined
  bearerTokenSecret: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigBearerTokenSecret | undefined
  followRedirects: boolean | undefined
  oauth2: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigOauth2 | undefined
  proxyURL: string | undefined
  tlsConfig: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfigTlsConfig | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItem {
  agentID: string | undefined
  apiSecret: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemApiSecret | undefined
  apiURL: string | undefined
  corpID: string | undefined
  httpConfig: MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItemHttpConfig | undefined
  message: string | undefined
  messageType: string | undefined
  sendResolved: boolean | undefined
  toParty: string | undefined
  toTag: string | undefined
  toUser: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecReceiversItem {
  emailConfigs: Array<MonitoringAlertmanagerConfigSpecReceiversItemEmailConfigsItem> | undefined
  name: string
  opsgenieConfigs: Array<MonitoringAlertmanagerConfigSpecReceiversItemOpsgenieConfigsItem> | undefined
  pagerdutyConfigs: Array<MonitoringAlertmanagerConfigSpecReceiversItemPagerdutyConfigsItem> | undefined
  pushoverConfigs: Array<MonitoringAlertmanagerConfigSpecReceiversItemPushoverConfigsItem> | undefined
  slackConfigs: Array<MonitoringAlertmanagerConfigSpecReceiversItemSlackConfigsItem> | undefined
  snsConfigs: Array<MonitoringAlertmanagerConfigSpecReceiversItemSnsConfigsItem> | undefined
  telegramConfigs: Array<MonitoringAlertmanagerConfigSpecReceiversItemTelegramConfigsItem> | undefined
  victoropsConfigs: Array<MonitoringAlertmanagerConfigSpecReceiversItemVictoropsConfigsItem> | undefined
  webhookConfigs: Array<MonitoringAlertmanagerConfigSpecReceiversItemWebhookConfigsItem> | undefined
  wechatConfigs: Array<MonitoringAlertmanagerConfigSpecReceiversItemWechatConfigsItem> | undefined
}
export interface MonitoringAlertmanagerConfigSpecRouteMatchersItem {
  matchType: string | undefined
  name: string
  regex: boolean | undefined
  value: string | undefined
}
export interface MonitoringAlertmanagerConfigSpecRoute {
  activeTimeIntervals: Array<string> | undefined
  continue: boolean | undefined
  groupBy: Array<string> | undefined
  groupInterval: string | undefined
  groupWait: string | undefined
  matchers: Array<MonitoringAlertmanagerConfigSpecRouteMatchersItem> | undefined
  muteTimeIntervals: Array<string> | undefined
  receiver: string | undefined
  repeatInterval: string | undefined
  routes: Array<object> | undefined
}
export interface MonitoringAlertmanagerConfigSpec {
  inhibitRules: Array<MonitoringAlertmanagerConfigSpecInhibitRulesItem> | undefined
  muteTimeIntervals: Array<MonitoringAlertmanagerConfigSpecMuteTimeIntervalsItem> | undefined
  receivers: Array<MonitoringAlertmanagerConfigSpecReceiversItem> | undefined
  route: MonitoringAlertmanagerConfigSpecRoute | undefined
}
export interface MonitoringAlertmanagerConfig extends KubernetesObject {
  spec: MonitoringAlertmanagerConfigSpec
}
export type MonitoringAlertmanagerConfigList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MonitoringAlertmanagerConfig>
