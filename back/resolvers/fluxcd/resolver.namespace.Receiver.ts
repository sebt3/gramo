import { queries } from './query.Receiver.js'
export const resolver = {
    fluxcdReceivers: async (parent, args: object) => {
        return queries.fluxcdReceivers(parent,{namespace: parent.metadata.name, ...args})
    }
};
