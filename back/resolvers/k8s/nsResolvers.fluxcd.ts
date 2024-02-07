import { nsResolver as KustomizationNSresolver } from '../fluxcd/Kustomization.js';
import { nsResolver as ReceiverNSresolver } from '../fluxcd/Receiver.js';
import { nsResolver as AlertNSresolver } from '../fluxcd/Alert.js';
import { nsResolver as ProviderNSresolver } from '../fluxcd/Provider.js';
import { nsResolver as GitRepositoryNSresolver } from '../fluxcd/GitRepository.js';
import { nsResolver as BucketNSresolver } from '../fluxcd/Bucket.js';
import { nsResolver as HelmChartNSresolver } from '../fluxcd/HelmChart.js';
import { nsResolver as HelmRepositoryNSresolver } from '../fluxcd/HelmRepository.js';
import { nsResolver as OCIRepositoryNSresolver } from '../fluxcd/OCIRepository.js';
import { nsResolver as ImageUpdateAutomationNSresolver } from '../fluxcd/ImageUpdateAutomation.js';
import { nsResolver as ImagePolicyNSresolver } from '../fluxcd/ImagePolicy.js';
import { nsResolver as ImageRepositoryNSresolver } from '../fluxcd/ImageRepository.js';
import { nsResolver as HelmReleaseNSresolver } from '../fluxcd/HelmRelease.js';
export const resolvers = {
    ...KustomizationNSresolver,
    ...ReceiverNSresolver,
    ...AlertNSresolver,
    ...ProviderNSresolver,
    ...GitRepositoryNSresolver,
    ...BucketNSresolver,
    ...HelmChartNSresolver,
    ...HelmRepositoryNSresolver,
    ...OCIRepositoryNSresolver,
    ...ImageUpdateAutomationNSresolver,
    ...ImagePolicyNSresolver,
    ...ImageRepositoryNSresolver,
    ...HelmReleaseNSresolver,
};
