import { lists } from './query.Redis.js'
export const resolver = {
    redisRediss: async (parent, args: object) => {
        return lists.redisRediss(parent,{namespace: parent.metadata.name, ...args})
    }
};
