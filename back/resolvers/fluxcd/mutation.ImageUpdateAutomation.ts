import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdImageUpdateAutomation } from './type.ImageUpdateAutomation.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createFluxcdImageUpdateAutomation: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['git'] !== undefined && typeof args['spec']['git'] == 'object') spec['git'] = args['spec']['git'];
        spec['interval'] = args['spec']['interval'];
        spec['sourceRef'] = args['spec']['sourceRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['update'] !== undefined && typeof args['spec']['update'] == 'object') spec['update'] = args['spec']['update'];
        const payload = {
            apiVersion: 'image.toolkit.fluxcd.io/v1beta1',
            kind: 'ImageUpdateAutomation',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta1',args['namespace'],'imageupdateautomations', payload)
            const ext = res.body as FluxcdImageUpdateAutomation
            return {
                metadata: getMetadata(ext.metadata, ext),
                "git": ext.spec['git'],
                "interval": ext.spec['interval'],
                "sourceRef": ext.spec['sourceRef'],
                "suspend": ext.spec['suspend'],
                "update": ext.spec['update'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "lastAutomationRunTime": ext.status['lastAutomationRunTime'],
                    "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                    "lastPushCommit": ext.status['lastPushCommit'],
                    "lastPushTime": ext.status['lastPushTime'],
                    "observedGeneration": ext.status['observedGeneration'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    patchFluxcdImageUpdateAutomation: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['git'] !== undefined && typeof args['spec']['git'] == 'object') spec['git'] = args['spec']['git'];
        spec['interval'] = args['spec']['interval'];
        spec['sourceRef'] = args['spec']['sourceRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        if (args['spec']['update'] !== undefined && typeof args['spec']['update'] == 'object') spec['update'] = args['spec']['update'];
        const request = {
            apiVersion: 'image.toolkit.fluxcd.io/v1beta1',
            kind: 'ImageUpdateAutomation',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta1',args['namespace'],'imageupdateautomations', args['name'])
            const extGet = resGet.body as FluxcdImageUpdateAutomation
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta1',args['namespace'],'imageupdateautomations', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as FluxcdImageUpdateAutomation
            return {
                metadata: getMetadata(ext.metadata, ext),
                "git": ext.spec['git'],
                "interval": ext.spec['interval'],
                "sourceRef": ext.spec['sourceRef'],
                "suspend": ext.spec['suspend'],
                "update": ext.spec['update'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "lastAutomationRunTime": ext.status['lastAutomationRunTime'],
                    "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                    "lastPushCommit": ext.status['lastPushCommit'],
                    "lastPushTime": ext.status['lastPushTime'],
                    "observedGeneration": ext.status['observedGeneration'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
    deleteFluxcdImageUpdateAutomation: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('image.toolkit.fluxcd.io','v1beta1',args['namespace'],'imageupdateautomations', args['name'])
        const ext = res.body as FluxcdImageUpdateAutomation
        return {
            metadata: getMetadata(ext.metadata, ext),
            "git": ext.spec['git'],
            "interval": ext.spec['interval'],
            "sourceRef": ext.spec['sourceRef'],
            "suspend": ext.spec['suspend'],
            "update": ext.spec['update'],
            status: ext.status==undefined?null:{
                "conditions": ext.status['conditions'],
                "lastAutomationRunTime": ext.status['lastAutomationRunTime'],
                "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                "lastPushCommit": ext.status['lastPushCommit'],
                "lastPushTime": ext.status['lastPushTime'],
                "observedGeneration": ext.status['observedGeneration'],
            }
        }
    } catch (err) {
        console.error((err as object)['body']);
    }
    return null
},
};
