import { lists } from './query.InnoDBCluster.js'
export const resolver = {
    mysqlInnoDBClusters: async (parent, args: object) => {
        return lists.mysqlInnoDBClusters(parent,{namespace: parent.metadata.name, ...args})
    }
};
