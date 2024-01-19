type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoIPAMHandleSpecBlock {
}
export interface ProjectcalicoIPAMHandleSpec {
  "block": ProjectcalicoIPAMHandleSpecBlock
  "deleted": boolean | undefined
  "handleID": string
}
export interface ProjectcalicoIPAMHandle extends KubernetesObject {
  spec: ProjectcalicoIPAMHandleSpec
}
export type ProjectcalicoIPAMHandleList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoIPAMHandle>
