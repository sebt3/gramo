import { lists } from './query.AlertmanagerConfig.js'
export const resolver = {
    monitoringAlertmanagerConfigs: async (parent, args: object) => {
        return lists.monitoringAlertmanagerConfigs(parent,{namespace: parent.metadata.name, ...args})
    }
};
