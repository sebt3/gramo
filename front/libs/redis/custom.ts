// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign } from '../core'
export const redisIcon = 'apps';
export const redisTitle = 'Redis';
export const iconRedis = 'album';
export const colorRedis = '';
export const descriptionRedis = '';
export const shortRedis = '';
export const iconRedisCluster = 'album';
export const colorRedisCluster = '';
export const descriptionRedisCluster = '';
export const shortRedisCluster = '';
export const iconRedisReplication = 'album';
export const colorRedisReplication = '';
export const descriptionRedisReplication = '';
export const shortRedisReplication = '';
export const iconRedisSentinel = 'album';
export const colorRedisSentinel = '';
export const descriptionRedisSentinel = '';
export const shortRedisSentinel = '';
export const extraRedisColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraRedisClusterColumns:Array<QTableColumn> = [
  {name: 'ClusterSize', label: 'ClusterSize', field: row => row.spec.clusterSize, sortable: true, align: tableColumnAlign.left},
  {name: 'LeaderReplicas', label: 'LeaderReplicas', field: row => row.spec.redisLeader.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'FollowerReplicas', label: 'FollowerReplicas', field: row => row.spec.redisFollower.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: 'Age', field: row => row.metadata.creationTimestamp, sortable: true, align: tableColumnAlign.left},
];
export const extraRedisReplicationColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraRedisSentinelColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const RedisListExcludes = [
];
export const RedisReadExcludes = [
];
export const RedisSimpleExcludes = [
];
export const RedisClusterListExcludes = [
  { path: 'spec/clusterSize', include: true },
  { path: 'spec/redisLeader/replicas', include: true },
  { path: 'spec/redisFollower/replicas', include: true },
  { path: 'metadata/creationTimestamp', include: true },
];
export const RedisClusterReadExcludes = [
];
export const RedisClusterSimpleExcludes = [
];
export const RedisReplicationListExcludes = [
];
export const RedisReplicationReadExcludes = [
];
export const RedisReplicationSimpleExcludes = [
];
export const RedisSentinelListExcludes = [
];
export const RedisSentinelReadExcludes = [
];
export const RedisSentinelSimpleExcludes = [
];
