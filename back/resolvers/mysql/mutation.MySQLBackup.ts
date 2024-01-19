import {kc, k8s, getMetadata} from '../core/libs.js';
import { MysqlMySQLBackup } from './type.MySQLBackup.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createMysqlMySQLBackup: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['addTimestampToBackupDirectory'] !== undefined && typeof args['spec']['addTimestampToBackupDirectory'] == 'boolean') spec['addTimestampToBackupDirectory'] = args['spec']['addTimestampToBackupDirectory'];
        if (args['spec']['backupProfile'] !== undefined) spec['backupProfile'] = args['spec']['backupProfile'];
        if (args['spec']['backupProfileName'] !== undefined && typeof args['spec']['backupProfileName'] == 'string') spec['backupProfileName'] = args['spec']['backupProfileName'];
        spec['clusterName'] = args['spec']['clusterName'];
        if (args['spec']['deleteBackupData'] !== undefined && typeof args['spec']['deleteBackupData'] == 'boolean') spec['deleteBackupData'] = args['spec']['deleteBackupData'];
        const payload = {
            apiVersion: 'mysql.oracle.com/v2',
            kind: 'MySQLBackup',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'mysqlbackups', payload)
            const ext = res.body as MysqlMySQLBackup
            return {
                metadata: getMetadata(ext.metadata),
                "addTimestampToBackupDirectory": ext.spec['addTimestampToBackupDirectory'],
                "backupProfile": ext.spec['backupProfile'],
                "backupProfileName": ext.spec['backupProfileName'],
                "clusterName": ext.spec['clusterName'],
                "deleteBackupData": ext.spec['deleteBackupData'],
                status: ext.status==undefined?null:{
                    "bucket": ext.status['bucket'],
                    "completionTime": ext.status['completionTime'],
                    "container": ext.status['container'],
                    "elapsedTime": ext.status['elapsedTime'],
                    "message": ext.status['message'],
                    "method": ext.status['method'],
                    "ociTenancy": ext.status['ociTenancy'],
                    "output": ext.status['output'],
                    "size": ext.status['size'],
                    "source": ext.status['source'],
                    "spaceAvailable": ext.status['spaceAvailable'],
                    "startTime": ext.status['startTime'],
                    "status": ext.status['status'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchMysqlMySQLBackup: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['addTimestampToBackupDirectory'] !== undefined && typeof args['spec']['addTimestampToBackupDirectory'] == 'boolean') spec['addTimestampToBackupDirectory'] = args['spec']['addTimestampToBackupDirectory'];
        if (args['spec']['backupProfile'] !== undefined) spec['backupProfile'] = args['spec']['backupProfile'];
        if (args['spec']['backupProfileName'] !== undefined && typeof args['spec']['backupProfileName'] == 'string') spec['backupProfileName'] = args['spec']['backupProfileName'];
        spec['clusterName'] = args['spec']['clusterName'];
        if (args['spec']['deleteBackupData'] !== undefined && typeof args['spec']['deleteBackupData'] == 'boolean') spec['deleteBackupData'] = args['spec']['deleteBackupData'];
        const request = {
            apiVersion: 'mysql.oracle.com/v2',
            kind: 'MySQLBackup',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'mysqlbackups', args['name'])
            const extGet = resGet.body as MysqlMySQLBackup
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'mysqlbackups', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as MysqlMySQLBackup
            return {
                metadata: getMetadata(ext.metadata),
                "addTimestampToBackupDirectory": ext.spec['addTimestampToBackupDirectory'],
                "backupProfile": ext.spec['backupProfile'],
                "backupProfileName": ext.spec['backupProfileName'],
                "clusterName": ext.spec['clusterName'],
                "deleteBackupData": ext.spec['deleteBackupData'],
                status: ext.status==undefined?null:{
                    "bucket": ext.status['bucket'],
                    "completionTime": ext.status['completionTime'],
                    "container": ext.status['container'],
                    "elapsedTime": ext.status['elapsedTime'],
                    "message": ext.status['message'],
                    "method": ext.status['method'],
                    "ociTenancy": ext.status['ociTenancy'],
                    "output": ext.status['output'],
                    "size": ext.status['size'],
                    "source": ext.status['source'],
                    "spaceAvailable": ext.status['spaceAvailable'],
                    "startTime": ext.status['startTime'],
                    "status": ext.status['status'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteMysqlMySQLBackup: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'mysqlbackups', args['name'])
        const ext = res.body as MysqlMySQLBackup
        return {
            metadata: getMetadata(ext.metadata),
            "addTimestampToBackupDirectory": ext.spec['addTimestampToBackupDirectory'],
            "backupProfile": ext.spec['backupProfile'],
            "backupProfileName": ext.spec['backupProfileName'],
            "clusterName": ext.spec['clusterName'],
            "deleteBackupData": ext.spec['deleteBackupData'],
            status: ext.status==undefined?null:{
                "bucket": ext.status['bucket'],
                "completionTime": ext.status['completionTime'],
                "container": ext.status['container'],
                "elapsedTime": ext.status['elapsedTime'],
                "message": ext.status['message'],
                "method": ext.status['method'],
                "ociTenancy": ext.status['ociTenancy'],
                "output": ext.status['output'],
                "size": ext.status['size'],
                "source": ext.status['source'],
                "spaceAvailable": ext.status['spaceAvailable'],
                "startTime": ext.status['startTime'],
                "status": ext.status['status'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
