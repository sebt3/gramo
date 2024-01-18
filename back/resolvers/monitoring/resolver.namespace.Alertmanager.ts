import { lists } from './query.Alertmanager.js'
export const resolver = {
    monitoringAlertmanagers: async (parent, args: object) => {
        return lists.monitoringAlertmanagers(parent,{namespace: parent.metadata.name, ...args})
    }
};
