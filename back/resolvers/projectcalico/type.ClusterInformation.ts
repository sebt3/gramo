type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoClusterInformationSpec {
  "calicoVersion": string | undefined
  "clusterGUID": string | undefined
  "clusterType": string | undefined
  "datastoreReady": boolean | undefined
  "variant": string | undefined
}
export interface ProjectcalicoClusterInformation extends KubernetesObject {
  spec: ProjectcalicoClusterInformationSpec
}
export type ProjectcalicoClusterInformationList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoClusterInformation>
