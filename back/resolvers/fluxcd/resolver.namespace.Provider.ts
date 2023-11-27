import { lists } from './query.Provider.js'
export const resolver = {
    fluxcdProviders: async (parent, args: object) => {
        return lists.fluxcdProviders(parent,{namespace: parent.metadata.name, ...args})
    }
};
