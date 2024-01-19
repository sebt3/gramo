type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface SecretgeneratorStringSecretStatusSecret {
  "apiVersion": string | undefined
  "fieldPath": string | undefined
  "kind": string | undefined
  "name": string | undefined
  "namespace": string | undefined
  "resourceVersion": string | undefined
  "uid": string | undefined
}
export interface SecretgeneratorStringSecretStatus {
  "secret": SecretgeneratorStringSecretStatusSecret | undefined
}
export interface SecretgeneratorStringSecretSpecData {
}
export interface SecretgeneratorStringSecretSpecFieldsItem {
  "encoding": string | undefined
  "fieldName": string | undefined
  "length": string | undefined
}
export interface SecretgeneratorStringSecretSpec {
  "data": SecretgeneratorStringSecretSpecData | undefined
  "fields": Array<SecretgeneratorStringSecretSpecFieldsItem>
  "forceRegenerate": boolean | undefined
  "type": string | undefined
}
export interface SecretgeneratorStringSecret extends KubernetesObject {
  spec: SecretgeneratorStringSecretSpec
  status: SecretgeneratorStringSecretStatus | undefined
}
export type SecretgeneratorStringSecretList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<SecretgeneratorStringSecret>
