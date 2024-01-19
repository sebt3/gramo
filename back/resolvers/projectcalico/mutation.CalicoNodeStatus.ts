import {kc, k8s, getMetadata} from '../core/libs.js';
import { ProjectcalicoCalicoNodeStatus } from './type.CalicoNodeStatus.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createProjectcalicoCalicoNodeStatus: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['classes'] !== undefined && Array.isArray(args['spec']['classes'])) spec['classes'] = args['spec']['classes'];
        if (args['spec']['node'] !== undefined && typeof args['spec']['node'] == 'string') spec['node'] = args['spec']['node'];
        if (args['spec']['updatePeriodSeconds'] !== undefined && typeof args['spec']['updatePeriodSeconds'] == 'number') spec['updatePeriodSeconds'] = args['spec']['updatePeriodSeconds'];
        const payload = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'CalicoNodeStatus',
            metadata: {
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createClusterCustomObject('crd.projectcalico.org','v1','caliconodestatuses', payload)
            const ext = res.body as ProjectcalicoCalicoNodeStatus
            return {
                metadata: getMetadata(ext.metadata),
                "classes": ext.spec['classes'],
                "node": ext.spec['node'],
                "updatePeriodSeconds": ext.spec['updatePeriodSeconds'],
                status: ext.status==undefined?null:{
                    "agent": ext.status['agent'],
                    "bgp": ext.status['bgp'],
                    "lastUpdated": ext.status['lastUpdated'],
                    "routes": ext.status['routes'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchProjectcalicoCalicoNodeStatus: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['classes'] !== undefined && Array.isArray(args['spec']['classes'])) spec['classes'] = args['spec']['classes'];
        if (args['spec']['node'] !== undefined && typeof args['spec']['node'] == 'string') spec['node'] = args['spec']['node'];
        if (args['spec']['updatePeriodSeconds'] !== undefined && typeof args['spec']['updatePeriodSeconds'] == 'number') spec['updatePeriodSeconds'] = args['spec']['updatePeriodSeconds'];
        const request = {
            apiVersion: 'crd.projectcalico.org/v1',
            kind: 'CalicoNodeStatus',
            metadata: {
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getClusterCustomObject('crd.projectcalico.org','v1','caliconodestatuses', args['name'])
            const extGet = resGet.body as ProjectcalicoCalicoNodeStatus
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchClusterCustomObject('crd.projectcalico.org','v1','caliconodestatuses', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as ProjectcalicoCalicoNodeStatus
            return {
                metadata: getMetadata(ext.metadata),
                "classes": ext.spec['classes'],
                "node": ext.spec['node'],
                "updatePeriodSeconds": ext.spec['updatePeriodSeconds'],
                status: ext.status==undefined?null:{
                    "agent": ext.status['agent'],
                    "bgp": ext.status['bgp'],
                    "lastUpdated": ext.status['lastUpdated'],
                    "routes": ext.status['routes'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteProjectcalicoCalicoNodeStatus: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteClusterCustomObject('crd.projectcalico.org','v1','caliconodestatuses', args['name'])
        const ext = res.body as ProjectcalicoCalicoNodeStatus
        return {
            metadata: getMetadata(ext.metadata),
            "classes": ext.spec['classes'],
            "node": ext.spec['node'],
            "updatePeriodSeconds": ext.spec['updatePeriodSeconds'],
            status: ext.status==undefined?null:{
                "agent": ext.status['agent'],
                "bgp": ext.status['bgp'],
                "lastUpdated": ext.status['lastUpdated'],
                "routes": ext.status['routes'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
