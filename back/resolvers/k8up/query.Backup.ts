import {kc, k8s, getMetadata} from '../core/libs.js';
import { K8upBackupList, K8upBackup } from './type.Backup.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    k8upBackups: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('k8up.io','v1',args['namespace'],'backups')
            const resList = res.body as K8upBackupList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "activeDeadlineSeconds": ext.spec['activeDeadlineSeconds'],
                "backend": ext.spec['backend'],
                "failedJobsHistoryLimit": ext.spec['failedJobsHistoryLimit'],
                "keepJobs": ext.spec['keepJobs'],
                "podSecurityContext": ext.spec['podSecurityContext'],
                "promURL": ext.spec['promURL'],
                "resources": ext.spec['resources'],
                "statsURL": ext.spec['statsURL'],
                "successfulJobsHistoryLimit": ext.spec['successfulJobsHistoryLimit'],
                "tags": ext.spec['tags'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "exclusive": ext.status['exclusive'],
                    "finished": ext.status['finished'],
                    "started": ext.status['started'],
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    k8upBackup: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('k8up.io','v1',args['namespace'],'backups', args['name'])
            const ext = res.body as K8upBackup
            return {
                metadata: getMetadata(ext.metadata, ext),
                "activeDeadlineSeconds": ext.spec['activeDeadlineSeconds'],
                "backend": ext.spec['backend'],
                "failedJobsHistoryLimit": ext.spec['failedJobsHistoryLimit'],
                "keepJobs": ext.spec['keepJobs'],
                "podSecurityContext": ext.spec['podSecurityContext'],
                "promURL": ext.spec['promURL'],
                "resources": ext.spec['resources'],
                "statsURL": ext.spec['statsURL'],
                "successfulJobsHistoryLimit": ext.spec['successfulJobsHistoryLimit'],
                "tags": ext.spec['tags'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "exclusive": ext.status['exclusive'],
                    "finished": ext.status['finished'],
                    "started": ext.status['started'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
