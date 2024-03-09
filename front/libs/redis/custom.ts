// noGramoGenerator
import { QTableColumn } from 'quasar'
import { tableColumnAlign, timeAgo } from '../core'
import { i18n } from "../i18n"
import { databaseColor, databaseIcon, installIcon } from '../../routes/custom';
export const redisIcon = databaseIcon;
export const redisTitle = 'Redis';
export const iconRedis = databaseIcon;
export const colorRedis = databaseColor;
export const descriptionRedis = '';
export const shortRedis = 'Redis';
export const iconRedisCluster = databaseIcon;
export const colorRedisCluster = databaseColor;
export const descriptionRedisCluster = '';
export const shortRedisCluster = 'RedisCluster';
export const iconRedisReplication = databaseIcon;
export const colorRedisReplication = databaseColor;
export const descriptionRedisReplication = '';
export const shortRedisReplication = 'RedisReplication';
export const iconRedisSentinel = installIcon;
export const colorRedisSentinel = databaseColor;
export const descriptionRedisSentinel = '';
export const shortRedisSentinel = 'RedisSentinel';
export const extraRedisColumns:Array<QTableColumn> = [
//  {name: 'Name', label: 'Name', field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left},
];
export const extraRedisClusterColumns:Array<QTableColumn> = [
  {name: 'ClusterSize', label: `${i18n.global.t('redis.ClusterSize')}`, field: row => row.spec.clusterSize, sortable: true, align: tableColumnAlign.left},
  {name: 'LeaderReplicas', label: `${i18n.global.t('redis.LeaderReplicas')}`, field: row => row.spec.redisLeader.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'FollowerReplicas', label: `${i18n.global.t('redis.FollowerReplicas')}`, field: row => row.spec.redisFollower.replicas, sortable: true, align: tableColumnAlign.left},
  {name: 'Age', label: `${i18n.global.t('meta.age')}`, field: row => timeAgo(row.metadata.creationTimestamp), sortable: true, align: tableColumnAlign.left},
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
