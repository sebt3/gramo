import { lists } from './query.Check.js'
export const resolver = {
    k8upChecks: async (parent, args: object) => {
        return lists.k8upChecks(parent,{namespace: parent.metadata.name, ...args})
    }
};
