import { lists } from './query.Schedule.js'
export const resolver = {
    k8upSchedules: async (parent, args: object) => {
        return lists.k8upSchedules(parent,{namespace: parent.metadata.name, ...args})
    }
};
