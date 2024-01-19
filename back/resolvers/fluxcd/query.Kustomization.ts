import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdKustomizationList, FluxcdKustomization } from './type.Kustomization.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    fluxcdKustomizations: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('kustomize.toolkit.fluxcd.io','v1',args['namespace'],'kustomizations')
            const resList = res.body as FluxcdKustomizationList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                "commonMetadata": ext.spec['commonMetadata'],
                "components": ext.spec['components'],
                "decryption": ext.spec['decryption'],
                "dependsOn": ext.spec['dependsOn'],
                "force": ext.spec['force'],
                "healthChecks": ext.spec['healthChecks'],
                "images": ext.spec['images'],
                "interval": ext.spec['interval'],
                "kubeConfig": ext.spec['kubeConfig'],
                "patches": ext.spec['patches'],
                "path": ext.spec['path'],
                "postBuild": ext.spec['postBuild'],
                "prune": ext.spec['prune'],
                "retryInterval": ext.spec['retryInterval'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "sourceRef": ext.spec['sourceRef'],
                "suspend": ext.spec['suspend'],
                "targetNamespace": ext.spec['targetNamespace'],
                "timeout": ext.spec['timeout'],
                "wait": ext.spec['wait'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "inventory": ext.status['inventory'],
                    "lastAppliedRevision": ext.status['lastAppliedRevision'],
                    "lastAttemptedRevision": ext.status['lastAttemptedRevision'],
                    "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                    "observedGeneration": ext.status['observedGeneration'],
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    fluxcdKustomization: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('kustomize.toolkit.fluxcd.io','v1',args['namespace'],'kustomizations', args['name'])
            const ext = res.body as FluxcdKustomization
            return {
                metadata: getMetadata(ext.metadata),
                "commonMetadata": ext.spec['commonMetadata'],
                "components": ext.spec['components'],
                "decryption": ext.spec['decryption'],
                "dependsOn": ext.spec['dependsOn'],
                "force": ext.spec['force'],
                "healthChecks": ext.spec['healthChecks'],
                "images": ext.spec['images'],
                "interval": ext.spec['interval'],
                "kubeConfig": ext.spec['kubeConfig'],
                "patches": ext.spec['patches'],
                "path": ext.spec['path'],
                "postBuild": ext.spec['postBuild'],
                "prune": ext.spec['prune'],
                "retryInterval": ext.spec['retryInterval'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "sourceRef": ext.spec['sourceRef'],
                "suspend": ext.spec['suspend'],
                "targetNamespace": ext.spec['targetNamespace'],
                "timeout": ext.spec['timeout'],
                "wait": ext.spec['wait'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "inventory": ext.status['inventory'],
                    "lastAppliedRevision": ext.status['lastAppliedRevision'],
                    "lastAttemptedRevision": ext.status['lastAttemptedRevision'],
                    "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                    "observedGeneration": ext.status['observedGeneration'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
