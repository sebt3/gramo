<script setup lang="ts">
// noGramoGenerator
import { defineAsyncComponent } from 'vue'
import vynilInstallQuery from '@/queries/vynil/Install.details.graphql'
import InstallDelete from '@/queries/vynil/Install.delete.graphql'
const  vynilInstallView   = defineAsyncComponent(() => import( '@/components/vynil/InstallView.vue'));
const  vynilPackageMeta   = defineAsyncComponent(() => import( '@/components/vynil/PackageMeta.vue'));
const  k8sJobList   = defineAsyncComponent(() => import( '@/components/k8s/JobList.vue'));
const  vynilInstallMeta   = defineAsyncComponent(() => import( '@/components/vynil/InstallMeta.vue'));
const  fluxcdKustomizationMeta   = defineAsyncComponent(() => import( '@/components/fluxcd/KustomizationMeta.vue'));
const  cattleHelmChartList   = defineAsyncComponent(() => import( '@/components/cattle/HelmChartList.vue'));
const  cattleHelmChartConfigList   = defineAsyncComponent(() => import( '@/components/cattle/HelmChartConfigList.vue'));
const  cattleAddonList   = defineAsyncComponent(() => import( '@/components/cattle/AddonList.vue'));
const  certmanagerChallengeList   = defineAsyncComponent(() => import( '@/components/certmanager/ChallengeList.vue'));
const  certmanagerOrderList   = defineAsyncComponent(() => import( '@/components/certmanager/OrderList.vue'));
const  certmanagerCertificateList   = defineAsyncComponent(() => import( '@/components/certmanager/CertificateList.vue'));
const  certmanagerCertificateRequestList   = defineAsyncComponent(() => import( '@/components/certmanager/CertificateRequestList.vue'));
const  certmanagerClusterIssuerList   = defineAsyncComponent(() => import( '@/components/certmanager/ClusterIssuerList.vue'));
const  certmanagerIssuerList   = defineAsyncComponent(() => import( '@/components/certmanager/IssuerList.vue'));
const  ciliumCiliumClusterwideNetworkPolicyList   = defineAsyncComponent(() => import( '@/components/cilium/CiliumClusterwideNetworkPolicyList.vue'));
const  ciliumCiliumEndpointList   = defineAsyncComponent(() => import( '@/components/cilium/CiliumEndpointList.vue'));
const  ciliumCiliumExternalWorkloadList   = defineAsyncComponent(() => import( '@/components/cilium/CiliumExternalWorkloadList.vue'));
const  ciliumCiliumIdentityList   = defineAsyncComponent(() => import( '@/components/cilium/CiliumIdentityList.vue'));
const  ciliumCiliumLocalRedirectPolicyList   = defineAsyncComponent(() => import( '@/components/cilium/CiliumLocalRedirectPolicyList.vue'));
const  ciliumCiliumNetworkPolicyList   = defineAsyncComponent(() => import( '@/components/cilium/CiliumNetworkPolicyList.vue'));
const  ciliumCiliumNodeList   = defineAsyncComponent(() => import( '@/components/cilium/CiliumNodeList.vue'));
const  ciliumCiliumCIDRGroupList   = defineAsyncComponent(() => import( '@/components/cilium/CiliumCIDRGroupList.vue'));
const  ciliumCiliumL2AnnouncementPolicyList   = defineAsyncComponent(() => import( '@/components/cilium/CiliumL2AnnouncementPolicyList.vue'));
const  ciliumCiliumLoadBalancerIPPoolList   = defineAsyncComponent(() => import( '@/components/cilium/CiliumLoadBalancerIPPoolList.vue'));
const  ciliumCiliumNodeConfigList   = defineAsyncComponent(() => import( '@/components/cilium/CiliumNodeConfigList.vue'));
const  ciliumCiliumPodIPPoolList   = defineAsyncComponent(() => import( '@/components/cilium/CiliumPodIPPoolList.vue'));
const  cnpgBackupList   = defineAsyncComponent(() => import( '@/components/cnpg/BackupList.vue'));
const  cnpgClusterList   = defineAsyncComponent(() => import( '@/components/cnpg/ClusterList.vue'));
const  cnpgPoolerList   = defineAsyncComponent(() => import( '@/components/cnpg/PoolerList.vue'));
const  cnpgScheduledBackupList   = defineAsyncComponent(() => import( '@/components/cnpg/ScheduledBackupList.vue'));
const  fluxcdKustomizationList   = defineAsyncComponent(() => import( '@/components/fluxcd/KustomizationList.vue'));
const  fluxcdReceiverList   = defineAsyncComponent(() => import( '@/components/fluxcd/ReceiverList.vue'));
const  fluxcdAlertList   = defineAsyncComponent(() => import( '@/components/fluxcd/AlertList.vue'));
const  fluxcdProviderList   = defineAsyncComponent(() => import( '@/components/fluxcd/ProviderList.vue'));
const  fluxcdGitRepositoryList   = defineAsyncComponent(() => import( '@/components/fluxcd/GitRepositoryList.vue'));
const  fluxcdBucketList   = defineAsyncComponent(() => import( '@/components/fluxcd/BucketList.vue'));
const  fluxcdHelmChartList   = defineAsyncComponent(() => import( '@/components/fluxcd/HelmChartList.vue'));
const  fluxcdHelmRepositoryList   = defineAsyncComponent(() => import( '@/components/fluxcd/HelmRepositoryList.vue'));
const  fluxcdOCIRepositoryList   = defineAsyncComponent(() => import( '@/components/fluxcd/OCIRepositoryList.vue'));
const  fluxcdImageUpdateAutomationList   = defineAsyncComponent(() => import( '@/components/fluxcd/ImageUpdateAutomationList.vue'));
const  fluxcdImagePolicyList   = defineAsyncComponent(() => import( '@/components/fluxcd/ImagePolicyList.vue'));
const  fluxcdImageRepositoryList   = defineAsyncComponent(() => import( '@/components/fluxcd/ImageRepositoryList.vue'));
const  fluxcdHelmReleaseList   = defineAsyncComponent(() => import( '@/components/fluxcd/HelmReleaseList.vue'));
const  jaegertracingJaegerList   = defineAsyncComponent(() => import( '@/components/jaegertracing/JaegerList.vue'));
const  k8sConfigMapList   = defineAsyncComponent(() => import( '@/components/k8s/ConfigMapList.vue'));
const  k8sSecretList   = defineAsyncComponent(() => import( '@/components/k8s/SecretList.vue'));
const  k8sServiceAccountList   = defineAsyncComponent(() => import( '@/components/k8s/ServiceAccountList.vue'));
const  k8sEndpointsList   = defineAsyncComponent(() => import( '@/components/k8s/EndpointsList.vue'));
const  k8sLimitRangeList   = defineAsyncComponent(() => import( '@/components/k8s/LimitRangeList.vue'));
const  k8sNamespaceList   = defineAsyncComponent(() => import( '@/components/k8s/NamespaceList.vue'));
const  k8sNodeList   = defineAsyncComponent(() => import( '@/components/k8s/NodeList.vue'));
const  k8sPersistentVolumeList   = defineAsyncComponent(() => import( '@/components/k8s/PersistentVolumeList.vue'));
const  k8sPersistentVolumeClaimList   = defineAsyncComponent(() => import( '@/components/k8s/PersistentVolumeClaimList.vue'));
const  k8sResourceQuotaList   = defineAsyncComponent(() => import( '@/components/k8s/ResourceQuotaList.vue'));
const  k8sServiceList   = defineAsyncComponent(() => import( '@/components/k8s/ServiceList.vue'));
const  k8sPodList   = defineAsyncComponent(() => import( '@/components/k8s/PodList.vue'));
const  k8sPodTemplateList   = defineAsyncComponent(() => import( '@/components/k8s/PodTemplateList.vue'));
const  k8sReplicationControllerList   = defineAsyncComponent(() => import( '@/components/k8s/ReplicationControllerList.vue'));
const  k8sAPIServiceList   = defineAsyncComponent(() => import( '@/components/k8s/APIServiceList.vue'));
const  k8sControllerRevisionList   = defineAsyncComponent(() => import( '@/components/k8s/ControllerRevisionList.vue'));
const  k8sDaemonSetList   = defineAsyncComponent(() => import( '@/components/k8s/DaemonSetList.vue'));
const  k8sDeploymentList   = defineAsyncComponent(() => import( '@/components/k8s/DeploymentList.vue'));
const  k8sReplicaSetList   = defineAsyncComponent(() => import( '@/components/k8s/ReplicaSetList.vue'));
const  k8sStatefulSetList   = defineAsyncComponent(() => import( '@/components/k8s/StatefulSetList.vue'));
const  k8sHorizontalPodAutoscalerList   = defineAsyncComponent(() => import( '@/components/k8s/HorizontalPodAutoscalerList.vue'));
const  k8sCronJobList   = defineAsyncComponent(() => import( '@/components/k8s/CronJobList.vue'));
const  k8sCertificateSigningRequestList   = defineAsyncComponent(() => import( '@/components/k8s/CertificateSigningRequestList.vue'));
const  k8sIngressList   = defineAsyncComponent(() => import( '@/components/k8s/IngressList.vue'));
const  k8sNetworkPolicyList   = defineAsyncComponent(() => import( '@/components/k8s/NetworkPolicyList.vue'));
const  k8sPodDisruptionBudgetList   = defineAsyncComponent(() => import( '@/components/k8s/PodDisruptionBudgetList.vue'));
const  k8sRoleList   = defineAsyncComponent(() => import( '@/components/k8s/RoleList.vue'));
const  k8sClusterRoleBindingList   = defineAsyncComponent(() => import( '@/components/k8s/ClusterRoleBindingList.vue'));
const  k8sRoleBindingList   = defineAsyncComponent(() => import( '@/components/k8s/RoleBindingList.vue'));
const  k8sClusterRoleList   = defineAsyncComponent(() => import( '@/components/k8s/ClusterRoleList.vue'));
const  k8sStorageClassList   = defineAsyncComponent(() => import( '@/components/k8s/StorageClassList.vue'));
const  k8sCSIDriverList   = defineAsyncComponent(() => import( '@/components/k8s/CSIDriverList.vue'));
const  k8sCSINodeList   = defineAsyncComponent(() => import( '@/components/k8s/CSINodeList.vue'));
const  k8sCSIStorageCapacityList   = defineAsyncComponent(() => import( '@/components/k8s/CSIStorageCapacityList.vue'));
const  k8sVolumeAttachmentList   = defineAsyncComponent(() => import( '@/components/k8s/VolumeAttachmentList.vue'));
const  k8sMutatingWebhookConfigurationList   = defineAsyncComponent(() => import( '@/components/k8s/MutatingWebhookConfigurationList.vue'));
const  k8sValidatingWebhookConfigurationList   = defineAsyncComponent(() => import( '@/components/k8s/ValidatingWebhookConfigurationList.vue'));
const  k8sCustomResourceDefinitionList   = defineAsyncComponent(() => import( '@/components/k8s/CustomResourceDefinitionList.vue'));
const  k8sPriorityClassList   = defineAsyncComponent(() => import( '@/components/k8s/PriorityClassList.vue'));
const  k8sLeaseList   = defineAsyncComponent(() => import( '@/components/k8s/LeaseList.vue'));
const  k8sRuntimeClassList   = defineAsyncComponent(() => import( '@/components/k8s/RuntimeClassList.vue'));
const  k8sEndpointSliceList   = defineAsyncComponent(() => import( '@/components/k8s/EndpointSliceList.vue'));
const  k8upArchiveList   = defineAsyncComponent(() => import( '@/components/k8up/ArchiveList.vue'));
const  k8upBackupList   = defineAsyncComponent(() => import( '@/components/k8up/BackupList.vue'));
const  k8upCheckList   = defineAsyncComponent(() => import( '@/components/k8up/CheckList.vue'));
const  k8upPreBackupPodList   = defineAsyncComponent(() => import( '@/components/k8up/PreBackupPodList.vue'));
const  k8upPruneList   = defineAsyncComponent(() => import( '@/components/k8up/PruneList.vue'));
const  k8upRestoreList   = defineAsyncComponent(() => import( '@/components/k8up/RestoreList.vue'));
const  k8upScheduleList   = defineAsyncComponent(() => import( '@/components/k8up/ScheduleList.vue'));
const  k8upSnapshotList   = defineAsyncComponent(() => import( '@/components/k8up/SnapshotList.vue'));
const  mariadbBackupList   = defineAsyncComponent(() => import( '@/components/mariadb/BackupList.vue'));
const  mariadbConnectionList   = defineAsyncComponent(() => import( '@/components/mariadb/ConnectionList.vue'));
const  mariadbDatabaseList   = defineAsyncComponent(() => import( '@/components/mariadb/DatabaseList.vue'));
const  mariadbGrantList   = defineAsyncComponent(() => import( '@/components/mariadb/GrantList.vue'));
const  mariadbMariaDBList   = defineAsyncComponent(() => import( '@/components/mariadb/MariaDBList.vue'));
const  mariadbRestoreList   = defineAsyncComponent(() => import( '@/components/mariadb/RestoreList.vue'));
const  mariadbSqlJobList   = defineAsyncComponent(() => import( '@/components/mariadb/SqlJobList.vue'));
const  mariadbUserList   = defineAsyncComponent(() => import( '@/components/mariadb/UserList.vue'));
const  mongodbMongoDBCommunityList   = defineAsyncComponent(() => import( '@/components/mongodb/MongoDBCommunityList.vue'));
const  monitoringAlertmanagerList   = defineAsyncComponent(() => import( '@/components/monitoring/AlertmanagerList.vue'));
const  monitoringPodMonitorList   = defineAsyncComponent(() => import( '@/components/monitoring/PodMonitorList.vue'));
const  monitoringProbeList   = defineAsyncComponent(() => import( '@/components/monitoring/ProbeList.vue'));
const  monitoringPrometheusList   = defineAsyncComponent(() => import( '@/components/monitoring/PrometheusList.vue'));
const  monitoringPrometheusRuleList   = defineAsyncComponent(() => import( '@/components/monitoring/PrometheusRuleList.vue'));
const  monitoringServiceMonitorList   = defineAsyncComponent(() => import( '@/components/monitoring/ServiceMonitorList.vue'));
const  monitoringThanosRulerList   = defineAsyncComponent(() => import( '@/components/monitoring/ThanosRulerList.vue'));
const  monitoringAlertmanagerConfigList   = defineAsyncComponent(() => import( '@/components/monitoring/AlertmanagerConfigList.vue'));
const  monitoringPrometheusAgentList   = defineAsyncComponent(() => import( '@/components/monitoring/PrometheusAgentList.vue'));
const  opentelemetryInstrumentationList   = defineAsyncComponent(() => import( '@/components/opentelemetry/InstrumentationList.vue'));
const  opentelemetryOpAMPBridgeList   = defineAsyncComponent(() => import( '@/components/opentelemetry/OpAMPBridgeList.vue'));
const  opentelemetryOpenTelemetryCollectorList   = defineAsyncComponent(() => import( '@/components/opentelemetry/OpenTelemetryCollectorList.vue'));
const  oracleInnoDBClusterList   = defineAsyncComponent(() => import( '@/components/oracle/InnoDBClusterList.vue'));
const  oracleMySQLBackupList   = defineAsyncComponent(() => import( '@/components/oracle/MySQLBackupList.vue'));
const  projectcalicoBGPConfigurationList   = defineAsyncComponent(() => import( '@/components/projectcalico/BGPConfigurationList.vue'));
const  projectcalicoBGPPeerList   = defineAsyncComponent(() => import( '@/components/projectcalico/BGPPeerList.vue'));
const  projectcalicoBlockAffinityList   = defineAsyncComponent(() => import( '@/components/projectcalico/BlockAffinityList.vue'));
const  projectcalicoCalicoNodeStatusList   = defineAsyncComponent(() => import( '@/components/projectcalico/CalicoNodeStatusList.vue'));
const  projectcalicoClusterInformationList   = defineAsyncComponent(() => import( '@/components/projectcalico/ClusterInformationList.vue'));
const  projectcalicoFelixConfigurationList   = defineAsyncComponent(() => import( '@/components/projectcalico/FelixConfigurationList.vue'));
const  projectcalicoGlobalNetworkPolicyList   = defineAsyncComponent(() => import( '@/components/projectcalico/GlobalNetworkPolicyList.vue'));
const  projectcalicoGlobalNetworkSetList   = defineAsyncComponent(() => import( '@/components/projectcalico/GlobalNetworkSetList.vue'));
const  projectcalicoHostEndpointList   = defineAsyncComponent(() => import( '@/components/projectcalico/HostEndpointList.vue'));
const  projectcalicoIPAMBlockList   = defineAsyncComponent(() => import( '@/components/projectcalico/IPAMBlockList.vue'));
const  projectcalicoIPAMConfigList   = defineAsyncComponent(() => import( '@/components/projectcalico/IPAMConfigList.vue'));
const  projectcalicoIPAMHandleList   = defineAsyncComponent(() => import( '@/components/projectcalico/IPAMHandleList.vue'));
const  projectcalicoIPPoolList   = defineAsyncComponent(() => import( '@/components/projectcalico/IPPoolList.vue'));
const  projectcalicoIPReservationList   = defineAsyncComponent(() => import( '@/components/projectcalico/IPReservationList.vue'));
const  projectcalicoKubeControllersConfigurationList   = defineAsyncComponent(() => import( '@/components/projectcalico/KubeControllersConfigurationList.vue'));
const  projectcalicoNetworkPolicyList   = defineAsyncComponent(() => import( '@/components/projectcalico/NetworkPolicyList.vue'));
const  projectcalicoNetworkSetList   = defineAsyncComponent(() => import( '@/components/projectcalico/NetworkSetList.vue'));
const  rabbitmqRabbitmqClusterList   = defineAsyncComponent(() => import( '@/components/rabbitmq/RabbitmqClusterList.vue'));
const  redisRedisList   = defineAsyncComponent(() => import( '@/components/redis/RedisList.vue'));
const  redisRedisClusterList   = defineAsyncComponent(() => import( '@/components/redis/RedisClusterList.vue'));
const  redisRedisReplicationList   = defineAsyncComponent(() => import( '@/components/redis/RedisReplicationList.vue'));
const  redisRedisSentinelList   = defineAsyncComponent(() => import( '@/components/redis/RedisSentinelList.vue'));
const  secretgeneratorBasicAuthList   = defineAsyncComponent(() => import( '@/components/secretgenerator/BasicAuthList.vue'));
const  secretgeneratorSSHKeyPairList   = defineAsyncComponent(() => import( '@/components/secretgenerator/SSHKeyPairList.vue'));
const  secretgeneratorStringSecretList   = defineAsyncComponent(() => import( '@/components/secretgenerator/StringSecretList.vue'));
const  traefikIngressRouteList   = defineAsyncComponent(() => import( '@/components/traefik/IngressRouteList.vue'));
const  traefikIngressRouteTCPList   = defineAsyncComponent(() => import( '@/components/traefik/IngressRouteTCPList.vue'));
const  traefikIngressRouteUDPList   = defineAsyncComponent(() => import( '@/components/traefik/IngressRouteUDPList.vue'));
const  traefikMiddlewareList   = defineAsyncComponent(() => import( '@/components/traefik/MiddlewareList.vue'));
const  traefikMiddlewareTCPList   = defineAsyncComponent(() => import( '@/components/traefik/MiddlewareTCPList.vue'));
const  traefikServersTransportList   = defineAsyncComponent(() => import( '@/components/traefik/ServersTransportList.vue'));
const  traefikTLSOptionList   = defineAsyncComponent(() => import( '@/components/traefik/TLSOptionList.vue'));
const  traefikTLSStoreList   = defineAsyncComponent(() => import( '@/components/traefik/TLSStoreList.vue'));
const  traefikTraefikServiceList   = defineAsyncComponent(() => import( '@/components/traefik/TraefikServiceList.vue'));
const  vynilDistribList   = defineAsyncComponent(() => import( '@/components/vynil/DistribList.vue'));
const  vynilInstallList   = defineAsyncComponent(() => import( '@/components/vynil/InstallList.vue'));
const  zalandopostgresqlList   = defineAsyncComponent(() => import( '@/components/zalando/postgresqlList.vue'));
const  zalandoClusterKopfPeeringList   = defineAsyncComponent(() => import( '@/components/zalando/ClusterKopfPeeringList.vue'));
const  zalandoKopfPeeringList   = defineAsyncComponent(() => import( '@/components/zalando/KopfPeeringList.vue'));
import { DistribListExcludes as vynilDistribListExcludes } from '../../../libs/vynil/custom.js'
import { PackageListExcludes as vynilPackageListExcludes } from '../../../libs/vynil/custom.js'
import { CategoryListExcludes as vynilCategoryListExcludes } from '../../../libs/vynil/custom.js'
import { JobListExcludes as k8sJobListExcludes } from '../../../libs/k8s/custom.js'
import { EventListExcludes as coreEventListExcludes } from '../../../libs/core/custom.js'
import { InstallListExcludes as vynilInstallListExcludes } from '../../../libs/vynil/custom.js'
import { KustomizationListExcludes as fluxcdKustomizationListExcludes } from '../../../libs/fluxcd/custom.js'
import { HelmChartListExcludes as cattleHelmChartListExcludes } from '../../../libs/cattle/custom.js'
import { HelmChartConfigListExcludes as cattleHelmChartConfigListExcludes } from '../../../libs/cattle/custom.js'
import { AddonListExcludes as cattleAddonListExcludes } from '../../../libs/cattle/custom.js'
import { ChallengeListExcludes as certmanagerChallengeListExcludes } from '../../../libs/certmanager/custom.js'
import { OrderListExcludes as certmanagerOrderListExcludes } from '../../../libs/certmanager/custom.js'
import { CertificateListExcludes as certmanagerCertificateListExcludes } from '../../../libs/certmanager/custom.js'
import { CertificateRequestListExcludes as certmanagerCertificateRequestListExcludes } from '../../../libs/certmanager/custom.js'
import { ClusterIssuerListExcludes as certmanagerClusterIssuerListExcludes } from '../../../libs/certmanager/custom.js'
import { IssuerListExcludes as certmanagerIssuerListExcludes } from '../../../libs/certmanager/custom.js'
import { CiliumClusterwideNetworkPolicyListExcludes as ciliumCiliumClusterwideNetworkPolicyListExcludes } from '../../../libs/cilium/custom.js'
import { CiliumEndpointListExcludes as ciliumCiliumEndpointListExcludes } from '../../../libs/cilium/custom.js'
import { CiliumExternalWorkloadListExcludes as ciliumCiliumExternalWorkloadListExcludes } from '../../../libs/cilium/custom.js'
import { CiliumIdentityListExcludes as ciliumCiliumIdentityListExcludes } from '../../../libs/cilium/custom.js'
import { CiliumLocalRedirectPolicyListExcludes as ciliumCiliumLocalRedirectPolicyListExcludes } from '../../../libs/cilium/custom.js'
import { CiliumNetworkPolicyListExcludes as ciliumCiliumNetworkPolicyListExcludes } from '../../../libs/cilium/custom.js'
import { CiliumNodeListExcludes as ciliumCiliumNodeListExcludes } from '../../../libs/cilium/custom.js'
import { CiliumCIDRGroupListExcludes as ciliumCiliumCIDRGroupListExcludes } from '../../../libs/cilium/custom.js'
import { CiliumL2AnnouncementPolicyListExcludes as ciliumCiliumL2AnnouncementPolicyListExcludes } from '../../../libs/cilium/custom.js'
import { CiliumLoadBalancerIPPoolListExcludes as ciliumCiliumLoadBalancerIPPoolListExcludes } from '../../../libs/cilium/custom.js'
import { CiliumNodeConfigListExcludes as ciliumCiliumNodeConfigListExcludes } from '../../../libs/cilium/custom.js'
import { CiliumPodIPPoolListExcludes as ciliumCiliumPodIPPoolListExcludes } from '../../../libs/cilium/custom.js'
import { BackupListExcludes as cnpgBackupListExcludes } from '../../../libs/cnpg/custom.js'
import { ClusterListExcludes as cnpgClusterListExcludes } from '../../../libs/cnpg/custom.js'
import { PoolerListExcludes as cnpgPoolerListExcludes } from '../../../libs/cnpg/custom.js'
import { ScheduledBackupListExcludes as cnpgScheduledBackupListExcludes } from '../../../libs/cnpg/custom.js'
import { ReceiverListExcludes as fluxcdReceiverListExcludes } from '../../../libs/fluxcd/custom.js'
import { AlertListExcludes as fluxcdAlertListExcludes } from '../../../libs/fluxcd/custom.js'
import { ProviderListExcludes as fluxcdProviderListExcludes } from '../../../libs/fluxcd/custom.js'
import { GitRepositoryListExcludes as fluxcdGitRepositoryListExcludes } from '../../../libs/fluxcd/custom.js'
import { BucketListExcludes as fluxcdBucketListExcludes } from '../../../libs/fluxcd/custom.js'
import { HelmChartListExcludes as fluxcdHelmChartListExcludes } from '../../../libs/fluxcd/custom.js'
import { HelmRepositoryListExcludes as fluxcdHelmRepositoryListExcludes } from '../../../libs/fluxcd/custom.js'
import { OCIRepositoryListExcludes as fluxcdOCIRepositoryListExcludes } from '../../../libs/fluxcd/custom.js'
import { ImageUpdateAutomationListExcludes as fluxcdImageUpdateAutomationListExcludes } from '../../../libs/fluxcd/custom.js'
import { ImagePolicyListExcludes as fluxcdImagePolicyListExcludes } from '../../../libs/fluxcd/custom.js'
import { ImageRepositoryListExcludes as fluxcdImageRepositoryListExcludes } from '../../../libs/fluxcd/custom.js'
import { HelmReleaseListExcludes as fluxcdHelmReleaseListExcludes } from '../../../libs/fluxcd/custom.js'
import { JaegerListExcludes as jaegertracingJaegerListExcludes } from '../../../libs/jaegertracing/custom.js'
import { ConfigMapListExcludes as k8sConfigMapListExcludes } from '../../../libs/k8s/custom.js'
import { SecretListExcludes as k8sSecretListExcludes } from '../../../libs/k8s/custom.js'
import { ServiceAccountListExcludes as k8sServiceAccountListExcludes } from '../../../libs/k8s/custom.js'
import { EndpointsListExcludes as k8sEndpointsListExcludes } from '../../../libs/k8s/custom.js'
import { LimitRangeListExcludes as k8sLimitRangeListExcludes } from '../../../libs/k8s/custom.js'
import { NamespaceListExcludes as k8sNamespaceListExcludes } from '../../../libs/k8s/custom.js'
import { NodeListExcludes as k8sNodeListExcludes } from '../../../libs/k8s/custom.js'
import { PersistentVolumeListExcludes as k8sPersistentVolumeListExcludes } from '../../../libs/k8s/custom.js'
import { PersistentVolumeClaimListExcludes as k8sPersistentVolumeClaimListExcludes } from '../../../libs/k8s/custom.js'
import { ResourceQuotaListExcludes as k8sResourceQuotaListExcludes } from '../../../libs/k8s/custom.js'
import { ServiceListExcludes as k8sServiceListExcludes } from '../../../libs/k8s/custom.js'
import { PodListExcludes as k8sPodListExcludes } from '../../../libs/k8s/custom.js'
import { PodTemplateListExcludes as k8sPodTemplateListExcludes } from '../../../libs/k8s/custom.js'
import { ReplicationControllerListExcludes as k8sReplicationControllerListExcludes } from '../../../libs/k8s/custom.js'
import { APIServiceListExcludes as k8sAPIServiceListExcludes } from '../../../libs/k8s/custom.js'
import { ControllerRevisionListExcludes as k8sControllerRevisionListExcludes } from '../../../libs/k8s/custom.js'
import { DaemonSetListExcludes as k8sDaemonSetListExcludes } from '../../../libs/k8s/custom.js'
import { DeploymentListExcludes as k8sDeploymentListExcludes } from '../../../libs/k8s/custom.js'
import { ReplicaSetListExcludes as k8sReplicaSetListExcludes } from '../../../libs/k8s/custom.js'
import { StatefulSetListExcludes as k8sStatefulSetListExcludes } from '../../../libs/k8s/custom.js'
import { HorizontalPodAutoscalerListExcludes as k8sHorizontalPodAutoscalerListExcludes } from '../../../libs/k8s/custom.js'
import { CronJobListExcludes as k8sCronJobListExcludes } from '../../../libs/k8s/custom.js'
import { CertificateSigningRequestListExcludes as k8sCertificateSigningRequestListExcludes } from '../../../libs/k8s/custom.js'
import { IngressListExcludes as k8sIngressListExcludes } from '../../../libs/k8s/custom.js'
import { NetworkPolicyListExcludes as k8sNetworkPolicyListExcludes } from '../../../libs/k8s/custom.js'
import { PodDisruptionBudgetListExcludes as k8sPodDisruptionBudgetListExcludes } from '../../../libs/k8s/custom.js'
import { RoleListExcludes as k8sRoleListExcludes } from '../../../libs/k8s/custom.js'
import { ClusterRoleBindingListExcludes as k8sClusterRoleBindingListExcludes } from '../../../libs/k8s/custom.js'
import { RoleBindingListExcludes as k8sRoleBindingListExcludes } from '../../../libs/k8s/custom.js'
import { ClusterRoleListExcludes as k8sClusterRoleListExcludes } from '../../../libs/k8s/custom.js'
import { StorageClassListExcludes as k8sStorageClassListExcludes } from '../../../libs/k8s/custom.js'
import { CSIDriverListExcludes as k8sCSIDriverListExcludes } from '../../../libs/k8s/custom.js'
import { CSINodeListExcludes as k8sCSINodeListExcludes } from '../../../libs/k8s/custom.js'
import { CSIStorageCapacityListExcludes as k8sCSIStorageCapacityListExcludes } from '../../../libs/k8s/custom.js'
import { VolumeAttachmentListExcludes as k8sVolumeAttachmentListExcludes } from '../../../libs/k8s/custom.js'
import { MutatingWebhookConfigurationListExcludes as k8sMutatingWebhookConfigurationListExcludes } from '../../../libs/k8s/custom.js'
import { ValidatingWebhookConfigurationListExcludes as k8sValidatingWebhookConfigurationListExcludes } from '../../../libs/k8s/custom.js'
import { CustomResourceDefinitionListExcludes as k8sCustomResourceDefinitionListExcludes } from '../../../libs/k8s/custom.js'
import { PriorityClassListExcludes as k8sPriorityClassListExcludes } from '../../../libs/k8s/custom.js'
import { LeaseListExcludes as k8sLeaseListExcludes } from '../../../libs/k8s/custom.js'
import { RuntimeClassListExcludes as k8sRuntimeClassListExcludes } from '../../../libs/k8s/custom.js'
import { EndpointSliceListExcludes as k8sEndpointSliceListExcludes } from '../../../libs/k8s/custom.js'
import { ArchiveListExcludes as k8upArchiveListExcludes } from '../../../libs/k8up/custom.js'
import { BackupListExcludes as k8upBackupListExcludes } from '../../../libs/k8up/custom.js'
import { CheckListExcludes as k8upCheckListExcludes } from '../../../libs/k8up/custom.js'
import { PreBackupPodListExcludes as k8upPreBackupPodListExcludes } from '../../../libs/k8up/custom.js'
import { PruneListExcludes as k8upPruneListExcludes } from '../../../libs/k8up/custom.js'
import { RestoreListExcludes as k8upRestoreListExcludes } from '../../../libs/k8up/custom.js'
import { ScheduleListExcludes as k8upScheduleListExcludes } from '../../../libs/k8up/custom.js'
import { SnapshotListExcludes as k8upSnapshotListExcludes } from '../../../libs/k8up/custom.js'
import { BackupListExcludes as mariadbBackupListExcludes } from '../../../libs/mariadb/custom.js'
import { ConnectionListExcludes as mariadbConnectionListExcludes } from '../../../libs/mariadb/custom.js'
import { DatabaseListExcludes as mariadbDatabaseListExcludes } from '../../../libs/mariadb/custom.js'
import { GrantListExcludes as mariadbGrantListExcludes } from '../../../libs/mariadb/custom.js'
import { MariaDBListExcludes as mariadbMariaDBListExcludes } from '../../../libs/mariadb/custom.js'
import { RestoreListExcludes as mariadbRestoreListExcludes } from '../../../libs/mariadb/custom.js'
import { SqlJobListExcludes as mariadbSqlJobListExcludes } from '../../../libs/mariadb/custom.js'
import { UserListExcludes as mariadbUserListExcludes } from '../../../libs/mariadb/custom.js'
import { MongoDBCommunityListExcludes as mongodbMongoDBCommunityListExcludes } from '../../../libs/mongodb/custom.js'
import { AlertmanagerListExcludes as monitoringAlertmanagerListExcludes } from '../../../libs/monitoring/custom.js'
import { PodMonitorListExcludes as monitoringPodMonitorListExcludes } from '../../../libs/monitoring/custom.js'
import { ProbeListExcludes as monitoringProbeListExcludes } from '../../../libs/monitoring/custom.js'
import { PrometheusListExcludes as monitoringPrometheusListExcludes } from '../../../libs/monitoring/custom.js'
import { PrometheusRuleListExcludes as monitoringPrometheusRuleListExcludes } from '../../../libs/monitoring/custom.js'
import { ServiceMonitorListExcludes as monitoringServiceMonitorListExcludes } from '../../../libs/monitoring/custom.js'
import { ThanosRulerListExcludes as monitoringThanosRulerListExcludes } from '../../../libs/monitoring/custom.js'
import { AlertmanagerConfigListExcludes as monitoringAlertmanagerConfigListExcludes } from '../../../libs/monitoring/custom.js'
import { PrometheusAgentListExcludes as monitoringPrometheusAgentListExcludes } from '../../../libs/monitoring/custom.js'
import { InstrumentationListExcludes as opentelemetryInstrumentationListExcludes } from '../../../libs/opentelemetry/custom.js'
import { OpAMPBridgeListExcludes as opentelemetryOpAMPBridgeListExcludes } from '../../../libs/opentelemetry/custom.js'
import { OpenTelemetryCollectorListExcludes as opentelemetryOpenTelemetryCollectorListExcludes } from '../../../libs/opentelemetry/custom.js'
import { InnoDBClusterListExcludes as oracleInnoDBClusterListExcludes } from '../../../libs/oracle/custom.js'
import { MySQLBackupListExcludes as oracleMySQLBackupListExcludes } from '../../../libs/oracle/custom.js'
import { BGPConfigurationListExcludes as projectcalicoBGPConfigurationListExcludes } from '../../../libs/projectcalico/custom.js'
import { BGPPeerListExcludes as projectcalicoBGPPeerListExcludes } from '../../../libs/projectcalico/custom.js'
import { BlockAffinityListExcludes as projectcalicoBlockAffinityListExcludes } from '../../../libs/projectcalico/custom.js'
import { CalicoNodeStatusListExcludes as projectcalicoCalicoNodeStatusListExcludes } from '../../../libs/projectcalico/custom.js'
import { ClusterInformationListExcludes as projectcalicoClusterInformationListExcludes } from '../../../libs/projectcalico/custom.js'
import { FelixConfigurationListExcludes as projectcalicoFelixConfigurationListExcludes } from '../../../libs/projectcalico/custom.js'
import { GlobalNetworkPolicyListExcludes as projectcalicoGlobalNetworkPolicyListExcludes } from '../../../libs/projectcalico/custom.js'
import { GlobalNetworkSetListExcludes as projectcalicoGlobalNetworkSetListExcludes } from '../../../libs/projectcalico/custom.js'
import { HostEndpointListExcludes as projectcalicoHostEndpointListExcludes } from '../../../libs/projectcalico/custom.js'
import { IPAMBlockListExcludes as projectcalicoIPAMBlockListExcludes } from '../../../libs/projectcalico/custom.js'
import { IPAMConfigListExcludes as projectcalicoIPAMConfigListExcludes } from '../../../libs/projectcalico/custom.js'
import { IPAMHandleListExcludes as projectcalicoIPAMHandleListExcludes } from '../../../libs/projectcalico/custom.js'
import { IPPoolListExcludes as projectcalicoIPPoolListExcludes } from '../../../libs/projectcalico/custom.js'
import { IPReservationListExcludes as projectcalicoIPReservationListExcludes } from '../../../libs/projectcalico/custom.js'
import { KubeControllersConfigurationListExcludes as projectcalicoKubeControllersConfigurationListExcludes } from '../../../libs/projectcalico/custom.js'
import { NetworkPolicyListExcludes as projectcalicoNetworkPolicyListExcludes } from '../../../libs/projectcalico/custom.js'
import { NetworkSetListExcludes as projectcalicoNetworkSetListExcludes } from '../../../libs/projectcalico/custom.js'
import { RabbitmqClusterListExcludes as rabbitmqRabbitmqClusterListExcludes } from '../../../libs/rabbitmq/custom.js'
import { RedisListExcludes as redisRedisListExcludes } from '../../../libs/redis/custom.js'
import { RedisClusterListExcludes as redisRedisClusterListExcludes } from '../../../libs/redis/custom.js'
import { RedisReplicationListExcludes as redisRedisReplicationListExcludes } from '../../../libs/redis/custom.js'
import { RedisSentinelListExcludes as redisRedisSentinelListExcludes } from '../../../libs/redis/custom.js'
import { BasicAuthListExcludes as secretgeneratorBasicAuthListExcludes } from '../../../libs/secretgenerator/custom.js'
import { SSHKeyPairListExcludes as secretgeneratorSSHKeyPairListExcludes } from '../../../libs/secretgenerator/custom.js'
import { StringSecretListExcludes as secretgeneratorStringSecretListExcludes } from '../../../libs/secretgenerator/custom.js'
import { IngressRouteListExcludes as traefikIngressRouteListExcludes } from '../../../libs/traefik/custom.js'
import { IngressRouteTCPListExcludes as traefikIngressRouteTCPListExcludes } from '../../../libs/traefik/custom.js'
import { IngressRouteUDPListExcludes as traefikIngressRouteUDPListExcludes } from '../../../libs/traefik/custom.js'
import { MiddlewareListExcludes as traefikMiddlewareListExcludes } from '../../../libs/traefik/custom.js'
import { MiddlewareTCPListExcludes as traefikMiddlewareTCPListExcludes } from '../../../libs/traefik/custom.js'
import { ServersTransportListExcludes as traefikServersTransportListExcludes } from '../../../libs/traefik/custom.js'
import { TLSOptionListExcludes as traefikTLSOptionListExcludes } from '../../../libs/traefik/custom.js'
import { TLSStoreListExcludes as traefikTLSStoreListExcludes } from '../../../libs/traefik/custom.js'
import { TraefikServiceListExcludes as traefikTraefikServiceListExcludes } from '../../../libs/traefik/custom.js'
import { postgresqlListExcludes as zalandopostgresqlListExcludes } from '../../../libs/zalando/custom.js'
import { ClusterKopfPeeringListExcludes as zalandoClusterKopfPeeringListExcludes } from '../../../libs/zalando/custom.js'
import { KopfPeeringListExcludes as zalandoKopfPeeringListExcludes } from '../../../libs/zalando/custom.js'
import { ref, sanitizeData, useQuery, useMutation, useInstall, InstallReadExcludes } from '../../../libs/vynil/Install.js'
const { actionDelete, onErrorHandler, notifySuccess, notifyError, onNotInstallFound, navigation, setNamespacedItemFromRoute } = useInstall();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(vynilInstallQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": InstallReadExcludes
  },
  "consumevynilDistrib": {"filters": [], "excludes": vynilDistribListExcludes},
  "consumevynilPackage": {"filters": [], "excludes": vynilPackageListExcludes},
  "consumevynilCategory": {"filters": [], "excludes": vynilCategoryListExcludes},
  "usek8sJob": {"filters": [], "excludes": k8sJobListExcludes},
  "getcoreEvent": {"filters": [], "excludes": coreEventListExcludes},
  "parentvynilInstall": {"filters": [], "excludes": vynilInstallListExcludes},
  "parentfluxcdKustomization": {"filters": [], "excludes": fluxcdKustomizationListExcludes},
  "childcattleHelmChart": {"filters": [], "excludes": cattleHelmChartListExcludes},
  "childcattleHelmChartConfig": {"filters": [], "excludes": cattleHelmChartConfigListExcludes},
  "childcattleAddon": {"filters": [], "excludes": cattleAddonListExcludes},
  "childcertmanagerChallenge": {"filters": [], "excludes": certmanagerChallengeListExcludes},
  "childcertmanagerOrder": {"filters": [], "excludes": certmanagerOrderListExcludes},
  "childcertmanagerCertificate": {"filters": [], "excludes": certmanagerCertificateListExcludes},
  "childcertmanagerCertificateRequest": {"filters": [], "excludes": certmanagerCertificateRequestListExcludes},
  "childcertmanagerClusterIssuer": {"filters": [], "excludes": certmanagerClusterIssuerListExcludes},
  "childcertmanagerIssuer": {"filters": [], "excludes": certmanagerIssuerListExcludes},
  "childciliumCiliumClusterwideNetworkPolicy": {"filters": [], "excludes": ciliumCiliumClusterwideNetworkPolicyListExcludes},
  "childciliumCiliumEndpoint": {"filters": [], "excludes": ciliumCiliumEndpointListExcludes},
  "childciliumCiliumExternalWorkload": {"filters": [], "excludes": ciliumCiliumExternalWorkloadListExcludes},
  "childciliumCiliumIdentity": {"filters": [], "excludes": ciliumCiliumIdentityListExcludes},
  "childciliumCiliumLocalRedirectPolicy": {"filters": [], "excludes": ciliumCiliumLocalRedirectPolicyListExcludes},
  "childciliumCiliumNetworkPolicy": {"filters": [], "excludes": ciliumCiliumNetworkPolicyListExcludes},
  "childciliumCiliumNode": {"filters": [], "excludes": ciliumCiliumNodeListExcludes},
  "childciliumCiliumCIDRGroup": {"filters": [], "excludes": ciliumCiliumCIDRGroupListExcludes},
  "childciliumCiliumL2AnnouncementPolicy": {"filters": [], "excludes": ciliumCiliumL2AnnouncementPolicyListExcludes},
  "childciliumCiliumLoadBalancerIPPool": {"filters": [], "excludes": ciliumCiliumLoadBalancerIPPoolListExcludes},
  "childciliumCiliumNodeConfig": {"filters": [], "excludes": ciliumCiliumNodeConfigListExcludes},
  "childciliumCiliumPodIPPool": {"filters": [], "excludes": ciliumCiliumPodIPPoolListExcludes},
  "childcnpgBackup": {"filters": [], "excludes": cnpgBackupListExcludes},
  "childcnpgCluster": {"filters": [], "excludes": cnpgClusterListExcludes},
  "childcnpgPooler": {"filters": [], "excludes": cnpgPoolerListExcludes},
  "childcnpgScheduledBackup": {"filters": [], "excludes": cnpgScheduledBackupListExcludes},
  "childfluxcdKustomization": {"filters": [], "excludes": fluxcdKustomizationListExcludes},
  "childfluxcdReceiver": {"filters": [], "excludes": fluxcdReceiverListExcludes},
  "childfluxcdAlert": {"filters": [], "excludes": fluxcdAlertListExcludes},
  "childfluxcdProvider": {"filters": [], "excludes": fluxcdProviderListExcludes},
  "childfluxcdGitRepository": {"filters": [], "excludes": fluxcdGitRepositoryListExcludes},
  "childfluxcdBucket": {"filters": [], "excludes": fluxcdBucketListExcludes},
  "childfluxcdHelmChart": {"filters": [], "excludes": fluxcdHelmChartListExcludes},
  "childfluxcdHelmRepository": {"filters": [], "excludes": fluxcdHelmRepositoryListExcludes},
  "childfluxcdOCIRepository": {"filters": [], "excludes": fluxcdOCIRepositoryListExcludes},
  "childfluxcdImageUpdateAutomation": {"filters": [], "excludes": fluxcdImageUpdateAutomationListExcludes},
  "childfluxcdImagePolicy": {"filters": [], "excludes": fluxcdImagePolicyListExcludes},
  "childfluxcdImageRepository": {"filters": [], "excludes": fluxcdImageRepositoryListExcludes},
  "childfluxcdHelmRelease": {"filters": [], "excludes": fluxcdHelmReleaseListExcludes},
  "childjaegertracingJaeger": {"filters": [], "excludes": jaegertracingJaegerListExcludes},
  "childk8sConfigMap": {"filters": [], "excludes": k8sConfigMapListExcludes},
  "childk8sSecret": {"filters": [], "excludes": k8sSecretListExcludes},
  "childk8sServiceAccount": {"filters": [], "excludes": k8sServiceAccountListExcludes},
  "childk8sEndpoints": {"filters": [], "excludes": k8sEndpointsListExcludes},
  "childk8sLimitRange": {"filters": [], "excludes": k8sLimitRangeListExcludes},
  "childk8sNamespace": {"filters": [], "excludes": k8sNamespaceListExcludes},
  "childk8sNode": {"filters": [], "excludes": k8sNodeListExcludes},
  "childk8sPersistentVolume": {"filters": [], "excludes": k8sPersistentVolumeListExcludes},
  "childk8sPersistentVolumeClaim": {"filters": [], "excludes": k8sPersistentVolumeClaimListExcludes},
  "childk8sResourceQuota": {"filters": [], "excludes": k8sResourceQuotaListExcludes},
  "childk8sService": {"filters": [], "excludes": k8sServiceListExcludes},
  "childk8sPod": {"filters": [], "excludes": k8sPodListExcludes},
  "childk8sPodTemplate": {"filters": [], "excludes": k8sPodTemplateListExcludes},
  "childk8sReplicationController": {"filters": [], "excludes": k8sReplicationControllerListExcludes},
  "childk8sAPIService": {"filters": [], "excludes": k8sAPIServiceListExcludes},
  "childk8sControllerRevision": {"filters": [], "excludes": k8sControllerRevisionListExcludes},
  "childk8sDaemonSet": {"filters": [], "excludes": k8sDaemonSetListExcludes},
  "childk8sDeployment": {"filters": [], "excludes": k8sDeploymentListExcludes},
  "childk8sReplicaSet": {"filters": [], "excludes": k8sReplicaSetListExcludes},
  "childk8sStatefulSet": {"filters": [], "excludes": k8sStatefulSetListExcludes},
  "childk8sHorizontalPodAutoscaler": {"filters": [], "excludes": k8sHorizontalPodAutoscalerListExcludes},
  "childk8sJob": {"filters": [], "excludes": k8sJobListExcludes},
  "childk8sCronJob": {"filters": [], "excludes": k8sCronJobListExcludes},
  "childk8sCertificateSigningRequest": {"filters": [], "excludes": k8sCertificateSigningRequestListExcludes},
  "childk8sIngress": {"filters": [], "excludes": k8sIngressListExcludes},
  "childk8sNetworkPolicy": {"filters": [], "excludes": k8sNetworkPolicyListExcludes},
  "childk8sPodDisruptionBudget": {"filters": [], "excludes": k8sPodDisruptionBudgetListExcludes},
  "childk8sRole": {"filters": [], "excludes": k8sRoleListExcludes},
  "childk8sClusterRoleBinding": {"filters": [], "excludes": k8sClusterRoleBindingListExcludes},
  "childk8sRoleBinding": {"filters": [], "excludes": k8sRoleBindingListExcludes},
  "childk8sClusterRole": {"filters": [], "excludes": k8sClusterRoleListExcludes},
  "childk8sStorageClass": {"filters": [], "excludes": k8sStorageClassListExcludes},
  "childk8sCSIDriver": {"filters": [], "excludes": k8sCSIDriverListExcludes},
  "childk8sCSINode": {"filters": [], "excludes": k8sCSINodeListExcludes},
  "childk8sCSIStorageCapacity": {"filters": [], "excludes": k8sCSIStorageCapacityListExcludes},
  "childk8sVolumeAttachment": {"filters": [], "excludes": k8sVolumeAttachmentListExcludes},
  "childk8sMutatingWebhookConfiguration": {"filters": [], "excludes": k8sMutatingWebhookConfigurationListExcludes},
  "childk8sValidatingWebhookConfiguration": {"filters": [], "excludes": k8sValidatingWebhookConfigurationListExcludes},
  "childk8sCustomResourceDefinition": {"filters": [], "excludes": k8sCustomResourceDefinitionListExcludes},
  "childk8sPriorityClass": {"filters": [], "excludes": k8sPriorityClassListExcludes},
  "childk8sLease": {"filters": [], "excludes": k8sLeaseListExcludes},
  "childk8sRuntimeClass": {"filters": [], "excludes": k8sRuntimeClassListExcludes},
  "childk8sEndpointSlice": {"filters": [], "excludes": k8sEndpointSliceListExcludes},
  "childk8upArchive": {"filters": [], "excludes": k8upArchiveListExcludes},
  "childk8upBackup": {"filters": [], "excludes": k8upBackupListExcludes},
  "childk8upCheck": {"filters": [], "excludes": k8upCheckListExcludes},
  "childk8upPreBackupPod": {"filters": [], "excludes": k8upPreBackupPodListExcludes},
  "childk8upPrune": {"filters": [], "excludes": k8upPruneListExcludes},
  "childk8upRestore": {"filters": [], "excludes": k8upRestoreListExcludes},
  "childk8upSchedule": {"filters": [], "excludes": k8upScheduleListExcludes},
  "childk8upSnapshot": {"filters": [], "excludes": k8upSnapshotListExcludes},
  "childmariadbBackup": {"filters": [], "excludes": mariadbBackupListExcludes},
  "childmariadbConnection": {"filters": [], "excludes": mariadbConnectionListExcludes},
  "childmariadbDatabase": {"filters": [], "excludes": mariadbDatabaseListExcludes},
  "childmariadbGrant": {"filters": [], "excludes": mariadbGrantListExcludes},
  "childmariadbMariaDB": {"filters": [], "excludes": mariadbMariaDBListExcludes},
  "childmariadbRestore": {"filters": [], "excludes": mariadbRestoreListExcludes},
  "childmariadbSqlJob": {"filters": [], "excludes": mariadbSqlJobListExcludes},
  "childmariadbUser": {"filters": [], "excludes": mariadbUserListExcludes},
  "childmongodbMongoDBCommunity": {"filters": [], "excludes": mongodbMongoDBCommunityListExcludes},
  "childmonitoringAlertmanager": {"filters": [], "excludes": monitoringAlertmanagerListExcludes},
  "childmonitoringPodMonitor": {"filters": [], "excludes": monitoringPodMonitorListExcludes},
  "childmonitoringProbe": {"filters": [], "excludes": monitoringProbeListExcludes},
  "childmonitoringPrometheus": {"filters": [], "excludes": monitoringPrometheusListExcludes},
  "childmonitoringPrometheusRule": {"filters": [], "excludes": monitoringPrometheusRuleListExcludes},
  "childmonitoringServiceMonitor": {"filters": [], "excludes": monitoringServiceMonitorListExcludes},
  "childmonitoringThanosRuler": {"filters": [], "excludes": monitoringThanosRulerListExcludes},
  "childmonitoringAlertmanagerConfig": {"filters": [], "excludes": monitoringAlertmanagerConfigListExcludes},
  "childmonitoringPrometheusAgent": {"filters": [], "excludes": monitoringPrometheusAgentListExcludes},
  "childopentelemetryInstrumentation": {"filters": [], "excludes": opentelemetryInstrumentationListExcludes},
  "childopentelemetryOpAMPBridge": {"filters": [], "excludes": opentelemetryOpAMPBridgeListExcludes},
  "childopentelemetryOpenTelemetryCollector": {"filters": [], "excludes": opentelemetryOpenTelemetryCollectorListExcludes},
  "childoracleInnoDBCluster": {"filters": [], "excludes": oracleInnoDBClusterListExcludes},
  "childoracleMySQLBackup": {"filters": [], "excludes": oracleMySQLBackupListExcludes},
  "childprojectcalicoBGPConfiguration": {"filters": [], "excludes": projectcalicoBGPConfigurationListExcludes},
  "childprojectcalicoBGPPeer": {"filters": [], "excludes": projectcalicoBGPPeerListExcludes},
  "childprojectcalicoBlockAffinity": {"filters": [], "excludes": projectcalicoBlockAffinityListExcludes},
  "childprojectcalicoCalicoNodeStatus": {"filters": [], "excludes": projectcalicoCalicoNodeStatusListExcludes},
  "childprojectcalicoClusterInformation": {"filters": [], "excludes": projectcalicoClusterInformationListExcludes},
  "childprojectcalicoFelixConfiguration": {"filters": [], "excludes": projectcalicoFelixConfigurationListExcludes},
  "childprojectcalicoGlobalNetworkPolicy": {"filters": [], "excludes": projectcalicoGlobalNetworkPolicyListExcludes},
  "childprojectcalicoGlobalNetworkSet": {"filters": [], "excludes": projectcalicoGlobalNetworkSetListExcludes},
  "childprojectcalicoHostEndpoint": {"filters": [], "excludes": projectcalicoHostEndpointListExcludes},
  "childprojectcalicoIPAMBlock": {"filters": [], "excludes": projectcalicoIPAMBlockListExcludes},
  "childprojectcalicoIPAMConfig": {"filters": [], "excludes": projectcalicoIPAMConfigListExcludes},
  "childprojectcalicoIPAMHandle": {"filters": [], "excludes": projectcalicoIPAMHandleListExcludes},
  "childprojectcalicoIPPool": {"filters": [], "excludes": projectcalicoIPPoolListExcludes},
  "childprojectcalicoIPReservation": {"filters": [], "excludes": projectcalicoIPReservationListExcludes},
  "childprojectcalicoKubeControllersConfiguration": {"filters": [], "excludes": projectcalicoKubeControllersConfigurationListExcludes},
  "childprojectcalicoNetworkPolicy": {"filters": [], "excludes": projectcalicoNetworkPolicyListExcludes},
  "childprojectcalicoNetworkSet": {"filters": [], "excludes": projectcalicoNetworkSetListExcludes},
  "childrabbitmqRabbitmqCluster": {"filters": [], "excludes": rabbitmqRabbitmqClusterListExcludes},
  "childredisRedis": {"filters": [], "excludes": redisRedisListExcludes},
  "childredisRedisCluster": {"filters": [], "excludes": redisRedisClusterListExcludes},
  "childredisRedisReplication": {"filters": [], "excludes": redisRedisReplicationListExcludes},
  "childredisRedisSentinel": {"filters": [], "excludes": redisRedisSentinelListExcludes},
  "childsecretgeneratorBasicAuth": {"filters": [], "excludes": secretgeneratorBasicAuthListExcludes},
  "childsecretgeneratorSSHKeyPair": {"filters": [], "excludes": secretgeneratorSSHKeyPairListExcludes},
  "childsecretgeneratorStringSecret": {"filters": [], "excludes": secretgeneratorStringSecretListExcludes},
  "childtraefikIngressRoute": {"filters": [], "excludes": traefikIngressRouteListExcludes},
  "childtraefikIngressRouteTCP": {"filters": [], "excludes": traefikIngressRouteTCPListExcludes},
  "childtraefikIngressRouteUDP": {"filters": [], "excludes": traefikIngressRouteUDPListExcludes},
  "childtraefikMiddleware": {"filters": [], "excludes": traefikMiddlewareListExcludes},
  "childtraefikMiddlewareTCP": {"filters": [], "excludes": traefikMiddlewareTCPListExcludes},
  "childtraefikServersTransport": {"filters": [], "excludes": traefikServersTransportListExcludes},
  "childtraefikTLSOption": {"filters": [], "excludes": traefikTLSOptionListExcludes},
  "childtraefikTLSStore": {"filters": [], "excludes": traefikTLSStoreListExcludes},
  "childtraefikTraefikService": {"filters": [], "excludes": traefikTraefikServiceListExcludes},
  "childvynilDistrib": {"filters": [], "excludes": vynilDistribListExcludes},
  "childvynilInstall": {"filters": [], "excludes": vynilInstallListExcludes},
  "childzalandopostgresql": {"filters": [], "excludes": zalandopostgresqlListExcludes},
  "childzalandoClusterKopfPeering": {"filters": [], "excludes": zalandoClusterKopfPeeringListExcludes},
  "childzalandoKopfPeering": {"filters": [], "excludes": zalandoKopfPeeringListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, navigation.refreshOption);onError(onErrorHandler);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(InstallDelete);
const conditions = ref({
  "consumevynilDistrib": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['consumevynilDistrib']!=null).reduce((acc,cur)=>acc||cur,false),
  "consumevynilPackage": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['consumevynilPackage']!=null).reduce((acc,cur)=>acc||cur,false),
  "consumevynilCategory": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['consumevynilCategory']!=null).reduce((acc,cur)=>acc||cur,false),
  "usek8sJob": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['usek8sJob']).flat().filter(o=>o!=null).length>0,
  "getcoreEvent": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['getcoreEvent']).flat().filter(o=>o!=null).length>0,
  "parentvynilInstall": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['parentvynilInstall']!=null).reduce((acc,cur)=>acc||cur,false),
  "parentfluxcdKustomization": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['parentfluxcdKustomization']!=null).reduce((acc,cur)=>acc||cur,false),
  "childcattleHelmChart": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childcattleHelmChart']).flat().filter(o=>o!=null).length>0,
  "childcattleHelmChartConfig": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childcattleHelmChartConfig']).flat().filter(o=>o!=null).length>0,
  "childcattleAddon": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childcattleAddon']).flat().filter(o=>o!=null).length>0,
  "childcertmanagerChallenge": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childcertmanagerChallenge']).flat().filter(o=>o!=null).length>0,
  "childcertmanagerOrder": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childcertmanagerOrder']).flat().filter(o=>o!=null).length>0,
  "childcertmanagerCertificate": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childcertmanagerCertificate']).flat().filter(o=>o!=null).length>0,
  "childcertmanagerCertificateRequest": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childcertmanagerCertificateRequest']).flat().filter(o=>o!=null).length>0,
  "childcertmanagerClusterIssuer": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childcertmanagerClusterIssuer']).flat().filter(o=>o!=null).length>0,
  "childcertmanagerIssuer": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childcertmanagerIssuer']).flat().filter(o=>o!=null).length>0,
  "childciliumCiliumClusterwideNetworkPolicy": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childciliumCiliumClusterwideNetworkPolicy']).flat().filter(o=>o!=null).length>0,
  "childciliumCiliumEndpoint": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childciliumCiliumEndpoint']).flat().filter(o=>o!=null).length>0,
  "childciliumCiliumExternalWorkload": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childciliumCiliumExternalWorkload']).flat().filter(o=>o!=null).length>0,
  "childciliumCiliumIdentity": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childciliumCiliumIdentity']).flat().filter(o=>o!=null).length>0,
  "childciliumCiliumLocalRedirectPolicy": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childciliumCiliumLocalRedirectPolicy']).flat().filter(o=>o!=null).length>0,
  "childciliumCiliumNetworkPolicy": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childciliumCiliumNetworkPolicy']).flat().filter(o=>o!=null).length>0,
  "childciliumCiliumNode": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childciliumCiliumNode']).flat().filter(o=>o!=null).length>0,
  "childciliumCiliumCIDRGroup": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childciliumCiliumCIDRGroup']).flat().filter(o=>o!=null).length>0,
  "childciliumCiliumL2AnnouncementPolicy": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childciliumCiliumL2AnnouncementPolicy']).flat().filter(o=>o!=null).length>0,
  "childciliumCiliumLoadBalancerIPPool": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childciliumCiliumLoadBalancerIPPool']).flat().filter(o=>o!=null).length>0,
  "childciliumCiliumNodeConfig": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childciliumCiliumNodeConfig']).flat().filter(o=>o!=null).length>0,
  "childciliumCiliumPodIPPool": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childciliumCiliumPodIPPool']).flat().filter(o=>o!=null).length>0,
  "childcnpgBackup": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childcnpgBackup']).flat().filter(o=>o!=null).length>0,
  "childcnpgCluster": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childcnpgCluster']).flat().filter(o=>o!=null).length>0,
  "childcnpgPooler": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childcnpgPooler']).flat().filter(o=>o!=null).length>0,
  "childcnpgScheduledBackup": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childcnpgScheduledBackup']).flat().filter(o=>o!=null).length>0,
  "childfluxcdKustomization": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childfluxcdKustomization']).flat().filter(o=>o!=null).length>0,
  "childfluxcdReceiver": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childfluxcdReceiver']).flat().filter(o=>o!=null).length>0,
  "childfluxcdAlert": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childfluxcdAlert']).flat().filter(o=>o!=null).length>0,
  "childfluxcdProvider": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childfluxcdProvider']).flat().filter(o=>o!=null).length>0,
  "childfluxcdGitRepository": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childfluxcdGitRepository']).flat().filter(o=>o!=null).length>0,
  "childfluxcdBucket": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childfluxcdBucket']).flat().filter(o=>o!=null).length>0,
  "childfluxcdHelmChart": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childfluxcdHelmChart']).flat().filter(o=>o!=null).length>0,
  "childfluxcdHelmRepository": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childfluxcdHelmRepository']).flat().filter(o=>o!=null).length>0,
  "childfluxcdOCIRepository": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childfluxcdOCIRepository']).flat().filter(o=>o!=null).length>0,
  "childfluxcdImageUpdateAutomation": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childfluxcdImageUpdateAutomation']).flat().filter(o=>o!=null).length>0,
  "childfluxcdImagePolicy": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childfluxcdImagePolicy']).flat().filter(o=>o!=null).length>0,
  "childfluxcdImageRepository": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childfluxcdImageRepository']).flat().filter(o=>o!=null).length>0,
  "childfluxcdHelmRelease": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childfluxcdHelmRelease']).flat().filter(o=>o!=null).length>0,
  "childjaegertracingJaeger": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childjaegertracingJaeger']).flat().filter(o=>o!=null).length>0,
  "childk8sConfigMap": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sConfigMap']).flat().filter(o=>o!=null).length>0,
  "childk8sSecret": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sSecret']).flat().filter(o=>o!=null).length>0,
  "childk8sServiceAccount": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sServiceAccount']).flat().filter(o=>o!=null).length>0,
  "childk8sEndpoints": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sEndpoints']).flat().filter(o=>o!=null).length>0,
  "childk8sLimitRange": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sLimitRange']).flat().filter(o=>o!=null).length>0,
  "childk8sNamespace": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sNamespace']).flat().filter(o=>o!=null).length>0,
  "childk8sNode": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sNode']).flat().filter(o=>o!=null).length>0,
  "childk8sPersistentVolume": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sPersistentVolume']).flat().filter(o=>o!=null).length>0,
  "childk8sPersistentVolumeClaim": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sPersistentVolumeClaim']).flat().filter(o=>o!=null).length>0,
  "childk8sResourceQuota": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sResourceQuota']).flat().filter(o=>o!=null).length>0,
  "childk8sService": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sService']).flat().filter(o=>o!=null).length>0,
  "childk8sPod": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sPod']).flat().filter(o=>o!=null).length>0,
  "childk8sPodTemplate": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sPodTemplate']).flat().filter(o=>o!=null).length>0,
  "childk8sReplicationController": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sReplicationController']).flat().filter(o=>o!=null).length>0,
  "childk8sAPIService": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sAPIService']).flat().filter(o=>o!=null).length>0,
  "childk8sControllerRevision": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sControllerRevision']).flat().filter(o=>o!=null).length>0,
  "childk8sDaemonSet": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sDaemonSet']).flat().filter(o=>o!=null).length>0,
  "childk8sDeployment": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sDeployment']).flat().filter(o=>o!=null).length>0,
  "childk8sReplicaSet": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sReplicaSet']).flat().filter(o=>o!=null).length>0,
  "childk8sStatefulSet": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sStatefulSet']).flat().filter(o=>o!=null).length>0,
  "childk8sHorizontalPodAutoscaler": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sHorizontalPodAutoscaler']).flat().filter(o=>o!=null).length>0,
  "childk8sJob": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sJob']).flat().filter(o=>o!=null).length>0,
  "childk8sCronJob": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sCronJob']).flat().filter(o=>o!=null).length>0,
  "childk8sCertificateSigningRequest": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sCertificateSigningRequest']).flat().filter(o=>o!=null).length>0,
  "childk8sIngress": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sIngress']).flat().filter(o=>o!=null).length>0,
  "childk8sNetworkPolicy": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sNetworkPolicy']).flat().filter(o=>o!=null).length>0,
  "childk8sPodDisruptionBudget": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sPodDisruptionBudget']).flat().filter(o=>o!=null).length>0,
  "childk8sRole": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sRole']).flat().filter(o=>o!=null).length>0,
  "childk8sClusterRoleBinding": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sClusterRoleBinding']).flat().filter(o=>o!=null).length>0,
  "childk8sRoleBinding": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sRoleBinding']).flat().filter(o=>o!=null).length>0,
  "childk8sClusterRole": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sClusterRole']).flat().filter(o=>o!=null).length>0,
  "childk8sStorageClass": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sStorageClass']).flat().filter(o=>o!=null).length>0,
  "childk8sCSIDriver": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sCSIDriver']).flat().filter(o=>o!=null).length>0,
  "childk8sCSINode": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sCSINode']).flat().filter(o=>o!=null).length>0,
  "childk8sCSIStorageCapacity": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sCSIStorageCapacity']).flat().filter(o=>o!=null).length>0,
  "childk8sVolumeAttachment": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sVolumeAttachment']).flat().filter(o=>o!=null).length>0,
  "childk8sMutatingWebhookConfiguration": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sMutatingWebhookConfiguration']).flat().filter(o=>o!=null).length>0,
  "childk8sValidatingWebhookConfiguration": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sValidatingWebhookConfiguration']).flat().filter(o=>o!=null).length>0,
  "childk8sCustomResourceDefinition": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sCustomResourceDefinition']).flat().filter(o=>o!=null).length>0,
  "childk8sPriorityClass": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sPriorityClass']).flat().filter(o=>o!=null).length>0,
  "childk8sLease": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sLease']).flat().filter(o=>o!=null).length>0,
  "childk8sRuntimeClass": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sRuntimeClass']).flat().filter(o=>o!=null).length>0,
  "childk8sEndpointSlice": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8sEndpointSlice']).flat().filter(o=>o!=null).length>0,
  "childk8upArchive": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8upArchive']).flat().filter(o=>o!=null).length>0,
  "childk8upBackup": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8upBackup']).flat().filter(o=>o!=null).length>0,
  "childk8upCheck": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8upCheck']).flat().filter(o=>o!=null).length>0,
  "childk8upPreBackupPod": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8upPreBackupPod']).flat().filter(o=>o!=null).length>0,
  "childk8upPrune": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8upPrune']).flat().filter(o=>o!=null).length>0,
  "childk8upRestore": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8upRestore']).flat().filter(o=>o!=null).length>0,
  "childk8upSchedule": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8upSchedule']).flat().filter(o=>o!=null).length>0,
  "childk8upSnapshot": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childk8upSnapshot']).flat().filter(o=>o!=null).length>0,
  "childmariadbBackup": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmariadbBackup']).flat().filter(o=>o!=null).length>0,
  "childmariadbConnection": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmariadbConnection']).flat().filter(o=>o!=null).length>0,
  "childmariadbDatabase": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmariadbDatabase']).flat().filter(o=>o!=null).length>0,
  "childmariadbGrant": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmariadbGrant']).flat().filter(o=>o!=null).length>0,
  "childmariadbMariaDB": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmariadbMariaDB']).flat().filter(o=>o!=null).length>0,
  "childmariadbRestore": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmariadbRestore']).flat().filter(o=>o!=null).length>0,
  "childmariadbSqlJob": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmariadbSqlJob']).flat().filter(o=>o!=null).length>0,
  "childmariadbUser": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmariadbUser']).flat().filter(o=>o!=null).length>0,
  "childmongodbMongoDBCommunity": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmongodbMongoDBCommunity']).flat().filter(o=>o!=null).length>0,
  "childmonitoringAlertmanager": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmonitoringAlertmanager']).flat().filter(o=>o!=null).length>0,
  "childmonitoringPodMonitor": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmonitoringPodMonitor']).flat().filter(o=>o!=null).length>0,
  "childmonitoringProbe": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmonitoringProbe']).flat().filter(o=>o!=null).length>0,
  "childmonitoringPrometheus": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmonitoringPrometheus']).flat().filter(o=>o!=null).length>0,
  "childmonitoringPrometheusRule": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmonitoringPrometheusRule']).flat().filter(o=>o!=null).length>0,
  "childmonitoringServiceMonitor": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmonitoringServiceMonitor']).flat().filter(o=>o!=null).length>0,
  "childmonitoringThanosRuler": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmonitoringThanosRuler']).flat().filter(o=>o!=null).length>0,
  "childmonitoringAlertmanagerConfig": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmonitoringAlertmanagerConfig']).flat().filter(o=>o!=null).length>0,
  "childmonitoringPrometheusAgent": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childmonitoringPrometheusAgent']).flat().filter(o=>o!=null).length>0,
  "childopentelemetryInstrumentation": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childopentelemetryInstrumentation']).flat().filter(o=>o!=null).length>0,
  "childopentelemetryOpAMPBridge": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childopentelemetryOpAMPBridge']).flat().filter(o=>o!=null).length>0,
  "childopentelemetryOpenTelemetryCollector": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childopentelemetryOpenTelemetryCollector']).flat().filter(o=>o!=null).length>0,
  "childoracleInnoDBCluster": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childoracleInnoDBCluster']).flat().filter(o=>o!=null).length>0,
  "childoracleMySQLBackup": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childoracleMySQLBackup']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoBGPConfiguration": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoBGPConfiguration']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoBGPPeer": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoBGPPeer']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoBlockAffinity": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoBlockAffinity']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoCalicoNodeStatus": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoCalicoNodeStatus']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoClusterInformation": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoClusterInformation']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoFelixConfiguration": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoFelixConfiguration']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoGlobalNetworkPolicy": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoGlobalNetworkPolicy']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoGlobalNetworkSet": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoGlobalNetworkSet']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoHostEndpoint": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoHostEndpoint']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoIPAMBlock": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoIPAMBlock']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoIPAMConfig": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoIPAMConfig']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoIPAMHandle": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoIPAMHandle']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoIPPool": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoIPPool']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoIPReservation": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoIPReservation']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoKubeControllersConfiguration": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoKubeControllersConfiguration']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoNetworkPolicy": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoNetworkPolicy']).flat().filter(o=>o!=null).length>0,
  "childprojectcalicoNetworkSet": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childprojectcalicoNetworkSet']).flat().filter(o=>o!=null).length>0,
  "childrabbitmqRabbitmqCluster": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childrabbitmqRabbitmqCluster']).flat().filter(o=>o!=null).length>0,
  "childredisRedis": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childredisRedis']).flat().filter(o=>o!=null).length>0,
  "childredisRedisCluster": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childredisRedisCluster']).flat().filter(o=>o!=null).length>0,
  "childredisRedisReplication": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childredisRedisReplication']).flat().filter(o=>o!=null).length>0,
  "childredisRedisSentinel": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childredisRedisSentinel']).flat().filter(o=>o!=null).length>0,
  "childsecretgeneratorBasicAuth": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childsecretgeneratorBasicAuth']).flat().filter(o=>o!=null).length>0,
  "childsecretgeneratorSSHKeyPair": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childsecretgeneratorSSHKeyPair']).flat().filter(o=>o!=null).length>0,
  "childsecretgeneratorStringSecret": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childsecretgeneratorStringSecret']).flat().filter(o=>o!=null).length>0,
  "childtraefikIngressRoute": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childtraefikIngressRoute']).flat().filter(o=>o!=null).length>0,
  "childtraefikIngressRouteTCP": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childtraefikIngressRouteTCP']).flat().filter(o=>o!=null).length>0,
  "childtraefikIngressRouteUDP": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childtraefikIngressRouteUDP']).flat().filter(o=>o!=null).length>0,
  "childtraefikMiddleware": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childtraefikMiddleware']).flat().filter(o=>o!=null).length>0,
  "childtraefikMiddlewareTCP": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childtraefikMiddlewareTCP']).flat().filter(o=>o!=null).length>0,
  "childtraefikServersTransport": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childtraefikServersTransport']).flat().filter(o=>o!=null).length>0,
  "childtraefikTLSOption": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childtraefikTLSOption']).flat().filter(o=>o!=null).length>0,
  "childtraefikTLSStore": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childtraefikTLSStore']).flat().filter(o=>o!=null).length>0,
  "childtraefikTraefikService": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childtraefikTraefikService']).flat().filter(o=>o!=null).length>0,
  "childvynilDistrib": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childvynilDistrib']).flat().filter(o=>o!=null).length>0,
  "childvynilInstall": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childvynilInstall']).flat().filter(o=>o!=null).length>0,
  "childzalandopostgresql": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childzalandopostgresql']).flat().filter(o=>o!=null).length>0,
  "childzalandoClusterKopfPeering": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childzalandoClusterKopfPeering']).flat().filter(o=>o!=null).length>0,
  "childzalandoKopfPeering": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['childzalandoKopfPeering']).flat().filter(o=>o!=null).length>0,
});
const sectionCounts = ref({
  consumeLeft: 0,
  parent: 0,
  consumeRight: 0,
  gets: 0,
  users: 0,
  uses: 0,
  bellow: 0
});
const model = ref({});
onResult(res => {
  onNotInstallFound(res);
  if ( !res.loading ) {
    if (res.data!=undefined && Array.isArray(res.data.k8sNamespace)  && res.data.k8sNamespace[0].vynilInstall[0]!=undefined && res.data.k8sNamespace[0].vynilInstall[0]!=null) {
      model.value = res.data.k8sNamespace[0].vynilInstall[0]
    }
    sectionCounts.value.uses += conditions.value["consumevynilPackage"](res.data)?1:0;
    sectionCounts.value.uses += conditions.value["usek8sJob"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentvynilInstall"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentfluxcdKustomization"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childcattleHelmChart"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childcattleHelmChartConfig"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childcattleAddon"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childcertmanagerChallenge"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childcertmanagerOrder"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childcertmanagerCertificate"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childcertmanagerCertificateRequest"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childcertmanagerClusterIssuer"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childcertmanagerIssuer"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childciliumCiliumClusterwideNetworkPolicy"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childciliumCiliumEndpoint"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childciliumCiliumExternalWorkload"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childciliumCiliumIdentity"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childciliumCiliumLocalRedirectPolicy"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childciliumCiliumNetworkPolicy"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childciliumCiliumNode"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childciliumCiliumCIDRGroup"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childciliumCiliumL2AnnouncementPolicy"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childciliumCiliumLoadBalancerIPPool"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childciliumCiliumNodeConfig"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childciliumCiliumPodIPPool"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childcnpgBackup"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childcnpgCluster"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childcnpgPooler"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childcnpgScheduledBackup"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childfluxcdKustomization"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childfluxcdReceiver"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childfluxcdAlert"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childfluxcdProvider"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childfluxcdGitRepository"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childfluxcdBucket"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childfluxcdHelmChart"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childfluxcdHelmRepository"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childfluxcdOCIRepository"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childfluxcdImageUpdateAutomation"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childfluxcdImagePolicy"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childfluxcdImageRepository"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childfluxcdHelmRelease"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childjaegertracingJaeger"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sConfigMap"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sSecret"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sServiceAccount"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sEndpoints"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sLimitRange"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sNamespace"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sNode"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sPersistentVolume"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sPersistentVolumeClaim"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sResourceQuota"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sService"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sPod"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sPodTemplate"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sReplicationController"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sAPIService"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sControllerRevision"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sDaemonSet"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sDeployment"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sReplicaSet"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sStatefulSet"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sHorizontalPodAutoscaler"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sJob"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sCronJob"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sCertificateSigningRequest"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sIngress"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sNetworkPolicy"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sPodDisruptionBudget"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sRole"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sClusterRoleBinding"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sRoleBinding"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sClusterRole"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sStorageClass"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sCSIDriver"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sCSINode"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sCSIStorageCapacity"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sVolumeAttachment"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sMutatingWebhookConfiguration"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sValidatingWebhookConfiguration"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sCustomResourceDefinition"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sPriorityClass"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sLease"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sRuntimeClass"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8sEndpointSlice"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8upArchive"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8upBackup"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8upCheck"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8upPreBackupPod"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8upPrune"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8upRestore"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8upSchedule"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childk8upSnapshot"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmariadbBackup"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmariadbConnection"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmariadbDatabase"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmariadbGrant"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmariadbMariaDB"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmariadbRestore"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmariadbSqlJob"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmariadbUser"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmongodbMongoDBCommunity"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmonitoringAlertmanager"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmonitoringPodMonitor"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmonitoringProbe"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmonitoringPrometheus"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmonitoringPrometheusRule"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmonitoringServiceMonitor"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmonitoringThanosRuler"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmonitoringAlertmanagerConfig"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childmonitoringPrometheusAgent"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childopentelemetryInstrumentation"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childopentelemetryOpAMPBridge"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childopentelemetryOpenTelemetryCollector"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childoracleInnoDBCluster"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childoracleMySQLBackup"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoBGPConfiguration"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoBGPPeer"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoBlockAffinity"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoCalicoNodeStatus"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoClusterInformation"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoFelixConfiguration"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoGlobalNetworkPolicy"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoGlobalNetworkSet"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoHostEndpoint"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoIPAMBlock"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoIPAMConfig"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoIPAMHandle"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoIPPool"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoIPReservation"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoKubeControllersConfiguration"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoNetworkPolicy"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childprojectcalicoNetworkSet"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childrabbitmqRabbitmqCluster"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childredisRedis"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childredisRedisCluster"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childredisRedisReplication"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childredisRedisSentinel"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childsecretgeneratorBasicAuth"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childsecretgeneratorSSHKeyPair"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childsecretgeneratorStringSecret"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childtraefikIngressRoute"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childtraefikIngressRouteTCP"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childtraefikIngressRouteUDP"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childtraefikMiddleware"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childtraefikMiddlewareTCP"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childtraefikServersTransport"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childtraefikTLSOption"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childtraefikTLSStore"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childtraefikTraefikService"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childvynilDistrib"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childvynilInstall"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childzalandopostgresql"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childzalandoClusterKopfPeering"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["childzalandoKopfPeering"](res.data)?1:0;
  }
});
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>
<template><div>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-3" v-if="!loading && sectionCounts.consumeLeft>0">
    </div>
    <div :class="`col-md-${4-(sectionCounts.consumeLeft>0?3:0)}`" v-if="!loading && sectionCounts.parent+sectionCounts.consumeRight>0"></div>
    <div class="col-md-4" v-if="!loading && sectionCounts.parent>0">
    <div v-if="!loading && conditions['parentvynilInstall'](result)&&sectionCounts.parent==1">
      <vynilInstallMeta :showStatus="false"
        :model="result.k8sNamespace[0].vynilInstall[0].parentvynilInstall"
        origin="childvynilInstall"
       />
    </div>
    <div v-if="!loading && conditions['parentfluxcdKustomization'](result)">
      <fluxcdKustomizationMeta :showStatus="false"
        :model="result.k8sNamespace[0].vynilInstall[0].parentfluxcdKustomization"
        origin="childvynilInstall"
       />
    </div>
    </div>
    <div :class="`col-md-${5-(sectionCounts.parent>0?4:0)}`" v-if="!loading && sectionCounts.consumeRight>0"></div>
    <div class="col-md-3" v-if="!loading && sectionCounts.consumeRight>0">
    </div>
  </div>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-1" v-if="!loading && sectionCounts.users==0"></div>
    <div class="col-md-3" v-if="!loading && sectionCounts.users>0">
    </div>
    <div :class="`col-md-${6+(sectionCounts.uses<1?2:0)+(sectionCounts.users<1?2:0)}`">
      <div><vynilInstallView :useActions="true"
        v-if="!loading && model['metadata'] != undefined"
        :model="sanitizeData(model)"
        @on-delete="(meta)=>{actionDelete(deletor, meta)}"
        /></div>
    </div>
    <div class="col-md-1" v-if="!loading && sectionCounts.uses==0"></div>
    <div class="col-md-3" v-if="!loading && sectionCounts.uses>0">
      <vynilPackageMeta v-if="!loading && conditions['consumevynilPackage'](result)" :showStatus="false"
        :model="result.k8sNamespace[0].vynilInstall[0].consumevynilPackage"
        origin="providevynilInstall"
       />
      <k8sJobList :useRefresh="false"
        v-if="!loading && conditions['usek8sJob'](result)"
        :model="result.k8sNamespace[0].vynilInstall[0].usek8sJob"
        origin="usersvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childcattleHelmChart'](result)">
      <cattleHelmChartList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childcattleHelmChart"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childcattleHelmChartConfig'](result)">
      <cattleHelmChartConfigList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childcattleHelmChartConfig"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childcattleAddon'](result)">
      <cattleAddonList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childcattleAddon"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childcertmanagerChallenge'](result)">
      <certmanagerChallengeList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childcertmanagerChallenge"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childcertmanagerOrder'](result)">
      <certmanagerOrderList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childcertmanagerOrder"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childcertmanagerCertificate'](result)">
      <certmanagerCertificateList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childcertmanagerCertificate"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childcertmanagerCertificateRequest'](result)">
      <certmanagerCertificateRequestList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childcertmanagerCertificateRequest"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childcertmanagerClusterIssuer'](result)">
      <certmanagerClusterIssuerList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childcertmanagerClusterIssuer"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childcertmanagerIssuer'](result)">
      <certmanagerIssuerList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childcertmanagerIssuer"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childciliumCiliumClusterwideNetworkPolicy'](result)">
      <ciliumCiliumClusterwideNetworkPolicyList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childciliumCiliumClusterwideNetworkPolicy"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childciliumCiliumEndpoint'](result)">
      <ciliumCiliumEndpointList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childciliumCiliumEndpoint"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childciliumCiliumExternalWorkload'](result)">
      <ciliumCiliumExternalWorkloadList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childciliumCiliumExternalWorkload"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childciliumCiliumIdentity'](result)">
      <ciliumCiliumIdentityList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childciliumCiliumIdentity"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childciliumCiliumLocalRedirectPolicy'](result)">
      <ciliumCiliumLocalRedirectPolicyList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childciliumCiliumLocalRedirectPolicy"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childciliumCiliumNetworkPolicy'](result)">
      <ciliumCiliumNetworkPolicyList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childciliumCiliumNetworkPolicy"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childciliumCiliumNode'](result)">
      <ciliumCiliumNodeList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childciliumCiliumNode"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childciliumCiliumCIDRGroup'](result)">
      <ciliumCiliumCIDRGroupList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childciliumCiliumCIDRGroup"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childciliumCiliumL2AnnouncementPolicy'](result)">
      <ciliumCiliumL2AnnouncementPolicyList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childciliumCiliumL2AnnouncementPolicy"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childciliumCiliumLoadBalancerIPPool'](result)">
      <ciliumCiliumLoadBalancerIPPoolList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childciliumCiliumLoadBalancerIPPool"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childciliumCiliumNodeConfig'](result)">
      <ciliumCiliumNodeConfigList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childciliumCiliumNodeConfig"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childciliumCiliumPodIPPool'](result)">
      <ciliumCiliumPodIPPoolList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childciliumCiliumPodIPPool"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childcnpgBackup'](result)">
      <cnpgBackupList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childcnpgBackup"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childcnpgCluster'](result)">
      <cnpgClusterList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childcnpgCluster"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childcnpgPooler'](result)">
      <cnpgPoolerList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childcnpgPooler"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childcnpgScheduledBackup'](result)">
      <cnpgScheduledBackupList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childcnpgScheduledBackup"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childfluxcdKustomization'](result)">
      <fluxcdKustomizationList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childfluxcdKustomization"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childfluxcdReceiver'](result)">
      <fluxcdReceiverList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childfluxcdReceiver"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childfluxcdAlert'](result)">
      <fluxcdAlertList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childfluxcdAlert"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childfluxcdProvider'](result)">
      <fluxcdProviderList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childfluxcdProvider"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childfluxcdGitRepository'](result)">
      <fluxcdGitRepositoryList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childfluxcdGitRepository"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childfluxcdBucket'](result)">
      <fluxcdBucketList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childfluxcdBucket"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childfluxcdHelmChart'](result)">
      <fluxcdHelmChartList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childfluxcdHelmChart"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childfluxcdHelmRepository'](result)">
      <fluxcdHelmRepositoryList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childfluxcdHelmRepository"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childfluxcdOCIRepository'](result)">
      <fluxcdOCIRepositoryList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childfluxcdOCIRepository"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childfluxcdImageUpdateAutomation'](result)">
      <fluxcdImageUpdateAutomationList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childfluxcdImageUpdateAutomation"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childfluxcdImagePolicy'](result)">
      <fluxcdImagePolicyList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childfluxcdImagePolicy"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childfluxcdImageRepository'](result)">
      <fluxcdImageRepositoryList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childfluxcdImageRepository"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childfluxcdHelmRelease'](result)">
      <fluxcdHelmReleaseList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childfluxcdHelmRelease"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childjaegertracingJaeger'](result)">
      <jaegertracingJaegerList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childjaegertracingJaeger"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sConfigMap'](result)">
      <k8sConfigMapList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sConfigMap"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sSecret'](result)">
      <k8sSecretList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sSecret"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sServiceAccount'](result)">
      <k8sServiceAccountList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sServiceAccount"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sEndpoints'](result)">
      <k8sEndpointsList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sEndpoints"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sLimitRange'](result)">
      <k8sLimitRangeList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sLimitRange"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sNamespace'](result)">
      <k8sNamespaceList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sNamespace"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sNode'](result)">
      <k8sNodeList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sNode"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sPersistentVolume'](result)">
      <k8sPersistentVolumeList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sPersistentVolume"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sPersistentVolumeClaim'](result)">
      <k8sPersistentVolumeClaimList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sPersistentVolumeClaim"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sResourceQuota'](result)">
      <k8sResourceQuotaList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sResourceQuota"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sService'](result)">
      <k8sServiceList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sService"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sPod'](result)">
      <k8sPodList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sPod"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sPodTemplate'](result)">
      <k8sPodTemplateList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sPodTemplate"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sReplicationController'](result)">
      <k8sReplicationControllerList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sReplicationController"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sAPIService'](result)">
      <k8sAPIServiceList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sAPIService"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sControllerRevision'](result)">
      <k8sControllerRevisionList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sControllerRevision"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sDaemonSet'](result)">
      <k8sDaemonSetList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sDaemonSet"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sDeployment'](result)">
      <k8sDeploymentList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sDeployment"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sReplicaSet'](result)">
      <k8sReplicaSetList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sReplicaSet"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sStatefulSet'](result)">
      <k8sStatefulSetList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sStatefulSet"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sHorizontalPodAutoscaler'](result)">
      <k8sHorizontalPodAutoscalerList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sHorizontalPodAutoscaler"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sJob'](result)">
      <k8sJobList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sJob"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sCronJob'](result)">
      <k8sCronJobList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sCronJob"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sCertificateSigningRequest'](result)">
      <k8sCertificateSigningRequestList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sCertificateSigningRequest"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sIngress'](result)">
      <k8sIngressList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sIngress"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sNetworkPolicy'](result)">
      <k8sNetworkPolicyList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sNetworkPolicy"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sPodDisruptionBudget'](result)">
      <k8sPodDisruptionBudgetList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sPodDisruptionBudget"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sRole'](result)">
      <k8sRoleList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sRole"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sClusterRoleBinding'](result)">
      <k8sClusterRoleBindingList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sClusterRoleBinding"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sRoleBinding'](result)">
      <k8sRoleBindingList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sRoleBinding"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sClusterRole'](result)">
      <k8sClusterRoleList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sClusterRole"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sStorageClass'](result)">
      <k8sStorageClassList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sStorageClass"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sCSIDriver'](result)">
      <k8sCSIDriverList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sCSIDriver"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sCSINode'](result)">
      <k8sCSINodeList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sCSINode"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sCSIStorageCapacity'](result)">
      <k8sCSIStorageCapacityList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sCSIStorageCapacity"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sVolumeAttachment'](result)">
      <k8sVolumeAttachmentList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sVolumeAttachment"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sMutatingWebhookConfiguration'](result)">
      <k8sMutatingWebhookConfigurationList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sMutatingWebhookConfiguration"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sValidatingWebhookConfiguration'](result)">
      <k8sValidatingWebhookConfigurationList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sValidatingWebhookConfiguration"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sCustomResourceDefinition'](result)">
      <k8sCustomResourceDefinitionList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sCustomResourceDefinition"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sPriorityClass'](result)">
      <k8sPriorityClassList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sPriorityClass"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sLease'](result)">
      <k8sLeaseList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sLease"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sRuntimeClass'](result)">
      <k8sRuntimeClassList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sRuntimeClass"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8sEndpointSlice'](result)">
      <k8sEndpointSliceList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8sEndpointSlice"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8upArchive'](result)">
      <k8upArchiveList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8upArchive"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8upBackup'](result)">
      <k8upBackupList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8upBackup"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8upCheck'](result)">
      <k8upCheckList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8upCheck"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8upPreBackupPod'](result)">
      <k8upPreBackupPodList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8upPreBackupPod"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8upPrune'](result)">
      <k8upPruneList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8upPrune"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8upRestore'](result)">
      <k8upRestoreList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8upRestore"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8upSchedule'](result)">
      <k8upScheduleList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8upSchedule"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childk8upSnapshot'](result)">
      <k8upSnapshotList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childk8upSnapshot"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmariadbBackup'](result)">
      <mariadbBackupList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmariadbBackup"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmariadbConnection'](result)">
      <mariadbConnectionList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmariadbConnection"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmariadbDatabase'](result)">
      <mariadbDatabaseList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmariadbDatabase"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmariadbGrant'](result)">
      <mariadbGrantList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmariadbGrant"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmariadbMariaDB'](result)">
      <mariadbMariaDBList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmariadbMariaDB"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmariadbRestore'](result)">
      <mariadbRestoreList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmariadbRestore"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmariadbSqlJob'](result)">
      <mariadbSqlJobList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmariadbSqlJob"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmariadbUser'](result)">
      <mariadbUserList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmariadbUser"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmongodbMongoDBCommunity'](result)">
      <mongodbMongoDBCommunityList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmongodbMongoDBCommunity"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmonitoringAlertmanager'](result)">
      <monitoringAlertmanagerList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmonitoringAlertmanager"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmonitoringPodMonitor'](result)">
      <monitoringPodMonitorList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmonitoringPodMonitor"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmonitoringProbe'](result)">
      <monitoringProbeList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmonitoringProbe"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmonitoringPrometheus'](result)">
      <monitoringPrometheusList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmonitoringPrometheus"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmonitoringPrometheusRule'](result)">
      <monitoringPrometheusRuleList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmonitoringPrometheusRule"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmonitoringServiceMonitor'](result)">
      <monitoringServiceMonitorList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmonitoringServiceMonitor"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmonitoringThanosRuler'](result)">
      <monitoringThanosRulerList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmonitoringThanosRuler"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmonitoringAlertmanagerConfig'](result)">
      <monitoringAlertmanagerConfigList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmonitoringAlertmanagerConfig"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childmonitoringPrometheusAgent'](result)">
      <monitoringPrometheusAgentList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childmonitoringPrometheusAgent"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childopentelemetryInstrumentation'](result)">
      <opentelemetryInstrumentationList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childopentelemetryInstrumentation"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childopentelemetryOpAMPBridge'](result)">
      <opentelemetryOpAMPBridgeList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childopentelemetryOpAMPBridge"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childopentelemetryOpenTelemetryCollector'](result)">
      <opentelemetryOpenTelemetryCollectorList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childopentelemetryOpenTelemetryCollector"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childoracleInnoDBCluster'](result)">
      <oracleInnoDBClusterList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childoracleInnoDBCluster"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childoracleMySQLBackup'](result)">
      <oracleMySQLBackupList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childoracleMySQLBackup"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoBGPConfiguration'](result)">
      <projectcalicoBGPConfigurationList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoBGPConfiguration"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoBGPPeer'](result)">
      <projectcalicoBGPPeerList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoBGPPeer"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoBlockAffinity'](result)">
      <projectcalicoBlockAffinityList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoBlockAffinity"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoCalicoNodeStatus'](result)">
      <projectcalicoCalicoNodeStatusList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoCalicoNodeStatus"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoClusterInformation'](result)">
      <projectcalicoClusterInformationList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoClusterInformation"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoFelixConfiguration'](result)">
      <projectcalicoFelixConfigurationList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoFelixConfiguration"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoGlobalNetworkPolicy'](result)">
      <projectcalicoGlobalNetworkPolicyList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoGlobalNetworkPolicy"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoGlobalNetworkSet'](result)">
      <projectcalicoGlobalNetworkSetList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoGlobalNetworkSet"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoHostEndpoint'](result)">
      <projectcalicoHostEndpointList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoHostEndpoint"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoIPAMBlock'](result)">
      <projectcalicoIPAMBlockList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoIPAMBlock"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoIPAMConfig'](result)">
      <projectcalicoIPAMConfigList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoIPAMConfig"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoIPAMHandle'](result)">
      <projectcalicoIPAMHandleList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoIPAMHandle"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoIPPool'](result)">
      <projectcalicoIPPoolList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoIPPool"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoIPReservation'](result)">
      <projectcalicoIPReservationList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoIPReservation"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoKubeControllersConfiguration'](result)">
      <projectcalicoKubeControllersConfigurationList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoKubeControllersConfiguration"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoNetworkPolicy'](result)">
      <projectcalicoNetworkPolicyList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoNetworkPolicy"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childprojectcalicoNetworkSet'](result)">
      <projectcalicoNetworkSetList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childprojectcalicoNetworkSet"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childrabbitmqRabbitmqCluster'](result)">
      <rabbitmqRabbitmqClusterList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childrabbitmqRabbitmqCluster"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childredisRedis'](result)">
      <redisRedisList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childredisRedis"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childredisRedisCluster'](result)">
      <redisRedisClusterList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childredisRedisCluster"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childredisRedisReplication'](result)">
      <redisRedisReplicationList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childredisRedisReplication"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childredisRedisSentinel'](result)">
      <redisRedisSentinelList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childredisRedisSentinel"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childsecretgeneratorBasicAuth'](result)">
      <secretgeneratorBasicAuthList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childsecretgeneratorBasicAuth"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childsecretgeneratorSSHKeyPair'](result)">
      <secretgeneratorSSHKeyPairList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childsecretgeneratorSSHKeyPair"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childsecretgeneratorStringSecret'](result)">
      <secretgeneratorStringSecretList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childsecretgeneratorStringSecret"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childtraefikIngressRoute'](result)">
      <traefikIngressRouteList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childtraefikIngressRoute"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childtraefikIngressRouteTCP'](result)">
      <traefikIngressRouteTCPList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childtraefikIngressRouteTCP"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childtraefikIngressRouteUDP'](result)">
      <traefikIngressRouteUDPList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childtraefikIngressRouteUDP"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childtraefikMiddleware'](result)">
      <traefikMiddlewareList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childtraefikMiddleware"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childtraefikMiddlewareTCP'](result)">
      <traefikMiddlewareTCPList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childtraefikMiddlewareTCP"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childtraefikServersTransport'](result)">
      <traefikServersTransportList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childtraefikServersTransport"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childtraefikTLSOption'](result)">
      <traefikTLSOptionList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childtraefikTLSOption"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childtraefikTLSStore'](result)">
      <traefikTLSStoreList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childtraefikTLSStore"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childtraefikTraefikService'](result)">
      <traefikTraefikServiceList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childtraefikTraefikService"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childvynilDistrib'](result)">
      <vynilDistribList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childvynilDistrib"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childvynilInstall'](result)">
      <vynilInstallList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childvynilInstall"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childzalandopostgresql'](result)">
      <zalandopostgresqlList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childzalandopostgresql"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childzalandoClusterKopfPeering'](result)">
      <zalandoClusterKopfPeeringList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childzalandoClusterKopfPeering"
        origin="parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['childzalandoKopfPeering'](result)">
      <zalandoKopfPeeringList :useRefresh="false"
        :model="result.k8sNamespace[0].vynilInstall[0].childzalandoKopfPeering"
        origin="parentvynilInstall"
       />
    </div>
  </div>
</div></template>
