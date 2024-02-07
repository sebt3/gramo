import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as KustomizationMutations, resolvers as KustomizationResolvers } from './Kustomization.js';
import { mutations as ReceiverMutations, resolvers as ReceiverResolvers } from './Receiver.js';
import { mutations as AlertMutations, resolvers as AlertResolvers } from './Alert.js';
import { mutations as ProviderMutations, resolvers as ProviderResolvers } from './Provider.js';
import { mutations as GitRepositoryMutations, resolvers as GitRepositoryResolvers } from './GitRepository.js';
import { mutations as BucketMutations, resolvers as BucketResolvers } from './Bucket.js';
import { mutations as HelmChartMutations, resolvers as HelmChartResolvers } from './HelmChart.js';
import { mutations as HelmRepositoryMutations, resolvers as HelmRepositoryResolvers } from './HelmRepository.js';
import { mutations as OCIRepositoryMutations, resolvers as OCIRepositoryResolvers } from './OCIRepository.js';
import { mutations as ImageUpdateAutomationMutations, resolvers as ImageUpdateAutomationResolvers } from './ImageUpdateAutomation.js';
import { mutations as ImagePolicyMutations, resolvers as ImagePolicyResolvers } from './ImagePolicy.js';
import { mutations as ImageRepositoryMutations, resolvers as ImageRepositoryResolvers } from './ImageRepository.js';
import { mutations as HelmReleaseMutations, resolvers as HelmReleaseResolvers } from './HelmRelease.js';
export const queries = {
    ...customQueries
};

export const resolvers = {
    ...KustomizationResolvers,
    ...ReceiverResolvers,
    ...AlertResolvers,
    ...ProviderResolvers,
    ...GitRepositoryResolvers,
    ...BucketResolvers,
    ...HelmChartResolvers,
    ...HelmRepositoryResolvers,
    ...OCIRepositoryResolvers,
    ...ImageUpdateAutomationResolvers,
    ...ImagePolicyResolvers,
    ...ImageRepositoryResolvers,
    ...HelmReleaseResolvers,
    ...customResolvers
};

export const mutations = {
    ...KustomizationMutations,
    ...ReceiverMutations,
    ...AlertMutations,
    ...ProviderMutations,
    ...GitRepositoryMutations,
    ...BucketMutations,
    ...HelmChartMutations,
    ...HelmRepositoryMutations,
    ...OCIRepositoryMutations,
    ...ImageUpdateAutomationMutations,
    ...ImagePolicyMutations,
    ...ImageRepositoryMutations,
    ...HelmReleaseMutations,
    ...customMutations
};
