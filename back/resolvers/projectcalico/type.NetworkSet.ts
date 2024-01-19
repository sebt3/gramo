type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoNetworkSetSpec {
  "nets": Array<string> | undefined
}
export interface ProjectcalicoNetworkSet extends KubernetesObject {
  spec: ProjectcalicoNetworkSetSpec
}
export type ProjectcalicoNetworkSetList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoNetworkSet>
