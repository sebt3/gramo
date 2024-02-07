// noGramoGenerator
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { gramoConfig } from '../../config.js'

export const queries = {
    gramoConfig: () => gramoConfig,
};

export const resolvers = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject
};

export const mutations = {
};
