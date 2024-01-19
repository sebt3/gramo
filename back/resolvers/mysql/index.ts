
import { queries as InnoDBClusterQueries } from './query.InnoDBCluster.js';
import { mutations as InnoDBClusterMutations } from './mutation.InnoDBCluster.js';
import { queries as MySQLBackupQueries } from './query.MySQLBackup.js';
import { mutations as MySQLBackupMutations } from './mutation.MySQLBackup.js';
export const queries = {
    ...InnoDBClusterQueries,
    ...MySQLBackupQueries,
};

export const resolvers = {
};

export const mutations = {
    ...InnoDBClusterMutations,
    ...MySQLBackupMutations,
};
