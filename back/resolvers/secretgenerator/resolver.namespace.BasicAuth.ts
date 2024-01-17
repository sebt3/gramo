import { lists } from './query.BasicAuth.js'
export const resolver = {
    secretgeneratorBasicAuths: async (parent, args: object) => {
        return lists.secretgeneratorBasicAuths(parent,{namespace: parent.metadata.name, ...args})
    }
};
