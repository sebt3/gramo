import { lists } from './query.HelmRepository.js'
export const resolver = {
    fluxcdHelmRepositorys: async (parent, args: object) => {
        return lists.fluxcdHelmRepositorys(parent,{namespace: parent.metadata.name, ...args})
    }
};
