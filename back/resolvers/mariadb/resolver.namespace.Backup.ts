import { lists } from './query.Backup.js'
export const resolver = {
    mariadbBackups: async (parent, args: object) => {
        return lists.mariadbBackups(parent,{namespace: parent.metadata.name, ...args})
    }
};
