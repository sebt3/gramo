type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface K8upCheckStatusConditionsItem {
  "lastTransitionTime": string
  "message": string
  "observedGeneration": number | undefined
  "reason": string
  "status": string
  "type": string
}
export interface K8upCheckStatus {
  "conditions": Array<K8upCheckStatusConditionsItem> | undefined
  "exclusive": boolean | undefined
  "finished": boolean | undefined
  "started": boolean | undefined
}
export interface K8upCheckSpecBackendAzureAccountKeySecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upCheckSpecBackendAzureAccountNameSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upCheckSpecBackendAzure {
  "accountKeySecretRef": K8upCheckSpecBackendAzureAccountKeySecretRef | undefined
  "accountNameSecretRef": K8upCheckSpecBackendAzureAccountNameSecretRef | undefined
  "container": string | undefined
}
export interface K8upCheckSpecBackendB2AccountIDSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upCheckSpecBackendB2AccountKeySecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upCheckSpecBackendB2 {
  "accountIDSecretRef": K8upCheckSpecBackendB2AccountIDSecretRef | undefined
  "accountKeySecretRef": K8upCheckSpecBackendB2AccountKeySecretRef | undefined
  "bucket": string | undefined
  "path": string | undefined
}
export interface K8upCheckSpecBackendEnvFromItemConfigMapRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upCheckSpecBackendEnvFromItemSecretRef {
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upCheckSpecBackendEnvFromItem {
  "configMapRef": K8upCheckSpecBackendEnvFromItemConfigMapRef | undefined
  "prefix": string | undefined
  "secretRef": K8upCheckSpecBackendEnvFromItemSecretRef | undefined
}
export interface K8upCheckSpecBackendGcsAccessTokenSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upCheckSpecBackendGcsProjectIDSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upCheckSpecBackendGcs {
  "accessTokenSecretRef": K8upCheckSpecBackendGcsAccessTokenSecretRef | undefined
  "bucket": string | undefined
  "projectIDSecretRef": K8upCheckSpecBackendGcsProjectIDSecretRef | undefined
}
export interface K8upCheckSpecBackendLocal {
  "mountPath": string | undefined
}
export interface K8upCheckSpecBackendRepoPasswordSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upCheckSpecBackendRestPasswordSecretReg {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upCheckSpecBackendRestUserSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upCheckSpecBackendRest {
  "passwordSecretReg": K8upCheckSpecBackendRestPasswordSecretReg | undefined
  "url": string | undefined
  "userSecretRef": K8upCheckSpecBackendRestUserSecretRef | undefined
}
export interface K8upCheckSpecBackendS3AccessKeyIDSecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upCheckSpecBackendS3SecretAccessKeySecretRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface K8upCheckSpecBackendS3 {
  "accessKeyIDSecretRef": K8upCheckSpecBackendS3AccessKeyIDSecretRef | undefined
  "bucket": string | undefined
  "endpoint": string | undefined
  "secretAccessKeySecretRef": K8upCheckSpecBackendS3SecretAccessKeySecretRef | undefined
}
export interface K8upCheckSpecBackendSwift {
  "container": string | undefined
  "path": string | undefined
}
export interface K8upCheckSpecBackend {
  "azure": K8upCheckSpecBackendAzure | undefined
  "b2": K8upCheckSpecBackendB2 | undefined
  "envFrom": Array<K8upCheckSpecBackendEnvFromItem> | undefined
  "gcs": K8upCheckSpecBackendGcs | undefined
  "local": K8upCheckSpecBackendLocal | undefined
  "repoPasswordSecretRef": K8upCheckSpecBackendRepoPasswordSecretRef | undefined
  "rest": K8upCheckSpecBackendRest | undefined
  "s3": K8upCheckSpecBackendS3 | undefined
  "swift": K8upCheckSpecBackendSwift | undefined
}
export interface K8upCheckSpecPodSecurityContextSeLinuxOptions {
  "level": string | undefined
  "role": string | undefined
  "type": string | undefined
  "user": string | undefined
}
export interface K8upCheckSpecPodSecurityContextSeccompProfile {
  "localhostProfile": string | undefined
  "type": string
}
export interface K8upCheckSpecPodSecurityContextSysctlsItem {
  "name": string
  "value": string
}
export interface K8upCheckSpecPodSecurityContextWindowsOptions {
  "gmsaCredentialSpec": string | undefined
  "gmsaCredentialSpecName": string | undefined
  "hostProcess": boolean | undefined
  "runAsUserName": string | undefined
}
export interface K8upCheckSpecPodSecurityContext {
  "fsGroup": number | undefined
  "fsGroupChangePolicy": string | undefined
  "runAsGroup": number | undefined
  "runAsNonRoot": boolean | undefined
  "runAsUser": number | undefined
  "seLinuxOptions": K8upCheckSpecPodSecurityContextSeLinuxOptions | undefined
  "seccompProfile": K8upCheckSpecPodSecurityContextSeccompProfile | undefined
  "supplementalGroups": Array<number> | undefined
  "sysctls": Array<K8upCheckSpecPodSecurityContextSysctlsItem> | undefined
  "windowsOptions": K8upCheckSpecPodSecurityContextWindowsOptions | undefined
}
export interface K8upCheckSpecResourcesLimits {
}
export interface K8upCheckSpecResourcesRequests {
}
export interface K8upCheckSpecResources {
  "limits": K8upCheckSpecResourcesLimits | undefined
  "requests": K8upCheckSpecResourcesRequests | undefined
}
export interface K8upCheckSpec {
  "activeDeadlineSeconds": number | undefined
  "backend": K8upCheckSpecBackend | undefined
  "failedJobsHistoryLimit": number | undefined
  "keepJobs": number | undefined
  "podSecurityContext": K8upCheckSpecPodSecurityContext | undefined
  "promURL": string | undefined
  "resources": K8upCheckSpecResources | undefined
  "successfulJobsHistoryLimit": number | undefined
}
export interface K8upCheck extends KubernetesObject {
  spec: K8upCheckSpec
  status: K8upCheckStatus | undefined
}
export type K8upCheckList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<K8upCheck>
