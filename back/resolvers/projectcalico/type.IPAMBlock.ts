type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoIPAMBlockSpecAttributesItemSecondary {
}
export interface ProjectcalicoIPAMBlockSpecAttributesItem {
  "handle_id": string | undefined
  "secondary": ProjectcalicoIPAMBlockSpecAttributesItemSecondary | undefined
}
export interface ProjectcalicoIPAMBlockSpecSequenceNumberForAllocation {
}
export interface ProjectcalicoIPAMBlockSpec {
  "affinity": string | undefined
  "allocations": Array<object>
  "attributes": Array<ProjectcalicoIPAMBlockSpecAttributesItem>
  "cidr": string
  "deleted": boolean | undefined
  "sequenceNumber": number | undefined
  "sequenceNumberForAllocation": ProjectcalicoIPAMBlockSpecSequenceNumberForAllocation | undefined
  "strictAffinity": boolean
  "unallocated": Array<number>
}
export interface ProjectcalicoIPAMBlock extends KubernetesObject {
  spec: ProjectcalicoIPAMBlockSpec
}
export type ProjectcalicoIPAMBlockList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoIPAMBlock>
