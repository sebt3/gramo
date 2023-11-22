import { queries } from './query.OCIRepository.js'
export const resolver = {
    fluxcdOCIRepositorys: async (parent, args: object) => {
        return queries.fluxcdOCIRepositorys(parent,{namespace: parent.metadata.name, ...args})
    }
};
