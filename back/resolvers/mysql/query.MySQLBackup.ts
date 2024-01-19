import {kc, k8s, getMetadata} from '../core/libs.js';
import { MysqlMySQLBackupList, MysqlMySQLBackup } from './type.MySQLBackup.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    mysqlMySQLBackups: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'mysqlbackups')
            const resList = res.body as MysqlMySQLBackupList
            return resList.items.map((ext)=>{return{
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
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    mysqlMySQLBackup: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('mysql.oracle.com','v2',args['namespace'],'mysqlbackups', args['name'])
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
