import { lists } from './query.Cluster.js'
export const resolver = {
    postgresqlClusters: async (parent, args: object) => {
        return lists.postgresqlClusters(parent,{namespace: parent.metadata.name, ...args})
    }
};
