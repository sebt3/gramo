import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as DistribMutations, resolvers as DistribResolvers, queries as DistribQueries } from './Distrib.js';
import { mutations as InstallMutations, resolvers as InstallResolvers } from './Install.js';
export const queries = {
    ...DistribQueries,
    ...customQueries
};

export const resolvers = {
    ...DistribResolvers,
    ...InstallResolvers,
    ...customResolvers
};

export const mutations = {
    ...DistribMutations,
    ...InstallMutations,
    ...customMutations
};
