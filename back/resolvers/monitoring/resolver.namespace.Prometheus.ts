import { lists } from './query.Prometheus.js'
export const resolver = {
    monitoringPrometheuss: async (parent, args: object) => {
        return lists.monitoringPrometheuss(parent,{namespace: parent.metadata.name, ...args})
    }
};
