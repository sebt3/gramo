import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as RedisMutations, resolvers as RedisResolvers } from './Redis.js';
import { mutations as RedisClusterMutations, resolvers as RedisClusterResolvers } from './RedisCluster.js';
import { mutations as RedisReplicationMutations, resolvers as RedisReplicationResolvers } from './RedisReplication.js';
import { mutations as RedisSentinelMutations, resolvers as RedisSentinelResolvers } from './RedisSentinel.js';
export const queries = {
    ...customQueries
};

export const resolvers = {
    ...RedisResolvers,
    ...RedisClusterResolvers,
    ...RedisReplicationResolvers,
    ...RedisSentinelResolvers,
    ...customResolvers
};

export const mutations = {
    ...RedisMutations,
    ...RedisClusterMutations,
    ...RedisReplicationMutations,
    ...RedisSentinelMutations,
    ...customMutations
};
