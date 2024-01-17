type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface MongodbcommunityMongoDBCommunityStatus {
  currentMongoDBArbiters: number | undefined
  currentMongoDBMembers: number
  currentStatefulSetArbitersReplicas: number | undefined
  currentStatefulSetReplicas: number
  message: string | undefined
  mongoUri: string
  phase: string
  version: string | undefined
}
export interface MongodbcommunityMongoDBCommunitySpecAutomationConfigProcessesItem {
  disabled: boolean
  name: string
}
export interface MongodbcommunityMongoDBCommunitySpecAutomationConfig {
  processes: Array<MongodbcommunityMongoDBCommunitySpecAutomationConfigProcessesItem>
}
export interface MongodbcommunityMongoDBCommunitySpecPrometheusPasswordSecretRef {
  key: string | undefined
  name: string
}
export interface MongodbcommunityMongoDBCommunitySpecPrometheusTlsSecretKeyRef {
  key: string | undefined
  name: string
}
export interface MongodbcommunityMongoDBCommunitySpecPrometheus {
  metricsPath: string | undefined
  passwordSecretRef: MongodbcommunityMongoDBCommunitySpecPrometheusPasswordSecretRef
  port: number | undefined
  tlsSecretKeyRef: MongodbcommunityMongoDBCommunitySpecPrometheusTlsSecretKeyRef | undefined
  username: string
}
export interface MongodbcommunityMongoDBCommunitySpecReplicaSetHorizonsItem {
}
export interface MongodbcommunityMongoDBCommunitySpecSecurityAuthentication {
  ignoreUnknownUsers: object | undefined
  modes: Array<string>
}
export interface MongodbcommunityMongoDBCommunitySpecSecurityRolesItemAuthenticationRestrictionsItem {
  clientSource: Array<string>
  serverAddress: Array<string>
}
export interface MongodbcommunityMongoDBCommunitySpecSecurityRolesItemPrivilegesItemResource {
  anyResource: boolean | undefined
  cluster: boolean | undefined
  collection: string | undefined
  db: string | undefined
}
export interface MongodbcommunityMongoDBCommunitySpecSecurityRolesItemPrivilegesItem {
  actions: Array<string>
  resource: MongodbcommunityMongoDBCommunitySpecSecurityRolesItemPrivilegesItemResource
}
export interface MongodbcommunityMongoDBCommunitySpecSecurityRolesItemRolesItem {
  db: string
  name: string
}
export interface MongodbcommunityMongoDBCommunitySpecSecurityRolesItem {
  authenticationRestrictions: Array<MongodbcommunityMongoDBCommunitySpecSecurityRolesItemAuthenticationRestrictionsItem> | undefined
  db: string
  privileges: Array<MongodbcommunityMongoDBCommunitySpecSecurityRolesItemPrivilegesItem>
  role: string
  roles: Array<MongodbcommunityMongoDBCommunitySpecSecurityRolesItemRolesItem> | undefined
}
export interface MongodbcommunityMongoDBCommunitySpecSecurityTlsCaCertificateSecretRef {
  name: string
}
export interface MongodbcommunityMongoDBCommunitySpecSecurityTlsCaConfigMapRef {
  name: string
}
export interface MongodbcommunityMongoDBCommunitySpecSecurityTlsCertificateKeySecretRef {
  name: string
}
export interface MongodbcommunityMongoDBCommunitySpecSecurityTls {
  caCertificateSecretRef: MongodbcommunityMongoDBCommunitySpecSecurityTlsCaCertificateSecretRef | undefined
  caConfigMapRef: MongodbcommunityMongoDBCommunitySpecSecurityTlsCaConfigMapRef | undefined
  certificateKeySecretRef: MongodbcommunityMongoDBCommunitySpecSecurityTlsCertificateKeySecretRef | undefined
  enabled: boolean
  optional: boolean | undefined
}
export interface MongodbcommunityMongoDBCommunitySpecSecurity {
  authentication: MongodbcommunityMongoDBCommunitySpecSecurityAuthentication | undefined
  roles: Array<MongodbcommunityMongoDBCommunitySpecSecurityRolesItem> | undefined
  tls: MongodbcommunityMongoDBCommunitySpecSecurityTls | undefined
}
export interface MongodbcommunityMongoDBCommunitySpecStatefulSet {
  spec: object
}
export interface MongodbcommunityMongoDBCommunitySpecUsersItemPasswordSecretRef {
  key: string | undefined
  name: string
}
export interface MongodbcommunityMongoDBCommunitySpecUsersItemRolesItem {
  db: string
  name: string
}
export interface MongodbcommunityMongoDBCommunitySpecUsersItem {
  connectionStringSecretName: string | undefined
  db: string | undefined
  name: string
  passwordSecretRef: MongodbcommunityMongoDBCommunitySpecUsersItemPasswordSecretRef
  roles: Array<MongodbcommunityMongoDBCommunitySpecUsersItemRolesItem>
  scramCredentialsSecretName: string
}
export interface MongodbcommunityMongoDBCommunitySpec {
  additionalMongodConfig: object | undefined
  arbiters: number | undefined
  automationConfig: MongodbcommunityMongoDBCommunitySpecAutomationConfig | undefined
  featureCompatibilityVersion: string | undefined
  members: number | undefined
  prometheus: MongodbcommunityMongoDBCommunitySpecPrometheus | undefined
  replicaSetHorizons: Array<MongodbcommunityMongoDBCommunitySpecReplicaSetHorizonsItem> | undefined
  security: MongodbcommunityMongoDBCommunitySpecSecurity
  statefulSet: MongodbcommunityMongoDBCommunitySpecStatefulSet | undefined
  type: string
  users: Array<MongodbcommunityMongoDBCommunitySpecUsersItem>
  version: string | undefined
}
export interface MongodbcommunityMongoDBCommunity extends KubernetesObject {
  spec: MongodbcommunityMongoDBCommunitySpec
  status: MongodbcommunityMongoDBCommunityStatus | undefined
}
export type MongodbcommunityMongoDBCommunityList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<MongodbcommunityMongoDBCommunity>
