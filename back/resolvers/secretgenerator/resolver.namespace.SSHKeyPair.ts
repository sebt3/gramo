import { lists } from './query.SSHKeyPair.js'
export const resolver = {
    secretgeneratorSSHKeyPairs: async (parent, args: object) => {
        return lists.secretgeneratorSSHKeyPairs(parent,{namespace: parent.metadata.name, ...args})
    }
};
