import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbConnectionList, MariadbConnection } from './type.Connection.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    mariadbConnections: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'connections')
            const resList = res.body as MariadbConnectionList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                database: ext.spec.database,
                healthCheck: ext.spec.healthCheck,
                mariaDbRef: ext.spec.mariaDbRef,
                params: ext.spec.params,
                passwordSecretKeyRef: ext.spec.passwordSecretKeyRef,
                secretName: ext.spec.secretName,
                secretTemplate: ext.spec.secretTemplate,
                serviceName: ext.spec.serviceName,
                username: ext.spec.username,
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
    mariadbConnection: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'connections', args['name'])
            const ext = res.body as MariadbConnection
            return {
                metadata: getMetadata(ext.metadata),
                database: ext.spec.database,
                healthCheck: ext.spec.healthCheck,
                mariaDbRef: ext.spec.mariaDbRef,
                params: ext.spec.params,
                passwordSecretKeyRef: ext.spec.passwordSecretKeyRef,
                secretName: ext.spec.secretName,
                secretTemplate: ext.spec.secretTemplate,
                serviceName: ext.spec.serviceName,
                username: ext.spec.username,
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
