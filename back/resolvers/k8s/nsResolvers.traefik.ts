import { nsResolver as IngressRouteNSresolver } from '../traefik/IngressRoute.js';
import { nsResolver as IngressRouteTCPNSresolver } from '../traefik/IngressRouteTCP.js';
import { nsResolver as IngressRouteUDPNSresolver } from '../traefik/IngressRouteUDP.js';
import { nsResolver as MiddlewareNSresolver } from '../traefik/Middleware.js';
import { nsResolver as MiddlewareTCPNSresolver } from '../traefik/MiddlewareTCP.js';
import { nsResolver as ServersTransportNSresolver } from '../traefik/ServersTransport.js';
import { nsResolver as TLSOptionNSresolver } from '../traefik/TLSOption.js';
import { nsResolver as TLSStoreNSresolver } from '../traefik/TLSStore.js';
import { nsResolver as TraefikServiceNSresolver } from '../traefik/TraefikService.js';
export const resolvers = {
    ...IngressRouteNSresolver,
    ...IngressRouteTCPNSresolver,
    ...IngressRouteUDPNSresolver,
    ...MiddlewareNSresolver,
    ...MiddlewareTCPNSresolver,
    ...ServersTransportNSresolver,
    ...TLSOptionNSresolver,
    ...TLSStoreNSresolver,
    ...TraefikServiceNSresolver,
};
