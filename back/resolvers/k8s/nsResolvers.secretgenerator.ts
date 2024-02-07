import { nsResolver as BasicAuthNSresolver } from '../secretgenerator/BasicAuth.js';
import { nsResolver as SSHKeyPairNSresolver } from '../secretgenerator/SSHKeyPair.js';
import { nsResolver as StringSecretNSresolver } from '../secretgenerator/StringSecret.js';
export const resolvers = {
    ...BasicAuthNSresolver,
    ...SSHKeyPairNSresolver,
    ...StringSecretNSresolver,
};
