// noGramoGenerator
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { gramoConfig } from '../../config.js'
import { queries as containerQueries, resolvers as containerResolvers, mutations as containerMutations } from './Container.js';
import { queries as eventQueries, resolvers as eventResolvers, mutations as eventMutations } from './Event.js';

export const queries = {
    gramoConfig: () => gramoConfig,
    ...containerQueries,
    ...eventQueries,
};

export const resolvers = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    ...containerResolvers,
    ...eventResolvers,
};

export const mutations = {
    ...containerMutations,
    ...eventMutations,
};
