import { lists } from './query.ImagePolicy.js'
export const resolver = {
    fluxcdImagePolicys: async (parent, args: object) => {
        return lists.fluxcdImagePolicys(parent,{namespace: parent.metadata.name, ...args})
    }
};
