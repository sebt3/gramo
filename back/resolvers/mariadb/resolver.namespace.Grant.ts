import { lists } from './query.Grant.js'
export const resolver = {
    mariadbGrants: async (parent, args: object) => {
        return lists.mariadbGrants(parent,{namespace: parent.metadata.name, ...args})
    }
};
