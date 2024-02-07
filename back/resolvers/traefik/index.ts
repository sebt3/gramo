import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as IngressRouteMutations, resolvers as IngressRouteResolvers } from './IngressRoute.js';
import { mutations as IngressRouteTCPMutations, resolvers as IngressRouteTCPResolvers } from './IngressRouteTCP.js';
import { mutations as IngressRouteUDPMutations, resolvers as IngressRouteUDPResolvers } from './IngressRouteUDP.js';
import { mutations as MiddlewareMutations, resolvers as MiddlewareResolvers } from './Middleware.js';
import { mutations as MiddlewareTCPMutations, resolvers as MiddlewareTCPResolvers } from './MiddlewareTCP.js';
import { mutations as ServersTransportMutations, resolvers as ServersTransportResolvers } from './ServersTransport.js';
import { mutations as TLSOptionMutations, resolvers as TLSOptionResolvers } from './TLSOption.js';
import { mutations as TLSStoreMutations, resolvers as TLSStoreResolvers } from './TLSStore.js';
import { mutations as TraefikServiceMutations, resolvers as TraefikServiceResolvers } from './TraefikService.js';
export const queries = {
    ...customQueries
};

export const resolvers = {
    ...IngressRouteResolvers,
    ...IngressRouteTCPResolvers,
    ...IngressRouteUDPResolvers,
    ...MiddlewareResolvers,
    ...MiddlewareTCPResolvers,
    ...ServersTransportResolvers,
    ...TLSOptionResolvers,
    ...TLSStoreResolvers,
    ...TraefikServiceResolvers,
    ...customResolvers
};

export const mutations = {
    ...IngressRouteMutations,
    ...IngressRouteTCPMutations,
    ...IngressRouteUDPMutations,
    ...MiddlewareMutations,
    ...MiddlewareTCPMutations,
    ...ServersTransportMutations,
    ...TLSOptionMutations,
    ...TLSStoreMutations,
    ...TraefikServiceMutations,
    ...customMutations
};
