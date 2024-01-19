type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoIPReservationSpec {
  "reservedCIDRs": Array<string> | undefined
}
export interface ProjectcalicoIPReservation extends KubernetesObject {
  spec: ProjectcalicoIPReservationSpec
}
export type ProjectcalicoIPReservationList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoIPReservation>
