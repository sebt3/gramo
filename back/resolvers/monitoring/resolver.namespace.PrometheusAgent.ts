import { lists } from './query.PrometheusAgent.js'
export const resolver = {
    monitoringPrometheusAgents: async (parent, args: object) => {
        return lists.monitoringPrometheusAgents(parent,{namespace: parent.metadata.name, ...args})
    }
};
