
import { queries as RedisQueries } from './query.Redis.js';
import { mutations as RedisMutations } from './mutation.Redis.js';
import { queries as RedisClusterQueries } from './query.RedisCluster.js';
import { mutations as RedisClusterMutations } from './mutation.RedisCluster.js';
import { queries as RedisReplicationQueries } from './query.RedisReplication.js';
import { mutations as RedisReplicationMutations } from './mutation.RedisReplication.js';
import { queries as RedisSentinelQueries } from './query.RedisSentinel.js';
import { mutations as RedisSentinelMutations } from './mutation.RedisSentinel.js';
export const queries = {
    ...RedisQueries,
    ...RedisClusterQueries,
    ...RedisReplicationQueries,
    ...RedisSentinelQueries,
};

export const resolvers = {
};

export const mutations = {
    ...RedisMutations,
    ...RedisClusterMutations,
    ...RedisReplicationMutations,
    ...RedisSentinelMutations,
};
