
import { resolver as GitRepositoryNSresolver } from '../fluxcd/resolver.namespace.GitRepository.js';
import { resolver as BucketNSresolver } from '../fluxcd/resolver.namespace.Bucket.js';
import { resolver as HelmChartNSresolver } from '../fluxcd/resolver.namespace.HelmChart.js';
import { resolver as HelmRepositoryNSresolver } from '../fluxcd/resolver.namespace.HelmRepository.js';
import { resolver as OCIRepositoryNSresolver } from '../fluxcd/resolver.namespace.OCIRepository.js';
export const resolvers = {
    ...GitRepositoryNSresolver,
    ...BucketNSresolver,
    ...HelmChartNSresolver,
    ...HelmRepositoryNSresolver,
    ...OCIRepositoryNSresolver,
};
