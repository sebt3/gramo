import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoIPAMBlock } from './type.IPAMBlock.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoIPAMBlock: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'string') spec['affinity'] = args['spec']['affinity'];
        spec['allocations'] = args['spec']['allocations'];
        spec['attributes'] = args['spec']['attributes'];
        spec['cidr'] = args['spec']['cidr'];
        if (args['spec']['deleted'] !== undefined && typeof args['spec']['deleted'] == 'boolean') spec['deleted'] = args['spec']['deleted'];
        if (args['spec']['sequenceNumber'] !== undefined && typeof args['spec']['sequenceNumber'] == 'number') spec['sequenceNumber'] = args['spec']['sequenceNumber'];
        if (args['spec']['sequenceNumberForAllocation'] !== undefined && typeof args['spec']['sequenceNumberForAllocation'] == 'object') spec['sequenceNumberForAllocation'] = args['spec']['sequenceNumberForAllocation'];
        spec['strictAffinity'] = args['spec']['strictAffinity'];
        spec['unallocated'] = args['spec']['unallocated'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'IPAMBlock',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','ipamblocks', payload)
            const ext = res.body as ProjectcalicoIPAMBlock
            return {
                metadata: getMetadata(ext.metadata),
                "affinity": ext.spec['affinity'],
                "allocations": ext.spec['allocations'],
                "attributes": ext.spec['attributes'],
                "cidr": ext.spec['cidr'],
                "deleted": ext.spec['deleted'],
                "sequenceNumber": ext.spec['sequenceNumber'],
                "sequenceNumberForAllocation": ext.spec['sequenceNumberForAllocation'],
                "strictAffinity": ext.spec['strictAffinity'],
                "unallocated": ext.spec['unallocated'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchProjectcalicoIPAMBlock: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['affinity'] !== undefined && typeof args['spec']['affinity'] == 'string') spec['affinity'] = args['spec']['affinity'];
        spec['allocations'] = args['spec']['allocations'];
        spec['attributes'] = args['spec']['attributes'];
        spec['cidr'] = args['spec']['cidr'];
        if (args['spec']['deleted'] !== undefined && typeof args['spec']['deleted'] == 'boolean') spec['deleted'] = args['spec']['deleted'];
        if (args['spec']['sequenceNumber'] !== undefined && typeof args['spec']['sequenceNumber'] == 'number') spec['sequenceNumber'] = args['spec']['sequenceNumber'];
        if (args['spec']['sequenceNumberForAllocation'] !== undefined && typeof args['spec']['sequenceNumberForAllocation'] == 'object') spec['sequenceNumberForAllocation'] = args['spec']['sequenceNumberForAllocation'];
        spec['strictAffinity'] = args['spec']['strictAffinity'];
        spec['unallocated'] = args['spec']['unallocated'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'IPAMBlock',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','ipamblocks', args['name'])
            const extGet = resGet.body as ProjectcalicoIPAMBlock
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','ipamblocks', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as ProjectcalicoIPAMBlock
            return {
                metadata: getMetadata(ext.metadata),
                "affinity": ext.spec['affinity'],
                "allocations": ext.spec['allocations'],
                "attributes": ext.spec['attributes'],
                "cidr": ext.spec['cidr'],
                "deleted": ext.spec['deleted'],
                "sequenceNumber": ext.spec['sequenceNumber'],
                "sequenceNumberForAllocation": ext.spec['sequenceNumberForAllocation'],
                "strictAffinity": ext.spec['strictAffinity'],
                "unallocated": ext.spec['unallocated'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteProjectcalicoIPAMBlock: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','ipamblocks', args['name'])
        const ext = res.body as ProjectcalicoIPAMBlock
        return {
            metadata: getMetadata(ext.metadata),
            "affinity": ext.spec['affinity'],
            "allocations": ext.spec['allocations'],
            "attributes": ext.spec['attributes'],
            "cidr": ext.spec['cidr'],
            "deleted": ext.spec['deleted'],
            "sequenceNumber": ext.spec['sequenceNumber'],
            "sequenceNumberForAllocation": ext.spec['sequenceNumberForAllocation'],
            "strictAffinity": ext.spec['strictAffinity'],
            "unallocated": ext.spec['unallocated'],
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
