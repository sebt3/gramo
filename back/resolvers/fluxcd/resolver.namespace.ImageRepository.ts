import { queries } from './query.ImageRepository.js'
export const resolver = {
    fluxcdImageRepositorys: async (parent, args: object) => {
        return queries.fluxcdImageRepositorys(parent,{namespace: parent.metadata.name, ...args})
    }
};
