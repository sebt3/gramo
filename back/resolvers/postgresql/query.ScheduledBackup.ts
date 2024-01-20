import {kc, k8s, getMetadata} from '../core/libs.js';
import { PostgresqlScheduledBackupList, PostgresqlScheduledBackup } from './type.ScheduledBackup.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    postgresqlScheduledBackups: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'scheduledbackups')
            const resList = res.body as PostgresqlScheduledBackupList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
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
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    postgresqlScheduledBackup: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('postgresql.cnpg.io','v1',args['namespace'],'scheduledbackups', args['name'])
            const ext = res.body as PostgresqlScheduledBackup
            return {
                metadata: getMetadata(ext.metadata, ext),
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
