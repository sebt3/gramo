import { lists } from './query.Install.js'
export const resolver = {
    vynilInstalls: async (parent, args: object) => {
        return lists.vynilInstalls(parent,{namespace: parent.metadata.name, ...args})
    }
};
