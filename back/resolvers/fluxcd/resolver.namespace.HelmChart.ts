import { lists } from './query.HelmChart.js'
export const resolver = {
    fluxcdHelmCharts: async (parent, args: object) => {
        return lists.fluxcdHelmCharts(parent,{namespace: parent.metadata.name, ...args})
    }
};
