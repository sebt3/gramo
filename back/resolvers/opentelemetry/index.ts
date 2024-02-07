import { queries as customQueries, resolvers as customResolvers, mutations as customMutations } from './custom.js';
import { mutations as InstrumentationMutations, resolvers as InstrumentationResolvers } from './Instrumentation.js';
import { mutations as OpAMPBridgeMutations, resolvers as OpAMPBridgeResolvers } from './OpAMPBridge.js';
import { mutations as OpenTelemetryCollectorMutations, resolvers as OpenTelemetryCollectorResolvers } from './OpenTelemetryCollector.js';
export const queries = {
    ...customQueries
};

export const resolvers = {
    ...InstrumentationResolvers,
    ...OpAMPBridgeResolvers,
    ...OpenTelemetryCollectorResolvers,
    ...customResolvers
};

export const mutations = {
    ...InstrumentationMutations,
    ...OpAMPBridgeMutations,
    ...OpenTelemetryCollectorMutations,
    ...customMutations
};
