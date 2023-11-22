import { queries } from './query.Bucket.js'
export const resolver = {
    fluxcdBuckets: async (parent, args: object) => {
        return queries.fluxcdBuckets(parent,{namespace: parent.metadata.name, ...args})
    }
};
