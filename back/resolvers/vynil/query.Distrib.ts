
import {kc, k8s, getMetadata} from '../core/libs.js';
import { VynilDistribList, VynilDistrib } from './type.Distrib.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const queries = {
vynilDistribs: async () => {
    try {
        const res = await customApi.listClusterCustomObject('vynil.solidite.fr','v1','distribs')
        const resList = res.body as VynilDistribList
        return resList.items.map((ext)=>{return{
            metadata: getMetadata(ext.metadata),
            branch: ext.spec.branch,
            insecure: ext.spec.insecure,
            login: ext.spec.login,
            schedule: ext.spec.schedule,
            url: ext.spec.url,
            status: ext.status==undefined?null:{
                components: ext.status.components,
                errors: ext.status.errors,
                last_updated: ext.status.last_updated,
            }
        }})
    } catch (err) {
        console.error(err);
    }
    return []
},
vynilDistrib: async (_parent, args: object) => {
    try {
        const res = await customApi.getClusterCustomObject('vynil.solidite.fr','v1','distribs', args['name'])
        const ext = res.body as VynilDistrib
        return {
            metadata: getMetadata(ext.metadata),
            branch: ext.spec.branch,
            insecure: ext.spec.insecure,
            login: ext.spec.login,
            schedule: ext.spec.schedule,
            url: ext.spec.url,
            status: ext.status==undefined?null:{
                components: ext.status.components,
                errors: ext.status.errors,
                last_updated: ext.status.last_updated,
            }
        }
    } catch (err) {
        console.error(err);
    }
    return null
},
};
