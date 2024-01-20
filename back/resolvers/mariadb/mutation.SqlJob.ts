import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbSqlJob } from './type.SqlJob.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMariadbSqlJob: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['backoffLimit'] !== undefined && typeof args['spec']['backoffLimit'] == 'number') spec['backoffLimit'] = args['spec']['backoffLimit'];
        if (args['spec']['database'] !== undefined && typeof args['spec']['database'] == 'string') spec['database'] = args['spec']['database'];
        if (args['spec']['dependsOn'] !== undefined && Array.isArray(args['spec']['dependsOn'])) spec['dependsOn'] = args['spec']['dependsOn'];
        spec['mariaDbRef'] = args['spec']['mariaDbRef'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        spec['passwordSecretKeyRef'] = args['spec']['passwordSecretKeyRef'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['restartPolicy'] !== undefined && typeof args['spec']['restartPolicy'] == 'string') spec['restartPolicy'] = args['spec']['restartPolicy'];
        if (args['spec']['schedule'] !== undefined && typeof args['spec']['schedule'] == 'object') spec['schedule'] = args['spec']['schedule'];
        if (args['spec']['sql'] !== undefined && typeof args['spec']['sql'] == 'string') spec['sql'] = args['spec']['sql'];
        if (args['spec']['sqlConfigMapKeyRef'] !== undefined && typeof args['spec']['sqlConfigMapKeyRef'] == 'object') spec['sqlConfigMapKeyRef'] = args['spec']['sqlConfigMapKeyRef'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        spec['username'] = args['spec']['username'];
        const payload = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'SqlJob',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'sqljobs', payload)
            const ext = res.body as MariadbSqlJob
            return {
                metadata: getMetadata(ext.metadata, ext),
                "affinity": ext.spec['affinity'],
                "backoffLimit": ext.spec['backoffLimit'],
                "database": ext.spec['database'],
                "dependsOn": ext.spec['dependsOn'],
                "mariaDbRef": ext.spec['mariaDbRef'],
                "nodeSelector": ext.spec['nodeSelector'],
                "passwordSecretKeyRef": ext.spec['passwordSecretKeyRef'],
                "resources": ext.spec['resources'],
                "restartPolicy": ext.spec['restartPolicy'],
                "schedule": ext.spec['schedule'],
                "sql": ext.spec['sql'],
                "sqlConfigMapKeyRef": ext.spec['sqlConfigMapKeyRef'],
                "tolerations": ext.spec['tolerations'],
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
    patchMariadbSqlJob: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['backoffLimit'] !== undefined && typeof args['spec']['backoffLimit'] == 'number') spec['backoffLimit'] = args['spec']['backoffLimit'];
        if (args['spec']['database'] !== undefined && typeof args['spec']['database'] == 'string') spec['database'] = args['spec']['database'];
        if (args['spec']['dependsOn'] !== undefined && Array.isArray(args['spec']['dependsOn'])) spec['dependsOn'] = args['spec']['dependsOn'];
        spec['mariaDbRef'] = args['spec']['mariaDbRef'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        spec['passwordSecretKeyRef'] = args['spec']['passwordSecretKeyRef'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['restartPolicy'] !== undefined && typeof args['spec']['restartPolicy'] == 'string') spec['restartPolicy'] = args['spec']['restartPolicy'];
        if (args['spec']['schedule'] !== undefined && typeof args['spec']['schedule'] == 'object') spec['schedule'] = args['spec']['schedule'];
        if (args['spec']['sql'] !== undefined && typeof args['spec']['sql'] == 'string') spec['sql'] = args['spec']['sql'];
        if (args['spec']['sqlConfigMapKeyRef'] !== undefined && typeof args['spec']['sqlConfigMapKeyRef'] == 'object') spec['sqlConfigMapKeyRef'] = args['spec']['sqlConfigMapKeyRef'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        spec['username'] = args['spec']['username'];
        const request = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'SqlJob',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'sqljobs', args['name'])
            const extGet = resGet.body as MariadbSqlJob
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'sqljobs', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MariadbSqlJob
            return {
                metadata: getMetadata(ext.metadata, ext),
                "affinity": ext.spec['affinity'],
                "backoffLimit": ext.spec['backoffLimit'],
                "database": ext.spec['database'],
                "dependsOn": ext.spec['dependsOn'],
                "mariaDbRef": ext.spec['mariaDbRef'],
                "nodeSelector": ext.spec['nodeSelector'],
                "passwordSecretKeyRef": ext.spec['passwordSecretKeyRef'],
                "resources": ext.spec['resources'],
                "restartPolicy": ext.spec['restartPolicy'],
                "schedule": ext.spec['schedule'],
                "sql": ext.spec['sql'],
                "sqlConfigMapKeyRef": ext.spec['sqlConfigMapKeyRef'],
                "tolerations": ext.spec['tolerations'],
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
    deleteMariadbSqlJob: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'sqljobs', args['name'])
        const ext = res.body as MariadbSqlJob
        return {
            metadata: getMetadata(ext.metadata, ext),
            "affinity": ext.spec['affinity'],
            "backoffLimit": ext.spec['backoffLimit'],
            "database": ext.spec['database'],
            "dependsOn": ext.spec['dependsOn'],
            "mariaDbRef": ext.spec['mariaDbRef'],
            "nodeSelector": ext.spec['nodeSelector'],
            "passwordSecretKeyRef": ext.spec['passwordSecretKeyRef'],
            "resources": ext.spec['resources'],
            "restartPolicy": ext.spec['restartPolicy'],
            "schedule": ext.spec['schedule'],
            "sql": ext.spec['sql'],
            "sqlConfigMapKeyRef": ext.spec['sqlConfigMapKeyRef'],
            "tolerations": ext.spec['tolerations'],
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
