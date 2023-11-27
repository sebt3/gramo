import { lists } from './query.ImageUpdateAutomation.js'
export const resolver = {
    fluxcdImageUpdateAutomations: async (parent, args: object) => {
        return lists.fluxcdImageUpdateAutomations(parent,{namespace: parent.metadata.name, ...args})
    }
};
