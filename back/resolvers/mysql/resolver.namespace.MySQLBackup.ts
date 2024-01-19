import { lists } from './query.MySQLBackup.js'
export const resolver = {
    mysqlMySQLBackups: async (parent, args: object) => {
        return lists.mysqlMySQLBackups(parent,{namespace: parent.metadata.name, ...args})
    }
};
