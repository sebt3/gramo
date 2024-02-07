import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as ChallengeMutations, resolvers as ChallengeResolvers } from './Challenge.js';
import { mutations as OrderMutations, resolvers as OrderResolvers } from './Order.js';
import { mutations as CertificateMutations, resolvers as CertificateResolvers } from './Certificate.js';
import { mutations as CertificateRequestMutations, resolvers as CertificateRequestResolvers } from './CertificateRequest.js';
import { mutations as ClusterIssuerMutations, resolvers as ClusterIssuerResolvers, queries as ClusterIssuerQueries } from './ClusterIssuer.js';
import { mutations as IssuerMutations, resolvers as IssuerResolvers } from './Issuer.js';
export const queries = {
    ...ClusterIssuerQueries,
    ...customQueries
};

export const resolvers = {
    ...ChallengeResolvers,
    ...OrderResolvers,
    ...CertificateResolvers,
    ...CertificateRequestResolvers,
    ...ClusterIssuerResolvers,
    ...IssuerResolvers,
    ...customResolvers
};

export const mutations = {
    ...ChallengeMutations,
    ...OrderMutations,
    ...CertificateMutations,
    ...CertificateRequestMutations,
    ...ClusterIssuerMutations,
    ...IssuerMutations,
    ...customMutations
};
