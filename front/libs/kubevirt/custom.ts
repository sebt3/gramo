// noGramoGenerator
import { QTableColumn } from 'quasar'
const { tableColumnAlign } = await import('../core/navigation.js')
const { i18n } = await import("../i18n")
const { systemColor, systemIcon,workloadColor, workloadIcon,storageColor, storageIcon, } = await import('../../routes/custom');
export const kubevirtIcon = 'apps';
export const kubevirtTitle = 'kubevirt';
export const iconKubeVirt = systemIcon;
export const colorKubeVirt = systemColor;
export const descriptionKubeVirt = '';
export const shortKubeVirt = 'KubeVirt';
export const iconVirtualMachine = workloadIcon;
export const colorVirtualMachine = workloadColor;
export const descriptionVirtualMachine = '';
export const shortVirtualMachine = 'VirtualMachine';
export const iconVirtualMachineInstance = workloadIcon;
export const colorVirtualMachineInstance = workloadColor;
export const descriptionVirtualMachineInstance = '';
export const shortVirtualMachineInstance = 'VirtualMachineInstance';
export const iconVirtualMachineInstanceMigration = workloadIcon;
export const colorVirtualMachineInstanceMigration = workloadColor;
export const descriptionVirtualMachineInstanceMigration = '';
export const shortVirtualMachineInstanceMigration = 'VirtualMachineInstanceMigration';
export const iconVirtualMachineInstancePreset = workloadIcon;
export const colorVirtualMachineInstancePreset = workloadColor;
export const descriptionVirtualMachineInstancePreset = '';
export const shortVirtualMachineInstancePreset = 'VirtualMachineInstancePreset';
export const iconVirtualMachineInstanceReplicaSet = workloadIcon;
export const colorVirtualMachineInstanceReplicaSet = workloadColor;
export const descriptionVirtualMachineInstanceReplicaSet = '';
export const shortVirtualMachineInstanceReplicaSet = 'VirtualMachineInstanceReplicaSet';
export const iconVirtualMachineClone = workloadIcon;
export const colorVirtualMachineClone = workloadColor;
export const descriptionVirtualMachineClone = '';
export const shortVirtualMachineClone = 'VirtualMachineClone';
export const iconVirtualMachineExport = workloadIcon;
export const colorVirtualMachineExport = workloadColor;
export const descriptionVirtualMachineExport = '';
export const shortVirtualMachineExport = 'VirtualMachineExport';
export const iconVirtualMachineClusterInstancetype = workloadIcon;
export const colorVirtualMachineClusterInstancetype = workloadColor;
export const descriptionVirtualMachineClusterInstancetype = '';
export const shortVirtualMachineClusterInstancetype = 'VirtualMachineClusterInstancetype';
export const iconVirtualMachineClusterPreference = workloadIcon;
export const colorVirtualMachineClusterPreference = workloadColor;
export const descriptionVirtualMachineClusterPreference = '';
export const shortVirtualMachineClusterPreference = 'VirtualMachineClusterPreference';
export const iconVirtualMachineInstancetype = workloadIcon;
export const colorVirtualMachineInstancetype = workloadColor;
export const descriptionVirtualMachineInstancetype = '';
export const shortVirtualMachineInstancetype = 'VirtualMachineInstancetype';
export const iconVirtualMachinePreference = workloadIcon;
export const colorVirtualMachinePreference = workloadColor;
export const descriptionVirtualMachinePreference = '';
export const shortVirtualMachinePreference = 'VirtualMachinePreference';
export const iconMigrationPolicy = workloadIcon;
export const colorMigrationPolicy = workloadColor;
export const descriptionMigrationPolicy = '';
export const shortMigrationPolicy = 'MigrationPolicy';
export const iconMTQ = systemIcon;
export const colorMTQ = systemColor;
export const descriptionMTQ = '';
export const shortMTQ = 'MTQ';
export const iconVirtualMachinePool = workloadIcon;
export const colorVirtualMachinePool = workloadColor;
export const descriptionVirtualMachinePool = '';
export const shortVirtualMachinePool = 'VirtualMachinePool';
export const iconVirtualMachineRestore = workloadIcon;
export const colorVirtualMachineRestore = workloadColor;
export const descriptionVirtualMachineRestore = '';
export const shortVirtualMachineRestore = 'VirtualMachineRestore';
export const iconVirtualMachineSnapshot = workloadIcon;
export const colorVirtualMachineSnapshot = workloadColor;
export const descriptionVirtualMachineSnapshot = '';
export const shortVirtualMachineSnapshot = 'VirtualMachineSnapshot';
export const iconVirtualMachineSnapshotContent = workloadIcon;
export const colorVirtualMachineSnapshotContent = workloadColor;
export const descriptionVirtualMachineSnapshotContent = '';
export const shortVirtualMachineSnapshotContent = 'VirtualMachineSnapshotContent';
export const iconCDI = systemIcon;
export const colorCDI = systemColor;
export const descriptionCDI = '';
export const shortCDI = 'CDI';
export const iconCDIConfig = systemIcon;
export const colorCDIConfig = systemColor;
export const descriptionCDIConfig = '';
export const shortCDIConfig = 'CDIConfig';
export const iconDataImportCron = workloadIcon;
export const colorDataImportCron = workloadColor;
export const descriptionDataImportCron = '';
export const shortDataImportCron = 'DataImportCron';
export const iconDataSource = storageIcon;
export const colorDataSource = storageColor;
export const descriptionDataSource = '';
export const shortDataSource = 'DataSource';
export const iconDataVolume = storageIcon;
export const colorDataVolume = storageColor;
export const descriptionDataVolume = '';
export const shortDataVolume = 'DataVolume';
export const iconObjectTransfer = storageIcon;
export const colorObjectTransfer = storageColor;
export const descriptionObjectTransfer = '';
export const shortObjectTransfer = 'ObjectTransfer';
export const iconStorageProfile = workloadIcon;
export const colorStorageProfile = workloadColor;
export const descriptionStorageProfile = '';
export const shortStorageProfile = 'StorageProfile';
export const iconVolumeCloneSource = storageIcon;
export const colorVolumeCloneSource = storageColor;
export const descriptionVolumeCloneSource = '';
export const shortVolumeCloneSource = 'VolumeCloneSource';
export const iconVolumeImportSource = workloadIcon;
export const colorVolumeImportSource = workloadColor;
export const descriptionVolumeImportSource = '';
export const shortVolumeImportSource = 'VolumeImportSource';
export const iconVolumeUploadSource = storageIcon;
export const colorVolumeUploadSource = storageColor;
export const descriptionVolumeUploadSource = '';
export const shortVolumeUploadSource = 'VolumeUploadSource';
export const iconHyperConverged = systemIcon;
export const colorHyperConverged = systemColor;
export const descriptionHyperConverged = '';
export const shortHyperConverged = 'HyperConverged';
export const iconHostPathProvisioner = workloadIcon;
export const colorHostPathProvisioner = workloadColor;
export const descriptionHostPathProvisioner = '';
export const shortHostPathProvisioner = 'HostPathProvisioner';
export const iconSSP = systemIcon;
export const colorSSP = systemColor;
export const descriptionSSP = '';
export const shortSSP = 'SSP';
export const extraKubeVirtColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Phase', label: `${i18n.global.t('kubevirt.Phase')}`, field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachineColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Status', label: `${i18n.global.t('core.status')}`, field: row => row.status.printableStatus, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachineInstanceColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Phase', label: `${i18n.global.t('kubevirt.Phase')}`, field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
  {name: 'NodeName', label: `${i18n.global.t('kubevirt.NodeName')}`, field: row => row.status.nodeName, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachineInstanceMigrationColumns:Array<QTableColumn> = [
  {name: 'Phase', label: `${i18n.global.t('kubevirt.Phase')}`, field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
  {name: 'VMI', label: `${i18n.global.t('kubevirt.VMI')}`, field: row => row.spec.vmiName, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachineInstancePresetColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachineInstanceReplicaSetColumns:Array<QTableColumn> = [
  {name: 'Desired', label: `${i18n.global.t('kubevirt.Desired')}`, field: row => row.spec.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Current', label: `${i18n.global.t('kubevirt.Current')}`, field: row => row.status.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Ready', label: `${i18n.global.t('kubevirt.Ready')}`, field: row => row.status.readyReplicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachineCloneColumns:Array<QTableColumn> = [
  {name: 'Phase', label: `${i18n.global.t('kubevirt.Phase')}`, field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
  {name: 'SourceVirtualMachine', label: `${i18n.global.t('kubevirt.SourceVirtualMachine')}`, field: row => row.spec.source.name, sortable: true, align: tableColumnAlign.left},
  {name: 'TargetVirtualMachine', label: `${i18n.global.t('kubevirt.TargetVirtualMachine')}`, field: row => row.spec.target.name, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachineExportColumns:Array<QTableColumn> = [
  {name: 'SourceKind', label: `${i18n.global.t('kubevirt.SourceKind')}`, field: row => row.spec.source.kind, sortable: true, align: tableColumnAlign.left},
  {name: 'SourceName', label: `${i18n.global.t('kubevirt.SourceName')}`, field: row => row.spec.source.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Phase', label: `${i18n.global.t('kubevirt.Phase')}`, field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachineClusterInstancetypeColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachineClusterPreferenceColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachineInstancetypeColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachinePreferenceColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraMigrationPolicyColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraMTQColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Phase', label: `${i18n.global.t('kubevirt.Phase')}`, field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachinePoolColumns:Array<QTableColumn> = [
  {name: 'Desired', label: `${i18n.global.t('kubevirt.Desired')}`, field: row => row.spec.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Current', label: `${i18n.global.t('kubevirt.Current')}`, field: row => row.status.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Ready', label: `${i18n.global.t('kubevirt.Ready')}`, field: row => row.status.readyReplicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachineRestoreColumns:Array<QTableColumn> = [
  {name: 'TargetKind', label: `${i18n.global.t('kubevirt.TargetKind')}`, field: row => row.spec.target.kind, sortable: true, align: tableColumnAlign.left},
  {name: 'TargetName', label: `${i18n.global.t('kubevirt.TargetName')}`, field: row => row.spec.target.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Complete', label: `${i18n.global.t('kubevirt.Complete')}`, field: row => row.status.complete, sortable: true, align: tableColumnAlign.left},
  {name: 'RestoreTime', label: `${i18n.global.t('kubevirt.RestoreTime')}`, field: row => row.status.restoreTime, sortable: true, align: tableColumnAlign.left},
  {name: 'Error', label: `${i18n.global.t('kubevirt.Error')}`, field: row => row.status.error.message, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachineSnapshotColumns:Array<QTableColumn> = [
  {name: 'SourceKind', label: `${i18n.global.t('kubevirt.SourceKind')}`, field: row => row.spec.source.kind, sortable: true, align: tableColumnAlign.left},
  {name: 'SourceName', label: `${i18n.global.t('kubevirt.SourceName')}`, field: row => row.spec.source.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Phase', label: `${i18n.global.t('kubevirt.Phase')}`, field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
  {name: 'ReadyToUse', label: `${i18n.global.t('kubevirt.ReadyToUse')}`, field: row => row.status.readyToUse, sortable: true, align: tableColumnAlign.left},
  {name: 'CreationTime', label: `${i18n.global.t('kubevirt.CreationTime')}`, field: row => row.status.creationTime, sortable: true, align: tableColumnAlign.left},
  {name: 'Error', label: `${i18n.global.t('kubevirt.Error')}`, field: row => row.status.error.message, sortable: true, align: tableColumnAlign.left},
];
export const extraVirtualMachineSnapshotContentColumns:Array<QTableColumn> = [
  {name: 'ReadyToUse', label: `${i18n.global.t('kubevirt.ReadyToUse')}`, field: row => row.status.readyToUse, sortable: true, align: tableColumnAlign.left},
  {name: 'CreationTime', label: `${i18n.global.t('kubevirt.CreationTime')}`, field: row => row.status.creationTime, sortable: true, align: tableColumnAlign.left},
  {name: 'Error', label: `${i18n.global.t('kubevirt.Error')}`, field: row => row.status.error.message, sortable: true, align: tableColumnAlign.left},
];
export const extraCDIColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Phase', label: `${i18n.global.t('kubevirt.Phase')}`, field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
];
export const extraCDIConfigColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraDataImportCronColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraDataSourceColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraDataVolumeColumns:Array<QTableColumn> = [
  {name: 'Phase', label: `${i18n.global.t('kubevirt.Phase')}`, field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
  {name: 'Progress', label: `${i18n.global.t('kubevirt.Progress')}`, field: row => row.status.progress, sortable: true, align: tableColumnAlign.left},
  {name: 'Restarts', label: `${i18n.global.t('kubevirt.Restarts')}`, field: row => row.status.restartCount, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraObjectTransferColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Phase', label: `${i18n.global.t('kubevirt.Phase')}`, field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
];
export const extraStorageProfileColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraVolumeCloneSourceColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraVolumeImportSourceColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraVolumeUploadSourceColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraHyperConvergedColumns:Array<QTableColumn> = [
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraHostPathProvisionerColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraSSPColumns:Array<QTableColumn> = [
  {name: 'Phase', label: `${i18n.global.t('kubevirt.Phase')}`, field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
];
export const KubeVirtListExcludes = [
  { path: 'status/phase', include: true },
];
export const KubeVirtReadExcludes = [
];
export const KubeVirtSimpleExcludes = [
];
export const VirtualMachineListExcludes = [
  { path: 'status/printableStatus', include: true },
];
export const VirtualMachineReadExcludes = [
];
export const VirtualMachineSimpleExcludes = [
];
export const VirtualMachineInstanceListExcludes = [
  { path: 'status/phase', include: true },
  { path: 'status/nodeName', include: true },
];
export const VirtualMachineInstanceReadExcludes = [
];
export const VirtualMachineInstanceSimpleExcludes = [
];
export const VirtualMachineInstanceMigrationListExcludes = [
  { path: 'status/phase', include: true },
  { path: 'spec/vmiName', include: true },
];
export const VirtualMachineInstanceMigrationReadExcludes = [
];
export const VirtualMachineInstanceMigrationSimpleExcludes = [
];
export const VirtualMachineInstancePresetListExcludes = [
];
export const VirtualMachineInstancePresetReadExcludes = [
];
export const VirtualMachineInstancePresetSimpleExcludes = [
];
export const VirtualMachineInstanceReplicaSetListExcludes = [
  { path: 'spec/replicas', include: true },
  { path: 'status/replicas', include: true },
  { path: 'status/readyReplicas', include: true },
];
export const VirtualMachineInstanceReplicaSetReadExcludes = [
];
export const VirtualMachineInstanceReplicaSetSimpleExcludes = [
];
export const VirtualMachineCloneListExcludes = [
  { path: 'status/phase', include: true },
  { path: 'spec/source/name', include: true },
  { path: 'spec/target/name', include: true },
];
export const VirtualMachineCloneReadExcludes = [
];
export const VirtualMachineCloneSimpleExcludes = [
];
export const VirtualMachineExportListExcludes = [
  { path: 'spec/source/kind', include: true },
  { path: 'spec/source/name', include: true },
  { path: 'status/phase', include: true },
];
export const VirtualMachineExportReadExcludes = [
];
export const VirtualMachineExportSimpleExcludes = [
];
export const VirtualMachineClusterInstancetypeListExcludes = [
];
export const VirtualMachineClusterInstancetypeReadExcludes = [
];
export const VirtualMachineClusterInstancetypeSimpleExcludes = [
];
export const VirtualMachineClusterPreferenceListExcludes = [
];
export const VirtualMachineClusterPreferenceReadExcludes = [
];
export const VirtualMachineClusterPreferenceSimpleExcludes = [
];
export const VirtualMachineInstancetypeListExcludes = [
];
export const VirtualMachineInstancetypeReadExcludes = [
];
export const VirtualMachineInstancetypeSimpleExcludes = [
];
export const VirtualMachinePreferenceListExcludes = [
];
export const VirtualMachinePreferenceReadExcludes = [
];
export const VirtualMachinePreferenceSimpleExcludes = [
];
export const MigrationPolicyListExcludes = [
];
export const MigrationPolicyReadExcludes = [
];
export const MigrationPolicySimpleExcludes = [
];
export const MTQListExcludes = [
  { path: 'status/phase', include: true },
];
export const MTQReadExcludes = [
];
export const MTQSimpleExcludes = [
];
export const VirtualMachinePoolListExcludes = [
  { path: 'spec/replicas', include: true },
  { path: 'status/replicas', include: true },
  { path: 'status/readyReplicas', include: true },
];
export const VirtualMachinePoolReadExcludes = [
];
export const VirtualMachinePoolSimpleExcludes = [
];
export const VirtualMachineRestoreListExcludes = [
  { path: 'spec/target/kind', include: true },
  { path: 'spec/target/name', include: true },
  { path: 'status/complete', include: true },
  { path: 'status/restoreTime', include: true },
  { path: 'status/error/message', include: true },
];
export const VirtualMachineRestoreReadExcludes = [
];
export const VirtualMachineRestoreSimpleExcludes = [
];
export const VirtualMachineSnapshotListExcludes = [
  { path: 'spec/source/kind', include: true },
  { path: 'spec/source/name', include: true },
  { path: 'status/phase', include: true },
  { path: 'status/readyToUse', include: true },
  { path: 'status/creationTime', include: true },
  { path: 'status/error/message', include: true },
];
export const VirtualMachineSnapshotReadExcludes = [
];
export const VirtualMachineSnapshotSimpleExcludes = [
];
export const VirtualMachineSnapshotContentListExcludes = [
  { path: 'status/readyToUse', include: true },
  { path: 'status/creationTime', include: true },
  { path: 'status/error/message', include: true },
];
export const VirtualMachineSnapshotContentReadExcludes = [
];
export const VirtualMachineSnapshotContentSimpleExcludes = [
];
export const CDIListExcludes = [
  { path: 'status/phase', include: true },
];
export const CDIReadExcludes = [
];
export const CDISimpleExcludes = [
];
export const CDIConfigListExcludes = [
];
export const CDIConfigReadExcludes = [
];
export const CDIConfigSimpleExcludes = [
];
export const DataImportCronListExcludes = [
];
export const DataImportCronReadExcludes = [
];
export const DataImportCronSimpleExcludes = [
];
export const DataSourceListExcludes = [
];
export const DataSourceReadExcludes = [
];
export const DataSourceSimpleExcludes = [
];
export const DataVolumeListExcludes = [
  { path: 'status/phase', include: true },
  { path: 'status/progress', include: true },
  { path: 'status/restartCount', include: true },
];
export const DataVolumeReadExcludes = [
];
export const DataVolumeSimpleExcludes = [
];
export const ObjectTransferListExcludes = [
  { path: 'status/phase', include: true },
];
export const ObjectTransferReadExcludes = [
];
export const ObjectTransferSimpleExcludes = [
];
export const StorageProfileListExcludes = [
];
export const StorageProfileReadExcludes = [
];
export const StorageProfileSimpleExcludes = [
];
export const VolumeCloneSourceListExcludes = [
];
export const VolumeCloneSourceReadExcludes = [
];
export const VolumeCloneSourceSimpleExcludes = [
];
export const VolumeImportSourceListExcludes = [
];
export const VolumeImportSourceReadExcludes = [
];
export const VolumeImportSourceSimpleExcludes = [
];
export const VolumeUploadSourceListExcludes = [
];
export const VolumeUploadSourceReadExcludes = [
];
export const VolumeUploadSourceSimpleExcludes = [
];
export const HyperConvergedListExcludes = [
];
export const HyperConvergedReadExcludes = [
];
export const HyperConvergedSimpleExcludes = [
];
export const HostPathProvisionerListExcludes = [
];
export const HostPathProvisionerReadExcludes = [
];
export const HostPathProvisionerSimpleExcludes = [
];
export const SSPListExcludes = [
  { path: 'status/phase', include: true },
];
export const SSPReadExcludes = [
];
export const SSPSimpleExcludes = [
];
