type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface SecretgeneratorSSHKeyPairStatusSecret {
  apiVersion: string | undefined
  fieldPath: string | undefined
  kind: string | undefined
  name: string | undefined
  namespace: string | undefined
  resourceVersion: string | undefined
  uid: string | undefined
}
export interface SecretgeneratorSSHKeyPairStatus {
  secret: SecretgeneratorSSHKeyPairStatusSecret | undefined
}
export interface SecretgeneratorSSHKeyPairSpecData {
}
export interface SecretgeneratorSSHKeyPairSpec {
  data: SecretgeneratorSSHKeyPairSpecData | undefined
  forceRegenerate: boolean | undefined
  length: string | undefined
  privateKey: string | undefined
  type: string | undefined
}
export interface SecretgeneratorSSHKeyPair extends KubernetesObject {
  spec: SecretgeneratorSSHKeyPairSpec
  status: SecretgeneratorSSHKeyPairStatus | undefined
}
export type SecretgeneratorSSHKeyPairList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<SecretgeneratorSSHKeyPair>
