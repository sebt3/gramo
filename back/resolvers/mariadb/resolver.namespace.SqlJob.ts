import { lists } from './query.SqlJob.js'
export const resolver = {
    mariadbSqlJobs: async (parent, args: object) => {
        return lists.mariadbSqlJobs(parent,{namespace: parent.metadata.name, ...args})
    }
};
