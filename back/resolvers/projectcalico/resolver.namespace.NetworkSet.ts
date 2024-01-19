import { lists } from './query.NetworkSet.js'
export const resolver = {
    projectcalicoNetworkSets: async (parent, args: object) => {
        return lists.projectcalicoNetworkSets(parent,{namespace: parent.metadata.name, ...args})
    }
};
