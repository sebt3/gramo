import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbBackup } from './type.Backup.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMariadbBackup: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['args'] !== undefined && Array.isArray(args['spec']['args'])) spec['args'] = args['spec']['args'];
        if (args['spec']['backoffLimit'] !== undefined && typeof args['spec']['backoffLimit'] == 'number') spec['backoffLimit'] = args['spec']['backoffLimit'];
        spec['mariaDbRef'] = args['spec']['mariaDbRef'];
        if (args['spec']['maxRetentionDays'] !== undefined && typeof args['spec']['maxRetentionDays'] == 'number') spec['maxRetentionDays'] = args['spec']['maxRetentionDays'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['restartPolicy'] !== undefined && typeof args['spec']['restartPolicy'] == 'string') spec['restartPolicy'] = args['spec']['restartPolicy'];
        if (args['spec']['schedule'] !== undefined && typeof args['spec']['schedule'] == 'object') spec['schedule'] = args['spec']['schedule'];
        spec['storage'] = args['spec']['storage'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        const payload = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'Backup',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'backups', payload)
            const ext = res.body as MariadbBackup
            return {
                metadata: getMetadata(ext.metadata),
                affinity: ext.spec.affinity,
                args: ext.spec.args,
                backoffLimit: ext.spec.backoffLimit,
                mariaDbRef: ext.spec.mariaDbRef,
                maxRetentionDays: ext.spec.maxRetentionDays,
                nodeSelector: ext.spec.nodeSelector,
                resources: ext.spec.resources,
                restartPolicy: ext.spec.restartPolicy,
                schedule: ext.spec.schedule,
                storage: ext.spec.storage,
                tolerations: ext.spec.tolerations,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchMariadbBackup: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'object') spec['affinity'] = args['spec']['affinity'];
        if (args['spec']['args'] !== undefined && Array.isArray(args['spec']['args'])) spec['args'] = args['spec']['args'];
        if (args['spec']['backoffLimit'] !== undefined && typeof args['spec']['backoffLimit'] == 'number') spec['backoffLimit'] = args['spec']['backoffLimit'];
        spec['mariaDbRef'] = args['spec']['mariaDbRef'];
        if (args['spec']['maxRetentionDays'] !== undefined && typeof args['spec']['maxRetentionDays'] == 'number') spec['maxRetentionDays'] = args['spec']['maxRetentionDays'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'object') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['resources'] !== undefined && typeof args['spec']['resources'] == 'object') spec['resources'] = args['spec']['resources'];
        if (args['spec']['restartPolicy'] !== undefined && typeof args['spec']['restartPolicy'] == 'string') spec['restartPolicy'] = args['spec']['restartPolicy'];
        if (args['spec']['schedule'] !== undefined && typeof args['spec']['schedule'] == 'object') spec['schedule'] = args['spec']['schedule'];
        spec['storage'] = args['spec']['storage'];
        if (args['spec']['tolerations'] !== undefined && Array.isArray(args['spec']['tolerations'])) spec['tolerations'] = args['spec']['tolerations'];
        const request = {
            apiVersion: 'mariadb.mmontes.io/v1alpha1',
            kind: 'Backup',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'backups', args['name'])
            const extGet = resGet.body as MariadbBackup
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'backups', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MariadbBackup
            return {
                metadata: getMetadata(ext.metadata),
                affinity: ext.spec.affinity,
                args: ext.spec.args,
                backoffLimit: ext.spec.backoffLimit,
                mariaDbRef: ext.spec.mariaDbRef,
                maxRetentionDays: ext.spec.maxRetentionDays,
                nodeSelector: ext.spec.nodeSelector,
                resources: ext.spec.resources,
                restartPolicy: ext.spec.restartPolicy,
                schedule: ext.spec.schedule,
                storage: ext.spec.storage,
                tolerations: ext.spec.tolerations,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteMariadbBackup: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'backups', args['name'])
        const ext = res.body as MariadbBackup
        return {
            metadata: getMetadata(ext.metadata),
            affinity: ext.spec.affinity,
            args: ext.spec.args,
            backoffLimit: ext.spec.backoffLimit,
            mariaDbRef: ext.spec.mariaDbRef,
            maxRetentionDays: ext.spec.maxRetentionDays,
            nodeSelector: ext.spec.nodeSelector,
            resources: ext.spec.resources,
            restartPolicy: ext.spec.restartPolicy,
            schedule: ext.spec.schedule,
            storage: ext.spec.storage,
            tolerations: ext.spec.tolerations,
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
