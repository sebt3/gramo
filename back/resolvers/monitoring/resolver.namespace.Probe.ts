import { lists } from './query.Probe.js'
export const resolver = {
    monitoringProbes: async (parent, args: object) => {
        return lists.monitoringProbes(parent,{namespace: parent.metadata.name, ...args})
    }
};
