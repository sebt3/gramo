import {kc, k8s, getMetadata} from '../core/libs.js';
import { K8upPruneList, K8upPrune } from './type.Prune.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    k8upPrunes: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('k8up.io','v1',args['namespace'],'prunes')
            const resList = res.body as K8upPruneList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "activeDeadlineSeconds": ext.spec['activeDeadlineSeconds'],
                "backend": ext.spec['backend'],
                "failedJobsHistoryLimit": ext.spec['failedJobsHistoryLimit'],
                "keepJobs": ext.spec['keepJobs'],
                "podSecurityContext": ext.spec['podSecurityContext'],
                "resources": ext.spec['resources'],
                "retention": ext.spec['retention'],
                "successfulJobsHistoryLimit": ext.spec['successfulJobsHistoryLimit'],
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
    k8upPrune: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('k8up.io','v1',args['namespace'],'prunes', args['name'])
            const ext = res.body as K8upPrune
            return {
                metadata: getMetadata(ext.metadata, ext),
                "activeDeadlineSeconds": ext.spec['activeDeadlineSeconds'],
                "backend": ext.spec['backend'],
                "failedJobsHistoryLimit": ext.spec['failedJobsHistoryLimit'],
                "keepJobs": ext.spec['keepJobs'],
                "podSecurityContext": ext.spec['podSecurityContext'],
                "resources": ext.spec['resources'],
                "retention": ext.spec['retention'],
                "successfulJobsHistoryLimit": ext.spec['successfulJobsHistoryLimit'],
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
