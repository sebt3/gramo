// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
export const mongodbIcon = 'apps';
export const mongodbTitle = 'MongoDB';
export const iconMongoDBCommunity = 'album';
export const colorMongoDBCommunity = '';
export const descriptionMongoDBCommunity = '';
export const shortMongoDBCommunity = '';
export const extraMongoDBCommunityColumns:Array<QTableColumn> = [
  {name: 'Phase', label: 'Phase', field: row => row.status.phase, sortable: true, align: tableColumnAlign.left},
  {name: 'Version', label: 'Version', field: row => row.status.version, sortable: true, align: tableColumnAlign.left},
];
export const MongoDBCommunityListExcludes = [
  { path: 'status/phase', include: true },
  { path: 'status/version', include: true },
];
export const MongoDBCommunityReadExcludes = [
];
export const MongoDBCommunitySimpleExcludes = [
];
