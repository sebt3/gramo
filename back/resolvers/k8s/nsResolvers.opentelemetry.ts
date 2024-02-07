import { nsResolver as InstrumentationNSresolver } from '../opentelemetry/Instrumentation.js';
import { nsResolver as OpAMPBridgeNSresolver } from '../opentelemetry/OpAMPBridge.js';
import { nsResolver as OpenTelemetryCollectorNSresolver } from '../opentelemetry/OpenTelemetryCollector.js';
export const resolvers = {
    ...InstrumentationNSresolver,
    ...OpAMPBridgeNSresolver,
    ...OpenTelemetryCollectorNSresolver,
};
