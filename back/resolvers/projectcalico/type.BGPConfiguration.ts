type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoBGPConfigurationSpecCommunitiesItem {
  "name": string | undefined
  "value": string | undefined
}
export interface ProjectcalicoBGPConfigurationSpecNodeMeshPasswordSecretKeyRef {
  "key": string
  "name": string | undefined
  "optional": boolean | undefined
}
export interface ProjectcalicoBGPConfigurationSpecNodeMeshPassword {
  "secretKeyRef": ProjectcalicoBGPConfigurationSpecNodeMeshPasswordSecretKeyRef | undefined
}
export interface ProjectcalicoBGPConfigurationSpecPrefixAdvertisementsItem {
  "cidr": string | undefined
  "communities": Array<string> | undefined
}
export interface ProjectcalicoBGPConfigurationSpecServiceClusterIPsItem {
  "cidr": string | undefined
}
export interface ProjectcalicoBGPConfigurationSpecServiceExternalIPsItem {
  "cidr": string | undefined
}
export interface ProjectcalicoBGPConfigurationSpecServiceLoadBalancerIPsItem {
  "cidr": string | undefined
}
export interface ProjectcalicoBGPConfigurationSpec {
  "asNumber": number | undefined
  "bindMode": string | undefined
  "communities": Array<ProjectcalicoBGPConfigurationSpecCommunitiesItem> | undefined
  "ignoredInterfaces": Array<string> | undefined
  "listenPort": number | undefined
  "logSeverityScreen": string | undefined
  "nodeMeshMaxRestartTime": string | undefined
  "nodeMeshPassword": ProjectcalicoBGPConfigurationSpecNodeMeshPassword | undefined
  "nodeToNodeMeshEnabled": boolean | undefined
  "prefixAdvertisements": Array<ProjectcalicoBGPConfigurationSpecPrefixAdvertisementsItem> | undefined
  "serviceClusterIPs": Array<ProjectcalicoBGPConfigurationSpecServiceClusterIPsItem> | undefined
  "serviceExternalIPs": Array<ProjectcalicoBGPConfigurationSpecServiceExternalIPsItem> | undefined
  "serviceLoadBalancerIPs": Array<ProjectcalicoBGPConfigurationSpecServiceLoadBalancerIPsItem> | undefined
}
export interface ProjectcalicoBGPConfiguration extends KubernetesObject {
  spec: ProjectcalicoBGPConfigurationSpec
}
export type ProjectcalicoBGPConfigurationList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoBGPConfiguration>
