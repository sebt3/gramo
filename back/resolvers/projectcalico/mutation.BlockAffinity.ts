import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoBlockAffinity } from './type.BlockAffinity.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoBlockAffinity: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        spec['cidr'] = args['spec']['cidr'];
        spec['deleted'] = args['spec']['deleted'];
        spec['node'] = args['spec']['node'];
        spec['state'] = args['spec']['state'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'BlockAffinity',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','blockaffinities', payload)
            const ext = res.body as ProjectcalicoBlockAffinity
            return {
                metadata: getMetadata(ext.metadata),
                "cidr": ext.spec['cidr'],
                "deleted": ext.spec['deleted'],
                "node": ext.spec['node'],
                "state": ext.spec['state'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchProjectcalicoBlockAffinity: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        spec['cidr'] = args['spec']['cidr'];
        spec['deleted'] = args['spec']['deleted'];
        spec['node'] = args['spec']['node'];
        spec['state'] = args['spec']['state'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'BlockAffinity',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','blockaffinities', args['name'])
            const extGet = resGet.body as ProjectcalicoBlockAffinity
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','blockaffinities', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as ProjectcalicoBlockAffinity
            return {
                metadata: getMetadata(ext.metadata),
                "cidr": ext.spec['cidr'],
                "deleted": ext.spec['deleted'],
                "node": ext.spec['node'],
                "state": ext.spec['state'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteProjectcalicoBlockAffinity: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','blockaffinities', args['name'])
        const ext = res.body as ProjectcalicoBlockAffinity
        return {
            metadata: getMetadata(ext.metadata),
            "cidr": ext.spec['cidr'],
            "deleted": ext.spec['deleted'],
            "node": ext.spec['node'],
            "state": ext.spec['state'],
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
