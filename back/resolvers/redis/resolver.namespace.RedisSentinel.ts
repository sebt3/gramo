import { lists } from './query.RedisSentinel.js'
export const resolver = {
    redisRedisSentinels: async (parent, args: object) => {
        return lists.redisRedisSentinels(parent,{namespace: parent.metadata.name, ...args})
    }
};
