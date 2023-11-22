import { queries } from './query.GitRepository.js'
export const resolver = {
    fluxcdGitRepositorys: async (parent, args: object) => {
        return queries.fluxcdGitRepositorys(parent,{namespace: parent.metadata.name, ...args})
    }
};
