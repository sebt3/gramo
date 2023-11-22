import { queries } from './query.ImageUpdateAutomation.js'
export const resolver = {
    fluxcdImageUpdateAutomations: async (parent, args: object) => {
        return queries.fluxcdImageUpdateAutomations(parent,{namespace: parent.metadata.name, ...args})
    }
};
