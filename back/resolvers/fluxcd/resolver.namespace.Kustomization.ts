import { lists } from './query.Kustomization.js'
export const resolver = {
    fluxcdKustomizations: async (parent, args: object) => {
        return lists.fluxcdKustomizations(parent,{namespace: parent.metadata.name, ...args})
    }
};
