import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoNetworkPolicy } from './type.NetworkPolicy.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoNetworkPolicy: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['egress'] !== undefined && Array.isArray(args['spec']['egress'])) spec['egress'] = args['spec']['egress'];
        if (args['spec']['ingress'] !== undefined && Array.isArray(args['spec']['ingress'])) spec['ingress'] = args['spec']['ingress'];
        if (args['spec']['order'] !== undefined && typeof args['spec']['order'] == 'number') spec['order'] = args['spec']['order'];
        if (args['spec']['selector'] !== undefined && typeof args['spec']['selector'] == 'string') spec['selector'] = args['spec']['selector'];
        if (args['spec']['serviceAccountSelector'] !== undefined && typeof args['spec']['serviceAccountSelector'] == 'string') spec['serviceAccountSelector'] = args['spec']['serviceAccountSelector'];
        if (args['spec']['types'] !== undefined && Array.isArray(args['spec']['types'])) spec['types'] = args['spec']['types'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'NetworkPolicy',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('crd.projectcalico.org','v1',args['namespace'],'networkpolicies', payload)
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
    patchProjectcalicoNetworkPolicy: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['egress'] !== undefined && Array.isArray(args['spec']['egress'])) spec['egress'] = args['spec']['egress'];
        if (args['spec']['ingress'] !== undefined && Array.isArray(args['spec']['ingress'])) spec['ingress'] = args['spec']['ingress'];
        if (args['spec']['order'] !== undefined && typeof args['spec']['order'] == 'number') spec['order'] = args['spec']['order'];
        if (args['spec']['selector'] !== undefined && typeof args['spec']['selector'] == 'string') spec['selector'] = args['spec']['selector'];
        if (args['spec']['serviceAccountSelector'] !== undefined && typeof args['spec']['serviceAccountSelector'] == 'string') spec['serviceAccountSelector'] = args['spec']['serviceAccountSelector'];
        if (args['spec']['types'] !== undefined && Array.isArray(args['spec']['types'])) spec['types'] = args['spec']['types'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'NetworkPolicy',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('crd.projectcalico.org','v1',args['namespace'],'networkpolicies', args['name'])
            const extGet = resGet.body as ProjectcalicoNetworkPolicy
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('crd.projectcalico.org','v1',args['namespace'],'networkpolicies', args['name'], payload, undefined, undefined, undefined, options)
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
    deleteProjectcalicoNetworkPolicy: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('crd.projectcalico.org','v1',args['namespace'],'networkpolicies', args['name'])
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
