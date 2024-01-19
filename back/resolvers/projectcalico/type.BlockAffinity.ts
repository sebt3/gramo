type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoBlockAffinitySpec {
  "cidr": string
  "deleted": string
  "node": string
  "state": string
}
export interface ProjectcalicoBlockAffinity extends KubernetesObject {
  spec: ProjectcalicoBlockAffinitySpec
}
export type ProjectcalicoBlockAffinityList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoBlockAffinity>
