import {kc, k8s, getMetadata} from '../core/libs.js';
import { VynilDistrib } from './type.Distrib.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createVynilDistrib: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['branch'] !== undefined && typeof args['spec']['branch'] == 'string') spec['branch'] = args['spec']['branch'];
        if (args['spec']['insecure'] !== undefined && typeof args['spec']['insecure'] == 'boolean') spec['insecure'] = args['spec']['insecure'];
        if (args['spec']['login'] !== undefined && typeof args['spec']['login'] == 'object') spec['login'] = args['spec']['login'];
        spec['schedule'] = args['spec']['schedule'];
        spec['url'] = args['spec']['url'];
        const payload = {
            apiVersion: 'vynil.solidite.fr/v1',
            kind: 'Distrib',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('vynil.solidite.fr','v1','distribs', payload)
            const ext = res.body as VynilDistrib
            return {
                metadata: getMetadata(ext.metadata),
                "branch": ext.spec['branch'],
                "insecure": ext.spec['insecure'],
                "login": ext.spec['login'],
                "schedule": ext.spec['schedule'],
                "url": ext.spec['url'],
                status: ext.status==undefined?null:{
                    "components": ext.status['components'],
                    "errors": ext.status['errors'],
                    "last_updated": ext.status['last_updated'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchVynilDistrib: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['branch'] !== undefined && typeof args['spec']['branch'] == 'string') spec['branch'] = args['spec']['branch'];
        if (args['spec']['insecure'] !== undefined && typeof args['spec']['insecure'] == 'boolean') spec['insecure'] = args['spec']['insecure'];
        if (args['spec']['login'] !== undefined && typeof args['spec']['login'] == 'object') spec['login'] = args['spec']['login'];
        spec['schedule'] = args['spec']['schedule'];
        spec['url'] = args['spec']['url'];
        const request = {
            apiVersion: 'vynil.solidite.fr/v1',
            kind: 'Distrib',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('vynil.solidite.fr','v1','distribs', args['name'])
            const extGet = resGet.body as VynilDistrib
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('vynil.solidite.fr','v1','distribs', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as VynilDistrib
            return {
                metadata: getMetadata(ext.metadata),
                "branch": ext.spec['branch'],
                "insecure": ext.spec['insecure'],
                "login": ext.spec['login'],
                "schedule": ext.spec['schedule'],
                "url": ext.spec['url'],
                status: ext.status==undefined?null:{
                    "components": ext.status['components'],
                    "errors": ext.status['errors'],
                    "last_updated": ext.status['last_updated'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteVynilDistrib: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('vynil.solidite.fr','v1','distribs', args['name'])
        const ext = res.body as VynilDistrib
        return {
            metadata: getMetadata(ext.metadata),
            "branch": ext.spec['branch'],
            "insecure": ext.spec['insecure'],
            "login": ext.spec['login'],
            "schedule": ext.spec['schedule'],
            "url": ext.spec['url'],
            status: ext.status==undefined?null:{
                "components": ext.status['components'],
                "errors": ext.status['errors'],
                "last_updated": ext.status['last_updated'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
