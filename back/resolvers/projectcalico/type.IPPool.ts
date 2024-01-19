type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoIPPoolSpecIpip {
  "enabled": boolean | undefined
  "mode": string | undefined
}
export interface ProjectcalicoIPPoolSpec {
  "allowedUses": Array<string> | undefined
  "blockSize": number | undefined
  "cidr": string
  "disableBGPExport": boolean | undefined
  "disabled": boolean | undefined
  "ipip": ProjectcalicoIPPoolSpecIpip | undefined
  "ipipMode": string | undefined
  "nat-outgoing": boolean | undefined
  "natOutgoing": boolean | undefined
  "nodeSelector": string | undefined
  "vxlanMode": string | undefined
}
export interface ProjectcalicoIPPool extends KubernetesObject {
  spec: ProjectcalicoIPPoolSpec
}
export type ProjectcalicoIPPoolList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoIPPool>
