import { queries } from './query.HelmRelease.js'
export const resolver = {
    fluxcdHelmReleases: async (parent, args: object) => {
        return queries.fluxcdHelmReleases(parent,{namespace: parent.metadata.name, ...args})
    }
};
