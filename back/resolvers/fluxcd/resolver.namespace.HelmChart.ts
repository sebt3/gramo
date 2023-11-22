import { queries } from './query.HelmChart.js'
export const resolver = {
    fluxcdHelmCharts: async (parent, args: object) => {
        return queries.fluxcdHelmCharts(parent,{namespace: parent.metadata.name, ...args})
    }
};
