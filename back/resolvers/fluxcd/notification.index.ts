
import { queries as ReceiverQueries } from './query.Receiver.js';
import { mutations as ReceiverMutations } from './mutation.Receiver.js';
import { queries as AlertQueries } from './query.Alert.js';
import { mutations as AlertMutations } from './mutation.Alert.js';
import { queries as ProviderQueries } from './query.Provider.js';
import { mutations as ProviderMutations } from './mutation.Provider.js';
export const queries = {
    ...ReceiverQueries,
    ...AlertQueries,
    ...ProviderQueries,
};

export const resolvers = {
};

export const mutations = {
    ...ReceiverMutations,
    ...AlertMutations,
    ...ProviderMutations,
};
