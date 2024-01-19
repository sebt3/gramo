import {kc, k8s, getMetadata} from '../core/libs.js';
import { MariadbRestoreList, MariadbRestore } from './type.Restore.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    mariadbRestores: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'restores')
            const resList = res.body as MariadbRestoreList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                "affinity": ext.spec['affinity'],
                "backoffLimit": ext.spec['backoffLimit'],
                "backupRef": ext.spec['backupRef'],
                "fileName": ext.spec['fileName'],
                "mariaDbRef": ext.spec['mariaDbRef'],
                "nodeSelector": ext.spec['nodeSelector'],
                "resources": ext.spec['resources'],
                "restartPolicy": ext.spec['restartPolicy'],
                "tolerations": ext.spec['tolerations'],
                "volume": ext.spec['volume'],
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
    mariadbRestore: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('mariadb.mmontes.io','v1alpha1',args['namespace'],'restores', args['name'])
            const ext = res.body as MariadbRestore
            return {
                metadata: getMetadata(ext.metadata),
                "affinity": ext.spec['affinity'],
                "backoffLimit": ext.spec['backoffLimit'],
                "backupRef": ext.spec['backupRef'],
                "fileName": ext.spec['fileName'],
                "mariaDbRef": ext.spec['mariaDbRef'],
                "nodeSelector": ext.spec['nodeSelector'],
                "resources": ext.spec['resources'],
                "restartPolicy": ext.spec['restartPolicy'],
                "tolerations": ext.spec['tolerations'],
                "volume": ext.spec['volume'],
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
