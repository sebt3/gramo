type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface K8upBackupStatusConditionsItem {
  "lastTransitionTime": string
  "message": string
  "observedGeneration": number | undefined
  "reason": string
  "status": string
  "type": string
}
export interface K8upBackupStatus {
  "conditions": Array<K8upBackupStatusConditionsItem> | undefined
  "exclusive": boolean | undefined
  "finished": boolean | undefined
  "started": boolean | undefined
}
export interface K8upBackupSpecBackendAzureAccountKeySecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upBackupSpecBackendAzureAccountNameSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upBackupSpecBackendAzure {
  "accountKeySecretRef": K8upBackupSpecBackendAzureAccountKeySecretRef | undefined
  "accountNameSecretRef": K8upBackupSpecBackendAzureAccountNameSecretRef | undefined
  "container": string | undefined
}
export interface K8upBackupSpecBackendB2AccountIDSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upBackupSpecBackendB2AccountKeySecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upBackupSpecBackendB2 {
  "accountIDSecretRef": K8upBackupSpecBackendB2AccountIDSecretRef | undefined
  "accountKeySecretRef": K8upBackupSpecBackendB2AccountKeySecretRef | undefined
  "bucket": string | undefined
  "path": string | undefined
}
export interface K8upBackupSpecBackendEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upBackupSpecBackendEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upBackupSpecBackendEnvFromItem {
  "configMapRef": K8upBackupSpecBackendEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": K8upBackupSpecBackendEnvFromItemSecretRef | undefined
}
export interface K8upBackupSpecBackendGcsAccessTokenSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upBackupSpecBackendGcsProjectIDSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upBackupSpecBackendGcs {
  "accessTokenSecretRef": K8upBackupSpecBackendGcsAccessTokenSecretRef | undefined
  "bucket": string | undefined
  "projectIDSecretRef": K8upBackupSpecBackendGcsProjectIDSecretRef | undefined
}
export interface K8upBackupSpecBackendLocal {
  "mountPath": string | undefined
}
export interface K8upBackupSpecBackendRepoPasswordSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upBackupSpecBackendRestPasswordSecretReg {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upBackupSpecBackendRestUserSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upBackupSpecBackendRest {
  "passwordSecretReg": K8upBackupSpecBackendRestPasswordSecretReg | undefined
  "url": string | undefined
  "userSecretRef": K8upBackupSpecBackendRestUserSecretRef | undefined
}
export interface K8upBackupSpecBackendS3AccessKeyIDSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upBackupSpecBackendS3SecretAccessKeySecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upBackupSpecBackendS3 {
  "accessKeyIDSecretRef": K8upBackupSpecBackendS3AccessKeyIDSecretRef | undefined
  "bucket": string | undefined
  "endpoint": string | undefined
  "secretAccessKeySecretRef": K8upBackupSpecBackendS3SecretAccessKeySecretRef | undefined
}
export interface K8upBackupSpecBackendSwift {
  "container": string | undefined
  "path": string | undefined
}
export interface K8upBackupSpecBackend {
  "azure": K8upBackupSpecBackendAzure | undefined
  "b2": K8upBackupSpecBackendB2 | undefined
  "envFrom": Array<K8upBackupSpecBackendEnvFromItem> | undefined
  "gcs": K8upBackupSpecBackendGcs | undefined
  "local": K8upBackupSpecBackendLocal | undefined
  "repoPasswordSecretRef": K8upBackupSpecBackendRepoPasswordSecretRef | undefined
  "rest": K8upBackupSpecBackendRest | undefined
  "s3": K8upBackupSpecBackendS3 | undefined
  "swift": K8upBackupSpecBackendSwift | undefined
}
export interface K8upBackupSpecPodSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface K8upBackupSpecPodSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface K8upBackupSpecPodSecurityContextSysctlsItem {
  "name": string
  "value": string
}
export interface K8upBackupSpecPodSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface K8upBackupSpecPodSecurityContext {
  "fsGroup": number | undefined
  "fsGroupChangePolicy": string | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": K8upBackupSpecPodSecurityContextSeLinuxOptions | undefined
  "seccompProfile": K8upBackupSpecPodSecurityContextSeccompProfile | undefined
  "supplementalGroups": Array<number> | undefined
  "sysctls": Array<K8upBackupSpecPodSecurityContextSysctlsItem> | undefined
  "windowsOptions": K8upBackupSpecPodSecurityContextWindowsOptions | undefined
}
export interface K8upBackupSpecResourcesLimits {
}
export interface K8upBackupSpecResourcesRequests {
}
export interface K8upBackupSpecResources {
  "limits": K8upBackupSpecResourcesLimits | undefined
  "requests": K8upBackupSpecResourcesRequests | undefined
}
export interface K8upBackupSpec {
  "activeDeadlineSeconds": number | undefined
  "backend": K8upBackupSpecBackend | undefined
  "failedJobsHistoryLimit": number | undefined
  "keepJobs": number | undefined
  "podSecurityContext": K8upBackupSpecPodSecurityContext | undefined
  "promURL": string | undefined
  "resources": K8upBackupSpecResources | undefined
  "statsURL": string | undefined
  "successfulJobsHistoryLimit": number | undefined
  "tags": Array<string> | undefined
}
export interface K8upBackup extends KubernetesObject {
  spec: K8upBackupSpec
  status: K8upBackupStatus | undefined
}
export type K8upBackupList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<K8upBackup>
