import { queries } from './query.Install.js'
export const resolver = {
    vynilInstalls: async (parent) => {
        return queries.vynilInstalls(parent,{namespace: parent.metadata.name})
    }
};