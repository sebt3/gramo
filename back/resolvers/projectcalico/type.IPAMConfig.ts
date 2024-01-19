type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoIPAMConfigSpec {
  "autoAllocateBlocks": boolean
  "maxBlocksPerHost": number | undefined
  "strictAffinity": boolean
}
export interface ProjectcalicoIPAMConfig extends KubernetesObject {
  spec: ProjectcalicoIPAMConfigSpec
}
export type ProjectcalicoIPAMConfigList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoIPAMConfig>
