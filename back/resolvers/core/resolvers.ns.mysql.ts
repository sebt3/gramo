
import { resolver as InnoDBClusterNSresolver } from '../mysql/resolver.namespace.InnoDBCluster.js';
import { resolver as MySQLBackupNSresolver } from '../mysql/resolver.namespace.MySQLBackup.js';
export const resolvers = {
    ...InnoDBClusterNSresolver,
    ...MySQLBackupNSresolver,
};
