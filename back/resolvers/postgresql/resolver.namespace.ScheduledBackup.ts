import { lists } from './query.ScheduledBackup.js'
export const resolver = {
    postgresqlScheduledBackups: async (parent, args: object) => {
        return lists.postgresqlScheduledBackups(parent,{namespace: parent.metadata.name, ...args})
    }
};
