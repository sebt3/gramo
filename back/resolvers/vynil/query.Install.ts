
import {kc, k8s, getMetadata} from '../core/libs.js';
import { VynilInstallList } from './type.Install.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const queries = {
    vynilInstalls: async (_parent, args: object) => {
        try {
          const res = await customApi.listNamespacedCustomObject('vynil.solidite.fr','v1',args['namespace'],'installs')
          const resList = res.body as VynilInstallList
          return resList.items.map((ext)=>{return{
            metadata: getMetadata(ext.metadata),
            auto_upgrade: ext.spec.auto_upgrade,
            categoryName: ext.spec.category,
            componentName: ext.spec.component,
            distribName: ext.spec.distrib,
            options: ext.spec.options,
            status: {
                commit_id: ext.status.commit_id,
                digest: ext.status.digest,
                errors: ext.status.errors,
                last_updated: ext.status.last_updated,
                plan: ext.status.plan,
                status: ext.status.status,
                tfstate: ext.status.tfstate,
            }
          }})
        } catch (err) {
          console.error(err);
        }
        return []
    },
};
