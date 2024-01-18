import { lists } from './query.Archive.js'
export const resolver = {
    k8upArchives: async (parent, args: object) => {
        return lists.k8upArchives(parent,{namespace: parent.metadata.name, ...args})
    }
};
