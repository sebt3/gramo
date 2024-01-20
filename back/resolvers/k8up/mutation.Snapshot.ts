import {kc, k8s, getMetadata} from '../core/libs.js';
import { K8upSnapshot } from './type.Snapshot.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createK8upSnapshot: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['date'] !== undefined && typeof args['spec']['date'] == 'string') spec['date'] = args['spec']['date'];
        if (args['spec']['id'] !== undefined && typeof args['spec']['id'] == 'string') spec['id'] = args['spec']['id'];
        if (args['spec']['paths'] !== undefined && Array.isArray(args['spec']['paths'])) spec['paths'] = args['spec']['paths'];
        if (args['spec']['repository'] !== undefined && typeof args['spec']['repository'] == 'string') spec['repository'] = args['spec']['repository'];
        const payload = {
            apiVersion: 'k8up.io/v1',
            kind: 'Snapshot',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('k8up.io','v1',args['namespace'],'snapshots', payload)
            const ext = res.body as K8upSnapshot
            return {
                metadata: getMetadata(ext.metadata, ext),
                "date": ext.spec['date'],
                "id": ext.spec['id'],
                "paths": ext.spec['paths'],
                "repository": ext.spec['repository'],
                status: ext.status==undefined?null:{
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchK8upSnapshot: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['date'] !== undefined && typeof args['spec']['date'] == 'string') spec['date'] = args['spec']['date'];
        if (args['spec']['id'] !== undefined && typeof args['spec']['id'] == 'string') spec['id'] = args['spec']['id'];
        if (args['spec']['paths'] !== undefined && Array.isArray(args['spec']['paths'])) spec['paths'] = args['spec']['paths'];
        if (args['spec']['repository'] !== undefined && typeof args['spec']['repository'] == 'string') spec['repository'] = args['spec']['repository'];
        const request = {
            apiVersion: 'k8up.io/v1',
            kind: 'Snapshot',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('k8up.io','v1',args['namespace'],'snapshots', args['name'])
            const extGet = resGet.body as K8upSnapshot
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('k8up.io','v1',args['namespace'],'snapshots', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as K8upSnapshot
            return {
                metadata: getMetadata(ext.metadata, ext),
                "date": ext.spec['date'],
                "id": ext.spec['id'],
                "paths": ext.spec['paths'],
                "repository": ext.spec['repository'],
                status: ext.status==undefined?null:{
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteK8upSnapshot: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('k8up.io','v1',args['namespace'],'snapshots', args['name'])
        const ext = res.body as K8upSnapshot
        return {
            metadata: getMetadata(ext.metadata, ext),
            "date": ext.spec['date'],
            "id": ext.spec['id'],
            "paths": ext.spec['paths'],
            "repository": ext.spec['repository'],
            status: ext.status==undefined?null:{
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
