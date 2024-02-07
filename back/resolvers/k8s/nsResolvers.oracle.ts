import { nsResolver as InnoDBClusterNSresolver } from '../oracle/InnoDBCluster.js';
import { nsResolver as MySQLBackupNSresolver } from '../oracle/MySQLBackup.js';
export const resolvers = {
    ...InnoDBClusterNSresolver,
    ...MySQLBackupNSresolver,
};
