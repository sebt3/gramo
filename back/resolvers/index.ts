import * as vynil from './vynil/index.js';
import * as core from './core/index.js';
export const resolvers = {
  ...core.resolvers,
  ...vynil.resolvers,
  Query: {
    ...core.queries,
    ...vynil.queries,
  },
  /*Mutation: {
    ...core.mutations,
    ...vynil.mutations,
  }*/
};
