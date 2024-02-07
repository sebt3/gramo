import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as RabbitmqClusterMutations, resolvers as RabbitmqClusterResolvers } from './RabbitmqCluster.js';
export const queries = {
    ...customQueries
};

export const resolvers = {
    ...RabbitmqClusterResolvers,
    ...customResolvers
};

export const mutations = {
    ...RabbitmqClusterMutations,
    ...customMutations
};
