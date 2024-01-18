import { lists } from './query.ServiceMonitor.js'
export const resolver = {
    monitoringServiceMonitors: async (parent, args: object) => {
        return lists.monitoringServiceMonitors(parent,{namespace: parent.metadata.name, ...args})
    }
};
