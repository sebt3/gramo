
import { queries as BackupQueries } from './query.Backup.js';
import { mutations as BackupMutations } from './mutation.Backup.js';
import { queries as ConnectionQueries } from './query.Connection.js';
import { mutations as ConnectionMutations } from './mutation.Connection.js';
import { queries as DatabaseQueries } from './query.Database.js';
import { mutations as DatabaseMutations } from './mutation.Database.js';
import { queries as GrantQueries } from './query.Grant.js';
import { mutations as GrantMutations } from './mutation.Grant.js';
import { queries as MariaDBQueries } from './query.MariaDB.js';
import { mutations as MariaDBMutations } from './mutation.MariaDB.js';
import { queries as RestoreQueries } from './query.Restore.js';
import { mutations as RestoreMutations } from './mutation.Restore.js';
import { queries as SqlJobQueries } from './query.SqlJob.js';
import { mutations as SqlJobMutations } from './mutation.SqlJob.js';
import { queries as UserQueries } from './query.User.js';
import { mutations as UserMutations } from './mutation.User.js';
export const queries = {
    ...BackupQueries,
    ...ConnectionQueries,
    ...DatabaseQueries,
    ...GrantQueries,
    ...MariaDBQueries,
    ...RestoreQueries,
    ...SqlJobQueries,
    ...UserQueries,
};

export const resolvers = {
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
};
