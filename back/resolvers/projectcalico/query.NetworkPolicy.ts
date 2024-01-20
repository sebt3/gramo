import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoNetworkPolicyList, ProjectcalicoNetworkPolicy } from './type.NetworkPolicy.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    projectcalicoNetworkPolicys: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('crd.projectcalico.org','v1',args['namespace'],'networkpolicies')
            const resList = res.body as ProjectcalicoNetworkPolicyList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata, ext),
                "egress": ext.spec['egress'],
                "ingress": ext.spec['ingress'],
                "order": ext.spec['order'],
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
    projectcalicoNetworkPolicy: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('crd.projectcalico.org','v1',args['namespace'],'networkpolicies', args['name'])
            const ext = res.body as ProjectcalicoNetworkPolicy
            return {
                metadata: getMetadata(ext.metadata, ext),
                "egress": ext.spec['egress'],
                "ingress": ext.spec['ingress'],
                "order": ext.spec['order'],
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
