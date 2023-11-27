
import { resolver as ReceiverNSresolver } from '../fluxcd/resolver.namespace.Receiver.js';
import { resolver as AlertNSresolver } from '../fluxcd/resolver.namespace.Alert.js';
import { resolver as ProviderNSresolver } from '../fluxcd/resolver.namespace.Provider.js';
export const resolvers = {
    ...ReceiverNSresolver,
    ...AlertNSresolver,
    ...ProviderNSresolver,
};
