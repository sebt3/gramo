import { lists } from './query.Receiver.js'
export const resolver = {
    fluxcdReceivers: async (parent, args: object) => {
        return lists.fluxcdReceivers(parent,{namespace: parent.metadata.name, ...args})
    }
};
