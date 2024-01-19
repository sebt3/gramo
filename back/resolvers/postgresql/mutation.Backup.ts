import {kc, k8s, getMetadata} from '../core/libs.js';
import { PostgresqlBackup } from './type.Backup.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createPostgresqlBackup: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['cluster'] !== undefined && typeof args['spec']['cluster'] == 'object') spec['cluster'] = args['spec']['cluster'];
        if (args['spec']['target'] !== undefined && typeof args['spec']['target'] == 'string') spec['target'] = args['spec']['target'];
        const payload = {
            apiVersion: 'postgresql.cnpg.io/v1',
            kind: 'Backup',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'backups', payload)
            const ext = res.body as PostgresqlBackup
            return {
                metadata: getMetadata(ext.metadata),
                "cluster": ext.spec['cluster'],
                "target": ext.spec['target'],
                status: ext.status==undefined?null:{
                    "azureCredentials": ext.status['azureCredentials'],
                    "backupId": ext.status['backupId'],
                    "backupName": ext.status['backupName'],
                    "beginLSN": ext.status['beginLSN'],
                    "beginWal": ext.status['beginWal'],
                    "commandError": ext.status['commandError'],
                    "commandOutput": ext.status['commandOutput'],
                    "destinationPath": ext.status['destinationPath'],
                    "encryption": ext.status['encryption'],
                    "endLSN": ext.status['endLSN'],
                    "endWal": ext.status['endWal'],
                    "endpointCA": ext.status['endpointCA'],
                    "endpointURL": ext.status['endpointURL'],
                    "error": ext.status['error'],
                    "googleCredentials": ext.status['googleCredentials'],
                    "instanceID": ext.status['instanceID'],
                    "phase": ext.status['phase'],
                    "s3Credentials": ext.status['s3Credentials'],
                    "serverName": ext.status['serverName'],
                    "startedAt": ext.status['startedAt'],
                    "stoppedAt": ext.status['stoppedAt'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchPostgresqlBackup: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['cluster'] !== undefined && typeof args['spec']['cluster'] == 'object') spec['cluster'] = args['spec']['cluster'];
        if (args['spec']['target'] !== undefined && typeof args['spec']['target'] == 'string') spec['target'] = args['spec']['target'];
        const request = {
            apiVersion: 'postgresql.cnpg.io/v1',
            kind: 'Backup',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'backups', args['name'])
            const extGet = resGet.body as PostgresqlBackup
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'backups', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as PostgresqlBackup
            return {
                metadata: getMetadata(ext.metadata),
                "cluster": ext.spec['cluster'],
                "target": ext.spec['target'],
                status: ext.status==undefined?null:{
                    "azureCredentials": ext.status['azureCredentials'],
                    "backupId": ext.status['backupId'],
                    "backupName": ext.status['backupName'],
                    "beginLSN": ext.status['beginLSN'],
                    "beginWal": ext.status['beginWal'],
                    "commandError": ext.status['commandError'],
                    "commandOutput": ext.status['commandOutput'],
                    "destinationPath": ext.status['destinationPath'],
                    "encryption": ext.status['encryption'],
                    "endLSN": ext.status['endLSN'],
                    "endWal": ext.status['endWal'],
                    "endpointCA": ext.status['endpointCA'],
                    "endpointURL": ext.status['endpointURL'],
                    "error": ext.status['error'],
                    "googleCredentials": ext.status['googleCredentials'],
                    "instanceID": ext.status['instanceID'],
                    "phase": ext.status['phase'],
                    "s3Credentials": ext.status['s3Credentials'],
                    "serverName": ext.status['serverName'],
                    "startedAt": ext.status['startedAt'],
                    "stoppedAt": ext.status['stoppedAt'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deletePostgresqlBackup: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'backups', args['name'])
        const ext = res.body as PostgresqlBackup
        return {
            metadata: getMetadata(ext.metadata),
            "cluster": ext.spec['cluster'],
            "target": ext.spec['target'],
            status: ext.status==undefined?null:{
                "azureCredentials": ext.status['azureCredentials'],
                "backupId": ext.status['backupId'],
                "backupName": ext.status['backupName'],
                "beginLSN": ext.status['beginLSN'],
                "beginWal": ext.status['beginWal'],
                "commandError": ext.status['commandError'],
                "commandOutput": ext.status['commandOutput'],
                "destinationPath": ext.status['destinationPath'],
                "encryption": ext.status['encryption'],
                "endLSN": ext.status['endLSN'],
                "endWal": ext.status['endWal'],
                "endpointCA": ext.status['endpointCA'],
                "endpointURL": ext.status['endpointURL'],
                "error": ext.status['error'],
                "googleCredentials": ext.status['googleCredentials'],
                "instanceID": ext.status['instanceID'],
                "phase": ext.status['phase'],
                "s3Credentials": ext.status['s3Credentials'],
                "serverName": ext.status['serverName'],
                "startedAt": ext.status['startedAt'],
                "stoppedAt": ext.status['stoppedAt'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
