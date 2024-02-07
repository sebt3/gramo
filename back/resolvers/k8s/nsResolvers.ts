import { resolvers as k8sNSresolvers } from './nsResolvers.k8s.js';
import { resolvers as zalandoNSresolvers } from './nsResolvers.zalando.js';
import { resolvers as certmanagerNSresolvers } from './nsResolvers.certmanager.js';
import { resolvers as projectcalicoNSresolvers } from './nsResolvers.projectcalico.js';
import { resolvers as jaegertracingNSresolvers } from './nsResolvers.jaegertracing.js';
import { resolvers as k8upNSresolvers } from './nsResolvers.k8up.js';
import { resolvers as fluxcdNSresolvers } from './nsResolvers.fluxcd.js';
import { resolvers as mongodbNSresolvers } from './nsResolvers.mongodb.js';
import { resolvers as monitoringNSresolvers } from './nsResolvers.monitoring.js';
import { resolvers as cnpgNSresolvers } from './nsResolvers.cnpg.js';
import { resolvers as vynilNSresolvers } from './nsResolvers.vynil.js';
import { resolvers as mariadbNSresolvers } from './nsResolvers.mariadb.js';
import { resolvers as opentelemetryNSresolvers } from './nsResolvers.opentelemetry.js';
import { resolvers as secretgeneratorNSresolvers } from './nsResolvers.secretgenerator.js';
import { resolvers as traefikNSresolvers } from './nsResolvers.traefik.js';
import { resolvers as rabbitmqNSresolvers } from './nsResolvers.rabbitmq.js';
import { resolvers as redisNSresolvers } from './nsResolvers.redis.js';
import { resolvers as oracleNSresolvers } from './nsResolvers.oracle.js';
export const resolvers = {
    ...k8sNSresolvers,
    ...zalandoNSresolvers,
    ...certmanagerNSresolvers,
    ...projectcalicoNSresolvers,
    ...jaegertracingNSresolvers,
    ...k8upNSresolvers,
    ...fluxcdNSresolvers,
    ...mongodbNSresolvers,
    ...monitoringNSresolvers,
    ...cnpgNSresolvers,
    ...vynilNSresolvers,
    ...mariadbNSresolvers,
    ...opentelemetryNSresolvers,
    ...secretgeneratorNSresolvers,
    ...traefikNSresolvers,
    ...rabbitmqNSresolvers,
    ...redisNSresolvers,
    ...oracleNSresolvers,
};
