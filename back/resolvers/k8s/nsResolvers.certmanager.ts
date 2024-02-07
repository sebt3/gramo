import { nsResolver as ChallengeNSresolver } from '../certmanager/Challenge.js';
import { nsResolver as OrderNSresolver } from '../certmanager/Order.js';
import { nsResolver as CertificateNSresolver } from '../certmanager/Certificate.js';
import { nsResolver as CertificateRequestNSresolver } from '../certmanager/CertificateRequest.js';
import { nsResolver as IssuerNSresolver } from '../certmanager/Issuer.js';
export const resolvers = {
    ...ChallengeNSresolver,
    ...OrderNSresolver,
    ...CertificateNSresolver,
    ...CertificateRequestNSresolver,
    ...IssuerNSresolver,
};
