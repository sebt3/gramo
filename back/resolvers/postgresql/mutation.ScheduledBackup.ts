import {kc, k8s, getMetadata} from '../core/libs.js';
import { PostgresqlScheduledBackup } from './type.ScheduledBackup.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createPostgresqlScheduledBackup: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['backupOwnerReference'] !== undefined && typeof args['spec']['backupOwnerReference'] == 'string') spec['backupOwnerReference'] = args['spec']['backupOwnerReference'];
        if (args['spec']['cluster'] !== undefined && typeof args['spec']['cluster'] == 'object') spec['cluster'] = args['spec']['cluster'];
        if (args['spec']['immediate'] !== undefined && typeof args['spec']['immediate'] == 'boolean') spec['immediate'] = args['spec']['immediate'];
        spec['schedule'] = args['spec']['schedule'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['target'] !== undefined && typeof args['spec']['target'] == 'string') spec['target'] = args['spec']['target'];
        const payload = {
            apiVersion: 'postgresql.cnpg.io/v1',
            kind: 'ScheduledBackup',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'scheduledbackups', payload)
            const ext = res.body as PostgresqlScheduledBackup
            return {
                metadata: getMetadata(ext.metadata),
                "backupOwnerReference": ext.spec['backupOwnerReference'],
                "cluster": ext.spec['cluster'],
                "immediate": ext.spec['immediate'],
                "schedule": ext.spec['schedule'],
                "suspend": ext.spec['suspend'],
                "target": ext.spec['target'],
                status: ext.status==undefined?null:{
                    "lastCheckTime": ext.status['lastCheckTime'],
                    "lastScheduleTime": ext.status['lastScheduleTime'],
                    "nextScheduleTime": ext.status['nextScheduleTime'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchPostgresqlScheduledBackup: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['backupOwnerReference'] !== undefined && typeof args['spec']['backupOwnerReference'] == 'string') spec['backupOwnerReference'] = args['spec']['backupOwnerReference'];
        if (args['spec']['cluster'] !== undefined && typeof args['spec']['cluster'] == 'object') spec['cluster'] = args['spec']['cluster'];
        if (args['spec']['immediate'] !== undefined && typeof args['spec']['immediate'] == 'boolean') spec['immediate'] = args['spec']['immediate'];
        spec['schedule'] = args['spec']['schedule'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['target'] !== undefined && typeof args['spec']['target'] == 'string') spec['target'] = args['spec']['target'];
        const request = {
            apiVersion: 'postgresql.cnpg.io/v1',
            kind: 'ScheduledBackup',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'scheduledbackups', args['name'])
            const extGet = resGet.body as PostgresqlScheduledBackup
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'scheduledbackups', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as PostgresqlScheduledBackup
            return {
                metadata: getMetadata(ext.metadata),
                "backupOwnerReference": ext.spec['backupOwnerReference'],
                "cluster": ext.spec['cluster'],
                "immediate": ext.spec['immediate'],
                "schedule": ext.spec['schedule'],
                "suspend": ext.spec['suspend'],
                "target": ext.spec['target'],
                status: ext.status==undefined?null:{
                    "lastCheckTime": ext.status['lastCheckTime'],
                    "lastScheduleTime": ext.status['lastScheduleTime'],
                    "nextScheduleTime": ext.status['nextScheduleTime'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deletePostgresqlScheduledBackup: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'scheduledbackups', args['name'])
        const ext = res.body as PostgresqlScheduledBackup
        return {
            metadata: getMetadata(ext.metadata),
            "backupOwnerReference": ext.spec['backupOwnerReference'],
            "cluster": ext.spec['cluster'],
            "immediate": ext.spec['immediate'],
            "schedule": ext.spec['schedule'],
            "suspend": ext.spec['suspend'],
            "target": ext.spec['target'],
            status: ext.status==undefined?null:{
                "lastCheckTime": ext.status['lastCheckTime'],
                "lastScheduleTime": ext.status['lastScheduleTime'],
                "nextScheduleTime": ext.status['nextScheduleTime'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
