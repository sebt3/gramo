
import { resolver as BackupNSresolver } from '../postgresql/resolver.namespace.Backup.js';
import { resolver as ClusterNSresolver } from '../postgresql/resolver.namespace.Cluster.js';
import { resolver as PoolerNSresolver } from '../postgresql/resolver.namespace.Pooler.js';
import { resolver as ScheduledBackupNSresolver } from '../postgresql/resolver.namespace.ScheduledBackup.js';
export const resolvers = {
    ...BackupNSresolver,
    ...ClusterNSresolver,
    ...PoolerNSresolver,
    ...ScheduledBackupNSresolver,
};
