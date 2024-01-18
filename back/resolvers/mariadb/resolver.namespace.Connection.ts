import { lists } from './query.Connection.js'
export const resolver = {
    mariadbConnections: async (parent, args: object) => {
        return lists.mariadbConnections(parent,{namespace: parent.metadata.name, ...args})
    }
};
