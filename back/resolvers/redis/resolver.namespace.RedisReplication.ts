import { lists } from './query.RedisReplication.js'
export const resolver = {
    redisRedisReplications: async (parent, args: object) => {
        return lists.redisRedisReplications(parent,{namespace: parent.metadata.name, ...args})
    }
};
