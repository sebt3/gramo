type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoGlobalNetworkPolicySpecEgressItemDestinationServiceAccounts {
  "names": Array<string> | undefined
  "selector": string | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecEgressItemDestinationServices {
  "name": string | undefined
  "namespace": string | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecEgressItemDestination {
  "namespaceSelector": string | undefined
  "nets": Array<string> | undefined
  "notNets": Array<string> | undefined
  "notPorts": Array<object> | undefined
  "notSelector": string | undefined
  "ports": Array<object> | undefined
  "selector": string | undefined
  "serviceAccounts": ProjectcalicoGlobalNetworkPolicySpecEgressItemDestinationServiceAccounts | undefined
  "services": ProjectcalicoGlobalNetworkPolicySpecEgressItemDestinationServices | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecEgressItemHttpPathsItem {
  "exact": string | undefined
  "prefix": string | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecEgressItemHttp {
  "methods": Array<string> | undefined
  "paths": Array<ProjectcalicoGlobalNetworkPolicySpecEgressItemHttpPathsItem> | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecEgressItemIcmp {
  "code": number | undefined
  "type": number | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecEgressItemMetadataAnnotations {
}
export interface ProjectcalicoGlobalNetworkPolicySpecEgressItemMetadata {
  "annotations": ProjectcalicoGlobalNetworkPolicySpecEgressItemMetadataAnnotations | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecEgressItemNotICMP {
  "code": number | undefined
  "type": number | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecEgressItemSourceServiceAccounts {
  "names": Array<string> | undefined
  "selector": string | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecEgressItemSourceServices {
  "name": string | undefined
  "namespace": string | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecEgressItemSource {
  "namespaceSelector": string | undefined
  "nets": Array<string> | undefined
  "notNets": Array<string> | undefined
  "notPorts": Array<object> | undefined
  "notSelector": string | undefined
  "ports": Array<object> | undefined
  "selector": string | undefined
  "serviceAccounts": ProjectcalicoGlobalNetworkPolicySpecEgressItemSourceServiceAccounts | undefined
  "services": ProjectcalicoGlobalNetworkPolicySpecEgressItemSourceServices | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecEgressItem {
  "action": string
  "destination": ProjectcalicoGlobalNetworkPolicySpecEgressItemDestination | undefined
  "http": ProjectcalicoGlobalNetworkPolicySpecEgressItemHttp | undefined
  "icmp": ProjectcalicoGlobalNetworkPolicySpecEgressItemIcmp | undefined
  "ipVersion": number | undefined
  "metadata": ProjectcalicoGlobalNetworkPolicySpecEgressItemMetadata | undefined
  "notICMP": ProjectcalicoGlobalNetworkPolicySpecEgressItemNotICMP | undefined
  "notProtocol": object | undefined
  "protocol": object | undefined
  "source": ProjectcalicoGlobalNetworkPolicySpecEgressItemSource | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecIngressItemDestinationServiceAccounts {
  "names": Array<string> | undefined
  "selector": string | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecIngressItemDestinationServices {
  "name": string | undefined
  "namespace": string | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecIngressItemDestination {
  "namespaceSelector": string | undefined
  "nets": Array<string> | undefined
  "notNets": Array<string> | undefined
  "notPorts": Array<object> | undefined
  "notSelector": string | undefined
  "ports": Array<object> | undefined
  "selector": string | undefined
  "serviceAccounts": ProjectcalicoGlobalNetworkPolicySpecIngressItemDestinationServiceAccounts | undefined
  "services": ProjectcalicoGlobalNetworkPolicySpecIngressItemDestinationServices | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecIngressItemHttpPathsItem {
  "exact": string | undefined
  "prefix": string | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecIngressItemHttp {
  "methods": Array<string> | undefined
  "paths": Array<ProjectcalicoGlobalNetworkPolicySpecIngressItemHttpPathsItem> | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecIngressItemIcmp {
  "code": number | undefined
  "type": number | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecIngressItemMetadataAnnotations {
}
export interface ProjectcalicoGlobalNetworkPolicySpecIngressItemMetadata {
  "annotations": ProjectcalicoGlobalNetworkPolicySpecIngressItemMetadataAnnotations | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecIngressItemNotICMP {
  "code": number | undefined
  "type": number | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecIngressItemSourceServiceAccounts {
  "names": Array<string> | undefined
  "selector": string | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecIngressItemSourceServices {
  "name": string | undefined
  "namespace": string | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecIngressItemSource {
  "namespaceSelector": string | undefined
  "nets": Array<string> | undefined
  "notNets": Array<string> | undefined
  "notPorts": Array<object> | undefined
  "notSelector": string | undefined
  "ports": Array<object> | undefined
  "selector": string | undefined
  "serviceAccounts": ProjectcalicoGlobalNetworkPolicySpecIngressItemSourceServiceAccounts | undefined
  "services": ProjectcalicoGlobalNetworkPolicySpecIngressItemSourceServices | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpecIngressItem {
  "action": string
  "destination": ProjectcalicoGlobalNetworkPolicySpecIngressItemDestination | undefined
  "http": ProjectcalicoGlobalNetworkPolicySpecIngressItemHttp | undefined
  "icmp": ProjectcalicoGlobalNetworkPolicySpecIngressItemIcmp | undefined
  "ipVersion": number | undefined
  "metadata": ProjectcalicoGlobalNetworkPolicySpecIngressItemMetadata | undefined
  "notICMP": ProjectcalicoGlobalNetworkPolicySpecIngressItemNotICMP | undefined
  "notProtocol": object | undefined
  "protocol": object | undefined
  "source": ProjectcalicoGlobalNetworkPolicySpecIngressItemSource | undefined
}
export interface ProjectcalicoGlobalNetworkPolicySpec {
  "applyOnForward": boolean | undefined
  "doNotTrack": boolean | undefined
  "egress": Array<ProjectcalicoGlobalNetworkPolicySpecEgressItem> | undefined
  "ingress": Array<ProjectcalicoGlobalNetworkPolicySpecIngressItem> | undefined
  "namespaceSelector": string | undefined
  "order": number | undefined
  "preDNAT": boolean | undefined
  "selector": string | undefined
  "serviceAccountSelector": string | undefined
  "types": Array<string> | undefined
}
export interface ProjectcalicoGlobalNetworkPolicy extends KubernetesObject {
  spec: ProjectcalicoGlobalNetworkPolicySpec
}
export type ProjectcalicoGlobalNetworkPolicyList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoGlobalNetworkPolicy>
