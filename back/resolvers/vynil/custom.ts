// noGramoGenerator
import { gramoConfig } from '../../config.js'
import { lists as distribQueries } from './Distrib.js';
import { lists as packageQueries, resolvers as packageResolvers } from './Package.js';
import { lists as categoryQueries, resolvers as categoryResolvers } from './Category.js';

export const queries = {
    ...categoryQueries,
    ...packageQueries,
};

export const resolvers = {
    ...packageResolvers,
    ...categoryResolvers
};

export const mutations = {
};
