import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbGrantList, MariadbGrant } from './type.Grant.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    mariadbGrants: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'grants')
            const resList = res.body as MariadbGrantList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "database": ext.spec['database'],
                "grantOption": ext.spec['grantOption'],
                "host": ext.spec['host'],
                "mariaDbRef": ext.spec['mariaDbRef'],
                "privileges": ext.spec['privileges'],
                "retryInterval": ext.spec['retryInterval'],
                "table": ext.spec['table'],
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
    mariadbGrant: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'grants', args['name'])
            const ext = res.body as MariadbGrant
            return {
                metadata: getMetadata(ext.metadata, ext),
                "database": ext.spec['database'],
                "grantOption": ext.spec['grantOption'],
                "host": ext.spec['host'],
                "mariaDbRef": ext.spec['mariaDbRef'],
                "privileges": ext.spec['privileges'],
                "retryInterval": ext.spec['retryInterval'],
                "table": ext.spec['table'],
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
