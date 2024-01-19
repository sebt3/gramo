type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoGlobalNetworkSetSpec {
  "nets": Array<string> | undefined
}
export interface ProjectcalicoGlobalNetworkSet extends KubernetesObject {
  spec: ProjectcalicoGlobalNetworkSetSpec
}
export type ProjectcalicoGlobalNetworkSetList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoGlobalNetworkSet>
