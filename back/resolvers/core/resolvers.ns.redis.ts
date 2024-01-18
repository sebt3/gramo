
import { resolver as RedisNSresolver } from '../redis/resolver.namespace.Redis.js';
import { resolver as RedisClusterNSresolver } from '../redis/resolver.namespace.RedisCluster.js';
import { resolver as RedisReplicationNSresolver } from '../redis/resolver.namespace.RedisReplication.js';
import { resolver as RedisSentinelNSresolver } from '../redis/resolver.namespace.RedisSentinel.js';
export const resolvers = {
    ...RedisNSresolver,
    ...RedisClusterNSresolver,
    ...RedisReplicationNSresolver,
    ...RedisSentinelNSresolver,
};
