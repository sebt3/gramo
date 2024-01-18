import { lists } from './query.Pooler.js'
export const resolver = {
    postgresqlPoolers: async (parent, args: object) => {
        return lists.postgresqlPoolers(parent,{namespace: parent.metadata.name, ...args})
    }
};
