import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbUser } from './type.User.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMariadbUser: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['host'] !== undefined && typeof args['spec']['host'] == 'string') spec['host'] = args['spec']['host'];
        spec['mariaDbRef'] = args['spec']['mariaDbRef'];
        if (args['spec']['maxUserConnections'] !== undefined && typeof args['spec']['maxUserConnections'] == 'number') spec['maxUserConnections'] = args['spec']['maxUserConnections'];
        if (args['spec']['name'] !== undefined && typeof args['spec']['name'] == 'string') spec['name'] = args['spec']['name'];
        spec['passwordSecretKeyRef'] = args['spec']['passwordSecretKeyRef'];
        if (args['spec']['retryInterval'] !== undefined && typeof args['spec']['retryInterval'] == 'string') spec['retryInterval'] = args['spec']['retryInterval'];
        const payload = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'User',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'users', payload)
            const ext = res.body as MariadbUser
            return {
                metadata: getMetadata(ext.metadata),
                "host": ext.spec['host'],
                "mariaDbRef": ext.spec['mariaDbRef'],
                "maxUserConnections": ext.spec['maxUserConnections'],
                "name": ext.spec['name'],
                "passwordSecretKeyRef": ext.spec['passwordSecretKeyRef'],
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
    patchMariadbUser: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['host'] !== undefined && typeof args['spec']['host'] == 'string') spec['host'] = args['spec']['host'];
        spec['mariaDbRef'] = args['spec']['mariaDbRef'];
        if (args['spec']['maxUserConnections'] !== undefined && typeof args['spec']['maxUserConnections'] == 'number') spec['maxUserConnections'] = args['spec']['maxUserConnections'];
        if (args['spec']['name'] !== undefined && typeof args['spec']['name'] == 'string') spec['name'] = args['spec']['name'];
        spec['passwordSecretKeyRef'] = args['spec']['passwordSecretKeyRef'];
        if (args['spec']['retryInterval'] !== undefined && typeof args['spec']['retryInterval'] == 'string') spec['retryInterval'] = args['spec']['retryInterval'];
        const request = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'User',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'users', args['name'])
            const extGet = resGet.body as MariadbUser
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'users', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MariadbUser
            return {
                metadata: getMetadata(ext.metadata),
                "host": ext.spec['host'],
                "mariaDbRef": ext.spec['mariaDbRef'],
                "maxUserConnections": ext.spec['maxUserConnections'],
                "name": ext.spec['name'],
                "passwordSecretKeyRef": ext.spec['passwordSecretKeyRef'],
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
    deleteMariadbUser: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'users', args['name'])
        const ext = res.body as MariadbUser
        return {
            metadata: getMetadata(ext.metadata),
            "host": ext.spec['host'],
            "mariaDbRef": ext.spec['mariaDbRef'],
            "maxUserConnections": ext.spec['maxUserConnections'],
            "name": ext.spec['name'],
            "passwordSecretKeyRef": ext.spec['passwordSecretKeyRef'],
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
