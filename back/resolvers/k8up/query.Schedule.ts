import {kc, k8s, getMetadata} from '../core/libs.js';
import { K8upScheduleList, K8upSchedule } from './type.Schedule.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    k8upSchedules: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('k8up.io','v1',args['namespace'],'schedules')
            const resList = res.body as K8upScheduleList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "archive": ext.spec['archive'],
                "backend": ext.spec['backend'],
                "backup": ext.spec['backup'],
                "check": ext.spec['check'],
                "failedJobsHistoryLimit": ext.spec['failedJobsHistoryLimit'],
                "keepJobs": ext.spec['keepJobs'],
                "podSecurityContext": ext.spec['podSecurityContext'],
                "prune": ext.spec['prune'],
                "resourceRequirementsTemplate": ext.spec['resourceRequirementsTemplate'],
                "restore": ext.spec['restore'],
                "successfulJobsHistoryLimit": ext.spec['successfulJobsHistoryLimit'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "effectiveSchedules": ext.status['effectiveSchedules'],
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    k8upSchedule: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('k8up.io','v1',args['namespace'],'schedules', args['name'])
            const ext = res.body as K8upSchedule
            return {
                metadata: getMetadata(ext.metadata, ext),
                "archive": ext.spec['archive'],
                "backend": ext.spec['backend'],
                "backup": ext.spec['backup'],
                "check": ext.spec['check'],
                "failedJobsHistoryLimit": ext.spec['failedJobsHistoryLimit'],
                "keepJobs": ext.spec['keepJobs'],
                "podSecurityContext": ext.spec['podSecurityContext'],
                "prune": ext.spec['prune'],
                "resourceRequirementsTemplate": ext.spec['resourceRequirementsTemplate'],
                "restore": ext.spec['restore'],
                "successfulJobsHistoryLimit": ext.spec['successfulJobsHistoryLimit'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "effectiveSchedules": ext.status['effectiveSchedules'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
