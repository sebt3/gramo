import { nsResolver as RedisNSresolver } from '../redis/Redis.js';
import { nsResolver as RedisClusterNSresolver } from '../redis/RedisCluster.js';
import { nsResolver as RedisReplicationNSresolver } from '../redis/RedisReplication.js';
import { nsResolver as RedisSentinelNSresolver } from '../redis/RedisSentinel.js';
export const resolvers = {
    ...RedisNSresolver,
    ...RedisClusterNSresolver,
    ...RedisReplicationNSresolver,
    ...RedisSentinelNSresolver,
};
