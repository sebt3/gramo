import { lists } from './query.ImageRepository.js'
export const resolver = {
    fluxcdImageRepositorys: async (parent, args: object) => {
        return lists.fluxcdImageRepositorys(parent,{namespace: parent.metadata.name, ...args})
    }
};
