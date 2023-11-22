import { queries } from './query.HelmRepository.js'
export const resolver = {
    fluxcdHelmRepositorys: async (parent, args: object) => {
        return queries.fluxcdHelmRepositorys(parent,{namespace: parent.metadata.name, ...args})
    }
};
