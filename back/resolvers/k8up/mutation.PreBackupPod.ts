import {kc, k8s, getMetadata} from '../core/libs.js';
import { K8upPreBackupPod } from './type.PreBackupPod.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createK8upPreBackupPod: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['backupCommand'] !== undefined && typeof args['spec']['backupCommand'] == 'string') spec['backupCommand'] = args['spec']['backupCommand'];
        if (args['spec']['fileExtension'] !== undefined && typeof args['spec']['fileExtension'] == 'string') spec['fileExtension'] = args['spec']['fileExtension'];
        if (args['spec']['pod'] !== undefined && typeof args['spec']['pod'] == 'object') spec['pod'] = args['spec']['pod'];
        const payload = {
            apiVersion: 'k8up.io/v1',
            kind: 'PreBackupPod',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('k8up.io','v1',args['namespace'],'prebackuppods', payload)
            const ext = res.body as K8upPreBackupPod
            return {
                metadata: getMetadata(ext.metadata),
                "backupCommand": ext.spec['backupCommand'],
                "fileExtension": ext.spec['fileExtension'],
                "pod": ext.spec['pod'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchK8upPreBackupPod: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['backupCommand'] !== undefined && typeof args['spec']['backupCommand'] == 'string') spec['backupCommand'] = args['spec']['backupCommand'];
        if (args['spec']['fileExtension'] !== undefined && typeof args['spec']['fileExtension'] == 'string') spec['fileExtension'] = args['spec']['fileExtension'];
        if (args['spec']['pod'] !== undefined && typeof args['spec']['pod'] == 'object') spec['pod'] = args['spec']['pod'];
        const request = {
            apiVersion: 'k8up.io/v1',
            kind: 'PreBackupPod',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('k8up.io','v1',args['namespace'],'prebackuppods', args['name'])
            const extGet = resGet.body as K8upPreBackupPod
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('k8up.io','v1',args['namespace'],'prebackuppods', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as K8upPreBackupPod
            return {
                metadata: getMetadata(ext.metadata),
                "backupCommand": ext.spec['backupCommand'],
                "fileExtension": ext.spec['fileExtension'],
                "pod": ext.spec['pod'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteK8upPreBackupPod: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('k8up.io','v1',args['namespace'],'prebackuppods', args['name'])
        const ext = res.body as K8upPreBackupPod
        return {
            metadata: getMetadata(ext.metadata),
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
