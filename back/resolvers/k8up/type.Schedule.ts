type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface K8upScheduleStatusConditionsItem {
  lastTransitionTime: string
  message: string
  observedGeneration: number | undefined
  reason: string
  status: string
  type: string
}
export interface K8upScheduleStatusEffectiveSchedulesItem {
  generatedSchedule: string | undefined
  jobType: string | undefined
}
export interface K8upScheduleStatus {
  conditions: Array<K8upScheduleStatusConditionsItem> | undefined
  effectiveSchedules: Array<K8upScheduleStatusEffectiveSchedulesItem> | undefined
}
export interface K8upScheduleSpecArchiveBackendAzureAccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveBackendAzureAccountNameSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveBackendAzure {
  accountKeySecretRef: K8upScheduleSpecArchiveBackendAzureAccountKeySecretRef | undefined
  accountNameSecretRef: K8upScheduleSpecArchiveBackendAzureAccountNameSecretRef | undefined
  container: string | undefined
}
export interface K8upScheduleSpecArchiveBackendB2AccountIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveBackendB2AccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveBackendB2 {
  accountIDSecretRef: K8upScheduleSpecArchiveBackendB2AccountIDSecretRef | undefined
  accountKeySecretRef: K8upScheduleSpecArchiveBackendB2AccountKeySecretRef | undefined
  bucket: string | undefined
  path: string | undefined
}
export interface K8upScheduleSpecArchiveBackendEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveBackendEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveBackendEnvFromItem {
  configMapRef: K8upScheduleSpecArchiveBackendEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: K8upScheduleSpecArchiveBackendEnvFromItemSecretRef | undefined
}
export interface K8upScheduleSpecArchiveBackendGcsAccessTokenSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveBackendGcsProjectIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveBackendGcs {
  accessTokenSecretRef: K8upScheduleSpecArchiveBackendGcsAccessTokenSecretRef | undefined
  bucket: string | undefined
  projectIDSecretRef: K8upScheduleSpecArchiveBackendGcsProjectIDSecretRef | undefined
}
export interface K8upScheduleSpecArchiveBackendLocal {
  mountPath: string | undefined
}
export interface K8upScheduleSpecArchiveBackendRepoPasswordSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveBackendRestPasswordSecretReg {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveBackendRestUserSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveBackendRest {
  passwordSecretReg: K8upScheduleSpecArchiveBackendRestPasswordSecretReg | undefined
  url: string | undefined
  userSecretRef: K8upScheduleSpecArchiveBackendRestUserSecretRef | undefined
}
export interface K8upScheduleSpecArchiveBackendS3AccessKeyIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveBackendS3SecretAccessKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveBackendS3 {
  accessKeyIDSecretRef: K8upScheduleSpecArchiveBackendS3AccessKeyIDSecretRef | undefined
  bucket: string | undefined
  endpoint: string | undefined
  secretAccessKeySecretRef: K8upScheduleSpecArchiveBackendS3SecretAccessKeySecretRef | undefined
}
export interface K8upScheduleSpecArchiveBackendSwift {
  container: string | undefined
  path: string | undefined
}
export interface K8upScheduleSpecArchiveBackend {
  azure: K8upScheduleSpecArchiveBackendAzure | undefined
  b2: K8upScheduleSpecArchiveBackendB2 | undefined
  envFrom: Array<K8upScheduleSpecArchiveBackendEnvFromItem> | undefined
  gcs: K8upScheduleSpecArchiveBackendGcs | undefined
  local: K8upScheduleSpecArchiveBackendLocal | undefined
  repoPasswordSecretRef: K8upScheduleSpecArchiveBackendRepoPasswordSecretRef | undefined
  rest: K8upScheduleSpecArchiveBackendRest | undefined
  s3: K8upScheduleSpecArchiveBackendS3 | undefined
  swift: K8upScheduleSpecArchiveBackendSwift | undefined
}
export interface K8upScheduleSpecArchivePodSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface K8upScheduleSpecArchivePodSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface K8upScheduleSpecArchivePodSecurityContextSysctlsItem {
  name: string
  value: string
}
export interface K8upScheduleSpecArchivePodSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface K8upScheduleSpecArchivePodSecurityContext {
  fsGroup: number | undefined
  fsGroupChangePolicy: string | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: K8upScheduleSpecArchivePodSecurityContextSeLinuxOptions | undefined
  seccompProfile: K8upScheduleSpecArchivePodSecurityContextSeccompProfile | undefined
  supplementalGroups: Array<number> | undefined
  sysctls: Array<K8upScheduleSpecArchivePodSecurityContextSysctlsItem> | undefined
  windowsOptions: K8upScheduleSpecArchivePodSecurityContextWindowsOptions | undefined
}
export interface K8upScheduleSpecArchiveResourcesLimits {
}
export interface K8upScheduleSpecArchiveResourcesRequests {
}
export interface K8upScheduleSpecArchiveResources {
  limits: K8upScheduleSpecArchiveResourcesLimits | undefined
  requests: K8upScheduleSpecArchiveResourcesRequests | undefined
}
export interface K8upScheduleSpecArchiveRestoreMethodFolder {
  claimName: string
  readOnly: boolean | undefined
}
export interface K8upScheduleSpecArchiveRestoreMethodS3AccessKeyIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveRestoreMethodS3SecretAccessKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecArchiveRestoreMethodS3 {
  accessKeyIDSecretRef: K8upScheduleSpecArchiveRestoreMethodS3AccessKeyIDSecretRef | undefined
  bucket: string | undefined
  endpoint: string | undefined
  secretAccessKeySecretRef: K8upScheduleSpecArchiveRestoreMethodS3SecretAccessKeySecretRef | undefined
}
export interface K8upScheduleSpecArchiveRestoreMethod {
  folder: K8upScheduleSpecArchiveRestoreMethodFolder | undefined
  s3: K8upScheduleSpecArchiveRestoreMethodS3 | undefined
}
export interface K8upScheduleSpecArchive {
  activeDeadlineSeconds: number | undefined
  backend: K8upScheduleSpecArchiveBackend | undefined
  concurrentRunsAllowed: boolean | undefined
  failedJobsHistoryLimit: number | undefined
  keepJobs: number | undefined
  podSecurityContext: K8upScheduleSpecArchivePodSecurityContext | undefined
  resources: K8upScheduleSpecArchiveResources | undefined
  restoreFilter: string | undefined
  restoreMethod: K8upScheduleSpecArchiveRestoreMethod | undefined
  schedule: string | undefined
  snapshot: string | undefined
  successfulJobsHistoryLimit: number | undefined
  tags: Array<string> | undefined
}
export interface K8upScheduleSpecBackendAzureAccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackendAzureAccountNameSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackendAzure {
  accountKeySecretRef: K8upScheduleSpecBackendAzureAccountKeySecretRef | undefined
  accountNameSecretRef: K8upScheduleSpecBackendAzureAccountNameSecretRef | undefined
  container: string | undefined
}
export interface K8upScheduleSpecBackendB2AccountIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackendB2AccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackendB2 {
  accountIDSecretRef: K8upScheduleSpecBackendB2AccountIDSecretRef | undefined
  accountKeySecretRef: K8upScheduleSpecBackendB2AccountKeySecretRef | undefined
  bucket: string | undefined
  path: string | undefined
}
export interface K8upScheduleSpecBackendEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackendEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackendEnvFromItem {
  configMapRef: K8upScheduleSpecBackendEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: K8upScheduleSpecBackendEnvFromItemSecretRef | undefined
}
export interface K8upScheduleSpecBackendGcsAccessTokenSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackendGcsProjectIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackendGcs {
  accessTokenSecretRef: K8upScheduleSpecBackendGcsAccessTokenSecretRef | undefined
  bucket: string | undefined
  projectIDSecretRef: K8upScheduleSpecBackendGcsProjectIDSecretRef | undefined
}
export interface K8upScheduleSpecBackendLocal {
  mountPath: string | undefined
}
export interface K8upScheduleSpecBackendRepoPasswordSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackendRestPasswordSecretReg {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackendRestUserSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackendRest {
  passwordSecretReg: K8upScheduleSpecBackendRestPasswordSecretReg | undefined
  url: string | undefined
  userSecretRef: K8upScheduleSpecBackendRestUserSecretRef | undefined
}
export interface K8upScheduleSpecBackendS3AccessKeyIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackendS3SecretAccessKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackendS3 {
  accessKeyIDSecretRef: K8upScheduleSpecBackendS3AccessKeyIDSecretRef | undefined
  bucket: string | undefined
  endpoint: string | undefined
  secretAccessKeySecretRef: K8upScheduleSpecBackendS3SecretAccessKeySecretRef | undefined
}
export interface K8upScheduleSpecBackendSwift {
  container: string | undefined
  path: string | undefined
}
export interface K8upScheduleSpecBackend {
  azure: K8upScheduleSpecBackendAzure | undefined
  b2: K8upScheduleSpecBackendB2 | undefined
  envFrom: Array<K8upScheduleSpecBackendEnvFromItem> | undefined
  gcs: K8upScheduleSpecBackendGcs | undefined
  local: K8upScheduleSpecBackendLocal | undefined
  repoPasswordSecretRef: K8upScheduleSpecBackendRepoPasswordSecretRef | undefined
  rest: K8upScheduleSpecBackendRest | undefined
  s3: K8upScheduleSpecBackendS3 | undefined
  swift: K8upScheduleSpecBackendSwift | undefined
}
export interface K8upScheduleSpecBackupBackendAzureAccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackupBackendAzureAccountNameSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackupBackendAzure {
  accountKeySecretRef: K8upScheduleSpecBackupBackendAzureAccountKeySecretRef | undefined
  accountNameSecretRef: K8upScheduleSpecBackupBackendAzureAccountNameSecretRef | undefined
  container: string | undefined
}
export interface K8upScheduleSpecBackupBackendB2AccountIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackupBackendB2AccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackupBackendB2 {
  accountIDSecretRef: K8upScheduleSpecBackupBackendB2AccountIDSecretRef | undefined
  accountKeySecretRef: K8upScheduleSpecBackupBackendB2AccountKeySecretRef | undefined
  bucket: string | undefined
  path: string | undefined
}
export interface K8upScheduleSpecBackupBackendEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackupBackendEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackupBackendEnvFromItem {
  configMapRef: K8upScheduleSpecBackupBackendEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: K8upScheduleSpecBackupBackendEnvFromItemSecretRef | undefined
}
export interface K8upScheduleSpecBackupBackendGcsAccessTokenSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackupBackendGcsProjectIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackupBackendGcs {
  accessTokenSecretRef: K8upScheduleSpecBackupBackendGcsAccessTokenSecretRef | undefined
  bucket: string | undefined
  projectIDSecretRef: K8upScheduleSpecBackupBackendGcsProjectIDSecretRef | undefined
}
export interface K8upScheduleSpecBackupBackendLocal {
  mountPath: string | undefined
}
export interface K8upScheduleSpecBackupBackendRepoPasswordSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackupBackendRestPasswordSecretReg {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackupBackendRestUserSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackupBackendRest {
  passwordSecretReg: K8upScheduleSpecBackupBackendRestPasswordSecretReg | undefined
  url: string | undefined
  userSecretRef: K8upScheduleSpecBackupBackendRestUserSecretRef | undefined
}
export interface K8upScheduleSpecBackupBackendS3AccessKeyIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackupBackendS3SecretAccessKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecBackupBackendS3 {
  accessKeyIDSecretRef: K8upScheduleSpecBackupBackendS3AccessKeyIDSecretRef | undefined
  bucket: string | undefined
  endpoint: string | undefined
  secretAccessKeySecretRef: K8upScheduleSpecBackupBackendS3SecretAccessKeySecretRef | undefined
}
export interface K8upScheduleSpecBackupBackendSwift {
  container: string | undefined
  path: string | undefined
}
export interface K8upScheduleSpecBackupBackend {
  azure: K8upScheduleSpecBackupBackendAzure | undefined
  b2: K8upScheduleSpecBackupBackendB2 | undefined
  envFrom: Array<K8upScheduleSpecBackupBackendEnvFromItem> | undefined
  gcs: K8upScheduleSpecBackupBackendGcs | undefined
  local: K8upScheduleSpecBackupBackendLocal | undefined
  repoPasswordSecretRef: K8upScheduleSpecBackupBackendRepoPasswordSecretRef | undefined
  rest: K8upScheduleSpecBackupBackendRest | undefined
  s3: K8upScheduleSpecBackupBackendS3 | undefined
  swift: K8upScheduleSpecBackupBackendSwift | undefined
}
export interface K8upScheduleSpecBackupPodSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface K8upScheduleSpecBackupPodSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface K8upScheduleSpecBackupPodSecurityContextSysctlsItem {
  name: string
  value: string
}
export interface K8upScheduleSpecBackupPodSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface K8upScheduleSpecBackupPodSecurityContext {
  fsGroup: number | undefined
  fsGroupChangePolicy: string | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: K8upScheduleSpecBackupPodSecurityContextSeLinuxOptions | undefined
  seccompProfile: K8upScheduleSpecBackupPodSecurityContextSeccompProfile | undefined
  supplementalGroups: Array<number> | undefined
  sysctls: Array<K8upScheduleSpecBackupPodSecurityContextSysctlsItem> | undefined
  windowsOptions: K8upScheduleSpecBackupPodSecurityContextWindowsOptions | undefined
}
export interface K8upScheduleSpecBackupResourcesLimits {
}
export interface K8upScheduleSpecBackupResourcesRequests {
}
export interface K8upScheduleSpecBackupResources {
  limits: K8upScheduleSpecBackupResourcesLimits | undefined
  requests: K8upScheduleSpecBackupResourcesRequests | undefined
}
export interface K8upScheduleSpecBackup {
  activeDeadlineSeconds: number | undefined
  backend: K8upScheduleSpecBackupBackend | undefined
  concurrentRunsAllowed: boolean | undefined
  failedJobsHistoryLimit: number | undefined
  keepJobs: number | undefined
  podSecurityContext: K8upScheduleSpecBackupPodSecurityContext | undefined
  promURL: string | undefined
  resources: K8upScheduleSpecBackupResources | undefined
  schedule: string | undefined
  statsURL: string | undefined
  successfulJobsHistoryLimit: number | undefined
  tags: Array<string> | undefined
}
export interface K8upScheduleSpecCheckBackendAzureAccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecCheckBackendAzureAccountNameSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecCheckBackendAzure {
  accountKeySecretRef: K8upScheduleSpecCheckBackendAzureAccountKeySecretRef | undefined
  accountNameSecretRef: K8upScheduleSpecCheckBackendAzureAccountNameSecretRef | undefined
  container: string | undefined
}
export interface K8upScheduleSpecCheckBackendB2AccountIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecCheckBackendB2AccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecCheckBackendB2 {
  accountIDSecretRef: K8upScheduleSpecCheckBackendB2AccountIDSecretRef | undefined
  accountKeySecretRef: K8upScheduleSpecCheckBackendB2AccountKeySecretRef | undefined
  bucket: string | undefined
  path: string | undefined
}
export interface K8upScheduleSpecCheckBackendEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecCheckBackendEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecCheckBackendEnvFromItem {
  configMapRef: K8upScheduleSpecCheckBackendEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: K8upScheduleSpecCheckBackendEnvFromItemSecretRef | undefined
}
export interface K8upScheduleSpecCheckBackendGcsAccessTokenSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecCheckBackendGcsProjectIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecCheckBackendGcs {
  accessTokenSecretRef: K8upScheduleSpecCheckBackendGcsAccessTokenSecretRef | undefined
  bucket: string | undefined
  projectIDSecretRef: K8upScheduleSpecCheckBackendGcsProjectIDSecretRef | undefined
}
export interface K8upScheduleSpecCheckBackendLocal {
  mountPath: string | undefined
}
export interface K8upScheduleSpecCheckBackendRepoPasswordSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecCheckBackendRestPasswordSecretReg {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecCheckBackendRestUserSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecCheckBackendRest {
  passwordSecretReg: K8upScheduleSpecCheckBackendRestPasswordSecretReg | undefined
  url: string | undefined
  userSecretRef: K8upScheduleSpecCheckBackendRestUserSecretRef | undefined
}
export interface K8upScheduleSpecCheckBackendS3AccessKeyIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecCheckBackendS3SecretAccessKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecCheckBackendS3 {
  accessKeyIDSecretRef: K8upScheduleSpecCheckBackendS3AccessKeyIDSecretRef | undefined
  bucket: string | undefined
  endpoint: string | undefined
  secretAccessKeySecretRef: K8upScheduleSpecCheckBackendS3SecretAccessKeySecretRef | undefined
}
export interface K8upScheduleSpecCheckBackendSwift {
  container: string | undefined
  path: string | undefined
}
export interface K8upScheduleSpecCheckBackend {
  azure: K8upScheduleSpecCheckBackendAzure | undefined
  b2: K8upScheduleSpecCheckBackendB2 | undefined
  envFrom: Array<K8upScheduleSpecCheckBackendEnvFromItem> | undefined
  gcs: K8upScheduleSpecCheckBackendGcs | undefined
  local: K8upScheduleSpecCheckBackendLocal | undefined
  repoPasswordSecretRef: K8upScheduleSpecCheckBackendRepoPasswordSecretRef | undefined
  rest: K8upScheduleSpecCheckBackendRest | undefined
  s3: K8upScheduleSpecCheckBackendS3 | undefined
  swift: K8upScheduleSpecCheckBackendSwift | undefined
}
export interface K8upScheduleSpecCheckPodSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface K8upScheduleSpecCheckPodSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface K8upScheduleSpecCheckPodSecurityContextSysctlsItem {
  name: string
  value: string
}
export interface K8upScheduleSpecCheckPodSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface K8upScheduleSpecCheckPodSecurityContext {
  fsGroup: number | undefined
  fsGroupChangePolicy: string | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: K8upScheduleSpecCheckPodSecurityContextSeLinuxOptions | undefined
  seccompProfile: K8upScheduleSpecCheckPodSecurityContextSeccompProfile | undefined
  supplementalGroups: Array<number> | undefined
  sysctls: Array<K8upScheduleSpecCheckPodSecurityContextSysctlsItem> | undefined
  windowsOptions: K8upScheduleSpecCheckPodSecurityContextWindowsOptions | undefined
}
export interface K8upScheduleSpecCheckResourcesLimits {
}
export interface K8upScheduleSpecCheckResourcesRequests {
}
export interface K8upScheduleSpecCheckResources {
  limits: K8upScheduleSpecCheckResourcesLimits | undefined
  requests: K8upScheduleSpecCheckResourcesRequests | undefined
}
export interface K8upScheduleSpecCheck {
  activeDeadlineSeconds: number | undefined
  backend: K8upScheduleSpecCheckBackend | undefined
  concurrentRunsAllowed: boolean | undefined
  failedJobsHistoryLimit: number | undefined
  keepJobs: number | undefined
  podSecurityContext: K8upScheduleSpecCheckPodSecurityContext | undefined
  promURL: string | undefined
  resources: K8upScheduleSpecCheckResources | undefined
  schedule: string | undefined
  successfulJobsHistoryLimit: number | undefined
}
export interface K8upScheduleSpecPodSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface K8upScheduleSpecPodSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface K8upScheduleSpecPodSecurityContextSysctlsItem {
  name: string
  value: string
}
export interface K8upScheduleSpecPodSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface K8upScheduleSpecPodSecurityContext {
  fsGroup: number | undefined
  fsGroupChangePolicy: string | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: K8upScheduleSpecPodSecurityContextSeLinuxOptions | undefined
  seccompProfile: K8upScheduleSpecPodSecurityContextSeccompProfile | undefined
  supplementalGroups: Array<number> | undefined
  sysctls: Array<K8upScheduleSpecPodSecurityContextSysctlsItem> | undefined
  windowsOptions: K8upScheduleSpecPodSecurityContextWindowsOptions | undefined
}
export interface K8upScheduleSpecPruneBackendAzureAccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecPruneBackendAzureAccountNameSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecPruneBackendAzure {
  accountKeySecretRef: K8upScheduleSpecPruneBackendAzureAccountKeySecretRef | undefined
  accountNameSecretRef: K8upScheduleSpecPruneBackendAzureAccountNameSecretRef | undefined
  container: string | undefined
}
export interface K8upScheduleSpecPruneBackendB2AccountIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecPruneBackendB2AccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecPruneBackendB2 {
  accountIDSecretRef: K8upScheduleSpecPruneBackendB2AccountIDSecretRef | undefined
  accountKeySecretRef: K8upScheduleSpecPruneBackendB2AccountKeySecretRef | undefined
  bucket: string | undefined
  path: string | undefined
}
export interface K8upScheduleSpecPruneBackendEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecPruneBackendEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecPruneBackendEnvFromItem {
  configMapRef: K8upScheduleSpecPruneBackendEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: K8upScheduleSpecPruneBackendEnvFromItemSecretRef | undefined
}
export interface K8upScheduleSpecPruneBackendGcsAccessTokenSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecPruneBackendGcsProjectIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecPruneBackendGcs {
  accessTokenSecretRef: K8upScheduleSpecPruneBackendGcsAccessTokenSecretRef | undefined
  bucket: string | undefined
  projectIDSecretRef: K8upScheduleSpecPruneBackendGcsProjectIDSecretRef | undefined
}
export interface K8upScheduleSpecPruneBackendLocal {
  mountPath: string | undefined
}
export interface K8upScheduleSpecPruneBackendRepoPasswordSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecPruneBackendRestPasswordSecretReg {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecPruneBackendRestUserSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecPruneBackendRest {
  passwordSecretReg: K8upScheduleSpecPruneBackendRestPasswordSecretReg | undefined
  url: string | undefined
  userSecretRef: K8upScheduleSpecPruneBackendRestUserSecretRef | undefined
}
export interface K8upScheduleSpecPruneBackendS3AccessKeyIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecPruneBackendS3SecretAccessKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecPruneBackendS3 {
  accessKeyIDSecretRef: K8upScheduleSpecPruneBackendS3AccessKeyIDSecretRef | undefined
  bucket: string | undefined
  endpoint: string | undefined
  secretAccessKeySecretRef: K8upScheduleSpecPruneBackendS3SecretAccessKeySecretRef | undefined
}
export interface K8upScheduleSpecPruneBackendSwift {
  container: string | undefined
  path: string | undefined
}
export interface K8upScheduleSpecPruneBackend {
  azure: K8upScheduleSpecPruneBackendAzure | undefined
  b2: K8upScheduleSpecPruneBackendB2 | undefined
  envFrom: Array<K8upScheduleSpecPruneBackendEnvFromItem> | undefined
  gcs: K8upScheduleSpecPruneBackendGcs | undefined
  local: K8upScheduleSpecPruneBackendLocal | undefined
  repoPasswordSecretRef: K8upScheduleSpecPruneBackendRepoPasswordSecretRef | undefined
  rest: K8upScheduleSpecPruneBackendRest | undefined
  s3: K8upScheduleSpecPruneBackendS3 | undefined
  swift: K8upScheduleSpecPruneBackendSwift | undefined
}
export interface K8upScheduleSpecPrunePodSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface K8upScheduleSpecPrunePodSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface K8upScheduleSpecPrunePodSecurityContextSysctlsItem {
  name: string
  value: string
}
export interface K8upScheduleSpecPrunePodSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface K8upScheduleSpecPrunePodSecurityContext {
  fsGroup: number | undefined
  fsGroupChangePolicy: string | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: K8upScheduleSpecPrunePodSecurityContextSeLinuxOptions | undefined
  seccompProfile: K8upScheduleSpecPrunePodSecurityContextSeccompProfile | undefined
  supplementalGroups: Array<number> | undefined
  sysctls: Array<K8upScheduleSpecPrunePodSecurityContextSysctlsItem> | undefined
  windowsOptions: K8upScheduleSpecPrunePodSecurityContextWindowsOptions | undefined
}
export interface K8upScheduleSpecPruneResourcesLimits {
}
export interface K8upScheduleSpecPruneResourcesRequests {
}
export interface K8upScheduleSpecPruneResources {
  limits: K8upScheduleSpecPruneResourcesLimits | undefined
  requests: K8upScheduleSpecPruneResourcesRequests | undefined
}
export interface K8upScheduleSpecPruneRetention {
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
export interface K8upScheduleSpecPrune {
  activeDeadlineSeconds: number | undefined
  backend: K8upScheduleSpecPruneBackend | undefined
  concurrentRunsAllowed: boolean | undefined
  failedJobsHistoryLimit: number | undefined
  keepJobs: number | undefined
  podSecurityContext: K8upScheduleSpecPrunePodSecurityContext | undefined
  resources: K8upScheduleSpecPruneResources | undefined
  retention: K8upScheduleSpecPruneRetention | undefined
  schedule: string | undefined
  successfulJobsHistoryLimit: number | undefined
}
export interface K8upScheduleSpecResourceRequirementsTemplateLimits {
}
export interface K8upScheduleSpecResourceRequirementsTemplateRequests {
}
export interface K8upScheduleSpecResourceRequirementsTemplate {
  limits: K8upScheduleSpecResourceRequirementsTemplateLimits | undefined
  requests: K8upScheduleSpecResourceRequirementsTemplateRequests | undefined
}
export interface K8upScheduleSpecRestoreBackendAzureAccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreBackendAzureAccountNameSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreBackendAzure {
  accountKeySecretRef: K8upScheduleSpecRestoreBackendAzureAccountKeySecretRef | undefined
  accountNameSecretRef: K8upScheduleSpecRestoreBackendAzureAccountNameSecretRef | undefined
  container: string | undefined
}
export interface K8upScheduleSpecRestoreBackendB2AccountIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreBackendB2AccountKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreBackendB2 {
  accountIDSecretRef: K8upScheduleSpecRestoreBackendB2AccountIDSecretRef | undefined
  accountKeySecretRef: K8upScheduleSpecRestoreBackendB2AccountKeySecretRef | undefined
  bucket: string | undefined
  path: string | undefined
}
export interface K8upScheduleSpecRestoreBackendEnvFromItemConfigMapRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreBackendEnvFromItemSecretRef {
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreBackendEnvFromItem {
  configMapRef: K8upScheduleSpecRestoreBackendEnvFromItemConfigMapRef | undefined
  prefix: string | undefined
  secretRef: K8upScheduleSpecRestoreBackendEnvFromItemSecretRef | undefined
}
export interface K8upScheduleSpecRestoreBackendGcsAccessTokenSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreBackendGcsProjectIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreBackendGcs {
  accessTokenSecretRef: K8upScheduleSpecRestoreBackendGcsAccessTokenSecretRef | undefined
  bucket: string | undefined
  projectIDSecretRef: K8upScheduleSpecRestoreBackendGcsProjectIDSecretRef | undefined
}
export interface K8upScheduleSpecRestoreBackendLocal {
  mountPath: string | undefined
}
export interface K8upScheduleSpecRestoreBackendRepoPasswordSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreBackendRestPasswordSecretReg {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreBackendRestUserSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreBackendRest {
  passwordSecretReg: K8upScheduleSpecRestoreBackendRestPasswordSecretReg | undefined
  url: string | undefined
  userSecretRef: K8upScheduleSpecRestoreBackendRestUserSecretRef | undefined
}
export interface K8upScheduleSpecRestoreBackendS3AccessKeyIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreBackendS3SecretAccessKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreBackendS3 {
  accessKeyIDSecretRef: K8upScheduleSpecRestoreBackendS3AccessKeyIDSecretRef | undefined
  bucket: string | undefined
  endpoint: string | undefined
  secretAccessKeySecretRef: K8upScheduleSpecRestoreBackendS3SecretAccessKeySecretRef | undefined
}
export interface K8upScheduleSpecRestoreBackendSwift {
  container: string | undefined
  path: string | undefined
}
export interface K8upScheduleSpecRestoreBackend {
  azure: K8upScheduleSpecRestoreBackendAzure | undefined
  b2: K8upScheduleSpecRestoreBackendB2 | undefined
  envFrom: Array<K8upScheduleSpecRestoreBackendEnvFromItem> | undefined
  gcs: K8upScheduleSpecRestoreBackendGcs | undefined
  local: K8upScheduleSpecRestoreBackendLocal | undefined
  repoPasswordSecretRef: K8upScheduleSpecRestoreBackendRepoPasswordSecretRef | undefined
  rest: K8upScheduleSpecRestoreBackendRest | undefined
  s3: K8upScheduleSpecRestoreBackendS3 | undefined
  swift: K8upScheduleSpecRestoreBackendSwift | undefined
}
export interface K8upScheduleSpecRestorePodSecurityContextSeLinuxOptions {
  level: string | undefined
  role: string | undefined
  type: string | undefined
  user: string | undefined
}
export interface K8upScheduleSpecRestorePodSecurityContextSeccompProfile {
  localhostProfile: string | undefined
  type: string
}
export interface K8upScheduleSpecRestorePodSecurityContextSysctlsItem {
  name: string
  value: string
}
export interface K8upScheduleSpecRestorePodSecurityContextWindowsOptions {
  gmsaCredentialSpec: string | undefined
  gmsaCredentialSpecName: string | undefined
  hostProcess: boolean | undefined
  runAsUserName: string | undefined
}
export interface K8upScheduleSpecRestorePodSecurityContext {
  fsGroup: number | undefined
  fsGroupChangePolicy: string | undefined
  runAsGroup: number | undefined
  runAsNonRoot: boolean | undefined
  runAsUser: number | undefined
  seLinuxOptions: K8upScheduleSpecRestorePodSecurityContextSeLinuxOptions | undefined
  seccompProfile: K8upScheduleSpecRestorePodSecurityContextSeccompProfile | undefined
  supplementalGroups: Array<number> | undefined
  sysctls: Array<K8upScheduleSpecRestorePodSecurityContextSysctlsItem> | undefined
  windowsOptions: K8upScheduleSpecRestorePodSecurityContextWindowsOptions | undefined
}
export interface K8upScheduleSpecRestoreResourcesLimits {
}
export interface K8upScheduleSpecRestoreResourcesRequests {
}
export interface K8upScheduleSpecRestoreResources {
  limits: K8upScheduleSpecRestoreResourcesLimits | undefined
  requests: K8upScheduleSpecRestoreResourcesRequests | undefined
}
export interface K8upScheduleSpecRestoreRestoreMethodFolder {
  claimName: string
  readOnly: boolean | undefined
}
export interface K8upScheduleSpecRestoreRestoreMethodS3AccessKeyIDSecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreRestoreMethodS3SecretAccessKeySecretRef {
  key: string
  name: string | undefined
  optional: boolean | undefined
}
export interface K8upScheduleSpecRestoreRestoreMethodS3 {
  accessKeyIDSecretRef: K8upScheduleSpecRestoreRestoreMethodS3AccessKeyIDSecretRef | undefined
  bucket: string | undefined
  endpoint: string | undefined
  secretAccessKeySecretRef: K8upScheduleSpecRestoreRestoreMethodS3SecretAccessKeySecretRef | undefined
}
export interface K8upScheduleSpecRestoreRestoreMethod {
  folder: K8upScheduleSpecRestoreRestoreMethodFolder | undefined
  s3: K8upScheduleSpecRestoreRestoreMethodS3 | undefined
}
export interface K8upScheduleSpecRestore {
  activeDeadlineSeconds: number | undefined
  backend: K8upScheduleSpecRestoreBackend | undefined
  concurrentRunsAllowed: boolean | undefined
  failedJobsHistoryLimit: number | undefined
  keepJobs: number | undefined
  podSecurityContext: K8upScheduleSpecRestorePodSecurityContext | undefined
  resources: K8upScheduleSpecRestoreResources | undefined
  restoreFilter: string | undefined
  restoreMethod: K8upScheduleSpecRestoreRestoreMethod | undefined
  schedule: string | undefined
  snapshot: string | undefined
  successfulJobsHistoryLimit: number | undefined
  tags: Array<string> | undefined
}
export interface K8upScheduleSpec {
  archive: K8upScheduleSpecArchive | undefined
  backend: K8upScheduleSpecBackend | undefined
  backup: K8upScheduleSpecBackup | undefined
  check: K8upScheduleSpecCheck | undefined
  failedJobsHistoryLimit: number | undefined
  keepJobs: number | undefined
  podSecurityContext: K8upScheduleSpecPodSecurityContext | undefined
  prune: K8upScheduleSpecPrune | undefined
  resourceRequirementsTemplate: K8upScheduleSpecResourceRequirementsTemplate | undefined
  restore: K8upScheduleSpecRestore | undefined
  successfulJobsHistoryLimit: number | undefined
}
export interface K8upSchedule extends KubernetesObject {
  spec: K8upScheduleSpec
  status: K8upScheduleStatus | undefined
}
export type K8upScheduleList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<K8upSchedule>
