import {kc, k8s, getMetadata} from '../core/libs.js';
import { K8upPreBackupPodList, K8upPreBackupPod } from './type.PreBackupPod.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    k8upPreBackupPods: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('k8up.io','v1',args['namespace'],'prebackuppods')
            const resList = res.body as K8upPreBackupPodList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "backupCommand": ext.spec['backupCommand'],
                "fileExtension": ext.spec['fileExtension'],
                "pod": ext.spec['pod'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    k8upPreBackupPod: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('k8up.io','v1',args['namespace'],'prebackuppods', args['name'])
            const ext = res.body as K8upPreBackupPod
            return {
                metadata: getMetadata(ext.metadata, ext),
                "backupCommand": ext.spec['backupCommand'],
                "fileExtension": ext.spec['fileExtension'],
                "pod": ext.spec['pod'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
