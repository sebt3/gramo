// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
export const zalandoIcon = 'apps';
export const zalandoTitle = 'Zalando PG';
export const iconpostgresql = 'album';
export const colorpostgresql = '';
export const descriptionpostgresql = '';
export const shortpostgresql = '';
export const iconClusterKopfPeering = 'album';
export const colorClusterKopfPeering = '';
export const descriptionClusterKopfPeering = '';
export const shortClusterKopfPeering = '';
export const iconKopfPeering = 'album';
export const colorKopfPeering = '';
export const descriptionKopfPeering = '';
export const shortKopfPeering = '';
export const extrapostgresqlColumns:Array<QTableColumn> = [
  {name: 'Team', label: 'Team', field: row => row.spec.teamId, sortable: true, align: tableColumnAlign.left},
  {name: 'Version', label: 'Version', field: row => row.spec.postgresql.version, sortable: true, align: tableColumnAlign.left},
  {name: 'Pods', label: 'Pods', field: row => row.spec.numberOfInstances, sortable: true, align: tableColumnAlign.left},
  {name: 'Volume', label: 'Volume', field: row => row.spec.volume.size, sortable: true, align: tableColumnAlign.left},
  {name: 'CPU-Request', label: 'CPU-Request', field: row => row.spec.resources.requests.cpu, sortable: true, align: tableColumnAlign.left},
  {name: 'Memory-Request', label: 'Memory-Request', field: row => row.spec.resources.requests.memory, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
  {name: 'Status', label: 'Status', field: row => row.status.PostgresClusterStatus, sortable: true, align: tableColumnAlign.left},
];
export const extraClusterKopfPeeringColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraKopfPeeringColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const postgresqlListExcludes = [
  { path: 'spec/teamId', include: true },
  { path: 'spec/postgresql/version', include: true },
  { path: 'spec/numberOfInstances', include: true },
  { path: 'spec/volume/size', include: true },
  { path: 'spec/resources/requests/cpu', include: true },
  { path: 'spec/resources/requests/memory', include: true },
  { path: 'metadata/creationTimestamp', include: true },
  { path: 'status/PostgresClusterStatus', include: true },
];
export const postgresqlReadExcludes = [
];
export const postgresqlSimpleExcludes = [
];
export const ClusterKopfPeeringListExcludes = [
];
export const ClusterKopfPeeringReadExcludes = [
];
export const ClusterKopfPeeringSimpleExcludes = [
];
export const KopfPeeringListExcludes = [
];
export const KopfPeeringReadExcludes = [
];
export const KopfPeeringSimpleExcludes = [
];
