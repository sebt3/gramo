type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface K8upArchiveStatusConditionsItem {
  "lastTransitionTime": string
  "message": string
  "observedGeneration": number | undefined
  "reason": string
  "status": string
  "type": string
}
export interface K8upArchiveStatus {
  "conditions": Array<K8upArchiveStatusConditionsItem> | undefined
  "exclusive": boolean | undefined
  "finished": boolean | undefined
  "started": boolean | undefined
}
export interface K8upArchiveSpecBackendAzureAccountKeySecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecBackendAzureAccountNameSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecBackendAzure {
  "accountKeySecretRef": K8upArchiveSpecBackendAzureAccountKeySecretRef | undefined
  "accountNameSecretRef": K8upArchiveSpecBackendAzureAccountNameSecretRef | undefined
  "container": string | undefined
}
export interface K8upArchiveSpecBackendB2AccountIDSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecBackendB2AccountKeySecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecBackendB2 {
  "accountIDSecretRef": K8upArchiveSpecBackendB2AccountIDSecretRef | undefined
  "accountKeySecretRef": K8upArchiveSpecBackendB2AccountKeySecretRef | undefined
  "bucket": string | undefined
  "path": string | undefined
}
export interface K8upArchiveSpecBackendEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecBackendEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecBackendEnvFromItem {
  "configMapRef": K8upArchiveSpecBackendEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": K8upArchiveSpecBackendEnvFromItemSecretRef | undefined
}
export interface K8upArchiveSpecBackendGcsAccessTokenSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecBackendGcsProjectIDSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecBackendGcs {
  "accessTokenSecretRef": K8upArchiveSpecBackendGcsAccessTokenSecretRef | undefined
  "bucket": string | undefined
  "projectIDSecretRef": K8upArchiveSpecBackendGcsProjectIDSecretRef | undefined
}
export interface K8upArchiveSpecBackendLocal {
  "mountPath": string | undefined
}
export interface K8upArchiveSpecBackendRepoPasswordSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecBackendRestPasswordSecretReg {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecBackendRestUserSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecBackendRest {
  "passwordSecretReg": K8upArchiveSpecBackendRestPasswordSecretReg | undefined
  "url": string | undefined
  "userSecretRef": K8upArchiveSpecBackendRestUserSecretRef | undefined
}
export interface K8upArchiveSpecBackendS3AccessKeyIDSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecBackendS3SecretAccessKeySecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecBackendS3 {
  "accessKeyIDSecretRef": K8upArchiveSpecBackendS3AccessKeyIDSecretRef | undefined
  "bucket": string | undefined
  "endpoint": string | undefined
  "secretAccessKeySecretRef": K8upArchiveSpecBackendS3SecretAccessKeySecretRef | undefined
}
export interface K8upArchiveSpecBackendSwift {
  "container": string | undefined
  "path": string | undefined
}
export interface K8upArchiveSpecBackend {
  "azure": K8upArchiveSpecBackendAzure | undefined
  "b2": K8upArchiveSpecBackendB2 | undefined
  "envFrom": Array<K8upArchiveSpecBackendEnvFromItem> | undefined
  "gcs": K8upArchiveSpecBackendGcs | undefined
  "local": K8upArchiveSpecBackendLocal | undefined
  "repoPasswordSecretRef": K8upArchiveSpecBackendRepoPasswordSecretRef | undefined
  "rest": K8upArchiveSpecBackendRest | undefined
  "s3": K8upArchiveSpecBackendS3 | undefined
  "swift": K8upArchiveSpecBackendSwift | undefined
}
export interface K8upArchiveSpecPodSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface K8upArchiveSpecPodSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface K8upArchiveSpecPodSecurityContextSysctlsItem {
  "name": string
  "value": string
}
export interface K8upArchiveSpecPodSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface K8upArchiveSpecPodSecurityContext {
  "fsGroup": number | undefined
  "fsGroupChangePolicy": string | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": K8upArchiveSpecPodSecurityContextSeLinuxOptions | undefined
  "seccompProfile": K8upArchiveSpecPodSecurityContextSeccompProfile | undefined
  "supplementalGroups": Array<number> | undefined
  "sysctls": Array<K8upArchiveSpecPodSecurityContextSysctlsItem> | undefined
  "windowsOptions": K8upArchiveSpecPodSecurityContextWindowsOptions | undefined
}
export interface K8upArchiveSpecResourcesLimits {
}
export interface K8upArchiveSpecResourcesRequests {
}
export interface K8upArchiveSpecResources {
  "limits": K8upArchiveSpecResourcesLimits | undefined
  "requests": K8upArchiveSpecResourcesRequests | undefined
}
export interface K8upArchiveSpecRestoreMethodFolder {
  "claimName": string
  "readOnly": boolean | undefined
}
export interface K8upArchiveSpecRestoreMethodS3AccessKeyIDSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecRestoreMethodS3SecretAccessKeySecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upArchiveSpecRestoreMethodS3 {
  "accessKeyIDSecretRef": K8upArchiveSpecRestoreMethodS3AccessKeyIDSecretRef | undefined
  "bucket": string | undefined
  "endpoint": string | undefined
  "secretAccessKeySecretRef": K8upArchiveSpecRestoreMethodS3SecretAccessKeySecretRef | undefined
}
export interface K8upArchiveSpecRestoreMethod {
  "folder": K8upArchiveSpecRestoreMethodFolder | undefined
  "s3": K8upArchiveSpecRestoreMethodS3 | undefined
}
export interface K8upArchiveSpec {
  "activeDeadlineSeconds": number | undefined
  "backend": K8upArchiveSpecBackend | undefined
  "failedJobsHistoryLimit": number | undefined
  "keepJobs": number | undefined
  "podSecurityContext": K8upArchiveSpecPodSecurityContext | undefined
  "resources": K8upArchiveSpecResources | undefined
  "restoreFilter": string | undefined
  "restoreMethod": K8upArchiveSpecRestoreMethod | undefined
  "snapshot": string | undefined
  "successfulJobsHistoryLimit": number | undefined
  "tags": Array<string> | undefined
}
export interface K8upArchive extends KubernetesObject {
  spec: K8upArchiveSpec
  status: K8upArchiveStatus | undefined
}
export type K8upArchiveList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<K8upArchive>
