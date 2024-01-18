import { lists } from './query.Backup.js'
export const resolver = {
    postgresqlBackups: async (parent, args: object) => {
        return lists.postgresqlBackups(parent,{namespace: parent.metadata.name, ...args})
    }
};
