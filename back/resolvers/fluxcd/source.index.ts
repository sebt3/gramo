
import { queries as GitRepositoryQueries } from './query.GitRepository.js';
import { mutations as GitRepositoryMutations } from './mutation.GitRepository.js';
import { queries as BucketQueries } from './query.Bucket.js';
import { mutations as BucketMutations } from './mutation.Bucket.js';
import { queries as HelmChartQueries } from './query.HelmChart.js';
import { mutations as HelmChartMutations } from './mutation.HelmChart.js';
import { queries as HelmRepositoryQueries } from './query.HelmRepository.js';
import { mutations as HelmRepositoryMutations } from './mutation.HelmRepository.js';
import { queries as OCIRepositoryQueries } from './query.OCIRepository.js';
import { mutations as OCIRepositoryMutations } from './mutation.OCIRepository.js';
export const queries = {
    ...GitRepositoryQueries,
    ...BucketQueries,
    ...HelmChartQueries,
    ...HelmRepositoryQueries,
    ...OCIRepositoryQueries,
};

export const resolvers = {
};

export const mutations = {
    ...GitRepositoryMutations,
    ...BucketMutations,
    ...HelmChartMutations,
    ...HelmRepositoryMutations,
    ...OCIRepositoryMutations,
};
