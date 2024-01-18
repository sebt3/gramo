
import { resolver as BackupNSresolver } from '../mariadb/resolver.namespace.Backup.js';
import { resolver as ConnectionNSresolver } from '../mariadb/resolver.namespace.Connection.js';
import { resolver as DatabaseNSresolver } from '../mariadb/resolver.namespace.Database.js';
import { resolver as GrantNSresolver } from '../mariadb/resolver.namespace.Grant.js';
import { resolver as MariaDBNSresolver } from '../mariadb/resolver.namespace.MariaDB.js';
import { resolver as RestoreNSresolver } from '../mariadb/resolver.namespace.Restore.js';
import { resolver as SqlJobNSresolver } from '../mariadb/resolver.namespace.SqlJob.js';
import { resolver as UserNSresolver } from '../mariadb/resolver.namespace.User.js';
export const resolvers = {
    ...BackupNSresolver,
    ...ConnectionNSresolver,
    ...DatabaseNSresolver,
    ...GrantNSresolver,
    ...MariaDBNSresolver,
    ...RestoreNSresolver,
    ...SqlJobNSresolver,
    ...UserNSresolver,
};
