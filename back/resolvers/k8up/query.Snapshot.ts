import {kc, k8s, getMetadata} from '../core/libs.js';
import { K8upSnapshotList, K8upSnapshot } from './type.Snapshot.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    k8upSnapshots: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('k8up.io','v1',args['namespace'],'snapshots')
            const resList = res.body as K8upSnapshotList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                date: ext.spec.date,
                id: ext.spec.id,
                paths: ext.spec.paths,
                repository: ext.spec.repository,
                status: ext.status==undefined?null:{
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    k8upSnapshot: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('k8up.io','v1',args['namespace'],'snapshots', args['name'])
            const ext = res.body as K8upSnapshot
            return {
                metadata: getMetadata(ext.metadata),
                date: ext.spec.date,
                id: ext.spec.id,
                paths: ext.spec.paths,
                repository: ext.spec.repository,
                status: ext.status==undefined?null:{
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
