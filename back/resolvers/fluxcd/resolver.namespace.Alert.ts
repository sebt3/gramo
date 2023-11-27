import { lists } from './query.Alert.js'
export const resolver = {
    fluxcdAlerts: async (parent, args: object) => {
        return lists.fluxcdAlerts(parent,{namespace: parent.metadata.name, ...args})
    }
};
