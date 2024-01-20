import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoIPAMHandle } from './type.IPAMHandle.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoIPAMHandle: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        spec['block'] = args['spec']['block'];
        if (args['spec']['deleted'] !== undefined && typeof args['spec']['deleted'] == 'boolean') spec['deleted'] = args['spec']['deleted'];
        spec['handleID'] = args['spec']['handleID'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'IPAMHandle',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','ipamhandles', payload)
            const ext = res.body as ProjectcalicoIPAMHandle
            return {
                metadata: getMetadata(ext.metadata, ext),
                "block": ext.spec['block'],
                "deleted": ext.spec['deleted'],
                "handleID": ext.spec['handleID'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchProjectcalicoIPAMHandle: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        spec['block'] = args['spec']['block'];
        if (args['spec']['deleted'] !== undefined && typeof args['spec']['deleted'] == 'boolean') spec['deleted'] = args['spec']['deleted'];
        spec['handleID'] = args['spec']['handleID'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'IPAMHandle',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','ipamhandles', args['name'])
            const extGet = resGet.body as ProjectcalicoIPAMHandle
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','ipamhandles', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as ProjectcalicoIPAMHandle
            return {
                metadata: getMetadata(ext.metadata, ext),
                "block": ext.spec['block'],
                "deleted": ext.spec['deleted'],
                "handleID": ext.spec['handleID'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteProjectcalicoIPAMHandle: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','ipamhandles', args['name'])
        const ext = res.body as ProjectcalicoIPAMHandle
        return {
            metadata: getMetadata(ext.metadata, ext),
            "block": ext.spec['block'],
            "deleted": ext.spec['deleted'],
            "handleID": ext.spec['handleID'],
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
