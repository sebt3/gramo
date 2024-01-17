
import { queries as BasicAuthQueries } from './query.BasicAuth.js';
import { mutations as BasicAuthMutations } from './mutation.BasicAuth.js';
import { queries as SSHKeyPairQueries } from './query.SSHKeyPair.js';
import { mutations as SSHKeyPairMutations } from './mutation.SSHKeyPair.js';
import { queries as StringSecretQueries } from './query.StringSecret.js';
import { mutations as StringSecretMutations } from './mutation.StringSecret.js';
export const queries = {
    ...BasicAuthQueries,
    ...SSHKeyPairQueries,
    ...StringSecretQueries,
};

export const resolvers = {
};

export const mutations = {
    ...BasicAuthMutations,
    ...SSHKeyPairMutations,
    ...StringSecretMutations,
};
