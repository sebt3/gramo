import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbGrant } from './type.Grant.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMariadbGrant: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['database'] !== undefined && typeof args['spec']['database'] == 'string') spec['database'] = args['spec']['database'];
        if (args['spec']['grantOption'] !== undefined && typeof args['spec']['grantOption'] == 'boolean') spec['grantOption'] = args['spec']['grantOption'];
        if (args['spec']['host'] !== undefined && typeof args['spec']['host'] == 'string') spec['host'] = args['spec']['host'];
        spec['mariaDbRef'] = args['spec']['mariaDbRef'];
        spec['privileges'] = args['spec']['privileges'];
        if (args['spec']['retryInterval'] !== undefined && typeof args['spec']['retryInterval'] == 'string') spec['retryInterval'] = args['spec']['retryInterval'];
        if (args['spec']['table'] !== undefined && typeof args['spec']['table'] == 'string') spec['table'] = args['spec']['table'];
        spec['username'] = args['spec']['username'];
        const payload = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'Grant',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'grants', payload)
            const ext = res.body as MariadbGrant
            return {
                metadata: getMetadata(ext.metadata, ext),
                "database": ext.spec['database'],
                "grantOption": ext.spec['grantOption'],
                "host": ext.spec['host'],
                "mariaDbRef": ext.spec['mariaDbRef'],
                "privileges": ext.spec['privileges'],
                "retryInterval": ext.spec['retryInterval'],
                "table": ext.spec['table'],
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
    patchMariadbGrant: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['database'] !== undefined && typeof args['spec']['database'] == 'string') spec['database'] = args['spec']['database'];
        if (args['spec']['grantOption'] !== undefined && typeof args['spec']['grantOption'] == 'boolean') spec['grantOption'] = args['spec']['grantOption'];
        if (args['spec']['host'] !== undefined && typeof args['spec']['host'] == 'string') spec['host'] = args['spec']['host'];
        spec['mariaDbRef'] = args['spec']['mariaDbRef'];
        spec['privileges'] = args['spec']['privileges'];
        if (args['spec']['retryInterval'] !== undefined && typeof args['spec']['retryInterval'] == 'string') spec['retryInterval'] = args['spec']['retryInterval'];
        if (args['spec']['table'] !== undefined && typeof args['spec']['table'] == 'string') spec['table'] = args['spec']['table'];
        spec['username'] = args['spec']['username'];
        const request = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'Grant',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'grants', args['name'])
            const extGet = resGet.body as MariadbGrant
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'grants', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MariadbGrant
            return {
                metadata: getMetadata(ext.metadata, ext),
                "database": ext.spec['database'],
                "grantOption": ext.spec['grantOption'],
                "host": ext.spec['host'],
                "mariaDbRef": ext.spec['mariaDbRef'],
                "privileges": ext.spec['privileges'],
                "retryInterval": ext.spec['retryInterval'],
                "table": ext.spec['table'],
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
    deleteMariadbGrant: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'grants', args['name'])
        const ext = res.body as MariadbGrant
        return {
            metadata: getMetadata(ext.metadata, ext),
            "database": ext.spec['database'],
            "grantOption": ext.spec['grantOption'],
            "host": ext.spec['host'],
            "mariaDbRef": ext.spec['mariaDbRef'],
            "privileges": ext.spec['privileges'],
            "retryInterval": ext.spec['retryInterval'],
            "table": ext.spec['table'],
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
