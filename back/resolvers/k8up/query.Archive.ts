import {kc, k8s, getMetadata} from '../core/libs.js';
import { K8upArchiveList, K8upArchive } from './type.Archive.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    k8upArchives: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('k8up.io','v1',args['namespace'],'archives')
            const resList = res.body as K8upArchiveList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "activeDeadlineSeconds": ext.spec['activeDeadlineSeconds'],
                "backend": ext.spec['backend'],
                "failedJobsHistoryLimit": ext.spec['failedJobsHistoryLimit'],
                "keepJobs": ext.spec['keepJobs'],
                "podSecurityContext": ext.spec['podSecurityContext'],
                "resources": ext.spec['resources'],
                "restoreFilter": ext.spec['restoreFilter'],
                "restoreMethod": ext.spec['restoreMethod'],
                "snapshot": ext.spec['snapshot'],
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
    k8upArchive: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('k8up.io','v1',args['namespace'],'archives', args['name'])
            const ext = res.body as K8upArchive
            return {
                metadata: getMetadata(ext.metadata, ext),
                "activeDeadlineSeconds": ext.spec['activeDeadlineSeconds'],
                "backend": ext.spec['backend'],
                "failedJobsHistoryLimit": ext.spec['failedJobsHistoryLimit'],
                "keepJobs": ext.spec['keepJobs'],
                "podSecurityContext": ext.spec['podSecurityContext'],
                "resources": ext.spec['resources'],
                "restoreFilter": ext.spec['restoreFilter'],
                "restoreMethod": ext.spec['restoreMethod'],
                "snapshot": ext.spec['snapshot'],
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
