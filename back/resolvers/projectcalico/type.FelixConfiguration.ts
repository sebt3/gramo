type KubernetesObject = import('@kubernetes/client-node/dist/types.js').KubernetesObject
export interface ProjectcalicoFelixConfigurationSpecFailsafeInboundHostPortsItem {
  "net": string | undefined
  "port": number
  "protocol": string
}
export interface ProjectcalicoFelixConfigurationSpecFailsafeOutboundHostPortsItem {
  "net": string | undefined
  "port": number
  "protocol": string
}
export interface ProjectcalicoFelixConfigurationSpecHealthTimeoutOverridesItem {
  "name": string
  "timeout": string
}
export interface ProjectcalicoFelixConfigurationSpecRouteTableRange {
  "max": number
  "min": number
}
export interface ProjectcalicoFelixConfigurationSpecRouteTableRangesItem {
  "max": number
  "min": number
}
export interface ProjectcalicoFelixConfigurationSpec {
  "allowIPIPPacketsFromWorkloads": boolean | undefined
  "allowVXLANPacketsFromWorkloads": boolean | undefined
  "awsSrcDstCheck": string | undefined
  "bpfConnectTimeLoadBalancingEnabled": boolean | undefined
  "bpfDataIfacePattern": string | undefined
  "bpfDisableUnprivileged": boolean | undefined
  "bpfEnabled": boolean | undefined
  "bpfEnforceRPF": string | undefined
  "bpfExtToServiceConnmark": number | undefined
  "bpfExternalServiceMode": string | undefined
  "bpfHostConntrackBypass": boolean | undefined
  "bpfKubeProxyEndpointSlicesEnabled": boolean | undefined
  "bpfKubeProxyIptablesCleanupEnabled": boolean | undefined
  "bpfKubeProxyMinSyncPeriod": string | undefined
  "bpfL3IfacePattern": string | undefined
  "bpfLogLevel": string | undefined
  "bpfMapSizeConntrack": number | undefined
  "bpfMapSizeIPSets": number | undefined
  "bpfMapSizeIfState": number | undefined
  "bpfMapSizeNATAffinity": number | undefined
  "bpfMapSizeNATBackend": number | undefined
  "bpfMapSizeNATFrontend": number | undefined
  "bpfMapSizeRoute": number | undefined
  "bpfPSNATPorts": object | undefined
  "bpfPolicyDebugEnabled": boolean | undefined
  "chainInsertMode": string | undefined
  "dataplaneDriver": string | undefined
  "dataplaneWatchdogTimeout": string | undefined
  "debugDisableLogDropping": boolean | undefined
  "debugMemoryProfilePath": string | undefined
  "debugSimulateCalcGraphHangAfter": string | undefined
  "debugSimulateDataplaneHangAfter": string | undefined
  "defaultEndpointToHostAction": string | undefined
  "deviceRouteProtocol": number | undefined
  "deviceRouteSourceAddress": string | undefined
  "deviceRouteSourceAddressIPv6": string | undefined
  "disableConntrackInvalidCheck": boolean | undefined
  "endpointReportingDelay": string | undefined
  "endpointReportingEnabled": boolean | undefined
  "externalNodesList": Array<string> | undefined
  "failsafeInboundHostPorts": Array<ProjectcalicoFelixConfigurationSpecFailsafeInboundHostPortsItem> | undefined
  "failsafeOutboundHostPorts": Array<ProjectcalicoFelixConfigurationSpecFailsafeOutboundHostPortsItem> | undefined
  "featureDetectOverride": string | undefined
  "featureGates": string | undefined
  "floatingIPs": string | undefined
  "genericXDPEnabled": boolean | undefined
  "healthEnabled": boolean | undefined
  "healthHost": string | undefined
  "healthPort": number | undefined
  "healthTimeoutOverrides": Array<ProjectcalicoFelixConfigurationSpecHealthTimeoutOverridesItem> | undefined
  "interfaceExclude": string | undefined
  "interfacePrefix": string | undefined
  "interfaceRefreshInterval": string | undefined
  "ipipEnabled": boolean | undefined
  "ipipMTU": number | undefined
  "ipsetsRefreshInterval": string | undefined
  "iptablesBackend": string | undefined
  "iptablesFilterAllowAction": string | undefined
  "iptablesLockFilePath": string | undefined
  "iptablesLockProbeInterval": string | undefined
  "iptablesLockTimeout": string | undefined
  "iptablesMangleAllowAction": string | undefined
  "iptablesMarkMask": number | undefined
  "iptablesNATOutgoingInterfaceFilter": string | undefined
  "iptablesPostWriteCheckInterval": string | undefined
  "iptablesRefreshInterval": string | undefined
  "ipv6Support": boolean | undefined
  "kubeNodePortRanges": Array<object> | undefined
  "logDebugFilenameRegex": string | undefined
  "logFilePath": string | undefined
  "logPrefix": string | undefined
  "logSeverityFile": string | undefined
  "logSeverityScreen": string | undefined
  "logSeveritySys": string | undefined
  "maxIpsetSize": number | undefined
  "metadataAddr": string | undefined
  "metadataPort": number | undefined
  "mtuIfacePattern": string | undefined
  "natOutgoingAddress": string | undefined
  "natPortRange": object | undefined
  "netlinkTimeout": string | undefined
  "openstackRegion": string | undefined
  "policySyncPathPrefix": string | undefined
  "prometheusGoMetricsEnabled": boolean | undefined
  "prometheusMetricsEnabled": boolean | undefined
  "prometheusMetricsHost": string | undefined
  "prometheusMetricsPort": number | undefined
  "prometheusProcessMetricsEnabled": boolean | undefined
  "prometheusWireGuardMetricsEnabled": boolean | undefined
  "removeExternalRoutes": boolean | undefined
  "reportingInterval": string | undefined
  "reportingTTL": string | undefined
  "routeRefreshInterval": string | undefined
  "routeSource": string | undefined
  "routeSyncDisabled": boolean | undefined
  "routeTableRange": ProjectcalicoFelixConfigurationSpecRouteTableRange | undefined
  "routeTableRanges": Array<ProjectcalicoFelixConfigurationSpecRouteTableRangesItem> | undefined
  "serviceLoopPrevention": string | undefined
  "sidecarAccelerationEnabled": boolean | undefined
  "usageReportingEnabled": boolean | undefined
  "usageReportingInitialDelay": string | undefined
  "usageReportingInterval": string | undefined
  "useInternalDataplaneDriver": boolean | undefined
  "vxlanEnabled": boolean | undefined
  "vxlanMTU": number | undefined
  "vxlanMTUV6": number | undefined
  "vxlanPort": number | undefined
  "vxlanVNI": number | undefined
  "wireguardEnabled": boolean | undefined
  "wireguardEnabledV6": boolean | undefined
  "wireguardHostEncryptionEnabled": boolean | undefined
  "wireguardInterfaceName": string | undefined
  "wireguardInterfaceNameV6": string | undefined
  "wireguardKeepAlive": string | undefined
  "wireguardListeningPort": number | undefined
  "wireguardListeningPortV6": number | undefined
  "wireguardMTU": number | undefined
  "wireguardMTUV6": number | undefined
  "wireguardRoutingRulePriority": number | undefined
  "workloadSourceSpoofing": string | undefined
  "xdpEnabled": boolean | undefined
  "xdpRefreshInterval": string | undefined
}
export interface ProjectcalicoFelixConfiguration extends KubernetesObject {
  spec: ProjectcalicoFelixConfigurationSpec
}
export type ProjectcalicoFelixConfigurationList = import('@kubernetes/client-node/dist/types.js').KubernetesListObject<ProjectcalicoFelixConfiguration>
