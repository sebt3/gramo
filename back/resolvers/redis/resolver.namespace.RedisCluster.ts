import { lists } from './query.RedisCluster.js'
export const resolver = {
    redisRedisClusters: async (parent, args: object) => {
        return lists.redisRedisClusters(parent,{namespace: parent.metadata.name, ...args})
    }
};
