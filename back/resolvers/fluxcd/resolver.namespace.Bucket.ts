import { lists } from './query.Bucket.js'
export const resolver = {
    fluxcdBuckets: async (parent, args: object) => {
        return lists.fluxcdBuckets(parent,{namespace: parent.metadata.name, ...args})
    }
};
