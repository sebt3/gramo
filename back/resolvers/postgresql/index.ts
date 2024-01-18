
import { queries as BackupQueries } from './query.Backup.js';
import { mutations as BackupMutations } from './mutation.Backup.js';
import { queries as ClusterQueries } from './query.Cluster.js';
import { mutations as ClusterMutations } from './mutation.Cluster.js';
import { queries as PoolerQueries } from './query.Pooler.js';
import { mutations as PoolerMutations } from './mutation.Pooler.js';
import { queries as ScheduledBackupQueries } from './query.ScheduledBackup.js';
import { mutations as ScheduledBackupMutations } from './mutation.ScheduledBackup.js';
export const queries = {
    ...BackupQueries,
    ...ClusterQueries,
    ...PoolerQueries,
    ...ScheduledBackupQueries,
};

export const resolvers = {
};

export const mutations = {
    ...BackupMutations,
    ...ClusterMutations,
    ...PoolerMutations,
    ...ScheduledBackupMutations,
};
