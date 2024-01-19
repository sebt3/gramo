type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoHostEndpointSpecPortsItem {
  "name": string
  "port": number
  "protocol": object
}
export interface ProjectcalicoHostEndpointSpec {
  "expectedIPs": Array<string> | undefined
  "interfaceName": string | undefined
  "node": string | undefined
  "ports": Array<ProjectcalicoHostEndpointSpecPortsItem> | undefined
  "profiles": Array<string> | undefined
}
export interface ProjectcalicoHostEndpoint extends KubernetesObject {
  spec: ProjectcalicoHostEndpointSpec
}
export type ProjectcalicoHostEndpointList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoHostEndpoint>
