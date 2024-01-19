import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbConnection } from './type.Connection.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMariadbConnection: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['database'] !== undefined && typeof args['spec']['database'] == 'string') spec['database'] = args['spec']['database'];
        if (args['spec']['healthCheck'] !== undefined && typeof args['spec']['healthCheck'] == 'object') spec['healthCheck'] = args['spec']['healthCheck'];
        spec['mariaDbRef'] = args['spec']['mariaDbRef'];
        if (args['spec']['params'] !== undefined && typeof args['spec']['params'] == 'object') spec['params'] = args['spec']['params'];
        spec['passwordSecretKeyRef'] = args['spec']['passwordSecretKeyRef'];
        if (args['spec']['secretName'] !== undefined && typeof args['spec']['secretName'] == 'string') spec['secretName'] = args['spec']['secretName'];
        if (args['spec']['secretTemplate'] !== undefined && typeof args['spec']['secretTemplate'] == 'object') spec['secretTemplate'] = args['spec']['secretTemplate'];
        if (args['spec']['serviceName'] !== undefined && typeof args['spec']['serviceName'] == 'string') spec['serviceName'] = args['spec']['serviceName'];
        spec['username'] = args['spec']['username'];
        const payload = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'Connection',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'connections', payload)
            const ext = res.body as MariadbConnection
            return {
                metadata: getMetadata(ext.metadata),
                "database": ext.spec['database'],
                "healthCheck": ext.spec['healthCheck'],
                "mariaDbRef": ext.spec['mariaDbRef'],
                "params": ext.spec['params'],
                "passwordSecretKeyRef": ext.spec['passwordSecretKeyRef'],
                "secretName": ext.spec['secretName'],
                "secretTemplate": ext.spec['secretTemplate'],
                "serviceName": ext.spec['serviceName'],
                "username": ext.spec['username'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchMariadbConnection: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['database'] !== undefined && typeof args['spec']['database'] == 'string') spec['database'] = args['spec']['database'];
        if (args['spec']['healthCheck'] !== undefined && typeof args['spec']['healthCheck'] == 'object') spec['healthCheck'] = args['spec']['healthCheck'];
        spec['mariaDbRef'] = args['spec']['mariaDbRef'];
        if (args['spec']['params'] !== undefined && typeof args['spec']['params'] == 'object') spec['params'] = args['spec']['params'];
        spec['passwordSecretKeyRef'] = args['spec']['passwordSecretKeyRef'];
        if (args['spec']['secretName'] !== undefined && typeof args['spec']['secretName'] == 'string') spec['secretName'] = args['spec']['secretName'];
        if (args['spec']['secretTemplate'] !== undefined && typeof args['spec']['secretTemplate'] == 'object') spec['secretTemplate'] = args['spec']['secretTemplate'];
        if (args['spec']['serviceName'] !== undefined && typeof args['spec']['serviceName'] == 'string') spec['serviceName'] = args['spec']['serviceName'];
        spec['username'] = args['spec']['username'];
        const request = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'Connection',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'connections', args['name'])
            const extGet = resGet.body as MariadbConnection
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'connections', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MariadbConnection
            return {
                metadata: getMetadata(ext.metadata),
                "database": ext.spec['database'],
                "healthCheck": ext.spec['healthCheck'],
                "mariaDbRef": ext.spec['mariaDbRef'],
                "params": ext.spec['params'],
                "passwordSecretKeyRef": ext.spec['passwordSecretKeyRef'],
                "secretName": ext.spec['secretName'],
                "secretTemplate": ext.spec['secretTemplate'],
                "serviceName": ext.spec['serviceName'],
                "username": ext.spec['username'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteMariadbConnection: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'connections', args['name'])
        const ext = res.body as MariadbConnection
        return {
            metadata: getMetadata(ext.metadata),
            "database": ext.spec['database'],
            "healthCheck": ext.spec['healthCheck'],
            "mariaDbRef": ext.spec['mariaDbRef'],
            "params": ext.spec['params'],
            "passwordSecretKeyRef": ext.spec['passwordSecretKeyRef'],
            "secretName": ext.spec['secretName'],
            "secretTemplate": ext.spec['secretTemplate'],
            "serviceName": ext.spec['serviceName'],
            "username": ext.spec['username'],
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
