import { queries } from './query.Kustomization.js'
export const resolver = {
    fluxcdKustomizations: async (parent, args: object) => {
        return queries.fluxcdKustomizations(parent,{namespace: parent.metadata.name, ...args})
    }
};
