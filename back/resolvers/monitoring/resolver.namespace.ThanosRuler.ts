import { lists } from './query.ThanosRuler.js'
export const resolver = {
    monitoringThanosRulers: async (parent, args: object) => {
        return lists.monitoringThanosRulers(parent,{namespace: parent.metadata.name, ...args})
    }
};
