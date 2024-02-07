import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as MongoDBCommunityMutations, resolvers as MongoDBCommunityResolvers } from './MongoDBCommunity.js';
export const queries = {
    ...customQueries
};

export const resolvers = {
    ...MongoDBCommunityResolvers,
    ...customResolvers
};

export const mutations = {
    ...MongoDBCommunityMutations,
    ...customMutations
};
