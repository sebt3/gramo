// noGramoGenerator
import { resolvers as nsResolvers } from './nsResolvers.js';
import { queries as perms } from './permissions.js';
export const queries = {};
export const mutations = {};
export const resolvers = {
    k8sNamespace: {
        permissions: async (parent, args: object) => {
            return perms.permissionReview(parent,{namespace: parent.metadata.name, ...args})
        },
        ...nsResolvers
    }
};

