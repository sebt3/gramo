import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoClusterInformation } from './type.ClusterInformation.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoClusterInformation: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['calicoVersion'] !== undefined && typeof args['spec']['calicoVersion'] == 'string') spec['calicoVersion'] = args['spec']['calicoVersion'];
        if (args['spec']['clusterGUID'] !== undefined && typeof args['spec']['clusterGUID'] == 'string') spec['clusterGUID'] = args['spec']['clusterGUID'];
        if (args['spec']['clusterType'] !== undefined && typeof args['spec']['clusterType'] == 'string') spec['clusterType'] = args['spec']['clusterType'];
        if (args['spec']['datastoreReady'] !== undefined && typeof args['spec']['datastoreReady'] == 'boolean') spec['datastoreReady'] = args['spec']['datastoreReady'];
        if (args['spec']['variant'] !== undefined && typeof args['spec']['variant'] == 'string') spec['variant'] = args['spec']['variant'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'ClusterInformation',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','clusterinformations', payload)
            const ext = res.body as ProjectcalicoClusterInformation
            return {
                metadata: getMetadata(ext.metadata),
                "calicoVersion": ext.spec['calicoVersion'],
                "clusterGUID": ext.spec['clusterGUID'],
                "clusterType": ext.spec['clusterType'],
                "datastoreReady": ext.spec['datastoreReady'],
                "variant": ext.spec['variant'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchProjectcalicoClusterInformation: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['calicoVersion'] !== undefined && typeof args['spec']['calicoVersion'] == 'string') spec['calicoVersion'] = args['spec']['calicoVersion'];
        if (args['spec']['clusterGUID'] !== undefined && typeof args['spec']['clusterGUID'] == 'string') spec['clusterGUID'] = args['spec']['clusterGUID'];
        if (args['spec']['clusterType'] !== undefined && typeof args['spec']['clusterType'] == 'string') spec['clusterType'] = args['spec']['clusterType'];
        if (args['spec']['datastoreReady'] !== undefined && typeof args['spec']['datastoreReady'] == 'boolean') spec['datastoreReady'] = args['spec']['datastoreReady'];
        if (args['spec']['variant'] !== undefined && typeof args['spec']['variant'] == 'string') spec['variant'] = args['spec']['variant'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'ClusterInformation',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','clusterinformations', args['name'])
            const extGet = resGet.body as ProjectcalicoClusterInformation
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','clusterinformations', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as ProjectcalicoClusterInformation
            return {
                metadata: getMetadata(ext.metadata),
                "calicoVersion": ext.spec['calicoVersion'],
                "clusterGUID": ext.spec['clusterGUID'],
                "clusterType": ext.spec['clusterType'],
                "datastoreReady": ext.spec['datastoreReady'],
                "variant": ext.spec['variant'],
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteProjectcalicoClusterInformation: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','clusterinformations', args['name'])
        const ext = res.body as ProjectcalicoClusterInformation
        return {
            metadata: getMetadata(ext.metadata),
            "calicoVersion": ext.spec['calicoVersion'],
            "clusterGUID": ext.spec['clusterGUID'],
            "clusterType": ext.spec['clusterType'],
            "datastoreReady": ext.spec['datastoreReady'],
            "variant": ext.spec['variant'],
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
