type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface K8upRestoreStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface K8upRestoreStatus {
  conditions: Array<K8upRestoreStatusConditionsItem> | undefined
  exclusive: boolean | undefined
  finished: boolean | undefined
  started: boolean | undefined
}
export interface K8upRestoreSpecBackendAzureAccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecBackendAzureAccountNameSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecBackendAzure {
  accountKeySecretRef: K8upRestoreSpecBackendAzureAccountKeySecretRef | undefined
  accountNameSecretRef: K8upRestoreSpecBackendAzureAccountNameSecretRef | undefined
  container: string | undefined
}
export interface K8upRestoreSpecBackendB2AccountIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecBackendB2AccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecBackendB2 {
  accountIDSecretRef: K8upRestoreSpecBackendB2AccountIDSecretRef | undefined
  accountKeySecretRef: K8upRestoreSpecBackendB2AccountKeySecretRef | undefined
  bucket: string | undefined
  path: string | undefined
}
export interface K8upRestoreSpecBackendEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecBackendEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecBackendEnvFromItem {
  configMapRef: K8upRestoreSpecBackendEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: K8upRestoreSpecBackendEnvFromItemSecretRef | undefined
}
export interface K8upRestoreSpecBackendGcsAccessTokenSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecBackendGcsProjectIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecBackendGcs {
  accessTokenSecretRef: K8upRestoreSpecBackendGcsAccessTokenSecretRef | undefined
  bucket: string | undefined
  projectIDSecretRef: K8upRestoreSpecBackendGcsProjectIDSecretRef | undefined
}
export interface K8upRestoreSpecBackendLocal {
  mountPath: string | undefined
}
export interface K8upRestoreSpecBackendRepoPasswordSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecBackendRestPasswordSecretReg {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecBackendRestUserSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecBackendRest {
  passwordSecretReg: K8upRestoreSpecBackendRestPasswordSecretReg | undefined
  url: string | undefined
  userSecretRef: K8upRestoreSpecBackendRestUserSecretRef | undefined
}
export interface K8upRestoreSpecBackendS3AccessKeyIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecBackendS3SecretAccessKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecBackendS3 {
  accessKeyIDSecretRef: K8upRestoreSpecBackendS3AccessKeyIDSecretRef | undefined
  bucket: string | undefined
  endpoint: string | undefined
  secretAccessKeySecretRef: K8upRestoreSpecBackendS3SecretAccessKeySecretRef | undefined
}
export interface K8upRestoreSpecBackendSwift {
  container: string | undefined
  path: string | undefined
}
export interface K8upRestoreSpecBackend {
  azure: K8upRestoreSpecBackendAzure | undefined
  b2: K8upRestoreSpecBackendB2 | undefined
  envFrom: Array<K8upRestoreSpecBackendEnvFromItem> | undefined
  gcs: K8upRestoreSpecBackendGcs | undefined
  local: K8upRestoreSpecBackendLocal | undefined
  repoPasswordSecretRef: K8upRestoreSpecBackendRepoPasswordSecretRef | undefined
  rest: K8upRestoreSpecBackendRest | undefined
  s3: K8upRestoreSpecBackendS3 | undefined
  swift: K8upRestoreSpecBackendSwift | undefined
}
export interface K8upRestoreSpecPodSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface K8upRestoreSpecPodSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface K8upRestoreSpecPodSecurityContextSysctlsItem {
  name: string
  value: string
}
export interface K8upRestoreSpecPodSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface K8upRestoreSpecPodSecurityContext {
  fsGroup: number | undefined
  fsGroupChangePolicy: string | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: K8upRestoreSpecPodSecurityContextSeLinuxOptions | undefined
  seccompProfile: K8upRestoreSpecPodSecurityContextSeccompProfile | undefined
  supplementalGroups: Array<number> | undefined
  sysctls: Array<K8upRestoreSpecPodSecurityContextSysctlsItem> | undefined
  windowsOptions: K8upRestoreSpecPodSecurityContextWindowsOptions | undefined
}
export interface K8upRestoreSpecResourcesLimits {
}
export interface K8upRestoreSpecResourcesRequests {
}
export interface K8upRestoreSpecResources {
  limits: K8upRestoreSpecResourcesLimits | undefined
  requests: K8upRestoreSpecResourcesRequests | undefined
}
export interface K8upRestoreSpecRestoreMethodFolder {
  claimName: string
  readOnly: boolean | undefined
}
export interface K8upRestoreSpecRestoreMethodS3AccessKeyIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecRestoreMethodS3SecretAccessKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upRestoreSpecRestoreMethodS3 {
  accessKeyIDSecretRef: K8upRestoreSpecRestoreMethodS3AccessKeyIDSecretRef | undefined
  bucket: string | undefined
  endpoint: string | undefined
  secretAccessKeySecretRef: K8upRestoreSpecRestoreMethodS3SecretAccessKeySecretRef | undefined
}
export interface K8upRestoreSpecRestoreMethod {
  folder: K8upRestoreSpecRestoreMethodFolder | undefined
  s3: K8upRestoreSpecRestoreMethodS3 | undefined
}
export interface K8upRestoreSpec {
  activeDeadlineSeconds: number | undefined
  backend: K8upRestoreSpecBackend | undefined
  failedJobsHistoryLimit: number | undefined
  keepJobs: number | undefined
  podSecurityContext: K8upRestoreSpecPodSecurityContext | undefined
  resources: K8upRestoreSpecResources | undefined
  restoreFilter: string | undefined
  restoreMethod: K8upRestoreSpecRestoreMethod | undefined
  snapshot: string | undefined
  successfulJobsHistoryLimit: number | undefined
  tags: Array<string> | undefined
}
export interface K8upRestore extends KubernetesObject {
  spec: K8upRestoreSpec
  status: K8upRestoreStatus | undefined
}
export type K8upRestoreList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<K8upRestore>
