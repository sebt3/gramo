import * as core from './core/index.js';
import * as k8s from './k8s/index.js';
import * as zalando from './zalando/index.js';
import * as certmanager from './certmanager/index.js';
import * as projectcalico from './projectcalico/index.js';
import * as jaegertracing from './jaegertracing/index.js';
import * as k8up from './k8up/index.js';
import * as fluxcd from './fluxcd/index.js';
import * as mongodb from './mongodb/index.js';
import * as monitoring from './monitoring/index.js';
import * as cnpg from './cnpg/index.js';
import * as vynil from './vynil/index.js';
import * as mariadb from './mariadb/index.js';
import * as opentelemetry from './opentelemetry/index.js';
import * as secretgenerator from './secretgenerator/index.js';
import * as traefik from './traefik/index.js';
import * as rabbitmq from './rabbitmq/index.js';
import * as redis from './redis/index.js';
import * as oracle from './oracle/index.js';

export const resolvers = {
  ...k8s.resolvers,
  ...zalando.resolvers,
  ...certmanager.resolvers,
  ...projectcalico.resolvers,
  ...jaegertracing.resolvers,
  ...k8up.resolvers,
  ...fluxcd.resolvers,
  ...mongodb.resolvers,
  ...monitoring.resolvers,
  ...cnpg.resolvers,
  ...vynil.resolvers,
  ...mariadb.resolvers,
  ...opentelemetry.resolvers,
  ...secretgenerator.resolvers,
  ...traefik.resolvers,
  ...rabbitmq.resolvers,
  ...redis.resolvers,
  ...oracle.resolvers,
  ...core.resolvers,
  Query: {
    ...k8s.queries,
    ...zalando.queries,
    ...certmanager.queries,
    ...projectcalico.queries,
    ...jaegertracing.queries,
    ...k8up.queries,
    ...fluxcd.queries,
    ...mongodb.queries,
    ...monitoring.queries,
    ...cnpg.queries,
    ...vynil.queries,
    ...mariadb.queries,
    ...opentelemetry.queries,
    ...secretgenerator.queries,
    ...traefik.queries,
    ...rabbitmq.queries,
    ...redis.queries,
    ...oracle.queries,
    ...core.queries
  },
  Mutation: {
    ...k8s.mutations,
    ...zalando.mutations,
    ...certmanager.mutations,
    ...projectcalico.mutations,
    ...jaegertracing.mutations,
    ...k8up.mutations,
    ...fluxcd.mutations,
    ...mongodb.mutations,
    ...monitoring.mutations,
    ...cnpg.mutations,
    ...vynil.mutations,
    ...mariadb.mutations,
    ...opentelemetry.mutations,
    ...secretgenerator.mutations,
    ...traefik.mutations,
    ...rabbitmq.mutations,
    ...redis.mutations,
    ...oracle.mutations,
    ...core.mutations
  }
};
