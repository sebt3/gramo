import { queries } from './query.Alert.js'
export const resolver = {
    fluxcdAlerts: async (parent, args: object) => {
        return queries.fluxcdAlerts(parent,{namespace: parent.metadata.name, ...args})
    }
};
