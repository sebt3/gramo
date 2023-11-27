import { lists } from './query.HelmRelease.js'
export const resolver = {
    fluxcdHelmReleases: async (parent, args: object) => {
        return lists.fluxcdHelmReleases(parent,{namespace: parent.metadata.name, ...args})
    }
};
