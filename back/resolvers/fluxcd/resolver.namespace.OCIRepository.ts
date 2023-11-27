import { lists } from './query.OCIRepository.js'
export const resolver = {
    fluxcdOCIRepositorys: async (parent, args: object) => {
        return lists.fluxcdOCIRepositorys(parent,{namespace: parent.metadata.name, ...args})
    }
};
