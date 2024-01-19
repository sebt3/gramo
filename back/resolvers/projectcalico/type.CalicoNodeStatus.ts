type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoCalicoNodeStatusStatusAgentBirdV4 {
  "lastBootTime": string | undefined
  "lastReconfigurationTime": string | undefined
  "routerID": string | undefined
  "state": string | undefined
  "version": string | undefined
}
export interface ProjectcalicoCalicoNodeStatusStatusAgentBirdV6 {
  "lastBootTime": string | undefined
  "lastReconfigurationTime": string | undefined
  "routerID": string | undefined
  "state": string | undefined
  "version": string | undefined
}
export interface ProjectcalicoCalicoNodeStatusStatusAgent {
  "birdV4": ProjectcalicoCalicoNodeStatusStatusAgentBirdV4 | undefined
  "birdV6": ProjectcalicoCalicoNodeStatusStatusAgentBirdV6 | undefined
}
export interface ProjectcalicoCalicoNodeStatusStatusBgpPeersV4Item {
  "peerIP": string | undefined
  "since": string | undefined
  "state": string | undefined
  "type": string | undefined
}
export interface ProjectcalicoCalicoNodeStatusStatusBgpPeersV6Item {
  "peerIP": string | undefined
  "since": string | undefined
  "state": string | undefined
  "type": string | undefined
}
export interface ProjectcalicoCalicoNodeStatusStatusBgp {
  "numberEstablishedV4": number
  "numberEstablishedV6": number
  "numberNotEstablishedV4": number
  "numberNotEstablishedV6": number
  "peersV4": Array<ProjectcalicoCalicoNodeStatusStatusBgpPeersV4Item> | undefined
  "peersV6": Array<ProjectcalicoCalicoNodeStatusStatusBgpPeersV6Item> | undefined
}
export interface ProjectcalicoCalicoNodeStatusStatusRoutesRoutesV4ItemLearnedFrom {
  "peerIP": string | undefined
  "sourceType": string | undefined
}
export interface ProjectcalicoCalicoNodeStatusStatusRoutesRoutesV4Item {
  "destination": string | undefined
  "gateway": string | undefined
  "interface": string | undefined
  "learnedFrom": ProjectcalicoCalicoNodeStatusStatusRoutesRoutesV4ItemLearnedFrom | undefined
  "type": string | undefined
}
export interface ProjectcalicoCalicoNodeStatusStatusRoutesRoutesV6ItemLearnedFrom {
  "peerIP": string | undefined
  "sourceType": string | undefined
}
export interface ProjectcalicoCalicoNodeStatusStatusRoutesRoutesV6Item {
  "destination": string | undefined
  "gateway": string | undefined
  "interface": string | undefined
  "learnedFrom": ProjectcalicoCalicoNodeStatusStatusRoutesRoutesV6ItemLearnedFrom | undefined
  "type": string | undefined
}
export interface ProjectcalicoCalicoNodeStatusStatusRoutes {
  "routesV4": Array<ProjectcalicoCalicoNodeStatusStatusRoutesRoutesV4Item> | undefined
  "routesV6": Array<ProjectcalicoCalicoNodeStatusStatusRoutesRoutesV6Item> | undefined
}
export interface ProjectcalicoCalicoNodeStatusStatus {
  "agent": ProjectcalicoCalicoNodeStatusStatusAgent | undefined
  "bgp": ProjectcalicoCalicoNodeStatusStatusBgp | undefined
  "lastUpdated": object | undefined
  "routes": ProjectcalicoCalicoNodeStatusStatusRoutes | undefined
}
export interface ProjectcalicoCalicoNodeStatusSpec {
  "classes": Array<string> | undefined
  "node": string | undefined
  "updatePeriodSeconds": number | undefined
}
export interface ProjectcalicoCalicoNodeStatus extends KubernetesObject {
  spec: ProjectcalicoCalicoNodeStatusSpec
  status: ProjectcalicoCalicoNodeStatusStatus | undefined
}
export type ProjectcalicoCalicoNodeStatusList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoCalicoNodeStatus>
