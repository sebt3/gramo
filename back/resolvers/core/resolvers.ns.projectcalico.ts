
import { resolver as NetworkPolicyNSresolver } from '../projectcalico/resolver.namespace.NetworkPolicy.js';
import { resolver as NetworkSetNSresolver } from '../projectcalico/resolver.namespace.NetworkSet.js';
export const resolvers = {
    ...NetworkPolicyNSresolver,
    ...NetworkSetNSresolver,
};
