import { nsResolver as BackupNSresolver } from '../cnpg/Backup.js';
import { nsResolver as ClusterNSresolver } from '../cnpg/Cluster.js';
import { nsResolver as PoolerNSresolver } from '../cnpg/Pooler.js';
import { nsResolver as ScheduledBackupNSresolver } from '../cnpg/ScheduledBackup.js';
export const resolvers = {
    ...BackupNSresolver,
    ...ClusterNSresolver,
    ...PoolerNSresolver,
    ...ScheduledBackupNSresolver,
};
