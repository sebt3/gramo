import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoGlobalNetworkPolicy } from './type.GlobalNetworkPolicy.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoGlobalNetworkPolicy: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['applyOnForward'] !== undefined && typeof args['spec']['applyOnForward'] == 'boolean') spec['applyOnForward'] = args['spec']['applyOnForward'];
        if (args['spec']['doNotTrack'] !== undefined && typeof args['spec']['doNotTrack'] == 'boolean') spec['doNotTrack'] = args['spec']['doNotTrack'];
        if (args['spec']['egress'] !== undefined && Array.isArray(args['spec']['egress'])) spec['egress'] = args['spec']['egress'];
        if (args['spec']['ingress'] !== undefined && Array.isArray(args['spec']['ingress'])) spec['ingress'] = args['spec']['ingress'];
        if (args['spec']['namespaceSelector'] !== undefined && typeof args['spec']['namespaceSelector'] == 'string') spec['namespaceSelector'] = args['spec']['namespaceSelector'];
        if (args['spec']['order'] !== undefined && typeof args['spec']['order'] == 'number') spec['order'] = args['spec']['order'];
        if (args['spec']['preDNAT'] !== undefined && typeof args['spec']['preDNAT'] == 'boolean') spec['preDNAT'] = args['spec']['preDNAT'];
        if (args['spec']['selector'] !== undefined && typeof args['spec']['selector'] == 'string') spec['selector'] = args['spec']['selector'];
        if (args['spec']['serviceAccountSelector'] !== undefined && typeof args['spec']['serviceAccountSelector'] == 'string') spec['serviceAccountSelector'] = args['spec']['serviceAccountSelector'];
        if (args['spec']['types'] !== undefined && Array.isArray(args['spec']['types'])) spec['types'] = args['spec']['types'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'GlobalNetworkPolicy',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','globalnetworkpolicies', payload)
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
    patchProjectcalicoGlobalNetworkPolicy: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['applyOnForward'] !== undefined && typeof args['spec']['applyOnForward'] == 'boolean') spec['applyOnForward'] = args['spec']['applyOnForward'];
        if (args['spec']['doNotTrack'] !== undefined && typeof args['spec']['doNotTrack'] == 'boolean') spec['doNotTrack'] = args['spec']['doNotTrack'];
        if (args['spec']['egress'] !== undefined && Array.isArray(args['spec']['egress'])) spec['egress'] = args['spec']['egress'];
        if (args['spec']['ingress'] !== undefined && Array.isArray(args['spec']['ingress'])) spec['ingress'] = args['spec']['ingress'];
        if (args['spec']['namespaceSelector'] !== undefined && typeof args['spec']['namespaceSelector'] == 'string') spec['namespaceSelector'] = args['spec']['namespaceSelector'];
        if (args['spec']['order'] !== undefined && typeof args['spec']['order'] == 'number') spec['order'] = args['spec']['order'];
        if (args['spec']['preDNAT'] !== undefined && typeof args['spec']['preDNAT'] == 'boolean') spec['preDNAT'] = args['spec']['preDNAT'];
        if (args['spec']['selector'] !== undefined && typeof args['spec']['selector'] == 'string') spec['selector'] = args['spec']['selector'];
        if (args['spec']['serviceAccountSelector'] !== undefined && typeof args['spec']['serviceAccountSelector'] == 'string') spec['serviceAccountSelector'] = args['spec']['serviceAccountSelector'];
        if (args['spec']['types'] !== undefined && Array.isArray(args['spec']['types'])) spec['types'] = args['spec']['types'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'GlobalNetworkPolicy',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','globalnetworkpolicies', args['name'])
            const extGet = resGet.body as ProjectcalicoGlobalNetworkPolicy
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','globalnetworkpolicies', args['name'], payload, undefined, undefined, undefined, options)
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
    deleteProjectcalicoGlobalNetworkPolicy: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','globalnetworkpolicies', args['name'])
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
