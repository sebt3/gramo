import { lists } from './query.MariaDB.js'
export const resolver = {
    mariadbMariaDBs: async (parent, args: object) => {
        return lists.mariadbMariaDBs(parent,{namespace: parent.metadata.name, ...args})
    }
};
