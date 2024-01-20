import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoCalicoNodeStatusList, ProjectcalicoCalicoNodeStatus } from './type.CalicoNodeStatus.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoCalicoNodeStatuss: async () => {
        try {
            const res = await customApi.listClusterCustomObject('crd.projectcalico.org','v1','caliconodestatuses')
            const resList = res.body as ProjectcalicoCalicoNodeStatusList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "classes": ext.spec['classes'],
                "node": ext.spec['node'],
                "updatePeriodSeconds": ext.spec['updatePeriodSeconds'],
                status: ext.status==undefined?null:{
                    "agent": ext.status['agent'],
                    "bgp": ext.status['bgp'],
                    "lastUpdated": ext.status['lastUpdated'],
                    "routes": ext.status['routes'],
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    projectcalicoCalicoNodeStatuss: lists.projectcalicoCalicoNodeStatuss,
    projectcalicoCalicoNodeStatus: async (_parent, args: object) => {
        try {
            const res = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','caliconodestatuses', args['name'])
            const ext = res.body as ProjectcalicoCalicoNodeStatus
            return {
                metadata: getMetadata(ext.metadata, ext),
                "classes": ext.spec['classes'],
                "node": ext.spec['node'],
                "updatePeriodSeconds": ext.spec['updatePeriodSeconds'],
                status: ext.status==undefined?null:{
                    "agent": ext.status['agent'],
                    "bgp": ext.status['bgp'],
                    "lastUpdated": ext.status['lastUpdated'],
                    "routes": ext.status['routes'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
