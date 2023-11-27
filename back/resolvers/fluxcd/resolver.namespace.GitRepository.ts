import { lists } from './query.GitRepository.js'
export const resolver = {
    fluxcdGitRepositorys: async (parent, args: object) => {
        return lists.fluxcdGitRepositorys(parent,{namespace: parent.metadata.name, ...args})
    }
};
