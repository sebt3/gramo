import { nsResolver as NetworkPolicyNSresolver } from '../projectcalico/NetworkPolicy.js';
import { nsResolver as NetworkSetNSresolver } from '../projectcalico/NetworkSet.js';
export const resolvers = {
    ...NetworkPolicyNSresolver,
    ...NetworkSetNSresolver,
};
