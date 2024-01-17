
import { resolver as BasicAuthNSresolver } from '../secretgenerator/resolver.namespace.BasicAuth.js';
import { resolver as SSHKeyPairNSresolver } from '../secretgenerator/resolver.namespace.SSHKeyPair.js';
import { resolver as StringSecretNSresolver } from '../secretgenerator/resolver.namespace.StringSecret.js';
export const resolvers = {
    ...BasicAuthNSresolver,
    ...SSHKeyPairNSresolver,
    ...StringSecretNSresolver,
};
