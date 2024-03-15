// noGramoGenerator
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { gramoConfig } from '../../config.js'
import { queries as containerQueries, resolvers as containerResolvers, mutations as containerMutations } from './Container.js';
import { queries as eventQueries, resolvers as eventResolvers, mutations as eventMutations } from './Event.js';
import { queries as crdObjectQueries, resolvers as crdObjectResolvers, mutations as crdObjectMutations } from './CrdObject.js';

export const queries = {
    gramoConfig: () => gramoConfig,
    ...containerQueries,
    ...eventQueries,
    ...crdObjectQueries,
};

export const resolvers = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    ...containerResolvers,
    ...eventResolvers,
    ...crdObjectResolvers,
};

export const mutations = {
    ...containerMutations,
    ...eventMutations,
    ...crdObjectMutations,
};
