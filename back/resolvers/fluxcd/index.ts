import { queries as sourceQueries, mutations as sourceMutations } from './source.index.js';
import { queries as notificationQueries, mutations as notificationMutations } from './notification.index.js';
import { queries as kustomizeQueries, mutations as kustomizeMutations } from './kustomize.index.js';
import { queries as imageQueries, mutations as imageMutations } from './image.index.js';
import { queries as helmQueries, mutations as helmMutations } from './helm.index.js';

export const queries = {
    ...sourceQueries,
    ...notificationQueries,
    ...kustomizeQueries,
    ...imageQueries,
    ...helmQueries,
};

export const resolvers = {
};

export const mutations = {
    ...sourceMutations,
    ...notificationMutations,
    ...kustomizeMutations,
    ...imageMutations,
    ...helmMutations,
};
