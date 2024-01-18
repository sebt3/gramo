import { lists } from './query.PreBackupPod.js'
export const resolver = {
    k8upPreBackupPods: async (parent, args: object) => {
        return lists.k8upPreBackupPods(parent,{namespace: parent.metadata.name, ...args})
    }
};
