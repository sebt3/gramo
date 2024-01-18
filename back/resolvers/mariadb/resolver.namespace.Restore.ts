import { lists } from './query.Restore.js'
export const resolver = {
    mariadbRestores: async (parent, args: object) => {
        return lists.mariadbRestores(parent,{namespace: parent.metadata.name, ...args})
    }
};
