import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbDatabase } from './type.Database.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMariadbDatabase: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['characterSet'] !== undefined && typeof args['spec']['characterSet'] == 'string') spec['characterSet'] = args['spec']['characterSet'];
        if (args['spec']['collate'] !== undefined && typeof args['spec']['collate'] == 'string') spec['collate'] = args['spec']['collate'];
        spec['mariaDbRef'] = args['spec']['mariaDbRef'];
        if (args['spec']['name'] !== undefined && typeof args['spec']['name'] == 'string') spec['name'] = args['spec']['name'];
        if (args['spec']['retryInterval'] !== undefined && typeof args['spec']['retryInterval'] == 'string') spec['retryInterval'] = args['spec']['retryInterval'];
        const payload = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'Database',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'databases', payload)
            const ext = res.body as MariadbDatabase
            return {
                metadata: getMetadata(ext.metadata, ext),
                "characterSet": ext.spec['characterSet'],
                "collate": ext.spec['collate'],
                "mariaDbRef": ext.spec['mariaDbRef'],
                "name": ext.spec['name'],
                "retryInterval": ext.spec['retryInterval'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchMariadbDatabase: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['characterSet'] !== undefined && typeof args['spec']['characterSet'] == 'string') spec['characterSet'] = args['spec']['characterSet'];
        if (args['spec']['collate'] !== undefined && typeof args['spec']['collate'] == 'string') spec['collate'] = args['spec']['collate'];
        spec['mariaDbRef'] = args['spec']['mariaDbRef'];
        if (args['spec']['name'] !== undefined && typeof args['spec']['name'] == 'string') spec['name'] = args['spec']['name'];
        if (args['spec']['retryInterval'] !== undefined && typeof args['spec']['retryInterval'] == 'string') spec['retryInterval'] = args['spec']['retryInterval'];
        const request = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'Database',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'databases', args['name'])
            const extGet = resGet.body as MariadbDatabase
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'databases', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MariadbDatabase
            return {
                metadata: getMetadata(ext.metadata, ext),
                "characterSet": ext.spec['characterSet'],
                "collate": ext.spec['collate'],
                "mariaDbRef": ext.spec['mariaDbRef'],
                "name": ext.spec['name'],
                "retryInterval": ext.spec['retryInterval'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteMariadbDatabase: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'databases', args['name'])
        const ext = res.body as MariadbDatabase
        return {
            metadata: getMetadata(ext.metadata, ext),
            "characterSet": ext.spec['characterSet'],
            "collate": ext.spec['collate'],
            "mariaDbRef": ext.spec['mariaDbRef'],
            "name": ext.spec['name'],
            "retryInterval": ext.spec['retryInterval'],
            status: ext.status==undefined?null:{
                "conditions": ext.status['conditions'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
