import {kc, k8s, getMetadata} from '../core/libs.js';
import { K8upPrune } from './type.Prune.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createK8upPrune: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['activeDeadlineSeconds'] !== undefined && typeof args['spec']['activeDeadlineSeconds'] == 'number') spec['activeDeadlineSeconds'] = args['spec']['activeDeadlineSeconds'];
        if (args['spec']['backend'] !== undefined && typeof args['spec']['backend'] == 'object') spec['backend'] = args['spec']['backend'];
        if (args['spec']['failedJobsHistoryLimit'] !== undefined && typeof args['spec']['failedJobsHistoryLimit'] == 'number') spec['failedJobsHistoryLimit'] = args['spec']['failedJobsHistoryLimit'];
        if (args['spec']['keepJobs'] !== undefined && typeof args['spec']['keepJobs'] == 'number') spec['keepJobs'] = args['spec']['keepJobs'];
        if (args['spec']['podSecurityContext'] !== undefined && typeof args['spec']['podSecurityContext'] == 'object') spec['podSecurityContext'] = args['spec']['podSecurityContext'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['retention'] !== undefined && typeof args['spec']['retention'] == 'object') spec['retention'] = args['spec']['retention'];
        if (args['spec']['successfulJobsHistoryLimit'] !== undefined && typeof args['spec']['successfulJobsHistoryLimit'] == 'number') spec['successfulJobsHistoryLimit'] = args['spec']['successfulJobsHistoryLimit'];
        const payload = {
            apiVersion: 'k8up.io/v1',
            kind: 'Prune',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('k8up.io','v1',args['namespace'],'prunes', payload)
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
    patchK8upPrune: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['activeDeadlineSeconds'] !== undefined && typeof args['spec']['activeDeadlineSeconds'] == 'number') spec['activeDeadlineSeconds'] = args['spec']['activeDeadlineSeconds'];
        if (args['spec']['backend'] !== undefined && typeof args['spec']['backend'] == 'object') spec['backend'] = args['spec']['backend'];
        if (args['spec']['failedJobsHistoryLimit'] !== undefined && typeof args['spec']['failedJobsHistoryLimit'] == 'number') spec['failedJobsHistoryLimit'] = args['spec']['failedJobsHistoryLimit'];
        if (args['spec']['keepJobs'] !== undefined && typeof args['spec']['keepJobs'] == 'number') spec['keepJobs'] = args['spec']['keepJobs'];
        if (args['spec']['podSecurityContext'] !== undefined && typeof args['spec']['podSecurityContext'] == 'object') spec['podSecurityContext'] = args['spec']['podSecurityContext'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['retention'] !== undefined && typeof args['spec']['retention'] == 'object') spec['retention'] = args['spec']['retention'];
        if (args['spec']['successfulJobsHistoryLimit'] !== undefined && typeof args['spec']['successfulJobsHistoryLimit'] == 'number') spec['successfulJobsHistoryLimit'] = args['spec']['successfulJobsHistoryLimit'];
        const request = {
            apiVersion: 'k8up.io/v1',
            kind: 'Prune',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('k8up.io','v1',args['namespace'],'prunes', args['name'])
            const extGet = resGet.body as K8upPrune
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('k8up.io','v1',args['namespace'],'prunes', args['name'], payload, undefined, undefined, undefined, options)
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
    deleteK8upPrune: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('k8up.io','v1',args['namespace'],'prunes', args['name'])
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
