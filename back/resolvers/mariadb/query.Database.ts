import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbDatabaseList, MariadbDatabase } from './type.Database.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    mariadbDatabases: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'databases')
            const resList = res.body as MariadbDatabaseList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                characterSet: ext.spec.characterSet,
                collate: ext.spec.collate,
                mariaDbRef: ext.spec.mariaDbRef,
                name: ext.spec.name,
                retryInterval: ext.spec.retryInterval,
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
    mariadbDatabase: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'databases', args['name'])
            const ext = res.body as MariadbDatabase
            return {
                metadata: getMetadata(ext.metadata),
                characterSet: ext.spec.characterSet,
                collate: ext.spec.collate,
                mariaDbRef: ext.spec.mariaDbRef,
                name: ext.spec.name,
                retryInterval: ext.spec.retryInterval,
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
