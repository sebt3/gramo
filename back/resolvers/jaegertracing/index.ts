import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as JaegerMutations, resolvers as JaegerResolvers } from './Jaeger.js';
export const queries = {
    ...customQueries
};

export const resolvers = {
    ...JaegerResolvers,
    ...customResolvers
};

export const mutations = {
    ...JaegerMutations,
    ...customMutations
};
