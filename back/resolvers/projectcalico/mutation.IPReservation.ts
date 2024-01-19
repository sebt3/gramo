import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoIPReservation } from './type.IPReservation.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoIPReservation: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['reservedCIDRs'] !== undefined && Array.isArray(args['spec']['reservedCIDRs'])) spec['reservedCIDRs'] = args['spec']['reservedCIDRs'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'IPReservation',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','ipreservations', payload)
            const ext = res.body as ProjectcalicoIPReservation
            return {
                metadata: getMetadata(ext.metadata),
                "reservedCIDRs": ext.spec['reservedCIDRs'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchProjectcalicoIPReservation: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['reservedCIDRs'] !== undefined && Array.isArray(args['spec']['reservedCIDRs'])) spec['reservedCIDRs'] = args['spec']['reservedCIDRs'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'IPReservation',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','ipreservations', args['name'])
            const extGet = resGet.body as ProjectcalicoIPReservation
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','ipreservations', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as ProjectcalicoIPReservation
            return {
                metadata: getMetadata(ext.metadata),
                "reservedCIDRs": ext.spec['reservedCIDRs'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteProjectcalicoIPReservation: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','ipreservations', args['name'])
        const ext = res.body as ProjectcalicoIPReservation
        return {
            metadata: getMetadata(ext.metadata),
            "reservedCIDRs": ext.spec['reservedCIDRs'],
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
