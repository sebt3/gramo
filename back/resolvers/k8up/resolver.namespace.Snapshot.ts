import { lists } from './query.Snapshot.js'
export const resolver = {
    k8upSnapshots: async (parent, args: object) => {
        return lists.k8upSnapshots(parent,{namespace: parent.metadata.name, ...args})
    }
};
