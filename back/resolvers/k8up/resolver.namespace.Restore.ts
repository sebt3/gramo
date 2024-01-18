import { lists } from './query.Restore.js'
export const resolver = {
    k8upRestores: async (parent, args: object) => {
        return lists.k8upRestores(parent,{namespace: parent.metadata.name, ...args})
    }
};
