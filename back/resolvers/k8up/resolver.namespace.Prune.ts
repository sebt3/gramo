import { lists } from './query.Prune.js'
export const resolver = {
    k8upPrunes: async (parent, args: object) => {
        return lists.k8upPrunes(parent,{namespace: parent.metadata.name, ...args})
    }
};
