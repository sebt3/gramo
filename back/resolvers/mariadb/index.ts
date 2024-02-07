import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as BackupMutations, resolvers as BackupResolvers } from './Backup.js';
import { mutations as ConnectionMutations, resolvers as ConnectionResolvers } from './Connection.js';
import { mutations as DatabaseMutations, resolvers as DatabaseResolvers } from './Database.js';
import { mutations as GrantMutations, resolvers as GrantResolvers } from './Grant.js';
import { mutations as MariaDBMutations, resolvers as MariaDBResolvers } from './MariaDB.js';
import { mutations as RestoreMutations, resolvers as RestoreResolvers } from './Restore.js';
import { mutations as SqlJobMutations, resolvers as SqlJobResolvers } from './SqlJob.js';
import { mutations as UserMutations, resolvers as UserResolvers } from './User.js';
export const queries = {
    ...customQueries
};

export const resolvers = {
    ...BackupResolvers,
    ...ConnectionResolvers,
    ...DatabaseResolvers,
    ...GrantResolvers,
    ...MariaDBResolvers,
    ...RestoreResolvers,
    ...SqlJobResolvers,
    ...UserResolvers,
    ...customResolvers
};

export const mutations = {
    ...BackupMutations,
    ...ConnectionMutations,
    ...DatabaseMutations,
    ...GrantMutations,
    ...MariaDBMutations,
    ...RestoreMutations,
    ...SqlJobMutations,
    ...UserMutations,
    ...customMutations
};
