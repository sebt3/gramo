import * as vynil from './vynil/index.js';
import * as fluxcd from './fluxcd/index.js';
import * as core from './core/index.js';
export const resolvers = {
  ...core.resolvers,
  ...vynil.resolvers,
  ...fluxcd.resolvers,
  Query: {
    ...core.queries,
    ...vynil.queries,
    ...fluxcd.queries,
  },
  Mutation: {
    //...core.mutations,
    ...vynil.mutations,
    ...fluxcd.mutations,
  }
};
