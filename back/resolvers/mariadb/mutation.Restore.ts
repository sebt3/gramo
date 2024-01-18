import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbRestore } from './type.Restore.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMariadbRestore: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['backoffLimit'] !== undefined && typeof args['spec']['backoffLimit'] == 'number') spec['backoffLimit'] = args['spec']['backoffLimit'];
        if (args['spec']['backupRef'] !== undefined && typeof args['spec']['backupRef'] == 'object') spec['backupRef'] = args['spec']['backupRef'];
        if (args['spec']['fileName'] !== undefined && typeof args['spec']['fileName'] == 'string') spec['fileName'] = args['spec']['fileName'];
        spec['mariaDbRef'] = args['spec']['mariaDbRef'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['restartPolicy'] !== undefined && typeof args['spec']['restartPolicy'] == 'string') spec['restartPolicy'] = args['spec']['restartPolicy'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        if (args['spec']['volume'] !== undefined && typeof args['spec']['volume'] == 'object') spec['volume'] = args['spec']['volume'];
        const payload = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'Restore',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'restores', payload)
            const ext = res.body as MariadbRestore
            return {
                metadata: getMetadata(ext.metadata),
                affinity: ext.spec.affinity,
                backoffLimit: ext.spec.backoffLimit,
                backupRef: ext.spec.backupRef,
                fileName: ext.spec.fileName,
                mariaDbRef: ext.spec.mariaDbRef,
                nodeSelector: ext.spec.nodeSelector,
                resources: ext.spec.resources,
                restartPolicy: ext.spec.restartPolicy,
                tolerations: ext.spec.tolerations,
                volume: ext.spec.volume,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchMariadbRestore: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['backoffLimit'] !== undefined && typeof args['spec']['backoffLimit'] == 'number') spec['backoffLimit'] = args['spec']['backoffLimit'];
        if (args['spec']['backupRef'] !== undefined && typeof args['spec']['backupRef'] == 'object') spec['backupRef'] = args['spec']['backupRef'];
        if (args['spec']['fileName'] !== undefined && typeof args['spec']['fileName'] == 'string') spec['fileName'] = args['spec']['fileName'];
        spec['mariaDbRef'] = args['spec']['mariaDbRef'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['restartPolicy'] !== undefined && typeof args['spec']['restartPolicy'] == 'string') spec['restartPolicy'] = args['spec']['restartPolicy'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        if (args['spec']['volume'] !== undefined && typeof args['spec']['volume'] == 'object') spec['volume'] = args['spec']['volume'];
        const request = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'Restore',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'restores', args['name'])
            const extGet = resGet.body as MariadbRestore
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'restores', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MariadbRestore
            return {
                metadata: getMetadata(ext.metadata),
                affinity: ext.spec.affinity,
                backoffLimit: ext.spec.backoffLimit,
                backupRef: ext.spec.backupRef,
                fileName: ext.spec.fileName,
                mariaDbRef: ext.spec.mariaDbRef,
                nodeSelector: ext.spec.nodeSelector,
                resources: ext.spec.resources,
                restartPolicy: ext.spec.restartPolicy,
                tolerations: ext.spec.tolerations,
                volume: ext.spec.volume,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteMariadbRestore: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'restores', args['name'])
        const ext = res.body as MariadbRestore
        return {
            metadata: getMetadata(ext.metadata),
            affinity: ext.spec.affinity,
            backoffLimit: ext.spec.backoffLimit,
            backupRef: ext.spec.backupRef,
            fileName: ext.spec.fileName,
            mariaDbRef: ext.spec.mariaDbRef,
            nodeSelector: ext.spec.nodeSelector,
            resources: ext.spec.resources,
            restartPolicy: ext.spec.restartPolicy,
            tolerations: ext.spec.tolerations,
            volume: ext.spec.volume,
            status: ext.status==undefined?null:{
                conditions: ext.status.conditions,
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
