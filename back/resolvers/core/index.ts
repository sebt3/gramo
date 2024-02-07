import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';

export const queries = {
    ...customQueries
};

export const resolvers = {
    ...customResolvers
};

export const mutations = {
    ...customMutations
};
