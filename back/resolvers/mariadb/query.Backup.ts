import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbBackupList, MariadbBackup } from './type.Backup.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    mariadbBackups: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'backups')
            const resList = res.body as MariadbBackupList
            return resList.items.map((ext)=>{return{
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
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    mariadbBackup: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'backups', args['name'])
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
