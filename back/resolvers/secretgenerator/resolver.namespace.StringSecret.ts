import { lists } from './query.StringSecret.js'
export const resolver = {
    secretgeneratorStringSecrets: async (parent, args: object) => {
        return lists.secretgeneratorStringSecrets(parent,{namespace: parent.metadata.name, ...args})
    }
};
