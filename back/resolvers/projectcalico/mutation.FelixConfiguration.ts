import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoFelixConfiguration } from './type.FelixConfiguration.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoFelixConfiguration: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['allowIPIPPacketsFromWorkloads'] !== undefined && typeof args['spec']['allowIPIPPacketsFromWorkloads'] == 'boolean') spec['allowIPIPPacketsFromWorkloads'] = args['spec']['allowIPIPPacketsFromWorkloads'];
        if (args['spec']['allowVXLANPacketsFromWorkloads'] !== undefined && typeof args['spec']['allowVXLANPacketsFromWorkloads'] == 'boolean') spec['allowVXLANPacketsFromWorkloads'] = args['spec']['allowVXLANPacketsFromWorkloads'];
        if (args['spec']['awsSrcDstCheck'] !== undefined && typeof args['spec']['awsSrcDstCheck'] == 'string') spec['awsSrcDstCheck'] = args['spec']['awsSrcDstCheck'];
        if (args['spec']['bpfConnectTimeLoadBalancingEnabled'] !== undefined && typeof args['spec']['bpfConnectTimeLoadBalancingEnabled'] == 'boolean') spec['bpfConnectTimeLoadBalancingEnabled'] = args['spec']['bpfConnectTimeLoadBalancingEnabled'];
        if (args['spec']['bpfDataIfacePattern'] !== undefined && typeof args['spec']['bpfDataIfacePattern'] == 'string') spec['bpfDataIfacePattern'] = args['spec']['bpfDataIfacePattern'];
        if (args['spec']['bpfDisableUnprivileged'] !== undefined && typeof args['spec']['bpfDisableUnprivileged'] == 'boolean') spec['bpfDisableUnprivileged'] = args['spec']['bpfDisableUnprivileged'];
        if (args['spec']['bpfEnabled'] !== undefined && typeof args['spec']['bpfEnabled'] == 'boolean') spec['bpfEnabled'] = args['spec']['bpfEnabled'];
        if (args['spec']['bpfEnforceRPF'] !== undefined && typeof args['spec']['bpfEnforceRPF'] == 'string') spec['bpfEnforceRPF'] = args['spec']['bpfEnforceRPF'];
        if (args['spec']['bpfExtToServiceConnmark'] !== undefined && typeof args['spec']['bpfExtToServiceConnmark'] == 'number') spec['bpfExtToServiceConnmark'] = args['spec']['bpfExtToServiceConnmark'];
        if (args['spec']['bpfExternalServiceMode'] !== undefined && typeof args['spec']['bpfExternalServiceMode'] == 'string') spec['bpfExternalServiceMode'] = args['spec']['bpfExternalServiceMode'];
        if (args['spec']['bpfHostConntrackBypass'] !== undefined && typeof args['spec']['bpfHostConntrackBypass'] == 'boolean') spec['bpfHostConntrackBypass'] = args['spec']['bpfHostConntrackBypass'];
        if (args['spec']['bpfKubeProxyEndpointSlicesEnabled'] !== undefined && typeof args['spec']['bpfKubeProxyEndpointSlicesEnabled'] == 'boolean') spec['bpfKubeProxyEndpointSlicesEnabled'] = args['spec']['bpfKubeProxyEndpointSlicesEnabled'];
        if (args['spec']['bpfKubeProxyIptablesCleanupEnabled'] !== undefined && typeof args['spec']['bpfKubeProxyIptablesCleanupEnabled'] == 'boolean') spec['bpfKubeProxyIptablesCleanupEnabled'] = args['spec']['bpfKubeProxyIptablesCleanupEnabled'];
        if (args['spec']['bpfKubeProxyMinSyncPeriod'] !== undefined && typeof args['spec']['bpfKubeProxyMinSyncPeriod'] == 'string') spec['bpfKubeProxyMinSyncPeriod'] = args['spec']['bpfKubeProxyMinSyncPeriod'];
        if (args['spec']['bpfL3IfacePattern'] !== undefined && typeof args['spec']['bpfL3IfacePattern'] == 'string') spec['bpfL3IfacePattern'] = args['spec']['bpfL3IfacePattern'];
        if (args['spec']['bpfLogLevel'] !== undefined && typeof args['spec']['bpfLogLevel'] == 'string') spec['bpfLogLevel'] = args['spec']['bpfLogLevel'];
        if (args['spec']['bpfMapSizeConntrack'] !== undefined && typeof args['spec']['bpfMapSizeConntrack'] == 'number') spec['bpfMapSizeConntrack'] = args['spec']['bpfMapSizeConntrack'];
        if (args['spec']['bpfMapSizeIPSets'] !== undefined && typeof args['spec']['bpfMapSizeIPSets'] == 'number') spec['bpfMapSizeIPSets'] = args['spec']['bpfMapSizeIPSets'];
        if (args['spec']['bpfMapSizeIfState'] !== undefined && typeof args['spec']['bpfMapSizeIfState'] == 'number') spec['bpfMapSizeIfState'] = args['spec']['bpfMapSizeIfState'];
        if (args['spec']['bpfMapSizeNATAffinity'] !== undefined && typeof args['spec']['bpfMapSizeNATAffinity'] == 'number') spec['bpfMapSizeNATAffinity'] = args['spec']['bpfMapSizeNATAffinity'];
        if (args['spec']['bpfMapSizeNATBackend'] !== undefined && typeof args['spec']['bpfMapSizeNATBackend'] == 'number') spec['bpfMapSizeNATBackend'] = args['spec']['bpfMapSizeNATBackend'];
        if (args['spec']['bpfMapSizeNATFrontend'] !== undefined && typeof args['spec']['bpfMapSizeNATFrontend'] == 'number') spec['bpfMapSizeNATFrontend'] = args['spec']['bpfMapSizeNATFrontend'];
        if (args['spec']['bpfMapSizeRoute'] !== undefined && typeof args['spec']['bpfMapSizeRoute'] == 'number') spec['bpfMapSizeRoute'] = args['spec']['bpfMapSizeRoute'];
        if (args['spec']['bpfPSNATPorts'] !== undefined) spec['bpfPSNATPorts'] = args['spec']['bpfPSNATPorts'];
        if (args['spec']['bpfPolicyDebugEnabled'] !== undefined && typeof args['spec']['bpfPolicyDebugEnabled'] == 'boolean') spec['bpfPolicyDebugEnabled'] = args['spec']['bpfPolicyDebugEnabled'];
        if (args['spec']['chainInsertMode'] !== undefined && typeof args['spec']['chainInsertMode'] == 'string') spec['chainInsertMode'] = args['spec']['chainInsertMode'];
        if (args['spec']['dataplaneDriver'] !== undefined && typeof args['spec']['dataplaneDriver'] == 'string') spec['dataplaneDriver'] = args['spec']['dataplaneDriver'];
        if (args['spec']['dataplaneWatchdogTimeout'] !== undefined && typeof args['spec']['dataplaneWatchdogTimeout'] == 'string') spec['dataplaneWatchdogTimeout'] = args['spec']['dataplaneWatchdogTimeout'];
        if (args['spec']['debugDisableLogDropping'] !== undefined && typeof args['spec']['debugDisableLogDropping'] == 'boolean') spec['debugDisableLogDropping'] = args['spec']['debugDisableLogDropping'];
        if (args['spec']['debugMemoryProfilePath'] !== undefined && typeof args['spec']['debugMemoryProfilePath'] == 'string') spec['debugMemoryProfilePath'] = args['spec']['debugMemoryProfilePath'];
        if (args['spec']['debugSimulateCalcGraphHangAfter'] !== undefined && typeof args['spec']['debugSimulateCalcGraphHangAfter'] == 'string') spec['debugSimulateCalcGraphHangAfter'] = args['spec']['debugSimulateCalcGraphHangAfter'];
        if (args['spec']['debugSimulateDataplaneHangAfter'] !== undefined && typeof args['spec']['debugSimulateDataplaneHangAfter'] == 'string') spec['debugSimulateDataplaneHangAfter'] = args['spec']['debugSimulateDataplaneHangAfter'];
        if (args['spec']['defaultEndpointToHostAction'] !== undefined && typeof args['spec']['defaultEndpointToHostAction'] == 'string') spec['defaultEndpointToHostAction'] = args['spec']['defaultEndpointToHostAction'];
        if (args['spec']['deviceRouteProtocol'] !== undefined && typeof args['spec']['deviceRouteProtocol'] == 'number') spec['deviceRouteProtocol'] = args['spec']['deviceRouteProtocol'];
        if (args['spec']['deviceRouteSourceAddress'] !== undefined && typeof args['spec']['deviceRouteSourceAddress'] == 'string') spec['deviceRouteSourceAddress'] = args['spec']['deviceRouteSourceAddress'];
        if (args['spec']['deviceRouteSourceAddressIPv6'] !== undefined && typeof args['spec']['deviceRouteSourceAddressIPv6'] == 'string') spec['deviceRouteSourceAddressIPv6'] = args['spec']['deviceRouteSourceAddressIPv6'];
        if (args['spec']['disableConntrackInvalidCheck'] !== undefined && typeof args['spec']['disableConntrackInvalidCheck'] == 'boolean') spec['disableConntrackInvalidCheck'] = args['spec']['disableConntrackInvalidCheck'];
        if (args['spec']['endpointReportingDelay'] !== undefined && typeof args['spec']['endpointReportingDelay'] == 'string') spec['endpointReportingDelay'] = args['spec']['endpointReportingDelay'];
        if (args['spec']['endpointReportingEnabled'] !== undefined && typeof args['spec']['endpointReportingEnabled'] == 'boolean') spec['endpointReportingEnabled'] = args['spec']['endpointReportingEnabled'];
        if (args['spec']['externalNodesList'] !== undefined && Array.isArray(args['spec']['externalNodesList'])) spec['externalNodesList'] = args['spec']['externalNodesList'];
        if (args['spec']['failsafeInboundHostPorts'] !== undefined && Array.isArray(args['spec']['failsafeInboundHostPorts'])) spec['failsafeInboundHostPorts'] = args['spec']['failsafeInboundHostPorts'];
        if (args['spec']['failsafeOutboundHostPorts'] !== undefined && Array.isArray(args['spec']['failsafeOutboundHostPorts'])) spec['failsafeOutboundHostPorts'] = args['spec']['failsafeOutboundHostPorts'];
        if (args['spec']['featureDetectOverride'] !== undefined && typeof args['spec']['featureDetectOverride'] == 'string') spec['featureDetectOverride'] = args['spec']['featureDetectOverride'];
        if (args['spec']['featureGates'] !== undefined && typeof args['spec']['featureGates'] == 'string') spec['featureGates'] = args['spec']['featureGates'];
        if (args['spec']['floatingIPs'] !== undefined && typeof args['spec']['floatingIPs'] == 'string') spec['floatingIPs'] = args['spec']['floatingIPs'];
        if (args['spec']['genericXDPEnabled'] !== undefined && typeof args['spec']['genericXDPEnabled'] == 'boolean') spec['genericXDPEnabled'] = args['spec']['genericXDPEnabled'];
        if (args['spec']['healthEnabled'] !== undefined && typeof args['spec']['healthEnabled'] == 'boolean') spec['healthEnabled'] = args['spec']['healthEnabled'];
        if (args['spec']['healthHost'] !== undefined && typeof args['spec']['healthHost'] == 'string') spec['healthHost'] = args['spec']['healthHost'];
        if (args['spec']['healthPort'] !== undefined && typeof args['spec']['healthPort'] == 'number') spec['healthPort'] = args['spec']['healthPort'];
        if (args['spec']['healthTimeoutOverrides'] !== undefined && Array.isArray(args['spec']['healthTimeoutOverrides'])) spec['healthTimeoutOverrides'] = args['spec']['healthTimeoutOverrides'];
        if (args['spec']['interfaceExclude'] !== undefined && typeof args['spec']['interfaceExclude'] == 'string') spec['interfaceExclude'] = args['spec']['interfaceExclude'];
        if (args['spec']['interfacePrefix'] !== undefined && typeof args['spec']['interfacePrefix'] == 'string') spec['interfacePrefix'] = args['spec']['interfacePrefix'];
        if (args['spec']['interfaceRefreshInterval'] !== undefined && typeof args['spec']['interfaceRefreshInterval'] == 'string') spec['interfaceRefreshInterval'] = args['spec']['interfaceRefreshInterval'];
        if (args['spec']['ipipEnabled'] !== undefined && typeof args['spec']['ipipEnabled'] == 'boolean') spec['ipipEnabled'] = args['spec']['ipipEnabled'];
        if (args['spec']['ipipMTU'] !== undefined && typeof args['spec']['ipipMTU'] == 'number') spec['ipipMTU'] = args['spec']['ipipMTU'];
        if (args['spec']['ipsetsRefreshInterval'] !== undefined && typeof args['spec']['ipsetsRefreshInterval'] == 'string') spec['ipsetsRefreshInterval'] = args['spec']['ipsetsRefreshInterval'];
        if (args['spec']['iptablesBackend'] !== undefined && typeof args['spec']['iptablesBackend'] == 'string') spec['iptablesBackend'] = args['spec']['iptablesBackend'];
        if (args['spec']['iptablesFilterAllowAction'] !== undefined && typeof args['spec']['iptablesFilterAllowAction'] == 'string') spec['iptablesFilterAllowAction'] = args['spec']['iptablesFilterAllowAction'];
        if (args['spec']['iptablesLockFilePath'] !== undefined && typeof args['spec']['iptablesLockFilePath'] == 'string') spec['iptablesLockFilePath'] = args['spec']['iptablesLockFilePath'];
        if (args['spec']['iptablesLockProbeInterval'] !== undefined && typeof args['spec']['iptablesLockProbeInterval'] == 'string') spec['iptablesLockProbeInterval'] = args['spec']['iptablesLockProbeInterval'];
        if (args['spec']['iptablesLockTimeout'] !== undefined && typeof args['spec']['iptablesLockTimeout'] == 'string') spec['iptablesLockTimeout'] = args['spec']['iptablesLockTimeout'];
        if (args['spec']['iptablesMangleAllowAction'] !== undefined && typeof args['spec']['iptablesMangleAllowAction'] == 'string') spec['iptablesMangleAllowAction'] = args['spec']['iptablesMangleAllowAction'];
        if (args['spec']['iptablesMarkMask'] !== undefined && typeof args['spec']['iptablesMarkMask'] == 'number') spec['iptablesMarkMask'] = args['spec']['iptablesMarkMask'];
        if (args['spec']['iptablesNATOutgoingInterfaceFilter'] !== undefined && typeof args['spec']['iptablesNATOutgoingInterfaceFilter'] == 'string') spec['iptablesNATOutgoingInterfaceFilter'] = args['spec']['iptablesNATOutgoingInterfaceFilter'];
        if (args['spec']['iptablesPostWriteCheckInterval'] !== undefined && typeof args['spec']['iptablesPostWriteCheckInterval'] == 'string') spec['iptablesPostWriteCheckInterval'] = args['spec']['iptablesPostWriteCheckInterval'];
        if (args['spec']['iptablesRefreshInterval'] !== undefined && typeof args['spec']['iptablesRefreshInterval'] == 'string') spec['iptablesRefreshInterval'] = args['spec']['iptablesRefreshInterval'];
        if (args['spec']['ipv6Support'] !== undefined && typeof args['spec']['ipv6Support'] == 'boolean') spec['ipv6Support'] = args['spec']['ipv6Support'];
        if (args['spec']['kubeNodePortRanges'] !== undefined && Array.isArray(args['spec']['kubeNodePortRanges'])) spec['kubeNodePortRanges'] = args['spec']['kubeNodePortRanges'];
        if (args['spec']['logDebugFilenameRegex'] !== undefined && typeof args['spec']['logDebugFilenameRegex'] == 'string') spec['logDebugFilenameRegex'] = args['spec']['logDebugFilenameRegex'];
        if (args['spec']['logFilePath'] !== undefined && typeof args['spec']['logFilePath'] == 'string') spec['logFilePath'] = args['spec']['logFilePath'];
        if (args['spec']['logPrefix'] !== undefined && typeof args['spec']['logPrefix'] == 'string') spec['logPrefix'] = args['spec']['logPrefix'];
        if (args['spec']['logSeverityFile'] !== undefined && typeof args['spec']['logSeverityFile'] == 'string') spec['logSeverityFile'] = args['spec']['logSeverityFile'];
        if (args['spec']['logSeverityScreen'] !== undefined && typeof args['spec']['logSeverityScreen'] == 'string') spec['logSeverityScreen'] = args['spec']['logSeverityScreen'];
        if (args['spec']['logSeveritySys'] !== undefined && typeof args['spec']['logSeveritySys'] == 'string') spec['logSeveritySys'] = args['spec']['logSeveritySys'];
        if (args['spec']['maxIpsetSize'] !== undefined && typeof args['spec']['maxIpsetSize'] == 'number') spec['maxIpsetSize'] = args['spec']['maxIpsetSize'];
        if (args['spec']['metadataAddr'] !== undefined && typeof args['spec']['metadataAddr'] == 'string') spec['metadataAddr'] = args['spec']['metadataAddr'];
        if (args['spec']['metadataPort'] !== undefined && typeof args['spec']['metadataPort'] == 'number') spec['metadataPort'] = args['spec']['metadataPort'];
        if (args['spec']['mtuIfacePattern'] !== undefined && typeof args['spec']['mtuIfacePattern'] == 'string') spec['mtuIfacePattern'] = args['spec']['mtuIfacePattern'];
        if (args['spec']['natOutgoingAddress'] !== undefined && typeof args['spec']['natOutgoingAddress'] == 'string') spec['natOutgoingAddress'] = args['spec']['natOutgoingAddress'];
        if (args['spec']['natPortRange'] !== undefined) spec['natPortRange'] = args['spec']['natPortRange'];
        if (args['spec']['netlinkTimeout'] !== undefined && typeof args['spec']['netlinkTimeout'] == 'string') spec['netlinkTimeout'] = args['spec']['netlinkTimeout'];
        if (args['spec']['openstackRegion'] !== undefined && typeof args['spec']['openstackRegion'] == 'string') spec['openstackRegion'] = args['spec']['openstackRegion'];
        if (args['spec']['policySyncPathPrefix'] !== undefined && typeof args['spec']['policySyncPathPrefix'] == 'string') spec['policySyncPathPrefix'] = args['spec']['policySyncPathPrefix'];
        if (args['spec']['prometheusGoMetricsEnabled'] !== undefined && typeof args['spec']['prometheusGoMetricsEnabled'] == 'boolean') spec['prometheusGoMetricsEnabled'] = args['spec']['prometheusGoMetricsEnabled'];
        if (args['spec']['prometheusMetricsEnabled'] !== undefined && typeof args['spec']['prometheusMetricsEnabled'] == 'boolean') spec['prometheusMetricsEnabled'] = args['spec']['prometheusMetricsEnabled'];
        if (args['spec']['prometheusMetricsHost'] !== undefined && typeof args['spec']['prometheusMetricsHost'] == 'string') spec['prometheusMetricsHost'] = args['spec']['prometheusMetricsHost'];
        if (args['spec']['prometheusMetricsPort'] !== undefined && typeof args['spec']['prometheusMetricsPort'] == 'number') spec['prometheusMetricsPort'] = args['spec']['prometheusMetricsPort'];
        if (args['spec']['prometheusProcessMetricsEnabled'] !== undefined && typeof args['spec']['prometheusProcessMetricsEnabled'] == 'boolean') spec['prometheusProcessMetricsEnabled'] = args['spec']['prometheusProcessMetricsEnabled'];
        if (args['spec']['prometheusWireGuardMetricsEnabled'] !== undefined && typeof args['spec']['prometheusWireGuardMetricsEnabled'] == 'boolean') spec['prometheusWireGuardMetricsEnabled'] = args['spec']['prometheusWireGuardMetricsEnabled'];
        if (args['spec']['removeExternalRoutes'] !== undefined && typeof args['spec']['removeExternalRoutes'] == 'boolean') spec['removeExternalRoutes'] = args['spec']['removeExternalRoutes'];
        if (args['spec']['reportingInterval'] !== undefined && typeof args['spec']['reportingInterval'] == 'string') spec['reportingInterval'] = args['spec']['reportingInterval'];
        if (args['spec']['reportingTTL'] !== undefined && typeof args['spec']['reportingTTL'] == 'string') spec['reportingTTL'] = args['spec']['reportingTTL'];
        if (args['spec']['routeRefreshInterval'] !== undefined && typeof args['spec']['routeRefreshInterval'] == 'string') spec['routeRefreshInterval'] = args['spec']['routeRefreshInterval'];
        if (args['spec']['routeSource'] !== undefined && typeof args['spec']['routeSource'] == 'string') spec['routeSource'] = args['spec']['routeSource'];
        if (args['spec']['routeSyncDisabled'] !== undefined && typeof args['spec']['routeSyncDisabled'] == 'boolean') spec['routeSyncDisabled'] = args['spec']['routeSyncDisabled'];
        if (args['spec']['routeTableRange'] !== undefined && typeof args['spec']['routeTableRange'] == 'object') spec['routeTableRange'] = args['spec']['routeTableRange'];
        if (args['spec']['routeTableRanges'] !== undefined && Array.isArray(args['spec']['routeTableRanges'])) spec['routeTableRanges'] = args['spec']['routeTableRanges'];
        if (args['spec']['serviceLoopPrevention'] !== undefined && typeof args['spec']['serviceLoopPrevention'] == 'string') spec['serviceLoopPrevention'] = args['spec']['serviceLoopPrevention'];
        if (args['spec']['sidecarAccelerationEnabled'] !== undefined && typeof args['spec']['sidecarAccelerationEnabled'] == 'boolean') spec['sidecarAccelerationEnabled'] = args['spec']['sidecarAccelerationEnabled'];
        if (args['spec']['usageReportingEnabled'] !== undefined && typeof args['spec']['usageReportingEnabled'] == 'boolean') spec['usageReportingEnabled'] = args['spec']['usageReportingEnabled'];
        if (args['spec']['usageReportingInitialDelay'] !== undefined && typeof args['spec']['usageReportingInitialDelay'] == 'string') spec['usageReportingInitialDelay'] = args['spec']['usageReportingInitialDelay'];
        if (args['spec']['usageReportingInterval'] !== undefined && typeof args['spec']['usageReportingInterval'] == 'string') spec['usageReportingInterval'] = args['spec']['usageReportingInterval'];
        if (args['spec']['useInternalDataplaneDriver'] !== undefined && typeof args['spec']['useInternalDataplaneDriver'] == 'boolean') spec['useInternalDataplaneDriver'] = args['spec']['useInternalDataplaneDriver'];
        if (args['spec']['vxlanEnabled'] !== undefined && typeof args['spec']['vxlanEnabled'] == 'boolean') spec['vxlanEnabled'] = args['spec']['vxlanEnabled'];
        if (args['spec']['vxlanMTU'] !== undefined && typeof args['spec']['vxlanMTU'] == 'number') spec['vxlanMTU'] = args['spec']['vxlanMTU'];
        if (args['spec']['vxlanMTUV6'] !== undefined && typeof args['spec']['vxlanMTUV6'] == 'number') spec['vxlanMTUV6'] = args['spec']['vxlanMTUV6'];
        if (args['spec']['vxlanPort'] !== undefined && typeof args['spec']['vxlanPort'] == 'number') spec['vxlanPort'] = args['spec']['vxlanPort'];
        if (args['spec']['vxlanVNI'] !== undefined && typeof args['spec']['vxlanVNI'] == 'number') spec['vxlanVNI'] = args['spec']['vxlanVNI'];
        if (args['spec']['wireguardEnabled'] !== undefined && typeof args['spec']['wireguardEnabled'] == 'boolean') spec['wireguardEnabled'] = args['spec']['wireguardEnabled'];
        if (args['spec']['wireguardEnabledV6'] !== undefined && typeof args['spec']['wireguardEnabledV6'] == 'boolean') spec['wireguardEnabledV6'] = args['spec']['wireguardEnabledV6'];
        if (args['spec']['wireguardHostEncryptionEnabled'] !== undefined && typeof args['spec']['wireguardHostEncryptionEnabled'] == 'boolean') spec['wireguardHostEncryptionEnabled'] = args['spec']['wireguardHostEncryptionEnabled'];
        if (args['spec']['wireguardInterfaceName'] !== undefined && typeof args['spec']['wireguardInterfaceName'] == 'string') spec['wireguardInterfaceName'] = args['spec']['wireguardInterfaceName'];
        if (args['spec']['wireguardInterfaceNameV6'] !== undefined && typeof args['spec']['wireguardInterfaceNameV6'] == 'string') spec['wireguardInterfaceNameV6'] = args['spec']['wireguardInterfaceNameV6'];
        if (args['spec']['wireguardKeepAlive'] !== undefined && typeof args['spec']['wireguardKeepAlive'] == 'string') spec['wireguardKeepAlive'] = args['spec']['wireguardKeepAlive'];
        if (args['spec']['wireguardListeningPort'] !== undefined && typeof args['spec']['wireguardListeningPort'] == 'number') spec['wireguardListeningPort'] = args['spec']['wireguardListeningPort'];
        if (args['spec']['wireguardListeningPortV6'] !== undefined && typeof args['spec']['wireguardListeningPortV6'] == 'number') spec['wireguardListeningPortV6'] = args['spec']['wireguardListeningPortV6'];
        if (args['spec']['wireguardMTU'] !== undefined && typeof args['spec']['wireguardMTU'] == 'number') spec['wireguardMTU'] = args['spec']['wireguardMTU'];
        if (args['spec']['wireguardMTUV6'] !== undefined && typeof args['spec']['wireguardMTUV6'] == 'number') spec['wireguardMTUV6'] = args['spec']['wireguardMTUV6'];
        if (args['spec']['wireguardRoutingRulePriority'] !== undefined && typeof args['spec']['wireguardRoutingRulePriority'] == 'number') spec['wireguardRoutingRulePriority'] = args['spec']['wireguardRoutingRulePriority'];
        if (args['spec']['workloadSourceSpoofing'] !== undefined && typeof args['spec']['workloadSourceSpoofing'] == 'string') spec['workloadSourceSpoofing'] = args['spec']['workloadSourceSpoofing'];
        if (args['spec']['xdpEnabled'] !== undefined && typeof args['spec']['xdpEnabled'] == 'boolean') spec['xdpEnabled'] = args['spec']['xdpEnabled'];
        if (args['spec']['xdpRefreshInterval'] !== undefined && typeof args['spec']['xdpRefreshInterval'] == 'string') spec['xdpRefreshInterval'] = args['spec']['xdpRefreshInterval'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'FelixConfiguration',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','felixconfigurations', payload)
            const ext = res.body as ProjectcalicoFelixConfiguration
            return {
                metadata: getMetadata(ext.metadata, ext),
                "allowIPIPPacketsFromWorkloads": ext.spec['allowIPIPPacketsFromWorkloads'],
                "allowVXLANPacketsFromWorkloads": ext.spec['allowVXLANPacketsFromWorkloads'],
                "awsSrcDstCheck": ext.spec['awsSrcDstCheck'],
                "bpfConnectTimeLoadBalancingEnabled": ext.spec['bpfConnectTimeLoadBalancingEnabled'],
                "bpfDataIfacePattern": ext.spec['bpfDataIfacePattern'],
                "bpfDisableUnprivileged": ext.spec['bpfDisableUnprivileged'],
                "bpfEnabled": ext.spec['bpfEnabled'],
                "bpfEnforceRPF": ext.spec['bpfEnforceRPF'],
                "bpfExtToServiceConnmark": ext.spec['bpfExtToServiceConnmark'],
                "bpfExternalServiceMode": ext.spec['bpfExternalServiceMode'],
                "bpfHostConntrackBypass": ext.spec['bpfHostConntrackBypass'],
                "bpfKubeProxyEndpointSlicesEnabled": ext.spec['bpfKubeProxyEndpointSlicesEnabled'],
                "bpfKubeProxyIptablesCleanupEnabled": ext.spec['bpfKubeProxyIptablesCleanupEnabled'],
                "bpfKubeProxyMinSyncPeriod": ext.spec['bpfKubeProxyMinSyncPeriod'],
                "bpfL3IfacePattern": ext.spec['bpfL3IfacePattern'],
                "bpfLogLevel": ext.spec['bpfLogLevel'],
                "bpfMapSizeConntrack": ext.spec['bpfMapSizeConntrack'],
                "bpfMapSizeIPSets": ext.spec['bpfMapSizeIPSets'],
                "bpfMapSizeIfState": ext.spec['bpfMapSizeIfState'],
                "bpfMapSizeNATAffinity": ext.spec['bpfMapSizeNATAffinity'],
                "bpfMapSizeNATBackend": ext.spec['bpfMapSizeNATBackend'],
                "bpfMapSizeNATFrontend": ext.spec['bpfMapSizeNATFrontend'],
                "bpfMapSizeRoute": ext.spec['bpfMapSizeRoute'],
                "bpfPSNATPorts": ext.spec['bpfPSNATPorts'],
                "bpfPolicyDebugEnabled": ext.spec['bpfPolicyDebugEnabled'],
                "chainInsertMode": ext.spec['chainInsertMode'],
                "dataplaneDriver": ext.spec['dataplaneDriver'],
                "dataplaneWatchdogTimeout": ext.spec['dataplaneWatchdogTimeout'],
                "debugDisableLogDropping": ext.spec['debugDisableLogDropping'],
                "debugMemoryProfilePath": ext.spec['debugMemoryProfilePath'],
                "debugSimulateCalcGraphHangAfter": ext.spec['debugSimulateCalcGraphHangAfter'],
                "debugSimulateDataplaneHangAfter": ext.spec['debugSimulateDataplaneHangAfter'],
                "defaultEndpointToHostAction": ext.spec['defaultEndpointToHostAction'],
                "deviceRouteProtocol": ext.spec['deviceRouteProtocol'],
                "deviceRouteSourceAddress": ext.spec['deviceRouteSourceAddress'],
                "deviceRouteSourceAddressIPv6": ext.spec['deviceRouteSourceAddressIPv6'],
                "disableConntrackInvalidCheck": ext.spec['disableConntrackInvalidCheck'],
                "endpointReportingDelay": ext.spec['endpointReportingDelay'],
                "endpointReportingEnabled": ext.spec['endpointReportingEnabled'],
                "externalNodesList": ext.spec['externalNodesList'],
                "failsafeInboundHostPorts": ext.spec['failsafeInboundHostPorts'],
                "failsafeOutboundHostPorts": ext.spec['failsafeOutboundHostPorts'],
                "featureDetectOverride": ext.spec['featureDetectOverride'],
                "featureGates": ext.spec['featureGates'],
                "floatingIPs": ext.spec['floatingIPs'],
                "genericXDPEnabled": ext.spec['genericXDPEnabled'],
                "healthEnabled": ext.spec['healthEnabled'],
                "healthHost": ext.spec['healthHost'],
                "healthPort": ext.spec['healthPort'],
                "healthTimeoutOverrides": ext.spec['healthTimeoutOverrides'],
                "interfaceExclude": ext.spec['interfaceExclude'],
                "interfacePrefix": ext.spec['interfacePrefix'],
                "interfaceRefreshInterval": ext.spec['interfaceRefreshInterval'],
                "ipipEnabled": ext.spec['ipipEnabled'],
                "ipipMTU": ext.spec['ipipMTU'],
                "ipsetsRefreshInterval": ext.spec['ipsetsRefreshInterval'],
                "iptablesBackend": ext.spec['iptablesBackend'],
                "iptablesFilterAllowAction": ext.spec['iptablesFilterAllowAction'],
                "iptablesLockFilePath": ext.spec['iptablesLockFilePath'],
                "iptablesLockProbeInterval": ext.spec['iptablesLockProbeInterval'],
                "iptablesLockTimeout": ext.spec['iptablesLockTimeout'],
                "iptablesMangleAllowAction": ext.spec['iptablesMangleAllowAction'],
                "iptablesMarkMask": ext.spec['iptablesMarkMask'],
                "iptablesNATOutgoingInterfaceFilter": ext.spec['iptablesNATOutgoingInterfaceFilter'],
                "iptablesPostWriteCheckInterval": ext.spec['iptablesPostWriteCheckInterval'],
                "iptablesRefreshInterval": ext.spec['iptablesRefreshInterval'],
                "ipv6Support": ext.spec['ipv6Support'],
                "kubeNodePortRanges": ext.spec['kubeNodePortRanges'],
                "logDebugFilenameRegex": ext.spec['logDebugFilenameRegex'],
                "logFilePath": ext.spec['logFilePath'],
                "logPrefix": ext.spec['logPrefix'],
                "logSeverityFile": ext.spec['logSeverityFile'],
                "logSeverityScreen": ext.spec['logSeverityScreen'],
                "logSeveritySys": ext.spec['logSeveritySys'],
                "maxIpsetSize": ext.spec['maxIpsetSize'],
                "metadataAddr": ext.spec['metadataAddr'],
                "metadataPort": ext.spec['metadataPort'],
                "mtuIfacePattern": ext.spec['mtuIfacePattern'],
                "natOutgoingAddress": ext.spec['natOutgoingAddress'],
                "natPortRange": ext.spec['natPortRange'],
                "netlinkTimeout": ext.spec['netlinkTimeout'],
                "openstackRegion": ext.spec['openstackRegion'],
                "policySyncPathPrefix": ext.spec['policySyncPathPrefix'],
                "prometheusGoMetricsEnabled": ext.spec['prometheusGoMetricsEnabled'],
                "prometheusMetricsEnabled": ext.spec['prometheusMetricsEnabled'],
                "prometheusMetricsHost": ext.spec['prometheusMetricsHost'],
                "prometheusMetricsPort": ext.spec['prometheusMetricsPort'],
                "prometheusProcessMetricsEnabled": ext.spec['prometheusProcessMetricsEnabled'],
                "prometheusWireGuardMetricsEnabled": ext.spec['prometheusWireGuardMetricsEnabled'],
                "removeExternalRoutes": ext.spec['removeExternalRoutes'],
                "reportingInterval": ext.spec['reportingInterval'],
                "reportingTTL": ext.spec['reportingTTL'],
                "routeRefreshInterval": ext.spec['routeRefreshInterval'],
                "routeSource": ext.spec['routeSource'],
                "routeSyncDisabled": ext.spec['routeSyncDisabled'],
                "routeTableRange": ext.spec['routeTableRange'],
                "routeTableRanges": ext.spec['routeTableRanges'],
                "serviceLoopPrevention": ext.spec['serviceLoopPrevention'],
                "sidecarAccelerationEnabled": ext.spec['sidecarAccelerationEnabled'],
                "usageReportingEnabled": ext.spec['usageReportingEnabled'],
                "usageReportingInitialDelay": ext.spec['usageReportingInitialDelay'],
                "usageReportingInterval": ext.spec['usageReportingInterval'],
                "useInternalDataplaneDriver": ext.spec['useInternalDataplaneDriver'],
                "vxlanEnabled": ext.spec['vxlanEnabled'],
                "vxlanMTU": ext.spec['vxlanMTU'],
                "vxlanMTUV6": ext.spec['vxlanMTUV6'],
                "vxlanPort": ext.spec['vxlanPort'],
                "vxlanVNI": ext.spec['vxlanVNI'],
                "wireguardEnabled": ext.spec['wireguardEnabled'],
                "wireguardEnabledV6": ext.spec['wireguardEnabledV6'],
                "wireguardHostEncryptionEnabled": ext.spec['wireguardHostEncryptionEnabled'],
                "wireguardInterfaceName": ext.spec['wireguardInterfaceName'],
                "wireguardInterfaceNameV6": ext.spec['wireguardInterfaceNameV6'],
                "wireguardKeepAlive": ext.spec['wireguardKeepAlive'],
                "wireguardListeningPort": ext.spec['wireguardListeningPort'],
                "wireguardListeningPortV6": ext.spec['wireguardListeningPortV6'],
                "wireguardMTU": ext.spec['wireguardMTU'],
                "wireguardMTUV6": ext.spec['wireguardMTUV6'],
                "wireguardRoutingRulePriority": ext.spec['wireguardRoutingRulePriority'],
                "workloadSourceSpoofing": ext.spec['workloadSourceSpoofing'],
                "xdpEnabled": ext.spec['xdpEnabled'],
                "xdpRefreshInterval": ext.spec['xdpRefreshInterval'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchProjectcalicoFelixConfiguration: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['allowIPIPPacketsFromWorkloads'] !== undefined && typeof args['spec']['allowIPIPPacketsFromWorkloads'] == 'boolean') spec['allowIPIPPacketsFromWorkloads'] = args['spec']['allowIPIPPacketsFromWorkloads'];
        if (args['spec']['allowVXLANPacketsFromWorkloads'] !== undefined && typeof args['spec']['allowVXLANPacketsFromWorkloads'] == 'boolean') spec['allowVXLANPacketsFromWorkloads'] = args['spec']['allowVXLANPacketsFromWorkloads'];
        if (args['spec']['awsSrcDstCheck'] !== undefined && typeof args['spec']['awsSrcDstCheck'] == 'string') spec['awsSrcDstCheck'] = args['spec']['awsSrcDstCheck'];
        if (args['spec']['bpfConnectTimeLoadBalancingEnabled'] !== undefined && typeof args['spec']['bpfConnectTimeLoadBalancingEnabled'] == 'boolean') spec['bpfConnectTimeLoadBalancingEnabled'] = args['spec']['bpfConnectTimeLoadBalancingEnabled'];
        if (args['spec']['bpfDataIfacePattern'] !== undefined && typeof args['spec']['bpfDataIfacePattern'] == 'string') spec['bpfDataIfacePattern'] = args['spec']['bpfDataIfacePattern'];
        if (args['spec']['bpfDisableUnprivileged'] !== undefined && typeof args['spec']['bpfDisableUnprivileged'] == 'boolean') spec['bpfDisableUnprivileged'] = args['spec']['bpfDisableUnprivileged'];
        if (args['spec']['bpfEnabled'] !== undefined && typeof args['spec']['bpfEnabled'] == 'boolean') spec['bpfEnabled'] = args['spec']['bpfEnabled'];
        if (args['spec']['bpfEnforceRPF'] !== undefined && typeof args['spec']['bpfEnforceRPF'] == 'string') spec['bpfEnforceRPF'] = args['spec']['bpfEnforceRPF'];
        if (args['spec']['bpfExtToServiceConnmark'] !== undefined && typeof args['spec']['bpfExtToServiceConnmark'] == 'number') spec['bpfExtToServiceConnmark'] = args['spec']['bpfExtToServiceConnmark'];
        if (args['spec']['bpfExternalServiceMode'] !== undefined && typeof args['spec']['bpfExternalServiceMode'] == 'string') spec['bpfExternalServiceMode'] = args['spec']['bpfExternalServiceMode'];
        if (args['spec']['bpfHostConntrackBypass'] !== undefined && typeof args['spec']['bpfHostConntrackBypass'] == 'boolean') spec['bpfHostConntrackBypass'] = args['spec']['bpfHostConntrackBypass'];
        if (args['spec']['bpfKubeProxyEndpointSlicesEnabled'] !== undefined && typeof args['spec']['bpfKubeProxyEndpointSlicesEnabled'] == 'boolean') spec['bpfKubeProxyEndpointSlicesEnabled'] = args['spec']['bpfKubeProxyEndpointSlicesEnabled'];
        if (args['spec']['bpfKubeProxyIptablesCleanupEnabled'] !== undefined && typeof args['spec']['bpfKubeProxyIptablesCleanupEnabled'] == 'boolean') spec['bpfKubeProxyIptablesCleanupEnabled'] = args['spec']['bpfKubeProxyIptablesCleanupEnabled'];
        if (args['spec']['bpfKubeProxyMinSyncPeriod'] !== undefined && typeof args['spec']['bpfKubeProxyMinSyncPeriod'] == 'string') spec['bpfKubeProxyMinSyncPeriod'] = args['spec']['bpfKubeProxyMinSyncPeriod'];
        if (args['spec']['bpfL3IfacePattern'] !== undefined && typeof args['spec']['bpfL3IfacePattern'] == 'string') spec['bpfL3IfacePattern'] = args['spec']['bpfL3IfacePattern'];
        if (args['spec']['bpfLogLevel'] !== undefined && typeof args['spec']['bpfLogLevel'] == 'string') spec['bpfLogLevel'] = args['spec']['bpfLogLevel'];
        if (args['spec']['bpfMapSizeConntrack'] !== undefined && typeof args['spec']['bpfMapSizeConntrack'] == 'number') spec['bpfMapSizeConntrack'] = args['spec']['bpfMapSizeConntrack'];
        if (args['spec']['bpfMapSizeIPSets'] !== undefined && typeof args['spec']['bpfMapSizeIPSets'] == 'number') spec['bpfMapSizeIPSets'] = args['spec']['bpfMapSizeIPSets'];
        if (args['spec']['bpfMapSizeIfState'] !== undefined && typeof args['spec']['bpfMapSizeIfState'] == 'number') spec['bpfMapSizeIfState'] = args['spec']['bpfMapSizeIfState'];
        if (args['spec']['bpfMapSizeNATAffinity'] !== undefined && typeof args['spec']['bpfMapSizeNATAffinity'] == 'number') spec['bpfMapSizeNATAffinity'] = args['spec']['bpfMapSizeNATAffinity'];
        if (args['spec']['bpfMapSizeNATBackend'] !== undefined && typeof args['spec']['bpfMapSizeNATBackend'] == 'number') spec['bpfMapSizeNATBackend'] = args['spec']['bpfMapSizeNATBackend'];
        if (args['spec']['bpfMapSizeNATFrontend'] !== undefined && typeof args['spec']['bpfMapSizeNATFrontend'] == 'number') spec['bpfMapSizeNATFrontend'] = args['spec']['bpfMapSizeNATFrontend'];
        if (args['spec']['bpfMapSizeRoute'] !== undefined && typeof args['spec']['bpfMapSizeRoute'] == 'number') spec['bpfMapSizeRoute'] = args['spec']['bpfMapSizeRoute'];
        if (args['spec']['bpfPSNATPorts'] !== undefined) spec['bpfPSNATPorts'] = args['spec']['bpfPSNATPorts'];
        if (args['spec']['bpfPolicyDebugEnabled'] !== undefined && typeof args['spec']['bpfPolicyDebugEnabled'] == 'boolean') spec['bpfPolicyDebugEnabled'] = args['spec']['bpfPolicyDebugEnabled'];
        if (args['spec']['chainInsertMode'] !== undefined && typeof args['spec']['chainInsertMode'] == 'string') spec['chainInsertMode'] = args['spec']['chainInsertMode'];
        if (args['spec']['dataplaneDriver'] !== undefined && typeof args['spec']['dataplaneDriver'] == 'string') spec['dataplaneDriver'] = args['spec']['dataplaneDriver'];
        if (args['spec']['dataplaneWatchdogTimeout'] !== undefined && typeof args['spec']['dataplaneWatchdogTimeout'] == 'string') spec['dataplaneWatchdogTimeout'] = args['spec']['dataplaneWatchdogTimeout'];
        if (args['spec']['debugDisableLogDropping'] !== undefined && typeof args['spec']['debugDisableLogDropping'] == 'boolean') spec['debugDisableLogDropping'] = args['spec']['debugDisableLogDropping'];
        if (args['spec']['debugMemoryProfilePath'] !== undefined && typeof args['spec']['debugMemoryProfilePath'] == 'string') spec['debugMemoryProfilePath'] = args['spec']['debugMemoryProfilePath'];
        if (args['spec']['debugSimulateCalcGraphHangAfter'] !== undefined && typeof args['spec']['debugSimulateCalcGraphHangAfter'] == 'string') spec['debugSimulateCalcGraphHangAfter'] = args['spec']['debugSimulateCalcGraphHangAfter'];
        if (args['spec']['debugSimulateDataplaneHangAfter'] !== undefined && typeof args['spec']['debugSimulateDataplaneHangAfter'] == 'string') spec['debugSimulateDataplaneHangAfter'] = args['spec']['debugSimulateDataplaneHangAfter'];
        if (args['spec']['defaultEndpointToHostAction'] !== undefined && typeof args['spec']['defaultEndpointToHostAction'] == 'string') spec['defaultEndpointToHostAction'] = args['spec']['defaultEndpointToHostAction'];
        if (args['spec']['deviceRouteProtocol'] !== undefined && typeof args['spec']['deviceRouteProtocol'] == 'number') spec['deviceRouteProtocol'] = args['spec']['deviceRouteProtocol'];
        if (args['spec']['deviceRouteSourceAddress'] !== undefined && typeof args['spec']['deviceRouteSourceAddress'] == 'string') spec['deviceRouteSourceAddress'] = args['spec']['deviceRouteSourceAddress'];
        if (args['spec']['deviceRouteSourceAddressIPv6'] !== undefined && typeof args['spec']['deviceRouteSourceAddressIPv6'] == 'string') spec['deviceRouteSourceAddressIPv6'] = args['spec']['deviceRouteSourceAddressIPv6'];
        if (args['spec']['disableConntrackInvalidCheck'] !== undefined && typeof args['spec']['disableConntrackInvalidCheck'] == 'boolean') spec['disableConntrackInvalidCheck'] = args['spec']['disableConntrackInvalidCheck'];
        if (args['spec']['endpointReportingDelay'] !== undefined && typeof args['spec']['endpointReportingDelay'] == 'string') spec['endpointReportingDelay'] = args['spec']['endpointReportingDelay'];
        if (args['spec']['endpointReportingEnabled'] !== undefined && typeof args['spec']['endpointReportingEnabled'] == 'boolean') spec['endpointReportingEnabled'] = args['spec']['endpointReportingEnabled'];
        if (args['spec']['externalNodesList'] !== undefined && Array.isArray(args['spec']['externalNodesList'])) spec['externalNodesList'] = args['spec']['externalNodesList'];
        if (args['spec']['failsafeInboundHostPorts'] !== undefined && Array.isArray(args['spec']['failsafeInboundHostPorts'])) spec['failsafeInboundHostPorts'] = args['spec']['failsafeInboundHostPorts'];
        if (args['spec']['failsafeOutboundHostPorts'] !== undefined && Array.isArray(args['spec']['failsafeOutboundHostPorts'])) spec['failsafeOutboundHostPorts'] = args['spec']['failsafeOutboundHostPorts'];
        if (args['spec']['featureDetectOverride'] !== undefined && typeof args['spec']['featureDetectOverride'] == 'string') spec['featureDetectOverride'] = args['spec']['featureDetectOverride'];
        if (args['spec']['featureGates'] !== undefined && typeof args['spec']['featureGates'] == 'string') spec['featureGates'] = args['spec']['featureGates'];
        if (args['spec']['floatingIPs'] !== undefined && typeof args['spec']['floatingIPs'] == 'string') spec['floatingIPs'] = args['spec']['floatingIPs'];
        if (args['spec']['genericXDPEnabled'] !== undefined && typeof args['spec']['genericXDPEnabled'] == 'boolean') spec['genericXDPEnabled'] = args['spec']['genericXDPEnabled'];
        if (args['spec']['healthEnabled'] !== undefined && typeof args['spec']['healthEnabled'] == 'boolean') spec['healthEnabled'] = args['spec']['healthEnabled'];
        if (args['spec']['healthHost'] !== undefined && typeof args['spec']['healthHost'] == 'string') spec['healthHost'] = args['spec']['healthHost'];
        if (args['spec']['healthPort'] !== undefined && typeof args['spec']['healthPort'] == 'number') spec['healthPort'] = args['spec']['healthPort'];
        if (args['spec']['healthTimeoutOverrides'] !== undefined && Array.isArray(args['spec']['healthTimeoutOverrides'])) spec['healthTimeoutOverrides'] = args['spec']['healthTimeoutOverrides'];
        if (args['spec']['interfaceExclude'] !== undefined && typeof args['spec']['interfaceExclude'] == 'string') spec['interfaceExclude'] = args['spec']['interfaceExclude'];
        if (args['spec']['interfacePrefix'] !== undefined && typeof args['spec']['interfacePrefix'] == 'string') spec['interfacePrefix'] = args['spec']['interfacePrefix'];
        if (args['spec']['interfaceRefreshInterval'] !== undefined && typeof args['spec']['interfaceRefreshInterval'] == 'string') spec['interfaceRefreshInterval'] = args['spec']['interfaceRefreshInterval'];
        if (args['spec']['ipipEnabled'] !== undefined && typeof args['spec']['ipipEnabled'] == 'boolean') spec['ipipEnabled'] = args['spec']['ipipEnabled'];
        if (args['spec']['ipipMTU'] !== undefined && typeof args['spec']['ipipMTU'] == 'number') spec['ipipMTU'] = args['spec']['ipipMTU'];
        if (args['spec']['ipsetsRefreshInterval'] !== undefined && typeof args['spec']['ipsetsRefreshInterval'] == 'string') spec['ipsetsRefreshInterval'] = args['spec']['ipsetsRefreshInterval'];
        if (args['spec']['iptablesBackend'] !== undefined && typeof args['spec']['iptablesBackend'] == 'string') spec['iptablesBackend'] = args['spec']['iptablesBackend'];
        if (args['spec']['iptablesFilterAllowAction'] !== undefined && typeof args['spec']['iptablesFilterAllowAction'] == 'string') spec['iptablesFilterAllowAction'] = args['spec']['iptablesFilterAllowAction'];
        if (args['spec']['iptablesLockFilePath'] !== undefined && typeof args['spec']['iptablesLockFilePath'] == 'string') spec['iptablesLockFilePath'] = args['spec']['iptablesLockFilePath'];
        if (args['spec']['iptablesLockProbeInterval'] !== undefined && typeof args['spec']['iptablesLockProbeInterval'] == 'string') spec['iptablesLockProbeInterval'] = args['spec']['iptablesLockProbeInterval'];
        if (args['spec']['iptablesLockTimeout'] !== undefined && typeof args['spec']['iptablesLockTimeout'] == 'string') spec['iptablesLockTimeout'] = args['spec']['iptablesLockTimeout'];
        if (args['spec']['iptablesMangleAllowAction'] !== undefined && typeof args['spec']['iptablesMangleAllowAction'] == 'string') spec['iptablesMangleAllowAction'] = args['spec']['iptablesMangleAllowAction'];
        if (args['spec']['iptablesMarkMask'] !== undefined && typeof args['spec']['iptablesMarkMask'] == 'number') spec['iptablesMarkMask'] = args['spec']['iptablesMarkMask'];
        if (args['spec']['iptablesNATOutgoingInterfaceFilter'] !== undefined && typeof args['spec']['iptablesNATOutgoingInterfaceFilter'] == 'string') spec['iptablesNATOutgoingInterfaceFilter'] = args['spec']['iptablesNATOutgoingInterfaceFilter'];
        if (args['spec']['iptablesPostWriteCheckInterval'] !== undefined && typeof args['spec']['iptablesPostWriteCheckInterval'] == 'string') spec['iptablesPostWriteCheckInterval'] = args['spec']['iptablesPostWriteCheckInterval'];
        if (args['spec']['iptablesRefreshInterval'] !== undefined && typeof args['spec']['iptablesRefreshInterval'] == 'string') spec['iptablesRefreshInterval'] = args['spec']['iptablesRefreshInterval'];
        if (args['spec']['ipv6Support'] !== undefined && typeof args['spec']['ipv6Support'] == 'boolean') spec['ipv6Support'] = args['spec']['ipv6Support'];
        if (args['spec']['kubeNodePortRanges'] !== undefined && Array.isArray(args['spec']['kubeNodePortRanges'])) spec['kubeNodePortRanges'] = args['spec']['kubeNodePortRanges'];
        if (args['spec']['logDebugFilenameRegex'] !== undefined && typeof args['spec']['logDebugFilenameRegex'] == 'string') spec['logDebugFilenameRegex'] = args['spec']['logDebugFilenameRegex'];
        if (args['spec']['logFilePath'] !== undefined && typeof args['spec']['logFilePath'] == 'string') spec['logFilePath'] = args['spec']['logFilePath'];
        if (args['spec']['logPrefix'] !== undefined && typeof args['spec']['logPrefix'] == 'string') spec['logPrefix'] = args['spec']['logPrefix'];
        if (args['spec']['logSeverityFile'] !== undefined && typeof args['spec']['logSeverityFile'] == 'string') spec['logSeverityFile'] = args['spec']['logSeverityFile'];
        if (args['spec']['logSeverityScreen'] !== undefined && typeof args['spec']['logSeverityScreen'] == 'string') spec['logSeverityScreen'] = args['spec']['logSeverityScreen'];
        if (args['spec']['logSeveritySys'] !== undefined && typeof args['spec']['logSeveritySys'] == 'string') spec['logSeveritySys'] = args['spec']['logSeveritySys'];
        if (args['spec']['maxIpsetSize'] !== undefined && typeof args['spec']['maxIpsetSize'] == 'number') spec['maxIpsetSize'] = args['spec']['maxIpsetSize'];
        if (args['spec']['metadataAddr'] !== undefined && typeof args['spec']['metadataAddr'] == 'string') spec['metadataAddr'] = args['spec']['metadataAddr'];
        if (args['spec']['metadataPort'] !== undefined && typeof args['spec']['metadataPort'] == 'number') spec['metadataPort'] = args['spec']['metadataPort'];
        if (args['spec']['mtuIfacePattern'] !== undefined && typeof args['spec']['mtuIfacePattern'] == 'string') spec['mtuIfacePattern'] = args['spec']['mtuIfacePattern'];
        if (args['spec']['natOutgoingAddress'] !== undefined && typeof args['spec']['natOutgoingAddress'] == 'string') spec['natOutgoingAddress'] = args['spec']['natOutgoingAddress'];
        if (args['spec']['natPortRange'] !== undefined) spec['natPortRange'] = args['spec']['natPortRange'];
        if (args['spec']['netlinkTimeout'] !== undefined && typeof args['spec']['netlinkTimeout'] == 'string') spec['netlinkTimeout'] = args['spec']['netlinkTimeout'];
        if (args['spec']['openstackRegion'] !== undefined && typeof args['spec']['openstackRegion'] == 'string') spec['openstackRegion'] = args['spec']['openstackRegion'];
        if (args['spec']['policySyncPathPrefix'] !== undefined && typeof args['spec']['policySyncPathPrefix'] == 'string') spec['policySyncPathPrefix'] = args['spec']['policySyncPathPrefix'];
        if (args['spec']['prometheusGoMetricsEnabled'] !== undefined && typeof args['spec']['prometheusGoMetricsEnabled'] == 'boolean') spec['prometheusGoMetricsEnabled'] = args['spec']['prometheusGoMetricsEnabled'];
        if (args['spec']['prometheusMetricsEnabled'] !== undefined && typeof args['spec']['prometheusMetricsEnabled'] == 'boolean') spec['prometheusMetricsEnabled'] = args['spec']['prometheusMetricsEnabled'];
        if (args['spec']['prometheusMetricsHost'] !== undefined && typeof args['spec']['prometheusMetricsHost'] == 'string') spec['prometheusMetricsHost'] = args['spec']['prometheusMetricsHost'];
        if (args['spec']['prometheusMetricsPort'] !== undefined && typeof args['spec']['prometheusMetricsPort'] == 'number') spec['prometheusMetricsPort'] = args['spec']['prometheusMetricsPort'];
        if (args['spec']['prometheusProcessMetricsEnabled'] !== undefined && typeof args['spec']['prometheusProcessMetricsEnabled'] == 'boolean') spec['prometheusProcessMetricsEnabled'] = args['spec']['prometheusProcessMetricsEnabled'];
        if (args['spec']['prometheusWireGuardMetricsEnabled'] !== undefined && typeof args['spec']['prometheusWireGuardMetricsEnabled'] == 'boolean') spec['prometheusWireGuardMetricsEnabled'] = args['spec']['prometheusWireGuardMetricsEnabled'];
        if (args['spec']['removeExternalRoutes'] !== undefined && typeof args['spec']['removeExternalRoutes'] == 'boolean') spec['removeExternalRoutes'] = args['spec']['removeExternalRoutes'];
        if (args['spec']['reportingInterval'] !== undefined && typeof args['spec']['reportingInterval'] == 'string') spec['reportingInterval'] = args['spec']['reportingInterval'];
        if (args['spec']['reportingTTL'] !== undefined && typeof args['spec']['reportingTTL'] == 'string') spec['reportingTTL'] = args['spec']['reportingTTL'];
        if (args['spec']['routeRefreshInterval'] !== undefined && typeof args['spec']['routeRefreshInterval'] == 'string') spec['routeRefreshInterval'] = args['spec']['routeRefreshInterval'];
        if (args['spec']['routeSource'] !== undefined && typeof args['spec']['routeSource'] == 'string') spec['routeSource'] = args['spec']['routeSource'];
        if (args['spec']['routeSyncDisabled'] !== undefined && typeof args['spec']['routeSyncDisabled'] == 'boolean') spec['routeSyncDisabled'] = args['spec']['routeSyncDisabled'];
        if (args['spec']['routeTableRange'] !== undefined && typeof args['spec']['routeTableRange'] == 'object') spec['routeTableRange'] = args['spec']['routeTableRange'];
        if (args['spec']['routeTableRanges'] !== undefined && Array.isArray(args['spec']['routeTableRanges'])) spec['routeTableRanges'] = args['spec']['routeTableRanges'];
        if (args['spec']['serviceLoopPrevention'] !== undefined && typeof args['spec']['serviceLoopPrevention'] == 'string') spec['serviceLoopPrevention'] = args['spec']['serviceLoopPrevention'];
        if (args['spec']['sidecarAccelerationEnabled'] !== undefined && typeof args['spec']['sidecarAccelerationEnabled'] == 'boolean') spec['sidecarAccelerationEnabled'] = args['spec']['sidecarAccelerationEnabled'];
        if (args['spec']['usageReportingEnabled'] !== undefined && typeof args['spec']['usageReportingEnabled'] == 'boolean') spec['usageReportingEnabled'] = args['spec']['usageReportingEnabled'];
        if (args['spec']['usageReportingInitialDelay'] !== undefined && typeof args['spec']['usageReportingInitialDelay'] == 'string') spec['usageReportingInitialDelay'] = args['spec']['usageReportingInitialDelay'];
        if (args['spec']['usageReportingInterval'] !== undefined && typeof args['spec']['usageReportingInterval'] == 'string') spec['usageReportingInterval'] = args['spec']['usageReportingInterval'];
        if (args['spec']['useInternalDataplaneDriver'] !== undefined && typeof args['spec']['useInternalDataplaneDriver'] == 'boolean') spec['useInternalDataplaneDriver'] = args['spec']['useInternalDataplaneDriver'];
        if (args['spec']['vxlanEnabled'] !== undefined && typeof args['spec']['vxlanEnabled'] == 'boolean') spec['vxlanEnabled'] = args['spec']['vxlanEnabled'];
        if (args['spec']['vxlanMTU'] !== undefined && typeof args['spec']['vxlanMTU'] == 'number') spec['vxlanMTU'] = args['spec']['vxlanMTU'];
        if (args['spec']['vxlanMTUV6'] !== undefined && typeof args['spec']['vxlanMTUV6'] == 'number') spec['vxlanMTUV6'] = args['spec']['vxlanMTUV6'];
        if (args['spec']['vxlanPort'] !== undefined && typeof args['spec']['vxlanPort'] == 'number') spec['vxlanPort'] = args['spec']['vxlanPort'];
        if (args['spec']['vxlanVNI'] !== undefined && typeof args['spec']['vxlanVNI'] == 'number') spec['vxlanVNI'] = args['spec']['vxlanVNI'];
        if (args['spec']['wireguardEnabled'] !== undefined && typeof args['spec']['wireguardEnabled'] == 'boolean') spec['wireguardEnabled'] = args['spec']['wireguardEnabled'];
        if (args['spec']['wireguardEnabledV6'] !== undefined && typeof args['spec']['wireguardEnabledV6'] == 'boolean') spec['wireguardEnabledV6'] = args['spec']['wireguardEnabledV6'];
        if (args['spec']['wireguardHostEncryptionEnabled'] !== undefined && typeof args['spec']['wireguardHostEncryptionEnabled'] == 'boolean') spec['wireguardHostEncryptionEnabled'] = args['spec']['wireguardHostEncryptionEnabled'];
        if (args['spec']['wireguardInterfaceName'] !== undefined && typeof args['spec']['wireguardInterfaceName'] == 'string') spec['wireguardInterfaceName'] = args['spec']['wireguardInterfaceName'];
        if (args['spec']['wireguardInterfaceNameV6'] !== undefined && typeof args['spec']['wireguardInterfaceNameV6'] == 'string') spec['wireguardInterfaceNameV6'] = args['spec']['wireguardInterfaceNameV6'];
        if (args['spec']['wireguardKeepAlive'] !== undefined && typeof args['spec']['wireguardKeepAlive'] == 'string') spec['wireguardKeepAlive'] = args['spec']['wireguardKeepAlive'];
        if (args['spec']['wireguardListeningPort'] !== undefined && typeof args['spec']['wireguardListeningPort'] == 'number') spec['wireguardListeningPort'] = args['spec']['wireguardListeningPort'];
        if (args['spec']['wireguardListeningPortV6'] !== undefined && typeof args['spec']['wireguardListeningPortV6'] == 'number') spec['wireguardListeningPortV6'] = args['spec']['wireguardListeningPortV6'];
        if (args['spec']['wireguardMTU'] !== undefined && typeof args['spec']['wireguardMTU'] == 'number') spec['wireguardMTU'] = args['spec']['wireguardMTU'];
        if (args['spec']['wireguardMTUV6'] !== undefined && typeof args['spec']['wireguardMTUV6'] == 'number') spec['wireguardMTUV6'] = args['spec']['wireguardMTUV6'];
        if (args['spec']['wireguardRoutingRulePriority'] !== undefined && typeof args['spec']['wireguardRoutingRulePriority'] == 'number') spec['wireguardRoutingRulePriority'] = args['spec']['wireguardRoutingRulePriority'];
        if (args['spec']['workloadSourceSpoofing'] !== undefined && typeof args['spec']['workloadSourceSpoofing'] == 'string') spec['workloadSourceSpoofing'] = args['spec']['workloadSourceSpoofing'];
        if (args['spec']['xdpEnabled'] !== undefined && typeof args['spec']['xdpEnabled'] == 'boolean') spec['xdpEnabled'] = args['spec']['xdpEnabled'];
        if (args['spec']['xdpRefreshInterval'] !== undefined && typeof args['spec']['xdpRefreshInterval'] == 'string') spec['xdpRefreshInterval'] = args['spec']['xdpRefreshInterval'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'FelixConfiguration',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','felixconfigurations', args['name'])
            const extGet = resGet.body as ProjectcalicoFelixConfiguration
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','felixconfigurations', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as ProjectcalicoFelixConfiguration
            return {
                metadata: getMetadata(ext.metadata, ext),
                "allowIPIPPacketsFromWorkloads": ext.spec['allowIPIPPacketsFromWorkloads'],
                "allowVXLANPacketsFromWorkloads": ext.spec['allowVXLANPacketsFromWorkloads'],
                "awsSrcDstCheck": ext.spec['awsSrcDstCheck'],
                "bpfConnectTimeLoadBalancingEnabled": ext.spec['bpfConnectTimeLoadBalancingEnabled'],
                "bpfDataIfacePattern": ext.spec['bpfDataIfacePattern'],
                "bpfDisableUnprivileged": ext.spec['bpfDisableUnprivileged'],
                "bpfEnabled": ext.spec['bpfEnabled'],
                "bpfEnforceRPF": ext.spec['bpfEnforceRPF'],
                "bpfExtToServiceConnmark": ext.spec['bpfExtToServiceConnmark'],
                "bpfExternalServiceMode": ext.spec['bpfExternalServiceMode'],
                "bpfHostConntrackBypass": ext.spec['bpfHostConntrackBypass'],
                "bpfKubeProxyEndpointSlicesEnabled": ext.spec['bpfKubeProxyEndpointSlicesEnabled'],
                "bpfKubeProxyIptablesCleanupEnabled": ext.spec['bpfKubeProxyIptablesCleanupEnabled'],
                "bpfKubeProxyMinSyncPeriod": ext.spec['bpfKubeProxyMinSyncPeriod'],
                "bpfL3IfacePattern": ext.spec['bpfL3IfacePattern'],
                "bpfLogLevel": ext.spec['bpfLogLevel'],
                "bpfMapSizeConntrack": ext.spec['bpfMapSizeConntrack'],
                "bpfMapSizeIPSets": ext.spec['bpfMapSizeIPSets'],
                "bpfMapSizeIfState": ext.spec['bpfMapSizeIfState'],
                "bpfMapSizeNATAffinity": ext.spec['bpfMapSizeNATAffinity'],
                "bpfMapSizeNATBackend": ext.spec['bpfMapSizeNATBackend'],
                "bpfMapSizeNATFrontend": ext.spec['bpfMapSizeNATFrontend'],
                "bpfMapSizeRoute": ext.spec['bpfMapSizeRoute'],
                "bpfPSNATPorts": ext.spec['bpfPSNATPorts'],
                "bpfPolicyDebugEnabled": ext.spec['bpfPolicyDebugEnabled'],
                "chainInsertMode": ext.spec['chainInsertMode'],
                "dataplaneDriver": ext.spec['dataplaneDriver'],
                "dataplaneWatchdogTimeout": ext.spec['dataplaneWatchdogTimeout'],
                "debugDisableLogDropping": ext.spec['debugDisableLogDropping'],
                "debugMemoryProfilePath": ext.spec['debugMemoryProfilePath'],
                "debugSimulateCalcGraphHangAfter": ext.spec['debugSimulateCalcGraphHangAfter'],
                "debugSimulateDataplaneHangAfter": ext.spec['debugSimulateDataplaneHangAfter'],
                "defaultEndpointToHostAction": ext.spec['defaultEndpointToHostAction'],
                "deviceRouteProtocol": ext.spec['deviceRouteProtocol'],
                "deviceRouteSourceAddress": ext.spec['deviceRouteSourceAddress'],
                "deviceRouteSourceAddressIPv6": ext.spec['deviceRouteSourceAddressIPv6'],
                "disableConntrackInvalidCheck": ext.spec['disableConntrackInvalidCheck'],
                "endpointReportingDelay": ext.spec['endpointReportingDelay'],
                "endpointReportingEnabled": ext.spec['endpointReportingEnabled'],
                "externalNodesList": ext.spec['externalNodesList'],
                "failsafeInboundHostPorts": ext.spec['failsafeInboundHostPorts'],
                "failsafeOutboundHostPorts": ext.spec['failsafeOutboundHostPorts'],
                "featureDetectOverride": ext.spec['featureDetectOverride'],
                "featureGates": ext.spec['featureGates'],
                "floatingIPs": ext.spec['floatingIPs'],
                "genericXDPEnabled": ext.spec['genericXDPEnabled'],
                "healthEnabled": ext.spec['healthEnabled'],
                "healthHost": ext.spec['healthHost'],
                "healthPort": ext.spec['healthPort'],
                "healthTimeoutOverrides": ext.spec['healthTimeoutOverrides'],
                "interfaceExclude": ext.spec['interfaceExclude'],
                "interfacePrefix": ext.spec['interfacePrefix'],
                "interfaceRefreshInterval": ext.spec['interfaceRefreshInterval'],
                "ipipEnabled": ext.spec['ipipEnabled'],
                "ipipMTU": ext.spec['ipipMTU'],
                "ipsetsRefreshInterval": ext.spec['ipsetsRefreshInterval'],
                "iptablesBackend": ext.spec['iptablesBackend'],
                "iptablesFilterAllowAction": ext.spec['iptablesFilterAllowAction'],
                "iptablesLockFilePath": ext.spec['iptablesLockFilePath'],
                "iptablesLockProbeInterval": ext.spec['iptablesLockProbeInterval'],
                "iptablesLockTimeout": ext.spec['iptablesLockTimeout'],
                "iptablesMangleAllowAction": ext.spec['iptablesMangleAllowAction'],
                "iptablesMarkMask": ext.spec['iptablesMarkMask'],
                "iptablesNATOutgoingInterfaceFilter": ext.spec['iptablesNATOutgoingInterfaceFilter'],
                "iptablesPostWriteCheckInterval": ext.spec['iptablesPostWriteCheckInterval'],
                "iptablesRefreshInterval": ext.spec['iptablesRefreshInterval'],
                "ipv6Support": ext.spec['ipv6Support'],
                "kubeNodePortRanges": ext.spec['kubeNodePortRanges'],
                "logDebugFilenameRegex": ext.spec['logDebugFilenameRegex'],
                "logFilePath": ext.spec['logFilePath'],
                "logPrefix": ext.spec['logPrefix'],
                "logSeverityFile": ext.spec['logSeverityFile'],
                "logSeverityScreen": ext.spec['logSeverityScreen'],
                "logSeveritySys": ext.spec['logSeveritySys'],
                "maxIpsetSize": ext.spec['maxIpsetSize'],
                "metadataAddr": ext.spec['metadataAddr'],
                "metadataPort": ext.spec['metadataPort'],
                "mtuIfacePattern": ext.spec['mtuIfacePattern'],
                "natOutgoingAddress": ext.spec['natOutgoingAddress'],
                "natPortRange": ext.spec['natPortRange'],
                "netlinkTimeout": ext.spec['netlinkTimeout'],
                "openstackRegion": ext.spec['openstackRegion'],
                "policySyncPathPrefix": ext.spec['policySyncPathPrefix'],
                "prometheusGoMetricsEnabled": ext.spec['prometheusGoMetricsEnabled'],
                "prometheusMetricsEnabled": ext.spec['prometheusMetricsEnabled'],
                "prometheusMetricsHost": ext.spec['prometheusMetricsHost'],
                "prometheusMetricsPort": ext.spec['prometheusMetricsPort'],
                "prometheusProcessMetricsEnabled": ext.spec['prometheusProcessMetricsEnabled'],
                "prometheusWireGuardMetricsEnabled": ext.spec['prometheusWireGuardMetricsEnabled'],
                "removeExternalRoutes": ext.spec['removeExternalRoutes'],
                "reportingInterval": ext.spec['reportingInterval'],
                "reportingTTL": ext.spec['reportingTTL'],
                "routeRefreshInterval": ext.spec['routeRefreshInterval'],
                "routeSource": ext.spec['routeSource'],
                "routeSyncDisabled": ext.spec['routeSyncDisabled'],
                "routeTableRange": ext.spec['routeTableRange'],
                "routeTableRanges": ext.spec['routeTableRanges'],
                "serviceLoopPrevention": ext.spec['serviceLoopPrevention'],
                "sidecarAccelerationEnabled": ext.spec['sidecarAccelerationEnabled'],
                "usageReportingEnabled": ext.spec['usageReportingEnabled'],
                "usageReportingInitialDelay": ext.spec['usageReportingInitialDelay'],
                "usageReportingInterval": ext.spec['usageReportingInterval'],
                "useInternalDataplaneDriver": ext.spec['useInternalDataplaneDriver'],
                "vxlanEnabled": ext.spec['vxlanEnabled'],
                "vxlanMTU": ext.spec['vxlanMTU'],
                "vxlanMTUV6": ext.spec['vxlanMTUV6'],
                "vxlanPort": ext.spec['vxlanPort'],
                "vxlanVNI": ext.spec['vxlanVNI'],
                "wireguardEnabled": ext.spec['wireguardEnabled'],
                "wireguardEnabledV6": ext.spec['wireguardEnabledV6'],
                "wireguardHostEncryptionEnabled": ext.spec['wireguardHostEncryptionEnabled'],
                "wireguardInterfaceName": ext.spec['wireguardInterfaceName'],
                "wireguardInterfaceNameV6": ext.spec['wireguardInterfaceNameV6'],
                "wireguardKeepAlive": ext.spec['wireguardKeepAlive'],
                "wireguardListeningPort": ext.spec['wireguardListeningPort'],
                "wireguardListeningPortV6": ext.spec['wireguardListeningPortV6'],
                "wireguardMTU": ext.spec['wireguardMTU'],
                "wireguardMTUV6": ext.spec['wireguardMTUV6'],
                "wireguardRoutingRulePriority": ext.spec['wireguardRoutingRulePriority'],
                "workloadSourceSpoofing": ext.spec['workloadSourceSpoofing'],
                "xdpEnabled": ext.spec['xdpEnabled'],
                "xdpRefreshInterval": ext.spec['xdpRefreshInterval'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteProjectcalicoFelixConfiguration: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','felixconfigurations', args['name'])
        const ext = res.body as ProjectcalicoFelixConfiguration
        return {
            metadata: getMetadata(ext.metadata, ext),
            "allowIPIPPacketsFromWorkloads": ext.spec['allowIPIPPacketsFromWorkloads'],
            "allowVXLANPacketsFromWorkloads": ext.spec['allowVXLANPacketsFromWorkloads'],
            "awsSrcDstCheck": ext.spec['awsSrcDstCheck'],
            "bpfConnectTimeLoadBalancingEnabled": ext.spec['bpfConnectTimeLoadBalancingEnabled'],
            "bpfDataIfacePattern": ext.spec['bpfDataIfacePattern'],
            "bpfDisableUnprivileged": ext.spec['bpfDisableUnprivileged'],
            "bpfEnabled": ext.spec['bpfEnabled'],
            "bpfEnforceRPF": ext.spec['bpfEnforceRPF'],
            "bpfExtToServiceConnmark": ext.spec['bpfExtToServiceConnmark'],
            "bpfExternalServiceMode": ext.spec['bpfExternalServiceMode'],
            "bpfHostConntrackBypass": ext.spec['bpfHostConntrackBypass'],
            "bpfKubeProxyEndpointSlicesEnabled": ext.spec['bpfKubeProxyEndpointSlicesEnabled'],
            "bpfKubeProxyIptablesCleanupEnabled": ext.spec['bpfKubeProxyIptablesCleanupEnabled'],
            "bpfKubeProxyMinSyncPeriod": ext.spec['bpfKubeProxyMinSyncPeriod'],
            "bpfL3IfacePattern": ext.spec['bpfL3IfacePattern'],
            "bpfLogLevel": ext.spec['bpfLogLevel'],
            "bpfMapSizeConntrack": ext.spec['bpfMapSizeConntrack'],
            "bpfMapSizeIPSets": ext.spec['bpfMapSizeIPSets'],
            "bpfMapSizeIfState": ext.spec['bpfMapSizeIfState'],
            "bpfMapSizeNATAffinity": ext.spec['bpfMapSizeNATAffinity'],
            "bpfMapSizeNATBackend": ext.spec['bpfMapSizeNATBackend'],
            "bpfMapSizeNATFrontend": ext.spec['bpfMapSizeNATFrontend'],
            "bpfMapSizeRoute": ext.spec['bpfMapSizeRoute'],
            "bpfPSNATPorts": ext.spec['bpfPSNATPorts'],
            "bpfPolicyDebugEnabled": ext.spec['bpfPolicyDebugEnabled'],
            "chainInsertMode": ext.spec['chainInsertMode'],
            "dataplaneDriver": ext.spec['dataplaneDriver'],
            "dataplaneWatchdogTimeout": ext.spec['dataplaneWatchdogTimeout'],
            "debugDisableLogDropping": ext.spec['debugDisableLogDropping'],
            "debugMemoryProfilePath": ext.spec['debugMemoryProfilePath'],
            "debugSimulateCalcGraphHangAfter": ext.spec['debugSimulateCalcGraphHangAfter'],
            "debugSimulateDataplaneHangAfter": ext.spec['debugSimulateDataplaneHangAfter'],
            "defaultEndpointToHostAction": ext.spec['defaultEndpointToHostAction'],
            "deviceRouteProtocol": ext.spec['deviceRouteProtocol'],
            "deviceRouteSourceAddress": ext.spec['deviceRouteSourceAddress'],
            "deviceRouteSourceAddressIPv6": ext.spec['deviceRouteSourceAddressIPv6'],
            "disableConntrackInvalidCheck": ext.spec['disableConntrackInvalidCheck'],
            "endpointReportingDelay": ext.spec['endpointReportingDelay'],
            "endpointReportingEnabled": ext.spec['endpointReportingEnabled'],
            "externalNodesList": ext.spec['externalNodesList'],
            "failsafeInboundHostPorts": ext.spec['failsafeInboundHostPorts'],
            "failsafeOutboundHostPorts": ext.spec['failsafeOutboundHostPorts'],
            "featureDetectOverride": ext.spec['featureDetectOverride'],
            "featureGates": ext.spec['featureGates'],
            "floatingIPs": ext.spec['floatingIPs'],
            "genericXDPEnabled": ext.spec['genericXDPEnabled'],
            "healthEnabled": ext.spec['healthEnabled'],
            "healthHost": ext.spec['healthHost'],
            "healthPort": ext.spec['healthPort'],
            "healthTimeoutOverrides": ext.spec['healthTimeoutOverrides'],
            "interfaceExclude": ext.spec['interfaceExclude'],
            "interfacePrefix": ext.spec['interfacePrefix'],
            "interfaceRefreshInterval": ext.spec['interfaceRefreshInterval'],
            "ipipEnabled": ext.spec['ipipEnabled'],
            "ipipMTU": ext.spec['ipipMTU'],
            "ipsetsRefreshInterval": ext.spec['ipsetsRefreshInterval'],
            "iptablesBackend": ext.spec['iptablesBackend'],
            "iptablesFilterAllowAction": ext.spec['iptablesFilterAllowAction'],
            "iptablesLockFilePath": ext.spec['iptablesLockFilePath'],
            "iptablesLockProbeInterval": ext.spec['iptablesLockProbeInterval'],
            "iptablesLockTimeout": ext.spec['iptablesLockTimeout'],
            "iptablesMangleAllowAction": ext.spec['iptablesMangleAllowAction'],
            "iptablesMarkMask": ext.spec['iptablesMarkMask'],
            "iptablesNATOutgoingInterfaceFilter": ext.spec['iptablesNATOutgoingInterfaceFilter'],
            "iptablesPostWriteCheckInterval": ext.spec['iptablesPostWriteCheckInterval'],
            "iptablesRefreshInterval": ext.spec['iptablesRefreshInterval'],
            "ipv6Support": ext.spec['ipv6Support'],
            "kubeNodePortRanges": ext.spec['kubeNodePortRanges'],
            "logDebugFilenameRegex": ext.spec['logDebugFilenameRegex'],
            "logFilePath": ext.spec['logFilePath'],
            "logPrefix": ext.spec['logPrefix'],
            "logSeverityFile": ext.spec['logSeverityFile'],
            "logSeverityScreen": ext.spec['logSeverityScreen'],
            "logSeveritySys": ext.spec['logSeveritySys'],
            "maxIpsetSize": ext.spec['maxIpsetSize'],
            "metadataAddr": ext.spec['metadataAddr'],
            "metadataPort": ext.spec['metadataPort'],
            "mtuIfacePattern": ext.spec['mtuIfacePattern'],
            "natOutgoingAddress": ext.spec['natOutgoingAddress'],
            "natPortRange": ext.spec['natPortRange'],
            "netlinkTimeout": ext.spec['netlinkTimeout'],
            "openstackRegion": ext.spec['openstackRegion'],
            "policySyncPathPrefix": ext.spec['policySyncPathPrefix'],
            "prometheusGoMetricsEnabled": ext.spec['prometheusGoMetricsEnabled'],
            "prometheusMetricsEnabled": ext.spec['prometheusMetricsEnabled'],
            "prometheusMetricsHost": ext.spec['prometheusMetricsHost'],
            "prometheusMetricsPort": ext.spec['prometheusMetricsPort'],
            "prometheusProcessMetricsEnabled": ext.spec['prometheusProcessMetricsEnabled'],
            "prometheusWireGuardMetricsEnabled": ext.spec['prometheusWireGuardMetricsEnabled'],
            "removeExternalRoutes": ext.spec['removeExternalRoutes'],
            "reportingInterval": ext.spec['reportingInterval'],
            "reportingTTL": ext.spec['reportingTTL'],
            "routeRefreshInterval": ext.spec['routeRefreshInterval'],
            "routeSource": ext.spec['routeSource'],
            "routeSyncDisabled": ext.spec['routeSyncDisabled'],
            "routeTableRange": ext.spec['routeTableRange'],
            "routeTableRanges": ext.spec['routeTableRanges'],
            "serviceLoopPrevention": ext.spec['serviceLoopPrevention'],
            "sidecarAccelerationEnabled": ext.spec['sidecarAccelerationEnabled'],
            "usageReportingEnabled": ext.spec['usageReportingEnabled'],
            "usageReportingInitialDelay": ext.spec['usageReportingInitialDelay'],
            "usageReportingInterval": ext.spec['usageReportingInterval'],
            "useInternalDataplaneDriver": ext.spec['useInternalDataplaneDriver'],
            "vxlanEnabled": ext.spec['vxlanEnabled'],
            "vxlanMTU": ext.spec['vxlanMTU'],
            "vxlanMTUV6": ext.spec['vxlanMTUV6'],
            "vxlanPort": ext.spec['vxlanPort'],
            "vxlanVNI": ext.spec['vxlanVNI'],
            "wireguardEnabled": ext.spec['wireguardEnabled'],
            "wireguardEnabledV6": ext.spec['wireguardEnabledV6'],
            "wireguardHostEncryptionEnabled": ext.spec['wireguardHostEncryptionEnabled'],
            "wireguardInterfaceName": ext.spec['wireguardInterfaceName'],
            "wireguardInterfaceNameV6": ext.spec['wireguardInterfaceNameV6'],
            "wireguardKeepAlive": ext.spec['wireguardKeepAlive'],
            "wireguardListeningPort": ext.spec['wireguardListeningPort'],
            "wireguardListeningPortV6": ext.spec['wireguardListeningPortV6'],
            "wireguardMTU": ext.spec['wireguardMTU'],
            "wireguardMTUV6": ext.spec['wireguardMTUV6'],
            "wireguardRoutingRulePriority": ext.spec['wireguardRoutingRulePriority'],
            "workloadSourceSpoofing": ext.spec['workloadSourceSpoofing'],
            "xdpEnabled": ext.spec['xdpEnabled'],
            "xdpRefreshInterval": ext.spec['xdpRefreshInterval'],
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
