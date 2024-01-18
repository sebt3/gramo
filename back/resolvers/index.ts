import * as vynil from './vynil/index.js';
import * as fluxcd from './fluxcd/index.js';
import * as core from './core/index.js';
import * as secretgenerator from './secretgenerator/index.js';
import * as k8up from './k8up/index.js';
import * as mariadb from './mariadb/index.js';
import * as mongodbcommunity from './mongodbcommunity/index.js';
import * as monitoring from './monitoring/index.js';
import * as postgresql from './postgresql/index.js';
import * as redis from './redis/index.js';
export const resolvers = {
  ...core.resolvers,
  ...vynil.resolvers,
  ...secretgenerator.resolvers,
  ...fluxcd.resolvers,
  ...k8up.resolvers,
  ...mariadb.resolvers,
  ...mongodbcommunity.resolvers,
  ...monitoring.resolvers,
  ...postgresql.resolvers,
  ...redis.resolvers,
  Query: {
    ...core.queries,
    ...vynil.queries,
    ...fluxcd.queries,
    ...k8up.queries,
    ...mariadb.queries,
    ...mongodbcommunity.queries,
    ...monitoring.queries,
    ...postgresql.queries,
    ...secretgenerator.queries,
    ...redis.queries,
  },
  Mutation: {
    ...core.mutations,
    ...vynil.mutations,
    ...fluxcd.mutations,
    ...k8up.mutations,
    ...mariadb.mutations,
    ...mongodbcommunity.mutations,
    ...monitoring.mutations,
    ...postgresql.mutations,
    ...secretgenerator.mutations,
    ...redis.mutations,
  }
};
