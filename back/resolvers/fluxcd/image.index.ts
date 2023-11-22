
import { queries as ImagePolicyQueries } from './query.ImagePolicy.js';
import { mutations as ImagePolicyMutations } from './mutation.ImagePolicy.js';
import { queries as ImageRepositoryQueries } from './query.ImageRepository.js';
import { mutations as ImageRepositoryMutations } from './mutation.ImageRepository.js';
import { queries as ImageUpdateAutomationQueries } from './query.ImageUpdateAutomation.js';
import { mutations as ImageUpdateAutomationMutations } from './mutation.ImageUpdateAutomation.js';
export const queries = {
    ...ImagePolicyQueries,
    ...ImageRepositoryQueries,
    ...ImageUpdateAutomationQueries,
};

export const resolvers = {
};

export const mutations = {
    ...ImagePolicyMutations,
    ...ImageRepositoryMutations,
    ...ImageUpdateAutomationMutations,
};
