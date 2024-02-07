import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as BasicAuthMutations, resolvers as BasicAuthResolvers } from './BasicAuth.js';
import { mutations as SSHKeyPairMutations, resolvers as SSHKeyPairResolvers } from './SSHKeyPair.js';
import { mutations as StringSecretMutations, resolvers as StringSecretResolvers } from './StringSecret.js';
export const queries = {
    ...customQueries
};

export const resolvers = {
    ...BasicAuthResolvers,
    ...SSHKeyPairResolvers,
    ...StringSecretResolvers,
    ...customResolvers
};

export const mutations = {
    ...BasicAuthMutations,
    ...SSHKeyPairMutations,
    ...StringSecretMutations,
    ...customMutations
};
