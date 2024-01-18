import { lists } from './query.User.js'
export const resolver = {
    mariadbUsers: async (parent, args: object) => {
        return lists.mariadbUsers(parent,{namespace: parent.metadata.name, ...args})
    }
};
