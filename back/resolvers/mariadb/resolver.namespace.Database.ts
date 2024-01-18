import { lists } from './query.Database.js'
export const resolver = {
    mariadbDatabases: async (parent, args: object) => {
        return lists.mariadbDatabases(parent,{namespace: parent.metadata.name, ...args})
    }
};
