type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface SecretgeneratorBasicAuthStatusSecret {
  apiVersion: string | undefined
  fieldPath: string | undefined
  kind: string | undefined
  name: string | undefined
  namespace: string | undefined
  resourceVersion: string | undefined
  uid: string | undefined
}
export interface SecretgeneratorBasicAuthStatus {
  secret: SecretgeneratorBasicAuthStatusSecret | undefined
}
export interface SecretgeneratorBasicAuthSpecData {
}
export interface SecretgeneratorBasicAuthSpec {
  data: SecretgeneratorBasicAuthSpecData | undefined
  encoding: string | undefined
  forceRegenerate: boolean | undefined
  length: string | undefined
  username: string
}
export interface SecretgeneratorBasicAuth extends KubernetesObject {
  spec: SecretgeneratorBasicAuthSpec
  status: SecretgeneratorBasicAuthStatus | undefined
}
export type SecretgeneratorBasicAuthList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<SecretgeneratorBasicAuth>
