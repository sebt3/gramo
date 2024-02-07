import {menuLinksProps} from '../interfaces';
import { iconRedis, iconRedisCluster, iconRedisReplication, iconRedisSentinel,  redisIcon, redisTitle }from '../../libs/redis/custom.js'
import {  } from '../custom.js';
import { useCRDStore } from '../../stores'
const crds = useCRDStore().crds;
export const link:menuLinksProps = {
  name: 'databaseredis',
  title: redisTitle, icon: redisIcon,
  link: '/database/redis/',
  level: 1,
  children: [
  crds['redis.redis.redis.opstreelabs.in'] == undefined?[]:[{
    name: 'redisRediss',
    title: 'Redis', caption: 'List Redis', icon: iconRedis,
    link: '/database/redis/Redis/', level: 2, children: []
  }],
  crds['redisclusters.redis.redis.opstreelabs.in'] == undefined?[]:[{
    name: 'redisRedisClusters',
    title: 'RedisCluster', caption: 'List RedisCluster', icon: iconRedisCluster,
    link: '/database/redis/RedisCluster/', level: 2, children: []
  }],
  crds['redisreplications.redis.redis.opstreelabs.in'] == undefined?[]:[{
    name: 'redisRedisReplications',
    title: 'RedisReplication', caption: 'List RedisReplication', icon: iconRedisReplication,
    link: '/database/redis/RedisReplication/', level: 2, children: []
  }],
  crds['redissentinels.redis.redis.opstreelabs.in'] == undefined?[]:[{
    name: 'redisRedisSentinels',
    title: 'RedisSentinel', caption: 'List RedisSentinel', icon: iconRedisSentinel,
    link: '/database/redis/RedisSentinel/', level: 2, children: []
  }],
  ].flat()
}
export const descriptions = {
  databaseredis:                {breadcrumb: redisTitle, icon: redisIcon, ns: false},
  databaseredisDashboard:       {breadcrumb: 'Dashboard', icon: redisIcon, ns: false},
  redisRedis:        {breadcrumb: 'Redis', icon: iconRedis, ns: false},
  redisRedisAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  redisRedisTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  redisRedisView:     {breadcrumb: 'View', icon: iconRedis, ns: true },
  redisRedisEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  redisRedisCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  redisRedisCluster:        {breadcrumb: 'RedisCluster', icon: iconRedisCluster, ns: false},
  redisRedisClusterAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  redisRedisClusterTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  redisRedisClusterView:     {breadcrumb: 'View', icon: iconRedisCluster, ns: true },
  redisRedisClusterEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  redisRedisClusterCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  redisRedisReplication:        {breadcrumb: 'RedisReplication', icon: iconRedisReplication, ns: false},
  redisRedisReplicationAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  redisRedisReplicationTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  redisRedisReplicationView:     {breadcrumb: 'View', icon: iconRedisReplication, ns: true },
  redisRedisReplicationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  redisRedisReplicationCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
  redisRedisSentinel:        {breadcrumb: 'RedisSentinel', icon: iconRedisSentinel, ns: false},
  redisRedisSentinelAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  redisRedisSentinelTable:    {breadcrumb: 'List', icon: 'list', ns: true },
  redisRedisSentinelView:     {breadcrumb: 'View', icon: iconRedisSentinel, ns: true },
  redisRedisSentinelEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true },
  redisRedisSentinelCreate:   {breadcrumb: 'Create', icon: 'add', ns: true },
}
export const route = {
  path: 'redis',
  name: 'databaseredis',
  redirect: {path: link.link as string},
  children: [
    {
      path: '',
      name: 'databaseredisDashboard',
      component: () => import('../../pages/database/redis/Dashboard.vue'),
    },
    {
      path: 'Redis',
      name: 'redisRedis',
      children: [
        {
          path: '',
          name: 'redisRedisAllTable',
          component: () => import('../../pages/database/redis/RedisList.vue'),
        },
        {
          path: ':namespace',
          name: 'redisRedisTable',
          component: () => import('../../pages/database/redis/RedisList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'redisRedisView',
          component: () => import('../../pages/database/redis/RedisView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'redisRedisEdit',
          component: () => import('../../pages/database/redis/RedisEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'redisRedisCreate',
          component: () => import('../../pages/database/redis/RedisNew.vue'),
        }
      ]
    },
    {
      path: 'RedisCluster',
      name: 'redisRedisCluster',
      children: [
        {
          path: '',
          name: 'redisRedisClusterAllTable',
          component: () => import('../../pages/database/redis/RedisClusterList.vue'),
        },
        {
          path: ':namespace',
          name: 'redisRedisClusterTable',
          component: () => import('../../pages/database/redis/RedisClusterList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'redisRedisClusterView',
          component: () => import('../../pages/database/redis/RedisClusterView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'redisRedisClusterEdit',
          component: () => import('../../pages/database/redis/RedisClusterEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'redisRedisClusterCreate',
          component: () => import('../../pages/database/redis/RedisClusterNew.vue'),
        }
      ]
    },
    {
      path: 'RedisReplication',
      name: 'redisRedisReplication',
      children: [
        {
          path: '',
          name: 'redisRedisReplicationAllTable',
          component: () => import('../../pages/database/redis/RedisReplicationList.vue'),
        },
        {
          path: ':namespace',
          name: 'redisRedisReplicationTable',
          component: () => import('../../pages/database/redis/RedisReplicationList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'redisRedisReplicationView',
          component: () => import('../../pages/database/redis/RedisReplicationView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'redisRedisReplicationEdit',
          component: () => import('../../pages/database/redis/RedisReplicationEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'redisRedisReplicationCreate',
          component: () => import('../../pages/database/redis/RedisReplicationNew.vue'),
        }
      ]
    },
    {
      path: 'RedisSentinel',
      name: 'redisRedisSentinel',
      children: [
        {
          path: '',
          name: 'redisRedisSentinelAllTable',
          component: () => import('../../pages/database/redis/RedisSentinelList.vue'),
        },
        {
          path: ':namespace',
          name: 'redisRedisSentinelTable',
          component: () => import('../../pages/database/redis/RedisSentinelList.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'redisRedisSentinelView',
          component: () => import('../../pages/database/redis/RedisSentinelView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'redisRedisSentinelEdit',
          component: () => import('../../pages/database/redis/RedisSentinelEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'redisRedisSentinelCreate',
          component: () => import('../../pages/database/redis/RedisSentinelNew.vue'),
        }
      ]
    },
  ],
}
export default route
