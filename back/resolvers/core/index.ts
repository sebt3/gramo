import * as core from './core.js';
import * as api from './api.js';

export const resolvers = {
    ...api.resolvers,
    ...core.resolvers,
};
export const queries = {
    ...api.queries,
    ...core.queries,
};
export const mutations = {
    ...api.mutations,
    ...core.mutations,
};
