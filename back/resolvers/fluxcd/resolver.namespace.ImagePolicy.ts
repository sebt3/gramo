import { queries } from './query.ImagePolicy.js'
export const resolver = {
    fluxcdImagePolicys: async (parent, args: object) => {
        return queries.fluxcdImagePolicys(parent,{namespace: parent.metadata.name, ...args})
    }
};
