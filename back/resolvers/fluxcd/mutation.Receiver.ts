import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdReceiver } from './type.Receiver.js';
import rfc6902  from 'rfc6902';

const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const mutations = {
    createFluxcdReceiver: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['events'] !== undefined && Array.isArray(args['spec']['events'])) spec['events'] = args['spec']['events'];
        if (args['spec']['interval'] !== undefined && typeof args['spec']['interval'] == 'string') spec['interval'] = args['spec']['interval'];
        spec['resources'] = args['spec']['resources'];
        spec['secretRef'] = args['spec']['secretRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        spec['type'] = args['spec']['type'];
        const payload = {
            apiVersion: 'notification.toolkit.fluxcd.io/v1',
            kind: 'Receiver',
            metadata: {
              namespace: args['namespace'],
              name: args['name']
            },
            spec: spec
        }
        try {
            const res = await customApi.createNamespacedCustomObject('notification.toolkit.fluxcd.io','v1',args['namespace'],'receivers', payload)
            const ext = res.body as FluxcdReceiver
            return {
                metadata: getMetadata(ext.metadata),
                events: ext.spec.events,
                interval: ext.spec.interval,
                resources: ext.spec.resources,
                secretRef: ext.spec.secretRef,
                suspend: ext.spec.suspend,
                type: ext.spec.type,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                    webhookPath: ext.status.webhookPath,
                }
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
    patchFluxcdReceiver: async (_parent, args: object) => {
        const spec = {};
        if (args['spec'] == undefined || args['name']==undefined) return null;
        if (args['spec']['events'] !== undefined && Array.isArray(args['spec']['events'])) spec['events'] = args['spec']['events'];
        if (args['spec']['interval'] !== undefined && typeof args['spec']['interval'] == 'string') spec['interval'] = args['spec']['interval'];
        spec['resources'] = args['spec']['resources'];
        spec['secretRef'] = args['spec']['secretRef'];
        if (args['spec']['suspend'] !== undefined && typeof args['spec']['suspend'] == 'boolean') spec['suspend'] = args['spec']['suspend'];
        spec['type'] = args['spec']['type'];
        const request = {
            apiVersion: 'notification.toolkit.fluxcd.io/v1',
            kind: 'Distrib',
            metadata: {
                namespace: args['namespace'],
                name: args['name']
            },
            spec: spec
        }
        try {
            const resGet = await customApi.getNamespacedCustomObject('notification.toolkit.fluxcd.io','v1',args['namespace'],'receivers', args['name'])
            const extGet = resGet.body as FluxcdReceiver
            const payload = rfc6902.createPatch(extGet,request).filter(rule => !rule.path.startsWith('/status') && !['/metadata/creationTimestamp', '/metadata/finalizers', '/metadata/generation', '/metadata/managedFields', '/metadata/resourceVersion','/metadata/uid'].includes(rule.path) )
            const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH}};
            const res = await customApi.patchNamespacedCustomObject('notification.toolkit.fluxcd.io','v1',args['namespace'],'receivers', args['name'], payload, undefined, undefined, undefined, options)
            const ext = res.body as FluxcdReceiver
            return {
                metadata: getMetadata(ext.metadata),
                events: ext.spec.events,
                interval: ext.spec.interval,
                resources: ext.spec.resources,
                secretRef: ext.spec.secretRef,
                suspend: ext.spec.suspend,
                type: ext.spec.type,
                status: ext.status==undefined?null:{
                    conditions: ext.status.conditions,
                    lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                    observedGeneration: ext.status.observedGeneration,
                    webhookPath: ext.status.webhookPath,
                }
            }
        } catch (err) {
            console.error(err);
        }
        return null
    },
    deleteFluxcdReceiver: async (_parent, args: object) => {
    try {
        const res = await customApi.deleteNamespacedCustomObject('notification.toolkit.fluxcd.io','v1',args['namespace'],'receivers', args['name'])
        const ext = res.body as FluxcdReceiver
        return {
            metadata: getMetadata(ext.metadata),
            events: ext.spec.events,
            interval: ext.spec.interval,
            resources: ext.spec.resources,
            secretRef: ext.spec.secretRef,
            suspend: ext.spec.suspend,
            type: ext.spec.type,
            status: ext.status==undefined?null:{
                conditions: ext.status.conditions,
                lastHandledReconcileAt: ext.status.lastHandledReconcileAt,
                observedGeneration: ext.status.observedGeneration,
                webhookPath: ext.status.webhookPath,
            }
        }
    } catch (err) {
        console.error(err);
    }
    return null
},
};
