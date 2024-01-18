type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface K8upPruneStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface K8upPruneStatus {
  conditions: Array<K8upPruneStatusConditionsItem> | undefined
  exclusive: boolean | undefined
  finished: boolean | undefined
  started: boolean | undefined
}
export interface K8upPruneSpecBackendAzureAccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upPruneSpecBackendAzureAccountNameSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upPruneSpecBackendAzure {
  accountKeySecretRef: K8upPruneSpecBackendAzureAccountKeySecretRef | undefined
  accountNameSecretRef: K8upPruneSpecBackendAzureAccountNameSecretRef | undefined
  container: string | undefined
}
export interface K8upPruneSpecBackendB2AccountIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upPruneSpecBackendB2AccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upPruneSpecBackendB2 {
  accountIDSecretRef: K8upPruneSpecBackendB2AccountIDSecretRef | undefined
  accountKeySecretRef: K8upPruneSpecBackendB2AccountKeySecretRef | undefined
  bucket: string | undefined
  path: string | undefined
}
export interface K8upPruneSpecBackendEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upPruneSpecBackendEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upPruneSpecBackendEnvFromItem {
  configMapRef: K8upPruneSpecBackendEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: K8upPruneSpecBackendEnvFromItemSecretRef | undefined
}
export interface K8upPruneSpecBackendGcsAccessTokenSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upPruneSpecBackendGcsProjectIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upPruneSpecBackendGcs {
  accessTokenSecretRef: K8upPruneSpecBackendGcsAccessTokenSecretRef | undefined
  bucket: string | undefined
  projectIDSecretRef: K8upPruneSpecBackendGcsProjectIDSecretRef | undefined
}
export interface K8upPruneSpecBackendLocal {
  mountPath: string | undefined
}
export interface K8upPruneSpecBackendRepoPasswordSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upPruneSpecBackendRestPasswordSecretReg {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upPruneSpecBackendRestUserSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upPruneSpecBackendRest {
  passwordSecretReg: K8upPruneSpecBackendRestPasswordSecretReg | undefined
  url: string | undefined
  userSecretRef: K8upPruneSpecBackendRestUserSecretRef | undefined
}
export interface K8upPruneSpecBackendS3AccessKeyIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upPruneSpecBackendS3SecretAccessKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upPruneSpecBackendS3 {
  accessKeyIDSecretRef: K8upPruneSpecBackendS3AccessKeyIDSecretRef | undefined
  bucket: string | undefined
  endpoint: string | undefined
  secretAccessKeySecretRef: K8upPruneSpecBackendS3SecretAccessKeySecretRef | undefined
}
export interface K8upPruneSpecBackendSwift {
  container: string | undefined
  path: string | undefined
}
export interface K8upPruneSpecBackend {
  azure: K8upPruneSpecBackendAzure | undefined
  b2: K8upPruneSpecBackendB2 | undefined
  envFrom: Array<K8upPruneSpecBackendEnvFromItem> | undefined
  gcs: K8upPruneSpecBackendGcs | undefined
  local: K8upPruneSpecBackendLocal | undefined
  repoPasswordSecretRef: K8upPruneSpecBackendRepoPasswordSecretRef | undefined
  rest: K8upPruneSpecBackendRest | undefined
  s3: K8upPruneSpecBackendS3 | undefined
  swift: K8upPruneSpecBackendSwift | undefined
}
export interface K8upPruneSpecPodSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface K8upPruneSpecPodSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface K8upPruneSpecPodSecurityContextSysctlsItem {
  name: string
  value: string
}
export interface K8upPruneSpecPodSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface K8upPruneSpecPodSecurityContext {
  fsGroup: number | undefined
  fsGroupChangePolicy: string | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: K8upPruneSpecPodSecurityContextSeLinuxOptions | undefined
  seccompProfile: K8upPruneSpecPodSecurityContextSeccompProfile | undefined
  supplementalGroups: Array<number> | undefined
  sysctls: Array<K8upPruneSpecPodSecurityContextSysctlsItem> | undefined
  windowsOptions: K8upPruneSpecPodSecurityContextWindowsOptions | undefined
}
export interface K8upPruneSpecResourcesLimits {
}
export interface K8upPruneSpecResourcesRequests {
}
export interface K8upPruneSpecResources {
  limits: K8upPruneSpecResourcesLimits | undefined
  requests: K8upPruneSpecResourcesRequests | undefined
}
export interface K8upPruneSpecRetention {
  hostnames: Array<string> | undefined
  keepDaily: number | undefined
  keepHourly: number | undefined
  keepLast: number | undefined
  keepMonthly: number | undefined
  keepTags: Array<string> | undefined
  keepWeekly: number | undefined
  keepYearly: number | undefined
  tags: Array<string> | undefined
}
export interface K8upPruneSpec {
  activeDeadlineSeconds: number | undefined
  backend: K8upPruneSpecBackend | undefined
  failedJobsHistoryLimit: number | undefined
  keepJobs: number | undefined
  podSecurityContext: K8upPruneSpecPodSecurityContext | undefined
  resources: K8upPruneSpecResources | undefined
  retention: K8upPruneSpecRetention | undefined
  successfulJobsHistoryLimit: number | undefined
}
export interface K8upPrune extends KubernetesObject {
  spec: K8upPruneSpec
  status: K8upPruneStatus | undefined
}
export type K8upPruneList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<K8upPrune>
