import {kc, k8s, getMetadata} from '../core/libs.js';
import { PostgresqlBackupList, PostgresqlBackup } from './type.Backup.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    postgresqlBackups: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'backups')
            const resList = res.body as PostgresqlBackupList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                cluster: ext.spec.cluster,
                target: ext.spec.target,
                status: ext.status==undefined?null:{
                    azureCredentials: ext.status.azureCredentials,
                    backupId: ext.status.backupId,
                    backupName: ext.status.backupName,
                    beginLSN: ext.status.beginLSN,
                    beginWal: ext.status.beginWal,
                    commandError: ext.status.commandError,
                    commandOutput: ext.status.commandOutput,
                    destinationPath: ext.status.destinationPath,
                    encryption: ext.status.encryption,
                    endLSN: ext.status.endLSN,
                    endWal: ext.status.endWal,
                    endpointCA: ext.status.endpointCA,
                    endpointURL: ext.status.endpointURL,
                    error: ext.status.error,
                    googleCredentials: ext.status.googleCredentials,
                    instanceID: ext.status.instanceID,
                    phase: ext.status.phase,
                    s3Credentials: ext.status.s3Credentials,
                    serverName: ext.status.serverName,
                    startedAt: ext.status.startedAt,
                    stoppedAt: ext.status.stoppedAt,
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    postgresqlBackup: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'backups', args['name'])
            const ext = res.body as PostgresqlBackup
            return {
                metadata: getMetadata(ext.metadata),
                cluster: ext.spec.cluster,
                target: ext.spec.target,
                status: ext.status==undefined?null:{
                    azureCredentials: ext.status.azureCredentials,
                    backupId: ext.status.backupId,
                    backupName: ext.status.backupName,
                    beginLSN: ext.status.beginLSN,
                    beginWal: ext.status.beginWal,
                    commandError: ext.status.commandError,
                    commandOutput: ext.status.commandOutput,
                    destinationPath: ext.status.destinationPath,
                    encryption: ext.status.encryption,
                    endLSN: ext.status.endLSN,
                    endWal: ext.status.endWal,
                    endpointCA: ext.status.endpointCA,
                    endpointURL: ext.status.endpointURL,
                    error: ext.status.error,
                    googleCredentials: ext.status.googleCredentials,
                    instanceID: ext.status.instanceID,
                    phase: ext.status.phase,
                    s3Credentials: ext.status.s3Credentials,
                    serverName: ext.status.serverName,
                    startedAt: ext.status.startedAt,
                    stoppedAt: ext.status.stoppedAt,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
