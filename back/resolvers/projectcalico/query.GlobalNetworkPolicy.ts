import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoGlobalNetworkPolicyList, ProjectcalicoGlobalNetworkPolicy } from './type.GlobalNetworkPolicy.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoGlobalNetworkPolicys: async () => {
        try {
            const res = await customApi.listClusterCustomObject('crd.projectcalico.org','v1','globalnetworkpolicies')
            const resList = res.body as ProjectcalicoGlobalNetworkPolicyList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                "applyOnForward": ext.spec['applyOnForward'],
                "doNotTrack": ext.spec['doNotTrack'],
                "egress": ext.spec['egress'],
                "ingress": ext.spec['ingress'],
                "namespaceSelector": ext.spec['namespaceSelector'],
                "order": ext.spec['order'],
                "preDNAT": ext.spec['preDNAT'],
                "selector": ext.spec['selector'],
                "serviceAccountSelector": ext.spec['serviceAccountSelector'],
                "types": ext.spec['types'],
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    projectcalicoGlobalNetworkPolicys: lists.projectcalicoGlobalNetworkPolicys,
    projectcalicoGlobalNetworkPolicy: async (_parent, args: object) => {
        try {
            const res = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','globalnetworkpolicies', args['name'])
            const ext = res.body as ProjectcalicoGlobalNetworkPolicy
            return {
                metadata: getMetadata(ext.metadata),
                "applyOnForward": ext.spec['applyOnForward'],
                "doNotTrack": ext.spec['doNotTrack'],
                "egress": ext.spec['egress'],
                "ingress": ext.spec['ingress'],
                "namespaceSelector": ext.spec['namespaceSelector'],
                "order": ext.spec['order'],
                "preDNAT": ext.spec['preDNAT'],
                "selector": ext.spec['selector'],
                "serviceAccountSelector": ext.spec['serviceAccountSelector'],
                "types": ext.spec['types'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
