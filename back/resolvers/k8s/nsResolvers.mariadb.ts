import { nsResolver as BackupNSresolver } from '../mariadb/Backup.js';
import { nsResolver as ConnectionNSresolver } from '../mariadb/Connection.js';
import { nsResolver as DatabaseNSresolver } from '../mariadb/Database.js';
import { nsResolver as GrantNSresolver } from '../mariadb/Grant.js';
import { nsResolver as MariaDBNSresolver } from '../mariadb/MariaDB.js';
import { nsResolver as RestoreNSresolver } from '../mariadb/Restore.js';
import { nsResolver as SqlJobNSresolver } from '../mariadb/SqlJob.js';
import { nsResolver as UserNSresolver } from '../mariadb/User.js';
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
