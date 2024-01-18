import { lists } from './query.Backup.js'
export const resolver = {
    k8upBackups: async (parent, args: object) => {
        return lists.k8upBackups(parent,{namespace: parent.metadata.name, ...args})
    }
};
