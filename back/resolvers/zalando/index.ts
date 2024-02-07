import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as postgresqlMutations, resolvers as postgresqlResolvers } from './postgresql.js';
import { mutations as ClusterKopfPeeringMutations, resolvers as ClusterKopfPeeringResolvers, queries as ClusterKopfPeeringQueries } from './ClusterKopfPeering.js';
import { mutations as KopfPeeringMutations, resolvers as KopfPeeringResolvers } from './KopfPeering.js';
export const queries = {
    ...ClusterKopfPeeringQueries,
    ...customQueries
};

export const resolvers = {
    ...postgresqlResolvers,
    ...ClusterKopfPeeringResolvers,
    ...KopfPeeringResolvers,
    ...customResolvers
};

export const mutations = {
    ...postgresqlMutations,
    ...ClusterKopfPeeringMutations,
    ...KopfPeeringMutations,
    ...customMutations
};
