import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as BackupMutations, resolvers as BackupResolvers } from './Backup.js';
import { mutations as ClusterMutations, resolvers as ClusterResolvers } from './Cluster.js';
import { mutations as PoolerMutations, resolvers as PoolerResolvers } from './Pooler.js';
import { mutations as ScheduledBackupMutations, resolvers as ScheduledBackupResolvers } from './ScheduledBackup.js';
export const queries = {
    ...customQueries
};

export const resolvers = {
    ...BackupResolvers,
    ...ClusterResolvers,
    ...PoolerResolvers,
    ...ScheduledBackupResolvers,
    ...customResolvers
};

export const mutations = {
    ...BackupMutations,
    ...ClusterMutations,
    ...PoolerMutations,
    ...ScheduledBackupMutations,
    ...customMutations
};
