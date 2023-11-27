
import { queries } from './query.Permissions.js';
export const resolvers = {
    permissions: async (parent, args: object) => {
        return queries.permissionReview(parent,{namespace: parent.metadata.name, ...args})
    }
};
