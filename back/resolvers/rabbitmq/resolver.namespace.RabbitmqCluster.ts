import { lists } from './query.RabbitmqCluster.js'
export const resolver = {
    rabbitmqRabbitmqClusters: async (parent, args: object) => {
        return lists.rabbitmqRabbitmqClusters(parent,{namespace: parent.metadata.name, ...args})
    }
};
