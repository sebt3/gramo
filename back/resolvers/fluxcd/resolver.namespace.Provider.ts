import { queries } from './query.Provider.js'
export const resolver = {
    fluxcdProviders: async (parent, args: object) => {
        return queries.fluxcdProviders(parent,{namespace: parent.metadata.name, ...args})
    }
};
