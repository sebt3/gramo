import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbUserList, MariadbUser } from './type.User.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    mariadbUsers: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'users')
            const resList = res.body as MariadbUserList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                host: ext.spec.host,
                mariaDbRef: ext.spec.mariaDbRef,
                maxUserConnections: ext.spec.maxUserConnections,
                name: ext.spec.name,
                passwordSecretKeyRef: ext.spec.passwordSecretKeyRef,
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
    mariadbUser: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'users', args['name'])
            const ext = res.body as MariadbUser
            return {
                metadata: getMetadata(ext.metadata),
                host: ext.spec.host,
                mariaDbRef: ext.spec.mariaDbRef,
                maxUserConnections: ext.spec.maxUserConnections,
                name: ext.spec.name,
                passwordSecretKeyRef: ext.spec.passwordSecretKeyRef,
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
