
import { resolver as ImagePolicyNSresolver } from '../fluxcd/resolver.namespace.ImagePolicy.js';
import { resolver as ImageRepositoryNSresolver } from '../fluxcd/resolver.namespace.ImageRepository.js';
import { resolver as ImageUpdateAutomationNSresolver } from '../fluxcd/resolver.namespace.ImageUpdateAutomation.js';
export const resolvers = {
    ...ImagePolicyNSresolver,
    ...ImageRepositoryNSresolver,
    ...ImageUpdateAutomationNSresolver,
};
