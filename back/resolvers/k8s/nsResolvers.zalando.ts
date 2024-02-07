import { nsResolver as postgresqlNSresolver } from '../zalando/postgresql.js';
import { nsResolver as KopfPeeringNSresolver } from '../zalando/KopfPeering.js';
export const resolvers = {
    ...postgresqlNSresolver,
    ...KopfPeeringNSresolver,
};
