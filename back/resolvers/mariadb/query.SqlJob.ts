import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbSqlJobList, MariadbSqlJob } from './type.SqlJob.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    mariadbSqlJobs: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'sqljobs')
            const resList = res.body as MariadbSqlJobList
            return resList.items.map((ext)=>{return{
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
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    mariadbSqlJob: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'sqljobs', args['name'])
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
