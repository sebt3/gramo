import {kc, k8s, getMetadata} from '../core/libs.js';
import { VynilInstallList, VynilInstall } from './type.Install.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    vynilInstalls: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('vynil.solidite.fr','v1',args['namespace'],'installs')
            const resList = res.body as VynilInstallList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                auto_upgrade: ext.spec.auto_upgrade,
                category: ext.spec.category,
                component: ext.spec.component,
                distrib: ext.spec.distrib,
                options: ext.spec.options,
                status: ext.status==undefined?null:{
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
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    vynilInstall: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('vynil.solidite.fr','v1',args['namespace'],'installs', args['name'])
            const ext = res.body as VynilInstall
            return {
                metadata: getMetadata(ext.metadata),
                auto_upgrade: ext.spec.auto_upgrade,
                category: ext.spec.category,
                component: ext.spec.component,
                distrib: ext.spec.distrib,
                options: ext.spec.options,
                status: ext.status==undefined?null:{
                    commit_id: ext.status.commit_id,
                    digest: ext.status.digest,
                    errors: ext.status.errors,
                    last_updated: ext.status.last_updated,
                    plan: ext.status.plan,
                    status: ext.status.status,
                    tfstate: ext.status.tfstate,
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
