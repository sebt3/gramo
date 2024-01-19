type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoNetworkPolicySpecEgressItemDestinationServiceAccounts {
  "names": Array<string> | undefined
  "selector": string | undefined
}
export interface ProjectcalicoNetworkPolicySpecEgressItemDestinationServices {
  "name": string | undefined
  "namespace": string | undefined
}
export interface ProjectcalicoNetworkPolicySpecEgressItemDestination {
  "namespaceSelector": string | undefined
  "nets": Array<string> | undefined
  "notNets": Array<string> | undefined
  "notPorts": Array<object> | undefined
  "notSelector": string | undefined
  "ports": Array<object> | undefined
  "selector": string | undefined
  "serviceAccounts": ProjectcalicoNetworkPolicySpecEgressItemDestinationServiceAccounts | undefined
  "services": ProjectcalicoNetworkPolicySpecEgressItemDestinationServices | undefined
}
export interface ProjectcalicoNetworkPolicySpecEgressItemHttpPathsItem {
  "exact": string | undefined
  "prefix": string | undefined
}
export interface ProjectcalicoNetworkPolicySpecEgressItemHttp {
  "methods": Array<string> | undefined
  "paths": Array<ProjectcalicoNetworkPolicySpecEgressItemHttpPathsItem> | undefined
}
export interface ProjectcalicoNetworkPolicySpecEgressItemIcmp {
  "code": number | undefined
  "type": number | undefined
}
export interface ProjectcalicoNetworkPolicySpecEgressItemMetadataAnnotations {
}
export interface ProjectcalicoNetworkPolicySpecEgressItemMetadata {
  "annotations": ProjectcalicoNetworkPolicySpecEgressItemMetadataAnnotations | undefined
}
export interface ProjectcalicoNetworkPolicySpecEgressItemNotICMP {
  "code": number | undefined
  "type": number | undefined
}
export interface ProjectcalicoNetworkPolicySpecEgressItemSourceServiceAccounts {
  "names": Array<string> | undefined
  "selector": string | undefined
}
export interface ProjectcalicoNetworkPolicySpecEgressItemSourceServices {
  "name": string | undefined
  "namespace": string | undefined
}
export interface ProjectcalicoNetworkPolicySpecEgressItemSource {
  "namespaceSelector": string | undefined
  "nets": Array<string> | undefined
  "notNets": Array<string> | undefined
  "notPorts": Array<object> | undefined
  "notSelector": string | undefined
  "ports": Array<object> | undefined
  "selector": string | undefined
  "serviceAccounts": ProjectcalicoNetworkPolicySpecEgressItemSourceServiceAccounts | undefined
  "services": ProjectcalicoNetworkPolicySpecEgressItemSourceServices | undefined
}
export interface ProjectcalicoNetworkPolicySpecEgressItem {
  "action": string
  "destination": ProjectcalicoNetworkPolicySpecEgressItemDestination | undefined
  "http": ProjectcalicoNetworkPolicySpecEgressItemHttp | undefined
  "icmp": ProjectcalicoNetworkPolicySpecEgressItemIcmp | undefined
  "ipVersion": number | undefined
  "metadata": ProjectcalicoNetworkPolicySpecEgressItemMetadata | undefined
  "notICMP": ProjectcalicoNetworkPolicySpecEgressItemNotICMP | undefined
  "notProtocol": object | undefined
  "protocol": object | undefined
  "source": ProjectcalicoNetworkPolicySpecEgressItemSource | undefined
}
export interface ProjectcalicoNetworkPolicySpecIngressItemDestinationServiceAccounts {
  "names": Array<string> | undefined
  "selector": string | undefined
}
export interface ProjectcalicoNetworkPolicySpecIngressItemDestinationServices {
  "name": string | undefined
  "namespace": string | undefined
}
export interface ProjectcalicoNetworkPolicySpecIngressItemDestination {
  "namespaceSelector": string | undefined
  "nets": Array<string> | undefined
  "notNets": Array<string> | undefined
  "notPorts": Array<object> | undefined
  "notSelector": string | undefined
  "ports": Array<object> | undefined
  "selector": string | undefined
  "serviceAccounts": ProjectcalicoNetworkPolicySpecIngressItemDestinationServiceAccounts | undefined
  "services": ProjectcalicoNetworkPolicySpecIngressItemDestinationServices | undefined
}
export interface ProjectcalicoNetworkPolicySpecIngressItemHttpPathsItem {
  "exact": string | undefined
  "prefix": string | undefined
}
export interface ProjectcalicoNetworkPolicySpecIngressItemHttp {
  "methods": Array<string> | undefined
  "paths": Array<ProjectcalicoNetworkPolicySpecIngressItemHttpPathsItem> | undefined
}
export interface ProjectcalicoNetworkPolicySpecIngressItemIcmp {
  "code": number | undefined
  "type": number | undefined
}
export interface ProjectcalicoNetworkPolicySpecIngressItemMetadataAnnotations {
}
export interface ProjectcalicoNetworkPolicySpecIngressItemMetadata {
  "annotations": ProjectcalicoNetworkPolicySpecIngressItemMetadataAnnotations | undefined
}
export interface ProjectcalicoNetworkPolicySpecIngressItemNotICMP {
  "code": number | undefined
  "type": number | undefined
}
export interface ProjectcalicoNetworkPolicySpecIngressItemSourceServiceAccounts {
  "names": Array<string> | undefined
  "selector": string | undefined
}
export interface ProjectcalicoNetworkPolicySpecIngressItemSourceServices {
  "name": string | undefined
  "namespace": string | undefined
}
export interface ProjectcalicoNetworkPolicySpecIngressItemSource {
  "namespaceSelector": string | undefined
  "nets": Array<string> | undefined
  "notNets": Array<string> | undefined
  "notPorts": Array<object> | undefined
  "notSelector": string | undefined
  "ports": Array<object> | undefined
  "selector": string | undefined
  "serviceAccounts": ProjectcalicoNetworkPolicySpecIngressItemSourceServiceAccounts | undefined
  "services": ProjectcalicoNetworkPolicySpecIngressItemSourceServices | undefined
}
export interface ProjectcalicoNetworkPolicySpecIngressItem {
  "action": string
  "destination": ProjectcalicoNetworkPolicySpecIngressItemDestination | undefined
  "http": ProjectcalicoNetworkPolicySpecIngressItemHttp | undefined
  "icmp": ProjectcalicoNetworkPolicySpecIngressItemIcmp | undefined
  "ipVersion": number | undefined
  "metadata": ProjectcalicoNetworkPolicySpecIngressItemMetadata | undefined
  "notICMP": ProjectcalicoNetworkPolicySpecIngressItemNotICMP | undefined
  "notProtocol": object | undefined
  "protocol": object | undefined
  "source": ProjectcalicoNetworkPolicySpecIngressItemSource | undefined
}
export interface ProjectcalicoNetworkPolicySpec {
  "egress": Array<ProjectcalicoNetworkPolicySpecEgressItem> | undefined
  "ingress": Array<ProjectcalicoNetworkPolicySpecIngressItem> | undefined
  "order": number | undefined
  "selector": string | undefined
  "serviceAccountSelector": string | undefined
  "types": Array<string> | undefined
}
export interface ProjectcalicoNetworkPolicy extends KubernetesObject {
  spec: ProjectcalicoNetworkPolicySpec
}
export type ProjectcalicoNetworkPolicyList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoNetworkPolicy>
