import {kc, k8s, getMetadata} from '../core/libs.js';
import { K8upSchedule } from './type.Schedule.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createK8upSchedule: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['archive'] !== undefined && typeof args['spec']['archive'] == 'object') spec['archive'] = args['spec']['archive'];
        if (args['spec']['backend'] !== undefined && typeof args['spec']['backend'] == 'object') spec['backend'] = args['spec']['backend'];
        if (args['spec']['backup'] !== undefined && typeof args['spec']['backup'] == 'object') spec['backup'] = args['spec']['backup'];
        if (args['spec']['check'] !== undefined && typeof args['spec']['check'] == 'object') spec['check'] = args['spec']['check'];
        if (args['spec']['failedJobsHistoryLimit'] !== undefined && typeof args['spec']['failedJobsHistoryLimit'] == 'number') spec['failedJobsHistoryLimit'] = args['spec']['failedJobsHistoryLimit'];
        if (args['spec']['keepJobs'] !== undefined && typeof args['spec']['keepJobs'] == 'number') spec['keepJobs'] = args['spec']['keepJobs'];
        if (args['spec']['podSecurityContext'] !== undefined && typeof args['spec']['podSecurityContext'] == 'object') spec['podSecurityContext'] = args['spec']['podSecurityContext'];
        if (args['spec']['prune'] !== undefined && typeof args['spec']['prune'] == 'object') spec['prune'] = args['spec']['prune'];
        if (args['spec']['resourceRequirementsTemplate'] !== undefined && typeof args['spec']['resourceRequirementsTemplate'] == 'object') spec['resourceRequirementsTemplate'] = args['spec']['resourceRequirementsTemplate'];
        if (args['spec']['restore'] !== undefined && typeof args['spec']['restore'] == 'object') spec['restore'] = args['spec']['restore'];
        if (args['spec']['successfulJobsHistoryLimit'] !== undefined && typeof args['spec']['successfulJobsHistoryLimit'] == 'number') spec['successfulJobsHistoryLimit'] = args['spec']['successfulJobsHistoryLimit'];
        const payload = {
            apiVersion: 'k8up.io/v1',
            kind: 'Schedule',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('k8up.io','v1',args['namespace'],'schedules', payload)
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
    patchK8upSchedule: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['archive'] !== undefined && typeof args['spec']['archive'] == 'object') spec['archive'] = args['spec']['archive'];
        if (args['spec']['backend'] !== undefined && typeof args['spec']['backend'] == 'object') spec['backend'] = args['spec']['backend'];
        if (args['spec']['backup'] !== undefined && typeof args['spec']['backup'] == 'object') spec['backup'] = args['spec']['backup'];
        if (args['spec']['check'] !== undefined && typeof args['spec']['check'] == 'object') spec['check'] = args['spec']['check'];
        if (args['spec']['failedJobsHistoryLimit'] !== undefined && typeof args['spec']['failedJobsHistoryLimit'] == 'number') spec['failedJobsHistoryLimit'] = args['spec']['failedJobsHistoryLimit'];
        if (args['spec']['keepJobs'] !== undefined && typeof args['spec']['keepJobs'] == 'number') spec['keepJobs'] = args['spec']['keepJobs'];
        if (args['spec']['podSecurityContext'] !== undefined && typeof args['spec']['podSecurityContext'] == 'object') spec['podSecurityContext'] = args['spec']['podSecurityContext'];
        if (args['spec']['prune'] !== undefined && typeof args['spec']['prune'] == 'object') spec['prune'] = args['spec']['prune'];
        if (args['spec']['resourceRequirementsTemplate'] !== undefined && typeof args['spec']['resourceRequirementsTemplate'] == 'object') spec['resourceRequirementsTemplate'] = args['spec']['resourceRequirementsTemplate'];
        if (args['spec']['restore'] !== undefined && typeof args['spec']['restore'] == 'object') spec['restore'] = args['spec']['restore'];
        if (args['spec']['successfulJobsHistoryLimit'] !== undefined && typeof args['spec']['successfulJobsHistoryLimit'] == 'number') spec['successfulJobsHistoryLimit'] = args['spec']['successfulJobsHistoryLimit'];
        const request = {
            apiVersion: 'k8up.io/v1',
            kind: 'Schedule',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('k8up.io','v1',args['namespace'],'schedules', args['name'])
            const extGet = resGet.body as K8upSchedule
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('k8up.io','v1',args['namespace'],'schedules', args['name'], payload, undefined, undefined, undefined, options)
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
    deleteK8upSchedule: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('k8up.io','v1',args['namespace'],'schedules', args['name'])
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
