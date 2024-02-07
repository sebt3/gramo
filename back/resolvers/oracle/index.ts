import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as InnoDBClusterMutations, resolvers as InnoDBClusterResolvers } from './InnoDBCluster.js';
import { mutations as MySQLBackupMutations, resolvers as MySQLBackupResolvers } from './MySQLBackup.js';
export const queries = {
    ...customQueries
};

export const resolvers = {
    ...InnoDBClusterResolvers,
    ...MySQLBackupResolvers,
    ...customResolvers
};

export const mutations = {
    ...InnoDBClusterMutations,
    ...MySQLBackupMutations,
    ...customMutations
};
