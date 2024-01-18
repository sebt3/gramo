import {menuLinksProps} from '../interfaces';
const cat = 'database';
const iconRedis = 'album';
const iconRedisCluster = 'album';
const iconRedisReplication = 'album';
const iconRedisSentinel = 'album';
export const link:menuLinksProps = {
  name: 'redis',
  title: 'Redis', icon: iconRedis,
  link: `/${cat}/redis/redis/`,
  level: 1,
  children: [
  {
    name: 'redisRediss',
    title: 'Redis', caption: 'List redis', icon: 'album',
    link: `/${cat}/redis/redis/`, level: 2, children: []
  },
  {
    name: 'redisRedisClusters',
    title: 'RedisCluster', caption: 'List redisCluster', icon: 'album',
    link: `/${cat}/redis/redisclusters/`, level: 2, children: []
  },
  {
    name: 'redisRedisReplications',
    title: 'RedisReplication', caption: 'List redisReplication', icon: 'album',
    link: `/${cat}/redis/redisreplications/`, level: 2, children: []
  },
  {
    name: 'redisRedisSentinels',
    title: 'RedisSentinel', caption: 'List redisSentinel', icon: 'album',
    link: `/${cat}/redis/redissentinels/`, level: 2, children: []
  },
  ]
}
export const descriptions = {
  redis:                {breadcrumb: 'Redis', icon: iconRedis, ns: false},
  redisRediss:        {breadcrumb: 'Redis', icon: iconRedis, ns: false},
  redisRedisAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  redisRedisTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  redisRedisView:     {breadcrumb: 'View', icon: iconRedis, ns: true},
  redisRedisEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  redisRedisCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  redisRedisClusters:        {breadcrumb: 'RedisCluster', icon: iconRedisCluster, ns: false},
  redisRedisClusterAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  redisRedisClusterTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  redisRedisClusterView:     {breadcrumb: 'View', icon: iconRedisCluster, ns: true},
  redisRedisClusterEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  redisRedisClusterCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  redisRedisReplications:        {breadcrumb: 'RedisReplication', icon: iconRedisReplication, ns: false},
  redisRedisReplicationAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  redisRedisReplicationTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  redisRedisReplicationView:     {breadcrumb: 'View', icon: iconRedisReplication, ns: true},
  redisRedisReplicationEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  redisRedisReplicationCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
  redisRedisSentinels:        {breadcrumb: 'RedisSentinel', icon: iconRedisSentinel, ns: false},
  redisRedisSentinelAllTable: {breadcrumb: 'All', icon: 'list', ns: false},
  redisRedisSentinelTable:    {breadcrumb: 'List', icon: 'list', ns: true},
  redisRedisSentinelView:     {breadcrumb: 'View', icon: iconRedisSentinel, ns: true},
  redisRedisSentinelEdit:     {breadcrumb: 'Edit', icon: 'visibility', ns: true},
  redisRedisSentinelCreate:   {breadcrumb: 'Create', icon: 'add', ns: true},
}
export const route = {
  path: 'redis',
  name: 'redis',
  redirect: {path: link.link as string},
  children: [
    {
      path: 'redis',
      name: 'redisRediss',
      children: [
        {
          path: '',
          name: 'redisRedisAllTable',
          component: () => import('../../components/redis/RedisAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'redisRedisTable',
          component: () => import('../../components/redis/RedisTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'redisRedisView',
          component: () => import('../../components/redis/RedisView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'redisRedisEdit',
          component: () => import('../../components/redis/RedisEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'redisRedisCreate',
          component: () => import('../../components/redis/RedisNew.vue'),
        }
      ]
    },
    {
      path: 'redisclusters',
      name: 'redisRedisClusters',
      children: [
        {
          path: '',
          name: 'redisRedisClusterAllTable',
          component: () => import('../../components/redis/RedisClusterAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'redisRedisClusterTable',
          component: () => import('../../components/redis/RedisClusterTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'redisRedisClusterView',
          component: () => import('../../components/redis/RedisClusterView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'redisRedisClusterEdit',
          component: () => import('../../components/redis/RedisClusterEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'redisRedisClusterCreate',
          component: () => import('../../components/redis/RedisClusterNew.vue'),
        }
      ]
    },
    {
      path: 'redisreplications',
      name: 'redisRedisReplications',
      children: [
        {
          path: '',
          name: 'redisRedisReplicationAllTable',
          component: () => import('../../components/redis/RedisReplicationAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'redisRedisReplicationTable',
          component: () => import('../../components/redis/RedisReplicationTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'redisRedisReplicationView',
          component: () => import('../../components/redis/RedisReplicationView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'redisRedisReplicationEdit',
          component: () => import('../../components/redis/RedisReplicationEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'redisRedisReplicationCreate',
          component: () => import('../../components/redis/RedisReplicationNew.vue'),
        }
      ]
    },
    {
      path: 'redissentinels',
      name: 'redisRedisSentinels',
      children: [
        {
          path: '',
          name: 'redisRedisSentinelAllTable',
          component: () => import('../../components/redis/RedisSentinelAllTable.vue'),
        },
        {
          path: ':namespace',
          name: 'redisRedisSentinelTable',
          component: () => import('../../components/redis/RedisSentinelTable.vue'),
        },
        {
          path: ':namespace/view/:name',
          name: 'redisRedisSentinelView',
          component: () => import('../../components/redis/RedisSentinelView.vue'),
        },
        {
          path: ':namespace/edit/:name',
          name: 'redisRedisSentinelEdit',
          component: () => import('../../components/redis/RedisSentinelEdit.vue'),
        },
        {
          path: ':namespace/create',
          name: 'redisRedisSentinelCreate',
          component: () => import('../../components/redis/RedisSentinelNew.vue'),
        }
      ]
    },
  ],
}
export default route
