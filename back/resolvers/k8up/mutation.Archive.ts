import {kc, k8s, getMetadata} from '../core/libs.js';
import { K8upArchive } from './type.Archive.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createK8upArchive: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['activeDeadlineSeconds'] !== undefined && typeof args['spec']['activeDeadlineSeconds'] == 'number') spec['activeDeadlineSeconds'] = args['spec']['activeDeadlineSeconds'];
        if (args['spec']['backend'] !== undefined && typeof args['spec']['backend'] == 'object') spec['backend'] = args['spec']['backend'];
        if (args['spec']['failedJobsHistoryLimit'] !== undefined && typeof args['spec']['failedJobsHistoryLimit'] == 'number') spec['failedJobsHistoryLimit'] = args['spec']['failedJobsHistoryLimit'];
        if (args['spec']['keepJobs'] !== undefined && typeof args['spec']['keepJobs'] == 'number') spec['keepJobs'] = args['spec']['keepJobs'];
        if (args['spec']['podSecurityContext'] !== undefined && typeof args['spec']['podSecurityContext'] == 'object') spec['podSecurityContext'] = args['spec']['podSecurityContext'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['restoreFilter'] !== undefined && typeof args['spec']['restoreFilter'] == 'string') spec['restoreFilter'] = args['spec']['restoreFilter'];
        if (args['spec']['restoreMethod'] !== undefined && typeof args['spec']['restoreMethod'] == 'object') spec['restoreMethod'] = args['spec']['restoreMethod'];
        if (args['spec']['snapshot'] !== undefined && typeof args['spec']['snapshot'] == 'string') spec['snapshot'] = args['spec']['snapshot'];
        if (args['spec']['successfulJobsHistoryLimit'] !== undefined && typeof args['spec']['successfulJobsHistoryLimit'] == 'number') spec['successfulJobsHistoryLimit'] = args['spec']['successfulJobsHistoryLimit'];
        if (args['spec']['tags'] !== undefined && Array.isArray(args['spec']['tags'])) spec['tags'] = args['spec']['tags'];
        const payload = {
            apiVersion: 'k8up.io/v1',
            kind: 'Archive',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('k8up.io','v1',args['namespace'],'archives', payload)
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
    patchK8upArchive: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['activeDeadlineSeconds'] !== undefined && typeof args['spec']['activeDeadlineSeconds'] == 'number') spec['activeDeadlineSeconds'] = args['spec']['activeDeadlineSeconds'];
        if (args['spec']['backend'] !== undefined && typeof args['spec']['backend'] == 'object') spec['backend'] = args['spec']['backend'];
        if (args['spec']['failedJobsHistoryLimit'] !== undefined && typeof args['spec']['failedJobsHistoryLimit'] == 'number') spec['failedJobsHistoryLimit'] = args['spec']['failedJobsHistoryLimit'];
        if (args['spec']['keepJobs'] !== undefined && typeof args['spec']['keepJobs'] == 'number') spec['keepJobs'] = args['spec']['keepJobs'];
        if (args['spec']['podSecurityContext'] !== undefined && typeof args['spec']['podSecurityContext'] == 'object') spec['podSecurityContext'] = args['spec']['podSecurityContext'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['restoreFilter'] !== undefined && typeof args['spec']['restoreFilter'] == 'string') spec['restoreFilter'] = args['spec']['restoreFilter'];
        if (args['spec']['restoreMethod'] !== undefined && typeof args['spec']['restoreMethod'] == 'object') spec['restoreMethod'] = args['spec']['restoreMethod'];
        if (args['spec']['snapshot'] !== undefined && typeof args['spec']['snapshot'] == 'string') spec['snapshot'] = args['spec']['snapshot'];
        if (args['spec']['successfulJobsHistoryLimit'] !== undefined && typeof args['spec']['successfulJobsHistoryLimit'] == 'number') spec['successfulJobsHistoryLimit'] = args['spec']['successfulJobsHistoryLimit'];
        if (args['spec']['tags'] !== undefined && Array.isArray(args['spec']['tags'])) spec['tags'] = args['spec']['tags'];
        const request = {
            apiVersion: 'k8up.io/v1',
            kind: 'Archive',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('k8up.io','v1',args['namespace'],'archives', args['name'])
            const extGet = resGet.body as K8upArchive
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('k8up.io','v1',args['namespace'],'archives', args['name'], payload, undefined, undefined, undefined, options)
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
    deleteK8upArchive: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('k8up.io','v1',args['namespace'],'archives', args['name'])
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
