import {kc, k8s, getMetadata} from '../core/libs.js';
import { FluxcdHelmReleaseList, FluxcdHelmRelease } from './type.HelmRelease.js';
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);
export const lists = {
    fluxcdHelmReleases: async (_parent, args: object) => {
        try {
            const res = await customApi.listNamespacedCustomObject('helm.toolkit.fluxcd.io','v2beta1',args['namespace'],'helmreleases')
            const resList = res.body as FluxcdHelmReleaseList
            return resList.items.map((ext)=>{return{
                metadata: getMetadata(ext.metadata),
                "chart": ext.spec['chart'],
                "dependsOn": ext.spec['dependsOn'],
                "install": ext.spec['install'],
                "interval": ext.spec['interval'],
                "kubeConfig": ext.spec['kubeConfig'],
                "maxHistory": ext.spec['maxHistory'],
                "persistentClient": ext.spec['persistentClient'],
                "postRenderers": ext.spec['postRenderers'],
                "releaseName": ext.spec['releaseName'],
                "rollback": ext.spec['rollback'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "storageNamespace": ext.spec['storageNamespace'],
                "suspend": ext.spec['suspend'],
                "targetNamespace": ext.spec['targetNamespace'],
                "test": ext.spec['test'],
                "timeout": ext.spec['timeout'],
                "uninstall": ext.spec['uninstall'],
                "upgrade": ext.spec['upgrade'],
                "values": ext.spec['values'],
                "valuesFrom": ext.spec['valuesFrom'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "failures": ext.status['failures'],
                    "helmChart": ext.status['helmChart'],
                    "installFailures": ext.status['installFailures'],
                    "lastAppliedRevision": ext.status['lastAppliedRevision'],
                    "lastAttemptedRevision": ext.status['lastAttemptedRevision'],
                    "lastAttemptedValuesChecksum": ext.status['lastAttemptedValuesChecksum'],
                    "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                    "lastReleaseRevision": ext.status['lastReleaseRevision'],
                    "observedGeneration": ext.status['observedGeneration'],
                    "upgradeFailures": ext.status['upgradeFailures'],
                }
            }})
        } catch (err) {
          console.error((err as object)['body']);
        }
        return []
    }
};
export const queries = {
    fluxcdHelmRelease: async (_parent, args: object) => {
        try {
            const res = await customApi.getNamespacedCustomObject('helm.toolkit.fluxcd.io','v2beta1',args['namespace'],'helmreleases', args['name'])
            const ext = res.body as FluxcdHelmRelease
            return {
                metadata: getMetadata(ext.metadata),
                "chart": ext.spec['chart'],
                "dependsOn": ext.spec['dependsOn'],
                "install": ext.spec['install'],
                "interval": ext.spec['interval'],
                "kubeConfig": ext.spec['kubeConfig'],
                "maxHistory": ext.spec['maxHistory'],
                "persistentClient": ext.spec['persistentClient'],
                "postRenderers": ext.spec['postRenderers'],
                "releaseName": ext.spec['releaseName'],
                "rollback": ext.spec['rollback'],
                "serviceAccountName": ext.spec['serviceAccountName'],
                "storageNamespace": ext.spec['storageNamespace'],
                "suspend": ext.spec['suspend'],
                "targetNamespace": ext.spec['targetNamespace'],
                "test": ext.spec['test'],
                "timeout": ext.spec['timeout'],
                "uninstall": ext.spec['uninstall'],
                "upgrade": ext.spec['upgrade'],
                "values": ext.spec['values'],
                "valuesFrom": ext.spec['valuesFrom'],
                status: ext.status==undefined?null:{
                    "conditions": ext.status['conditions'],
                    "failures": ext.status['failures'],
                    "helmChart": ext.status['helmChart'],
                    "installFailures": ext.status['installFailures'],
                    "lastAppliedRevision": ext.status['lastAppliedRevision'],
                    "lastAttemptedRevision": ext.status['lastAttemptedRevision'],
                    "lastAttemptedValuesChecksum": ext.status['lastAttemptedValuesChecksum'],
                    "lastHandledReconcileAt": ext.status['lastHandledReconcileAt'],
                    "lastReleaseRevision": ext.status['lastReleaseRevision'],
                    "observedGeneration": ext.status['observedGeneration'],
                    "upgradeFailures": ext.status['upgradeFailures'],
                }
            }
        } catch (err) {
            console.error((err as object)['body']);
        }
        return null
    },
};
