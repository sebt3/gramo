import { lists } from './query.NetworkPolicy.js'
export const resolver = {
    projectcalicoNetworkPolicys: async (parent, args: object) => {
        return lists.projectcalicoNetworkPolicys(parent,{namespace: parent.metadata.name, ...args})
    }
};
