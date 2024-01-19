import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoIPPool } from './type.IPPool.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoIPPool: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['allowedUses'] !== undefined && Array.isArray(args['spec']['allowedUses'])) spec['allowedUses'] = args['spec']['allowedUses'];
        if (args['spec']['blockSize'] !== undefined && typeof args['spec']['blockSize'] == 'number') spec['blockSize'] = args['spec']['blockSize'];
        spec['cidr'] = args['spec']['cidr'];
        if (args['spec']['disableBGPExport'] !== undefined && typeof args['spec']['disableBGPExport'] == 'boolean') spec['disableBGPExport'] = args['spec']['disableBGPExport'];
        if (args['spec']['disabled'] !== undefined && typeof args['spec']['disabled'] == 'boolean') spec['disabled'] = args['spec']['disabled'];
        if (args['spec']['ipip'] !== undefined && typeof args['spec']['ipip'] == 'object') spec['ipip'] = args['spec']['ipip'];
        if (args['spec']['ipipMode'] !== undefined && typeof args['spec']['ipipMode'] == 'string') spec['ipipMode'] = args['spec']['ipipMode'];
        if (args['spec']['nat-outgoing'] !== undefined && typeof args['spec']['nat-outgoing'] == 'boolean') spec['nat-outgoing'] = args['spec']['nat-outgoing'];
        if (args['spec']['natOutgoing'] !== undefined && typeof args['spec']['natOutgoing'] == 'boolean') spec['natOutgoing'] = args['spec']['natOutgoing'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'string') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['vxlanMode'] !== undefined && typeof args['spec']['vxlanMode'] == 'string') spec['vxlanMode'] = args['spec']['vxlanMode'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'IPPool',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','ippools', payload)
            const ext = res.body as ProjectcalicoIPPool
            return {
                metadata: getMetadata(ext.metadata),
                "allowedUses": ext.spec['allowedUses'],
                "blockSize": ext.spec['blockSize'],
                "cidr": ext.spec['cidr'],
                "disableBGPExport": ext.spec['disableBGPExport'],
                "disabled": ext.spec['disabled'],
                "ipip": ext.spec['ipip'],
                "ipipMode": ext.spec['ipipMode'],
                "nat-outgoing": ext.spec['nat-outgoing'],
                "natOutgoing": ext.spec['natOutgoing'],
                "nodeSelector": ext.spec['nodeSelector'],
                "vxlanMode": ext.spec['vxlanMode'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchProjectcalicoIPPool: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['allowedUses'] !== undefined && Array.isArray(args['spec']['allowedUses'])) spec['allowedUses'] = args['spec']['allowedUses'];
        if (args['spec']['blockSize'] !== undefined && typeof args['spec']['blockSize'] == 'number') spec['blockSize'] = args['spec']['blockSize'];
        spec['cidr'] = args['spec']['cidr'];
        if (args['spec']['disableBGPExport'] !== undefined && typeof args['spec']['disableBGPExport'] == 'boolean') spec['disableBGPExport'] = args['spec']['disableBGPExport'];
        if (args['spec']['disabled'] !== undefined && typeof args['spec']['disabled'] == 'boolean') spec['disabled'] = args['spec']['disabled'];
        if (args['spec']['ipip'] !== undefined && typeof args['spec']['ipip'] == 'object') spec['ipip'] = args['spec']['ipip'];
        if (args['spec']['ipipMode'] !== undefined && typeof args['spec']['ipipMode'] == 'string') spec['ipipMode'] = args['spec']['ipipMode'];
        if (args['spec']['nat-outgoing'] !== undefined && typeof args['spec']['nat-outgoing'] == 'boolean') spec['nat-outgoing'] = args['spec']['nat-outgoing'];
        if (args['spec']['natOutgoing'] !== undefined && typeof args['spec']['natOutgoing'] == 'boolean') spec['natOutgoing'] = args['spec']['natOutgoing'];
        if (args['spec']['nodeSelector'] !== undefined && typeof args['spec']['nodeSelector'] == 'string') spec['nodeSelector'] = args['spec']['nodeSelector'];
        if (args['spec']['vxlanMode'] !== undefined && typeof args['spec']['vxlanMode'] == 'string') spec['vxlanMode'] = args['spec']['vxlanMode'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'IPPool',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','ippools', args['name'])
            const extGet = resGet.body as ProjectcalicoIPPool
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','ippools', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as ProjectcalicoIPPool
            return {
                metadata: getMetadata(ext.metadata),
                "allowedUses": ext.spec['allowedUses'],
                "blockSize": ext.spec['blockSize'],
                "cidr": ext.spec['cidr'],
                "disableBGPExport": ext.spec['disableBGPExport'],
                "disabled": ext.spec['disabled'],
                "ipip": ext.spec['ipip'],
                "ipipMode": ext.spec['ipipMode'],
                "nat-outgoing": ext.spec['nat-outgoing'],
                "natOutgoing": ext.spec['natOutgoing'],
                "nodeSelector": ext.spec['nodeSelector'],
                "vxlanMode": ext.spec['vxlanMode'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteProjectcalicoIPPool: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','ippools', args['name'])
        const ext = res.body as ProjectcalicoIPPool
        return {
            metadata: getMetadata(ext.metadata),
            "allowedUses": ext.spec['allowedUses'],
            "blockSize": ext.spec['blockSize'],
            "cidr": ext.spec['cidr'],
            "disableBGPExport": ext.spec['disableBGPExport'],
            "disabled": ext.spec['disabled'],
            "ipip": ext.spec['ipip'],
            "ipipMode": ext.spec['ipipMode'],
            "nat-outgoing": ext.spec['nat-outgoing'],
            "natOutgoing": ext.spec['natOutgoing'],
            "nodeSelector": ext.spec['nodeSelector'],
            "vxlanMode": ext.spec['vxlanMode'],
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
