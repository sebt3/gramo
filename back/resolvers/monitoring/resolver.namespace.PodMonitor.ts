import { lists } from './query.PodMonitor.js'
export const resolver = {
    monitoringPodMonitors: async (parent, args: object) => {
        return lists.monitoringPodMonitors(parent,{namespace: parent.metadata.name, ...args})
    }
};
